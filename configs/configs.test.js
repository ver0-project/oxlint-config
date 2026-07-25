import {execFileSync} from 'node:child_process';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterAll, describe, expect, it} from 'vitest';
import browser from './browser.js';
import javascript from './javascript.js';
import node from './node.js';
import react from './react.js';
import typescript, {typescriptUnsafe} from './typescript.js';
import vitest from './vitest.js';

const require = createRequire(import.meta.url);
const oxlintBin = path.join(path.dirname(require.resolve('oxlint/package.json')), 'bin', 'oxlint');

const tempDirs = [];

afterAll(() => {
	for (const dir of tempDirs) {
		rmSync(dir, {recursive: true, force: true});
	}
});

/**
 * Runs oxlint with the given config against a single fixture file and
 * returns raw diagnostics output.
 *
 * @param {import('oxlint').OxlintConfig} config
 * @param {string} fileName
 * @param {string} code
 * @returns {string}
 */
function lint(config, fileName, code) {
	const dir = mkdtempSync(path.join(tmpdir(), 'ver0-oxlint-config-'));
	tempDirs.push(dir);

	writeFileSync(path.join(dir, '.oxlintrc.json'), JSON.stringify(config));
	writeFileSync(path.join(dir, fileName), code);

	try {
		return execFileSync(process.execPath, [oxlintBin, '-c', '.oxlintrc.json', '--format', 'json', '.'], {
			cwd: dir,
			encoding: 'utf8',
		});
	} catch (error) {
		if (typeof error.stdout !== 'string') {
			throw error;
		}

		return error.stdout;
	}
}

describe('javascript', () => {
	it('lints js files', () => {
		expect(lint(javascript, 'index.js', 'debugger;\n')).toContain('no-debugger');
	});

	it('passes clean code', () => {
		expect(lint(javascript, 'index.js', 'export const answer = 42;\n')).not.toContain('"severity"');
	});
});

describe('typescript', () => {
	// Type-aware linting requires oxlint-tsgolint and a tsconfig project,
	// which is out of scope for feasibility tests.
	const config = {...typescript, options: {...typescript.options, typeAware: false}};

	it('lints ts files', () => {
		expect(lint(config, 'index.ts', 'debugger;\n')).toContain('no-debugger');
	});

	it('exposes unsafe overrides', () => {
		expect(typescriptUnsafe.rules['typescript/no-unsafe-assignment']).toBe('off');
	});
});

describe('react', () => {
	it('lints jsx files', () => {
		const code = 'export const List = ({items}) => <ul>{items.map((item) => <li>{item}</li>)}</ul>;\n';
		expect(lint(react, 'list.jsx', code)).toContain('jsx-key');
	});
});

describe('node', () => {
	it('lints node-specific patterns', () => {
		expect(lint(node, 'index.js', "const fs = new require('node:fs');\n")).toContain('no-new-require');
	});
});

describe('browser', () => {
	it('restricts confusing browser globals', () => {
		expect(lint(browser, 'index.js', 'export const where = location;\n')).toContain('no-restricted-globals');
	});
});

describe('vitest', () => {
	it('lints test files', () => {
		expect(lint(vitest, 'sample.test.js', "it.only('works', () => {});\n")).toContain('no-focused-tests');
	});
});

describe('composition', () => {
	it('all modules merge via extends', () => {
		const dir = mkdtempSync(path.join(tmpdir(), 'ver0-oxlint-config-'));
		tempDirs.push(dir);

		const modules = {
			javascript,
			typescript: {...typescript, options: {...typescript.options, typeAware: false}},
			react,
			node,
			browser,
			vitest,
		};
		for (const [name, config] of Object.entries(modules)) {
			writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(config));
		}

		const root = {extends: Object.keys(modules).map((name) => `./${name}.json`)};
		writeFileSync(path.join(dir, '.oxlintrc.json'), JSON.stringify(root));
		writeFileSync(path.join(dir, 'index.js'), 'debugger;\n');

		let stdout;
		try {
			stdout = execFileSync(process.execPath, [oxlintBin, '-c', '.oxlintrc.json', '--format', 'json', '.'], {
				cwd: dir,
				encoding: 'utf8',
			});
		} catch (error) {
			stdout = error.stdout;
		}

		expect(stdout).toContain('no-debugger');
		expect(stdout).not.toContain('Failed to build');
	});
});

import {readFileSync} from 'node:fs';
import {generateNotes} from '@semantic-release/release-notes-generator';
import {describe, expect, it} from 'vite-plus/test';

const releaseConfig = JSON.parse(readFileSync(new URL('.releaserc.json', import.meta.url), 'utf8'));
const [, notesOptions] = releaseConfig.plugins.find(
	(plugin) => Array.isArray(plugin) && plugin[0] === '@semantic-release/release-notes-generator',
);

describe('release notes', () => {
	it('renders a fix commit with the preset from .releaserc.json', async () => {
		const notes = await generateNotes(notesOptions, {
			cwd: import.meta.dirname,
			env: {},
			logger: {log() {}, error() {}},
			options: {repositoryUrl: 'https://github.com/ver0-project/oxlint-config'},
			commits: [{hash: '1a701f6', message: 'fix(deps): publish the oxlint peer range'}],
			lastRelease: {gitTag: 'v1.0.0', version: '1.0.0'},
			nextRelease: {gitTag: 'v1.0.1', version: '1.0.1'},
		});

		expect(notes).toContain('publish the oxlint peer range');
	});
});

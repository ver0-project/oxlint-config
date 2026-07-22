import {GLOBS} from '../utils/globs.js';

/** @type {import('oxlint').OxlintConfig} */
const node = {
	plugins: [],
	categories: {
		correctness: 'off',
	},
	env: {
		builtin: true,
	},
	overrides: [
		{
			files: [GLOBS.JS, GLOBS.TS],
			rules: {
				'node/no-exports-assign': 'error',
				'node/no-mixed-requires': [
					'error',
					{
						grouping: true,
						allowCall: true,
					},
				],
				'node/no-new-require': 'error',
				'node/no-path-concat': 'error',
			},
			globals: {
				__dirname: 'off',
				__filename: 'off',
				exports: 'off',
				module: 'off',
				require: 'off',
			},
			plugins: ['node'],
			env: {
				es2026: true,
				node: true,
			},
		},
	],
};

export default node;

/** @type {import('oxlint').OxlintConfig} */
const node = {
	plugins: ['node'],
	env: {
		node: true,
		es2026: true,
	},
	globals: {
		__dirname: 'off',
		__filename: 'off',
		exports: 'off',
		module: 'off',
		require: 'off',
	},
	rules: {
		'node/no-exports-assign': 'error',
		'node/no-mixed-requires': ['error', {grouping: true, allowCall: true}],
		'node/no-new-require': 'error',
		'node/no-path-concat': 'error',
	},
};

export default node;

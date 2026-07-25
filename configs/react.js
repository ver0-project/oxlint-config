/** @type {import('oxlint').OxlintConfig} */
const react = {
	plugins: ['react'],
	categories: {
		correctness: 'error',
		suspicious: 'error',
		pedantic: 'error',
		perf: 'error',
	},
	rules: {
		'react/button-has-type': 'error',
		'react/display-name': 'off',
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'function-declaration',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/hook-use-state': [
			'error',
			{
				allowDestructuredState: true,
			},
		],
		'react/jsx-boolean-value': 'error',
		'react/jsx-curly-brace-presence': [
			'error',
			{
				props: 'never',
				children: 'never',
				propElementValues: 'always',
			},
		],
		'react/jsx-fragments': ['error', 'syntax'],
		'react/jsx-key': [
			'error',
			{
				checkFragmentShorthand: true,
				checkKeyMustBeforeSpread: true,
				warnOnDuplicates: true,
			},
		],
		'react/jsx-no-script-url': [
			'error',
			{
				includeFromSettings: true,
			},
		],
		'react/jsx-no-target-blank': [
			'error',
			{
				warnOnSpreadAttributes: true,
				forms: true,
			},
		],
		'react/jsx-pascal-case': 'error',
		'react/no-danger': 'error',
		'react/no-redundant-should-component-update': 'error',
		'react/no-string-refs': [
			'error',
			{
				noTemplateLiterals: true,
			},
		],
		'react/no-unknown-property': [
			'error',
			{
				requireDataLowercase: true,
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/self-closing-comp': 'error',
		'react/state-in-constructor': ['error', 'never'],
		'react/style-prop-object': [
			'error',
			{
				allow: ['FormattedNumber'],
			},
		],
	},
};

export default react;

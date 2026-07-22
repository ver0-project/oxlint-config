import {GLOBS} from '../utils/globs.js';

/** @type {import('oxlint').OxlintConfig} */
const react = {
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
				'react/button-has-type': 'error',
				'react/checked-requires-onchange-or-readonly': 'error',
				'react/forward-ref-uses-ref': 'error',
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
				'react/iframe-missing-sandbox': 'error',
				'react/no-array-index-key': 'error',
				'react/no-children-prop': 'error',
				'react/no-danger': 'error',
				'react/no-danger-with-children': 'error',
				'react/no-did-update-set-state': 'error',
				'react/no-direct-mutation-state': 'error',
				'react/no-find-dom-node': 'error',
				'react/no-is-mounted': 'error',
				'react/no-namespace': 'error',
				'react/no-object-type-as-default-prop': 'error',
				'react/no-redundant-should-component-update': 'error',
				'react/no-render-return-value': 'error',
				'react/no-string-refs': [
					'error',
					{
						noTemplateLiterals: true,
					},
				],
				'react/no-this-in-sfc': 'error',
				'react/no-unescaped-entities': 'error',
				'react/no-unknown-property': [
					'error',
					{
						requireDataLowercase: true,
					},
				],
				'react/no-unsafe': 'error',
				'react/react-in-jsx-scope': 'off',
				'react/self-closing-comp': 'error',
				'react/state-in-constructor': ['error', 'never'],
				'react/style-prop-object': [
					'error',
					{
						allow: ['FormattedNumber'],
					},
				],
				'react/void-dom-elements-no-children': 'error',
				'react/jsx-boolean-value': 'error',
				'react/jsx-key': [
					'error',
					{
						checkFragmentShorthand: true,
						checkKeyMustBeforeSpread: true,
						warnOnDuplicates: true,
					},
				],
				'react/jsx-no-comment-textnodes': 'error',
				'react/jsx-no-constructed-context-values': 'error',
				'react/jsx-no-duplicate-props': 'error',
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
				'react/jsx-no-undef': 'error',
				'react/jsx-no-useless-fragment': 'error',
				'react/jsx-curly-brace-presence': [
					'error',
					{
						props: 'never',
						children: 'never',
						propElementValues: 'always',
					},
				],
				'react/jsx-fragments': ['error', 'syntax'],
				'react/jsx-pascal-case': 'error',
				'react/jsx-props-no-spread-multi': 'error',
				'react/rules-of-hooks': 'error',
				'react/exhaustive-deps': 'warn',
				'react/display-name': 'off',
			},
			plugins: ['react'],
		},
	],
};

export default react;

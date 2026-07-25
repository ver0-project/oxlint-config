/** @type {import('oxlint').OxlintConfig} */
const typescript = {
	plugins: ['typescript'],
	categories: {
		correctness: 'error',
		suspicious: 'error',
		pedantic: 'error',
		perf: 'error',
	},
	options: {
		typeAware: true,
	},
	rules: {
		// typescript/require-await (type-aware) supersedes it and exempts
		// promise-returning bodies; with the base rule on, promise-function-async
		// + return-await leave no compliant shape for `async fn() { return promise; }`.
		'require-await': 'off',

		'typescript/adjacent-overload-signatures': 'error',
		'typescript/array-type': [
			'error',
			{
				default: 'array-simple',
			},
		],
		'typescript/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				minimumDescriptionLength: 4,
			},
		],
		'typescript/ban-tslint-comment': 'error',
		'typescript/class-literal-property-style': ['error', 'getters'],
		'typescript/consistent-generic-constructors': ['error', 'constructor'],
		'typescript/consistent-indexed-object-style': 'error',
		'typescript/consistent-type-assertions': [
			'error',
			{
				assertionStyle: 'as',
				objectLiteralTypeAssertions: 'allow-as-parameter',
			},
		],
		'typescript/consistent-type-definitions': ['error', 'type'],
		'typescript/consistent-type-exports': [
			'error',
			{
				fixMixedExportsWithInlineTypeSpecifier: true,
			},
		],
		'typescript/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
			},
		],
		'typescript/dot-notation': 'error',
		'typescript/no-dynamic-delete': 'error',
		'typescript/no-empty-interface': [
			'error',
			{
				allowSingleExtends: true,
			},
		],
		'typescript/no-empty-object-type': 'error',
		'typescript/no-extraneous-class': [
			'error',
			{
				allowConstructorOnly: false,
				allowEmpty: false,
				allowStaticOnly: false,
				allowWithDecorator: true,
			},
		],
		'typescript/no-floating-promises': [
			'error',
			{
				checkThenables: true,
				ignoreVoid: true,
				ignoreIIFE: true,
			},
		],
		'typescript/no-inferrable-types': 'error',
		'typescript/no-misused-promises': [
			'error',
			{
				checksConditionals: true,
				checksVoidReturn: false,
			},
		],
		'typescript/no-namespace': 'error',
		'typescript/no-non-null-asserted-nullish-coalescing': 'error',
		'typescript/no-require-imports': 'error',
		'typescript/no-restricted-types': [
			'error',
			{
				types: {
					object: {
						message:
							'The `object` type is hard to use. Use `Record<string, unknown>` instead. See: https://github.com/typescript-eslint/typescript-eslint/pull/848',
						fixWith: 'Record<string, unknown>',
					},
					Buffer: {
						message: 'Use Uint8Array instead. See: https://sindresorhus.com/blog/goodbye-nodejs-buffer',
						suggest: ['Uint8Array'],
					},
					'[]': "Don't use the empty array type `[]`. It only allows empty arrays. Use `SomeType[]` instead.",
					'[[]]':
						"Don't use `[[]]`. It only allows an array with a single element which is an empty array. Use `SomeType[][]` instead.",
					'[[[]]]': "Don't use `[[[]]]`. Use `SomeType[][][]` instead.",
					'[[[[]]]]': 'ur drunk 🤡',
					'[[[[[]]]]]': '🦄💥',
				},
			},
		],
		'typescript/no-this-alias': [
			'error',
			{
				allowDestructuring: true,
			},
		],
		'typescript/no-unnecessary-qualifier': 'error',
		'typescript/non-nullable-type-assertion-style': 'error',
		'typescript/only-throw-error': [
			'error',
			{
				allowThrowingUnknown: true,
				allowThrowingAny: false,
			},
		],
		'typescript/prefer-find': 'error',
		'typescript/prefer-for-of': 'error',
		'typescript/prefer-function-type': 'error',
		'typescript/prefer-literal-enum-member': 'error',
		'typescript/prefer-nullish-coalescing': [
			'error',
			{
				ignoreTernaryTests: false,
				ignoreConditionalTests: false,
				ignoreMixedLogicalExpressions: false,
			},
		],
		'typescript/prefer-readonly': 'error',
		'typescript/prefer-reduce-type-parameter': 'error',
		'typescript/prefer-regexp-exec': 'error',
		'typescript/prefer-return-this-type': 'error',
		'typescript/prefer-string-starts-ends-with': 'error',
		'typescript/promise-function-async': 'error',
		'typescript/require-array-sort-compare': [
			'error',
			{
				ignoreStringArrays: true,
			},
		],
		'typescript/restrict-plus-operands': [
			'error',
			{
				allowAny: false,
			},
		],
		'typescript/restrict-template-expressions': [
			'error',
			{
				allowNumber: true,
			},
		],
		'typescript/switch-exhaustiveness-check': [
			'error',
			{
				allowDefaultCaseForExhaustiveSwitch: false,
				requireDefaultForNonUnion: true,
			},
		],
		'typescript/triple-slash-reference': [
			'error',
			{
				path: 'never',
				types: 'never',
				lib: 'never',
			},
		],
		'typescript/unified-signatures': [
			'error',
			{
				ignoreDifferentlyNamedParameters: true,
			},
		],
		'typescript/use-unknown-in-catch-callback-variable': 'error',
	},
};

/**
 * Disables strict type-safety rules for projects where they are too noisy.
 *
 * @type {import('oxlint').OxlintConfig}
 */
export const typescriptUnsafe = {
	rules: {
		'typescript/no-unsafe-argument': 'off',
		'typescript/no-unsafe-assignment': 'off',
		'typescript/no-unsafe-call': 'off',
		'typescript/no-unsafe-declaration-merging': 'off',
		'typescript/no-unsafe-enum-comparison': 'off',
		'typescript/no-unsafe-member-access': 'off',
		'typescript/no-unsafe-return': 'off',
		'typescript/no-unsafe-type-assertion': 'off',
	},
};

export default typescript;

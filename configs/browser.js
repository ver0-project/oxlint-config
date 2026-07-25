import confusingBrowserGlobals from './browser-globals.js';

/** @type {import('oxlint').OxlintConfig} */
const browser = {
	env: {
		browser: true,
		es2026: true,
	},
	rules: {
		'no-restricted-globals': ['error', ...confusingBrowserGlobals],
	},
};

export default browser;

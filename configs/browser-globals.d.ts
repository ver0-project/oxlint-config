/**
 * Browser globals that shadow common identifiers and cause confusing bugs
 * when referenced without qualification (`window.` prefix).
 */
declare const confusingBrowserGlobals: string[];

export default confusingBrowserGlobals;

import type {OxlintConfig} from 'oxlint';

declare const typescript: OxlintConfig;

/**
 * Disables strict type-safety rules for projects where they are too noisy.
 */
export declare const typescriptUnsafe: OxlintConfig;

export default typescript;

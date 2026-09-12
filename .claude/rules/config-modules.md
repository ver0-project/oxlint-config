---
paths:
  - 'configs/*.js'
  - 'utils/*.js'
---

# Config Modules

Each `configs/*.js` is one oxlint config concern. Consumers import modules individually into `oxlint.config.ts` or
the `lint` block of `vite.config.ts`; `.oxlintrc.json` cannot extend npm packages.

## Shape

- Export one `OxlintConfig` object as the default export, annotated `/** @type {import('oxlint').OxlintConfig} */`.
- Keep the object JSON-serializable — tests feed it to the oxlint binary through `JSON.stringify`.
- Put rules top-level; oxlint lints JS and TS uniformly. Only `vitest.js` scopes rules through `overrides`, using
  `GLOBS.TEST` from `utils/globs.js`.
- A module that only adds an environment or scoped rules carries no top-level `plugins` or `categories` — under
  `extends`, a later module's `categories` replaces the base. The composition test guards this.
- Add or update the `.d.ts` sibling in the same change.

## Rule Selection

- Enable `correctness`, `suspicious`, `pedantic`, `perf` as whole categories so new rules arrive with oxlint updates.
- Keep `style` and `restriction` off as categories; `style` holds contradictory rules. Enable curated picks from both
  as explicit entries.
- An explicit rule entry is one of: an opinion `off`, a rule with non-default options, or a style/restriction pick.
- Use only rules with a native oxlint implementation. No `jsPlugins`; a rule without a native equivalent is dropped.
- Rule opinions follow `@ver0/eslint-config`. Formatting rules are absent because oxfmt owns formatting. Svelte
  template rules, JSON and Markdown linting stay in `@ver0/eslint-config`.
- `typescript.js` sets `options.typeAware`; consumers need `oxlint-tsgolint` or must disable it.

## Merging

- oxlint merges a consumer's top-level `overrides` before extended configs, so preset overrides win. Consumers put
  their own overrides in the last `extends` entry (README Troubleshooting).
- A plugin enabled only inside an override (vitest) is ignored in other overrides unless redeclared there.
- Keep base `require-await` off in `typescript.js`. With `typescript/promise-function-async` and
  `typescript/return-await` it leaves no compliant shape for `async fn() { return promise; }`; the type-aware
  `typescript/require-await` exempts promise-returning bodies. Regression-tested.

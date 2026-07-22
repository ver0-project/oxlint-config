# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command      | Description          |
| ------------ | -------------------- |
| `vp install` | Install dependencies |
| `vp check`   | Format check + lint  |
| `vp fmt`     | Format (oxfmt)       |
| `vp lint`    | Lint (oxlint)        |
| `vp test`    | Run tests (vitest)   |

**Toolchain:** Vite+ (`vp`) over Yarn 4 (`nodeLinker: node-modules`). The `packageManager` field pins yarn; vp
delegates dependency management to it. Formatter options live in the `fmt` block of `vite.config.ts` — `vp fmt` does
not read `.oxfmtrc.json`.

No build step. The package ships plain JS.

## Project Overview

`@ver0/oxlint-config` is the oxlint counterpart of `@ver0/eslint-config` — shared oxlint configs for the VoidZero
stack. Each config module is imported individually by consumers into `oxlint.config.ts` (or the `lint` block of
`vite.config.ts`); `.oxlintrc.json` cannot extend npm packages.

**Exports map:** `"./*": "./configs/*"`.

## Architecture

```text
configs/          # Oxlint config modules (one per concern)
  javascript.js   # Core + unicorn/import/promise rules
  typescript.js   # TS rules, type-aware; typescriptUnsafe named export
  react.js        # react + react-hooks rules
  node.js         # Node env/globals + node plugin rules (ESM flavor)
  browser.js      # Browser env + confusing-globals restriction
  vitest.js       # Test file rules
utils/
  globs.js        # Shared glob patterns (GLOBS.JS, GLOBS.TS, GLOBS.TEST)
```

## Key Conventions

- Modules export pre-built, **JSON-serializable** config objects (`OxlintConfig`) as default exports. Keep them
  serializable — tests rely on `JSON.stringify` to feed them to the oxlint binary.
- Every rule maps to oxlint's native Rust implementations. No `jsPlugins` — ESLint-plugin shims are out of scope; if a
  rule has no native oxlint equivalent, drop it.
- Rule sets originate from `@ver0/eslint-config` (XO-based), initially generated via `@oxlint/migrate` and hand-tuned.
  Stylistic rules are deliberately absent (oxfmt's job).
- `typescript.js` sets `options.typeAware` — consumers need `oxlint-tsgolint` or must disable it.
- Svelte template rules, JSON and Markdown linting stay in `@ver0/eslint-config`.

## Testing

`configs/configs.test.js` — feasibility tests: each module is serialized to a temp `.oxlintrc.json` and run through
the real oxlint binary against violating fixtures. A module that carries rule options oxlint rejects fails at config
build, so the suite validates option compatibility for the whole rule set.

## Gotchas

- `.npmignore` uses a deny-all + allowlist pattern (`*` then `!dir/`). You must also add `!dir/**` alongside `!dir/`
  or npm silently excludes directory contents. `utils/` must stay in the allowlist — configs import it.

## Release

Automated via semantic-release: `release.yml` runs after the `CI` workflow succeeds on `master` (react-hookz
practices). npm publishing uses trusted publishing (OIDC) — no `NPM_TOKEN`; GitHub operations use the `GH_TOKEN` PAT
secret. Commit messages follow conventional commits (`fix:`, `feat:`, etc.).

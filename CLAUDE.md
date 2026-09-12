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

## Conventions

Rules scoped to `configs/`, `utils/`, `package.json` and `.npmignore` live in `.claude/rules/` and load when a
matching file is read. Three invariants must hold before any file is read, because a new file is written, not read:

- A config module is one JSON-serializable `OxlintConfig` default export with a hand-written `.d.ts` sibling.
- A module that only adds an environment or scoped rules carries no top-level `plugins` or `categories`.
- A new module is registered in the composition test and the type-declarations test in `configs/configs.test.js`.

## Release

Automated via semantic-release: `release.yml` runs after the `CI` workflow succeeds on `master` (react-hookz
practices). npm publishing uses trusted publishing (OIDC) — no `NPM_TOKEN`; GitHub operations use the `GH_TOKEN` PAT
secret. Commit messages follow conventional commits (`fix:`, `feat:`, etc.).

<div align="center">

# @ver0/oxlint-config

<p>
<a href="https://www.npmjs.com/package/@ver0/oxlint-config"><img alt="npm" src="https://img.shields.io/npm/v/%40ver0%2Foxlint-config"/></a>
<a href="https://github.com/ver0-project/oxlint-config/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/ver0-project/oxlint-config/actions/workflows/ci.yml/badge.svg"/></a>
</p>

<p>🦀 Shared <a href="https://oxc.rs/docs/guide/usage/linter">Oxlint</a> configs used in all ver0 projects.</p>

</div>

The oxlint counterpart of [`@ver0/eslint-config`](https://github.com/ver0-project/eslint-config) for the VoidZero
stack (Vite+, Oxc). Rule sets are ported from the ESLint configs (XO-based) with everything mapped to oxlint's native
Rust implementations — no JS plugins, no plugin peer dependencies.

## Installation

```bash
vp add -D @ver0/oxlint-config
```

The `oxlint` package itself is optional — Vite+ (`vp lint`) ships the linter; standalone usage requires it.

## Usage

Shared configs are consumed via `oxlint.config.ts` (or the `lint` block of `vite.config.ts` in Vite+ projects) — the
JSON config format (`.oxlintrc.json`) does not resolve npm packages in `extends`. Pick the modules matching the
project:

```ts
import {defineConfig} from 'oxlint';
import javascript from '@ver0/oxlint-config/javascript.js';
import typescript from '@ver0/oxlint-config/typescript.js';
import node from '@ver0/oxlint-config/node.js';
import vitest from '@ver0/oxlint-config/vitest.js';

export default defineConfig({
	extends: [javascript, typescript, node, vitest],
});
```

## Configs

| Module          | Applies to | Contents                                                               |
| --------------- | ---------- | ---------------------------------------------------------------------- |
| `javascript.js` | `*.js(x)`  | ESLint core + `unicorn`, `import`, `promise` rules                     |
| `typescript.js` | `*.ts(x)`  | JS rule set + `typescript` rules, type-aware rules included            |
| `react.js`      | JS + TS    | `react` and `react-hooks` rules                                        |
| `node.js`       | JS + TS    | Node.js environment, globals and `node` rules (ESM flavor)             |
| `browser.js`    | JS + TS    | Browser environment plus `no-restricted-globals` for confusing globals |
| `vitest.js`     | `*.test.*` | `vitest` plugin rules for test files                                   |

`typescript.js` additionally exports `typescriptUnsafe` that disables strict `no-unsafe-*` type-safety rules.

### Type-aware linting

`typescript.js` enables `typeAware` and includes rules that need type information. They require
[`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint):

```bash
vp add -D oxlint-tsgolint
```

Without it, disable type-aware mode in the consuming config: `options: {typeAware: false}`.

## Scope

This package covers only what oxlint lints natively. Svelte template rules, JSON and Markdown linting stay with
[`@ver0/eslint-config`](https://github.com/ver0-project/eslint-config) — oxlint only lints `<script>` blocks of
`.svelte` files. Formatting is [oxfmt](https://oxc.rs/docs/guide/usage/formatter)'s job — stylistic rules are
deliberately absent.

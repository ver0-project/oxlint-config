<div align="center">

# @ver0/oxlint-config

<p>
<a href="https://www.npmjs.com/package/@ver0/oxlint-config"><img alt="npm" src="https://img.shields.io/npm/v/%40ver0%2Foxlint-config"/></a>
<a href="https://github.com/ver0-project/oxlint-config/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/ver0-project/oxlint-config/actions/workflows/ci.yml/badge.svg"/></a>
</p>

<p>🦀 Shared <a href="https://oxc.rs/docs/guide/usage/linter">Oxlint</a> configs used in all ver0 projects.</p>

</div>

> [!WARNING]
> Work in progress — the oxlint counterpart of
> [`@ver0/eslint-config`](https://github.com/ver0-project/eslint-config) for the VoidZero stack (Vite+, Oxc).
> Config modules are not published yet.

## Installation

```bash
vp add -D oxlint @ver0/oxlint-config
```

## Usage

Shared configs are consumed via `oxlint.config.ts` (or the `lint` block of `vite.config.ts` in Vite+ projects) — the
JSON config format (`.oxlintrc.json`) does not resolve npm packages in `extends`.

```ts
import {defineConfig} from 'oxlint';
import base from '@ver0/oxlint-config/base.js';

export default defineConfig({
	extends: [base],
});
```

## Scope

Unlike `@ver0/eslint-config`, this package covers only what oxlint lints natively — JS/TS, React, Node, browser and
Vitest rules ship with the oxlint binary, so there are no plugin peer dependencies. Svelte template rules, JSON and
Markdown linting stay with the ESLint config.

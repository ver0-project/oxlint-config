<div align="center">
<h1>@ver0/oxlint-config</h1>

[![NPM Version](https://img.shields.io/npm/v/%40ver0%2Foxlint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/oxlint-config)
[![NPM Downloads](https://img.shields.io/npm/dm/%40ver0%2Foxlint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/oxlint-config)
[![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/%40ver0/oxlint-config?style=flat-square)](https://www.npmjs.com/package/@ver0/oxlint-config)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/ver0-project/oxlint-config/ci.yml?style=flat-square)](https://github.com/ver0-project/oxlint-config/actions)

<br/>

<p>🦀 A modular Oxlint configuration used across all ver0 projects</p>

</div>

## ✨ What's Included

A collection of modular [Oxlint](https://oxc.rs/docs/guide/usage/linter) configs — the
[`@ver0/eslint-config`](https://github.com/ver0-project/eslint-config) counterpart for the VoidZero stack (Vite+,
Oxc). Import only what you need and compose via `extends`.

- **JavaScript** — base rules plus `unicorn`, `import`, and `promise` plugins
- **TypeScript** — TypeScript rules with type-aware linting
- **React** — React and hooks rules
- **Node.js** — Node globals and `node` plugin rules
- **Browser** — browser globals and restricted globals
- **Vitest** — test file rules

Every rule is implemented natively in Rust inside the oxlint binary — configs need **no plugin dependencies** at all.

## 🚀 Installation

```bash
vp add -D @ver0/oxlint-config
```

Under Vite+ that is all — `vp lint` ships the linter. Standalone usage additionally requires the `oxlint` package:

```bash
npm install -D oxlint @ver0/oxlint-config
```

## 📖 Usage

Compose the configs you need in `oxlint.config.ts` via `extends`:

```ts
// oxlint.config.ts
import {defineConfig} from 'oxlint';
import javascript from '@ver0/oxlint-config/javascript.js';
import typescript from '@ver0/oxlint-config/typescript.js';
import node from '@ver0/oxlint-config/node.js';
import vitest from '@ver0/oxlint-config/vitest.js';

export default defineConfig({
	extends: [javascript, typescript, node, vitest],
});
```

In Vite+ projects the same objects go into the `lint` block of `vite.config.ts`:

```ts
// vite.config.ts
import {defineConfig} from 'vite-plus';
import javascript from '@ver0/oxlint-config/javascript.js';
import node from '@ver0/oxlint-config/node.js';

export default defineConfig({
	lint: {
		extends: [javascript, node],
	},
});
```

> **Note:** shared configs require the TS config format — `.oxlintrc.json` cannot resolve npm packages in `extends`.

## 📦 Available Configs

Each config is a standalone module scoped to its own file globs. Import it to enable, skip it to disable — no options,
no per-config dependencies.

- **JavaScript** (`javascript.js`) — base rules for `*.js(x)` files: ESLint core plus `unicorn`, `import`, and
  `promise` rules. Always include this one — other configs build on top of it.

- **TypeScript** (`typescript.js`) — the JS rule set plus `typescript` rules for `*.ts(x)` files. Enables type-aware
  linting — see [Type-aware linting](#type-aware-linting). Also exports `typescriptUnsafe` to disable strict
  `no-unsafe-*` type-safety rules:

  ```ts
  import typescript, {typescriptUnsafe} from '@ver0/oxlint-config/typescript.js';

  export default defineConfig({
  	extends: [typescript, typescriptUnsafe],
  });
  ```

- **React** (`react.js`) — React and hooks rules. Stylistic JSX rules are intentionally absent — that is oxfmt's job.

- **Node.js** (`node.js`) — Node.js environment and globals (ESM flavor — CJS globals like `require` and `__dirname`
  are disallowed) plus `node` plugin rules.

- **Browser** (`browser.js`) — browser environment and globals, restricts confusing globals like `event`, `name`,
  `location` shadowing.

- **Vitest** (`vitest.js`) — rules for test and benchmark files (`*.test.*`, `*.benchmark.*`).

### Type-aware linting

`typescript.js` turns on `typeAware` and includes rules that need type information. They require
[`oxlint-tsgolint`](https://github.com/oxc-project/tsgolint):

```bash
vp add -D oxlint-tsgolint
```

Not ready for type-aware linting? Disable it in the consuming config:

```ts
export default defineConfig({
	extends: [javascript, typescript],
	options: {typeAware: false},
});
```

## 🌟 Common Configurations

**Node.js API project:**

```ts
// oxlint.config.ts
import {defineConfig} from 'oxlint';
import javascript from '@ver0/oxlint-config/javascript.js';
import typescript from '@ver0/oxlint-config/typescript.js';
import node from '@ver0/oxlint-config/node.js';
import vitest from '@ver0/oxlint-config/vitest.js';

export default defineConfig({
	extends: [javascript, typescript, node, vitest],
});
```

**React web application:**

```ts
// oxlint.config.ts
import {defineConfig} from 'oxlint';
import javascript from '@ver0/oxlint-config/javascript.js';
import typescript from '@ver0/oxlint-config/typescript.js';
import react from '@ver0/oxlint-config/react.js';
import browser from '@ver0/oxlint-config/browser.js';
import vitest from '@ver0/oxlint-config/vitest.js';

export default defineConfig({
	extends: [javascript, typescript, react, browser, vitest],
});
```

## 🔬 Relationship to @ver0/eslint-config

This package covers what oxlint lints natively. The rest stays with
[`@ver0/eslint-config`](https://github.com/ver0-project/eslint-config):

- **Svelte** — oxlint only lints `<script>` blocks of `.svelte` files; template and runes rules need
  `eslint-plugin-svelte`
- **JSON / Markdown** — not oxlint's domain
- **Formatting** — [oxfmt](https://oxc.rs/docs/guide/usage/formatter) replaces Prettier entirely; stylistic lint rules
  are deliberately absent from these configs

## 🛠️ Troubleshooting

**Rules conflicting with your existing setup?** Rules defined next to `extends` win over the extended configs:

```ts
// oxlint.config.ts
import {defineConfig} from 'oxlint';
import javascript from '@ver0/oxlint-config/javascript.js';
import node from '@ver0/oxlint-config/node.js';

export default defineConfig({
	extends: [javascript, node],
	rules: {
		'some-rule': 'off', // Override any rule
	},
});
```

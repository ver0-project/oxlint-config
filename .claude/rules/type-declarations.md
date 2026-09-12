---
paths:
  - 'configs/*.d.ts'
---

# Type Declarations

Every config module ships a hand-written `.d.ts` sibling; there is no build step to emit one.

- Declare the default export as `OxlintConfig` from `import type {OxlintConfig} from 'oxlint'`.
- Declare every named export the module has (`typescriptUnsafe` in `typescript.js`).
- Do not restate rule contents in the declaration.
- The "type declarations" test runs `tsc --noEmit` over a consumer fixture that imports every module. A missing or
  drifted declaration fails it.

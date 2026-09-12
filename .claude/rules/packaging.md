---
paths:
  - 'package.json'
  - '.npmignore'
---

# Packaging

The package ships plain JS. The exports map `"./*": "./configs/*"` makes every file under `configs/` public API by
path.

- `.npmignore` is deny-all plus allowlist (`*` then `!dir/`). Add `!dir/**` beside every `!dir/` — without it npm
  excludes the directory contents silently.
- Keep `utils/` in the allowlist; config modules import it at runtime.
- `*.test.js` is excluded after the allowlist. Test files stay out of the tarball.
- `oxlint` is an optional peer dependency. Bump the peer range with the dev dependency when a config uses a rule or
  option from a newer release.

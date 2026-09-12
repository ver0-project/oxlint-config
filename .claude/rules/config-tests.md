---
paths:
  - 'configs/configs.test.js'
---

# Config Tests

Feasibility tests: each module is serialized to a temp `.oxlintrc.json` and run through the real oxlint binary
against a violating inline fixture. Assertions match rule names in the diagnostics output.

- A module with a rule option oxlint rejects fails at config build, so one lint call per module validates option
  compatibility for the whole rule set. Every module gets at least one.
- Add a fixture assertion for each rule interaction that is non-obvious (see the `require-await` test). The test is
  the record of why the rule is set that way.
- The composition test merges all modules through `extends` and asserts base categories survive. Register new
  modules there.
- The "type declarations" test runs `tsc --noEmit` over a consumer fixture importing every module. Register new
  modules there.
- Fixtures are inline strings written to temp directories that `afterAll` removes. No fixture files in the repo.

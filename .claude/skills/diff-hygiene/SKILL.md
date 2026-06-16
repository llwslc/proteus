---
name: diff-hygiene
description: Pre-commit gate that scans the diff for the two cruft rules no other gate enforced — added code comments (minimal-comments) and test cruft (no-test-cruft-in-production). The user repeatedly objects to explanatory comments and to committed debug aids (artificial delays, console.log, debug flags); prompt-lint only covers docs, not code. Run before committing any code change.
---

# diff-hygiene

Enforces two standing rules the source/structure gates can't:
- **minimal-comments** — code carries no explanatory comments (at most a one-line file header).
- **no-test-cruft-in-production** — no artificial delays, `console.*`, `debugger`, debug flags, or `TODO/FIXME` shipped.

These were "scan the diff before committing" habits that kept being missed. This makes them a checker.

## Run it

```
sh .claude/skills/diff-hygiene/check.sh          # working tree + staged vs HEAD
sh .claude/skills/diff-hygiene/check.sh <ref>    # vs another base
```

Scans only code files (`*.css *.ts *.tsx *.js *.cjs`) — docs are prompt-lint's job. Exit 1 if anything is flagged.

## Flags

- **COMMENT** — an added `//` or `/* … */` / `*` line (CSS or JS/TS), past the first two header lines.
- **CRUFT** — `console.log/debug/warn/error`, `debugger`, `TODO/FIXME/XXX/HACK`, `setTimeout(…, <number>)`, `data-debug`.

A flagged comment that is genuinely an allowed one-line header sits at the top of a new file and is skipped; anything else, delete it (the reasoning belongs in the commit message). Run it as the last step before every commit.

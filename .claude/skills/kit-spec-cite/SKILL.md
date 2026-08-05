---
name: kit-spec-cite
description: Skin-doc citation gate — every backtick citation in prompt/components/theme/<kit>.md must resolve to something real in that kit's code (token as --<kit>-<name>, class, variant modifier, keyframe, SVG filter id, component prop, or full custom prop), so the docs can't drift into citing names the code no longer has (the --hanabi-hazard-tone class: the feature died in code, the 覆盖清单 kept citing it) or into aliases that aren't real names (`bright` for `text-bright` — the prompt-lint decode axis, mechanized). Pure static text pass, instant. Run after editing a skin doc or renaming/removing a token, class, or keyframe.
---

# kit-spec-cite

```
node .claude/skills/kit-spec-cite/check.cjs [-] [kit] [--prove]
```

Kits from the `src/kits/` scan. For each kit it extracts every `` `cite` `` from `prompt/components/theme/<kit>.md`, skips non-name material (numbers/units/hex, multi-word phrases, CJK, camelCase DOM APIs, component names, `-deep`-style family-suffix shorthands, glyph symbols, a tiny CSS-native allowlist), and requires the rest to match the kit's css+tsx text as `--<kit>-<cite>`, `<kit>-<cite>` (class/keyframe), `--<cite>`, a `--<cite>` variant modifier, `.<cite>`/`#<cite>` (class/filter-id cites), or a `<cite>?:` component prop. Unresolved citations FAIL with doc:line; 0 kits or 0 citations → exit 2.

- `--prove` appends two fake citations to the first kit's doc in memory and must FAIL.
- Suffix-only cites (`-a55`, `-deep`) are family-axis shorthand and stay exempt — cite them with the leading dash.

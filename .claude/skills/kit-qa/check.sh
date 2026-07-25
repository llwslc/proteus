#!/bin/sh
# kit-qa — run the kit gate suite in one pass, so the dynamic gates can't be
# skipped after a CSS change. Discovers every .claude/skills/kit-*/ gate with a
# runnable check (+ theme-doc-sync); does NOT hardcode the gate or kit list.
#   sh .claude/skills/kit-qa/check.sh [port] [kit]
# [port] default 5273. [kit] SCOPES the per-kit gates to one kit — the browser
# gates that render each kit in isolation (visual/interact/glyph-center/anim-sync/
# a11y) and the per-kit static gates (lint/distinct) run ONLY that kit, so editing
# one kit no longer re-renders the other six. The CROSS-kit gates (equality,
# submenu-gap, api, structure, naming, parity, fingerprint, theme-doc-sync, …)
# always run full — they compare kits against each other and are meaningless scoped.
# Omit [kit] for the full sweep (accept a kit, touch a shared primitive, or final signoff).
# The dynamic gates drive the real page, so the dev server must be up on :port first.
PORT="${1:-5273}"
KIT="${2:-}"
SKILLS=.claude/skills
export GATE_PORT="$PORT"

curl -s -o /dev/null "http://127.0.0.1:${PORT}/" 2>/dev/null \
  || { echo "kit-qa: dev server not reachable on :${PORT} — start it (npm run dev) first"; exit 2; }

ALL_KITS=$(ls -d src/kits/*/ 2>/dev/null | sed 's#src/kits/##; s#/##' | tr '\n' ' ')   # derive, never hardcode
if [ -n "$KIT" ]; then
  case " $ALL_KITS " in *" $KIT "*) ;; *) echo "kit-qa: '$KIT' is not a kit under src/kits/ [$ALL_KITS]"; exit 2 ;; esac
fi
PER_KIT="kit-lint kit-distinct"                                    # static, take <kit> as $1 → loop
PK_BROWSER="kit-visual kit-interact kit-glyph-center kit-anim-sync" # browser, take (port, kit)
SKIP="kit-qa kit-states"                                           # this runner; manual capture

fail=0
run() {
  label="$1"; shift
  out=$("$@" 2>&1); code=$?
  res=$(printf '%s\n' "$out" | grep -hE "^RESULT:|GAPS|usage:" | tail -1)
  if [ "$code" -eq 0 ]; then
    printf '  PASS  %-22s %s\n' "$label" "$res"
  else
    printf '  FAIL  %-22s %s\n' "$label" "$res"
    printf '%s\n' "$out" | grep -hiE "FAIL|HIGH |GAP |finding|stray|overlap|dead |missing|off-panel|RESKIN" | head -8 | sed 's/^/          /'
    fail=1
  fi
}

# kits the per-kit gates iterate — one when scoped, all otherwise
LOOP_KITS="${KIT:-$ALL_KITS}"
echo "kit-qa @ :${PORT} — ${KIT:+scope=$KIT · }kits: $(echo $LOOP_KITS | tr '\n' ' ')"
for d in "$SKILLS"/kit-*/; do
  g=$(basename "$d")
  case " $SKIP " in *" $g "*) continue ;; esac
  if [ -f "${d}check.cjs" ]; then bin="node ${d}check.cjs"
  elif [ -f "${d}check.sh" ]; then bin="sh ${d}check.sh"
  else continue
  fi
  case " $PER_KIT " in
    *" $g "*) for k in $LOOP_KITS; do run "${g}:${k}" $bin "$k"; done; continue ;;
  esac
  case " $PK_BROWSER " in
    *" $g "*) run "${g}${KIT:+:$KIT}" $bin "$PORT" $KIT; continue ;;
  esac
  if [ "$g" = "kit-a11y" ]; then                                  # a11y arg order is (kit, port)
    if [ -n "$KIT" ]; then run "${g}:$KIT" $bin "$KIT" "$PORT"; else run "$g" $bin; fi
    continue
  fi
  run "$g" $bin                                                    # cross-kit → always full
done
run theme-doc-sync node "${SKILLS}/theme-doc-sync/check.cjs"
run fingerprint node "${SKILLS}/kit-qa/fingerprint.cjs"

echo
if [ "$fail" -eq 0 ]; then
  echo "kit-qa: ALL PASS${KIT:+ (scoped to $KIT — run a full sweep before final signoff)}"
else
  echo "kit-qa: FAILURES above — fix or document each; render drift that is INTENDED gets a manual fingerprint.cjs --update after dynamic-gate signoff"
fi
exit $fail

#!/bin/sh
# prompt-lint parallel — dump the theme docs section-by-section with all kits adjacent,
# so a CROSS-KIT OUTLIER (a clause one kit explains that its siblings omit) jumps out.
# Pure reading aid: no pass/fail. The siblings are the control group — a bullet present
# in one kit and absent from the rest is a candidate for cruft (redundant restatement,
# shell-owned rule, a note the others prove unnecessary), UNLESS it's a real kit-unique
# motif. See SKILL.md "cross-kit outlier". Run after touching any prompt/theme/<kit>.md.
#   sh .claude/skills/prompt-lint/parallel.sh
set -u
ROOT=$(cd "$(dirname "$0")/../../.." && pwd) || exit 2
cd "$ROOT" || exit 2

DOCS=$(find prompt/theme -maxdepth 1 -name '*.md' ! -name 'README.md' | sort)
[ -n "$DOCS" ] || { echo "no theme docs under prompt/theme/"; exit 0; }

SECS=$(grep -hoE '^## [0-9]+\.' $DOCS | grep -oE '[0-9]+' | sort -un)

for n in $SECS; do
  title=""
  for d in $DOCS; do
    title=$(grep -E "^## $n\. " "$d" | head -1)
    [ -n "$title" ] && break
  done
  printf '\n════════ %s ════════\n' "$title"
  for d in $DOCS; do
    printf -- '── %s ──\n' "$(basename "$d" .md)"
    awk -v n="$n" '
      $0 ~ "^## "n"\\." { inx=1; next }
      /^## [0-9]+\./ { inx=0 }
      inx && /^- / { print }
    ' "$d"
  done
done

echo
echo "READ each section across the 4 kits: a bullet/clause one kit has and the others"
echo "omit is a cross-kit OUTLIER — cut it unless it's a genuine kit-unique motif."

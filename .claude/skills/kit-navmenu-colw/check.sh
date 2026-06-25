#!/bin/sh
fail=0
shared="src/shared/geometry.css"
grep -q -- '--shell-navmenu-col-w:' "$shared" || { echo "  FAIL  $shared missing --shell-navmenu-col-w"; fail=1; }

for kdir in src/kits/*/; do
  kit=$(basename "$kdir")
  css="${kdir}components/NavigationMenu/NavigationMenu.css"
  tok="${kdir}theme/tokens.css"
  [ -f "$css" ] || continue
  kf=0
  grep -q -- "--${kit}-navmenu-col-w: var(--shell-navmenu-col-w)" "$tok" 2>/dev/null \
    || { echo "  FAIL  $kit: tokens.css missing alias --${kit}-navmenu-col-w: var(--shell-navmenu-col-w)"; kf=1; }
  grid=$(grep -E 'grid-template-columns: repeat\(2, *minmax\(' "$css" | head -1)
  if [ -n "$grid" ] && ! printf '%s' "$grid" | grep -q -- "var(--${kit}-navmenu-col-w)"; then
    echo "  FAIL  $kit: 2-col grid hardcodes the column width →$(printf '%s' "$grid" | sed 's/^ *//')"; kf=1
  fi
  [ "$kf" = 0 ] && echo "  ok    $kit"
  [ "$kf" = 1 ] && fail=1
done

if [ "$fail" = 0 ]; then
  echo "RESULT: PASS (NavigationMenu 2-col width flows from --shell-navmenu-col-w in every kit)"
else
  echo "RESULT: FAIL — tokenize it: shared --shell-navmenu-col-w -> kit alias --<kit>-navmenu-col-w -> minmax(var(--<kit>-navmenu-col-w), 1fr)"
fi
exit $fail

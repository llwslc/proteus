#!/bin/sh
# Horizontal scrollers (Tabs / NavMenu) must NOT hide their scrollbar at mobile.
# A hidden bar (scrollbar-width: none) leaves a desktop pointer with no way to
# scroll an overflowing strip — the bug behind "nova nav can't scroll".
# The popup ScrollArea hides its native bar legitimately, but that lives in
# ScrollArea.css, not these component files — so scope the check to them.
cd "$(dirname "$0")/../../.." || exit 2

bad=$(grep -rn 'scrollbar-width:[[:space:]]*none' \
  src/kits/*/components/Tabs/Tabs.css \
  src/kits/*/components/NavigationMenu/NavigationMenu.css 2>/dev/null)

if [ -n "$bad" ]; then
  echo "$bad" | sed 's|src/kits/||'
  echo
  echo "RESULT: FAIL — a horizontal scroller hides its bar. Un-hide it: use"
  echo "scrollbar-width: auto + a styled ::-webkit-scrollbar (see core §166)."
  exit 1
fi
echo "RESULT: PASS (no Tabs/NavMenu scroller hides its scrollbar)"

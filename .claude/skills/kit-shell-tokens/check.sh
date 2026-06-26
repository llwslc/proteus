#!/bin/sh
# Shared shell constants (各 kit 同值) must flow from --shell-* in src/shared/geometry.css,
# never a raw literal in a kit. Covers the z-layer ladder + shell-frame geometry (app.md §125).
# Sibling of kit-drawer-cap / kit-navmenu-colw. Kit list derived from src/kits/*/.
fail=0
shared="src/shared/geometry.css"

# 1) shared ladder + geometry tokens must exist
for t in \
  --shell-z-header --shell-z-dropdown --shell-z-menu --shell-z-tooltip --shell-z-switch \
  --shell-z-backdrop --shell-z-overlay --shell-z-toast \
  --shell-max-w --shell-sidebar-w --shell-grid-gap --shell-panel-gap \
  --shell-pad --shell-pad-m --shell-hero-pad --shell-hero-pad-m --shell-hero-mb \
  --shell-header-pad --shell-header-pad-m; do
  grep -q -- "$t:" "$shared" || { echo "  FAIL  $shared missing $t"; fail=1; }
done

# 2) per kit: z-tiers aliased to --shell-z-*, no literal z-tier, no raw §125 geometry literal
for kdir in src/kits/*/; do
  kit=$(basename "$kdir")
  tok="${kdir}theme/tokens.css"
  app="${kdir}App.css"
  [ -f "$tok" ] || continue
  kf=0

  for tier in dropdown menu tooltip backdrop overlay toast; do
    grep -q -- "--${kit}-z-${tier}: var(--shell-z-${tier})" "$tok" \
      || { echo "  FAIL  $kit: tokens.css missing alias --${kit}-z-${tier}: var(--shell-z-${tier})"; kf=1; }
  done
  litz=$(grep -nE -- "--${kit}-z-(dropdown|menu|tooltip|backdrop|overlay|toast): *[0-9]" "$tok")
  [ -n "$litz" ] && { echo "  FAIL  $kit: literal z-tier (must be var(--shell-z-*)):"; printf '%s\n' "$litz" | sed 's/^/          /'; kf=1; }

  if [ -f "$app" ]; then
    grep -q -- "z-index: var(--shell-z-header)" "$app" \
      || { echo "  FAIL  $kit: header z-index not using var(--shell-z-header)"; kf=1; }
    badgeo=$(grep -nE -- "max-width: *1320px|grid-template-columns: *232px|gap: *(26|18)px|padding: *26px 22px 28px|padding: *16px 13px 20px|padding: *30px 28px|padding: *20px 16px|padding: *0 (22|14)px|margin-bottom: *26px" "$app")
    [ -n "$badgeo" ] && { echo "  FAIL  $kit: raw shell-geometry literal in App.css (use --shell-*):"; printf '%s\n' "$badgeo" | sed 's/^/          /'; kf=1; }
  fi

  [ "$kf" = 0 ] && echo "  ok    $kit"
  [ "$kf" = 1 ] && fail=1
done

# 3) the floating shell switcher must demote via --shell-z-switch (not a raw 10000-style literal)
sw="src/shell/Shell.css"
if [ -f "$sw" ]; then
  grep -q -- "var(--shell-z-switch" "$sw" || { echo "  FAIL  Shell.css switcher z not using var(--shell-z-switch)"; fail=1; }
fi

if [ "$fail" = 0 ]; then
  echo "RESULT: PASS (z-tiers + shell geometry flow from --shell-* in every kit)"
else
  echo "RESULT: FAIL — tokenize shared shell constants: literal -> --shell-* (src/shared/geometry.css) -> kit alias/use"
fi
exit $fail

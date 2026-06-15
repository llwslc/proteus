#!/usr/bin/env bash
# kit-distinct — flag a kit that is a structural RESKIN of a sibling.
#
# A reskin = `cp` a sibling + prefix-rename + swap token values. Its VISUAL layer
# (frame/elevation primitives + every component's CSS) is structurally identical to
# the parent's — only token names/values & the kit prefix differ. kit-lint can't see
# this (a recolor is token-clean → PASS). This gate normalizes the "skin" away
# (token refs → var(T), colors → C/#H, sizes → N, the kit prefix stripped) and diffs
# the remaining STRUCTURE, file by file, against every sibling. High identity = reskin.
#
# Usage: bash .claude/skills/kit-distinct/check.sh <kit-id>
set -u
KIT="${1:-}"
ROOT="src/kits"
{ [ -n "$KIT" ] && [ -d "$ROOT/$KIT" ]; } || { echo "usage: bash check.sh <kit-id>  (a folder under $ROOT/)"; exit 2; }

TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# kit ids = the folders under src/kits (theme-agnostic — never hardcode kit names)
KITS=$(cd "$ROOT" && for d in */; do [ -d "$d" ] && echo "${d%/}"; done)
PFX=""; for k in $KITS; do PFX="$PFX$k|"; done; PFX="(${PFX%|})"

# CSS file -> structural skeleton: token refs, colors, sizes, url-filter ids and the
# kit prefix all collapsed, so two structurally-identical files compare equal.
norm() {
  sed -E \
    -e 's#/\*.*\*/##g' \
    -e 's/var\(--[A-Za-z0-9_-]+/var(T/g' \
    -e 's/url\(#[A-Za-z0-9_-]+\)/url(#F)/g' \
    -e 's/#[0-9a-fA-F]{3,8}\b/#H/g' \
    -e 's/rgba?\([0-9.,% ]*\)/C/g' \
    -e "s/(--|\.|#)${PFX}-/\1/g" \
    -e 's/-?[0-9]+\.?[0-9]*(px|em|rem|%|deg|ms|s|fr|vh|vw|dvh|ex|ch)?/N/g' \
    "$1" | sed -E 's/[[:space:]]+/ /g; s/^ //; s/ $//; /^$/d'
}

# two files -> similarity 0..100 (sequence diff over the skeleton)
filesim() {
  norm "$1" >"$TMP/a"; norm "$2" >"$TMP/b"
  ta=$(wc -l <"$TMP/a"); tb=$(wc -l <"$TMP/b"); tot=$((ta + tb))
  [ "$tot" -eq 0 ] && { echo 100; return; }
  changed=$(diff "$TMP/a" "$TMP/b" | grep -cE '^[<>]' || true)
  echo $(( 100 - changed * 100 / tot ))
}

# the visual layer = theme/effects.css + every component CSS
( echo "theme/effects.css"; cd "$ROOT/$KIT" && for f in components/*/*.css; do [ -f "$f" ] && echo "$f"; done ) >"$TMP/files"

echo "kit-distinct: '$KIT' vs siblings — structural similarity of the visual layer"
worst=0; worstkit=""; worstfr=0; worstfrkit=""
for S in $KITS; do
  [ "$S" = "$KIT" ] && continue
  sum=0; n=0; hi=""
  while read -r rel; do
    fa="$ROOT/$KIT/$rel"; fb="$ROOT/$S/$rel"
    { [ -f "$fa" ] && [ -f "$fb" ]; } || continue
    s=$(filesim "$fa" "$fb"); sum=$((sum + s)); n=$((n + 1))
    [ "$s" -ge 90 ] && hi="$hi    $rel ${s}%"$'\n'
  done <"$TMP/files"
  [ "$n" -eq 0 ] && continue
  avg=$((sum / n))
  fr=$(filesim "$ROOT/$KIT/theme/effects.css" "$ROOT/$S/theme/effects.css")
  echo
  echo "vs $S:  avg ${avg}% identical over $n visual files   (frame/elevation primitives ${fr}%)"
  [ -n "$hi" ] && { echo "  near-identical (>=90%, i.e. inherited not authored):"; printf '%s' "$hi"; }
  [ "$avg" -gt "$worst" ] && { worst=$avg; worstkit=$S; }
  [ "$fr" -gt "$worstfr" ] && { worstfr=$fr; worstfrkit=$S; }
done

# Calibrated on the two genuinely-distinct live kits (NOVA vs ABYSS = 58% avg / 44%
# primitives); a pure cp+reskin sits ~95%+. Flag on either signal.
echo
AVG_T=75; PRIM_T=80
if [ "$worst" -ge "$AVG_T" ] || [ "$worstfr" -ge "$PRIM_T" ]; then
  echo "RESULT: LIKELY RESKIN — '$KIT' inherits a sibling's visual structure:"
  [ "$worst"   -ge "$AVG_T"  ] && echo "  - ${worst}% avg structural identity to '$worstkit' (>= ${AVG_T}%)"
  [ "$worstfr" -ge "$PRIM_T" ] && echo "  - frame/elevation primitives ${worstfr}% identical to '$worstfrkit' (>= ${PRIM_T}%) — the core form is inherited, not authored"
  echo "  Fix: author the visual layer NATIVE — own frame/elevation primitive, geometry, component CSS,"
  echo "  signature .tsx. Reuse ONLY the Base UI .tsx wiring (the kit-agnostic skeleton)."
  exit 1
else
  echo "RESULT: DISTINCT — closest sibling '$worstkit' at ${worst}% avg, primitives peak ${worstfr}% (thresholds ${AVG_T}% / ${PRIM_T}%)."
fi

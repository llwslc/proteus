#!/bin/sh
# diff-hygiene — flag added code comments + test cruft in the diff. See SKILL.md.
#   sh check.sh [base]     worktree vs base (default HEAD) + untracked code files
#   sh check.sh --cached   staged changes only (what a commit would actually take)
if [ "$1" = "--cached" ]; then
  MODE="staged"
  DIFF=$(git diff --cached -U0 -- '*.css' '*.ts' '*.tsx' '*.js' '*.cjs' 2>/dev/null)
else
  MODE="${1:-HEAD}"
  DIFF=$(git diff -U0 "$MODE" -- '*.css' '*.ts' '*.tsx' '*.js' '*.cjs' 2>/dev/null)
  # untracked code files would sail into a `git add -A` commit unreviewed — scan them too
  UNTRACKED=$(git status --porcelain -uall | awk '/^\?\? .*\.(css|ts|tsx|js|cjs)$/ { print substr($0,4) }')
  for uf in $UNTRACKED; do
    DIFF="$DIFF
$(git diff -U0 --no-index -- /dev/null "$uf" 2>/dev/null)"
  done
fi
[ -z "$(printf '%s' "$DIFF" | tr -d '[:space:]')" ] && { echo "diff-hygiene: no code changes vs $MODE"; exit 0; }

printf '%s\n' "$DIFF" | awk '
  /^\+\+\+ b\// { f=substr($0,7); skill=(f ~ /^\.claude\//); inb=0; next }
  /^@@/ { match($0,/\+[0-9]+/); ln=substr($0,RSTART+1,RLENGTH-1)+0; inb=0; next }
  /^-/ { next }
  /^\+/ {
    raw=substr($0,2); t=raw; sub(/^[ \t]*/,"",t)
    # block-comment STATE is tracked unconditionally; findings print only past the
    # 2-line header allowance and outside .claude/ (skills are documentation-heavy)
    hit=0
    if (inb)              { hit=1; if (t ~ /\*\//) inb=0 }
    else if (t ~ /^\/\//) { hit=1 }
    else if (t ~ /^\/\*/) { hit=1; if (t !~ /\*\//) inb=1 }
    else if (t ~ /^\*\/$/ || t ~ /^\* [^ {,.:;]/)  { hit=1 }  # continuation, opener outside hunk
    if (hit && !skill && ln>2) { print "COMMENT  " f ":" ln "  " t; bad++ }
    if (!skill && (raw ~ /console\.(log|debug|warn|error)/ || raw ~ /debugger/ \
          || raw ~ /(^|[^A-Za-z0-9_])(TODO|FIXME|XXX|HACK)([^A-Za-z0-9_]|$)/ \
          || raw ~ /setTimeout\([^,]*,[ \t]*[0-9]/ || raw ~ /data-debug/))
      { print "CRUFT    " f ":" ln "  " t; bad++ }
    ln++; next
  }
  END { exit (bad>0?1:0) }
'
RC=$?
[ $RC -eq 0 ] && echo "diff-hygiene: clean vs $MODE" \
  || echo "
diff-hygiene: delete the above before committing (minimal-comments / no-test-cruft)"
exit $RC

#!/bin/sh
# PreToolUse(Bash) hook — run diff-hygiene before any `git commit`.
# Staged changes are always checked (that is what the commit takes). A sweep-style
# command (`add -A` / `add .` / `commit -a`) would also pull in worktree/untracked
# files, so those get the full-worktree check too. Exit 2 blocks the commit.
CMD=$(jq -r '.tool_input.command // empty' 2>/dev/null)
case "$CMD" in
  *git\ commit*|*git\ *\ commit*) ;;
  *) exit 0 ;;
esac
GATE="sh .claude/skills/diff-hygiene/check.sh"
OUT=$($GATE --cached) || {
  printf '%s\n' "$OUT" >&2
  echo "diff-hygiene: staged changes carry comments/cruft — clean them before committing" >&2
  exit 2
}
case "$CMD" in
  *add\ -A*|*add\ .*|*add\ --all*|*commit\ -a*|*commit\ --all*|*commit\ -am*)
    OUT=$($GATE) || {
      printf '%s\n' "$OUT" >&2
      echo "diff-hygiene: this sweep-style commit would take flagged worktree/untracked files — use a scoped git add or clean them" >&2
      exit 2
    } ;;
esac
exit 0

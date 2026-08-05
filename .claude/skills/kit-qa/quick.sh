#!/bin/sh
# kit-qa quick — 按改动范围挑门。全量 check.sh 仍是收官/验收线。
# 用法: sh quick.sh [base]   (默认对 HEAD 的未提交改动;可传 commit 比较)
cd "$(dirname "$0")/../../.." || exit 2
BASE=${1:-HEAD}
FILES=$( { git diff --name-only "$BASE"; git diff --name-only --cached "$BASE"; git ls-files --others --exclude-standard; } | sort -u )
[ -z "$FILES" ] && { echo "无改动 vs $BASE"; exit 0; }
echo "改动文件:"; echo "$FILES" | sed 's/^/  /'

has() { echo "$FILES" | grep -Eq "$1"; }
RUN=""; SKIP_NOTE=""

has '^prompt/' && RUN="$RUN prompt-lint theme-doc-sync kit-spec-coverage kit-entrance kit-spec-props kit-skeleton"
has '^\.claude/skills/.*SKILL\.md$' && RUN="$RUN prompt-lint"
RUN="$RUN eslint format-check diff-hygiene"
if has '\.tsx?$'; then
  RUN="$RUN tsc kit-api kit-structure kit-naming kit-deadcode kit-demo-states kit-spec-props kit-skeleton fingerprint"
fi
has 'App\.tsx$|components/.*\.tsx$' && RUN="$RUN kit-a11y kit-equality"
if has 'src/kits/.*\.css$|^src/shell/.*\.css$'; then
  RUN="$RUN kit-lint kit-deadcode kit-structure kit-visual fingerprint kit-spec-coverage kit-parity kit-glyph-center"
  has 'src/kits/.*App\.css$' && RUN="$RUN kit-entrance"
  has 'Menu|Menubar|ContextMenu|Navigation|Tooltip|Popover|Preview|Dialog|Drawer|Toast|Select|Combobox|Autocomplete' && RUN="$RUN kit-submenu-gap kit-anim-sync kit-overflow-bleed"
  has 'Input|Select|Combobox|Autocomplete|NumberField|theme/effects' && RUN="$RUN kit-hover"
  has 'Tabs|Menubar|Toolbar' && RUN="$RUN kit-scroll-rail"
  SKIP_NOTE="css 改动按文件名挑了动态门;交互态(按压/触屏/Toast 堆叠)仍只有 kit-interact 能验,字段悬停归 kit-hover,收官请跑全量 check.sh"
fi
# 门本身被改动 → 至少跑一遍被改的那道,证明它还能跑
for g in $(echo "$FILES" | sed -n 's|^\.claude/skills/\(kit-[a-z-]*\)/check\..*|\1|p' | sort -u); do RUN="$RUN $g"; done
RUN=$(echo "$RUN" | tr ' ' '\n' | sort -u | grep -v '^$')
echo; echo "选中的门:"; echo "$RUN" | sed 's/^/  /'; echo

fail=0
for g in $RUN; do
  case $g in
    tsc) npx tsc --noEmit >/tmp/kq-tsc.log 2>&1; rc=$?;;
    eslint) npm run lint >/tmp/kq-eslint.log 2>&1; rc=$?;;
    format-check) npm run format:check >/tmp/kq-format-check.log 2>&1; rc=$?;;
    prompt-lint) bash .claude/skills/prompt-lint/check.sh >/tmp/kq-$g.log 2>&1; rc=$?;;
    diff-hygiene) sh .claude/skills/diff-hygiene/check.sh >/tmp/kq-$g.log 2>&1; rc=$?;;
    kit-parity) sh .claude/skills/kit-parity/check.sh >/tmp/kq-$g.log 2>&1; rc=$?;;
    kit-visual|kit-glyph-center|kit-submenu-gap|kit-anim-sync|kit-overflow-bleed|kit-scroll-rail|kit-equality|kit-a11y)
      GATE_PORT=${GATE_PORT:-5273} node .claude/skills/$g/check.cjs ${GATE_PORT:-5273} >/tmp/kq-$g.log 2>&1; rc=$?;;
    kit-lint) : >/tmp/kq-$g.log; for k in src/kits/*/; do k=$(basename "$k"); bash .claude/skills/kit-lint/check.sh "$k" >>/tmp/kq-$g.log 2>&1 || rc=1; done; rc=${rc:-0};;
    fingerprint) GATE_PORT=${GATE_PORT:-5273} node .claude/skills/kit-qa/fingerprint.cjs >/tmp/kq-$g.log 2>&1; rc=$?; [ $rc != 0 ] && sed -n '1,12p' /tmp/kq-$g.log;;
    *) node .claude/skills/$g/check.cjs >/tmp/kq-$g.log 2>&1; rc=$?;;
  esac
  if [ "$rc" = 0 ]; then printf "  PASS  %s\n" "$g"; else printf "  FAIL  %s  (日志 /tmp/kq-%s.log)\n" "$g" "$g"; fail=1; fi
  rc=
done
[ -n "$SKIP_NOTE" ] && { echo; echo "注意: $SKIP_NOTE"; }
echo; [ $fail = 0 ] && echo "kit-qa quick: PASS(范围内)" || echo "kit-qa quick: FAIL"
exit $fail

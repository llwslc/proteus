// A selector written twice in the SAME file and SAME at-rule context — the second rule
// was appended instead of merged into the first (properties for one element split across
// two blocks, sometimes overriding each other). Exempt: a later rule declaring ONLY
// animation-* — App.css groups the whole entrance layer in its own trailing section.
const fs = require('fs');
const path = require('path');

const root = process.argv[2];
if (!root) {
  console.error('usage: dup-selector.cjs <kit-root>');
  process.exit(2);
}

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.css')) files.push(p);
  }
})(root);

const norm = (s) => s.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').trim();
const onlyAnimation = (body) => {
  const props = [...body.matchAll(/(^|;)\s*([-a-zA-Z]+)\s*:/g)].map((m) => m[2]);
  return props.length > 0 && props.every((p) => /^animation(-|$)/.test(p));
};

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const seen = new Map();
  const stack = [];
  let buf = '', line = 1, i = 0;

  while (i < src.length) {
    const ch = src[i];
    if (ch === '\n') line++;
    if (ch === '{') {
      const prelude = norm(buf);
      buf = '';
      let depth = 1, j = i + 1, inner = '';
      while (j < src.length && depth > 0) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
        if (depth > 0) inner += src[j];
        j++;
      }
      const isAtRule = prelude.startsWith('@');
      const nested = /\{/.test(inner);
      if (!isAtRule && !nested) {
        const key = stack.join(' >> ') + '||' + prelude;
        if (!seen.has(key)) seen.set(key, []);
        seen.get(key).push({ line, body: inner });
      }
      if (isAtRule || nested) {
        stack.push(prelude);
        i++;
        continue;
      }
      for (let k = i; k < j; k++) if (src[k] === '\n') line++;
      i = j;
      continue;
    }
    if (ch === '}') {
      stack.pop();
      buf = '';
      i++;
      continue;
    }
    buf += ch;
    i++;
  }

  for (const [key, rules] of seen) {
    if (rules.length < 2) continue;
    if (rules.slice(1).every((r) => onlyAnimation(r.body))) continue;
    const [ctx, sel] = key.split('||');
    console.log(`${f}:${rules.map((r) => r.line).join(',')}  ${ctx ? '[' + ctx + '] ' : ''}${sel}`);
  }
}

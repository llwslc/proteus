// kit-anim-sync — dynamic gate: an overlay's connector/decoration must animate IN
// SYNC with the overlay's own entrance/exit. See SKILL.md. Run in place.
// node .claude/skills/kit-anim-sync/check.cjs [port] [kit]   (dev server must be up)
// node .claude/skills/kit-anim-sync/check.cjs [port] break   (self-test: should FAIL)
// Catches the recurring "动画不同步" class the eye keeps finding per-side/per-phase:
//  (A) a connector (Arrow) more opaque than its popup for >=3 frames — it pops in
//      ahead of the popup instead of fading with it (the bauhaus/nova connector bug);
//  (B) a one-shot decoration that animates while its overlay is still off-viewport —
//      its flourish plays off-screen and is done by the time you see it (the abyss
//      Drawer key bug). A flaky MOUNT is a WARN, never a FAIL (flaky gate < no gate).
const { chromium } = require('/tmp/pw/node_modules/playwright-core');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = `http://127.0.0.1:${process.argv[2]||'5273'}/`;
const ONLY = process.argv[3] && process.argv[3]!=='break' ? process.argv[3] : null;
const BREAK = process.argv.includes('break');
const CONN = [['tooltip','#tooltip button, #tooltip a','hover'],['popover','#popover button','click'],['preview','#preview a, #preview button','hover']];
const SLIDE = [['drawer','#drawer button','click']];
const setKit = async (p,k)=>{ await p.goto(URL,{waitUntil:'networkidle'}); await p.evaluate(k=>localStorage.setItem('kit',k),k); await p.reload({waitUntil:'networkidle'}); };
const RECORDER = (inject) => { // runs in page: start bg rAF recorder, catches overlay from mount
  window.__done=false; window.__rec=[]; window.__names=null; let track=null, captured=0, total=0;
  const find=()=>document.querySelector('body > div [class*="connector"],body > div [class*="popup"],body > div [class*="popover"],body > div [class*="tooltip"],body > div [class*="preview"],body > div [class*="drawer"],body > div [class*="modal"],body > div [role="dialog"],body > div [role="tooltip"]');
  const vw=innerWidth,vh=innerHeight;
  function tick(){ total++;
    if(!track){ const a=find(); if(a){ const portal=a.closest('body > div'); const connector=portal.querySelector('[class*="connector"],[class*="arrow"]');
      const boxes=[...portal.querySelectorAll('[class*="popup"],[class*="popover"],[class*="tooltip"],[class*="preview"],[class*="drawer"],[class*="modal"],[class*="sheet"],[role="dialog"],[role="tooltip"]')];
      const popup=boxes.sort((x,y)=>{const rx=x.getBoundingClientRect(),ry=y.getBoundingClientRect();return ry.width*ry.height-rx.width*rx.height;})[0]||a;
      const one=[...portal.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);return cs.animationName&&cs.animationName!=='none'&&cs.animationIterationCount==='1';});
      track=[['popup',popup]]; if(connector)track.push(['connector',connector]); one.forEach((e,i)=>{if(e!==popup&&e!==connector)track.push(['oneshot:'+((e.className||'').toString().split(' ').find(c=>/key|sigil|seam|art|glyph|mark|orbit|deco/i.test(c))||i),e]);}); } }
    if(track){ window.__rec.push(track.map(([n,el])=>{const cs=getComputedStyle(el),r=el.getBoundingClientRect();const offX=Math.max(0,-r.left)+Math.max(0,r.right-vw),offY=Math.max(0,-r.top)+Math.max(0,r.bottom-vh);return{n,op:+cs.opacity,tf:cs.transform,off:+Math.min(1,(offX*r.height+offY*r.width)/Math.max(1,r.width*r.height)).toFixed(2)};})); captured++; }
    if(captured<16 && (track || total<300)) requestAnimationFrame(tick); else { window.__names=track?track.map(t=>t[0]):null; window.__done=true; } }
  requestAnimationFrame(tick);
};
async function record(page, kind, sel, inject){
  if(inject) await page.addStyleTag({content:inject});
  await page.evaluate(RECORDER);
  const trig=page.locator(sel).first();
  try{ if(kind==='hover') await trig.hover(); else await trig.click(); }catch(e){}
  await page.waitForFunction(()=>window.__done,{timeout:5000}).catch(()=>{});
  return await page.evaluate(()=>({names:window.__names, rec:window.__rec, err: window.__names?null:'overlay never mounted'}));
}
function analyze(r){ const f=[]; const pi=r.names.indexOf('popup'), ci=r.names.indexOf('connector');
  if(ci>=0){ let run=0,mx=0; for(const fr of r.rec){ if(fr[ci].op-fr[pi].op>0.4){run++;mx=Math.max(mx,run);}else run=0; } if(mx>=3)f.push(`connector ahead of popup ${mx} frames (pop-in)`); }
  r.names.forEach((nm,idx)=>{ if(!nm.startsWith('oneshot'))return; let bad=0; for(let k=1;k<r.rec.length;k++){const a=r.rec[k][idx],b=r.rec[k-1][idx];if(((Math.abs(a.op-b.op)>0.02)||a.tf!==b.tf)&&r.rec[k][pi].off>0.3)bad++;} if(bad>=2)f.push(`${nm} animates while overlay off-viewport ${bad} frames`); });
  return f;
}
(async()=>{
  const browser=await chromium.launch({executablePath:CHROME,args:['--disable-gpu']});
  const probe=await browser.newPage(); await probe.goto(URL,{waitUntil:'networkidle'}); let kits=await probe.$$eval('.shell-switch__btn',e=>e.map(x=>x.getAttribute('data-kit-id')).filter(Boolean)); await probe.close();
  if(ONLY)kits=kits.filter(k=>k===ONLY); let total=0;
  for(const kit of kits){ for(const [id,sel,kind] of [...CONN,...SLIDE]){ const p=await browser.newPage({viewport:{width:1440,height:900}}); await setKit(p,kit);
    let r; try{ r=await record(p,kind,sel, BREAK ? '[class*="connector"]{animation:none !important;opacity:1 !important}' : null);}catch(e){ r={err:e.message.split('\n')[0].slice(0,40)}; }
    if(r.err){ console.log(`  WARN ${kit} ${id}: ${r.err}`); } else { for(const fl of analyze(r)){ console.log(`  FAIL ${kit} ${id}: ${fl}`); total++; } } await p.close(); } }
  console.log(total?`\nRESULT: ${total} fault(s)`:`\nRESULT: PASS (overlay animations in sync)`); await browser.close();
})();

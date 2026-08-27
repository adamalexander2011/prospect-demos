#!/usr/bin/env node
/**
 * Renders a page in headless Chrome and scores how dated or cluttered it LOOKS.
 *
 * bin/audit-site.py measures plumbing. This measures the part a customer
 * actually reacts to. A site can pass every technical check and still look
 * like nobody has touched it since 2014, and that site is a better prospect,
 * not a worse one.
 *
 *   node bin/design-probe.js https://a.com https://b.com ...
 *   node bin/design-probe.js --json https://a.com        # machine readable
 *
 * Higher score = worse looking = better prospect. Calibration:
 *   goblin-hvac.com (their real site)      ~65
 *   demos.locallvrg.co/goblin-hvac/ (ours)  ~5
 */

const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9333;
const VW = 1440, VH = 900;

/* ---------- the probe, stringified into the page ---------- */
const PROBE = `(() => {
  const vw = innerWidth, vh = innerHeight;
  const vis = [...document.querySelectorAll('body *')].filter(e => {
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > .05;
  });

  const toHue = c => {
    const m = c && c.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?/);
    if (!m) return null;
    if (m[4] !== undefined && +m[4] < .15) return null;
    let [r,g,b] = [+m[1]/255,+m[2]/255,+m[3]/255];
    const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx - mn;
    if (d < .12) return null;
    let h = mx===r ? ((g-b)/d)%6 : mx===g ? (b-r)/d+2 : (r-g)/d+4;
    return ((Math.round(h*60)%360)+360)%360;
  };
  const hueTally = {};
  vis.forEach(e => { const s = getComputedStyle(e);
    [s.backgroundColor, s.color, s.borderTopColor].forEach(c => {
      const h = toHue(c); if (h === null) return;
      const b = Math.round(h/30)*30 % 360; hueTally[b] = (hueTally[b]||0)+1; }); });
  const hues = Object.entries(hueTally).filter(([,n]) => n >= 4).map(([h]) => +h).sort((a,b)=>a-b);

  // orphan hue: a major hue more than 90 degrees from the busiest one
  const totalHits = Object.values(hueTally).reduce((a,b)=>a+b,0) || 1;
  const dom = Object.entries(hueTally).sort((a,b)=>b[1]-a[1])[0];
  const domHue = dom ? +dom[0] : null;
  const arc = (a,b) => { const d = Math.abs(a-b) % 360; return d > 180 ? 360-d : d; };
  // an orphan only counts if it is actually carrying the page, not a lone status chip
  const orphans = domHue === null ? [] :
    hues.filter(h => arc(h, domHue) > 90 && (hueTally[h]/totalHits) >= 0.15);

  const ICON = /font\\s*awesome|fontawesome|^fa[-\\s]|icons?$|slick|dashicons|eicons|material icons|glyphicon|ionicons/i;
  const fonts = new Set();
  vis.forEach(e => { const f = getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,'').trim();
    if (f && !ICON.test(f)) fonts.add(f); });
  const SYSTEM = /^(arial|helvetica|times|times new roman|georgia|verdana|tahoma|courier|-apple-system|system-ui|sans-serif|serif|inherit|ui-|blinkmac)/i;
  const realFonts = [...fonts].filter(f => !SYSTEM.test(f));

  // Furniture means things competing for attention: bars, rails, floating buttons.
  // A fixed hero background and its overlay are scenery, not clutter, so a pinned
  // element only counts if it carries content and is not covering the viewport.
  const stuck = vis.filter(e => ['fixed','sticky'].includes(getComputedStyle(e).position))
    .filter(e => { const r = e.getBoundingClientRect(); return r.width*r.height > 1600; })
    .filter(e => e.tagName !== 'IMG')
    .filter(e => {
      const r = e.getBoundingClientRect();
      const coversScreen = r.width >= vw * 0.9 && r.height >= vh * 0.7;
      const hasContent = e.innerText.trim().length > 0 || e.querySelector('a,button,svg,img,input');
      return hasContent && !coversScreen;
    });
  const furniture = stuck.filter(e => !stuck.some(o => o !== e && o.contains(e)));

  // the headline a visitor actually sees: visible, real size, near the top.
  // Hidden 1px SEO h1s parked 2000px down are not the hero.
  const bigEnough = e => parseFloat(getComputedStyle(e).fontSize) >= 18;
  const nearTop = e => (e.getBoundingClientRect().top + scrollY) < vh * 2.2;
  const cands = [...document.querySelectorAll('h1,h2')].filter(e => vis.includes(e) && bigEnough(e) && nearTop(e));
  const h1 = cands.find(e => e.tagName === 'H1') || cands[0] || null;
  const h1r = h1 && h1.getBoundingClientRect();

  const hosts = new Set();
  [...document.querySelectorAll('script[src],link[href],iframe[src]')].forEach(e => {
    try { const u = new URL(e.src || e.href, location.href);
      if (u.host && u.host !== location.host) hosts.add(u.host.replace(/^www\\./,'')); } catch (err) {} });

  // desktop hamburger: a visible toggle while we are on a wide viewport
  const burger = vis.find(e => /menu-toggle|hamburger|nav-toggle|mobile-menu|menu-icon|navbar-toggle/i
                   .test(String(e.className) + ' ' + String(e.id)));

  // widest text block, to catch fixed 960px containers and unbounded full-bleed text
  let widest = 0;
  vis.filter(e => e.children.length === 0 && e.textContent.trim().length > 80)
     .forEach(e => { const r = e.getBoundingClientRect(); if (r.width > widest) widest = Math.round(r.width); });

  return {
    host: location.hostname.replace(/^www\\./,''),
    vh, bodyPx: Math.round(parseFloat(getComputedStyle(document.body).fontSize)),
    h1Top: h1r ? Math.round(h1r.top + scrollY) : null,
    h1Px: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : null,
    h1Text: h1 ? h1.innerText.trim().slice(0,58) : null,
    fonts: [...fonts], webfonts: realFonts.length,
    hues, orphans, furniture: furniture.length,
    furnitureList: furniture.map(e => (e.tagName + '.' + String(e.className).split(' ')[0]).slice(0,28)),
    hosts: hosts.size, burger: !!burger, widestText: widest
  };
})()`;

/* ---------- turn measurements into a score ---------- */
function score(m) {
  const flags = [];
  let total = 0;
  const hit = (pts, text) => { total += pts; flags.push({ pts, text }); };

  if (m.h1Top !== null) {
    const pct = Math.round(m.h1Top / m.vh * 100);
    if (pct > 58)      hit(20, `${pct}% of the first screen is used up before the headline`);
    else if (pct > 48) hit(12, `${pct}% of the first screen goes before the headline`);
    else if (pct > 38) hit(4,  `${pct}% of the first screen before the headline`);
  } else hit(10, 'no headline element on the page at all');

  if (m.h1Px !== null) {
    if (m.h1Px < 32)      hit(14, `headline is only ${m.h1Px}px, it does not carry the page`);
    else if (m.h1Px < 44) hit(8,  `headline is ${m.h1Px}px, timid for a hero`);
  }

  if (m.furniture >= 4)      hit(15, `${m.furniture} things pinned to the screen at once (${m.furnitureList.join(', ')})`);
  else if (m.furniture === 3) hit(10, `3 floating elements competing for attention`);
  else if (m.furniture === 2) hit(5,  `2 floating elements`);

  if (m.hosts >= 10)     hit(10, `${m.hosts} third-party hosts loading on one page`);
  else if (m.hosts >= 6) hit(5,  `${m.hosts} third-party hosts`);

  if (m.orphans.length)  hit(12, `palette does not hold together, ${m.orphans.length} hue(s) unrelated to the rest`);
  else if (m.hues.length >= 5) hit(8, `${m.hues.length} competing colour families`);

  if (m.webfonts === 0)  hit(12, 'no webfont at all, system stack only');
  if (m.bodyPx < 16)     hit(6,  `body text set at ${m.bodyPx}px`);
  if (m.burger)          hit(8,  'navigation hidden behind a hamburger on desktop');
  if (m.widestText && m.widestText < 460) hit(6, `text columns only ${m.widestText}px wide, a phone layout stretched onto a desktop`);
  if (m.widestText > 1250) hit(6, `text runs ${m.widestText}px wide with no measure, hard to read`);

  return { total, flags };
}

/* ---------- CDP plumbing, no dependencies ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function waitForPort() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) return; } catch (e) {}
    await sleep(250);
  }
  throw new Error('Chrome did not open the debugging port');
}

async function probe(url) {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const events = [];

  await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = () => no(new Error('ws failed')); });
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method) events.push(msg.method);
  };
  const send = (method, params = {}) => new Promise(ok => {
    const myId = ++id; pending.set(myId, ok);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

  try {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: VW, height: VH, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url });
    for (let i = 0; i < 60; i++) { if (events.includes('Page.loadEventFired')) break; await sleep(250); }
    await sleep(2200);                                   // let lazy chrome settle in
    const out = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true, awaitPromise: false });
    if (out.result?.exceptionDetails || !out.result?.result?.value) throw new Error('probe returned nothing');
    return out.result.result.value;
  } finally {
    ws.close();
    try { await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`); } catch (e) {}
  }
}

(async () => {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const urls = args.filter(a => !a.startsWith('--'));
  if (!urls.length) { console.error('usage: node bin/design-probe.js [--json] <url> [url...]'); process.exit(1); }

  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu', '--no-first-run',
    '--no-default-browser-check', '--disable-extensions', `--window-size=${VW},${VH}`,
    '--user-data-dir=/tmp/design-probe-profile'
  ], { stdio: 'ignore' });

  const results = [];
  try {
    await waitForPort();
    for (const url of urls) {
      try {
        const m = await probe(url);
        const s = score(m);
        results.push({ url, ...m, designScore: s.total, flags: s.flags });
        if (!asJson) {
          console.log('='.repeat(78));
          console.log(`${m.host.padEnd(34)} DESIGN ${s.total}`);
          if (m.h1Text) console.log(`  headline : "${m.h1Text}" @ ${m.h1Px}px, ${m.h1Top}px down`);
          console.log(`  type     : ${m.fonts.join(', ') || 'none'}`);
          console.log(`  palette  : ${m.hues.join('/')}${m.orphans.length ? '  orphan: ' + m.orphans.join('/') : ''}`);
          console.log(`  loaded   : ${m.hosts} third-party hosts, ${m.furniture} pinned elements`);
          s.flags.forEach(f => console.log(`  [+${f.pts}] ${f.text}`));
        }
      } catch (e) {
        results.push({ url, error: String(e.message || e) });
        if (!asJson) { console.log('='.repeat(78)); console.log(`${url}\n  ! ${e.message}`); }
      }
    }
  } finally {
    chrome.kill();
  }
  if (asJson) console.log(JSON.stringify(results, null, 2));
})();

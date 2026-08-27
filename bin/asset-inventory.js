#!/usr/bin/env node
/**
 * Answers "what is this business sitting on that nobody can see?" as far as a
 * machine can. The judgment is still yours. The inventory is not.
 *
 *   node bin/asset-inventory.js https://theirsite.com
 *   node bin/asset-inventory.js --json https://theirsite.com
 *
 * Every check here exists because it changed a real read:
 *
 *   Getty stock on Sweers        -> "you are illustrating 66 years of your own
 *                                    roofs with photographs of other people's"
 *   Walters logo on Buck&Bossman -> "this is your supplier's website with your
 *                                    phone number on it"
 *   Projects -> /blog on Sweers   -> the one thing a roofer must prove, mislabelled
 *   Widget-locked reviews         -> decides whether we can quote them at all
 */

const { spawn } = require('child_process');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9355;
const VW = 1440, VH = 900;

const PROBE = String.raw`(() => {
  const host = location.hostname.replace(/^www\./,'');
  const domainWord = host.split('.')[0].replace(/[^a-z]/gi,'').toLowerCase();
  const txt = document.body.innerText;
  const abs = u => { try { return new URL(u, location.href).href } catch(e) { return u } };
  const base = u => (u||'').split('/').pop().split('?')[0].slice(0,52);

  /* ---------- every image, however it is served ---------- */
  const tagged = [...document.querySelectorAll('img')].map(i => ({
    src: abs(i.currentSrc || i.src), w: i.naturalWidth, h: i.naturalHeight,
    alt: (i.alt||'').slice(0,60), how: 'img'
  }));
  const bg = [];
  [...document.querySelectorAll('body *')].forEach(e => {
    const b = getComputedStyle(e).backgroundImage;
    if (!b || b === 'none' || !b.includes('url(')) return;
    const u = (b.match(/url\(["']?(.*?)["']?\)/)||[])[1];
    if (!u || u.startsWith('data:')) return;
    const r = e.getBoundingClientRect();
    bg.push({ src: abs(u), w: Math.round(r.width), h: Math.round(r.height), alt:'', how:'css' });
  });
  const seen = new Set();
  const images = [...tagged, ...bg].filter(i => { const k=i.src; if(seen.has(k)) return false; seen.add(k); return true; });

  const PAYMENT = /visa|mastercard|amex|american express|discover|paypal|stripe|apple ?pay|google ?pay|financing|payment/i;
  const CHROME_UI = /menu|hamburger|captcha|search|close|arrow|icon-|spinner|placeholder|avatar|star|cart/i;
  const isBadge = i => PAYMENT.test(i.src + ' ' + i.alt);
  const isChrome = i => CHROME_UI.test(i.src + ' ' + i.alt);
  const isLogo = i => !isBadge(i) && !isChrome(i) && (/logo|brand|wordmark|header/i.test(i.src + ' ' + i.alt) || (i.w>0 && i.w<260 && i.h>0 && i.h<140));
  const photos = images.filter(i => !isLogo(i) && !isBadge(i) && !isChrome(i));
  const bigPhotos = photos.filter(i => i.w >= 600);
  const smallPhotos = photos.filter(i => i.w > 0 && i.w < 600);

  /* ---------- stock photography ---------- */
  const STOCK = /getty|shutterstock|istock|unsplash|pexels|adobe[-_.]?stock|depositphoto|dreamstime|123rf|freepik|stock[-_.]?photo|canva/i;
  const stock = images.filter(i => STOCK.test(i.src)).map(i => ({ file: base(i.src), how: i.how, px: i.w+'x'+i.h }));

  /* ---------- whose brand is this, actually ---------- */
  const logos = images.filter(isLogo).map(i => ({ file: base(i.src), alt: i.alt }));
  const payments = images.filter(isBadge).map(i => i.alt || base(i.src));
  const logoAlts = logos.map(l => l.alt).filter(Boolean);
  const foreignLogo = logoAlts.filter(a => {
    const w = a.replace(/[^a-z]/gi,'').toLowerCase();
    return w.length > 3 && !w.includes(domainWord) && !domainWord.includes(w.slice(0,6));
  });
  const h1 = document.querySelector('h1');
  const phones = [...new Set((txt.match(/\(?\b(?:8(?:00|33|44|55|66|77|88)|\d{3})\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g)||[]))].slice(0,4);
  const tollFree = phones.filter(p => /^\(?8(00|33|44|55|66|77|88)\)?[-.\s]?\d{3}/.test(p.trim()));
  const franchiseTells = (txt.match(/\b(authorized|exclusive|certified|official)\s+(dealer|installer|partner|contractor|franchise)[^.\n]{0,50}/gi)||[]).slice(0,4);

  /* ---------- proof that is promised but not delivered ---------- */
  const PROOF = /\b(projects?|galler(?:y|ies)|our[-\s]?work|portfolio|before[-\s]?(?:&|and)?[-\s]?after|past[-\s]?jobs?|photos?)\b/i;
  const proofNav = [...document.querySelectorAll('a')]
    .filter(a => PROOF.test(a.innerText) || PROOF.test(a.textContent||'') ||
                 PROOF.test((a.getAttribute('href')||'').replace(/[-_/]/g,' ')))
    .map(a => ({ label: (a.innerText||a.textContent||'').trim().slice(0,30) || '(hidden nav)', href: abs(a.getAttribute('href')||'') }))
    .filter((v,i,arr) => arr.findIndex(x => x.label===v.label) === i).slice(0,6);
  const proofMisrouted = proofNav.filter(p => /\/(blog|news|contact|about|home)\/?$|^#$|^$/i.test(new URL(p.href, location.href).pathname + ''));

  /* ---------- credentials ---------- */
  const founded = (txt.match(/\b(?:since|established|est\.|founded(?:\s+in)?)\s*(19|20)\d{2}\b/gi)||[]);
  const yearsIn = (txt.match(/\b\d{1,3}\+?\s*years?\s+(?:of\s+)?(?:in\s+)?(?:experience|business|serving|strong)\b/gi)||[]);
  const licences = (txt.match(/\b(?:licen[sc]e|lic\.?)\s*#?\s*[\w-]{4,18}\b/gi)||[]);
  const certs = (txt.match(/\b(GAF|CertainTeed|Owens Corning|Duro-?Last|Atlas Roof\w*|Unilock|Belgard|Techo-?Bloc|Trex|Andersen|Pella|Carrier|Trane|Lennox|Rheem|Navien|Daikin|Amana|Goodman|Mitsubishi|NFBA|NARI|NRCA|EPA|NATE|BBB)\b[^.\n]{0,34}/gi)||[]);
  const insured = /\b(licensed and insured|fully insured|bonded)\b/i.test(txt);

  /* ---------- published prices ---------- */
  const prices = [...new Set((txt.match(/\$\s?\d[\d,]{0,7}(?:\.\d{2})?(?:\s*\/\s*\w+)?/g)||[]))].slice(0,10);
  const planNames = (txt.match(/\b(?:basic|standard|premium|starter|silver|gold|platinum|essential|plus|pro)\s+(?:plan|package|membership|tier)\b/gi)||[]).slice(0,6);

  /* ---------- reviews: readable, or locked away ---------- */
  const quotes = (txt.match(/[""][^""]{45,260}[""]/g)||[]).slice(0,4).map(q => q.slice(0,140));
  const reviewCounts = (txt.match(/\b\d{1,4}\+?\s*(?:five[\s-]?star|5[\s-]?star|google|customer)?\s*reviews?\b/gi)||[]).slice(0,4);
  const REVIEW_WIDGET = /birdeye|podium|nicejob|grade\.us|reviewsonmywebsite|trustindex|elfsight|shapo|reputation|widget\.reviews|sociablekit|embedsocial/i;
  const scripts = [...document.querySelectorAll('script[src],iframe[src],link[href]')]
    .map(e => { try { return new URL(e.src||e.href, location.href).host.replace(/^www\./,'') } catch(e2){ return null } }).filter(Boolean);
  const reviewWidgets = [...new Set(scripts.filter(h => REVIEW_WIDGET.test(h)))];

  return {
    host,
    photos: { total: photos.length, fullSize: bigPhotos.length, small: smallPhotos.length,
              widest: photos.reduce((m,i)=>Math.max(m,i.w),0),
              cssServed: photos.filter(p=>p.how==='css').length,
              sample: photos.sort((a,b)=>b.w-a.w).slice(0,8).map(p=>({file:base(p.src),px:p.w+'x'+p.h,how:p.how,alt:p.alt})) },
    stock,
    brand: { logos: logos.slice(0,4), foreignLogoAlt: [...new Set(foreignLogo)],
             h1: h1 ? h1.innerText.trim().slice(0,80) : null,
             phones, tollFree, franchiseTells, payments: [...new Set(payments)].slice(0,5) },
    proof: { navPromises: proofNav, misrouted: proofMisrouted },
    credentials: { founded: [...new Set(founded)].slice(0,3), yearsIn: [...new Set(yearsIn)].slice(0,3),
                   licences: [...new Set(licences)].slice(0,3), certs: [...new Set(certs.map(c=>c.trim()))].slice(0,8), insured },
    pricing: { published: prices, planNames: [...new Set(planNames)] },
    reviews: { quotesInDom: quotes.length, sample: quotes.slice(0,2), counts: [...new Set(reviewCounts)], widgets: reviewWidgets }
  };
})()`;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(url) {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0; const pending = new Map(); const events = [];
  await new Promise((ok, no) => { ws.onopen = ok; ws.onerror = () => no(new Error('ws failed')); });
  ws.onmessage = ev => { const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } else if (m.method) events.push(m.method); };
  const send = (method, params = {}) => new Promise(ok => { const i = ++id; pending.set(i, ok); ws.send(JSON.stringify({ id: i, method, params })); });
  try {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: VW, height: VH, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url });
    for (let i = 0; i < 60; i++) { if (events.includes('Page.loadEventFired')) break; await sleep(250); }
    await sleep(1200);
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });  // wake lazy images
    await sleep(1800);
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
    await sleep(600);
    const out = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true });
    if (!out.result?.result?.value) throw new Error('probe returned nothing');
    return out.result.result.value;
  } finally {
    ws.close();
    try { await fetch(`http://127.0.0.1:${PORT}/json/close/${target.id}`); } catch (e) {}
  }
}

function report(d) {
  const L = [];
  const say = s => L.push(s);
  say('='.repeat(78));
  say(`${d.host}`);
  say('');

  const p = d.photos;
  say(`PHOTOGRAPHY   ${p.total} photo(s), ${p.fullSize} at 600px or better, widest ${p.widest}px`);
  if (p.cssServed) say(`              ${p.cssServed} served as CSS backgrounds, invisible to a markup scan`);
  p.sample.forEach(s => say(`              ${String(s.px).padEnd(11)} ${s.how.padEnd(4)} ${s.file}${s.alt ? '  "'+s.alt+'"' : ''}`));
  if (!p.fullSize) say(`  >> NOTHING AT FULL SIZE. Either they have no usable photography, or it is`);
  if (!p.fullSize) say(`     somewhere the homepage does not show. Settle this before promising a build.`);
  if (p.fullSize && p.widest < 900) say(`  >> Best image is only ${p.widest}px. Real work, served too small to use.`);
  say('');

  if (d.stock.length) {
    say(`STOCK PHOTOS  ${d.stock.length} found`);
    d.stock.forEach(s => say(`              ${s.px.padEnd(11)} ${s.how.padEnd(4)} ${s.file}`));
    say(`  >> They are illustrating their own work with somebody else's. That is an angle,`);
    say(`     and it is also a rule: do not replace their stock with our stock.`);
  } else say('STOCK PHOTOS  none detected');
  say('');

  const b = d.brand;
  say(`BRAND         h1: ${b.h1 || '(none above the fold)'}`);
  b.logos.forEach(l => say(`              logo: ${l.file}${l.alt ? '  alt="'+l.alt+'"' : ''}`));
  if (b.phones.length) say(`              phone: ${b.phones.join(', ')}`);
  if (b.foreignLogoAlt.length) {
    say(`  >> LOGO DOES NOT MATCH THE DOMAIN: ${b.foreignLogoAlt.join(', ')}`);
    say(`     Check whether this is a manufacturer or franchise template. If it is, their`);
    say(`     own name may not appear until well below the fold, and that is the read.`);
  }
  if (b.tollFree.length) say(`  >> Toll-free number ${b.tollFree.join(', ')}, often a corporate line rather than theirs`);
  b.franchiseTells.forEach(f => say(`  >> "${f.trim()}"`));
  say('');

  if (d.proof.navPromises.length) {
    say('PROOF LINKS');
    d.proof.navPromises.forEach(n => say(`              "${n.label}" -> ${n.href.replace(/^https?:\/\/[^/]+/,'')}`));
    if (d.proof.misrouted.length) {
      say(`  >> PROMISED AND NOT DELIVERED: ${d.proof.misrouted.map(m=>'"'+m.label+'"').join(', ')} goes somewhere`);
      say(`     that is not a gallery. The one thing a trade must prove, mislabelled.`);
    }
  } else say('PROOF LINKS   no gallery or projects link anywhere');
  say('');

  const c = d.credentials;
  say('CREDENTIALS');
  if (c.founded.length) say(`              founded: ${c.founded.join(', ')}`);
  if (c.yearsIn.length) say(`              tenure: ${c.yearsIn.join(', ')}`);
  if (c.licences.length) say(`              licence: ${c.licences.join(', ')}`);
  if (c.certs.length) say(`              programs: ${c.certs.join(' | ')}`);
  if (c.insured) say(`              states licensed and insured`);
  if (!c.founded.length && !c.yearsIn.length && !c.certs.length) say(`              none stated. Nothing to surface, check their Google profile.`);
  say('');

  say(`PRICING       ${d.pricing.published.length ? d.pricing.published.join(', ') : 'none published'}`);
  if (d.pricing.planNames.length) say(`              plans: ${d.pricing.planNames.join(', ')}`);
  say(d.pricing.published.length
    ? '  >> Published, so use their exact figures. Never round, never invent a second one.'
    : '  >> Nothing published, so no prices anywhere on the build.');
  say('');

  const r = d.reviews;
  say(`REVIEWS       ${r.quotesInDom} quotable in the page${r.counts.length ? ', claims: ' + r.counts.join(', ') : ''}`);
  if (r.widgets.length) say(`              widget: ${r.widgets.join(', ')}`);
  if (!r.quotesInDom && r.widgets.length) {
    say(`  >> LOCKED IN A WIDGET. We cannot read them, so we do not use them. Leave reviews`);
    say(`     off and say why, the way the Goblin build did.`);
  } else if (r.quotesInDom) say('  >> Readable. Quote verbatim, with the reviewer\'s name.');
  say('');

  say('THE QUESTION THIS DOES NOT ANSWER');
  say('  What is this business sitting on that nobody can see? The inventory above is');
  say('  the evidence. The answer is a sentence only a person can write. Put it in');
  say('  <slug>/NOTES.md under "## The read" with an "**Angle:**" line.');
  return L.join('\n');
}

(async () => {
  const args = process.argv.slice(2);
  const asJson = args.includes('--json');
  const urls = args.filter(a => !a.startsWith('--'));
  if (!urls.length) { console.error('usage: node bin/asset-inventory.js [--json] <url> [url...]'); process.exit(1); }

  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--disable-gpu',
    '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    `--window-size=${VW},${VH}`, '--user-data-dir=/tmp/asset-inventory-profile'], { stdio: 'ignore' });

  const all = [];
  try {
    for (let i = 0; i < 60; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch (e) {} await sleep(250); }
    for (const url of urls) {
      try { const d = await run(url); all.push(d); if (!asJson) console.log(report(d)); }
      catch (e) {
        all.push({ url, error: String(e.message || e) });
        if (!asJson) console.log(`${'='.repeat(78)}\n${url}\n  ! ${e.message}\n  If this is a bot check, open it in a real browser instead. Do not try to defeat it.`);
      }
    }
  } finally { chrome.kill(); }
  if (asJson) console.log(JSON.stringify(all, null, 2));
})();

#!/usr/bin/env python3
"""Score a local-business website on how badly it needs rebuilding.
Higher score = better prospect for the Viper play."""
import re, ssl, sys, time, urllib.request, urllib.error, socket
from urllib.parse import urlparse, urljoin

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " \
     "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"

BUILDERS = [
    ("Wix",              r"wix\.com|wixstatic|_wixCssImports|X-Wix"),
    ("GoDaddy Builder",  r"godaddysites|websitebuilder\.godaddy|img1\.wsimg\.com"),
    ("Weebly",           r"weebly\.com|weeblysite"),
    ("Squarespace",      r"squarespace\.com|static1\.squarespace"),
    ("Duda",             r"dudamobile|duda\.co|irp\.cdn-website\.com"),
    ("WordPress",        r"wp-content|wp-includes|wp-json"),
    ("Elementor",        r"elementor"),
    ("Divi",             r"et_divi|divi-"),
    ("Web.com/Netsol",   r"web\.com|networksolutions"),
    ("Homestead",        r"homestead\.com"),
    ("Joomla",           r"/media/jui/|joomla"),
]

def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    ctx = ssl.create_default_context()
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        body = r.read()
        return {"status": r.status, "url": r.url, "body": body,
                "elapsed": time.time() - t0, "headers": dict(r.headers)}

def audit(url):
    if not url.startswith("http"):
        url = "https://" + url
    out = {"input": url, "flags": [], "score": 0, "notes": []}
    def flag(pts, text):
        out["score"] += pts
        out["flags"].append(f"[{pts:+d}] {text}")

    # --- reachability / TLS ---
    try:
        r = fetch(url)
    except (ssl.SSLError, urllib.error.URLError, socket.timeout, ConnectionError) as e:
        msg = str(e)
        if "CERTIFICATE" in msg.upper() or "SSL" in msg.upper():
            flag(25, f"TLS broken: {msg[:70]}")
            try:
                r = fetch(url.replace("https://", "http://"))
            except Exception as e2:
                out["notes"].append(f"unreachable: {str(e2)[:80]}")
                return out
        else:
            try:
                r = fetch(url.replace("https://", "http://"))
                flag(20, "no working HTTPS, fell back to HTTP")
            except Exception as e2:
                out["notes"].append(f"unreachable: {str(e2)[:80]}")
                return out
    except Exception as e:
        out["notes"].append(f"error: {str(e)[:80]}")
        return out

    html = r["body"].decode("utf-8", "ignore")
    low = html.lower()
    out["final_url"] = r["url"]
    out["html_kb"] = round(len(r["body"]) / 1024, 1)
    out["load_s"] = round(r["elapsed"], 2)

    # --- title ---
    m = re.search(r"<title[^>]*>(.*?)</title>", html, re.S | re.I)
    title = re.sub(r"\s+", " ", m.group(1)).strip() if m else ""
    out["title"] = title[:90]
    if not title:
        flag(12, "no <title> tag at all")
    elif len(title) < 18:
        flag(8, f"title is a stub: {title!r}")
    elif not re.search(r",|\||-|–", title):
        flag(4, "title has no location or service qualifier")

    # --- mobile ---
    if not re.search(r'<meta[^>]+name=["\']viewport', html, re.I):
        flag(30, "NO viewport meta: renders desktop-width on phones")

    # --- meta description ---
    if not re.search(r'<meta[^>]+name=["\']description', html, re.I):
        flag(6, "no meta description, ugly link previews in search")

    # --- open graph ---
    if not re.search(r'property=["\']og:', html, re.I):
        flag(6, "no Open Graph, shared links look broken on Facebook")

    # --- structured data ---
    if "application/ld+json" not in low:
        flag(10, "no JSON-LD schema, invisible to local-business rich results")
    elif "localbusiness" not in low and "roofingcontractor" not in low:
        flag(5, "has JSON-LD but no LocalBusiness type")

    # --- builder ---
    found = [name for name, pat in BUILDERS if re.search(pat, html, re.I)]
    out["builder"] = ", ".join(found) if found else "hand-rolled / unknown"
    if any(b in found for b in ("Wix", "GoDaddy Builder", "Weebly", "Duda", "Homestead", "Web.com/Netsol")):
        flag(15, f"locked into a drag-and-drop builder ({found[0]})")

    # --- page weight / speed ---
    if out["html_kb"] > 400:
        flag(10, f"HTML alone is {out['html_kb']}KB before images")
    if out["load_s"] > 3:
        flag(12, f"first byte to full HTML took {out['load_s']}s")
    elif out["load_s"] > 1.5:
        flag(6, f"slow HTML response, {out['load_s']}s")

    # --- images ---
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)', html, re.I)
    out["img_count"] = len(imgs)
    if len(imgs) < 4:
        flag(8, f"only {len(imgs)} images, no proof of work on the page")
    if not re.search(r"loading=[\"']lazy", html, re.I) and len(imgs) > 8:
        flag(5, "no lazy loading with a heavy gallery")

    # --- stale copyright ---
    years = [int(y) for y in re.findall(r"(?:©|&copy;|copyright)\s*(?:20\d\d\s*[-–]\s*)?(20\d\d)", html, re.I)]
    if years:
        newest = max(years)
        out["copyright"] = newest
        if newest <= 2022:
            flag(15, f"footer still says {newest}, site has been untouched for years")
        elif newest <= 2024:
            flag(6, f"footer says {newest}")

    # --- calls to action ---
    tel = re.findall(r'href=["\']tel:', html, re.I)
    out["tel_links"] = len(tel)
    if not tel:
        flag(18, "no click-to-call anywhere, phone is not tappable on mobile")

    booking = re.search(r"book|schedule|estimate|quote|appointment|consult", low)
    if not booking:
        flag(10, "no booking or estimate language anywhere")

    forms = len(re.findall(r"<form", low))
    out["forms"] = forms
    if forms == 0:
        flag(8, "no form on the homepage")

    # --- chat / after-hours capture ---
    if not re.search(r"tawk|intercom|drift|podium|livechat|tidio|crisp|chatbot|messenger", low):
        flag(10, "nothing answers after hours, no chat of any kind")

    # --- social-only tell ---
    if re.search(r"facebook\.com/[a-z0-9.]+", low) and len(imgs) < 6 and out["html_kb"] < 60:
        flag(10, "looks like a thin brochure pointing at a Facebook page")

    return out

if __name__ == "__main__":
    for u in sys.argv[1:]:
        a = audit(u)
        print("=" * 78)
        print(f"{a['input']}   SCORE {a['score']}")
        if a.get("title"):     print(f"  title    : {a['title']}")
        if a.get("builder"):   print(f"  built on : {a['builder']}")
        bits = []
        for k, lbl in (("html_kb","KB"),("load_s","s"),("img_count","imgs"),("tel_links","tel"),("forms","forms")):
            if k in a: bits.append(f"{a[k]}{lbl}")
        if bits: print("  stats    : " + "  ".join(bits))
        for f in a["flags"]: print(f"  {f}")
        for n in a["notes"]: print(f"  ! {n}")

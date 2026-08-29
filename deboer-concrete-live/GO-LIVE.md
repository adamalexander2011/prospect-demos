# Go-live runbook — deboerconcreteandconstructionllc.com

Two parts. **Part 1 is Nick's and cannot be skipped.** Part 2 is thirty minutes of
Adam's time once Part 1 comes back.

---

# Part 1 — what Nick has to confirm before anything ships

On the concept, every word Adam wrote sat in a column headed *"written by me, as
placeholder."* A live site has no such column. The moment this goes on his domain,
**all of it reads as DeBoer saying it.** So it needs his eyes first.

None of this is legal boilerplate. It is the list of things a customer could stand in
his driveway and hold him to.

## 1a. Commitments the page now makes on his behalf

Each of these is a promise. Every one is easy to keep, and every one is his to confirm.

| The page says | Where | Confirm |
|---|---|---|
| **The site visit is free** | booking section, agent, final CTA | ☐ |
| **It takes about twenty minutes** | agent, step 4 | ☐ |
| **There is no obligation at the end of it** | agent, step 4 | ☐ |
| **He will confirm the visit before coming** | agent, confirmation | ☐ |
| **No price is given before the visit** | agent, twice | ☐ |
| **Bookings are taken day or night** | chat header, booking points | ☐ |
| **No Sunday visits** (the slot picker skips Sundays) | agent, step 4 | ☐ |
| Slots offered are **9:00 AM, 1:00 PM and 4:30 PM** | agent, step 4 | ☐ |

If any of those is wrong, it is a one-line change. If Sunday is fine, or the slots are
wrong, say so — that logic is four lines in the file.

## 1b. Copy that is Adam's, not DeBoer's

- **Every headline and every word of body copy.** "Concrete you only pour once", the
  hero paragraph about base and thickness and steel, the section headings, all of it.
- **The six "questions worth asking" and their answers.** These are general concrete
  practice, framed deliberately as questions so that none of them states a DeBoer
  specification. **They are not a description of how Nick pours.** If any answer
  contradicts how he actually works, it has to change, because on his own site a
  visitor will reasonably read them as his standards.
- **Everything the booking agent says.**
- **The photo captions** — "approach", "walkway", "drive with banding", "barn pad",
  "poured foundation". Inferred from the pictures. If a caption misnames a job, it is
  his work being described wrongly on his own site.

## 1c. Claims inferred rather than published

- **The service area.** Clio, Mount Morris, Montrose, Flushing, Birch Run, Vienna
  Township, Thetford Township, Genesee, Flint, Burton, Davison, Swartz Creek,
  Frankenmuth, Chesaning, Otisville. **He publishes no service area anywhere — this
  was guessed outward from Clio.** It is also now in the structured data, which is
  what tells Google where to show him, so a wrong town here costs money twice. Cut the
  ones he will not drive to.
- **The service list** — "flatwork, barn pads, drives, approaches and poured
  foundations" — inferred from his photographs. Also in the structured data, plus
  "tear out and replace" from the booking options.
- **Clio, Michigan 48420** as the business location.

## 1d. One courtesy

**Greg Taylor's review** is quoted word for word, with his name, from Nick's public
Facebook page. That is legitimate, and it is the strongest thing on the page. It is
still worth Nick mentioning to him that it is going on the website. Costs nothing and
it is the sort of thing that gets noticed in a small town.

## 1e. Deliberately absent — and staying absent

**No prices. No year founded. No licence number. No insurance claim. No crew size. No
opening hours. No star rating in the structured data.**

None of it is published anywhere Adam could find, and all of it is exactly the sort of
thing that has to be defended on a job site. If Nick wants any of it on there, he
supplies the real figure and it goes on. Nothing gets estimated into existence.

---

# Part 2 — the switch, once Part 1 is signed off

## 2a. Wire the booking agent to something real  ← **do this first**

Out of the box the agent works with **no configuration**: it collects the booking and
hands the visitor a prefilled email to send. That is honest and it functions, but it
depends on the customer pressing send in their own mail app, and some will not.

Wiring it properly is one line. Top of the `<script>` block in `index.html`:

```js
var CFG = {
  endpoint : "",        // <-- put the POST URL here
  extra    : {},        // <-- provider's hidden fields, if any
  ...
};
```

It sends a JSON `POST` with `subject, job, size, town, visit, contact, message, page`.
That shape suits Web3Forms, Formspree, Basin, or a Zapier/Make catch hook.

- **Web3Forms** — free, no account needed for the key. `endpoint` is
  `https://api.web3forms.com/submit`, and `extra` is `{access_key:"..."}`.
- **Formspree** — `endpoint` is the form URL, `extra` stays `{}`.

Whatever it points at, **send one test booking and confirm it arrives at
nick@deboerconcreteandconstructionllc.com** before the DNS moves. Check the failure
path too: a wrong key shows the fallback rather than a dead end, which is the
behaviour you want, but you want to have seen it work.

## 2b. Upload

Everything in this folder except `NOTES.md` and `GO-LIVE.md` goes at the **domain
root**, keeping the structure:

```
/index.html   /privacy.html   /404.html
/robots.txt   /sitemap.xml    /site.webmanifest
/assets/...
```

`robots.txt` and `sitemap.xml` only do their job from the root, so a subfolder deploy
silently loses both.

**The domain is on Squarespace.** Two routes:

1. **Point the domain away from Squarespace** at any static host — Netlify, Cloudflare
   Pages, GitHub Pages — and cancel the Squarespace site plan. This is the one to
   take: it is faster, it is free or near it, and it stops him paying for a holding
   page. Keep the domain registration wherever it is until the site is up, then move
   it separately if you want to.
2. Rebuild inside Squarespace. Do not. It costs the load time, which is a large part
   of what makes this page better than Patriot's and Osborn's.

**Before flipping DNS**, put the whole folder on a staging URL and click every link,
run one booking, and load it on a phone.

## 2c. After the switch

- **Google Search Console** — add the property, submit `sitemap.xml`, request indexing
  of the homepage. Days, not weeks, if it is done on day one.
- **Test the rich result** — paste the live URL into Google's Rich Results Test and
  confirm the `GeneralContractor` block parses.
- **Facebook** — post the link once. Open Graph is set, so it renders with the shop
  apron photo and the real title, which the holding page could never do. The page has
  301 followers who have never seen a website.
- **Update the Facebook page's website field**, which is currently the one place the
  domain gets handed out.

## 2d. The free win, still the highest-return hour

**There is still no Google Business Profile.** The site does not fix that; it is the
thing the profile points at once it exists. Patriot is holding the Clio map pack on 21
reviews and Osborn on 12, with weaker photography than Nick's.

Set it up as a **service-area business** and hide the street address, since he works
out of Clio across the county and there is no public shopfront address to show. Then
the review request after every pour, which is the other half of what Adam quoted.

## 2e. Send Adam the originals

Every photograph on the page is the version Facebook re-compressed, up to 2048px. The
originals off Nick's phone will be sharper, and the hero is the one that shows it most.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole site. Inline CSS and JS, no build step, no dependencies |
| `privacy.html` | Plain-English notice. Accurate as built — re-read it if 2a changes how bookings are delivered |
| `404.html` | Routes back to the main page and the phone number |
| `robots.txt` | Allows crawling, points at the sitemap |
| `sitemap.xml` | Two URLs |
| `site.webmanifest` | Icon and theme colour |
| `assets/` | His logo, seven photographs plus thumbnails, two self-hosted fonts, favicon |

**Zero third-party requests.** Nothing on the page is fetched from anywhere but his own
domain, so there is nothing to break, nothing to slow it down and no cookie banner.

**One thing to know about `privacy.html`:** it currently says a booking reaches him
"either as an email you send from your own email app, or through a form-delivery
service." That covers both routes in 2a and stays accurate whichever is chosen. If
analytics or a chat widget is ever added, that page stops being true and has to change.

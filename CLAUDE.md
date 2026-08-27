# CLAUDE.md — how a prospect demo gets built

Read this before building any demo in this repo. It is the standard that makes
demo #7 as good as the first one. Two builds exist to copy from:

- **Viper Concrete Coatings** (Grand Blanc) — `coatings.locallvrg.co/viper.html`
- **Goblin Heating & Cooling** (Clio) — `coatings.locallvrg.co/goblin-hvac/`

## What this is

An unsolicited, complete spec rebuild of a local business's website, built from
**their own material**, sent to the owner with no invoice attached. It is a lead
magnet that happens to be a finished product. The pitch is the page itself.

It is not a mockup, not a proposal deck, and not a template with their logo
dropped in. If it does not stand on its own as a site they could ship, it is not
finished.

## The rules that do not bend

**Assets come from the prospect. Only.**
Every photo, the logo, the reviews, the phone number, the address — pulled from
their own site, their Google Business Profile, or their Facebook page.
Download them into `<slug>/assets/` and commit them. No stock photography, ever.
Before committing, check every file and be able to say where it came from. If you
cannot source it, it does not go in.

**Never invent a review.**
Quote real reviews verbatim, with the reviewer's real name. If there are only
three, use three. A fabricated testimonial is the one mistake that ends the
relationship before it starts.

**Never quote a price.**
No per-square-foot figures, no "starting at," no package pricing. The page's job
is to get the estimator in front of the owner. Pricing is theirs to set and yours
to stay out of.

**Label it a concept in three places.**
1. The `<title>`, ending in `| Concept Site`
2. The page header or nav
3. The disclosure panel at the bottom

Somebody will land on this page without context. They must never mistake it for
the company's real site.

**noindex on every page.**
`<meta name="robots" content="noindex,nofollow">` in the head, plus the site-wide
`robots.txt`. This page must never compete with the prospect's real site in
search results. Say so in the disclosure, because it is a genuine courtesy and it
reads as one.

**Self-host the fonts.**
Drop the `.woff2` files in `<slug>/assets/fonts/` and `@font-face` them. No
Google Fonts link, no external CDN. The page should load with zero third-party
requests.

**One file, no framework.**
The whole page is a single `index.html` with inline CSS and JS. It loads in well
under a second, and that speed is one of the things you are selling.

## The disclosure panel is mandatory

Bottom of every page, in the builder's own voice, signed. It does four things:

1. **Says you built it uninvited**, and that they owe nothing. "Take the ideas and
   hand them to whoever built your current site. Or don't use any of it."
2. **Explains what the page does** structurally, technically, and commercially —
   three short lists.
3. **Splits real from placeholder in two columns.** Left: what came from them
   (name, logo, photography, phone, address, reviews, service categories). Right:
   what you wrote as placeholder (all body copy, timelines, warranty figures,
   product specifics, service-area lists, hours). Be exhaustive and unflattering
   to yourself. This column is what makes the whole thing trustworthy.
4. **States plainly that nothing in the placeholder column should go live until
   they confirm it.**

The honesty is not a disclaimer bolted on. It is the reason the page works.

## The assistant

The live chat at the top qualifies and books. Describe it honestly: it answers
nights and weekends, it captures name, job size, address and intent, and it
pushes the booking to the owner's phone. Do not claim it is a person, and do not
claim it is already connected to their calendar.

## Page skeleton

Both builds follow this. Deviate when the trade demands it, not for variety.

1. **Hero** — one line that only this company could say
2. **The assistant**, above the fold, with a booking notification visible
3. **Services** — their actual categories, named their way
4. **Process** — numbered steps, what happens between the call and the work
5. **Proof** — their photography, before/after if it exists
6. **Reviews** — real ones, verbatim
7. **Service area** — named towns, so local searches have something to land on
8. **FAQ** — the objections that otherwise become phone calls
9. **Final CTA** — one action
10. **Disclosure panel**

## Shipping

```bash
./bin/new-demo.sh <slug> "Business Name" "Owner"
```

Then fill the copy, drop their assets in `<slug>/assets/`, and push. Live at
`demos.locallvrg.co/<slug>/`.

## Finding the next one

```bash
./bin/audit-site.py https://theirsite.com
```

Scores a site on how badly it needs rebuilding. Higher is worse, which means
better prospect. **Viper scored 67** — treat that as the bar. Below roughly 35
there is not enough wrong to wow anybody, and you should leave them alone.

The score measures the website, not the buyer. Before committing to a build,
check by hand that there is a real crew, a real address, and money visibly going
out the door — a paid builder subscription, BBB accreditation, chamber dues,
review software. And open the site and look at the photography. A great page
cannot be made from four blurry phone pictures.

## The standing promise

Any company with a page here can email and it comes down the same day. Honor it
without argument. It costs nothing and it is the difference between this reading
as generous and reading as taking liberties with someone's brand.

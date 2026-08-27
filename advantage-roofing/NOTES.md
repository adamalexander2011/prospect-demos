# Advantage Roofing & Siding — Montrose, MI

**Status:** read on record, not built
**Their site:** arsconstructionco.com
**Score:** 38 plumbing + 27 design = **65** (plumbing re-measures at 44 today, see the note on the click-to-call flag)
**Read written:** 27 August 2026

## The read

Fifty-two images on the homepage. I measured them, and the split is the story.

**The stock photos:**

| File | Actual size |
|---|---|
| `advantage-roofing-and-siding-hero-home` | **1920x1280** |
| `RSshutterstock_660622939` | **1920x1280** |
| `RSshutterstock_1814144` | 1200x800 |

**Their own work:**

| File | Actual size |
|---|---|
| `460628615_1058002856325813_7976903823128358136_n` | **480x360** |
| `69375996_2418931311698362_5432221520120250368_n` | **480x360** |
| `462476976_1073281848131247_8715656636008837666_n` | 640x377 |
| `advantage-roofing-and-siding-gallery-home-01` | 800x600 |

Thirteen of the gallery images carry Facebook's photo-ID filename convention, so
somebody pulled them back off their own Facebook page, and Facebook had already
compressed them to **480x360**. Hibu's CDN serves them from URLs ending `-1920w`,
which is the requested width, not the file. Ask for 1920 and you get 480.

**Seven Shutterstock files sit on the site at full resolution.** The only
high-resolution photographs on this roofing company's website are the ones they
did not take.

The second finding is in the structured data. Their JSON-LD carries:

```json
"brand": [{"name": "CertainTeed Shingles and Siding"},
          {"name": "Metal Roofing: Metal Sales"}]
```

**CertainTeed** and **Metal Sales** appear exactly once each on the entire
homepage, both inside that JSON blob. Zero mentions in anything a person reads.
Sweers leads with CertainTeed. Advantage has it and has hidden it in a script tag.

Third: **the reviews are chopped up by hand.** Here is a live review card,
verbatim, spaced periods and all:

> *"Advantage did our roof, gutters and siding. . . . The installers were extremely
> professional . . . The price was fair . . . ."* **Highly recommend!**
> Jeremy via Google

And elsewhere on the same page, in a different block, the same review, whole:

> *"Advantage did our roof, gutters and siding last season. The installers were
> extremely professional and detailed! The price was fair and the owner stopped out
> to check the work when complete!"*

Somebody typed ellipses into a real Google review to shorten it, and then left the
full version on the page anyway. *"the owner stopped out to check the work when
complete"* is the best sentence in it and it is the part that got cut.

There are eight or so of these, readable in the DOM, with names: Dave, Jason,
Jeremy, Krista, Poletti, Chad, Ja'nae. They name the owners, **Matt and Kelly**.
Chad's says they quoted **"a couple thousand dollars less than other companies."**

What else is real and published:

- **25+ years**, family owned, licensed and insured.
- **30-50 Year Shingle Warranty.**
- **Same-Day Service Estimates.**
- **Price Match for Licensed & Insured Quotes.** Nobody else on this board
  publishes an offer that concrete.
- Financing options.
- **21 service-area pages** across Saginaw, Genesee and Shiawassee counties.
- Address **10442 Wilson Road, Montrose, MI 48457**, phone **(810) 230-4245**.

Money is visibly going out the door in four directions: a **Hibu** managed site, a
**Yext** listings subscription, a **Bing UET tag** (`ti=97060458`), and an
**iPromote** retargeting pixel. Thirteen third-party hosts on one page.

**Angle:** the only high-resolution photographs on your website are the ones you bought. Your own roofs are 480 pixels wide.

## Treatment

| Decision | Call |
|---|---|
| Photography | **They have jobs, at bad resolution.** 13 Facebook-sourced shots at 480x360, four gallery files at 800x600. Enough for a small-tile grid, not enough for a hero. **Ask Matt or Kelly for originals**, because these were shot on a phone at some point and Facebook is what degraded them. There is also a video on the page worth asking about. |
| Prices | No dollar figures, but **four concrete published offers**: 30-50 year shingle warranty, same-day estimates, price match against licensed and insured quotes, financing. Use all four exactly as worded. This is the closest thing on the board to Goblin's tiers. |
| Reviews | **Use them, whole.** Quote the full versions with the names as given. The elided ones are already on the site next to the complete ones, so restoring them is not editing, it is undoing. |
| Credentials | **CertainTeed and Metal Sales, lifted out of the JSON-LD and put where people read.** Plus 25+ years, family owned, licensed and insured. Do not upgrade "CertainTeed" into a certification tier they have not claimed. They list it as a brand, so present it as a brand they install. |
| Structure | Photos small and many, offers large. The price-match promise is the headline candidate, not "Best Roofs at the Best Prices." |

**Two corrections for the outreach.** The board lists them as Fenton. Their own
schema says **Montrose**, and Fenton is one of 21 service-area pages. Use Montrose.

And the audit's **+18 "no click-to-call"** flag is a false positive worth knowing
about. The served HTML has no `tel:` link and an empty `<span class="text">`,
because the phone number is injected client-side by Yext. Render the page and three
`tel:` links appear. **It works, but it depends on a third-party script loading.**
That is a real fragility and an honest thing to mention, and it is not the same as
"your phone number is missing." Do not say the second thing.

There are also Yext and template placeholders sitting in the DOM ("Write a
description for this list item", "List Item 3"), but I checked the CSS and they are
`display:none`. They are invisible to visitors and visible to crawlers. Worth one
sentence, not a paragraph, and not the opening line.

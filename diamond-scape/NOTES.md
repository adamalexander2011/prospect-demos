# Diamond Scape Outdoors — Holly, MI

**Status:** read on record, not built
**Their site:** diamondscapeoutdoors.com
**Score:** 41 plumbing + 32 design = **73** (plumbing re-measures at 31 today, same three flags)
**Read written:** 27 August 2026

## The read

A hardscape contractor whose homepage is illustrated with paver manufacturers'
catalog photography.

Eight `<img>` tags on the page. Wix keeps the original upload filename in the
media metadata, so the whole inventory is legible:

- `Blu-60-Smooth--patio-paver-slabs-Blu-60-Smooth-dalle-de-patio-V2_2020-US077_A7R6243-1.webp`
  — **Techo-Bloc**. Blu 60 Smooth is their patio slab, "dalle de patio" is the
  French half of a bilingual Quebec product shoot, and `A7R6243` is a camera file
  number. This is the largest image on the page, at 437x532.
- `Richcliff_Driveway_Pebble-Taupe-Dawn-Mist_6169.jpg` — **Unilock**. Richcliff
  is a Unilock paver, Pebble Taupe and Dawn Mist are Unilock colors.
- `Allied.1.jpeg`, `Vakkas-paver-patio-pergola-fire-pit-ligh.avif`,
  `s788803928908410492_p259_i6_w1062.webp` (a site-builder image ID from some
  other website), and one called literally **`download.jpeg`**, which is
  **194x259 pixels** and is served at 178x251, so it is running at native size.
- `IMG_3548_edited.jpg`, **2250x1928**, served at **355x251**.

That last one is the only photograph on the homepage that reads like their own
work. It is the biggest file they own and it is rendered at 15% of its width, in
the same row as the catalog shots, indistinguishable from them.

The service pages are worse. The Hardscape page lives at **`/landscape`** and
carries two images, one of which is
`thumb_internal_beacon-hill-flagstone_entrances_birch_3668.jpg` — Unilock's
Beacon Hill Flagstone, and the filename still says `thumb_internal_`, so it was
taken off a page rather than supplied. The Landscape page lives at
**`/landscape-1`** and contains **zero images**. Five pages in the whole sitemap.
The nav has an About item; there is no About page.

Nowhere on the site do they claim to be a Unilock or Techo-Bloc dealer or
certified installer. They are just using the pictures.

What they do own, and bury: **three reviews with names, readable in the DOM**,
not widget-locked. Suzanna Joesph via Nextdoor, Cheryl Flynn via Facebook, and
Bruce Jackson. Cheryl's names the owner and the tenure: *"Luke has been servicing
my property for the last 5 years."* All three sit at the bottom of a 932KB page
under a **20px headline** and **10px body text**, below a hero, a form, a
process diagram and three service blocks.

Two more found artifacts: the hero reads **"Genesee County's Premier Landscape
Provider"** while the page title says the business is in Holly, and the service
area list is *"Holly, Fenton, Grand Blanc, Linden, and Fenton"* — Fenton twice.
Footer says **"Since 2017"** and **copyright 2024**. Site credited to Venture
Branding Solutions, so there is already an agency invoice going out the door.

**Angle:** the pavers on your homepage are Techo-Bloc's and Unilock's photos. The one job that is actually yours is your biggest file and you show it at 355 pixels.

## Treatment

| Decision | Call |
|---|---|
| Photography | **Blocker, and the angle.** Real inventory across the whole site is three iPhone files: `IMG_3548_edited.jpg` (2250x1928), `IMG_3492_edited.jpg` and `IMG_3568_edited.jpg` on the maintenance page. That is enough for a hero and one supporting shot, not a gallery. Ask Luke for his camera roll before building. Do not carry a single catalog image over. |
| Prices | None published. None on the page. **"Automatic Monthly Billing"** is listed as a differentiator with no figure attached, so it is a claim, not a price. |
| Reviews | **Use them.** Three, verbatim, with names and sources, because they are readable. Cheryl Flynn's five-year line is the strongest proof on the site and it is the last thing on the page. |
| Credentials | Thin. "Licensed & Insured" with no number, and "Since 2017" in footer body copy. State both exactly as written, approximate nothing, and do not invent a dealer relationship they have not claimed. |
| Structure | Reviews and the owner's name move up. One real photo at full size beats seven at thumbnail. Do not rebuild the four-step Consultation/Design/Build/Enjoy diagram, it is the least specific thing they have. |

**The sensitivity here is real.** The catalog-photo finding is the reason to
build, and it is also an accusation if you lead with it. Lead with the 2250px
photo shown at full size and let the difference between that and the row it
currently sits in do the work. If Luke has no more photos than these three, this
becomes a reviews-and-owner build, not a gallery build, and it is worth deciding
that before starting rather than after.

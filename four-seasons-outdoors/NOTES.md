# 4 Seasons Outdoors — Fenton / Burton, MI

**Status:** read on record, not built
**Their site:** 4seasonsoutdoors.net — **HTTPS is broken, Chrome shows an interstitial instead of the site**
**Score:** 46 plumbing + 26 design = **72** (design is not really measurable, see below)
**Read written:** 27 August 2026

## The read

The certificate:

```
subject = CN=4seasonsoutdoors.net
issuer  = CN=4seasonsoutdoors.net
notBefore = Oct 13 12:46:19 2020 GMT
notAfter  = Oct 13 12:46:19 2021 GMT
```

Self-signed, and **expired on 13 October 2021**. Nearly five years. Point headless
Chrome at `https://4seasonsoutdoors.net` and it renders *"Your connection is not
private"* at 24px, which is what the design probe scored, because there is no page
to score. `www.4seasonsoutdoors.net` does not answer at all. Only bare
`http://` serves the real site, and it serves it fine.

The whole site is on plain HTTP, so the estimate form posts name, address, phone
and email in cleartext to `http://4seasonsoutdoors.net/php/formtoemailpro5.php`,
and the Payments page invites customers to pay an invoice from an unencrypted page.

**Behind that warning screen is the most substantial content on this whole board.**

**A real gallery.** `michigan-landscape-pictures.php`, reached through a nav item
called "Landscape Pictures" nested under Services. **Thirty lightbox jobs**, every
single one hand alt-tagged by what it actually is: Rock Sea Wall, Sea Wall with
Beach Sand, Silt Trenching, Straw Mulching, Hydroseeding, Retaining Wall Straw
Blanket, Golf Course Lawn Service, Stamped Concrete Driveway, Paver Driveway,
Pond, Outdoor Water Feature, Pool Landscaping, Commercial Landscaping and Mowing.
Filenames carry job type and a date stamp (`rock-sea-wall-0322.jpg`). Nobody
buys a stock library and then names the files "silt trenching".

**Published prices.** On `specials.php`, which is nested under a nav item called
"Customer Service": **lawn care starts at $30**, **sprinkler start-ups starting at
$45**, prepay a seasonal contract and **the last 2 mows are free**, senior discount
**up to 10%**, military **10%**.

**Seven professional affiliations,** more than any other business on this board,
sitting behind an anchor link at
`michigan-landscaping-company.php#association`: **MNLA** (Michigan Landscape &
Nursery Association), **GALNA** (Genesee Area Landscape & Nursery Association),
**SIMA** (Snow & Ice Management Association), **BBB**, **CAM**, **IECA** and
**The Blue Book**. Plus vehicle, general liability and workers' compensation
insurance, and a certificate of liability insurance.

**Two physical locations** (3319 South Term Street in Burton, and 208 W. Highland
Rd Ste 102 in Highland), a separate estimates line, and fourteen named towns
across Genesee, Oakland and Livingston counties.

The page is running `excanvas.js`, an Internet Explorer 8 canvas shim. Footer says
**2011-2022**. Site credited to Lapeer Website Design.

**Angle:** your certificate expired in October 2021. For five years Chrome has been warning people away from thirty photographs of your own work, your prices, and seven trade associations.

## Treatment

| Decision | Call |
|---|---|
| Photography | **They have it, thirty jobs' worth.** The catch: the lightbox "full size" images cap at **420x270**. Spot-checked seven, all 420 wide or smaller. A 2026 hero needs more than 420px. Ask for originals, and design the layout around a mosaic of many small honest photos rather than one big one if the originals are gone. |
| Prices | **Use them, exactly.** $30 lawn care, $45 sprinkler start-up, last 2 mows free on a prepaid seasonal contract, 10% senior and military. This is the second business on the board that publishes real numbers, after Goblin. |
| Reviews | **One, and it has no name on it.** The homepage quote ("We're thrilled with our backyard landscaping renovation! Jeremy and his landscape architects...") is unattributed on their own site, so it cannot be quoted with a name. Check Google before deciding. Do not attach a name to it. |
| Credentials | **The strongest set on the board.** MNLA, GALNA, SIMA, BBB, CAM, IECA, The Blue Book, all named on their own page. State them exactly and no further. Do not describe what any of them require. |
| Structure | Prices and affiliations move to the first screen. Thirty jobs get a proper gallery instead of a nav item three levels down. Fourteen named towns is a real service-area section, not a sentence. |

**Two things to flag honestly.**

The certificate is the reason to call and the thing you must not gloat about. It
is somebody's forgotten renewal from 2021, possibly at Lapeer Website Design, who
are credited in the footer and may still be billing. Lead with the page, mention
the cert once, factually, near the end.

Second: the payments page discloses a **parent company, Kaylee Services**, and
gives a Grand Blanc PO box while the two street addresses are Burton and Highland.
Confirm who actually owns the domain and who the decision maker is before sending
anything. The Fenton framing in their own page title may be marketing rather than
where the business sits.

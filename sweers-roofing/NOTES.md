# Sweers Eavestrough and Roofing Co — Burton, MI

**Status:** read on record, not built
**Their site:** sweersroofing.com
**Score:** 33 plumbing + 48 design = **81** (highest working site on the board)
**Read written:** 27 August 2026

## The read

Founded **1959**. Sixty-six years of roofs across Genesee County, a real address at
6165 E Atherton Rd in Burton, the phone set large in the header, and manufacturer
credentials that most competitors do not carry: **Duro-Last, CertainTeed, Atlas**.
They care about reputation enough to run a review-capture block on the homepage
("Your review is our referral", "See our most recent 5 star reviews").

And they have **exactly one photograph of their own work, against four stock
images.** The real one is an aerial of a church re-roof in Flint, served as a CSS
background at 1425px and named honestly:
`Flint-commercial-steep-roof-church-in-flint-mi-replacement`. It is genuinely good.
The other four are **Getty Images** (`GettyImages-2155958283`, `-182856019`,
`-157190194`, `-1172013285`), and one of them is the largest image on the page.

The nav has a **"Projects"** item, the one thing a roofer should be able to prove.
It links to `/blog`.

So the company with the longest continuous history in the survey has one picture
of a roof it actually built, and four pictures of roofs it did not.

*(First pass of this read said they had no photography at all. `bin/asset-inventory.js`
found the church re-roof behind a CSS background, where a markup scan cannot see it.
One real photo is a better angle than none, and a truer one.)*

On top of that, a **popup covers the hero the moment you land**, the headline is
35px sitting **1,106px down the page**, and the review widget the page brags about
does not render its text into the DOM at all.

**Angle:** one photograph of a roof you built, four of roofs you didn't. After sixty-six years.

## Treatment

| Decision | Call |
|---|---|
| Photography | **One usable image, and it is good.** The church re-roof proves they photograph work when they bother. Ask for the rest, or pull from Facebook and Google Business Profile. If the archive is thin, this becomes a credentials-and-history build. |
| Prices | None published. None on the page. |
| Reviews | Widget-locked, same as Goblin. Leave off, say why, tell them to pull their own from Google. |
| Credentials | Use them hard. Duro-Last, CertainTeed and Atlas are real and verifiable, and no competitor on this board lists three. |
| Structure | 1959 is the spine. A dated history strip, then credentials, then the work. |

**Do not** substitute stock for the missing photography. Their current site already
does that, and replacing their stock with our stock proves nothing.

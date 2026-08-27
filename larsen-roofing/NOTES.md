# Larsen Roofing — Grand Blanc, MI

**Status:** read on record, not built. **Conditional prospect, see the blocker.**
**Their site:** larsenroofing.com
**Score:** 45 plumbing + 26 design = **71** (plumbing re-measures at 35 today)
**Read written:** 27 August 2026

## The read

They are paying an agency. The footer says **"Managed by Karasin PPC"** on every
page, and there are **21 town landing pages** in the sitemap, so somebody is
being paid to send traffic somewhere.

Here is what one of those pages says. `/grand-blanc-roofing-company`, their own
town, the highest-value page on the domain, directly under the H2:

> **"I'm a paragraph. Click here to add your own text and edit me. It's easy."**

Live, rendered, 20px, indexed. The section heading two blocks below it reads
**"Roof Repir"**. Further down: *"Whether you need a need a complete roof
tear-off."*

Now the photography, which is the harder finding. Wix serves an owner's uploads
under an account prefix and its shared stock library under a bare hex ID. Larsen's
account is **`2e4c8e_`** — that is the logo, `2e4c8e_0bf066a7...~mv2.png`, filename
`larsenlogo_PNG.png`.

Almost nothing else on the site carries that prefix.

| What the alt text says | Actual file | Verdict |
|---|---|---|
| `Rooftops` | `903dc0975fc447e287e835093f0bb984.jpg` | bare hex, Wix stock |
| `Roof Shingles` | `1dd9e4152e914606b0776a1b449e0727.jpg` | bare hex, Wix stock |
| `Roof.png` | `1120a6_51a2548228...~mv2.png` | a different account entirely |
| `Roofers at Work`, `Replacing Tiles` | services page | Wix stock captions |
| `Climbing a Ladder`, `Fixing the Roof`, **`Removing Asbestos Roofing`** | Grand Blanc page | Wix stock captions |

"Removing Asbestos Roofing" is the header image on the Grand Blanc page. It is a
stock library caption, and it is what a Grand Blanc homeowner sees at the top of
the page an ad sent them to.

The blog is worse. The featured image on a homepage post is
`2e4c8e_3e9bbd86caec400c891a89fcfbd88e41~mv2.png`, and Wix has kept its original
filename: **`-post-ai-image-1743.png`**. And the outer town pages are LLM filler
with the tell-tale five headings. `/roofing-in-hadley-mi` runs *Getting to Know
Hadley*, *Climate Considerations*, *A Peek into History*, *Cultural Highlights*,
*Types of Housing*, and says of a village of roughly 500 people that *"the
diversity in Hadley shines through its welcoming atmosphere and an array of
cultural influences."*

**There is not one photograph of a Larsen roof anywhere on this website.**

What they actually own is short, and I will not pad it:

- **A 17-point roof inspection.** Specific, countable, differentiated, and the
  only thing on the site a competitor could not also claim. It is one clause in a
  paragraph on the homepage.
- **One review, readable in the DOM, with a name.** Robert Kerzka: *"Provided a
  reasonable quote for the work and came out and performed the job, as quoted, a
  couple days later. They will tell what you need and what you don't need."*
- **Twenty-one named communities** in a nav menu.
- "Family Owned & Operated", "fully licensed and insured", no number, no year.
- Two different phone numbers on the homepage: **810-282-9324** in the header and
  the town pages, **810-653-1864** above the estimate form.

The About page is three sentences long, has no founding year, no owner's name and
no photograph, and ends *"we have you covered.."* with two full stops.

**Angle:** you are paying for clicks that land on a page reading "I'm a paragraph. Click here to add your own text."

## Treatment

| Decision | Call |
|---|---|
| Photography | **The blocker, and it is a hard one.** Every usable image on their site belongs to Wix. There is no gallery, no portfolio, no job shot, nothing to recover. Do not build until you have photographs from them. Substituting our stock for their stock proves nothing, same as Sweers. |
| Prices | None published. None on the page. |
| Reviews | **One**, Robert Kerzka, readable, so quote it verbatim with his name. One is thin. Check the Google profile before deciding whether the page can carry a proof section at all. |
| Credentials | Almost nothing verifiable. "Family owned", "licensed and insured", no number, no year, no manufacturer program, no BBB, no association. **The 17-point inspection is the only credential-shaped thing they have, and it is theirs.** Build the page on it. Do not state what the 17 points are, they have not published them. |
| Structure | If this gets built, it is a process build: the 17-point inspection as the spine, the 21 towns as a real service-area section, and honest empty space where the gallery should be, with the disclosure saying exactly why. |

**Say plainly what this read found.** Unlike Diamond Scape or Envious, there is no
buried asset here. Nothing good is hidden behind a bad layout. The site is stock
photographs, AI-written town pages and a placeholder paragraph, and underneath it
is a real roofer with one differentiated process and one named customer.

**So the recommendation is conditional.** The reason to approach them is not a
wasted asset, it is wasted money: an agency retainer and a click budget landing on
this. That is a legitimate and strong opening. But **do not build the page before
they send photographs**, because without them the demo would be built on exactly
the same nothing their current site is. Ask for the photos in the first message,
and if they cannot produce any, skip.

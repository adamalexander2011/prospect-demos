# Motor City Builders — Swartz Creek, MI

**Status:** read on record, not built. **Strongest prospect of the twelve.**
**Their site:** motorcitybuilders.com
**Score:** 33 plumbing + 38 design = **71** (both re-measured today, identical)
**Read written:** 27 August 2026

## The read

**Founded 1939.** Eighty-seven years. The oldest business on this board by
twenty-three years, older than Sweers, run by a **third generation owner**, at
3199 Elms Rd in Swartz Creek, claiming **"nearly 20,000 homeowners in the area
since its inception."**

Their own homepage says:

> **"A TRUSTED NAME IN THE COMMUNITY FOR MORE THAN 70 YEARS"**

1939 plus 70 is 2009. That sentence has not been touched in seventeen years, on a
page that says 1939 twice in the same scroll. The business is rounding itself down.

And the "third generation owner" line is an `<h3>` subhead, lowercase, sitting
under a 42px H1.

**The gallery is the asset.** `/gallery/` holds **56 photographs of their own
work**, and the filenames date them precisely:

- **20 files** at `/files/2017/05/` carrying Facebook photo IDs
  (`10176195_1017077638307125_2710385972002774191_n.jpg`), pulled off their own
  page in May 2017.
- **15 files** at `/files/2024/01/` that are raw Android camera names:
  `20230223_131226.jpg`, `20230627_095456.jpg`, `20231110_111102.jpg`,
  `20231122_100926.jpg`. Real jobs from 2023, uploaded January 2024. Somebody at
  this company is still walking jobs with a phone.
- Plus `ext_1..5` (Dec 2020), `new_1..4` (Jan 2021), `ex_ga_1,2` (Aug 2022).

I pulled originals. `20230627_095456.jpg` is **4000x3000 and 2.9MB**. `new_1.jpg`
is 1242x932. The 2014 hero `deck.jpg` is 1920x797.

**Every one of the 56 is rendered in the grid at `w=316&h=237`.**

Fifty-six tiles, all 316px, all with `alt=''` and `data-title=''`. No captions, no
job names, no dates, no grouping by trade. The four-thousand-pixel original is
reachable through the lightbox, so it is one click away, and nothing on the page
tells a visitor it is there.

Meanwhile the **Bathroom Remodeling tile on the homepage is a Shutterstock file**,
`/files/shutterstock/2019/12/shutterstock_351456755_...jpg`, alt "home remodeling |
flint, mi". They bought a stock bathroom while sitting on a gallery of their own.

**The testimonials are the other asset, and they are readable in the DOM.**
`/testimonials/` runs about a dozen, most with full names:

- Kristen Sobanski, on a **seven-month** addition covering a master suite, office,
  laundry/mud room, covered deck and 3-car garage: *"This was our third and
  biggest project with Motor City... Part of me was sad to see them go when the job
  was complete."*
- Anita Donahue-Crumin: *"Have had excellent experience with **Dave and Motor City
  since 1996**."* Thirty years, one customer.
- Jessie Shoop, Rachel Hertzke, Al Aceves, Jane Ruscoe.

They name the people: **Dave**, **Matt**, and Kevin on tile, twice referred to as
"the Kevins." Three generations and a named crew, all of it on a page behind a nav
item, none of it on the homepage.

The homepage instead carries three review excerpts crammed into `<h3>` headline
elements, one signed *"- Happy Customer"* and two signed nothing at all.

The site runs on a Thryv/TSM managed CMS (`cms_websites/`, `tsm-theme-1`,
`beacon-easton`), so there is a monthly invoice going out the door. Nine
third-party hosts. **No form anywhere on the homepage.** Desktop navigation hidden
behind a hamburger. HomeAdvisor ratings arrive in an `<iframe>`, so that set is
unreadable, but the on-site testimonials more than cover it.

**Angle:** 1939, third generation, and your website says seventy years. Fifty-six photographs of your own work, one of them 4000 pixels wide, every one of them shown at 316.

## Treatment

| Decision | Call |
|---|---|
| Photography | **The best inventory on the board, at real resolution.** 56 jobs, full-size originals reachable, one confirmed at 4000x3000. Photo-led build, Viper-style. Group by trade using the service list they already publish, and use the embedded date stamps to order them honestly without inventing captions. |
| Prices | None published. None on the page. |
| Reviews | **Use them hard, verbatim, with names.** Kristen Sobanski, Anita Donahue-Crumin, Jessie Shoop, Rachel Hertzke, Al Aceves, Jane Ruscoe. Leave the unsigned ones off, and leave HomeAdvisor off because the iframe cannot be read. |
| Credentials | **1939**, family owned, third generation, nearly 20,000 homeowners, 3199 Elms Rd, eleven named towns, evening and weekend appointments on request. All theirs, all published. **Do not repeat "more than 70 years."** Say 1939 and let the reader do the subtraction. |
| Structure | 1939 is the spine, the way it was going to be for Sweers. Then the three generations by name, then the gallery at full size, then the testimonials that name Dave and Matt. Add a form, because there is not one. |

**Two things to leave alone.** The Shutterstock bathroom tile is the only stock on
the site and it is a small thing, so do not open with it. And do not claim the
generations by name. "Dave" and "Matt" come from customer reviews and "third
generation owner" comes from the hero, but nothing published says who is which
generation. State only what the site states.

**This is the one to build first.** It is the only business on the board that has
photography, resolution, dated proof, named reviews, a named crew and an
eighty-seven-year history all at once, and all of it is either at 316 pixels or
behind a nav item.

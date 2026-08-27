# Black Pearl Landscaping & Concrete Services — West Bloomfield Twp, MI

**Status:** read on record, not built
**Their site:** blackpearllandscaping.com
**Score:** 10 plumbing + 51 design = **61** (both re-measured today, identical)
**Read written:** 27 August 2026

## The read

**The lowest plumbing score and the highest design score on the board.** This is the
Goblin case exactly: technically clean, WP Engine hosting, real schema, fast, and
visually the worst thing here. 62% of the first screen is spent before a 42px
headline arrives.

**Twenty-three Google reviews sit on the homepage**, full text, with names,
readable in the DOM, set at **14px**, below everything. Read them and you find the
company's entire product catalogue, written by customers, in language the company
never uses about itself.

**The patterns and colors:**

- *"a **cobblestone pattern with a rustic brown release**"* — Krista, Brighton
- *"a **Roman slate pattern with a charcoal onyx color blend**"* — Kelly, Brighton
- *"a **rustic slate stamp in canyon brown**"* — Evan, Milford
- *"this **Great Lakes Stone** patio... The **Slate Smoke release** adds just enough depth"* — Harley, Howell
- *"stamped patio with a **flagstone pattern**"* — Jaxon Gatza

**The sizes:** 3,300 sq ft driveway. 3,500 sq ft stamped patio. 2,800 sq ft driveway
plus a 1,900 stamped patio. 3,000 sq ft driveway plus 2,000 more to the road. 3,800
sq ft driveway. 4,000 sq ft stamped driveway and patio. 3,600 sq ft stamped
driveway. 3,000 sq ft stamped patio. 2,500 sq ft patio. **800 feet of drainage.**

**The turnarounds:**

- *"4000 sf stamped driveway and patio for us. **72 hours from start to finish.**"* — Elli
- *"3800 sq ft driveway removed and replaced, along with extensive drainage work...
  **completed and cleaned up in less than 72 hours.**"* — Jason Laponsie
- *"They did the tear out and pour **in the same day**."* — Robert Hamilton
- *"Job was supposed to take two weeks. **Was done in nine days.**"* — Aaron

**The people:** **Todd** (an owner, spelled "Tod" in one), **Josh**, **Nacho**. Rusty
Adkins recommends *"Todd, Josh, Nacho, and crew"* and identifies himself as *"a
contractor that has been in business for over 30 years."* Justin Sadauskas signs as
**Blue Moon Acquisitions**, a house flipper. Mark Schrader: *"I haven't had to
sandbag my basement once since you finished the job."* Tom Patterson: *"Here are two
before/after photos."*

**Now read what Black Pearl says about itself.** Eleven service blurbs, and here is
the concrete one in full:

> *"Black Pearl's stamped concrete installers have an eye for artistic hardscapes
> for residential and commcercial properties."*

Typo included. Not one pattern name. Not one release color. Not one square footage.
Not one turnaround time. Their customers publish the specification sheet and the
company publishes adjectives.

The photography is genuinely good and there is almost none of it. The Our Work page
carries **fourteen images**. I measured four: **1920x1440**, **1536x2048**,
1206x2128, and an older one at 800x800. Full-size, recent, real, several still named
`IMG_6789.jpg` off a phone. Uploads run from 2019 through **July 2026**, so somebody
is still shooting.

Every alt attribute is a keyword list rather than a description. **Twelve images on
the homepage share one identical string:** *"Black Pearl, commercial landscaping,
concrete contractors, concrete services, drainage contractors, tree removal, lot
clearing, yard drainage, residential landscaping."* One of them reads *"expert
conccrete services."*

Underneath there is a very large programmatic SEO build by an agency credited as
**Mommy Moves**: separate sitemaps for ball courts, commercial concrete, concrete
driveways, curb and gutter, exposed aggregate, fireplaces and firepits, garage
floors and pond contractors, each multiplied across roughly forty towns. Plus an
**iPromote retargeting pixel** and a **veterans discount popup** added January 2026.

Services nobody else on this board offers: **pond installation**, **wetland
restoration**, **trenching including septic and sewer lines**, **land development**.

**Angle:** your customers publish your stamp patterns, your release colors, your square footages and your 72-hour turnarounds. Your own website publishes none of it.

## Treatment

| Decision | Call |
|---|---|
| Photography | **Good and scarce.** 14 on Our Work at up to 1920x1440, roughly 20 more used as CSS backgrounds on the homepage, nothing stock. **Ask Todd for more**, and specifically for Tom Patterson's before/after pair, which a customer says exists. Fourteen photographs cannot carry a company whose customers describe 4,000 square foot pours. |
| Prices | None published, and do not infer any. Several reviews discuss cost ("not the lowest bid, not the highest"), and none of it becomes a number on the page. The **veterans discount** is theirs and can be named without a percentage, because no percentage is published. |
| Reviews | **The build.** 23, verbatim, with names exactly as signed. The long ones from A. Ward, Aaron and Kyle are the best sales copy this company will ever have and they are at 14px at the bottom of a page. |
| Credentials | Thin, and honestly so. No year founded, no license number, no association, no manufacturer program anywhere on the site. **Do not manufacture one.** The credential here is the work described in the reviews. |
| Structure | Lift the specifications out of the reviews and into the page as their own material, next to the quote that stated it. "Roman slate, charcoal onyx" beside Kelly's review is honest, specific, and buildable. That pairing is the whole design idea. |

**Correct the record before any outreach.** The board lists them as Genesee County.
Their footer says **West Bloomfield Township, MI 48322** and the phone is a **248**
number. Fenton, Grand Blanc, Goodrich, Flint and Burton are five entries in a
service-area list of roughly thirty-five towns running from Ann Arbor to Mt. Clemens
to Grand Ledge. **This is an Oakland County company** and should be approached as
one.

**One measurement blocker.** `/our-work/` returns **403** to a plain request and hung
headless Chrome entirely. It only answered with a `Referer` header set, and the page
opens with an obfuscated `atob()` script. Something on that path is filtering bots.
Nothing was defeated to read it and the numbers above come from the one response
that was served. Treat the Our Work inventory as a floor, not a total.

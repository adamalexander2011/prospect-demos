# Finding prospects

The pipeline that turns "a local business somewhere" into "a demo worth sending."
Five steps. Three are tooled, two are judgment, and the judgment ones are the
ones that decide whether it works.

```
  FIND  ─▶  QUALIFY  ─▶  READ  ─▶  BUILD  ─▶  PREFLIGHT
   you      tooled       you      CLAUDE.md    tooled
```

---

## 1. Find

Search a trade and a radius. High ticket, estimate-driven, visual work, an owner
with a crew. Roofing, concrete and coatings, HVAC, landscape and hardscape, pole
barns, remodel, windows and siding, paving, fencing, tree work.

Directories (Angi, Yelp, BBB, chamber listings) are useful for the *names*. Skip
their pages and go to the business's own site, which is the only thing worth
scoring.

**Ignore anything that turns out not to be a local business.** Von Paving scored
78 and was a programmatic doorway site with landing pages for Jamestown, Colorado.
Mallory scored 53 and sits two and a half hours outside the radius. Both would
have wasted a build.

## 2. Qualify

```bash
./bin/qualify.sh https://theirsite.com
```

Runs all three scans and gives a verdict. It answers two questions:

**Is the site bad enough to be worth rebuilding?** `bin/audit-site.py` reads the
markup, `bin/design-probe.js` renders the page and scores how it looks. Add them.

| Combined | Meaning |
|---|---|
| under 45 | Leave them alone. Nothing to wow them with. |
| 45 to 57 | Borderline. Open it and look. |
| **58+** | Worth rebuilding. Goblin cleared at 58. |
| 85 | Viper. |

The two axes are independent and you need both. Viper was 67 plumbing and 18
design, technically broken and visually survivable. Goblin was 15 and 43, the
exact opposite, and its markup is modern: flexbox, grid, `clamp()`, `srcset`,
Google Fonts. Either scorer alone would have missed one of them.

**Do they have anything to build with?** `bin/asset-inventory.js` renders the
page, scrolls it to wake lazy images, and inventories what the business actually
owns. Photography at real resolution, stock-photo tells, whose brand is in the
logo, promised galleries that go nowhere, credentials, published prices, and
whether reviews are readable or locked in a widget.

**A high score with no assets is not a prospect, it is an unpaid photoshoot.**

Then check by hand what no scan can see: a real crew, a real address, and money
visibly going out the door. A paid builder subscription, BBB accreditation,
chamber dues, review software. A bad website belonging to a one-man operation
with no budget is a bad website, not a prospect.

## 3. Read

**This is the step that decides whether the demo lands, and it is not automatable.**

Answer one question in one sentence: *what is this business sitting on that nobody
can see right now?* Write it into `<slug>/NOTES.md` under `## The read`, with an
`**Angle:**` line, **before any page exists**. `bin/preflight.sh` will not pass a
build without it.

The inventory hands you the evidence. Four checks have produced the angle every
time so far:

| What the scan found | The read it produced |
|---|---|
| Four Getty images against one real photo | *One photograph of a roof you built, four of roofs you didn't. After sixty-six years.* |
| Logo `alt="Waltersbuildings"` on a dealer template | *This is your supplier's website with your phone number on it.* |
| "Projects" in the nav linking to `/blog` | The one thing a roofer must prove, mislabelled. |
| Reviews behind an unreadable widget | Decides whether we can quote them at all, and Goblin's disclosure turned that into the most trusted paragraph on the page. |

Two failure modes to name out loud:

- **Nothing is buried.** Then they are the wrong prospect, and a negative read is
  a real result. Write "skip, and why" rather than manufacture an angle.
- **The angle fits any company in the trade.** Then it is not a read, it is a
  category observation, and the page will feel like a template with their logo on
  it. "Their site is slow" is not an angle. "You have one picture of your own
  work" is.

Worked examples, in ascending difficulty:

- `buck-and-bossman/NOTES.md` — the brand on the site is not theirs
- `sweers-roofing/NOTES.md` — the proof exists and is outnumbered by stock
- `lockhart-roofing/NOTES.md` — the assets are gone and have to be recovered

## 4. Build

Follow `CLAUDE.md`. The treatment is decided per business from the read, not
applied from a recipe. Photography, pricing, reviews and credentials are four
separate calls, and Viper and Goblin answered them oppositely.

```bash
./bin/new-demo.sh <slug> "Business Name" "Owner"
```

## 5. Preflight

```bash
./bin/preflight.sh <slug> --live
```

Honesty contract, technical floor, and a render. **Nothing goes out above a design
score of 12.** Both existing demos score 4. It prints the recorded read back so
you can hold it against the finished page.

---

## What none of this measures

Whether the owner will buy. Every scan here describes a website. The decision is
still a person looking at a business and judging whether there is something worth
showing them, and whether they are the kind of operation that can act on it.

The tools exist so that judgment is spent on the part that needs it, instead of
on counting images by hand.

# CLAUDE.md — how a prospect demo gets built

Read this before building any demo in this repo.

**The treatment is decided per business, not applied from a recipe.** What stays
fixed is the honesty contract and the technical floor. Everything else is a
diagnosis: look at what the business actually has, find the thing that is being
wasted, and build the page that shows it to them.

Two builds exist, and they were deliberately built differently.

---

## The diagnosis, through the two builds

### Viper Concrete Coatings, Grand Blanc
`coatings.locallvrg.co/viper.html`

**What they had:** genuinely good photography of their own floors. Real reviews
readable on their site. No published prices.

**Treatment:** lead with the photos. A before/after slider on the same slab, a
lightbox gallery of eight jobs, prep and grind shots. All three reviews quoted
verbatim with the reviewers' names. Not a single price anywhere on the page,
because they publish none and inventing one would be inventing.

**The angle:** *"Your photos are genuinely good and the work speaks for itself,
so I wanted to see what it would look like turned all the way up."*

### Goblin Heating & Cooling, Clio
`goblin-hvac/index.html`

**What they had:** a genuinely distinctive brand identity, artwork and all. No
usable photography of actual jobs. Published membership pricing, three tiers with
named perks. Reviews trapped behind a widget that could not be read.

**Treatment:** build on the artwork instead of photography, because the artwork
was the asset. Use the three plan names, prices and exact perks, because those are
theirs and published. Leave customer quotes off the page entirely, and say in the
disclosure exactly why.

**The angle:** *"You already had the best brand in Michigan HVAC. It was just
buried."*

Same skeleton underneath. Opposite decisions about imagery, pricing and proof,
because the two businesses were sitting on different unused assets.

---

## What never changes

**Invent nothing they would have to defend.**
No fabricated review. No invented price. No made-up license number, certification
or year founded. If they have not published it, you do not get to state it as
theirs.

**When you cannot read a source, say so and leave it out.**
Goblin's reviews sat behind a widget. The right move was to omit them and write:
*"I won't invent a testimonial. Pull the real ones from your Google profile and
they'll be stronger than anything I could write."* That paragraph does more for
trust than the reviews would have.

**Disclose in two columns, exhaustively, unflattering to yourself.**
Left: everything real, taken from them. Right: everything you wrote as
placeholder, including all body copy and every claim inside it. Be more thorough
than is comfortable. This column is the reason the page is believable.
End with: nothing in the placeholder column goes live until they confirm it.

**Make it unmistakably not their real site.**
It has to be obvious to somebody who lands with no context. Say it in the title,
say it near the top, say it in the disclosure, and link to their real site. Both
builds settle on "concept site", in the title and again in the ribbon at the top.
Keep that wording unless a business gives you a reason not to. Ambiguity is
the only thing that is actually forbidden.

**noindex, always.**
`<meta name="robots" content="noindex,nofollow">` plus the site-wide `robots.txt`.
This page must never compete with their real site in search, and telling them so
in the disclosure is a genuine courtesy that reads as one.

**Their material, committed with the page.**
Everything they own goes in `<slug>/assets/`. Before committing, be able to say
where each file came from. Anything you made or sourced yourself is disclosed as
yours in the right-hand column.

**Same-day takedown, no argument.**
Any company with a page here can email and it comes down that day. Honor it.

---

## The technical floor

These do not vary by business.

- **One file.** `<slug>/index.html` with inline CSS and JS. No framework, no build
  step. It loads in well under a second and that speed is part of what you are
  selling.
- **Self-hosted fonts.** `.woff2` in `<slug>/assets/fonts/`, `@font-face`d. Zero
  third-party requests on the page.
- **Their images, sized for the web.** Thumbnails separate from full-size. Lazy
  loading below the fold.
- **Real titles and Open Graph tags,** so a link posted to Facebook shows the
  company name and a decent image.
- **Keyboard-navigable, screen-reader labeled, legible at any width.**
- **Relative asset paths only,** so the folder stays portable.

---

## What you decide, every time

| Question | If yes | If no |
|---|---|---|
| Do they have usable photos of their own work? | Lead with them. Gallery, before/after, crew shots. | Find the other asset. Brand, artwork, credentials, hours, coverage. Do not substitute stock and call it theirs. |
| Do they publish prices? | Use them exactly, names and perks included. | No prices on the page at all. |
| Can you read their real reviews? | Quote verbatim, with names. | Leave them off and explain why in the disclosure. |
| Is there a credential worth surfacing? | State it exactly as published. License numbers, certifications, years. | Skip it. Do not approximate. |
| What is actually being wasted? | That is the angle, and the disclosure note is written in that voice. | If nothing is being wasted, they are the wrong prospect. |

The structure adapts too. Goblin needed 24/7 urgency triage and membership tiers.
Viper needed a prep-and-grind process story and a before/after. Start from the
common skeleton, then cut and add for the trade.

**Common skeleton:** hero, the assistant with a booking notification visible,
services in their own words, process, proof, service area with named towns, FAQ
answering the objections that otherwise become phone calls, one final CTA,
disclosure panel.

---

## The assistant

The live chat qualifies and books. Describe it honestly: it answers nights and
weekends, it captures name, job details, location and intent, and it pushes the
booking to the owner's phone. Do not claim it is a person. Do not claim it is
already wired to their calendar. Label the demo as a demo, the way Goblin does:
*"Interactive demo, nothing is sent anywhere."*

---

## Shipping

```bash
./bin/new-demo.sh <slug> "Business Name" "Owner"
```

Fill the copy, put their material in `<slug>/assets/`, push. Live at
`demos.locallvrg.co/<slug>/`.

## Finding the next one

```bash
./bin/audit-site.py https://theirsite.com
```

Scores how badly a site needs rebuilding. Higher is worse, which means better
prospect. **Viper scored 67.** Treat that as the bar. Below roughly 35 there is
not enough wrong to be worth the swing.

The score measures the website, not the buyer. Check by hand for a real crew, a
real address, and money visibly going out the door: a paid builder subscription,
BBB accreditation, chamber dues, review software. Then open the site and look at
what there is to work with, because that is what decides the treatment.

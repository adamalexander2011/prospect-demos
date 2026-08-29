# DeBoer Concrete And Construction LLC — the live build

**Status:** **BUILT, NOT LIVE.** Waiting on (a) Nick saying go, and (b) his sign-off
on the copy listed in `GO-LIVE.md`.
**Source of the design:** `../deboer-concrete/` — the concept he was sent on 27 August
and replied to. The design language is unchanged, because he liked it.
**Target:** `https://deboerconcreteandconstructionllc.com/` (root of his own domain)
**Design score:** 5 (concept scored 5; the gate's ceiling is 12)

## Why this is a separate folder and not an edit

The concept and the live site are different documents with different obligations,
and both need to keep existing.

The concept is addressed to Nick. It argues a case, it discloses what is invented,
and it is `noindex` so it can never compete with him. The live site is addressed to
somebody in Genesee County who needs a slab poured. It makes claims **in his name**,
and it is built to be found.

Every difference between the two folders comes from that one change of audience.

| | Concept | Live |
|---|---|---|
| Robots | `noindex,nofollow` | indexable, `robots.txt` + `sitemap.xml` |
| Canonical | none | his own domain |
| Concept ribbon | at the top of the page | gone |
| Pitch + disclosure panel | the whole bottom third | gone |
| Footer | "Concept design by Local LVRG, not affiliated" | his business footer, quiet credit |
| Structured data | none | `GeneralContractor` JSON-LD |
| The assistant | demo, "nothing is sent anywhere" | really sends, or hands off to email |
| Supporting pages | none | `privacy.html`, `404.html` |

## The assistant: booking agent, not estimator

Rebuilt at Adam's direction. It **books a site visit** and it **never quotes**.

The flow is five steps: job, size, town, time slot, contact. The slot is the climax
rather than an afterthought, and there is a "none of those, another time" branch that
takes a free-text preference. The old "when are you hoping to have it done" step is
gone: booking a specific visit *is* the timing answer, and a booking agent should not
ask a question it has already answered.

**No pricing anywhere, by instruction.** The agent says so out loud in its second
message — *"we don't quote concrete online"* — and again in the confirmation. That is
now a selling point rather than an omission: it is the same argument the six-questions
section makes, that a number without a site visit is a guess.

**It does not say "booked" until it is.** With no endpoint configured the confirmation
reads *"Got everything"* and hands the visitor a prefilled email. Only a `200` back
from the endpoint earns *"You're in the book."* A failed send says so, keeps the
details on screen, and falls back to email. This matters more than it looks: a form
that silently loses a lead is worse than no form, and a form that lies about having
sent one is worse again.

## What is still his and unchanged

The logo, all seven photographs, the phone number, the email, Clio 48420, and Greg
Taylor's review quoted word for word with his name. Nothing was added to that list to
fill the space left by the pitch panel.

## Still refused, on the live site as on the concept

No prices. No year founded. No licence number. No insurance claim. No crew size. No
opening hours. No `aggregateRating` in the structured data — two Facebook reviews is
not a rating, and faking one is both a lie and a Google policy violation that can cost
him the profile he does not have yet.

## The part that needs Nick

Everything in the concept's right-hand "written by me" column is still written by
Adam, but it is no longer labelled as placeholder anywhere on the page, because a live
site has no such column. **That is the whole risk of going live, and `GO-LIVE.md` is
the list.** Nothing ships until he has read it.

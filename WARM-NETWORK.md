# Warm network pass — Adam's Facebook

First pass, 27 August 2026.

**Read this first: the method in the original brief is wrong, and DeBoer proves it.**

The brief ranks "Pages Adam follows or likes" as rung 1, on the reasoning that the
list is short and "heavily weighted toward people he actually knows." That
reasoning does not hold for this account.

**Following a Page is a marketing artifact, not a relationship.** Adam follows 465
Pages. He follows them because of the coatings campaign, because of the algorithm,
because of a video he liked in 2019. The list answers "what has Adam tapped a
button on", which is not the question. Meanwhile the people he actually knows
mostly are not in it, because you do not follow your family friend's business page,
you just know them.

**DeBoer Concrete And Construction is the proof.** Family friend, Clio MI, scored
**96**, the highest on this board and above Viper. Their Facebook Page shows
**Follow**, not **Following**. They were unreachable from rung 1 by construction,
and the only thing that surfaced them was Adam saying their name out loud.

### The ladder that actually applies

1. **Ask Adam.** He can name more in five minutes than a week of graph-walking
   returns. Every name he gives is pre-qualified on the only axis that matters,
   which is whether the relationship is real. Start here, always.
2. **From a named business, work outward.** Who do they sub to, who subs to them,
   who is tagged in their job posts. Trades cluster, and a family friend's
   neighbours in the trade are one introduction away rather than zero.
3. Group member overlap in local town groups, for names to take back to Adam.
4. Pages that interact with Adam's own Page.
5. Followed Pages. **Last, not first.** It is a low-yield list full of strangers.

Everything below this line is the original pass, kept because the skips are still
worth not repeating.

---

## What stopped the graph-walking half of this

Facebook served this session **exactly the first 20 items of every list and then
refused to fetch any more.** Confirmed on four separate surfaces and in a clean
second tab:

| Surface | Real size | Reachable |
|---|---|---|
| Pages Adam follows (`/pages/?category=liked`) | **465** | 20 |
| People Adam follows (`/me/following`) | **787** | 8 |
| Groups Adam has joined (`/groups/joins`) | **138** | 20 |

The pagination spinner renders and never resolves. `scrollHeight` stops growing.
The "Sort" menu opens and accepting a different sort order (Earliest liked first)
returns the identical 20 rows, which means the refetch fails the same way.

In the first tab the degradation was worse: link clicks did not navigate and the
group search field would not accept typed characters. A fresh tab restored clicks
and typing but **not** pagination.

**What still worked:** direct URL navigation, individual Page loads in full, and
`/search/pages/` and `/search/groups/` result pages.

I did not try to engineer around this. That was the instruction and it is also the
right call.

### To finish the pass

The cheapest unblock is for Adam to scroll the three lists himself in his own
browser until they are fully loaded, then hand over the rendered page. Failing
that, wait and retry. Whatever this is, it looked like throttling rather than a
checkpoint, because no challenge or warning was ever shown.

## Ladder coverage

| Rung | Status |
|---|---|
| 1. Pages Adam follows or likes | **Partial.** 20 of 465. |
| 2. Group member overlap | **Blocked.** Group list capped, and clicking into a group failed. |
| 3. Pages interacting with Adam's Page | **Not reached.** |
| 4. Recommendation threads | **Not reached.** Depends on group browsing. |
| 5. Friend profiles by employer | **Not reached.** 8 of 787, and correctly the last resort. |

## A finding worth keeping regardless

**Adam's follow graph is heavily polluted by the coatings campaign, and this will
distort every future pass.** Of the eight people reachable in `/me/following`,
four were out-of-state coating contractors (Epoxy Fresh Flooring, Hammer Coatings,
Bigfoots Concrete Coatings, plus a Colorado epoxy supplier). Of 138 groups, the
visible 20 were mostly national epoxy and agency groups.

Both lists are ordered most-recent-first, so the recent follows are strangers from
the cold campaign and the genuine local connections are older and further down,
behind exactly the pagination that is broken. **Sorting by "Earliest liked first"
is the right instinct when the list loads again.**

Local groups Adam is in, spotted before the cap: Fenton Local For the People
(private, 1.9K, 6 friends), Wheel N' Dealin Man Stuff Michigan, Genesee County
Homeschoolers & Activities, Homeschool Fun - Lapeer, HEARTH Homeschool Support.

Local groups he is **not** in, surfaced by search with their friend overlap, which
is the strongest rung-2 lead list for next time:

| Group | Members | Friends who are members |
|---|---|---|
| Friends of Fenton MI | 10K | **32** |
| Flint's HNN (Hood News Network) | 5.8K | **19** |
| What's Up, Fenton? | 2.6K | **15** |
| Flint Township, Swartz Creek, Grand Blanc, Fenton | 757 | 2 |
| Service Providers of Fenton | 179 | none shown, but it is a trades-only group |

## Checked and concluded

| Business | Trade | Town | How found | Verdict |
|---|---|---|---|---|
| **DeBoer Concrete And Construction LLC** | Concrete | Clio, MI | **Adam named them. Family friend.** | **BUILD. Score 96, highest on the board.** Paying for domain, Squarespace and Google Workspace; the site says "Coming Soon". Real photos, real logo, one quotable review, no Google Business Profile. See `deboer-concrete/NOTES.md`. |
| **Maximum Roofing** | Roofing | Chesaning, MI | Followed Page | **Skip, score 40.** Their site is genuinely decent. Separate finding: their old domain now runs a casino. See `maximum-roofing/NOTES.md`. |
| **Awesome Custom Painting LLC** | House painting | Montrose, MI | Followed Page | **Not this build. Page, no website.** See below. |
| **Supply Haus 1775** | Epoxy product supplier | Grand Junction, **CO** | Followed Page | Skip. Out of state, sells DIY kits, no crew, coatings-campaign follow. |
| **Monster Car Buyers** | Towing / car buying | Unverified | Followed Page | Skip. Not an estimate-driven trade with a crew. Location never confirmed. |
| Witch's Hat Brewing Company | Brewery | South Lyon, MI | Followed Page | Skip. Not an estimate-driven trade. |
| Couples Counseling Center | Therapy | — | Followed Page | Skip. Not a trade, and not a category to build a spec page for uninvited. |
| Life Crafted Together | — | — | Followed Page | Skip. This is Adam's own former brand, now One Story Stronger. |
| The Family Circle Show, Men's Humor, Psychotic 2, The Nostalgic 90's, Hoodpranksonly, Mic for Flint Mayor, Brian Tracy, Ref Rob, Mulliganbrothersofficial, Jon Gruden, BratBusters Parenting, The Bassett Brothers, PredatorPoachers, Westside Barbell | — | — | Followed Pages | Skip. Media, creators, public figures and interest pages. No business to rebuild. |
| Michael Robinson (Epoxy Fresh Flooring), Gary Turner (Hammer Coatings), Dustin English (Bigfoots Concrete Coatings) | Coatings | Out of area | `/me/following` | Skip. Coatings-campaign follows, not warm local contacts. |
| Sean Thomas Klapperick (Xcel Energy) | Utility | — | `/me/following` | Skip. Employee of a utility, not a business owner. |

### Awesome Custom Painting LLC — the "Page but no website" case

Jessie Wolford, Montrose MI, category House Painting, 671 followers, 100%
recommend across 28 reviews. From her own post on the Page: *"owner of Awesome
Custom Painting LLC established in 2017"*, *"I've been painting for over a
decade"*, *"I service Genesee county area!"* Bio reads *"painter of fine spaces,
insured dependable skilled custom work"*.

**There is no website.** The About tab lists no site, the only outbound link is
Instagram `awesome_custom_painting`, and her HomeAdvisor listing URL is literally
built from her Facebook address, meaning the "website" she gave HomeAdvisor was
her Facebook Page.

She is on Angi and HomeAdvisor, which is real money going out the door for leads.
That is the one genuine buying signal here.

Against it: every post and every review is written about one person doing the work
herself, and I saw no evidence of a crew. Per the bar, a warm prospect with no
crew and no budget is an awkward conversation rather than a sale, so this is
**recorded, not queued**. If Adam wants to take it anyway, it is a different
conversation from the spec-rebuild play, because there is nothing to rebuild
**from**: no photography at usable resolution outside Facebook, no published
prices, no site to diagnose.

## Note for whoever writes the next pass

**This repo is public** (see the house rules in `README.md`). Business names are
fine and are the point. A `**Connection:**` line that describes how Adam knows
someone personally is a different kind of fact, and it should not be committed
here. Nothing in this file crosses that line, because the only connection
established was "Adam follows their Page", which is already public. Keep it that
way, or move the connection column somewhere private.

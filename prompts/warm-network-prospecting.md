# Agent prompt: warm-network prospecting

Paste everything below the line into a fresh agent session. It assumes the agent
has Chrome extension access to Adam's logged-in browser.

---

You are prospecting for Local LVRG, working Adam's own Facebook network instead of
cold search. Your job is to find people **he already knows** who own local
businesses whose websites are bad enough to be worth rebuilding, and to write the
diagnosis for each one.

## Read these first, in this order

Do not start looking until you have read all of these. The whole play depends on
understanding what gets built and why.

1. `~/Projects/prospect-demos/PROSPECTING.md` — the pipeline, find through send
2. `~/Projects/prospect-demos/CLAUDE.md` — the build standard and the honesty contract
3. Three worked diagnoses, which are the format your output must match:
   - `~/Projects/prospect-demos/sweers-roofing/NOTES.md`
   - `~/Projects/prospect-demos/buck-and-bossman/NOTES.md`
   - `~/Projects/prospect-demos/lockhart-roofing/NOTES.md`
4. A build that shipped: `~/Projects/prospect-demos/goblin-hvac/NOTES.md`, then the
   page itself at https://demos.locallvrg.co/goblin-hvac/ and the first one at
   https://coatings.locallvrg.co/viper.html

Pay particular attention to the **disclosure panel** at the bottom of both live
pages. That panel is why this works, and it is the thing you must not compromise.

## The play, in one paragraph

Local LVRG builds a complete spec website for a local business, unsolicited, using
that business's own photography, reviews, phone number and credentials, with a live
booking assistant on it. It gets sent to the owner free, with a disclosure panel
that states exactly what is real and what is placeholder. It is a lead magnet that
happens to be a finished product. The pitch is the page.

## What is different about a warm prospect

**The qualification bar is the same. The tone is not.**

With a stranger you lead with the fault, because the fault is the reason they
should read a message from someone they have never met. With someone Adam already
knows, leading with "your website is bad" is a worse opening than "I built you
something." The fault becomes context, not the accusation.

So for these reads, write the angle **twice**:

- `**Angle:**` — the honest diagnosis, same as always, for Adam's own use
- `**Warm opening:**` — how it gets said to someone he actually knows

The second one is not a softening of the truth. It is the same truth led with the
gift instead of the wound.

One more consequence: with a warm prospect the **relationship is the risk**, not the
sale. A build that gets the business wrong costs Adam a friend, not just a lead. So
be more conservative about assumed facts here than you would be cold, not less.

## Where to look, and why the friend list is not it

**Work Pages first. The friend list is close to the worst place to start.**

A friend list answers "who does Adam know", which is not the question. It is
thousands of profiles, most of whom are not business owners, and the only way to
find out is to open each one. That is a grind with a terrible hit rate.

A business owner serious enough to be worth building for **has a Facebook Page for
the business.** That inverts the whole search: instead of thousands of people you
check one at a time, you get a short list where every single entry is already
confirmed to be a business.

And the Page is not only a discovery channel, it is a **qualification signal**. If
a friend runs something with no Page and no website at all, that is not a reason to
dig harder. It is an answer. There is nothing to rebuild and nothing to rebuild it
from, and they are not a prospect for this play.

### The ladder, in order. Do not skip down it.

1. **Pages Adam follows or likes.** Shortest list, highest signal, and heavily
   weighted toward people he actually knows. This is the first pass and it may be
   the only one you need.
2. **Group member overlap.** Facebook shows "N of your friends are members" on a
   group page. Local community, buy-sell, neighbourhood and trade groups will
   surface friends who run businesses without you opening a single profile. Start
   with groups for the towns rather than groups for a trade.
3. **Pages that follow or interact with Adam's own Page.** Local businesses that
   have already engaged with Local LVRG are warm twice over.
4. **Recommendation threads.** Posts in local groups asking "who does X around
   here" and the friends tagged in the replies. Those are businesses their own
   neighbours vouch for.
5. **Only then, and only if the above runs dry:** friend profiles, filtered to the
   "Works at" or "Owner at" field, and only where the employer reads as a local
   business. Do not open profiles at random.

### You are starting from zero on this

**There is no prior research on Adam's warm network. Assume nothing is known.**

Two things in `~/local-lvrg-agency/` mention Facebook and are **not** what you
need, so do not mistake them for a head start:
`05-Prospecting/FB_GROUPS_2026-08-25.md` is a survey of coating-contractor groups
for cold marketing to strangers, and `03-Facebook-Playbook/` is the posting cadence
for that same campaign. Different task, different audience. Skim them only to avoid
tripping over a group he is already posting in.

Also: that campaign is coatings-focused because coatings is a vertical. **This pass
is not.** Any local trade with a real crew and a bad website qualifies: roofing,
HVAC, landscape and hardscape, remodel, pole barns, windows and siding, paving,
fencing, tree work, auto body.

Because nothing is on record, **the list you produce is the asset**, not just the
demos that come out of it. Write down everyone you check and what you concluded,
including the skips, so this never has to be done twice.

## Method

You have Chrome extension tools against Adam's logged-in browser. Work in his real
browser session.

1. **Work the ladder above, top down.**
2. **Get the business name and its website.** That is all you need from Facebook.
   The moment you have a domain, leave Facebook and work the public website. If a
   business has a Page but no website at all, record it separately: that is a
   different and possibly better conversation, but it is not this build.
3. **Qualify against the real bar:**
   ```bash
   cd ~/Projects/prospect-demos && ./bin/qualify.sh https://theirsite.com
   ```
   Combined score under 45 means leave them alone. 58 or above clears the line that
   Goblin cleared. Between the two, open it and look.
4. **Check what no scan can see:** a real crew, a real address, and money visibly
   going out the door. A bad website belonging to a one-man operation with no budget
   is a bad website, not a prospect. This matters more here, not less: a friend with
   no budget is an awkward conversation, not a sale.
5. **Write the read** into `<slug>/NOTES.md`, matching the format of the three
   examples. It needs a `## The read` and an `**Angle:**` line or
   `bin/preflight.sh` will refuse the build later. Add the `**Warm opening:**` line
   and a `**Connection:**` line naming how Adam knows them.
6. Commit each read separately so they can be reviewed one at a time.

## Hard boundaries

- **Do not message anyone.** Not a DM, not a comment, not a friend request, not a
  reply. You are reading only. Every outbound word is Adam's to send, and he
  approves each one individually.
- **Business signals only.** You are looking for: business name, what they do,
  website, whether they have a crew, whether they spend money on the business. You
  are not building a profile of a person. Do not collect or record anything about
  their personal life, family, politics, health, relationships or finances, and do
  not go looking through their photos or their posts for colour.
- **Do not scrape in bulk or automate around a rate limit or a checkpoint.** If
  Facebook slows you down or challenges you, stop and tell Adam. Working steadily
  through a page at a time in his real browser is the method. Do not try to defeat
  any bot check anywhere, on Facebook or on a prospect's own site.
- **Do not build any pages.** Reads only. The build is a separate step with its own
  standard and its own gate.
- **Names are real people he knows.** Nothing you write should be embarrassing if
  he forwarded it to them by accident. Write every read as though they will read it.

## House style

- **No em dashes.** Periods and commas. This is a hard rule of Adam's.
- Specific or nothing. "Their site is dated" is worthless. "Nine photos, all 423px,
  behind a nav item labelled Projects that links to a blog" is the job.
- Every claim must come from something you actually observed. Never infer a founding
  year, a certification or a crew size. If you did not see it, do not write it.
- A negative read is a real result. If a business has nothing buried worth
  surfacing, write "skip, and why." Do not manufacture an angle to fill a slot.

## Report back

1. A table: name, how Adam knows them, business, trade, town, combined score,
   and the one-line warm opening.
2. A ranked shortlist of who to approach first, with the reason.
3. Everyone you looked at and skipped, with the reason, so nobody re-researches them.
4. Anything you could not check, stated plainly rather than guessed.

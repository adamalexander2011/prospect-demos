# Lynnman Construction LLC — Morrice, MI

**Status:** read on record, not built
**Their site:** lynnmanconstruction.com
**Score:** 31 plumbing + 29 design = **60** (plumbing re-measures at 25 today because the audit tool could not complete the handshake, see the TLS note)
**Read written:** 27 August 2026

## The read

The first text on the homepage, above the phone number, is **"AUTHORIZED WICK
BUILDER."** The nav has "WICK AUTHORIZED BUILDER" and "WHY WICK BUILDINGS." A
homepage section runs **"THE WICK ADVANTAGE — Create STRENGTH. Create VALUE. Create
with WICK"** over six illustrations, one of whose alt text is *"Illustration of
Superman revealing a Wick T-shirt."* The footer links to the **Wick blog**.

Then open the About Us page. Its main content block is:

> **"THE WICK ADVANTAGE — Screw Fasteners: Small but Strong.** The new Wick Premium
> Fastener™ is a next-generation fastener for post-frame construction... 46% more
> shear strength, 57% more pull-out strength than standard post-frame screws...
> neoprene seal that's 2.3 times thicker."

**Their About page is mostly a spec sheet for a screw.** The paragraph above it is
this:

> *"Owners **Tom Flynn** and **Keith Pinkelman** are both graduates of **Michigan
> State University's Building Construction Management** program. Tom was raised in
> Michigan's Upper Peninsula... Keith was raised in Ohio and has extensive
> experience in construction and management in the greenhouse and horticultural
> industry. **They began working with Wick Buildings in 1997**, with Keith
> specializing in design and estimating while Tom managed all aspects of the
> on-site building process."*

Two named owners, two degrees in building construction management, a stated
division of labour, and a start date. **Nobody else on this board has a
degree-level credential.** It is a paragraph above a screw.

And 1997 to 2026 is twenty-nine years. The homepage calls it *"nearly a quarter
century."* Same self-undercount as Motor City, which is eighty-seven years old and
says seventy.

**Now the photography, which is enormous.**

**291 distinct photographs** of their own buildings, on the categories pages, in
typed folders:

```
Suburban_Buildings/     Equine_Buildings/     Commercial_Buildings/
Agricultural_Buildings/ Residential_Buildings/ winery/
Fischer/  Watters/  Spadacene/
```

Those last three are client surnames. Filenames are `DSC_0071_11.jpg`,
`DSC_3483_2-H.jpg`, `DSC_0144.JPG`. DSLR files, not phone snaps. I measured four:
**2400x1132**, 1280x829, 1280x736, 1000x669.

Here is what happens to them. In the gallery markup the `<img src>` and the
fancybox `href` are **the same file**:

```html
<a class="fancybox-effects-c" href=".../Agricultural_Buildings/DSC_0071_11.jpg">
  <img src=".../Agricultural_Buildings/DSC_0071_11.jpg" alt="" />
</a>
```

There are no thumbnails. Every full-size original is downloaded and shrunk by CSS.
I totalled the content-length of every image on the Suburban Buildings page:

> **73 files. 42.6 megabytes. One page.**

No lazy loading. `alt=""` on all of them. A farmer on a rural Michigan phone
connection is never going to see that page.

Two more findings on the homepage. The **Commercial** and **Residential** category
tiles are served from `sites/layout7.hitsinabox.us/assets/images/` — the template
vendor's own demo-site asset directory, not the `sites/lynnmanconstruction.com/`
folder where all 291 of their real photographs live. Both are 2400x1132 and over a
megabyte. And the header logo `<img>` is requested over plain **`http://`** on an
https page.

The rest of what they own, all real, all published:

- **Five affiliations** on the About page: **National Federation of Independent
  Business**, **Shiawassee County Economic Development**, **Shiawassee County
  Chamber of Commerce**, **Future Farmers of America**, **4H**. FFA and 4H are
  exactly right for an agricultural builder in Shiawassee County and they are
  listed like an afterthought.
- **A real project spec sheet.** `/boyne-winery`, completion date **2019**: *"a
  40x63x12 Monitor roof; fully lined/insulated with reclaimed wood and galvanized
  metal and stone; exposed beams; 2nd floor storage area; 2 bathrooms, 2 12x8 glass
  overhead doors, 1 8x4 glass overhead door; exterior board & batten siding."*
  One project has that. Two hundred and ninety-one photographs do not.
- **Two testimonials**, with names and towns. **Nan, Midland, MI**: *"There is not a
  day that I don't walk into the barn and just pause in amazement... this place that
  has become a 'Happy Haven' for many."* **Mike & Sue, Carson City, MI**: *"Roy and
  crew would be hard to beat!"*
- 3D building design, building repair, financing and warranty. Based in Morrice,
  serving the entire state. 2482 W. Lansing Rd, Morrice, MI 48857, 517-625-5558.
- Their own tagline, and it is a good one: **"A no-nonsense construction company."**

**Angle:** two Michigan State building-construction graduates, two hundred and ninety-one photographs of your own barns, and your About page is mostly a spec sheet for a screw.

## Treatment

| Decision | Call |
|---|---|
| Photography | **The largest usable library on the board, by a factor of five.** 291 originals up to 2400px, already sorted by building type, some already sorted by client. This is a Viper-style photo build with room to spare. Generate real thumbnails, lazy load, and the same photographs become a page that loads in under a second instead of 42 megabytes. |
| Prices | None published. None on the page. Financing exists and is named, with no terms. |
| Reviews | **Two, verbatim, with names and towns.** Nan's is genuinely moving and should lead. Two is thin, so check Google and Facebook before deciding whether proof is a section or a sentence. |
| Credentials | **Tom Flynn and Keith Pinkelman, MSU Building Construction Management, working with Wick since 1997.** Plus NFIB, Shiawassee EDC, Shiawassee Chamber, FFA and 4H. All theirs, all published, all usable exactly as written. **Say 1997, not "nearly a quarter century."** |
| Structure | The owners and the degrees go at the top, where "AUTHORIZED WICK BUILDER" currently sits. Then the buildings by type. Then the winery, as proof they do more than barns. The Wick relationship becomes a credential line, the way Buck & Bossman's Walters dealership should. |

**Handle Wick exactly the way Buck & Bossman's Walters branding is handled in that
read.** They are almost certainly running a Wick dealer template — the giveaway is
the template vendor's demo folder still sitting on their server — and they may be
contractually required to carry the badge. **Do not open by telling them their
marketing belongs to somebody else.** Show them what "Tom Flynn and Keith
Pinkelman, MSU Building Construction Management, since 1997" looks like at the top
of a page, and let them raise the constraint.

**One technical note that is not the angle but is worth knowing.** The server
negotiates **TLS 1.3 only**. TLS 1.0, 1.1 and 1.2 all fail. The certificate itself
is fine (SSL.com, valid to 1 October 2026). Browsers are fine. But `audit-site.py`
could not complete a handshake, which is why the plumbing score dropped from 31 to
25, and anything else that cannot do 1.3 — old Android, some corporate proxies,
some crawlers — is in the same position. Mention it once, factually, near the end.

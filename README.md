# prospect-demos

Private, one-business-at-a-time demonstration pages, served at
**https://demos.locallvrg.co** from GitHub Pages.

Each demo lives at its own address (`/business-slug/`) and is sent
directly to the owner. There is no index page listing them, and
`robots.txt` disallows everything, so a demo is only findable by
someone who was given the link.

## Ship a demo

```bash
./bin/new-demo.sh acme-coatings "Acme Coatings" "Dave"
```

That copies `_template/` into `acme-coatings/`, fills in the mechanical
bits (business name, owner, slug, date, booking link), and prints the
copy placeholders you still need to write.

Fill those in, then:

```bash
python3 -m http.server 8000     # check it at localhost:8000/acme-coatings/
git add acme-coatings
git commit -m "demo: Acme Coatings"
git push
```

Live within a minute or so at `https://demos.locallvrg.co/acme-coatings/`.

## Layout

```
index.html          holding page, deliberately lists nothing
404.html            for a link that got cut short in a text message
robots.txt          disallow all
CNAME               demos.locallvrg.co
.nojekyll           serve files as-is, no Jekyll build
assets/lvrg.css     shared design system, matches locallvrg.co
_template/          the demo shell, copy it, do not edit in place
bin/new-demo.sh     the copier
bin/audit-site.py   scores a prospect site's plumbing
bin/design-probe.js renders it in headless Chrome and scores how it looks
bin/preflight.sh    run before a demo link goes out
CLAUDE.md           the build standard, read it before building anything
<slug>/index.html   one prospect demo
```

## House rules

**The repo is public.** Anything committed here is readable by anyone
who finds the repo, whether or not the page is linked. So:

- No customer lists, no phone numbers, no email addresses, no CRM exports.
- No API keys, webhook URLs with secrets, or location IDs you would not
  print on a business card.
- Real business names are fine. That is the point of the demo. Details
  a prospect told you in confidence are not.

**Specific beats polished.** Three observations only that business could
receive beats a beautiful page that would fit any of them. If you cannot
make a card specific, delete the card.

**One ask per page.** The CTA block asks for one thing. Not two.

**Green is for bookings.** `--book` green is reserved for the appointment
notification. Everything else uses the chalk-line orange.

**Texting the link.** Put a few words before the URL when sending by SMS.
Bare links have rendered badly on Android in the past.

## Taking a demo down

```bash
git rm -r acme-coatings && git commit -m "retire: Acme Coatings" && git push
```

The page 404s immediately. It stays in git history, which is another
reason to keep confidential detail out of it in the first place.

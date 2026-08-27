#!/usr/bin/env bash
# Create a new prospect demo from _template/.
#
#   ./bin/new-demo.sh <slug> "Business Name" ["Owner First Name"] ["https://cta-url"]
#
# Fills the mechanical placeholders, leaves the copy placeholders for you,
# then tells you exactly what is still unfilled.

set -euo pipefail
cd "$(dirname "$0")/.."

if [ $# -lt 2 ]; then
  echo "usage: $0 <slug> \"Business Name\" [\"Owner First Name\"] [\"https://cta-url\"]" >&2
  exit 1
fi

SLUG="$1"
BUSINESS="$2"
OWNER="${3:-there}"
CTA_URL="${4:-https://link.locallvrg.co/widget/booking/m6KuWZpoARiqbasqaI9U}"

case "$SLUG" in
  *[!a-z0-9-]*|-*|*-|"")
    echo "error: slug must be lowercase letters, numbers and hyphens only" >&2
    echo "       got: '$SLUG'" >&2
    exit 1 ;;
esac

if [ -e "$SLUG" ]; then
  echo "error: $SLUG/ already exists. Pick another slug or delete it first." >&2
  exit 1
fi

PREPARED="$(date +"%B %d, %Y" | sed 's/ 0/ /')"

mkdir -p "$SLUG"
cp _template/index.html "$SLUG/index.html"

SLUG="$SLUG" BUSINESS="$BUSINESS" OWNER="$OWNER" CTA_URL="$CTA_URL" PREPARED="$PREPARED" \
python3 - "$SLUG/index.html" <<'PY'
import html, os, sys

path = sys.argv[1]
subs = {
    "__SLUG__":     os.environ["SLUG"],
    "__BUSINESS__": html.escape(os.environ["BUSINESS"]),
    "__OWNER__":    html.escape(os.environ["OWNER"]),
    "__CTA_URL__":  html.escape(os.environ["CTA_URL"], quote=True),
    "__PREPARED__": os.environ["PREPARED"],
}
with open(path, encoding="utf-8") as f:
    text = f.read()
for k, v in subs.items():
    text = text.replace(k, v)
with open(path, "w", encoding="utf-8") as f:
    f.write(text)
PY

echo "created $SLUG/index.html for \"$BUSINESS\""
echo
echo "still to fill in:"
grep -o '__[A-Z0-9_]*__' "$SLUG/index.html" | sort -u | sed 's/^/  /'
echo
echo "preview locally:  python3 -m http.server 8000  ->  http://localhost:8000/$SLUG/"
echo "ship it:          git add $SLUG && git commit -m \"demo: $BUSINESS\" && git push"
echo "live at:          https://demos.locallvrg.co/$SLUG/"

#!/usr/bin/env bash
# Qualify one prospect. Runs all three scans and gives a verdict.
#
#   ./bin/qualify.sh https://theirsite.com
#
# Three questions, in order, because each one can end the conversation:
#
#   1. Is the site bad enough to be worth rebuilding?   -> the combined score
#   2. Do they have anything to build WITH?             -> the asset inventory
#   3. What are they sitting on that nobody can see?    -> yours to answer
#
# A high score with no assets is not a prospect, it is an unpaid photoshoot.

set -uo pipefail
cd "$(dirname "$0")/.."

URL="${1:-}"
[ -z "$URL" ] && { echo "usage: $0 <url>" >&2; exit 1; }
case "$URL" in http*) ;; *) URL="https://$URL" ;; esac

HOST=$(echo "$URL" | sed -E 's#https?://##; s#/.*##; s#^www\.##')

echo
echo "══════════════════════════════════════════════════════════════════════════════"
echo "QUALIFYING  $HOST"
echo "══════════════════════════════════════════════════════════════════════════════"

# ---------- 1. is it bad enough ----------
echo
echo "── 1. Is it bad enough to rebuild ────────────────────────────────────────────"
echo
PLUMB_OUT=$(python3 bin/audit-site.py "$URL" 2>&1)
PLUMB=$(echo "$PLUMB_OUT" | grep -oE 'SCORE [0-9]+' | head -1 | grep -oE '[0-9]+')
echo "$PLUMB_OUT" | grep -E '^\s+(title|built on|stats|\[\+|!)' | sed 's/^/  /'

DESIGN_OUT=$(node bin/design-probe.js "$URL" 2>&1)
DESIGN=$(echo "$DESIGN_OUT" | grep -oE 'DESIGN [0-9]+' | head -1 | grep -oE '[0-9]+')
echo
echo "$DESIGN_OUT" | grep -E '^\s+(headline|type|palette|loaded|\[\+|!)' | sed 's/^/  /'

PLUMB=${PLUMB:-0}; DESIGN=${DESIGN:-0}
TOTAL=$((PLUMB + DESIGN))
echo
printf "  plumbing %s  +  design %s  =  \033[1m%s\033[0m\n" "$PLUMB" "$DESIGN" "$TOTAL"
echo "  Goblin cleared at 58. Viper was 85."

if [ "$TOTAL" -lt 45 ]; then
  printf "  \033[32mVERDICT: leave them alone.\033[0m Not enough wrong to be worth the swing.\n"
  VERDICT=skip
elif [ "$TOTAL" -lt 58 ]; then
  printf "  \033[33mVERDICT: borderline.\033[0m Open it and look before committing.\n"
  VERDICT=maybe
else
  printf "  \033[31mVERDICT: worth rebuilding.\033[0m Clears the Goblin line.\n"
  VERDICT=build
fi

# ---------- 2. is there anything to build with ----------
echo
echo "── 2. Do they have anything to build with ────────────────────────────────────"
node bin/asset-inventory.js "$URL" 2>&1 | sed '1,2d' | sed 's/^/  /'

# ---------- 3. the part that is not automatable ----------
cat <<EOF
── 3. What are they sitting on that nobody can see ───────────────────────────

  The two scans above are evidence, not a diagnosis. Read them together and
  write the answer down before any page exists:

    mkdir -p <slug> && \$EDITOR <slug>/NOTES.md

  It needs a "## The read" and an "**Angle:**" line. bin/preflight.sh will
  refuse to pass the build without them. Match the shape of:

    sweers-roofing/NOTES.md      66 years, one photo of their own work, four Getty
    buck-and-bossman/NOTES.md    their supplier's website with their phone on it
    lockhart-roofing/NOTES.md    three paid trust signals aimed at a dead domain

  Then check by hand, because no scan can:

    a real crew, a real address, and money visibly going out the door
    (a paid builder subscription, BBB accreditation, chamber dues, review
    software). A bad website belonging to a one-man operation with no budget
    is a bad website, not a prospect.

EOF

[ "$VERDICT" = "skip" ] && exit 1
exit 0

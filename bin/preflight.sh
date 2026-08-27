#!/usr/bin/env bash
# Run before a demo link goes out.
#
#   ./bin/preflight.sh goblin-hvac              # check the local file
#   ./bin/preflight.sh goblin-hvac --live       # check what is actually served
#
# Two gates, because they fail differently.
#
# The FLOOR is automated and checked here: the honesty contract, and a design
# score low enough that the page is not embarrassing. Both existing demos score
# 4. Anything over 12 has something visibly wrong with it.
#
# The CEILING is not automatable and never will be. It is printed at the end as
# three questions, because a page can pass every check below and still be a
# generic template with someone's logo on it.

set -uo pipefail
cd "$(dirname "$0")/.."

SLUG="${1:-}"
MODE="${2:-}"
[ -z "$SLUG" ] && { echo "usage: $0 <slug> [--live]" >&2; exit 1; }
[ -d "$SLUG" ] || { echo "error: no such demo: $SLUG/" >&2; exit 1; }

FILE="$SLUG/index.html"
[ -f "$FILE" ] || { echo "error: $FILE not found" >&2; exit 1; }

FAIL=0
pass() { printf "  \033[32m ok \033[0m %s\n" "$1"; }
fail() { printf "  \033[31mFAIL\033[0m %s\n" "$1"; FAIL=$((FAIL+1)); }
warn() { printf "  \033[33mwarn\033[0m %s\n" "$1"; }

echo
echo "PREFLIGHT: $SLUG"
echo "──────────────────────────────────────────────────────────────────"
echo "The honesty contract"

grep -qi 'name="robots"[^>]*noindex' "$FILE" \
  && pass "noindex is set" || fail "no noindex meta tag, this can compete with their real site"

grep -qi 'concept site' "$FILE" \
  && pass "labelled a concept site" || fail "not labelled a concept site anywhere"

grep -qi '<title>' "$FILE" && grep -i '<title>' "$FILE" | grep -qi 'concept site' \
  && pass "the title says concept site too" || warn "the <title> does not say concept site"

if grep -qE 'href="https?://(?!.*locallvrg)' "$FILE" 2>/dev/null || \
   grep -qE 'rel="nofollow noopener"' "$FILE"; then
  pass "links out to their real site"
else
  warn "no obvious link back to the company's own site"
fi

if grep -qoE '__[A-Z0-9_]+__' "$FILE"; then
  fail "unfilled template tokens still in the page: $(grep -oE '__[A-Z0-9_]+__' "$FILE" | sort -u | tr '\n' ' ')"
else
  pass "no leftover template tokens"
fi

echo
echo "The technical floor"

if grep -qE '(src|href)="/[^/]' "$FILE"; then
  fail "root-relative paths found, the folder is not portable"
else
  pass "all asset paths are relative"
fi

if grep -qiE 'fonts\.googleapis|fonts\.gstatic|cdnjs|unpkg|jsdelivr' "$FILE"; then
  fail "external font or CDN request, fonts must be self-hosted in $SLUG/assets/fonts/"
else
  pass "no third-party font or CDN requests"
fi

FONTS=$(find "$SLUG/assets/fonts" -name '*.woff2' 2>/dev/null | wc -l | tr -d ' ')
[ "$FONTS" -gt 0 ] && pass "$FONTS self-hosted font file(s)" || warn "no self-hosted fonts found"

if grep -qiE 'loading="lazy"' "$FILE"; then
  pass "lazy loading present"
else
  warn "no lazy loading, check anything below the fold"
fi

SIZE=$(wc -c < "$FILE" | tr -d ' ')
if [ "$SIZE" -lt 250000 ]; then pass "page is $((SIZE/1024))KB"; else warn "page is $((SIZE/1024))KB, getting heavy for one file"; fi

[ -f "$SLUG/NOTES.md" ] && pass "NOTES.md records the read and the angle" || warn "no NOTES.md, the next person will not know why this was built"

echo
echo "How it looks"

if [ "$MODE" = "--live" ]; then
  TARGET="https://demos.locallvrg.co/$SLUG/"
else
  TARGET="file://$(pwd)/$FILE"
fi

SCORE=$(node bin/design-probe.js --json "$TARGET" 2>/dev/null \
        | python3 -c "import sys,json;d=json.load(sys.stdin);print(d[0].get('designScore','?'))" 2>/dev/null)

if [ -z "$SCORE" ] || [ "$SCORE" = "?" ]; then
  warn "could not render $TARGET to score it"
else
  echo "  design score: $SCORE   (both existing demos score 4)"
  node bin/design-probe.js "$TARGET" 2>/dev/null | grep -E '^\s+\[\+' || true
  if [ "$SCORE" -le 12 ]; then pass "design floor cleared"
  else fail "design score $SCORE is above 12, fix the flagged items before sending"; fi
fi

echo
echo "──────────────────────────────────────────────────────────────────"
if [ "$FAIL" -eq 0 ]; then
  printf "\033[32mFloor cleared.\033[0m Now the part no script can check:\n"
else
  printf "\033[31m%s check(s) failed.\033[0m Fix those first, then:\n" "$FAIL"
fi

cat <<'QUESTIONS'

  1. What is this business sitting on that nobody can see right now?
     If you cannot answer in one sentence, the page has no reason to exist.

  2. Could this page belong to any other company in their trade?
     If yes, it is a template with their logo on it, and they will feel that.

  3. Is every claim on the page either theirs or listed in the placeholder
     column? Read the disclosure back against the body copy, line by line.

QUESTIONS

exit $FAIL

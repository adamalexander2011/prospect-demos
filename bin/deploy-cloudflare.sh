#!/usr/bin/env bash
# Publish the demo pages to Cloudflare Pages, leaving the reads behind.
#
#   ./bin/deploy-cloudflare.sh
#
# The repo is private because NOTES.md files are candid critiques of named
# businesses. This stages ONLY what should be served publicly: the demo pages
# and their assets. No NOTES.md, no WARM-NETWORK.md, no bin/, no prompts/.

set -euo pipefail
cd "$(dirname "$0")/.."
PROJECT="${PROJECT:-prospect-demos}"
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT

rsync -a --quiet \
  --exclude '.git' --exclude 'bin' --exclude 'prompts' --exclude '_template' \
  --exclude 'NOTES.md' --exclude 'WARM-NETWORK.md' --exclude 'PROSPECTING.md' \
  --exclude 'CLAUDE.md' --exclude 'README.md' --exclude '.gitignore' \
  ./ "$STAGE/"

echo "staged for deploy:"
find "$STAGE" -name index.html | sed "s|$STAGE|  |"
if find "$STAGE" \( -name 'NOTES.md' -o -name 'WARM-NETWORK.md' \) | grep -q .; then
  echo "ABORT: a read leaked into the deploy" >&2; exit 1
fi
echo "  (verified: no reads in the payload)"
echo

npx wrangler pages deploy "$STAGE" --project-name "$PROJECT" --commit-dirty=true

#!/bin/sh
# Renders tool/social-card.html to assets/social-card.jpg (1200x630), the
# og:image every page shares. Needs Google Chrome and macOS sips.
set -e
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=5000 --allow-file-access-from-files \
  --screenshot="$TMP/card.png" "file://$PWD/tool/social-card.html" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 88 "$TMP/card.png" --out assets/social-card.jpg >/dev/null
rm -rf "$TMP"
echo "wrote assets/social-card.jpg"

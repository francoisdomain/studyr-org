#!/usr/bin/env bash
# Copies the original images from the live WordPress site into assets/img/.
# Run once from the repo root (needs internet access to studyr.org):
#   ./scripts/fetch-assets.sh
set -euo pipefail

cd "$(dirname "$0")/.."
mkdir -p assets/img

BASE="https://studyr.org/wp-content/uploads/2022/12"

fetch() {
  echo "Downloading $2"
  curl -fsSL "$BASE/$1" -o "assets/img/$2"
}

fetch "sfmc2-copy.png"               "ampscript-vol1-cover-wide.png"
fetch "sfmc2-copy-2-1.png"           "ampscript-vol1-cover.png"
fetch "cropped-studyr_favicon.png"   "favicon.png"

echo "Done. Images saved in assets/img/"

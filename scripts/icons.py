"""The favicon set: the Square One mark itself, from the official vector.

28 Sept 2026 (Vern: "the icon should just be the logo"). Since 21 Sept the
favicon had been a reduction, an orange diamond on charcoal; on Chrome's
dark tab strip the charcoal disappeared and left an orange speck. The set is
now the official mark exactly as the logo file draws it: the white
trapezoid the facets sit on, the grey and pale facets, the copper diamond.
The white base is what keeps it legible on a dark tab strip (it becomes the
outline, as it does over a photograph); on a light strip it merges with the
tab and the facets carry the shape, as on the website's own white.

    pip install cairosvg pillow
    python3 scripts/icons.py

Source: public/images/S1_update_v2/logos/offical logos/Square One logo
(dark).svg, lettering dropped. Writes app/icon.svg, app/icon1.png (1024px,
transparent; keep it over ~8KB, see CLAUDE.md), app/apple-icon.png (180px
on white, since iOS fills transparency with black) and app/favicon.ico
(16/32/48, RGBA PNG frames).

The PNG is icon1.png, not icon.png: with app/icon.svg and app/icon.png side
by side, Next 16.1.6 (Turbopack) gave both routes one module id and served
the PNG at /icon.svg (seen 28 Sept 2026 in a clean local build). Different
base names keep the two routes apart.
"""
import io
import re
import struct
from pathlib import Path

import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public/images/S1_update_v2/logos/offical logos/Square One logo (dark).svg"

src = SOURCE.read_text()
# The mark is everything but the live lettering; it spans x 0–283.81 and
# y 0–146.688 of the logo's own coordinates. A square viewBox as wide as
# the mark, centred on it vertically.
mark = re.sub(r"<text\b.*?</text>", "", src, flags=re.S)
body = mark[mark.index(">", mark.index("<svg")) + 1 : mark.rindex("</svg>")]
body = re.sub(r'\s(?:id|data-name)="[^"]*"', "", body)
body = re.sub(r">\s+<", "><", body).strip()
W, H = 283.81, 146.688
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {-(W - H) / 2:.3f} {W} {W}" role="img" aria-label="Square One">'
    f"{body}</svg>\n"
)
(ROOT / "app/icon.svg").write_text(svg)


def raster(size: int) -> Image.Image:
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size)
    return Image.open(io.BytesIO(png)).convert("RGBA")


raster(1024).save(ROOT / "app/icon1.png", optimize=False, compress_level=6)

# The home-screen icon: the mark on white with a margin, no transparency.
tile = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
inner = raster(148)
tile.alpha_composite(inner, (16, 16))
tile.convert("RGB").save(ROOT / "app/apple-icon.png", optimize=False, compress_level=6)

# PNG-in-ICO, assembled by hand so each size is drawn at that size rather
# than resampled from the largest.
frames = []
for size in (16, 32, 48):
    buf = io.BytesIO()
    raster(size).save(buf, format="PNG")
    frames.append((size, buf.getvalue()))
header = struct.pack("<HHH", 0, 1, len(frames))
offset = 6 + 16 * len(frames)
entries, blobs = b"", b""
for size, blob in frames:
    entries += struct.pack("<BBBBHHII", size, size, 0, 0, 1, 32, len(blob), offset)
    blobs += blob
    offset += len(blob)
(ROOT / "app/favicon.ico").write_bytes(header + entries + blobs)
print("icon.svg", len(svg), "bytes")
for f in ("icon1.png", "apple-icon.png", "favicon.ico"):
    print(f, (ROOT / "app" / f).stat().st_size, "bytes")

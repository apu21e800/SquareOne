#!/usr/bin/env python3
"""
Photo normalisation for the 5 Sept 2026 photo pass. Three jobs, all
"improve only" — nothing is deleted, nothing is renamed:

  swap    replace a gallery tile with the same photograph at higher
          resolution (the studio's original), at the SAME path, so every
          reference keeps working.
  upright apply EXIF orientation and re-save, so a sideways photo stands up.
  scrub   strip metadata (GPS included) from photographs that carry it.

Every write: EXIF orientation applied, all metadata dropped, long edge
capped at 2400px, JPEG quality 85. Originals are copied to
public/images/_pre-photo-pass/ first, so any change can be undone.
"""
import shutil, sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BACKUP = PUB / "images" / "_pre-photo-pass"
CAP, Q = 2400, 85

GAL = "images/S1_update_v2/Old Square One Web Assets/Galleries"
FIO = "images/S1_update_v2/photos/Featured image options"

# (source of the better copy, path it replaces) — verified same photograph,
# perceptual hash distance 0, exactly twice the pixel dimensions.
SWAPS = [
    (f"{FIO}/StreetBond-Sports-Court-Coquitlam-BC-2.jpg",
     f"{GAL}/Schools & Sports Courts/Gallery/StreetBond  Sports Court, Coquitlam BC.jpg"),
    (f"{FIO}/StreetBond-Sports-Court-Evelyn-Heights-BC-2.jpg",
     f"{GAL}/Schools & Sports Courts/Gallery/StreetBond  Sports Court, Evelyn Heights BC.jpg"),
    (f"{FIO}/StreetBond-Sports-Court-Montessori-Victoria-BC-2.jpg",
     f"{GAL}/Schools & Sports Courts/Gallery/StreetBond  Sports Court, Montessori, Victoria BC.jpg"),
    (f"{FIO}/StreetPrint-—-Stamped-Asphalt-Arbutus-Middle-School-Saanich-BC-2.jpg",
     f"{GAL}/Schools & Sports Courts/Gallery/StreetPrint — Stamped Asphalt    Arbutus Middle School, Saanich BC.jpg"),
]

UPRIGHT = ["images/products/mmax/mmax-green-sharrow-bike-lane-close-01.jpg"]

SCRUB = [
    "images/blog/multimodal-connectivity-york-region/featured.jpg",
    "images/blog/safety-durability-transit-stations/featured.jpg",
]

def backup(rel: str):
    src = PUB / rel
    dst = BACKUP / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    if not dst.exists():
        shutil.copy2(src, dst)

def write(im: Image.Image, dest: Path):
    im = ImageOps.exif_transpose(im).convert("RGB")
    if max(im.size) > CAP:
        im.thumbnail((CAP, CAP), Image.LANCZOS)
    clean = Image.new(im.mode, im.size)     # a fresh image carries no metadata
    clean.putdata(list(im.getdata()))
    clean.save(dest, "JPEG", quality=Q, optimize=True, progressive=True)

def main(dry: bool):
    for src_rel, dst_rel in SWAPS:
        s, d = PUB / src_rel, PUB / dst_rel
        if not s.exists() or not d.exists():
            print(f"  SKIP (missing) {dst_rel}"); continue
        with Image.open(s) as a, Image.open(d) as b:
            if max(a.size) <= max(b.size):
                print(f"  SKIP (not larger) {dst_rel}"); continue
            print(f"  swap {b.size} -> {a.size}  {dst_rel.split('/')[-1]}")
            if dry: continue
            backup(dst_rel); write(a, d)

    for rel in UPRIGHT:
        p = PUB / rel
        with Image.open(p) as im:
            ex = im.getexif(); o = int(ex.get(274, 1)) if ex else 1
            if o in (0, 1):
                print(f"  SKIP (already upright) {rel}"); continue
            print(f"  upright (orientation {o}) {rel}")
            if dry: continue
            backup(rel); write(im, p)

    for rel in SCRUB:
        p = PUB / rel
        with Image.open(p) as im:
            ex = im.getexif()
            if not (ex and 34853 in ex):
                print(f"  SKIP (no GPS) {rel}"); continue
            print(f"  scrub GPS {rel}")
            if dry: continue
            backup(rel); write(im, p)

if __name__ == "__main__":
    main("--dry" in sys.argv)

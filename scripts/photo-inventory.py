#!/usr/bin/env python3
"""
Photo inventory for squareonepaving.ca — the photo-editing pass of 5 Sept 2026.

Walks public/images, records path/dimensions/bytes/sha256/phash for every
image the site can serve, then walks the source tree for every /images/...
path the code and content reference. Flags:

  exact       byte-identical files (same sha256)
  near        perceptual near-duplicates (phash Hamming distance <= 6)
  low         under 800px on the long edge   (rule 4: hide)
  mid         800-1199px on the long edge    (rule 4: sort after full-size)
  broken      referenced in code but not on disk
  orphan      on disk but referenced nowhere (informational only)

Nothing is modified. Output: JSON to the path given as argv[1].
"""
import hashlib, json, os, re, sys
from pathlib import Path
from PIL import Image, ImageOps
import imagehash

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
IMG_DIR = PUBLIC / "images"
EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
SRC_DIRS = ["app", "components", "lib", "content", "sanity", "scripts"]
SRC_EXT = {".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".mdx", ".json", ".css"}

def url_of(p: Path) -> str:
    return "/" + str(p.relative_to(PUBLIC)).replace(os.sep, "/")

def scan_dir(base: Path, label: str):
    out = []
    for p in sorted(base.rglob("*")):
        if not p.is_file() or p.suffix.lower() not in EXT:
            continue
        rec = {
            "path": str(p.relative_to(ROOT)),
            "url": url_of(p) if PUBLIC in p.parents or p.is_relative_to(PUBLIC) else None,
            "dir": str(p.parent.relative_to(base)),
            "name": p.name,
            "bytes": p.stat().st_size,
            "source": label,
        }
        try:
            with Image.open(p) as im:
                im = ImageOps.exif_transpose(im)          # report the displayed size
                rec["w"], rec["h"] = im.size
                rec["long"] = max(im.size)
                rec["mode"] = im.mode
                rec["phash"] = str(imagehash.phash(im.convert("RGB")))
            with Image.open(p) as im2:
                ex = im2.getexif()
                rec["exif_orientation"] = int(ex.get(274, 1)) if ex else 1
                rec["has_gps"] = bool(ex and 34853 in ex)
        except Exception as e:                            # unreadable = report, never guess
            rec["error"] = f"{type(e).__name__}: {e}"
            rec["w"] = rec["h"] = rec["long"] = 0
        rec["sha256"] = hashlib.sha256(p.read_bytes()).hexdigest()
        out.append(rec)
    return out

def references():
    """Every /images/... path the source tree mentions, with the files that mention it."""
    pat = re.compile(r"[\"'`\(]\s*(/images/[^\"'`\)\s]+)")
    refs = {}
    for d in SRC_DIRS:
        base = ROOT / d
        if not base.exists():
            continue
        for p in base.rglob("*"):
            if not p.is_file() or p.suffix.lower() not in SRC_EXT:
                continue
            try:
                text = p.read_text(encoding="utf-8", errors="ignore")
            except Exception:
                continue
            for m in pat.finditer(text):
                url = m.group(1).rstrip(",;")
                refs.setdefault(url, set()).add(str(p.relative_to(ROOT)))
    return {k: sorted(v) for k, v in refs.items()}

def unquote(u: str) -> str:
    from urllib.parse import unquote as uq
    return uq(u)

def main():
    out_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("/tmp/photo-inventory.json")
    site = scan_dir(IMG_DIR, "site")

    by_sha, by_url = {}, {}
    for r in site:
        by_sha.setdefault(r["sha256"], []).append(r["path"])
        by_url[unquote(r["url"])] = r

    exact = {k: v for k, v in by_sha.items() if len(v) > 1}

    # near-duplicates: phash distance <= 6, excluding exact matches
    buckets = {}
    for r in site:
        if r.get("phash"):
            buckets.setdefault(r["phash"], []).append(r)
    hashes = [(imagehash.hex_to_hash(h), h) for h in buckets]
    near = []
    for i in range(len(hashes)):
        for j in range(i + 1, len(hashes)):
            d = hashes[i][0] - hashes[j][0]
            if d <= 6:
                a = buckets[hashes[i][1]]
                b = buckets[hashes[j][1]]
                near.append({"distance": int(d),
                             "a": [x["path"] for x in a],
                             "b": [x["path"] for x in b]})
    # identical phash with different bytes = re-saves/recrops
    for h, group in buckets.items():
        if len(group) > 1:
            shas = {g["sha256"] for g in group}
            if len(shas) > 1:
                near.append({"distance": 0, "a": [g["path"] for g in group], "b": []})

    refs = references()
    broken = {u: files for u, files in refs.items() if unquote(u) not in by_url}
    referenced = {unquote(u) for u in refs}
    orphans = [r["path"] for r in site if unquote(r["url"]) not in referenced]

    low = [r["path"] for r in site if 0 < r["long"] < 800]
    mid = [r["path"] for r in site if 800 <= r["long"] < 1200]
    unreadable = [r["path"] for r in site if r.get("error")]
    sideways = [r["path"] for r in site if r.get("exif_orientation", 1) not in (0, 1)]
    gps = [r["path"] for r in site if r.get("has_gps")]

    data = {
        "counts": {
            "files": len(site), "bytes": sum(r["bytes"] for r in site),
            "exact_dup_groups": len(exact), "near_pairs": len(near),
            "low_under_800": len(low), "mid_800_1199": len(mid),
            "full_1200_plus": len(site) - len(low) - len(mid) - len(unreadable),
            "referenced_paths": len(refs), "broken_refs": len(broken),
            "orphans": len(orphans), "unreadable": len(unreadable),
            "sideways_exif": len(sideways), "with_gps": len(gps),
        },
        "files": site, "exact": exact, "near": near,
        "refs": refs, "broken": broken, "orphans": orphans,
        "low": low, "mid": mid, "unreadable": unreadable,
        "sideways": sideways, "gps": gps,
    }
    out_path.write_text(json.dumps(data, indent=1))
    c = data["counts"]
    print(json.dumps(c, indent=1))

if __name__ == "__main__":
    main()

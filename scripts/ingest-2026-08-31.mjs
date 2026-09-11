#!/usr/bin/env node
// scripts/ingest-2026-08-31.mjs -- First-Draft Pass image harvest.
// Location-named BC files only (canon: never guess a location).
// Sources: the repo legacy S1 library + the granted HUBSS studio folders.
// Same safety rail as add-images.mjs: EXIF rotation baked, metadata (incl
// GPS) stripped, longest edge 2400, JPEG q82, originals untouched.
// Run:  node scripts/ingest-2026-08-31.mjs [--group=driveways|apps|products]
import fs from "fs";
import path from "path";
import sharp from "sharp";

const HOME = process.env.HOME;
const HUB = path.join(HOME, "mnt", "02-HUBSS", "assets", "photos");
const Q1 = path.join(HUB, "_UPDATE_QUEUE", "HUBSS-Website-20260401T072145Z-1-001", "HUBSS-Website");
const Q2 = path.join(HUB, "_UPDATE_QUEUE", "HUBSS-Website-20260401T072145Z-1-002", "HUBSS-Website");
const LEG = path.join(process.cwd(), "public", "images", "S1_update_v2", "Old Square One Web Assets", "Galleries", "Driveways", "Gallery");
const LEGP = path.join(process.cwd(), "public", "images", "S1_update_v2", "photos", "Driveways");
const OUT = path.join(process.cwd(), "public", "images");

// [group, srcDir, substring-to-match, destSubdir, destName]
const M = [
 ["driveways", LEG, "Langley BC", "applications/driveways", "langley-ashlar-slate-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Decorative Driveway, Burnaby BC", "applications/driveways", "burnaby-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Maple Ridge BC", "applications/driveways", "maple-ridge-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Mill Bay", "applications/driveways", "mill-bay-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Offset Brick on Ashlar Slate, Victoria", "applications/driveways", "victoria-offset-brick-ashlar-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Offset Brick, Richmond", "applications/driveways", "richmond-offset-brick-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Offset Brick, Victoria", "applications/driveways", "victoria-offset-brick-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Sannich", "applications/driveways", "saanich-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Sooke", "applications/driveways", "sooke-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Decorative Driveway, Victoria BC", "applications/driveways", "victoria-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Decorative Driveway, West Saanich BC", "applications/driveways", "west-saanich-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "Decorative Driveway, North Saanich BC", "applications/driveways", "north-saanich-decorative-driveway-streetprint-01.jpg"],
 ["driveways", LEG, "West Vancouver BC", "applications/driveways", "west-vancouver-decorative-driveway-streetprint-02.jpg"],
 ["driveways", LEGP, "Ten Mile Point", "applications/driveways", "saanich-ten-mile-point-driveway-streetprint-01.jpg"],
 ["driveways", path.join(Q1, "applications", "townhomes"), "Tofino", "applications/private-driveways", "tofino-townhome-driveway-streetprint-01.jpg"],
 ["apps", path.join(Q2, "applications", "commercial-spaces"), "Kelowna Crosswalks 5 years", "applications/commercial-spaces", "kelowna-crosswalks-five-years-on-01.jpg"],
 ["apps", path.join(Q1, "products", "traffic-patterns"), "Gateway Casino Delta", "applications/commercial-spaces", "delta-gateway-casino-trafficpatterns-01.jpg"],
 ["apps", path.join(Q2, "products", "streetbond"), "Ralphs-Farm-Market", "applications/commercial-spaces", "langley-ralphs-farm-market-streetprint-01.jpg"],
 ["apps", path.join(Q1, "applications", "parking-lots"), "Hillside-Mall-Victoria", "applications/parking-lots", "victoria-hillside-mall-crosswalk-streetprint-01.jpg"],
 ["apps", path.join(Q2, "applications", "parks-paths"), "Sheffield Park Coquitlam", "applications/parks-paths", "coquitlam-sheffield-park-01.jpg"],
 ["apps", path.join(Q2, "applications", "parks-paths"), "Burnaby Union Street", "applications/parks-paths", "burnaby-union-street-path-01.jpg"],
 ["apps", path.join(Q2, "applications", "parks-paths"), "West Vancouver", "applications/parks-paths", "west-vancouver-park-path-01.jpg"],
 ["apps", path.join(Q1, "applications", "traffic-calming"), "Maridian-Roundabout-Surrey", "applications/roundabouts", "surrey-roundabout-streetbond-01.jpg"],
 ["apps", path.join(Q1, "applications", "traffic-calming"), "Traffic-Calming-Device-North-Vancouver", "applications/traffic-calming", "north-vancouver-traffic-calming-streetbond-01.jpg"],
 ["apps", path.join(Q2, "products", "streetbond"), "keswick-splash", "applications/splash-pads", "burnaby-keswick-splash-park-streetbond-01.jpg"],
 ["products", path.join(Q1, "products", "decomark"), "Evergreen-Line-Port-Moody", "products/decomark", "decomark-port-moody-evergreen-line-01.jpg"],
 ["products", path.join(Q1, "products", "decomark"), "Rutland-Park-Kelowna", "products/decomark", "decomark-kelowna-rutland-park-01.jpg"],
 ["products", path.join(Q1, "products", "decomark"), "Nemo-Port-Moody", "products/decomark", "decomark-port-moody-nemo-park-01.jpg"],
 ["products", path.join(Q1, "products", "decomark"), "Victoria-Harbour", "products/decomark", "decomark-victoria-harbour-01.jpg"],
 ["products", path.join(HUB, "DuraTherm-3-001", "DuraTherm"), "Maple Ridge Duratherm.JPG", "products/duratherm", "duratherm-maple-ridge-crosswalk-01.jpg"],
 ["products", path.join(Q1, "products", "duratherm"), "Maple-Ridge-BC-1", "products/duratherm", "duratherm-maple-ridge-crosswalk-02.jpg"],
 ["products", path.join(Q1, "products", "trafficpattens-xd"), "Parksville", "products/traffic-patterns-xd", "trafficpatternsxd-parksville-crosswalk-01.jpg"],
 ["products", path.join(Q2, "products", "trafficpattens-xd"), "Steveston", "products/traffic-patterns-xd", "trafficpatternsxd-richmond-steveston-crosswalk-01.jpg"],
 ["products", path.join(Q1, "products", "trafficpattens-xd"), "Walmart-Richmond", "products/traffic-patterns-xd", "trafficpatternsxd-richmond-retail-crosswalk-01.jpg"],
 ["products", path.join(Q1, "products", "premark"), "Green-Bike-Lane-North-Vancouver-BC-1", "products/premark", "premark-north-vancouver-green-bike-lane-01.jpg"],
];

const only = (process.argv.find(a => a.startsWith("--group=")) || "").split("=")[1];
let done = 0, skipped = 0, missing = 0;
for (const [group, dir, match, destSub, destName] of M) {
  if (only && group !== only) continue;
  const destDir = path.join(OUT, destSub);
  const dest = path.join(destDir, destName);
  if (fs.existsSync(dest)) { console.log("SKIP exists  " + destName); skipped++; continue; }
  let src = null;
  try {
    const names = fs.readdirSync(dir).filter(n => n.includes(match));
    if (names.length) src = path.join(dir, names[0]);
  } catch (e) { /* dir missing */ }
  if (!src) { console.log("MISSING      [" + match + "] in " + dir); missing++; continue; }
  fs.mkdirSync(destDir, { recursive: true });
  try {
    await sharp(src).rotate().resize(2400, 2400, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true }).toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log("OK " + String(kb).padStart(5) + "KB  " + destSub + "/" + destName);
    done++;
  } catch (e) { console.log("FAIL         " + destName + " :: " + e.message.slice(0, 80)); }
}
console.log("done=" + done + " skipped=" + skipped + " missing=" + missing);

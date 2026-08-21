import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  AVAILABILITY,
  AVAILABILITY_ORDER,
  assertAvailabilityContent
} from "../lib/prastuti/preview-content.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const adapterHashes = {
  "parktek-colours.css": "ca4ef323eca0bf529de2c5b0b530f2928aaed89847c902cbb06b1b880f850a50",
  "parktek-focus.css": "7f374b4b67f2872a3ea672ae13a41b1425948ebfd91df8a670ebae7c72a05c1a",
  "tailwind-colours.cjs": "e93348fa17d5fae1490759cf0409f07d868b653d6b79a1114b08e1d8abc476b5",
  "tailwind-focus.cjs": "af2d2f887592a3c79a9c86a185b190be4eadac3ca8df0b9ab48a648f87692cf3"
};

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const target = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(target) : [target];
    })
  );
  return nested.flat();
}

test("availability content is exhaustive and future states cannot be live", () => {
  assert.equal(assertAvailabilityContent(), true);
  assert.deepEqual(AVAILABILITY_ORDER, ["live", "pilot", "launching", "comingSoon"]);
  assert.equal(AVAILABILITY.live.heading, "Available Today — Residential Access");
  assert.equal(AVAILABILITY.pilot.heading, "Pilot — ANPR and Parking Intelligence");
  assert.equal(
    AVAILABILITY.launching.heading,
    "Launching — Commercial Parking Operations"
  );
  assert.equal(AVAILABILITY.comingSoon.heading, "Coming Next — 2–4 months");

  for (const key of ["pilot", "launching", "comingSoon"]) {
    assert.notEqual(AVAILABILITY[key].badge.toLowerCase(), "live");
  }
});

test("generated release 0.2.0 adapters retain their canonical hashes", async () => {
  for (const [name, expected] of Object.entries(adapterHashes)) {
    const bytes = await readFile(
      path.join(repoRoot, "design-system", "generated", "prastuti", name)
    );
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected, name);
  }
});

test("new Phase A source has no raw colour literals or legacy yellow token", async () => {
  const roots = [
    path.join(repoRoot, "app", "preview"),
    path.join(repoRoot, "components", "prastuti"),
    path.join(repoRoot, "lib", "prastuti")
  ];
  const files = (await Promise.all(roots.map(listFiles))).flat();
  const rawColour =
    /#[\da-f]{3,8}\b|(?:rgb|hsl)a?\s*\(|(?:bg|text|border)-(?:white|black)\b|parktek-yellow/i;

  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.doesNotMatch(source, rawColour, path.relative(repoRoot, file));
  }
});

test("semantic icon registry uses efficient Phosphor SSR imports only", async () => {
  const source = await readFile(
    path.join(repoRoot, "components", "prastuti", "icons.jsx"),
    "utf8"
  );

  assert.match(source, /@phosphor-icons\/react\/dist\/ssr\//);
  assert.doesNotMatch(source, /lucide-react|import\s+\*\s+as/);
  assert.match(source, /const ICON_REGISTRY = Object\.freeze/);
});

test("production landing route remains connected only to HomePage", async () => {
  const source = await readFile(path.join(repoRoot, "app", "page.js"), "utf8");
  assert.match(source, /components\/home\/home-page/);
  assert.doesNotMatch(source, /prastuti\/preview|preview\/prastuti/);
});

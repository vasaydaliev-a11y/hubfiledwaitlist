#!/usr/bin/env node

/**
 * Static sitemap.xml generator for HUBFIELD.
 *
 * Scans app/ and components/ directories for .ts/.tsx files,
 * uses their mtime as lastModified, and writes public/sitemap.xml.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *   npm run sitemap
 */

import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SITE_URL = "https://hubfield.uz";
const OUTPUT = join(ROOT, "public", "sitemap.xml");

// ── Section registry ────────────────────────────────────────────
// Each entry maps to an anchor section on the SPA.
// Add new sections here when the page grows.

const sections = [
  { path: "",              freq: "weekly",  priority: 1.0, dirs: ["app"] },
  { path: "#features",     freq: "monthly", priority: 0.9, dirs: ["components"] },
  { path: "#pricing",      freq: "monthly", priority: 0.9, dirs: ["components"] },
  { path: "#demo",         freq: "monthly", priority: 0.8, dirs: ["components"] },
  { path: "#faq",          freq: "monthly", priority: 0.8, dirs: ["components"] },
  { path: "#testimonials", freq: "monthly", priority: 0.7, dirs: ["components"] },
  { path: "#howitworks",   freq: "monthly", priority: 0.7, dirs: ["components"] },
  { path: "#comparison",   freq: "monthly", priority: 0.7, dirs: ["components"] },
];

// ── Helpers ─────────────────────────────────────────────────────

function getLatestMtime(dir) {
  const absDir = join(ROOT, dir);
  let latest = 0;

  try {
    const files = readdirSync(absDir, { recursive: true });
    for (const file of files) {
      const f = String(file);
      if (!f.endsWith(".tsx") && !f.endsWith(".ts")) continue;
      try {
        const ms = statSync(join(absDir, f)).mtimeMs;
        if (ms > latest) latest = ms;
      } catch { /* skip */ }
    }
  } catch { /* dir missing */ }

  return latest > 0 ? new Date(latest) : new Date();
}

function toW3CDate(date) {
  return date.toISOString().split("T")[0];
}

function escapeXml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ── Build XML ───────────────────────────────────────────────────

const mtimeCache = {};

function getMtime(dirs) {
  const key = dirs.join(",");
  if (!mtimeCache[key]) {
    let latest = new Date(0);
    for (const d of dirs) {
      const t = getLatestMtime(d);
      if (t > latest) latest = t;
    }
    mtimeCache[key] = latest;
  }
  return mtimeCache[key];
}

function buildUrlEntry(section) {
  const loc = section.path
    ? `${SITE_URL}/${section.path}`
    : SITE_URL;

  const lastmod = toW3CDate(getMtime(section.dirs));

  let entry = `  <url>\n`;
  entry += `    <loc>${escapeXml(loc)}</loc>\n`;
  entry += `    <lastmod>${lastmod}</lastmod>\n`;
  entry += `    <changefreq>${section.freq}</changefreq>\n`;
  entry += `    <priority>${section.priority.toFixed(1)}</priority>\n`;

  if (section.path === "") {
    entry += `    <image:image>\n`;
    entry += `      <image:loc>${SITE_URL}/og-image.png</image:loc>\n`;
    entry += `      <image:title>HUBFIELD — Unified AI API Platform</image:title>\n`;
    entry += `    </image:image>\n`;
  }

  entry += `  </url>`;
  return entry;
}

function generateSitemap() {
  const urls = sections.map(buildUrlEntry).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}
</urlset>
`;

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, xml, "utf-8");

  const count = sections.length;
  const size = Buffer.byteLength(xml, "utf-8");
  console.log(`\x1b[32m✓\x1b[0m sitemap.xml generated → public/sitemap.xml`);
  console.log(`  ${count} URLs · ${size} bytes · ${new Date().toLocaleTimeString()}`);
}

generateSitemap();

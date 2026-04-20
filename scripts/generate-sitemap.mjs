#!/usr/bin/env node

/**
 * Static sitemap.xml + robots.txt generator for HUBFIELD.
 *
 * Scans app/ and components/ directories for .ts/.tsx files,
 * uses their mtime as lastModified, and writes:
 *   - public/sitemap.xml
 *   - public/robots.txt
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
const PUBLIC_DIR = join(ROOT, "public");
const SITEMAP_OUT = join(PUBLIC_DIR, "sitemap.xml");
const ROBOTS_OUT = join(PUBLIC_DIR, "robots.txt");

// ── Page registry ───────────────────────────────────────────────
// Maps every indexable page/section to its URL path.

const pages = [
  { path: "",              label: "Home",         freq: "weekly",  priority: 1.0, dirs: ["app"] },
  { path: "#features",     label: "Features",     freq: "monthly", priority: 0.9, dirs: ["components"] },
  { path: "#pricing",      label: "Pricing",      freq: "monthly", priority: 0.9, dirs: ["components"] },
  { path: "#demo",         label: "Demo",         freq: "monthly", priority: 0.8, dirs: ["components"] },
  { path: "#faq",          label: "FAQ",          freq: "monthly", priority: 0.8, dirs: ["components"] },
  { path: "#testimonials", label: "Testimonials", freq: "monthly", priority: 0.7, dirs: ["components"] },
  { path: "#howitworks",   label: "How It Works", freq: "monthly", priority: 0.7, dirs: ["components"] },
  { path: "#comparison",   label: "Comparison",   freq: "monthly", priority: 0.7, dirs: ["components"] },
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

// ── Sitemap XML ─────────────────────────────────────────────────

function buildUrlEntry(page) {
  const loc = page.path ? `${SITE_URL}/${page.path}` : SITE_URL;
  const lastmod = toW3CDate(getMtime(page.dirs));

  let entry = `  <!-- ${page.label} -->\n`;
  entry += `  <url>\n`;
  entry += `    <loc>${escapeXml(loc)}</loc>\n`;
  entry += `    <lastmod>${lastmod}</lastmod>\n`;
  entry += `    <changefreq>${page.freq}</changefreq>\n`;
  entry += `    <priority>${page.priority.toFixed(1)}</priority>\n`;

  if (page.path === "") {
    entry += `    <image:image>\n`;
    entry += `      <image:loc>${SITE_URL}/og-image.png</image:loc>\n`;
    entry += `      <image:title>HUBFIELD — Unified AI API Platform</image:title>\n`;
    entry += `    </image:image>\n`;
  }

  entry += `  </url>`;
  return entry;
}

function generateSitemap() {
  const urls = pages.map(buildUrlEntry).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}
</urlset>
`;

  writeFileSync(SITEMAP_OUT, xml, "utf-8");

  const count = pages.length;
  const size = Buffer.byteLength(xml, "utf-8");
  console.log(`\x1b[32m✓\x1b[0m sitemap.xml → public/sitemap.xml (${count} URLs, ${size} bytes)`);
}

// ── Robots.txt ──────────────────────────────────────────────────

function generateRobots() {
  const today = toW3CDate(new Date());

  const robots = `# robots.txt for ${SITE_URL}
# Generated: ${today}

# Allow all standard crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# Block AI training crawlers
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /

# Sitemap
Sitemap: ${SITE_URL}/sitemap.xml

# Canonical host
Host: ${SITE_URL}
`;

  writeFileSync(ROBOTS_OUT, robots, "utf-8");

  const size = Buffer.byteLength(robots, "utf-8");
  console.log(`\x1b[32m✓\x1b[0m robots.txt → public/robots.txt (${size} bytes)`);
}

// ── Run ─────────────────────────────────────────────────────────

mkdirSync(PUBLIC_DIR, { recursive: true });
generateSitemap();
generateRobots();
console.log(`  ${new Date().toLocaleTimeString()}`);

import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "fs";
import { join } from "path";

function getLatestModified(dir: string): Date {
  try {
    const files = readdirSync(dir, { recursive: true }) as string[];
    let latest = 0;

    for (const file of files) {
      if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
      try {
        const mtime = statSync(join(dir, file)).mtimeMs;
        if (mtime > latest) latest = mtime;
      } catch {
        /* skip unreadable files */
      }
    }

    return latest > 0 ? new Date(latest) : new Date();
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hubfield.uz";

  const appDir = join(process.cwd(), "app");
  const componentsDir = join(process.cwd(), "components");

  const pageModified = getLatestModified(appDir);
  const componentsModified = getLatestModified(componentsDir);

  const sections: {
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
    modified: Date;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0, modified: pageModified },
    { path: "#features", changeFrequency: "monthly", priority: 0.9, modified: componentsModified },
    { path: "#pricing", changeFrequency: "monthly", priority: 0.9, modified: componentsModified },
    { path: "#demo", changeFrequency: "monthly", priority: 0.8, modified: componentsModified },
    { path: "#faq", changeFrequency: "monthly", priority: 0.8, modified: componentsModified },
    { path: "#testimonials", changeFrequency: "monthly", priority: 0.7, modified: componentsModified },
    { path: "#howitworks", changeFrequency: "monthly", priority: 0.7, modified: componentsModified },
    { path: "#comparison", changeFrequency: "monthly", priority: 0.7, modified: componentsModified },
  ];

  return sections.map((section) => ({
    url: section.path ? `${baseUrl}/${section.path}` : baseUrl,
    lastModified: section.modified,
    changeFrequency: section.changeFrequency,
    priority: section.priority,
    images: section.path === "" ? [`${baseUrl}/og-image.png`] : undefined,
  }));
}

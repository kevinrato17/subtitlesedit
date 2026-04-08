const fs = require("fs");
const path = require("path");

function getBlogSlugs() {
  const dir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://subtitlesedit.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: "public",
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/api/*"],
  async additionalPaths() {
    const slugs = getBlogSlugs();
    return slugs.map((slug) => ({
      loc: `/blog/${slug}`,
      changefreq: "monthly",
      priority: 0.65,
    }));
  },
};

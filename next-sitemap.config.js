/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://subtitlesedit.com",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: "public",
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/api/*"],
};

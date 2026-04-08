import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) {
    return false;
  }
  return true;
}

export function getPostFilenames() {
  if (!ensurePostsDir()) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getPostSlugs() {
  return getPostFilenames().map((f) => f.replace(/\.mdx?$/, ""));
}

/**
 * @param {string} slug - without extension
 * @returns {{ slug: string, frontMatter: Record<string, unknown>, content: string } | null}
 */
export function getPostBySlug(slug) {
  if (!ensurePostsDir()) return null;
  for (const ext of ["mdx", "md"]) {
    const fullPath = path.join(postsDirectory, `${slug}.${ext}`);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      return { slug, frontMatter: data, content };
    }
  }
  return null;
}

/**
 * @returns {Array<{ slug: string, title: string, date: string, description: string }>}
 */
export function getAllPostsMeta() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const title =
        typeof post.frontMatter.title === "string"
          ? post.frontMatter.title
          : slug;
      const date =
        typeof post.frontMatter.date === "string"
          ? post.frontMatter.date
          : "";
      const description =
        typeof post.frontMatter.description === "string"
          ? post.frontMatter.description
          : "";
      return { slug, title, date, description };
    })
    .filter(Boolean);

  posts.sort((a, b) => {
    const da = Date.parse(a.date) || 0;
    const db = Date.parse(b.date) || 0;
    return db - da;
  });

  return posts;
}

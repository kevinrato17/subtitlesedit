import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import { getAllPostsMeta } from "@/lib/posts";

const cardClass =
  "group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-[box-shadow,border-color] hover:border-[#0ea5e9]/35 hover:shadow-md";

function formatDate(iso) {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(t));
}

export default function BlogIndex({ posts }) {
  return (
    <Layout>
      <Head>
        <title>Blog | Subtitles Edit</title>
        <meta
          name="description"
          content="Articles and guides about SRT and VTT subtitles, editing tips, and updates from Subtitles Edit."
        />
        <link rel="canonical" href="https://subtitlesedit.com/blog/" />
      </Head>

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article className="px-4 pb-16 pt-10 sm:px-6 lg:px-[3rem]">
            <header className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight text-[#0ea5e9] md:text-4xl">
                Blog
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-[#334155]">
                Guides and updates for working with subtitles in{" "}
                <strong className="font-semibold text-[#1e293b]">SRT</strong> and{" "}
                <strong className="font-semibold text-[#1e293b]">WebVTT</strong>{" "}
                formats.
              </p>
            </header>

            <ul className="mx-auto mt-12 max-w-3xl list-none space-y-5 p-0">
              {posts.length === 0 ? (
                <li className="rounded-2xl border border-dashed border-gray-300 bg-[#f8fafc] px-6 py-10 text-center text-[#64748b]">
                  No posts yet. Add Markdown or MDX files to the{" "}
                  <code className="rounded bg-[#ECEFF3] px-1.5 py-0.5 text-sm text-[#111827]">
                    /posts
                  </code>{" "}
                  folder.
                </li>
              ) : (
                posts.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className={cardClass}>
                      <h2 className="text-xl font-semibold text-[#0284c7] transition-colors group-hover:text-[#0ea5e9]">
                        {post.title}
                      </h2>
                      {post.date ? (
                        <time
                          dateTime={post.date}
                          className="mt-2 block text-sm text-[#64748b]"
                        >
                          {formatDate(post.date)}
                        </time>
                      ) : null}
                      {post.description ? (
                        <p className="mt-3 text-[#334155] leading-relaxed">
                          {post.description}
                        </p>
                      ) : null}
                      <span className="mt-4 inline-block text-sm font-medium text-[#0ea5e9]">
                        Read more →
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </article>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPostsMeta();
  return { props: { posts } };
}

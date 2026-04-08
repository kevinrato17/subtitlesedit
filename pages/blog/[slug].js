import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Layout from "@/components/Layout";
import { blogMdxComponents } from "@/lib/mdxComponents";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

function formatDate(iso) {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return String(iso);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(t));
}

export default function BlogPost({ source, title, date, description, slug }) {
  const pageTitle = `${title} | Subtitles Edit Blog`;

  return (
    <Layout>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link
          rel="canonical"
          href={`https://subtitlesedit.com/blog/${slug}/`}
        />
      </Head>

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article className="px-4 pb-16 pt-10 sm:px-6 lg:px-[3rem]">
            <div className="mx-auto max-w-3xl">
              <p className="mb-4">
                <Link
                  href="/blog"
                  className="text-sm font-medium text-[#0ea5e9] underline-offset-2 hover:underline"
                >
                  ← Back to blog
                </Link>
              </p>
              <header className="border-b border-gray-100 pb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#0ea5e9] md:text-4xl">
                  {title}
                </h1>
                {date ? (
                  <time
                    dateTime={date}
                    className="mt-3 block text-sm text-[#64748b]"
                  >
                    {formatDate(date)}
                  </time>
                ) : null}
                {description ? (
                  <p className="mt-4 text-lg leading-relaxed text-[#334155]">
                    {description}
                  </p>
                ) : null}
              </header>
              <div className="prose-blog pt-10">
                <MDXRemote {...source} components={blogMdxComponents} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { notFound: true };
  }

  const title =
    typeof post.frontMatter.title === "string"
      ? post.frontMatter.title
      : params.slug;
  const date =
    typeof post.frontMatter.date === "string" ? post.frontMatter.date : "";
  const description =
    typeof post.frontMatter.description === "string"
      ? post.frontMatter.description
      : "";

  const source = await serialize(post.content);

  return {
    props: {
      source,
      title,
      date,
      description,
      slug: params.slug,
    },
  };
}

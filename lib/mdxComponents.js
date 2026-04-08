const linkClass =
  "text-[#0ea5e9] underline underline-offset-2 transition-colors hover:text-[#0284c7]";

/** @type {import('mdx/types').MDXComponents} */
export const blogMdxComponents = {
  h1: (props) => (
    <h1
      className="mt-2 text-3xl font-bold tracking-tight text-[#0ea5e9] md:text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 text-2xl font-semibold text-[#0284c7] md:text-[1.75rem]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-xl font-semibold text-[#0ea5e9]"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 text-[#334155] leading-relaxed" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mb-4 list-disc space-y-2 pl-6 text-[#334155] leading-relaxed"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mb-4 list-decimal space-y-2 pl-6 text-[#334155] leading-relaxed"
      {...props}
    />
  ),
  li: (props) => <li className="pl-1" {...props} />,
  a: (props) => (
    <a className={linkClass} rel="noopener noreferrer" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-[#0ea5e9]/40 pl-4 text-[#475569] italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-[#ECEFF3] px-1.5 py-0.5 text-sm text-[#111827]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mb-6 overflow-x-auto rounded-xl border border-gray-200 bg-[#f8fafc] p-4 text-sm text-[#1e293b]"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-gray-200" {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-[#1e293b]" {...props} />
  ),
};

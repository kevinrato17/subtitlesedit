import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import Layout from "@/components/Layout";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const ol =
  "mb-4 list-decimal pl-5 text-[#334155] space-y-2 [&_p]:mb-0 [&_li>p]:mb-0";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/SRT-to-VTT-Converter-1-768x403.webp";

const rankMathSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://subtitlesedit.com/#organization",
      name: "Subtitlesedit.com",
      url: "https://subtitlesedit.com",
      email: "support@subtitlesedit.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://subtitlesedit.com/#logo",
        url: "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp",
        contentUrl:
          "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp",
        caption: "https://subtitlesedit.com",
        inLanguage: "en-US",
        width: "500",
        height: "500",
      },
      description:
        "SubtitlesEdit.com is a free, browser-based toolkit for creating, editing, and perfecting subtitle and caption files. We help video creators, YouTubers, educators, translators, and media teams easily convert, merge, split, sync, and fix subtitles online — no software installation or sign-up required.\n\nOur simple, privacy-friendly tools include SRT to VTT converters, subtitle mergers, splitters, time shifters, and overlap fixers that work instantly right in your browser. Whether you need to convert SRT to WebVTT, resync subtitles, or fix overlapping cues, Subtitles Edit makes it quick and effortless.\n\nTrusted by content creators worldwide, we focus on speed, accuracy, and simplicity, helping you make every subtitle perfectly timed and platform-ready.",
    },
    {
      "@type": "WebSite",
      "@id": "https://subtitlesedit.com/#website",
      url: "https://subtitlesedit.com",
      name: "https://subtitlesedit.com",
      alternateName: "Subtitles Edit",
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "ImageObject",
      "@id": OG_IMG,
      url: OG_IMG,
      width: "200",
      height: "200",
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: "1",
          item: { "@id": "https://subtitlesedit.com", name: "Home" },
        },
        {
          "@type": "ListItem",
          position: "2",
          item: {
            "@id": "https://subtitlesedit.com/srt-to-vtt-converter/",
            name: "SRT to VTT Converter – Free Online Tool to Convert SRT to WebVTT Files",
          },
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#webpage",
      url: "https://subtitlesedit.com/srt-to-vtt-converter/",
      name: "SRT to VTT Converter – Fast, Accurate & 100% Free Online Tool",
      datePublished: "2025-11-03T22:39:11+00:00",
      dateModified: "2025-11-29T13:23:48+00:00",
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": OG_IMG },
      inLanguage: "en-US",
      breadcrumb: {
        "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#breadcrumb",
      },
    },
    {
      "@type": "Person",
      "@id": "https://subtitlesedit.com/author/kevinrato17gmail-com/",
      name: "Subtitles Edit",
      url: "https://subtitlesedit.com/author/kevinrato17gmail-com/",
      image: {
        "@type": "ImageObject",
        "@id":
          "https://secure.gravatar.com/avatar/dadac46feb548479fffced65ed9edb7cba49be5576172058b3b522c2bf0267b6?s=96&d=mm&r=g",
        url: "https://secure.gravatar.com/avatar/dadac46feb548479fffced65ed9edb7cba49be5576172058b3b522c2bf0267b6?s=96&d=mm&r=g",
        caption: "Subtitles Edit",
        inLanguage: "en-US",
      },
      sameAs: ["http://subtitlesedit.com"],
      worksFor: { "@id": "https://subtitlesedit.com/#organization" },
    },
    {
      "@type": "Article",
      headline: "SRT to VTT Converter – Fast, Accurate & 100% Free Online Tool",
      keywords: "SRT to VTT converter",
      datePublished: "2025-11-03T22:39:11+00:00",
      dateModified: "2025-11-29T13:23:48+00:00",
      author: {
        "@id": "https://subtitlesedit.com/author/kevinrato17gmail-com/",
        name: "Subtitles Edit",
      },
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      description:
        "Free SRT to VTT converter that\u2019s fast, accurate, and secure. Convert subtitle files instantly online\u2014perfect for YouTubers, editors, and content creators.",
      name: "SRT to VTT Converter – Fast, Accurate & 100% Free Online Tool",
      "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#richSnippet",
      isPartOf: {
        "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#webpage",
      },
      image: { "@id": OG_IMG },
      inLanguage: "en-US",
      mainEntityOfPage: {
        "@id": "https://subtitlesedit.com/srt-to-vtt-converter/#webpage",
      },
    },
  ],
};

function CheckIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 shrink-0 fill-[#0ea5e9]"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 shrink-0 fill-[#046bd2]"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
    </svg>
  );
}

function ConverterTool() {
  return (
    <div
      className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      id="se3"
    >
      <div className="mb-2 flex flex-wrap items-center justify-start gap-3">
        <div>
          <label
            htmlFor="se3-font"
            className="mr-1 text-xs text-[#555555]"
          >
            Font size
          </label>
          <select
            id="se3-font"
            defaultValue="16"
            className="rounded border border-gray-300 px-1.5 py-1 text-sm"
          >
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>20</option>
          </select>
          <span className="ml-1 text-xs text-[#777777]">px</span>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-3">
        <div className="flex flex-wrap gap-3">
          <div className="min-w-[300px] flex-1 basis-[420px]">
            <div className="my-1 font-semibold text-[#111827]">
              Paste SRT or choose a file
            </div>
            <input
              id="se3-file"
              type="file"
              accept=".srt,.vtt,text/plain"
              className="my-1 mb-2"
            />
            <textarea
              id="se3-in"
              placeholder="Paste SRT or VTT here..."
              className="min-h-[220px] w-full rounded-[10px] border border-gray-300 p-2 font-mono text-base leading-snug"
            />
            <div className="mt-1.5 text-xs text-[#666666]">
              Accepted: <b>.srt</b> or <b>.vtt</b>. Output will be below.
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" id="se3-convert" className="se-btn">
                Convert
              </button>
              <button type="button" id="se3-clear" className="se-btn">
                Clear
              </button>
            </div>
          </div>

          <div className="min-w-[300px] flex-1 basis-[420px]">
            <div className="my-1 font-semibold text-[#111827]">
              Converted Output (VTT)
            </div>
            <textarea
              id="se3-out"
              placeholder="Output will appear here..."
              readOnly
              className="min-h-[220px] w-full rounded-[10px] border border-gray-300 bg-white p-2 font-mono text-base leading-snug"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" id="se3-copy" className="se-btn">
                Copy
              </button>
              <button type="button" id="se3-download" className="se-btn">
                Download .vtt
              </button>
            </div>
            <div
              id="se3-status"
              className="mt-1.5 text-[0.95rem] text-[#555555]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const faqRows = [
  {
    id: "e-n-accordion-item-1280",
    open: true,
    q: " How can I convert SRT to VTT online for free? ",
    body: (
      <p>
        You can upload or paste your SRT file into the SRT to VTT converter,
        click “Convert,” and download your WebVTT file instantly. The entire
        process is free and runs in your browser.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1281",
    q: " Is this SRT to VTT converter safe and private? ",
    body: (
      <p>
        Yes. All conversions are done locally in your browser, so your subtitle
        file never leaves your device.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1282",
    q: " Do I need to install any software to convert SRT to WebVTT? ",
    body: (
      <p>
        No installation is required. Everything works directly in your browser
        without plugins or downloads.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1283",
    q: " Can I convert multiple SRT files to VTT at once? ",
    body: (
      <p>
        You can do this by merging subtitles first using the Subtitle Merger
        tool and convert the merged file afterward.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1284",
    q: " What is the difference between SRT and WebVTT? ",
    body: (
      <p>
        SRT uses commas for milliseconds and offers basic formatting. WebVTT
        uses dots, supports styling, metadata, and is required by HTML5 video
        players.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1285",
    q: " Why do some video platforms require VTT instead of SRT? ",
    body: (
      <p>
        WebVTT follows the HTML5 standard and supports better formatting and
        browser compatibility, making it the preferred choice for modern
        players.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1286",
    q: " Can I convert VTT back to SRT? ",
    body: (
      <p>
        Yes, you can use the VTT to SRT Converter tool to reverse the format
        conversion.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1287",
    q: " Does this converter keep all subtitle text exactly the same? ",
    body: (
      <p>
        Yes. Only the formatting and timestamps change. Your subtitle text
        remains untouched.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1288",
    q: " Does the converter fix timing errors automatically? ",
    body: (
      <p>
        The SRT to VTT Converter only adjusts timestamps to VTT format. To fix
        timing delays, use the Subtitle Time Shifter tool.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1289",
    q: " Are WebVTT files compatible with YouTube? ",
    body: (
      <p>
        Yes. YouTube accepts both SRT and VTT, but VTT offers better styling and
        browser compatibility.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12810",
    q: " Will this converter work offline? ",
    body: (
      <p>
        Yes. Once the page has loaded, the tool works fully offline because it
        processes everything in your browser.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12811",
    q: " Can I convert subtitles created in Adobe Premiere or DaVinci Resolve? ",
    body: (
      <p>
        Yes, as long as they are exported as SRT files. The converter will
        transform them into WebVTT correctly.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12812",
    q: " Why does my VTT file need a “WEBVTT” header? ",
    body: (
      <p>
        This header is required by the WebVTT specification and ensures
        compatibility with HTML5 players.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12813",
    q: " Can this tool convert SRT captions to VTT for websites? ",
    body: (
      <p>
        Yes. Web developers commonly use this converter to prepare VTT files for
        video players, streaming pages, and e-learning platforms.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12814",
    q: " What should I do if the converted VTT does not load in my player ",
    body: (
      <p>
        Make sure the file extension is .vtt and check that your video player
        supports WebVTT.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12815",
    q: " Does this tool support emojis, Unicode, and non-English subtitles? ",
    body: <p>Yes. All Unicode characters are fully supported.</p>,
  },
  {
    id: "e-n-accordion-item-12816",
    q: " Can I convert SubRip subtitles from different languages? ",
    body: (
      <p>
        Absolutely. As long as the file is in SRT format, the converter will
        handle any language.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-12817",
    q: " What other subtitle tools does SubtitlesEdit.com offer? ",
    body: (
      <p>
        You can merge subtitles, split subtitles, fix overlapping cues, shift
        timing, and edit subtitle format type using the full suite of tools
        available on the site.
      </p>
    ),
  },
];

function FaqAccordion() {
  const itemTitle =
    "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";

  return (
    <div
      className="divide-y divide-gray-100"
      aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
    >
      {faqRows.map((row) => (
        <details key={row.id} id={row.id} className="group" open={row.open}>
          <summary className={itemTitle}>
            <span>{row.q}</span>
            <span className="shrink-0 text-[#046bd2]">
              <span className="hidden group-open:inline">−</span>
              <span className="inline group-open:hidden">+</span>
            </span>
          </summary>
          <div className="pb-4 pl-1 text-[#334155] leading-relaxed">
            {row.body}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function SrtToVttConverterPage() {
  return (
    <Layout>
      <Head>
        <title>SRT to VTT Converter – Free Online Tool</title>
        <meta
          name="description"
          content={
            "Free SRT to VTT converter that\u2019s fast, accurate, and secure. Convert subtitle files instantly online\u2014perfect for YouTubers, editors, and content creators."
          }
        />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link
          rel="canonical"
          href="https://subtitlesedit.com/srt-to-vtt-converter/"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="SRT to VTT Converter – Fast, Accurate & 100% Free Online Tool"
        />
        <meta
          property="og:description"
          content={
            "Free SRT to VTT converter that\u2019s fast, accurate, and secure. Convert subtitle files instantly online\u2014perfect for YouTubers, editors, and content creators."
          }
        />
        <meta
          property="og:url"
          content="https://subtitlesedit.com/srt-to-vtt-converter/"
        />
        <meta property="og:site_name" content="https://subtitlesedit.com" />
        <meta property="og:updated_time" content="2025-11-29T13:23:48+00:00" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:secure_url" content={OG_IMG} />
        <meta property="og:image:alt" content="SRT to VTT converter" />
        <meta
          property="article:published_time"
          content="2025-11-03T22:39:11+00:00"
        />
        <meta
          property="article:modified_time"
          content="2025-11-29T13:23:48+00:00"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="SRT to VTT Converter – Fast, Accurate & 100% Free Online Tool"
        />
        <meta
          name="twitter:description"
          content={
            "Free SRT to VTT converter that\u2019s fast, accurate, and secure. Convert subtitle files instantly online\u2014perfect for YouTubers, editors, and content creators."
          }
        />
        <meta name="twitter:image" content={OG_IMG} />
        <meta name="twitter:label1" content="Time to read" />
        <meta name="twitter:data1" content="6 minutes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rankMathSchema),
          }}
        />
      </Head>

      <Script
        src="/wp-content/uploads/tools/extras/safe-converter.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-15"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1
                className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                itemProp="headline"
              >
                SRT to VTT Converter – Free Online Tool to Convert SRT to WebVTT
                Files
              </h1>
            </header>

            <div className="entry-content clear px-0" itemProp="text">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <ConverterTool />
                <div className="mb-10 overflow-hidden rounded-lg">
                  <Image
                    src={OG_IMG}
                    alt="SRT to VTT converter"
                    width={768}
                    height={403}
                    className="h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                  />
                </div>
              </div>

              <div className={`${section} entry-content`}>
                <h2 className={h2}>
                  What Does the SRT to VTT Converter Do and Who Is It For
                </h2>
                <p className={p}>
                  This <strong>SRT to VTT Converter</strong> instantly
                  transforms <strong>SubRip (.srt)</strong> subtitle files into
                  clean, standards-compliant <strong>WebVTT (.vtt)</strong>{" "}
                  files. It is designed for creators, editors, developers,
                  accessibility teams, and video professionals who work with
                  YouTube captions, HTML5 video players, e-learning platforms,
                  or online video workflows.
                </p>
                <p className={p}>
                  Whether you need to upload captions to a platform, fix timing,
                  or prepare a WebVTT file for a website, this tool delivers fast
                  and accurate results while keeping your data private inside
                  your browser.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>Understanding Subtitle Formats</h2>
                <h3 className={h3}>What Is an SRT (SubRip) File</h3>
                <p className={p}>
                  An SRT file is a simple subtitle format containing numbered
                  cues, timestamps, and text. It is lightweight, widely supported,
                  and compatible with most video editors. However, it does not
                  support styling, metadata, or advanced formatting.{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/SubRip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]"
                  >
                    Click here
                  </a>{" "}
                  to learn more about SRT format.
                </p>
                <h3 className={h3}>What Is a VTT or WebVTT File</h3>
                <p className={p}>
                  WebVTT (.vtt) is the modern subtitle format used by{" "}
                  <strong>HTML5</strong> video players, YouTube, streaming
                  platforms, and LMS systems. It supports styling, positioning,
                  metadata, and smooth rendering in browsers.{" "}
                  <a
                    href="https://www.w3.org/TR/webvtt1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]"
                  >
                    Click here
                  </a>{" "}
                  to learn more about WebVTT format.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>Why Convert SRT to VTT Format</h2>
                <p className={p}>
                  Web platforms and modern players require WebVTT for proper
                  rendering, styling, and accessibility. Converting SRT to WebVTT
                  ensures compatibility with HTML5 video, mobile apps, YouTube,
                  and online learning platforms. It also enables advanced styling
                  options like positioning and formatting.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  How to Convert SRT to VTT Online (Quick Steps)
                </h2>
                <ol className={ol}>
                  <li>
                    <p>
                      <strong>Upload or Paste Your SRT File</strong>
                      <br />
                      Start by pasting your subtitle text or uploading your .srt
                      file into the input area.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Click Convert to Generate a WebVTT File</strong>
                      <br />
                      The converter automatically rewrites timestamps and
                      formatting to match WebVTT standards.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Preview and Download the Converted VTT File</strong>
                      <br />
                      Review the output in the right panel and download your
                      WebVTT subtitle file.
                    </p>
                  </li>
                </ol>
                <p className={p}> </p>

                <h2 className={h2}>
                  Key Features of Our Online SRT to VTT Converter
                </h2>
                <ul className="mb-6 space-y-3 text-[#334155]">
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Fast and free browser-based conversion – processed
                      instantly with no uploads or server delays.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Accurate timestamp and formatting conversion – precise
                      millisecond formatting and proper WebVTT headers.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Supports SRT and WebVTT formats – ensures compatibility with
                      editors and HTML5 players.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Offline and privacy-first – all processing stays inside
                      your device for maximum security.
                    </span>
                  </li>
                </ul>

                <h2 className={h2}>
                  Example of SRT to VTT Conversion (Output Preview)
                </h2>
                <h3 className={h3}>Before (SRT Sample)</h3>
                <p className={p}>
                  1
                  <br />
                  {"00:00:02,000 \u2013> 00:00:04,000"}
                  <br />
                  Hello there!
                </p>
                <h3 className={h3}>After (VTT Output)</h3>
                <p className={p}>
                  WEBVTT
                  <br />
                  {"00:00:02.000 \u2013> 00:00:04.000"}
                  <br />
                  Hello there!
                </p>
                <p className={p}> </p>

                <h2 className={h2}>When to Use SRT vs WebVTT</h2>
                <p className={p}>
                  Use SRT when you need <strong>compatibility</strong> with older
                  players and editing programs.
                  <br />
                  Use WebVTT for HTML5 video, YouTube, mobile platforms,
                  streaming apps, and websites that require modern styling and
                  metadata support.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>Advanced Subtitle Editing Tools</h2>
                <ul className="mb-6 space-y-3">
                  <li>
                    <a
                      href="/vtt-to-srt-converter/"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>VTT to SRT Converter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-merger/"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Merger</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-splitter/"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Splitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-time-shifter/"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Time Shifter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-overlap-fixer/"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Overlap Fixer</span>
                    </a>
                  </li>
                </ul>

                <h2 className={h2}>
                  Why Choose SubtitlesEdit.com for Subtitle Conversion
                </h2>
                <h3 className={h3}>No Sign-Up or Upload Delays</h3>
                <p className={p}>
                  All tools run instantly inside your browser without any
                  uploads.
                </p>
                <h3 className={h3}>Accurate, Lightweight Conversion Engine</h3>
                <p className={p}>
                  Every conversion uses the official WebVTT formatting rules for
                  maximum compatibility.
                </p>
                <h3 className={h3}>
                  Trusted by Editors, Translators, and Developers
                </h3>
                <p className={p}>
                  Professionals worldwide use these tools for fast, reliable
                  subtitle workflows.
                </p>
                <h3 className={h3}>Complete Suite of Free Subtitle Tools</h3>
                <p className={p}>
                  Convert, merge, split, fix, or edit subtitle files —
                  everything is optimized for speed and precision.
                </p>
                <p className={p}> </p>
              </div>

              <div className={section}>
                <h2 className={h2}>
                  Frequently Asked Questions (FAQ)
                </h2>
                <FaqAccordion />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

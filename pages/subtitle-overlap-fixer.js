import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/Layout";
import ToolPageGradientHero from "@/components/ToolPageGradientHero";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-12";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const PAGE_TITLE =
  "Subtitle Overlap Fixer Online Free | Subtitles Edit";

const META_DESC =
  "Fix overlapping subtitles online for free. Detect and correct overlapping cue timings in SRT and VTT files instantly in your browser.";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Overlap-Fixer-tool-1024x538.webp";

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://subtitlesedit.com/#organization",
      name: "Subtitles Edit",
      url: "https://subtitlesedit.com",
      email: "support@subtitlesedit.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://subtitlesedit.com/#logo",
        url: "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp",
        contentUrl:
          "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp",
        caption: "Subtitles Edit",
        inLanguage: "en-US",
        width: 500,
        height: 500,
      },
      description:
        "SubtitlesEdit.com is a free, browser-based toolkit for creating, editing, and perfecting subtitle and caption files. We help video creators, YouTubers, educators, translators, and media teams easily convert, merge, split, sync, and fix subtitles online — no software installation or sign-up required.",
    },
    {
      "@type": "WebSite",
      "@id": "https://subtitlesedit.com/#website",
      url: "https://subtitlesedit.com",
      name: "Subtitles Edit",
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/subtitle-overlap-fixer#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://subtitlesedit.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Subtitle Overlap Fixer",
          item: "https://subtitlesedit.com/subtitle-overlap-fixer",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-overlap-fixer#webpage",
      url: "https://subtitlesedit.com/subtitle-overlap-fixer",
      name: PAGE_TITLE,
      description: META_DESC,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/subtitle-overlap-fixer#breadcrumb",
      },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMG },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-overlap-fixer#software",
      name: "Subtitle Overlap Fixer",
      url: "https://subtitlesedit.com/subtitle-overlap-fixer",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (browser-based)",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Detects overlapping cue timings in SRT and VTT files",
        "Pushes overlapping cue starts to the previous cue's end",
        "Enforces a 300 ms minimum cue duration",
        "Preserves cue numbers, dialogue text, and inline formatting tags",
        "Runs entirely in the browser — no uploads, no sign-up",
      ],
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-overlap-fixer#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: 'What does "overlapping subtitles" mean?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Overlapping subtitles happen when one cue's start time is earlier than the previous cue's end time, so two subtitle lines briefly appear on screen at the same moment. This causes flickering, doubled text, or upload warnings on platforms like YouTube. The fix is to shift the later cue so it begins after the earlier one ends.",
          },
        },
        {
          "@type": "Question",
          name: "How does this tool fix overlapping subtitles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For each cue, the tool compares its start time against the previous cue's end time. If the cue would overlap, its start time is pushed forward to where the previous cue ended. Cue text, cue numbers, and inline formatting tags are left untouched — only the timestamps on conflicting lines are rewritten.",
          },
        },
        {
          "@type": "Question",
          name: "Does the tool change my dialogue, cue numbers, or formatting tags?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The tool only rewrites timestamp lines. Cue numbers, dialogue text, line breaks, italic and bold tags, font tags, underline tags, speaker labels, and blank line spacing all pass through unchanged. The output file keeps the same structure as the input — just with corrected timings on overlapping cues.",
          },
        },
        {
          "@type": "Question",
          name: "Does it handle both SRT and VTT files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — SRT and VTT timing lines are both detected and corrected, and the output uses the input format's decimal separator (comma for SRT, dot for VTT). One caveat: VTT cue settings on timing lines, like line:50% or align:center, are dropped during processing. Every timing line is rewritten with just the timestamps.",
          },
        },
        {
          "@type": "Question",
          name: "What happens to cues that are too short after a fix?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The tool enforces a minimum cue duration of 300 milliseconds. If pushing a cue's start time forward would leave it shorter than 300 ms, the end time is extended so the cue stays on screen long enough to read. Cues already longer than 300 ms are left at their original duration.",
          },
        },
        {
          "@type": "Question",
          name: "Will fixing one overlap affect later cues?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most of the time, no. A fix only touches cues whose start time falls before the previous (corrected) end time. However, if extending a very short cue to the 300 ms minimum makes it overlap the next cue, that next cue gets pushed too — so a chain of very short overlaps can cause a small cascade forward.",
          },
        },
        {
          "@type": "Question",
          name: "What causes overlapping subtitles in the first place?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common sources include AI auto-captioning tools (Whisper, YouTube auto-captions), merging subtitle files from different parts, manual edits where end times were not tightened, frame-rate conversions, and copy-paste mistakes. Overlaps are especially common in files where multiple speakers talk over each other or where captions were generated in bursts.",
          },
        },
        {
          "@type": "Question",
          name: "Does this tool require an upload or install?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The Subtitle Overlap Fixer runs entirely in your browser using local JavaScript. Your subtitle file never leaves your device, no account is required, and there is nothing to install. The tool is free with no usage limits, no watermark on the corrected file, and no ads injected into the output.",
          },
        },
        {
          "@type": "Question",
          name: "Can it handle large subtitle files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool processes files line by line in a single pass, so even subtitles for long films or full TV episodes with thousands of cues finish in well under a second on a typical laptop. Performance is bound only by your browser since nothing is sent to a server.",
          },
        },
        {
          "@type": "Question",
          name: "Will it fix subtitles exported from Whisper, YouTube auto-captions, or Premiere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Subtitle files exported from Whisper, YouTube Studio auto-captions, Adobe Premiere, DaVinci Resolve, Final Cut Pro, Aegisub, and most other caption tools are plain SRT or VTT and work directly. The tool reads the file as text, finds overlapping timing lines, and rewrites them — the source tool does not matter.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between this and a subtitle time shifter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A time shifter moves every cue forward or backward by the same amount, used when subtitles are uniformly out of sync with video. This Overlap Fixer only changes timestamps on cues that actually conflict with each other. The two tools solve different problems and can be used together in any order.",
          },
        },
        {
          "@type": "Question",
          name: "Does it work as an SRT to VTT converter or vice versa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No — the output keeps the same format as the input. If you upload SRT, you get SRT back. If you upload VTT, you get VTT back. To convert between formats, use the dedicated SRT to VTT Converter or VTT to SRT Converter, then run the Overlap Fixer if needed.",
          },
        },
      ],
    },
  ],
};

const converterActionBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

const textareaClass =
  "min-h-[220px] w-full rounded-[10px] border border-gray-300 p-2 font-mono text-base leading-snug text-[#334155]";

function OverlapFixerTool() {
  return (
    <section
      className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      id="se-fix"
    >
      <p className="my-2 mb-4 text-[#374151]">
        Detect and correct overlapping subtitle timestamps. Works with .srt and
        .vtt files. Overlapping cues are pushed forward to where the previous
        cue ended; non-overlapping cues pass through unchanged.
      </p>

      <div className="flex flex-wrap gap-3">
        <div className="min-w-[300px] flex-1 basis-[420px]">
          <div className="my-1 font-semibold">Upload or Paste Subtitle</div>
          <div className="mb-2 mt-1">
            <input
              id="fixFile"
              className="sr-only"
              type="file"
              accept=".srt,.vtt,text/plain"
            />
            <label
              htmlFor="fixFile"
              className={`${converterActionBtnClass} cursor-pointer`}
            >
              Choose File
            </label>
          </div>
          <textarea
            id="fixIn"
            className={textareaClass}
            placeholder="Paste subtitles here..."
          />

          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <button type="button" id="fixBtn" className={converterActionBtnClass}>
              Fix Overlaps
            </button>
            <button
              type="button"
              id="fixClear"
              className={converterActionBtnClass}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="min-w-[300px] flex-1 basis-[420px]">
          <div className="my-1 font-semibold">Fixed Output</div>
          <textarea
            id="fixOut"
            readOnly
            className={`${textareaClass} bg-white`}
            placeholder="Output will appear here..."
          />

          <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              id="fixDownload"
              className={converterActionBtnClass}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const linkClass =
  "text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]";

function FaqAccordion({ rows }) {
  const itemTitle =
    "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";

  return (
    <div
      className="divide-y divide-gray-100"
      aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys"
    >
      {rows.map((row) => (
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

const faqRows = [
  {
    id: "faq-overlap-1",
    open: true,
    q: 'What does "overlapping subtitles" mean?',
    body: (
      <p>
        Overlapping subtitles happen when one cue&apos;s start time is earlier than
        the previous cue&apos;s end time, so two subtitle lines briefly appear on
        screen at the same moment. This causes flickering, doubled text, or
        upload warnings on platforms like YouTube. The fix is to shift the
        later cue so it begins after the earlier one ends.
      </p>
    ),
  },
  {
    id: "faq-overlap-2",
    q: "How does this tool fix overlapping subtitles?",
    body: (
      <p>
        For each cue, the tool compares its start time against the previous
        cue&apos;s end time. If the cue would overlap, its start time is pushed
        forward to where the previous cue ended. Cue text, cue numbers, and
        inline formatting tags are left untouched — only the timestamps on
        conflicting lines are rewritten.
      </p>
    ),
  },
  {
    id: "faq-overlap-3",
    q: "Does the tool change my dialogue, cue numbers, or formatting tags?",
    body: (
      <p>
        No. The tool only rewrites timestamp lines. Cue numbers, dialogue text,
        line breaks, italic and bold tags, font tags, underline tags, speaker
        labels, and blank line spacing all pass through unchanged. The output
        file keeps the same structure as the input — just with corrected timings
        on overlapping cues.
      </p>
    ),
  },
  {
    id: "faq-overlap-4",
    q: "Does it handle both SRT and VTT files?",
    body: (
      <p>
        Yes — SRT and VTT timing lines are both detected and corrected, and the
        output uses the input format&apos;s decimal separator (comma for SRT, dot
        for VTT). One caveat: VTT cue settings on timing lines, like{" "}
        <code>line:50%</code> or <code>align:center</code>, are dropped during
        processing. Every timing line is rewritten with just the timestamps.
      </p>
    ),
  },
  {
    id: "faq-overlap-5",
    q: "What happens to cues that are too short after a fix?",
    body: (
      <p>
        The tool enforces a minimum cue duration of 300 milliseconds. If
        pushing a cue&apos;s start time forward would leave it shorter than 300 ms,
        the end time is extended so the cue stays on screen long enough to
        read. Cues already longer than 300 ms are left at their original
        duration.
      </p>
    ),
  },
  {
    id: "faq-overlap-6",
    q: "Will fixing one overlap affect later cues?",
    body: (
      <p>
        Most of the time, no. A fix only touches cues whose start time falls
        before the previous (corrected) end time. However, if extending a very
        short cue to the 300 ms minimum makes it overlap the next cue, that
        next cue gets pushed too — so a chain of very short overlaps can cause
        a small cascade forward.
      </p>
    ),
  },
  {
    id: "faq-overlap-7",
    q: "What causes overlapping subtitles in the first place?",
    body: (
      <p>
        Common sources include AI auto-captioning tools (Whisper, YouTube
        auto-captions), merging subtitle files from different parts, manual
        edits where end times were not tightened, frame-rate conversions, and
        copy-paste mistakes. Overlaps are especially common in files where
        multiple speakers talk over each other or where captions were generated
        in bursts.
      </p>
    ),
  },
  {
    id: "faq-overlap-8",
    q: "Does this tool require an upload or install?",
    body: (
      <p>
        No. The Subtitle Overlap Fixer runs entirely in your browser using
        local JavaScript. Your subtitle file never leaves your device, no
        account is required, and there is nothing to install. The tool is free
        with no usage limits, no watermark on the corrected file, and no ads
        injected into the output.
      </p>
    ),
  },
  {
    id: "faq-overlap-9",
    q: "Can it handle large subtitle files?",
    body: (
      <p>
        Yes. The tool processes files line by line in a single pass, so even
        subtitles for long films or full TV episodes with thousands of cues
        finish in well under a second on a typical laptop. Performance is bound
        only by your browser since nothing is sent to a server.
      </p>
    ),
  },
  {
    id: "faq-overlap-10",
    q: "Will it fix subtitles exported from Whisper, YouTube auto-captions, or Premiere?",
    body: (
      <p>
        Yes. Subtitle files exported from Whisper, YouTube Studio
        auto-captions, Adobe Premiere, DaVinci Resolve, Final Cut Pro,
        Aegisub, and most other caption tools are plain SRT or VTT and work
        directly. The tool reads the file as text, finds overlapping timing
        lines, and rewrites them — the source tool does not matter.
      </p>
    ),
  },
  {
    id: "faq-overlap-11",
    q: "What's the difference between this and a subtitle time shifter?",
    body: (
      <p>
        A time shifter moves every cue forward or backward by the same amount,
        used when subtitles are uniformly out of sync with video. This Overlap
        Fixer only changes timestamps on cues that actually conflict with each
        other. The two tools solve different problems and can be used together
        in any order.
      </p>
    ),
  },
  {
    id: "faq-overlap-12",
    q: "Does it work as an SRT to VTT converter or vice versa?",
    body: (
      <p>
        No — the output keeps the same format as the input. If you upload SRT,
        you get SRT back. If you upload VTT, you get VTT back. To convert
        between formats, use the dedicated{" "}
        <a href="/srt-to-vtt-converter" className={linkClass}>
          SRT to VTT Converter
        </a>{" "}
        or{" "}
        <a href="/vtt-to-srt-converter" className={linkClass}>
          VTT to SRT Converter
        </a>
        , then run the Overlap Fixer if needed.
      </p>
    ),
  },
];

export default function SubtitleOverlapFixerPage() {
  return (
    <Layout>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link
          rel="canonical"
          href="https://subtitlesedit.com/subtitle-overlap-fixer"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta
          property="og:url"
          content="https://subtitlesedit.com/subtitle-overlap-fixer"
        />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:secure_url" content={OG_IMG} />
        <meta property="og:image:alt" content="Subtitle Overlap Fixer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      </Head>

      <Script
        src="/wp-content/uploads/tools/extras/subtitle-overlap-fixer-page.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-59"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1
                className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                itemProp="headline"
              >
                Subtitle Overlap Fixer — Remove Overlapping Subtitles in SRT
                and VTT Files
              </h1>
            </header>

            <div className="entry-content clear px-0" itemProp="text">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <OverlapFixerTool />
                <ToolPageGradientHero
                  headline="Fix Overlapping Subtitles Online Free"
                  subheadline="Detect and fix overlapping subtitle cues in .srt and .vtt files — free and instant."
                />
              </div>

              <div className={`${section} entry-content se-content`}>
                <h2 className={h2}>
                  What Overlapping Subtitles Are and Why They Need Fixing
                </h2>
                <p className={p}>
                  Overlapping subtitles happen when one cue&apos;s start time falls
                  before the previous cue&apos;s end time, so two lines briefly
                  stack on screen at the same moment. This causes flickering
                  text, rapid on-screen changes, and occasional upload warnings
                  on platforms that prefer strictly sequential cues.
                </p>
                <p className={p}>
                  The Subtitle Overlap Fixer scans your{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/SubRip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    SRT
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    VTT/WebVTT
                  </a>{" "}
                  file for these conflicts and pushes overlapping cues forward
                  to where the previous cue ended. Cue text, cue numbers, and
                  inline formatting tags are left untouched. Everything runs
                  in your browser — no uploads, no sign-up, no install.
                </p>

                <h2 className={h2}>How the Subtitle Overlap Fixer Works</h2>
                <p className={p}>
                  The tool walks through your file line by line and looks at
                  every timestamp line (<code>HH:MM:SS,mmm --&gt; HH:MM:SS,mmm</code>{" "}
                  for SRT, <code>HH:MM:SS.mmm --&gt; HH:MM:SS.mmm</code> for
                  VTT). For each cue, it compares the start time to the end
                  time of the previous cue. If the start is earlier than the
                  previous end, the cue is overlapping, and its start time is
                  pushed forward to where the previous cue ends. If pushing the
                  start forward would leave the cue shorter than 300
                  milliseconds, the end time is extended so the cue stays on
                  screen long enough to read.
                </p>

                <h3 className={h3}>
                  1. Choose your SRT or VTT file (or paste the contents)
                </h3>
                <p className={p}>
                  Click <em>Choose File</em> to load a subtitle file from your
                  device, or paste the contents directly into the input box.
                </p>

                <h3 className={h3}>2. Click &quot;Fix Overlaps&quot;</h3>
                <p className={p}>
                  The tool processes the file in a single pass and writes the
                  corrected version to the output box. Cues that were already
                  in order are left at their original timings.
                </p>

                <h3 className={h3}>3. Download the fixed file</h3>
                <p className={p}>
                  Click <em>Download</em> to save the corrected file. The
                  output keeps the same format as the input — <code>.srt</code>{" "}
                  in, <code>.srt</code> out; <code>.vtt</code> in,{" "}
                  <code>.vtt</code> out.
                </p>

                <h2 className={h2}>Before and After</h2>
                <p className={p}>
                  Input (SRT with cue 2 overlapping cue 1):
                </p>
                <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,500
First line of dialogue.

2
00:00:03,000 --> 00:00:05,000
Second line starts before the first ends.

3
00:00:05,200 --> 00:00:07,000
Third line — no overlap.`}
                </pre>
                <p className={p}>
                  Output (cue 2&apos;s start pushed to cue 1&apos;s end):
                </p>
                <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,500
First line of dialogue.

2
00:00:03,500 --> 00:00:05,000
Second line starts before the first ends.

3
00:00:05,200 --> 00:00:07,000
Third line — no overlap.`}
                </pre>
                <p className={p}>
                  Cue 2&apos;s start time was pushed from <code>00:00:03,000</code>{" "}
                  to <code>00:00:03,500</code> (matching cue 1&apos;s end). Cue 3
                  was untouched because its original start time was already
                  past cue 2&apos;s new end. Dialogue, cue numbers, and blank-line
                  spacing pass through unchanged.
                </p>

                <h2 className={h2}>VTT Cue Settings and What Gets Dropped</h2>
                <p className={p}>
                  VTT files can include cue settings on the timing line itself,
                  for example:{" "}
                  <code>
                    00:00:01.000 --&gt; 00:00:02.000 line:50% align:center
                  </code>
                  . When the tool rewrites a timing line, it keeps only the
                  start and end timestamps — the cue settings on that line are
                  dropped. This happens on every cue, not just overlapping
                  ones, because every timing line gets rewritten.
                </p>
                <p className={p}>
                  Other VTT structures pass through unchanged: WEBVTT headers,
                  NOTE blocks, STYLE blocks, REGION blocks, and named cue
                  identifiers. Italic, bold, font, and underline tags inside
                  dialogue text (<code>&lt;i&gt;</code>, <code>&lt;b&gt;</code>
                  , <code>&lt;font&gt;</code>, <code>&lt;u&gt;</code>) are
                  preserved on every cue because they live on text lines, not
                  timestamp lines.
                </p>

                <h2 className={h2}>When to Use the Subtitle Overlap Fixer</h2>
                <p className={p}>
                  Overlap fixing is most useful in these workflows:
                </p>
                <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
                  <li>
                    After running AI auto-captioning (Whisper, YouTube
                    auto-captions, Otter.ai) — these tools often produce
                    back-to-back cues with millisecond overlaps that flicker on
                    playback.
                  </li>
                  <li>
                    After merging multiple subtitle files — if two source files
                    share the same time range, their cues can interleave and
                    overlap.
                  </li>
                  <li>
                    Before exporting from a subtitle editor for professional
                    captioning deliveries, where clean timing is expected.
                  </li>
                  <li>
                    Before uploading to platforms — most modern players
                    tolerate small overlaps, but cleaner timing reduces flicker
                    in players that don&apos;t.
                  </li>
                  <li>
                    After a partial time-shift — if you shifted only part of a
                    file, the boundary cues may now overlap.
                  </li>
                </ul>

                <h2 className={h2}>Who Uses This Tool</h2>
                <p className={p}>
                  Video editors and captioners cleaning up AI-generated
                  subtitle drafts. Translators who merge source-language and
                  target-language files. YouTubers preparing captions for
                  upload. Documentary and film teams polishing deliverables.
                  Anyone who downloaded SRT or VTT files from auto-captioning
                  services and noticed flicker on playback.
                </p>

                <h2 className={h2}>Why Use This Subtitle Overlap Fixer</h2>
                <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
                  <li>
                    Honest, deterministic logic — the tool only changes
                    timestamps on cues that overlap. Everything else passes
                    through.
                  </li>
                  <li>
                    No uploads — your file is read into the browser tab and
                    processed locally. Nothing is sent to a server.
                  </li>
                  <li>
                    Both SRT and VTT supported — the tool detects the format
                    and outputs the matching decimal separator.
                  </li>
                  <li>
                    Free, no account, no install — open the page, fix the
                    file, close the tab.
                  </li>
                  <li>
                    Single-pass line-by-line processing — fast even on
                    feature-length captions with thousands of cues.
                  </li>
                </ul>

                <h2 className={h2}>Related Subtitle Tools</h2>
                <p className={p}>
                  Other free subtitle tools you can use alongside the Overlap
                  Fixer:
                </p>
                <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
                  <li>
                    <a href="/subtitle-time-shifter" className={linkClass}>
                      Subtitle Time Shifter
                    </a>
                  </li>
                  <li>
                    <a href="/subtitle-merger" className={linkClass}>
                      Subtitle Merger
                    </a>
                  </li>
                  <li>
                    <a href="/srt-to-vtt-converter" className={linkClass}>
                      SRT to VTT Converter
                    </a>
                  </li>
                  <li>
                    <a href="/vtt-to-srt-converter" className={linkClass}>
                      VTT to SRT Converter
                    </a>
                  </li>
                  <li>
                    <a href="/subtitle-splitter" className={linkClass}>
                      Subtitle Splitter
                    </a>
                  </li>
                </ul>
              </div>

              <div className={`${section} entry-content se-content`}>
                <h2 className={h2}>Frequently Asked Questions (FAQ)</h2>
                <FaqAccordion rows={faqRows} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

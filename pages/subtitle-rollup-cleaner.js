import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/Layout";
import ToolPageGradientHero from "@/components/ToolPageGradientHero";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const linkClass =
  "text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]";

const PAGE_TITLE = "Subtitle Rollup Cleaner Online Free | Subtitles Edit";
const META_DESC =
  "Clean rollup captions from YouTube auto-generated VTT files. Remove duplicated, accumulating subtitle text and get clean cues. Free, browser-based, private.";
const CANONICAL = "https://subtitlesedit.com/subtitle-rollup-cleaner";
const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2026/06/subtitle-rollup-cleaner-1200x630.webp";

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
      "@id": CANONICAL + "#breadcrumb",
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
          name: "Subtitle Rollup Cleaner",
          item: CANONICAL,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": CANONICAL + "#webpage",
      url: CANONICAL,
      name: PAGE_TITLE,
      description: META_DESC,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      breadcrumb: { "@id": CANONICAL + "#breadcrumb" },
      inLanguage: "en-US",
      primaryImageOfPage: { "@id": OG_IMG },
    },
    {
      "@type": "SoftwareApplication",
      "@id": CANONICAL + "#software",
      name: "Subtitle Rollup Cleaner",
      url: CANONICAL,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (browser-based)",
      description:
        "Free, browser-based tool that removes rollup (scrolling) duplication from YouTube auto-generated VTT subtitle files, leaving clean, deduplicated cues with accurate timing.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Detects and removes cumulative rollup duplication in WebVTT files",
        "Preserves original timestamps and sentence structure",
        "100% client-side processing — no uploads, no accounts",
        "Handles YouTube, yt-dlp, Zoom, Teams, Google Meet, and Otter VTT exports",
      ],
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
    },
    {
      "@type": "HowTo",
      "@id": CANONICAL + "#howto",
      name: "How to clean rollup captions from a VTT file",
      description:
        "Step-by-step instructions for removing rollup duplication from a WebVTT subtitle file using the Subtitle Rollup Cleaner.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload your VTT file",
          text: "Click Choose File and select the .vtt file containing rollup or scrolling captions.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Click Clean Rollup",
          text: "The tool detects rollup chains, removes accumulated duplicate text, and rebuilds clean cues with merged timestamps.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Download the cleaned file",
          text: "Download the cleaned .vtt file. Original timestamps are preserved at the sentence boundaries.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": CANONICAL + "#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What are rollup captions in a VTT file?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rollup captions, sometimes called scrolling or progressive captions, are a captioning style where each cue contains the entire sentence built up so far, with each new cue adding one or two more words. They are produced by live speech recognizers used by YouTube, Zoom, Teams, Google Meet, and Otter. Played in a video they appear as a smoothly scrolling line, but the underlying file contains heavy text duplication.",
          },
        },
        {
          "@type": "Question",
          name: "Why does my YouTube auto-generated VTT file have duplicated text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube auto-captions use rollup rendering, where each cue carries forward all previous words and adds new ones. This is intentional for display but creates files where the same sentence appears dozens of times in slightly longer forms. The Subtitle Rollup Cleaner collapses these chains into single clean cues with accurate timing.",
          },
        },
        {
          "@type": "Question",
          name: "Will the cleaner work with VTT files from sources other than YouTube?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool works with any WebVTT file that uses rollup-style cumulative cues, including exports from yt-dlp, Otter, Zoom, Microsoft Teams, Google Meet, and Web Speech API recorders. The detection is pattern-based, not source-specific.",
          },
        },
        {
          "@type": "Question",
          name: "Does the tool change my original VTT file?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Your original file is never uploaded, modified, or stored. The cleaner runs entirely in your browser and produces a new cleaned file for download. The source file on your device is untouched.",
          },
        },
        {
          "@type": "Question",
          name: "Is timing preserved after cleaning?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Each cleaned cue inherits the start time of the first rollup snapshot in its chain and the end time of the last snapshot, so each sentence remains aligned with the speech in your video. The cleaner does not shift, retime, or invent timestamps.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if my file is not in rollup format?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cues that do not match the rollup pattern are passed through unchanged. If your file contains no rollup duplication, the output will be identical to the input. The tool only collapses cues when the cumulative-prefix pattern is clearly present.",
          },
        },
        {
          "@type": "Question",
          name: "Can the tool wrongly merge separate sentences that happen to repeat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The cleaner uses two safeguards. First, it only chains cues that touch in time (gap under two seconds). Second, it only collapses cues whose growth pattern matches cumulative rollup — a true superset extension. Legitimate dialogue with spaced repetition is preserved as separate cues.",
          },
        },
        {
          "@type": "Question",
          name: "Does the tool support SRT files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Not yet. Rollup output is overwhelmingly a WebVTT phenomenon — it is generated by browser-based live speech recognizers that export VTT natively. The current version is VTT-only. If you have an SRT file from a rollup-style source, convert it to VTT first using the SRT to VTT Converter.",
          },
        },
        {
          "@type": "Question",
          name: "How do I download YouTube auto-captions in the first place?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If you own the video, open YouTube Studio, select the video, click Subtitles, choose the auto-generated track, and select Download as VTT. For videos you do not own, command-line tools such as yt-dlp can fetch the auto-caption track with the --write-auto-sub flag, which produces a VTT file in rollup format ready to clean.",
          },
        },
        {
          "@type": "Question",
          name: "Is the cleaner free, and does it require an account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, fully free. No account, no signup, no upload, no usage limits. The tool runs in your browser and processes files locally. Your subtitles never leave your device.",
          },
        },
        {
          "@type": "Question",
          name: "How big a VTT file can the cleaner handle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Because processing happens in your browser, file size is limited only by your device's memory. VTT files from multi-hour streams (tens of thousands of cues) clean in a few seconds on a typical laptop. There is no server-side cap.",
          },
        },
        {
          "@type": "Question",
          name: "Does the cleaner preserve formatting tags or VTT cue settings?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plain text and line breaks within cleaned cues are preserved. VTT cue settings (such as positioning hints) and inline tags from the raw rollup output are dropped, because they refer to the rollup rendering rather than to the cleaned sentences. If you need styling, apply it after cleaning.",
          },
        },
      ],
    },
  ],
};

const converterActionBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

function RollupCleanerTool() {
  return (
    <section
      id="se-rollup"
      className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
    >
      <p className="mb-4 mt-2 text-[#374151]">
        Clean rollup or scrolling captions from <strong>.vtt</strong> files
        exported by YouTube, yt-dlp, Otter, Zoom, Teams, or Google Meet. 100% in
        your browser {"\u2014"} works fully offline.
      </p>

      <div className="flex flex-col gap-2.5">
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            id="rollupFile"
            className="sr-only"
            accept=".vtt,text/vtt,text/plain"
            type="file"
          />
          <label
            htmlFor="rollupFile"
            className={`${converterActionBtnClass} cursor-pointer`}
          >
            Choose File
          </label>
          <button type="button" id="rollupBtn" className={converterActionBtnClass}>
            Clean Rollup
          </button>
          <button
            type="button"
            id="btnRollupClear"
            className={converterActionBtnClass}
          >
            Clear
          </button>
        </div>

        <p id="rollupFileStatus" className="mt-2 text-sm text-[#475569]"></p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="rollupInputPreview"
              className="mb-1 block text-sm font-semibold text-[#111827]"
            >
              Input preview (rollup VTT)
            </label>
            <textarea
              id="rollupInputPreview"
              readOnly
              placeholder="Choose a .vtt file to see a preview here..."
              className="h-64 w-full rounded-[10px] border border-gray-200 bg-white p-3 font-mono text-xs leading-relaxed text-[#334155] shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="rollupOutputPreview"
              className="mb-1 block text-sm font-semibold text-[#111827]"
            >
              Cleaned output preview
            </label>
            <textarea
              id="rollupOutputPreview"
              readOnly
              placeholder="Cleaned output will appear here..."
              className="h-64 w-full rounded-[10px] border border-gray-200 bg-white p-3 font-mono text-xs leading-relaxed text-[#334155] shadow-sm"
            />
          </div>
        </div>

        <div
          id="rollupOutput"
          className="mt-3 flex flex-col gap-2 text-[#334155]"
        />
      </div>
    </section>
  );
}

function FaqAccordion({ rows }) {
  const itemTitle =
    "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";

  return (
    <div
      className="divide-y divide-gray-100"
      aria-label="Frequently asked questions"
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
    id: "rollup-faq-1",
    open: true,
    q: "What are rollup captions in a VTT file?",
    body: (
      <p>
        Rollup captions, sometimes called scrolling or progressive captions, are
        a captioning style where each cue contains the entire sentence built up
        so far, with each new cue adding one or two more words. They are
        produced by live speech recognizers used by YouTube, Zoom, Teams,
        Google Meet, and Otter. Played in a video they appear as a smoothly
        scrolling line, but the underlying file contains heavy text duplication.
      </p>
    ),
  },
  {
    id: "rollup-faq-2",
    q: "Why does my YouTube auto-generated VTT file have duplicated text?",
    body: (
      <p>
        YouTube auto-captions use rollup rendering, where each cue carries
        forward all previous words and adds new ones. This is intentional for
        display but creates files where the same sentence appears dozens of
        times in slightly longer forms. The Subtitle Rollup Cleaner collapses
        these chains into single clean cues with accurate timing.
      </p>
    ),
  },
  {
    id: "rollup-faq-3",
    q: "Will the cleaner work with VTT files from sources other than YouTube?",
    body: (
      <p>
        Yes. The tool works with any WebVTT file that uses rollup-style
        cumulative cues, including exports from yt-dlp, Otter, Zoom, Microsoft
        Teams, Google Meet, and Web Speech API recorders. The detection is
        pattern-based, not source-specific.
      </p>
    ),
  },
  {
    id: "rollup-faq-4",
    q: "Does the tool change my original VTT file?",
    body: (
      <p>
        No. Your original file is never uploaded, modified, or stored. The
        cleaner runs entirely in your browser and produces a new cleaned file
        for download. The source file on your device is untouched.
      </p>
    ),
  },
  {
    id: "rollup-faq-5",
    q: "Is timing preserved after cleaning?",
    body: (
      <p>
        Yes. Each cleaned cue inherits the start time of the first rollup
        snapshot in its chain and the end time of the last snapshot, so each
        sentence remains aligned with the speech in your video. The cleaner
        does not shift, retime, or invent timestamps.
      </p>
    ),
  },
  {
    id: "rollup-faq-6",
    q: "What happens if my file is not in rollup format?",
    body: (
      <p>
        Cues that do not match the rollup pattern are passed through unchanged.
        If your file contains no rollup duplication, the output will be
        identical to the input. The tool only collapses cues when the
        cumulative-prefix pattern is clearly present.
      </p>
    ),
  },
  {
    id: "rollup-faq-7",
    q: "Can the tool wrongly merge separate sentences that happen to repeat?",
    body: (
      <p>
        The cleaner uses two safeguards. First, it only chains cues that touch
        in time (gap under two seconds). Second, it only collapses cues whose
        growth pattern matches cumulative rollup {"\u2014"} a true superset
        extension. Legitimate dialogue with spaced repetition is preserved as
        separate cues.
      </p>
    ),
  },
  {
    id: "rollup-faq-8",
    q: "Does the tool support SRT files?",
    body: (
      <p>
        Not yet. Rollup output is overwhelmingly a WebVTT phenomenon{" "}
        {"\u2014"} it is generated by browser-based live speech recognizers
        that export VTT natively. The current version is VTT-only. If you have
        an SRT file from a rollup-style source, convert it to VTT first using
        the{" "}
        <a href="/srt-to-vtt-converter" className={linkClass}>
          SRT to VTT Converter
        </a>
        .
      </p>
    ),
  },
  {
    id: "rollup-faq-9",
    q: "How do I download YouTube auto-captions in the first place?",
    body: (
      <p>
        If you own the video, open YouTube Studio, select the video, click
        Subtitles, choose the auto-generated track, and select Download as
        VTT. For videos you do not own, command-line tools such as yt-dlp can
        fetch the auto-caption track with the <code>--write-auto-sub</code>{" "}
        flag, which produces a VTT file in rollup format ready to clean.
      </p>
    ),
  },
  {
    id: "rollup-faq-10",
    q: "Is the cleaner free, and does it require an account?",
    body: (
      <p>
        Yes, fully free. No account, no signup, no upload, no usage limits.
        The tool runs in your browser and processes files locally. Your
        subtitles never leave your device.
      </p>
    ),
  },
  {
    id: "rollup-faq-11",
    q: "How big a VTT file can the cleaner handle?",
    body: (
      <p>
        Because processing happens in your browser, file size is limited only
        by your device{"\u2019"}s memory. VTT files from multi-hour streams
        (tens of thousands of cues) clean in a few seconds on a typical
        laptop. There is no server-side cap.
      </p>
    ),
  },
  {
    id: "rollup-faq-12",
    q: "Does the cleaner preserve formatting tags or VTT cue settings?",
    body: (
      <p>
        Plain text and line breaks within cleaned cues are preserved. VTT cue
        settings (such as positioning hints) and inline tags from the raw
        rollup output are dropped, because they refer to the rollup rendering
        rather than to the cleaned sentences. If you need styling, apply it
        after cleaning.
      </p>
    ),
  },
];

export default function SubtitleRollupCleanerPage() {
  return (
    <Layout>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:alt" content="Subtitle Rollup Cleaner" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>

      <Script
        src="/wp-content/uploads/tools/extras/subtitle-rollup-cleaner-page.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article className="ast-article-single" id="post-rollup-cleaner">
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1 className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]">
                Subtitle Rollup Cleaner: Fix YouTube and Auto-Caption VTT Files
              </h1>
            </header>

            <div className="entry-content clear px-0">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <RollupCleanerTool />
                <ToolPageGradientHero
                  headline="Clean Rollup Captions From VTT Files Online Free"
                  subheadline="Remove duplicated, accumulating subtitle text from YouTube auto-generated and live-caption VTT files."
                />
              </div>

              <div className={`${section} entry-content se-content`}>
                <h2 className={h2}>
                  What the Subtitle Rollup Cleaner Does
                </h2>
                <p className={p}>
                  The <strong>Subtitle Rollup Cleaner</strong> takes a WebVTT
                  file containing <strong>rollup</strong> or{" "}
                  <strong>scrolling</strong> captions {"\u2014"} the style
                  produced by YouTube auto-captions, yt-dlp, Zoom, Microsoft
                  Teams, Google Meet, Otter, and other live speech recognizers
                  {"\u2014"} and collapses the cumulative duplication into
                  clean, deduplicated cues. The output is a normal WebVTT file
                  with one sentence per cue, accurate timestamps inherited from
                  the source, and no carry-over text. Everything runs{" "}
                  <strong>100% in your browser</strong>. Files never leave your
                  device.
                </p>
                <p className={p}>
                  If you have ever opened a YouTube auto-caption file and
                  found the same sentence repeated thirty or forty times in
                  slowly-growing fragments, you have a rollup file. This tool
                  fixes it.
                </p>

                <h3 className={h3}>
                  What rollup or scrolling captions look like
                </h3>
                <p className={p}>
                  In a rollup file, each cue contains the full sentence built
                  up so far, with one or two new words added each time. The
                  same sentence appears across dozens of cues, each slightly
                  longer than the last. A short example fragment from a
                  real-world YouTube file:
                </p>
                <pre className="mb-4 overflow-x-auto rounded-md bg-[#0f172a] p-4 text-sm leading-relaxed text-[#e2e8f0]">
{`00:00:34.040 --> 00:00:34.320
Hello,

00:00:34.320 --> 00:00:34.440
Hello, you

00:00:34.440 --> 00:00:34.600
Hello, you are

00:00:34.600 --> 00:00:34.720
Hello, you are very

00:00:34.720 --> 00:00:34.920
Hello, you are very welcome`}
                </pre>
                <p className={p}>
                  Played in a video player, these snapshots create the smooth
                  scrolling effect you see beneath a YouTube live stream. As a
                  file, however, they are unreadable, untranslatable, and
                  useless as a transcript.
                </p>

                <h3 className={h3}>
                  How the cleaner detects and removes rollup
                </h3>
                <p className={p}>
                  The cleaner walks through the file looking for{" "}
                  <strong>cumulative prefix chains</strong>: cues where the
                  previous cue{"\u2019"}s full text is a prefix of the
                  current cue{"\u2019"}s text. When a chain breaks, the final
                  most-complete sentence in that chain is kept and the rest
                  are discarded. The kept cue{"\u2019"}s timestamps inherit
                  the start of the first snapshot and the end of the last,
                  preserving accurate sync with the original audio. Two
                  safeguards prevent false positives: cues only chain if they
                  touch in time (under two seconds apart), and only true
                  cumulative growth counts {"\u2014"} legitimate spaced
                  repetition in normal dialogue is preserved.
                </p>

                <h2 className={h2}>
                  When You Need a Rollup Cleaner
                </h2>

                <h3 className={h3}>
                  Cleaning YouTube auto-generated VTT for transcripts
                </h3>
                <p className={p}>
                  YouTube{"\u2019"}s auto-caption track downloads as a VTT
                  file in rollup format, which is unsuitable for use as a
                  transcript, a study aid, or input to a translation pipeline.
                  Running it through the cleaner produces a one-sentence-per-cue
                  file that reads naturally and can be processed further.
                </p>

                <h3 className={h3}>
                  Cleaning yt-dlp <code>--write-auto-sub</code> exports
                </h3>
                <p className={p}>
                  Command-line tools like{" "}
                  <a
                    href="https://github.com/yt-dlp/yt-dlp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    yt-dlp
                  </a>{" "}
                  fetch YouTube{"\u2019"}s auto-caption track using the
                  <code> --write-auto-sub</code> flag, but the resulting VTT
                  carries the same rollup duplication as the YouTube Studio
                  download. The cleaner accepts these files directly.
                </p>

                <h3 className={h3}>
                  Cleaning Zoom, Teams, and Google Meet live caption exports
                </h3>
                <p className={p}>
                  Meeting platforms that export live captions as VTT use the
                  same rollup pattern, since live transcription works
                  identically across vendors. If you are saving meeting
                  captions to feed into note-taking or compliance workflows,
                  clean them first to get sentences instead of fragments.
                </p>

                <h3 className={h3}>
                  Cleaning Otter and Web Speech API recorder output
                </h3>
                <p className={p}>
                  Browser-based transcription tools built on the Web Speech
                  API produce rollup-style VTT for the same reason. Whatever
                  the source, if your file has growing-prefix duplication,
                  the cleaner will collapse it.
                </p>

                <h2 className={h2}>
                  How to Clean a Rollup VTT File (Step by Step)
                </h2>

                <h3 className={h3}>1. Download or export your VTT file</h3>
                <p className={p}>
                  From YouTube Studio: open the video, click Subtitles, choose
                  the auto-generated track, and select Download as VTT. From
                  yt-dlp: <code>yt-dlp --skip-download --write-auto-sub --sub-format vtt URL</code>.
                  From Zoom or Teams: enable closed captions during the meeting
                  and download the captions track afterwards.
                </p>

                <h3 className={h3}>2. Upload it to the cleaner</h3>
                <p className={p}>
                  Click <strong>Choose File</strong> above and select your
                  .vtt file. Nothing is uploaded to a server {"\u2014"} the
                  file is read into your browser{"\u2019"}s memory only.
                </p>

                <h3 className={h3}>3. Click Clean Rollup, then download</h3>
                <p className={p}>
                  Click <strong>Clean Rollup</strong>. The cleaner processes
                  the file in a fraction of a second and shows you how many
                  cues were collapsed. Click the download link to save the
                  cleaned .vtt to your device. Your original file is not
                  modified.
                </p>

                <h2 className={h2}>
                  Key Features of the Subtitle Rollup Cleaner
                </h2>

                <h3 className={h3}>Accurate cumulative-prefix detection</h3>
                <p className={p}>
                  The cleaner does not rely on regex hacks or naive line
                  matching. It builds chains based on the actual cumulative
                  growth pattern, handles two-line rollup cues where the top
                  line scrolls off, and merges fragments that belong to the
                  same sentence even when they were split across multiple
                  rollup commits.
                </p>

                <h3 className={h3}>Original timestamps preserved</h3>
                <p className={p}>
                  Each cleaned cue takes the start time of the first rollup
                  snapshot in its chain and the end time of the last. Your
                  transcript stays aligned with the speech.
                </p>

                <h3 className={h3}>
                  Conservative when in doubt
                </h3>
                <p className={p}>
                  Cues that do not match the rollup pattern are passed through
                  unchanged. A time-gap safeguard prevents the tool from
                  merging legitimate spaced dialogue. If your file is not
                  actually rollup, the output is essentially identical to the
                  input.
                </p>

                <h3 className={h3}>100% private and offline</h3>
                <p className={p}>
                  Processing runs in your browser. Your files are never
                  uploaded, never logged, never seen by anyone but you. No
                  account, no signup, no usage limits.
                </p>

                <h2 className={h2}>
                  Rollup, Scrolling, Progressive, Pop-on: A Quick Glossary
                </h2>
                <p className={p}>
                  Caption rendering styles are named confusingly. Here is
                  what each term means in practice and how it relates to the
                  cleaner.
                </p>

                <h3 className={h3}>Rollup captions</h3>
                <p className={p}>
                  The official{" "}
                  <a
                    href="https://www.w3.org/community/texttracks/wiki/RollupCaptions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    W3C term
                  </a>{" "}
                  for captions that scroll one line at a time, with new text
                  pushing existing text upward. This is what YouTube
                  auto-captions produce.
                </p>

                <h3 className={h3}>Scrolling captions</h3>
                <p className={p}>
                  Same thing as rollup. Used interchangeably in informal
                  contexts and by some desktop subtitle editors.
                </p>

                <h3 className={h3}>Progressive captions</h3>
                <p className={p}>
                  Synonymous with rollup in the speech-recognition context.
                  Each cue contains the recognizer{"\u2019"}s current
                  best-guess transcript so far. The cleaner handles all three
                  terms.
                </p>

                <h3 className={h3}>Pop-on captions (for contrast)</h3>
                <p className={p}>
                  Captions that appear and disappear as complete units, one
                  cue at a time, with no accumulation. This is the standard
                  format you see in most movies and TV.{" "}
                  <strong>Pop-on captions do not need cleaning</strong>{" "}
                  {"\u2014"} the cleaner will simply pass them through.
                </p>

                <h2 className={h2}>
                  Related Subtitle Tools
                </h2>
                <p className={p}>
                  After cleaning, you may want to convert formats, adjust
                  timing, or split the file for translation:
                </p>
                <p className={p}>
                  <a href="/vtt-to-srt-converter" className={linkClass}>
                    VTT to SRT Converter
                  </a>
                  <br />
                  <a href="/vtt-to-txt-converter" className={linkClass}>
                    VTT to TXT Converter
                  </a>
                  <br />
                  <a href="/subtitle-time-shifter" className={linkClass}>
                    Subtitle Time Shifter
                  </a>
                  <br />
                  <a href="/subtitle-splitter" className={linkClass}>
                    Subtitle Splitter
                  </a>
                  <br />
                  <a href="/subtitle-tag-stripper" className={linkClass}>
                    Subtitle Tag Stripper
                  </a>
                </p>

                <h2 className={h2}>
                  Why Choose Subtitles Edit
                </h2>
                <p className={p}>
                  This site is built around one principle: subtitle work
                  should be fast, private, and free. Every tool runs entirely
                  in your browser. There are no uploads, no accounts, no
                  usage caps, and no AI hallucinations to second-guess. The
                  rollup cleaner uses deterministic pattern detection on the
                  text of your file {"\u2014"} not a language model
                  {"\u2014"} so its behaviour is predictable and its output
                  is reproducible.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Frequently Asked Questions</h2>
                <FaqAccordion rows={faqRows} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

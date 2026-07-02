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
const ulList =
  "mb-4 list-disc pl-5 text-[#334155] space-y-2 [&_p]:mb-0 [&_li>p]:mb-0";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Splitter-tool-1024x538.webp";

const META_DESC =
  "Split subtitle files online for free. Divide large SRT or VTT subtitles into smaller parts instantly in your browser with no uploads required.";

const PAGE_TITLE = "Subtitle Splitter Online Free | Subtitles Edit";

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
        "SubtitlesEdit.com is a free, browser-based toolkit for creating, editing, and perfecting subtitle and caption files. We help video creators, YouTubers, educators, translators, and media teams easily convert, merge, split, sync, and fix subtitles online \u2014 no software installation or sign-up required.",
    },
    {
      "@type": "WebSite",
      "@id": "https://subtitlesedit.com/#website",
      url: "https://subtitlesedit.com",
      name: "Subtitles Edit",
      alternateName: "SubtitlesEdit.com",
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/subtitle-splitter#breadcrumb",
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
          name: "Subtitle Splitter",
          item: "https://subtitlesedit.com/subtitle-splitter",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-splitter#webpage",
      url: "https://subtitlesedit.com/subtitle-splitter",
      name: PAGE_TITLE,
      description: META_DESC,
      datePublished: "2025-11-04T17:23:33+00:00",
      dateModified: "2026-07-01T00:00:00+00:00",
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/subtitle-splitter#breadcrumb",
      },
      primaryImageOfPage: { "@id": OG_IMG },
      mainEntity: { "@id": "https://subtitlesedit.com/subtitle-splitter#tool" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-splitter#tool",
      name: "Subtitle Splitter",
      url: "https://subtitlesedit.com/subtitle-splitter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements:
        "Requires a modern web browser with JavaScript enabled",
      description:
        "Free browser-based tool that splits SubRip (.srt) and WebVTT (.vtt) subtitle files into smaller parts by cue count or by time. Supports continuous cue numbering across parts and per-part timing reset to 00:00:00. All processing happens locally in the browser, with no uploads and no sign-up.",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Split SRT and VTT subtitle files by cue count or by time (minutes)",
        "Output as SRT or WebVTT",
        "Optional continuous cue numbering across parts",
        "Optional per-part timing reset to 00:00:00 for standalone video clips",
        "100% client-side processing \u2014 files never leave your device",
        "No installation, sign-up, or uploads required",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "HowTo",
      "@id": "https://subtitlesedit.com/subtitle-splitter#howto",
      name: "How to split a subtitle file",
      description:
        "Step-by-step instructions for splitting an SRT or VTT subtitle file into smaller parts using the Subtitle Splitter.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Choose your subtitle file",
          text: "Click Choose File and select the .srt or .vtt subtitle file you want to split.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Pick a split method",
          text: "Choose By cues (e.g. every 200 cues) or By time (e.g. every 10 minutes), then enter the split value. Select SRT or VTT as the output format.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Set optional toggles",
          text: "Tick Continue cue numbering across parts if you want Part 2 to carry on from Part 1 instead of restarting at 1. Tick Reset timing for each part if each part will play as a standalone clip starting from 00:00:00.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Split and download",
          text: "Click Split to generate the parts, then click Download to save each split file. All processing happens in your browser and your file is never uploaded.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-splitter#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I split SRT files online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your SRT file, choose whether to split by time or by cue count, and click Split Subtitles. The tool instantly creates multiple clean SRT files that you can download right away.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split VTT or WebVTT subtitles?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The subtitle splitter supports both VTT and WebVTT formats. Simply upload your file and choose your preferred split method.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between splitting by time and by cues?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Splitting by time divides your subtitle file based on duration (e.g., every 10 minutes). Splitting by cues divides based on the number of subtitle lines (e.g., every 200 cues). Choose the option that best fits your project.",
          },
        },
        {
          "@type": "Question",
          name: "Will the subtitle timing remain accurate after splitting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. By default the tool preserves all original timestamps, so each split part keeps the exact timing from the source file. If you tick Reset timing for each part the timestamps inside each part are shifted so that part starts at 00:00:00 instead.",
          },
        },
        {
          "@type": "Question",
          name: "Can I merge split parts later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. If needed, you can recombine the split files using a subtitle merger tool to create one final subtitle file.",
          },
        },
        {
          "@type": "Question",
          name: "Is this subtitle splitter free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The subtitle splitter is completely free and runs in your browser without requiring downloads or signup.",
          },
        },
        {
          "@type": "Question",
          name: "Can I edit subtitles after splitting them?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. You can edit each split file using our other tools in subtitle editor or any text editor.",
          },
        },
        {
          "@type": "Question",
          name: "Does the tool renumber cues for each split file?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "By default, yes \u2014 each split file starts fresh from cue number 1. If you prefer continuous numbering, tick Continue cue numbering across parts and Part 2 carries on from Part 1 (for example 201, then 401).",
          },
        },
        {
          "@type": "Question",
          name: "Can I keep cue numbers continuous across split parts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tick Continue cue numbering across parts before splitting and the tool numbers cues continuously instead of restarting each part at 1, so a 200-cue split runs 1-200, then 201-400, and so on. This works for both SRT and VTT output.",
          },
        },
        {
          "@type": "Question",
          name: "Can I reset each split part's timing to start at 00:00:00?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tick Reset timing for each part before splitting and every part's timestamps are shifted so the first cue starts at 00:00:00. This is ideal when each part will play as a standalone clip \u2014 for example, a 2-hour movie cut into two 1-hour halves where each half needs subtitles starting from zero. Leave the box unticked to keep the original end-to-end timing.",
          },
        },
        {
          "@type": "Question",
          name: "How many files can I split an SRT or VTT into?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can split your file into as many parts as needed, depending on your time intervals or cue count settings.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split subtitles for long movies or full seasons?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool handles large subtitle files and is ideal for long movies, documentaries, or episodic series.",
          },
        },
        {
          "@type": "Question",
          name: "Does formatting like italics or line breaks stay intact?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Formatting such as italics, bold, speaker labels, and line breaks remain unchanged during splitting.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split multi-language subtitle files?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool supports all languages and Unicode characters without altering them.",
          },
        },
        {
          "@type": "Question",
          name: "What's the best method for splitting subtitles for translators?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cue-based splitting works best for translators because it divides subtitles into balanced, manageable batches.",
          },
        },
        {
          "@type": "Question",
          name: "Are split files compatible with all video players?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Split subtitles remain valid SRT or VTT files and work with all major players like VLC, MX Player, YouTube editors, and HTML5 players.",
          },
        },
        {
          "@type": "Question",
          name: "Does splitting affect subtitle syncing with the video?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. By default, timing remains untouched and sync stays accurate as long as you use the correct parts for the matching video sections. If your video has been cut so each clip starts at zero, tick Reset timing for each part so every part begins at 00:00:00 and lines up with the cut clip without manual adjustment.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split subtitles on mobile devices?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The subtitle splitter works in modern mobile browsers on both iOS and Android.",
          },
        },
        {
          "@type": "Question",
          name: "Does the tool support large SRT files with thousands of lines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Since the tool works offline in your browser, there are no server limits on file size.",
          },
        },
        {
          "@type": "Question",
          name: "Can I split subtitles generated by YouTube, Premiere, or Aegisub?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All SRT and VTT files exported from video editors or subtitle tools are supported.",
          },
        },
        {
          "@type": "Question",
          name: "Is splitting done offline in my browser?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Everything is processed locally, ensuring complete privacy and fast results.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert formats (SRT/VTT) after splitting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. After splitting, use SRT and VTT converters to change formats if needed.",
          },
        },
      ],
    },
  ],
};

const converterActionBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

const selectClass =
  "w-full max-w-[200px] rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-[#475569] shadow-sm sm:w-[200px]";

function SplitterTool() {
  return (
    <section
      id="se-split"
      className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
    >
      <p className="mb-4 mt-2 text-[#374151]">
        Split <strong>.srt</strong> / <strong>.vtt</strong> subtitles by lines,
        cues, or time (minutes). 100% in your browser {"\u2014"} works fully
        offline.
      </p>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="splitMode" className="text-sm font-semibold text-[#111827]">
          Split mode
        </label>
        <select id="splitMode" className={selectClass} defaultValue="cues">
          <option value="cues">By cues</option>
          <option value="minutes">By time (minutes)</option>
        </select>

        <div className="mt-1">
          <input
            id="splitValue"
            className="w-20 rounded-[10px] border border-gray-200 px-2 py-2 text-[#475569]"
            type="number"
            defaultValue={2}
          />
        </div>

        <div className="mt-1">
          <label
            htmlFor="splitFormat"
            className="mb-1 block text-sm font-semibold text-[#111827]"
          >
            Output format
          </label>
          <select id="splitFormat" className={selectClass} defaultValue="srt">
            <option value="srt">SRT</option>
            <option value="vtt">VTT</option>
          </select>
        </div>

        <div className="mt-2 flex items-start gap-2">
          <input
            id="splitContinue"
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[#0ea5e9]"
          />
          <label htmlFor="splitContinue" className="text-sm text-[#374151]">
            Continue cue numbering across parts
            <span className="block text-xs text-[#64748b]">
              Part 2 carries on from Part 1 (e.g. 201, then 401). Works for SRT and VTT output.
            </span>
          </label>
        </div>



        <div className="mt-2 flex items-start gap-2">
          <input
            id="splitRebase"
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[#0ea5e9]"
          />
          <label htmlFor="splitRebase" className="text-sm text-[#374151]">
            Reset timing for each part (start at 00:00:00)
            <span className="block text-xs text-[#64748b]">
              Useful when each part will play as a standalone clip. Works for SRT and VTT output.
            </span>
          </label>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <input
            id="splitFile"
            className="sr-only"
            accept=".srt,.vtt,text/plain"
            type="file"
          />
          <label
            htmlFor="splitFile"
            className={`${converterActionBtnClass} cursor-pointer`}
          >
            Choose File
          </label>
          <button type="button" id="splitBtn" className={converterActionBtnClass}>
            Split
          </button>
          <button
            type="button"
            id="btnSplitClear"
            className={converterActionBtnClass}
          >
            Clear
          </button>
          <button
            type="button"
            id="btnSplitDownload"
            className={converterActionBtnClass}
          >
            Download
          </button>
        </div>

        <div
          id="splitFileStatus"
          className="mt-2 text-sm font-medium text-[#0ea5e9]"
          style={{ display: "none" }}
          aria-live="polite"
        />

        <div
          id="splitOutput"
          className="mt-3 flex flex-col gap-2 text-[#334155]"
        />
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
    id: "e-n-accordion-item-1900",
    open: true,
    q: " How can I split SRT files online? ",
    body: (
      <p>
        Upload your SRT file, choose whether to split by time or by cue count,
        and click {"\u201cSplit Subtitles.\u201d"} The tool instantly creates
        multiple clean SRT files that you can download right away.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1901",
    q: " Can I split VTT or WebVTT subtitles? ",
    body: (
      <p>
        Yes. The subtitle splitter supports both VTT and WebVTT formats. Simply
        upload your file and choose your preferred split method.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1902",
    q: " What's the difference between splitting by time and by cues? ",
    body: (
      <p>
        Splitting by time divides your subtitle file based on duration (e.g.,
        every 10 minutes). Splitting by cues divides based on the number of
        subtitle lines (e.g., every 200 cues). Choose the option that best fits
        your project.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1903",
    q: " Will the subtitle timing remain accurate after splitting? ",
    body: (
      <p>
        Yes. By default the tool preserves all original timestamps, so each
        split part keeps the exact timing from the source file. If you tick
        {" \u201c"}Reset timing for each part{"\u201d"} the timestamps inside
        each part are shifted so that part starts at 00:00:00 instead.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1904",
    q: " Can I merge split parts later? ",
    body: (
      <p>
        Yes. If needed, you can recombine the split files using a subtitle
        merger tool to create one final subtitle file.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1905",
    q: " Is this subtitle splitter free to use? ",
    body: (
      <p>
        Yes. The subtitle splitter is completely free and runs in your browser
        without requiring downloads or signup.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1906",
    q: " Can I edit subtitles after splitting them? ",
    body: (
      <p>
        Absolutely. You can edit each split file using our other tools in
        subtitle editor or any text editor.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1907",
    q: " Does the tool renumber cues for each split file? ",
    body: (
      <p>
        By default, yes {"\u2014"} each split file starts fresh from cue number
        1. If you prefer continuous numbering, tick {"\u201c"}Continue cue
        numbering across parts{"\u201d"} and Part 2 carries on from Part 1 (for
        example 201, then 401).
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19020",
    q: " Can I keep cue numbers continuous across split parts? ",
    body: (
      <p>
        Yes. Tick {"\u201c"}Continue cue numbering across parts{"\u201d"} before
        splitting and the tool numbers cues continuously instead of restarting
        each part at 1, so a 200-cue split runs 1{"\u2013"}200, then 201
        {"\u2013"}400, and so on. This works for both SRT and VTT output.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19021",
    q: " Can I reset each split part's timing to start at 00:00:00? ",
    body: (
      <p>
        Yes. Tick {"\u201c"}Reset timing for each part{"\u201d"} before
        splitting and every part{"\u2019"}s timestamps are shifted so the
        first cue starts at 00:00:00. This is ideal when each part will play
        as a standalone clip {"\u2014"} for example, a 2-hour movie cut into
        two 1-hour halves where each half needs subtitles starting from zero.
        Leave the box unticked to keep the original end-to-end timing.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1908",
    q: " How many files can I split an SRT or VTT into? ",
    body: (
      <p>
        You can split your file into as many parts as needed, depending on your
        time intervals or cue count settings.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1909",
    q: " Can I split subtitles for long movies or full seasons? ",
    body: (
      <p>
        Yes. The tool handles large subtitle files and is ideal for long movies,
        documentaries, or episodic series.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19010",
    q: " Does formatting like italics or line breaks stay intact? ",
    body: (
      <p>
        Yes. Formatting such as italics, bold, speaker labels, and line breaks
        remain unchanged during splitting.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19011",
    q: " Can I split multi-language subtitle files? ",
    body: (
      <p>
        Yes. The tool supports all languages and Unicode characters without
        altering them.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19012",
    q: " What\u2019s the best method for splitting subtitles for translators? ",
    body: (
      <p>
        Cue-based splitting works best for translators because it divides
        subtitles into balanced, manageable batches.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19013",
    q: " Are split files compatible with all video players? ",
    body: (
      <p>
        Yes. Split subtitles remain valid SRT or VTT files and work with all
        major players like VLC, MX Player, YouTube editors, and HTML5 players.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19014",
    q: " Does splitting affect subtitle syncing with the video? ",
    body: (
      <p>
        No. By default, timing remains untouched and sync stays accurate as
        long as you use the correct parts for the matching video sections.
        If your video has been cut so each clip starts at zero, tick
        {" \u201c"}Reset timing for each part{"\u201d"} so every part begins
        at 00:00:00 and lines up with the cut clip without manual adjustment.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19015",
    q: " Can I split subtitles on mobile devices? ",
    body: (
      <p>
        Yes. The subtitle splitter works in modern mobile browsers on both iOS
        and Android.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19016",
    q: " Does the tool support large SRT files with thousands of lines? ",
    body: (
      <p>
        Yes. Since the tool works offline in your browser, there are no server
        limits on file size.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19017",
    q: " Can I split subtitles generated by YouTube, Premiere, or Aegisub? ",
    body: (
      <p>
        Yes. All SRT and VTT files exported from video editors or subtitle tools
        are supported.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19018",
    q: " Is splitting done offline in my browser? ",
    body: (
      <p>
        Yes. Everything is processed locally, ensuring complete privacy and fast
        results.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-19019",
    q: " Can I convert formats (SRT/VTT) after splitting? ",
    body: (
      <p>
        Yes. After splitting, use SRT {"\u2194"} VTT converters to change
        formats if needed.
      </p>
    ),
  },
];

export default function SubtitleSplitterPage() {
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
          href="https://subtitlesedit.com/subtitle-splitter"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta
          property="og:url"
          content="https://subtitlesedit.com/subtitle-splitter"
        />
        <meta property="og:site_name" content="Subtitles Edit" />
        
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:secure_url" content={OG_IMG} />
        <meta property="og:image:alt" content="Subtitle Splitter" />
        
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
        src="/wp-content/uploads/tools/extras/subtitle-splitter-page.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-57"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1
                className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                itemProp="headline"
              >
                Subtitle Splitter to Split Subtitles Instantly (SRT &amp; VTT)
              </h1>
            </header>

            <div className="entry-content clear px-0" itemProp="text">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <SplitterTool />
                <ToolPageGradientHero
                  headline="Split Subtitle Files Online Free"
                  subheadline="Split large subtitle files into smaller parts instantly — no software needed."
                />
              </div>

              <div className={`${section} entry-content se-content`}>
                <h2 className={h2}>
                  What a Subtitle Splitter Does and When You Need It
                </h2>
                <p className={p}>
                  A{" "}
                  <strong data-start="952" data-end="973">
                    subtitle splitter
                  </strong>{" "}
                  breaks one subtitle file into multiple smaller files without
                  changing the original timestamps or formatting. It{"\u2019"}s
                  ideal for long videos, editing workflows, translation projects,
                  and platforms with file-size limits.
                </p>
                <p className={p}>
                  Split large subtitle files in seconds. This{" "}
                  <strong data-start="630" data-end="651">
                    subtitle splitter
                  </strong>{" "}
                  helps you divide SRT or VTT files into smaller parts based on{" "}
                  <strong data-start="714" data-end="722">
                    time
                  </strong>{" "}
                  or{" "}
                  <strong data-start="726" data-end="739">
                    cue count
                  </strong>
                  , making your subtitle workflow faster, cleaner, and easier.
                  Everything runs{" "}
                  <strong data-start="816" data-end="848">
                    100% offline in your browser
                  </strong>{" "}
                  for maximum privacy and speed.
                </p>

                <h3 className={h3}>
                  Splitting Large SRT or VTT Files Into Smaller Segments
                </h3>
                <p className={p}>
                  Large subtitle files can be slow to edit or upload. Splitting
                  them creates{" "}
                  <strong data-start="1334" data-end="1367">
                    lightweight, manageable parts
                  </strong>
                  .
                </p>

                <h3 className={h3}>
                  Creating Separate Subtitle Parts for Multi-Episode or
                  Multi-Scene Videos
                </h3>
                <p className={p}>
                  If your video is divided into segments, your subtitles should
                  match. Splitting creates{" "}
                  <strong data-start="1544" data-end="1571">
                    clean subtitle sections
                  </strong>{" "}
                  for each video part.
                </p>

                <h3 className={h3}>
                  Preparing Subtitles for Translation, Editing, or Platform
                  Restrictions
                </h3>
                <p data-start="1679" data-end="1778" className={p}>
                  Translators and editors often work faster when subtitles are
                  split into{" "}
                  <strong data-start="1751" data-end="1777">
                    smaller, focused files
                  </strong>
                  .
                </p>
                <p data-start="1679" data-end="1778" className={p}>
                  {" "}
                </p>

                <h2 className={h2}>
                  How to Split Subtitles (Quick Step-by-Step Guide)
                </h2>
                <p className={p}>Splitting subtitles takes only a few seconds.</p>

                <h3 className={h3}>
                  1. Upload or Paste Your Subtitle File (SRT/VTT)
                </h3>
                <p className={p}>
                  Add your subtitle file directly into the{" "}
                  <strong>Subtitle Splitter</strong> tool {"\u2014"} both{" "}
                  <strong data-start="2007" data-end="2014">
                    SRT
                  </strong>{" "}
                  and{" "}
                  <strong data-start="2019" data-end="2026">
                    VTT
                  </strong>{" "}
                  formats are supported.
                </p>

                <h3 className={h3}>
                  2. Choose Split Method: By Time or By Number of Cues
                </h3>
                <p data-start="2115" data-end="2156" className={p}>
                  Pick how you want the file to be divided:
                </p>
                <ul data-start="2158" data-end="2257" className={ulList}>
                  <li data-start="2158" data-end="2207">
                    <p data-start="2160" data-end="2207" className="mb-0">
                      <strong data-start="2160" data-end="2180">
                        Time-based split
                      </strong>{" "}
                      (e.g., every 10 minutes)
                    </p>
                  </li>
                  <li data-start="2208" data-end="2257">
                    <p data-start="2210" data-end="2257" className="mb-0">
                      <strong data-start="2210" data-end="2229">
                        Cue-based split
                      </strong>{" "}
                      (e.g., every 200 subtitles)
                    </p>
                  </li>
                </ul>
                <p data-start="2259" data-end="2324" className={p}>
                  Choose the option that matches your video structure and
                  workflow.
                </p>

                <h3 className={h3}>
                  3. Generate Split Subtitle Files and Download Instantly
                </h3>
                <p className={p}>
                  Click{" "}
                  <strong data-start="2399" data-end="2420">
                    {"\u201cSplit Subtitles\u201d"}
                  </strong>{" "}
                  and download the newly created files immediately. Each part is
                  clean, properly structured, and ready to use.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Key Features of Our Subtitle Splitter Tool
                </h2>
                <p className={p}>
                  This tool is designed for creators, editors, translators, and
                  subtitlers who want fast, accurate splitting.
                </p>

                <h3 className={h3}>
                  Supports SRT and VTT or WebVTT Formats
                </h3>
                <p className={p}>
                  Works with the most widely used subtitle formats {"\u2013"} SRT
                  and{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    WebVTT
                  </a>
                  .
                </p>

                <h3 className={h3}>
                  Precise Subtitle Splitting With Accurate Timing Preservation
                </h3>
                <p className={p}>
                  The tool keeps all{" "}
                  <strong data-start="2893" data-end="2916">
                    original timestamps
                  </strong>{" "}
                  fully intact during splitting.
                </p>

                <h3 className={h3}>
                  100% Offline Processing in Your Browser
                </h3>
                <p className={p}>
                  Your files stay on your device {"\u2014"}{" "}
                  <strong data-start="3036" data-end="3059">
                    nothing is uploaded
                  </strong>
                  , ensuring complete privacy.
                </p>

                <h3 className={h3}>
                  Flexible Cue Renumbering for Each Split File
                </h3>
                <p className={p}>
                  By default, each split file starts fresh from cue{" "}
                  <strong>1</strong>, keeping every part clean and
                  self-contained. Prefer continuous numbering? Tick{" "}
                  <strong>Continue cue numbering across parts</strong> and Part 2
                  carries on from where Part 1 ended (for example 201, then 401)
                  {" \u2014 "}ideal for translation and re-merging workflows.
                </p>

                <h3 className={h3}>
                  Reset Timing to Start Each Part at 00:00:00
                </h3>
                <p className={p}>
                  Splitting a long file into clips you{"\u2019"}ll play
                  separately? Tick{" "}
                  <strong>Reset timing for each part</strong> and every part
                  begins at <strong>00:00:00</strong>, so subtitles line up
                  with cut video clips without manual time-shifting. Leave it
                  unticked to preserve the original end-to-end timestamps.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Splitting Methods Explained: Time vs Cue-Based Splitting
                </h2>
                <p className={p}>
                  Choose the best approach for your specific project.
                </p>

                <h3 className={h3}>
                  When to Use Time-Based Splitting (e.g., 10-Minute Segments)
                </h3>
                <p className={p}>
                  Perfect for long videos, podcasts, conference recordings, or
                  training content.
                </p>

                <h3 className={h3}>
                  When to Use Cue-Based Splitting (e.g., Every 200 Subtitles)
                </h3>
                <p className={p}>
                  Ideal for translators, editors, and review teams who work with{" "}
                  <strong data-start="3652" data-end="3672">
                    subtitle batches
                  </strong>
                  .
                </p>

                <h3 className={h3}>
                  How the Tool Maintains Timing Accuracy During Splitting
                </h3>
                <p className={p}>
                  By default, the tool doesn{"\u2019"}t adjust timestamps
                  {" \u2014 "}it simply groups them into separate files,
                  ensuring <strong>timing accuracy remains intact</strong>.
                  If each part needs to play as a standalone clip starting
                  from zero, tick{" "}
                  <strong>Reset timing for each part</strong> and every part
                  will begin at 00:00:00.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Handling Common Subtitle Split Scenarios
                </h2>
                <p className={p}>
                  This subtitle splitter supports real-world splitting needs.
                </p>

                <h3 className={h3}>
                  Splitting Long Movies Into Smaller Caption Files
                </h3>
                <p className={p}>
                  Makes editing and uploading easier for large subtitle projects.
                </p>

                <h3 className={h3}>
                  Dividing Subtitles for Episodic or Chapter-Based Content
                </h3>
                <p className={p}>
                  Useful for series episodes, tutorials, or multi-part
                  educational content.
                </p>

                <h3 className={h3}>
                  Preparing Subtitles for Collaborative Translation Workflows
                </h3>
                <p className={p}>
                  Different translators can work on{" "}
                  <strong data-start="4373" data-end="4416">
                    different subtitle parts simultaneously
                  </strong>
                  , speeding up project delivery.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Can You Edit or Merge Split Files Later?
                </h2>
                <p className={p}>
                  Absolutely {"\u2014"} Subtitle splitting does not limit
                  post-processing.
                </p>

                <h3 className={h3}>
                  Editing Individual Split Parts Using a Subtitle Editor
                </h3>
                <p className={p}>
                  Make text edits, translation changes, or timing using any{" "}
                  <strong data-start="5242" data-end="5261">
                    subtitle editor
                  </strong>
                  .
                </p>

                <h3 className={h3}>
                  Re-merging Split Files Using a Subtitle Merger Tool
                </h3>
                <p className={p}>
                  If you later need a single file, use a{" "}
                  <strong data-start="5369" data-end="5388">
                    subtitle merger
                  </strong>{" "}
                  to recombine parts instantly.
                </p>

                <h3 className={h3}>
                  Adjusting Timing if Needed After Splitting=
                </h3>
                <p className={p}>
                  Use{" "}
                  <strong data-start="5483" data-end="5508">
                    subtitle time shifter
                  </strong>{" "}
                  if your final video requires timing adjustments after splitting.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>Related Subtitle Tools</h2>
                <p data-start="5641" data-end="5742" className={p}>
                  In addition to the <strong>Subtitle Splitter</strong>, try our
                  other free Subtitle Editor Tools
                </p>
                <p data-start="5641" data-end="5742" className={p}>
                  <a href="/subtitle-merger" className={linkClass}>
                    Subtitle Merger
                  </a>
                  <br />
                  <a href="/subtitle-time-shifter" className={linkClass}>
                    Subtitle Time Shifter
                  </a>
                  <br />
                  <a href="/srt-to-vtt-converter" className={linkClass}>
                    SRT to VTT Converter
                  </a>
                  <br />
                  <a href="/vtt-to-srt-converter" className={linkClass}>
                    VTT to SRT Converter
                  </a>
                  <br />
                  <a href="/subtitle-overlap-fixer" className={linkClass}>
                    Subtitle Overlap Fixer
                  </a>
                </p>
                <p data-start="5641" data-end="5742" className={p}>
                  {" "}
                </p>

                <h2 className={h2}>
                  Why Choose SubtitlesEdit.com for Splitting Subtitles?
                </h2>

                <h3 className={h3}>
                  Fully Offline and Privacy-Safe Subtitle Processing
                </h3>
                <p className={p}>
                  All subtitle operations are done{" "}
                  <strong data-start="5914" data-end="5940">
                    locally on your device
                  </strong>
                  , ensuring full confidentiality.
                </p>

                <h3 className={h3}>
                  Fast Output With Accurate Cue Structures
                </h3>
                <p className={p}>
                  Splits are generated instantly and maintain{" "}
                  <strong data-start="6073" data-end="6102">
                    clean, correct formatting
                  </strong>
                  .
                </p>

                <h3 className={h3}>
                  Ideal for Creators, Editors, Translators, and Subtitlers
                </h3>
                <p className={p}>
                  Simple, reliable, and built specifically for{" "}
                  <strong data-start="6221" data-end="6253">
                    practical subtitle workflows
                  </strong>
                  .
                </p>
                <p className={p}> </p>
              </div>

              <div className={section}>
                <h2 className={h2}>
                  Frequently Asked Questions (FAQ)
                </h2>
                <FaqAccordion rows={faqRows} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

import Head from "next/head";
import Script from "next/script";
import Layout from "@/components/Layout";
import ToolPageGradientHero from "@/components/ToolPageGradientHero";
import { useState } from "react";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-12";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Merger-1024x538.webp";

const META_DESC =
  "Merge subtitle files online for free. Combine multiple SRT or VTT subtitles into one file instantly in your browser with no uploads required.";

const PAGE_TITLE = "Subtitle Merger Online Free | Subtitles Edit";

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
      "@type": "ImageObject",
      "@id": OG_IMG,
      url: OG_IMG,
      contentUrl: OG_IMG,
      caption: "Subtitle Merger",
      width: 1024,
      height: 538,
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/subtitle-merger#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://subtitlesedit.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Subtitle Merger",
          item: "https://subtitlesedit.com/subtitle-merger",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-merger#webpage",
      url: "https://subtitlesedit.com/subtitle-merger",
      name: PAGE_TITLE,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": OG_IMG },
      breadcrumb: { "@id": "https://subtitlesedit.com/subtitle-merger#breadcrumb" },
      mainEntity: { "@id": "https://subtitlesedit.com/subtitle-merger#tool" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-merger#tool",
      name: "Subtitle Merger",
      url: "https://subtitlesedit.com/subtitle-merger",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
      description:
        "A free, browser-based tool that combines multiple SRT or VTT subtitle files into one. It orders every cue by start time, renumbers the result, and exports as SRT or WebVTT. All processing happens locally in your browser with no uploads or sign-up.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Combines multiple SRT and VTT files into one",
        "Orders cues chronologically by start time",
        "Automatic SRT cue renumbering",
        "Export as SRT or WebVTT",
        "Runs entirely in the browser with no uploads",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "HowTo",
      "@id": "https://subtitlesedit.com/subtitle-merger#howto",
      name: "How to Merge Subtitle Files Online",
      description: "Combine two or more SRT or VTT subtitle files into one continuous file using the Subtitle Merger — free, browser-based, with no uploads required.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Open the Subtitle Merger",
          text: "Go to subtitlesedit.com/subtitle-merger in any modern web browser. No account or installation is required.",
          url: "https://subtitlesedit.com/subtitle-merger",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Choose your subtitle files",
          text: "Click Choose Files and select two or more SRT or VTT subtitle files from your device. Files can be added in any order.",
          url: "https://subtitlesedit.com/subtitle-merger",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Select output format and merge",
          text: "Choose SRT or WebVTT from the Output Format dropdown, then click Merge Files. The tool sorts every cue by start time, combines the files, and renumbers cues automatically.",
          url: "https://subtitlesedit.com/subtitle-merger",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Download the merged file",
          text: "Click Download to save the combined subtitle file to your device.",
          url: "https://subtitlesedit.com/subtitle-merger",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-merger#faq",
      mainEntity: [
        { "@type": "Question", name: "How do I merge SRT files into one subtitle file?", acceptedAnswer: { "@type": "Answer", text: "Choose your SRT files in any order, then click Merge Files. The tool sorts every cue by its start time, combines them into one clean SRT file, and renumbers the cues automatically." } },
        { "@type": "Question", name: "Can I merge VTT or WebVTT subtitle files?", acceptedAnswer: { "@type": "Answer", text: "Yes. The subtitle merger supports both VTT and WebVTT files." } },
        { "@type": "Question", name: "Does this subtitle merger work with different languages?", acceptedAnswer: { "@type": "Answer", text: "Yes. The tool merges subtitles in any language, such as English, Spanish, Arabic, or Hindi, including mixed-language tracks, without affecting characters, accents, or Unicode formatting." } },
        { "@type": "Question", name: "Can I merge subtitle files offline in my browser?", acceptedAnswer: { "@type": "Answer", text: "Yes. All merging happens locally in your browser using JavaScript. Nothing uploads to a server, making this a private, offline-friendly merging tool." } },
        { "@type": "Question", name: "Can I edit the merged subtitle file afterward?", acceptedAnswer: { "@type": "Answer", text: "Yes. After merging, you can open the combined file in any subtitle editor, or in tools like the Subtitle Splitter or Subtitle Time Shifter, or your preferred text editor." } },
        { "@type": "Question", name: "Does the tool renumber cues automatically?", acceptedAnswer: { "@type": "Answer", text: "Yes. SRT cue numbers are automatically renumbered from start to finish in the correct sequence, so your merged file stays clean and structured. VTT output does not use numeric cue indexes." } },
        { "@type": "Question", name: "Will merging change the timing of subtitles?", acceptedAnswer: { "@type": "Answer", text: "No. Every cue keeps its exact original timestamps; the tool only sorts and combines, it never re-times anything. If two files cover overlapping time ranges, their cues are interleaved by start time but not adjusted, so use the Subtitle Overlap Fixer afterward if cues collide." } },
        { "@type": "Question", name: "Can I merge subtitles for multi-part episodes or movies?", acceptedAnswer: { "@type": "Answer", text: "Yes, as long as the timestamps of each part continue in sequence. The tool orders every cue by its absolute start time, so if Part 2 and Part 3 each restart at 00:00 their cues will interleave with Part 1. Shift each later part with the Subtitle Time Shifter first, then merge." } },
        { "@type": "Question", name: "Does merging affect formatting such as italics or line breaks?", acceptedAnswer: { "@type": "Answer", text: "Inline formatting carries over, including italics, bold, line breaks, and speaker labels. Note that VTT cue settings such as line: or align:, and named cue identifiers, are not carried into the merged file; only the timing and text are kept." } },
        { "@type": "Question", name: "Can I merge large SRT files with thousands of lines?", acceptedAnswer: { "@type": "Answer", text: "Yes. The tool handles large subtitle files efficiently because merging happens directly in your browser without server limits." } },
        { "@type": "Question", name: "How do I merge subtitles from different software or platforms?", acceptedAnswer: { "@type": "Answer", text: "Export your subtitles as SRT or VTT and choose them in the tool. It merges files from YouTube, Adobe Premiere, DaVinci Resolve, Aegisub, and any subtitle generator." } },
        { "@type": "Question", name: "Is the subtitle merger a software or an online tool?", acceptedAnswer: { "@type": "Answer", text: "The subtitle merger behaves like offline software but runs in your browser. All processing is local, so it is technically an online tool with offline functionality." } },
        { "@type": "Question", name: "Does the tool support both SRT and VTT merging equally well?", acceptedAnswer: { "@type": "Answer", text: "Yes. Both formats merge accurately and you can mix SRT and VTT inputs. Timestamps and cue numbering are handled based on the output format you choose." } },
        { "@type": "Question", name: "What is the best way to merge subtitles without losing data?", acceptedAnswer: { "@type": "Answer", text: "Use clean, well-formatted files whose timestamps run in sequence, or shift later parts first. Because the tool orders cues by start time, files with continuous, non-overlapping timing merge seamlessly into one file." } },
        { "@type": "Question", name: "Why do some merged files show duplicates or gaps?", acceptedAnswer: { "@type": "Answer", text: "Duplicates can occur if two files contain cues at similar timestamps, since the tool does not remove repeats. Gaps appear when there is a long time difference between file segments." } },
        { "@type": "Question", name: "Can this tool replace a professional subtitle editor?", acceptedAnswer: { "@type": "Answer", text: "No. This tool merges subtitles only. For rewriting text, fixing grammar, adjusting timing, or editing styles, use a full subtitle editor." } },
        { "@type": "Question", name: "Is it safe to merge subtitles directly in my browser?", acceptedAnswer: { "@type": "Answer", text: "Yes. Your files never leave your device. Nothing is uploaded, stored, or processed on a server, making the tool secure for personal and professional work." } },
        { "@type": "Question", name: "Can I merge subtitles and then convert them to another format?", acceptedAnswer: { "@type": "Answer", text: "Yes. You can set the output format to SRT or WebVTT before merging, or run the merged file through the SRT to VTT Converter or VTT to SRT Converter afterward." } },
      ],
    },
  ],
};

const converterActionBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

function MergerTool() {
  const [fileNames, setFileNames] = useState([]);

  const handleFilesChosen = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFileNames(files.map((f) => f.name));
  };

  return (
    <section className="se-scope mx-auto my-8 max-w-[820px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]">
      <p className="mb-4 mt-1 text-[#6b7280]">
        Combine multiple .srt/.vtt files chronologically. 100% browser-based.
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label
          htmlFor="mergeFormat"
          className="min-w-[120px] text-sm font-medium text-[#111827]"
        >
          Output format
        </label>
        <select
          id="mergeFormat"
          className="rounded-[10px] border border-gray-200 bg-white px-3 py-2.5 text-[#475569] shadow-sm"
        >
          <option value="srt">SRT</option>
          <option value="vtt">WebVTT (.vtt)</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          id="mergeFiles"
          className="sr-only"
          accept=".srt,.vtt,text/plain"
          multiple
          type="file"
          onChange={handleFilesChosen}
        />
        <label
          htmlFor="mergeFiles"
          className={`${converterActionBtnClass} cursor-pointer`}
        >
          Choose Files
        </label>
        <button type="button" id="btnMerge" className={converterActionBtnClass}>
          Merge Files
        </button>
      </div>

      {fileNames.length > 0 ? (
        <div
          className="mb-4 rounded-[10px] border border-gray-200 bg-[#f8fafc] p-3 text-sm text-[#334155]"
          aria-live="polite"
        >
          <p className="mb-1 font-medium text-[#111827]">
            {fileNames.length} file{fileNames.length === 1 ? "" : "s"} added
          </p>
          <ul className="list-disc pl-5">
            {fileNames.map((name, i) => (
              <li key={`${name}-${i}`} className="break-all">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <textarea
        id="mergeOut"
        className="mt-4 min-h-[280px] w-full rounded-[10px] border border-gray-200 p-3 font-mono text-sm leading-relaxed text-[#334155]"
        rows={12}
        placeholder="Merged output..."
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          id="btnMergeDownload"
          className={converterActionBtnClass}
        >
          Download
        </button>
        <button
          type="button"
          id="btnMergeCopy"
          className={converterActionBtnClass}
        >
          Copy
        </button>
        <button
          type="button"
          id="btnMergeClear"
          className={`${converterActionBtnClass} ml-2`}
          onClick={() => setFileNames([])}
        >
          Clear
        </button>
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
    id: "e-n-accordion-item-1800",
    open: true,
    q: "How do I merge SRT files into one subtitle file?",
    body: (
      <p>
        Choose your SRT files in any order, then click Merge Files. The tool sorts
        every cue by its start time, combines them into one clean SRT file, and
        renumbers the cues automatically.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1801",
    q: "Can I merge VTT or WebVTT subtitle files?",
    body: <p>Yes. The subtitle merger supports both VTT and WebVTT files.</p>,
  },
  {
    id: "e-n-accordion-item-1802",
    q: "Does this subtitle merger work with different languages?",
    body: (
      <p>
        Yes. The tool merges subtitles in any language, such as English, Spanish,
        Arabic, or Hindi, including mixed-language tracks, without affecting
        characters, accents, or Unicode formatting.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1803",
    q: "Can I merge subtitle files offline in my browser?",
    body: (
      <p>
        Yes. All merging happens locally in your browser using JavaScript. Nothing
        uploads to a server, making this a private, offline-friendly merging tool.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1804",
    q: "Can I edit the merged subtitle file afterward?",
    body: (
      <p>
        Yes. After merging, you can open the combined file in any subtitle editor, or
        in tools like the{" "}
        <a href="/subtitle-splitter" className={linkClass}>Subtitle Splitter</a> or{" "}
        <a href="/subtitle-time-shifter" className={linkClass}>Subtitle Time Shifter</a>,
        or your preferred text editor.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1805",
    q: "Does the tool renumber cues automatically?",
    body: (
      <p>
        Yes. SRT cue numbers are automatically renumbered from start to finish in the
        correct sequence, so your merged file stays clean and structured. VTT output
        does not use numeric cue indexes.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1806",
    q: "Will merging change the timing of subtitles?",
    body: (
      <p>
        No. Every cue keeps its exact original timestamps; the tool only sorts and
        combines, it never re-times anything. If two files cover overlapping time
        ranges, their cues are interleaved by start time but not adjusted, so use the{" "}
        <a href="/subtitle-overlap-fixer" className={linkClass}>Subtitle Overlap Fixer</a>{" "}
        afterward if cues collide.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1807",
    q: "Can I merge subtitles for multi-part episodes or movies?",
    body: (
      <p>
        Yes, as long as the timestamps of each part continue in sequence. The tool
        orders every cue by its absolute start time, so if Part 2 and Part 3 each
        restart at 00:00 their cues will interleave with Part 1. Shift each later part
        with the{" "}
        <a href="/subtitle-time-shifter" className={linkClass}>Subtitle Time Shifter</a>{" "}
        first, then merge.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1808",
    q: "Does merging affect formatting such as italics or line breaks?",
    body: (
      <p>
        Inline formatting carries over, including italics, bold, line breaks, and
        speaker labels. Note that VTT cue settings such as line: or align:, and named
        cue identifiers, are not carried into the merged file; only the timing and text
        are kept.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-1809",
    q: "Can I merge large SRT files with thousands of lines?",
    body: (
      <p>
        Yes. The tool handles large subtitle files efficiently because merging happens
        directly in your browser without server limits.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18010",
    q: "How do I merge subtitles from different software or platforms?",
    body: (
      <p>
        Export your subtitles as SRT or VTT and choose them in the tool. It merges
        files from YouTube, Adobe Premiere, DaVinci Resolve, Aegisub, and any subtitle
        generator.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18011",
    q: "Is the subtitle merger a software or an online tool?",
    body: (
      <p>
        The subtitle merger behaves like offline software but runs in your browser. All
        processing is local, so it is technically an online tool with offline
        functionality.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18012",
    q: "Does the tool support both SRT and VTT merging equally well?",
    body: (
      <p>
        Yes. Both formats merge accurately and you can mix SRT and VTT inputs.
        Timestamps and cue numbering are handled based on the output format you choose.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18013",
    q: "What is the best way to merge subtitles without losing data?",
    body: (
      <p>
        Use clean, well-formatted files whose timestamps run in sequence, or shift later
        parts first. Because the tool orders cues by start time, files with continuous,
        non-overlapping timing merge seamlessly into one file.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18014",
    q: "Why do some merged files show duplicates or gaps?",
    body: (
      <p>
        Duplicates can occur if two files contain cues at similar timestamps, since the
        tool does not remove repeats. Gaps appear when there is a long time difference
        between file segments.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18015",
    q: "Can this tool replace a professional subtitle editor?",
    body: (
      <p>
        No. This tool merges subtitles only. For rewriting text, fixing grammar,
        adjusting timing, or editing styles, use a full subtitle editor.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18016",
    q: "Is it safe to merge subtitles directly in my browser?",
    body: (
      <p>
        Yes. Your files never leave your device. Nothing is uploaded, stored, or
        processed on a server, making the tool secure for personal and professional
        work.
      </p>
    ),
  },
  {
    id: "e-n-accordion-item-18017",
    q: "Can I merge subtitles and then convert them to another format?",
    body: (
      <p>
        Yes. You can set the output format to SRT or WebVTT before merging, or run the
        merged file through the{" "}
        <a href="/srt-to-vtt-converter" className={linkClass}>SRT to VTT Converter</a> or{" "}
        <a href="/vtt-to-srt-converter" className={linkClass}>VTT to SRT Converter</a>{" "}
        afterward.
      </p>
    ),
  },
];

export default function SubtitleMergerPage() {
  return (
    <Layout>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link rel="canonical" href="https://subtitlesedit.com/subtitle-merger" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content="https://subtitlesedit.com/subtitle-merger" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:secure_url" content={OG_IMG} />
        <meta property="og:image:alt" content="Subtitle Merger" />
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
        src="/wp-content/uploads/tools/extras/subtitle-merger-page.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-55"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1
                className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                itemProp="headline"
              >
                Subtitle Merger to Merge Subtitles Instantly (SRT &amp; VTT)
              </h1>
            </header>

            <div className="entry-content clear px-0" itemProp="text">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <MergerTool />
                <ToolPageGradientHero
                  headline="Merge Subtitle Files Online Free"
                  subheadline="Combine multiple .srt or .vtt subtitle files into one — fast and free in your browser."
                />
              </div>

              <div className={`${section} entry-content se-content`}>
                <h2 className={h2}>
                  What a Subtitle Merger Does and When You Need It
                </h2>
                <p className={p}>
                  A subtitle merger combines two or more subtitle
                  files into one continuous file. If you{"\u2019"}re working with
                  split videos, multi-language subtitles, or separate caption
                  tracks, merging subtitles keeps your workflow simple and
                  organized.
                </p>
                <p className={p}>
                  Merge multiple subtitle files into one clean, structured SRT or VTT
                  file in seconds. This subtitle
                  merger helps you combine subtitles quickly and accurately{" "}
                  {"\u2014"} ideal for multi-part videos, translations,
                  compilations, and editing workflows. Everything runs offline in
                  your browser for maximum speed and privacy.
                </p>

                <h3 className={h3}>
                  Combining Multiple SRT or VTT Files Into One
                </h3>
                <p className={p}>
                  This tool merges <strong>SRT, VTT or WebVTT</strong> files
                  smoothly, ensuring your subtitles remain readable and properly
                  structured.
                </p>

                <h3 className={h3}>
                  Merging Subtitles for Multi-Part Videos or Episodes
                </h3>
                <p className={p}>
                  If your video was exported as Part 1 and Part 2, your subtitles
                  may also be split. Merging them creates a seamless subtitle file
                  for the full video.
                </p>

                <h3 className={h3}>
                  Creating a Single File for Translation or Editing
                </h3>
                <p className={p}>
                  Many translators and editors prefer one file instead of multiple
                  parts. This tool lets you merge subtitles before sending them for
                  editing.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  How to Merge Subtitle Files (Quick Step-by-Step Guide)
                </h2>
                <p className={p}>
                  <strong>Merging subtitles</strong> with this tool takes just a
                  few seconds.
                </p>

                <h3 className={h3}>
                  1. Choose Multiple SRT/VTT Files
                </h3>
                <p className={p}>
                  Add your subtitle files in any order. The tool supports both{" "}
                  <strong>SRT and VTT formats</strong>.
                </p>

                <h3 className={h3}>
                  2. Merge Subtitles and Download the Combined File
                </h3>
                <p className={p}>
                  Click {"\u201c"}
                  <strong>Merge Files</strong>
                  ,{"\u201d"} and the tool instantly generates a new subtitle file.
                  Download it and use it in your video editor or player.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Key Features of Our Subtitles Merger Tool
                </h2>
                <p className={p}>
                  This subtitle merger is built for simple, accurate combining of{" "}
                  <strong>multiple subtitle files</strong> {"\u2014"} without extra
                  steps or complex settings.
                </p>

                <h3 className={h3}>
                  Supports SRT, VTT OR WebVTT Files
                </h3>
                <p className={p}>
                  You can merge any combination of SRT and VTT files. The tool
                  reads formatting and timing correctly for both formats. You can
                  learn more about{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/SubRip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <strong>SRT</strong>
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.w3.org/TR/webvtt1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    <strong>WebVTT</strong>
                  </a>{" "}
                  formats by clicking on them.
                </p>

                <h3 className={h3}>
                  Accurate Merging and Automatic Cue Renumbering
                </h3>
                <p className={p}>
                  After merging, cue numbers are renumbered in the correct sequence
                  so your file stays clean and readable.
                </p>

                <h3 className={h3}>
                  100% Offline Subtitle Merging in Your Browser
                </h3>
                <p className={p}>
                  Your files never leave your device. All processing happens{" "}
                  <strong>locally</strong>, ensuring full privacy and instant
                  results.
                </p>

                <h3 className={h3}>
                  Fast Output With No File Uploads or Size Limits
                </h3>
                <p className={p}>
                  Since everything runs in your browser, there are{" "}
                  <strong>no server limits or delays</strong>. Large subtitle
                  files merge as quickly as small ones.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>What Happens During a Subtitle Merge?</h2>
                <p className={p}>
                  Understanding how the subtitle merger works helps you trust the
                  accuracy of the final output.
                </p>

                <h3 className={h3}>How Timestamp Ranges Are Preserved</h3>
                <p className={p}>
                  Each subtitle file keeps its <strong>original timestamps</strong>
                  . If your files already follow sequential time ranges, merging is
                  seamless.
                </p>

                <h3 className={h3}>How Formatting Is Kept Intact</h3>
                <p className={p}>
                  Line breaks, italics, bold, and inline text formatting are preserved
                  so the merged file reads correctly in media players. VTT positioning
                  and cue settings are not carried over {"\u2014"} only the timing and
                  text are kept.
                </p>
                <p data-start="3897" data-end="4016"> </p>

                <h2 className={h2}>
                  Handling Common Subtitle Merge Scenarios
                </h2>
                <p className={p}>
                  Whether you{"\u2019"}re combining two files or ten, the tool
                  handles standard subtitle merge cases reliably.
                </p>

                <h3 className={h3}>
                  Merging Subtitles for Split Videos (Part 1, Part 2, Part 3)
                </h3>
                <p className={p}>
                  If each part continues in sequence, merging produces a single,
                  continuous subtitle file. Because cues are ordered by absolute start
                  time, a later part that restarts at 00:00 will interleave with the
                  first {"\u2014"} shift it with the{" "}
                  <a href="/subtitle-time-shifter" className={linkClass}>
                    Subtitle Time Shifter
                  </a>{" "}
                  before merging.
                </p>

                <h3 className={h3}>
                  Combining Multi-Language Subtitle Tracks
                </h3>
                <p data-start="4429" data-end="4530">
                  You can merge different language versions into one file for
                  multilingual editing or translation work.
                </p>

                <h3 className={h3}>
                  Joining SRT Files With Sequential Time Ranges
                </h3>
                <p className={p}>
                  If each file covers a different portion of the timeline, the tool
                  joins them cleanly <strong>without overlaps</strong>.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>
                  Editing or Adjusting Files After Merging
                </h2>
                <p className={p}>
                  While the subtitle merger combines files, you may want to refine
                  your subtitles further.
                </p>

                <h3 className={h3}>How to Fix Overlaps or Gaps</h3>
                <p className={p}>
                  In rare cases where timestamps overlap, you can use an{" "}
                  <strong>overlap fixer</strong> or <strong>time shifter</strong>{" "}
                  to correct timing.
                </p>

                <h3 className={h3}>
                  When Timing Adjustment Is Needed After a Merge
                </h3>
                <p className={p}>
                  If the merged file doesn{"\u2019"}t match your video perfectly,
                  use a subtitle time shifter to apply a global offset.
                </p>
                <p className={p}> </p>

                <h2 className={h2}>Related Subtitle Tools</h2>
                <p className={p}>
                  In addition to the subtitle merger, we have these tools for editing
                  subtitles:
                </p>
                <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
                  <li>
                    <a href="/subtitle-time-shifter" className={linkClass}>
                      Subtitle Time Shifter
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
                  <li>
                    <a href="/subtitle-overlap-fixer" className={linkClass}>
                      Subtitle Overlap Fixer
                    </a>
                  </li>
                </ul>

                <h2 className={h2}>
                  Why Choose SubtitlesEdit.com for Subtitle Merging?
                </h2>

                <h3 className={h3}>
                  Private: Everything Happens Offline
                </h3>
                <p className={p}>
                  Your subtitle files remain on your <strong>device</strong> the
                  entire time.
                </p>

                <h3 className={h3}>
                  Reliable: Clean, Structured Output
                </h3>
                <p className={p}>
                  The final merged file maintains proper formatting, cue numbering,
                  and readability.
                </p>

                <h3 className={h3}>
                  Creator-Friendly: Simple, Fast, and Accurate
                </h3>
                <p className={p}>
                  This tool is built for content creators, editors, translators,
                  and anyone who needs to <strong>merge subtitles</strong> without
                  complexity.
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

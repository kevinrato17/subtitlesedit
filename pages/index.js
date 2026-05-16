import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const p = "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const code =
  "rounded bg-[#ECEFF3] px-1.5 py-0.5 text-sm font-normal text-[#111827]";

const toolCardClasses =
  "group flex h-full min-h-[140px] flex-col justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9]";

function ToolGrid() {
  const tools = [
    {
      href: "/srt-to-vtt-converter",
      name: "SRT to VTT Converter",
      desc: "Convert .srt to browser-native .vtt",
      aria: "Open SRT to VTT Converter",
    },
    {
      href: "/vtt-to-srt-converter",
      name: "VTT to SRT Converter",
      desc: "Convert .vtt files back to .srt",
      aria: "Open VTT to SRT Converter",
    },
    {
      href: "/sbv-to-srt-converter",
      name: "SBV to SRT Converter",
      desc: "Convert YouTube SBV captions to universal SRT format",
      aria: "Open SBV to SRT Converter",
    },
    {
      href: "/srt-to-sbv-converter",
      name: "SRT to SBV Converter",
      desc: "Convert SRT subtitles to YouTube's SBV caption format",
      aria: "Open SRT to SBV Converter",
    },
    {
      href: "/srt-to-txt-converter",
      name: "SRT to TXT Converter",
      desc: "Extract plain text from .srt files",
      aria: "Open SRT to TXT Converter",
    },
    {
      href: "/vtt-to-txt-converter",
      name: "VTT to TXT Converter",
      desc: "Extract plain text from .vtt files",
      aria: "Open VTT to TXT Converter",
    },
    {
      href: "/subtitle-time-shifter",
      name: "Subtitle Time Shifter",
      desc: "Shift timestamps forward or back",
      aria: "Open Subtitle Time Shifter",
    },
    {
      href: "/subtitle-drift-stabilizer",
      name: "AI Subtitle Drift Stabilizer",
      desc: "Fix subtitles that drift progressively out of sync, common in AI-generated videos. Anchor-based scaling.",
      aria: "Open AI Subtitle Drift Stabilizer tool",
    },
    {
      href: "/bilingual-subtitle-interleaver",
      name: "Bilingual Subtitle Interleaver",
      desc: "Merge two subtitle files into one with both languages stacked — perfect for language learners.",
      aria: "Open Bilingual Subtitle Interleaver",
    },
    {
      href: "/subtitle-tag-stripper",
      name: "Subtitle Tag Stripper",
      desc: "Strip HTML tags, color codes, position tags, and SDH annotations from SRT/VTT files.",
      aria: "Open the Subtitle Tag Stripper tool",
    },
    {
      href: "/subtitle-line-length-limiter",
      name: "Subtitle Line Length Limiter",
      desc: "Reformat subtitle files to Netflix, BBC, or custom line length standards. Splits long cues automatically.",
      aria: "Open the Subtitle Line Length Limiter tool",
    },
    {
      href: "/subtitle-merger",
      name: "Subtitle Merger",
      desc: "Combine multiple .srt or .vtt files",
      aria: "Open Subtitle Merger",
    },
    {
      href: "/subtitle-splitter",
      name: "Subtitle Splitter",
      desc: "Split long subtitles into parts",
      aria: "Open Subtitle Splitter",
    },
    {
      href: "/subtitle-overlap-fixer",
      name: "Subtitle Overlap Fixer",
      desc: "Detect and fix overlapping cues",
      aria: "Open Subtitle Overlap Fixer",
    },
    {
      href: "/subtitle-encoding-fixer",
      name: "Subtitle Encoding Fixer",
      desc: "Fix mojibake, weird characters, and garbled text in subtitle files.",
      aria: "Open Subtitle Encoding Fixer",
    },
    {
      href: "/subtitle-find-replace",
      name: "Subtitle Find & Replace",
      desc: "Find and replace text across SRT, VTT, and TXT files with regex support. Timestamps stay untouched.",
      aria: "Open Subtitle Find & Replace",
    },
  ];

  return (
    <section
      id="tools"
      className={section}
      aria-labelledby="tools-heading"
    >
      <h2 id="tools-heading" className={h2}>
        Our Free Subtitle Tools
      </h2>
      <p className={`${p} mb-8 max-w-3xl`}>
        Pick a tool to open its dedicated page. Each utility focuses on one job—
        format conversion, timing, merging, splitting, or overlap cleanup—so you
        land on the right controls immediately. If you are unsure where to start,
        match the task name to what your file needs (for example, WebVTT for an
        HTML5 player versus SRT for an editing timeline), then adjust timing or
        structure afterward if required.
      </p>
      <nav
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Subtitle tools"
      >
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={toolCardClasses}
            aria-label={t.aria}
          >
            <h3 className="text-lg font-semibold text-[#0ea5e9] transition-colors group-hover:text-sky-600">
              {t.name}
            </h3>
            <p className="mt-2 text-sm leading-snug text-[#64748b]">{t.desc}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
}

function FaqAccordion() {
  const itemTitle =
    "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";
  const body = "pb-4 pl-1 text-[#334155] leading-relaxed";

  const rows = [
    {
      id: "e-n-accordion-item-1190",
      open: true,
      q: " What is SubtitlesEdit.com? ",
      children: (
        <p>
          SubtitlesEdit.com is a free collection of fast, browser-based subtitle
          tools that let you convert, edit, merge, split, fix, and adjust
          subtitle timing instantly without installing any software.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1191",
      q: " Do I need to upload my subtitle files to use the tools? ",
      children: (
        <p>
          No. All tools run entirely inside your browser using JavaScript. Your
          SRT or VTT files never leave your device, ensuring full privacy and
          security.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1192",
      q: " Which subtitle formats do your tools support? ",
      children: (
        <p>
          Currently, SubtitlesEdit.com supports SRT (SubRip) and VTT (WebVTT) —
          the two most widely used subtitle formats for YouTube, HTML5 video
          players, e-learning platforms, and editing software.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1193",
      q: " Is the SRT to VTT Converter free to use? ",
      children: (
        <p>
          Yes. Every tool on SubtitlesEdit.com — including the SRT to VTT
          Converter — is 100% free and requires no sign-up, no credit card, and
          no file uploads.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1194",
      q: " Can I convert VTT back to SRT? ",
      children: (
        <>
          <p>
            Absolutely. Use the VTT to SRT Converter for fast and accurate
            conversions in both directions.
          </p>
          <hr className="my-4 border-gray-200" />
          <p> </p>
        </>
      ),
    },
    {
      id: "e-n-accordion-item-1195",
      q: " What if my subtitles are out of sync? ",
      children: (
        <p>
          Use the Subtitle Time Shifter tool to delay or advance all subtitle
          timestamps by any number of seconds — including decimals for precise
          synchronization.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1196",
      q: " Can I merge two or more subtitle files? ",
      children: (
        <p>
          Yes. The Subtitle Merger lets you combine multiple SRT or VTT files
          into one, preserving cue order and syncing timestamps correctly.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1197",
      q: " How can I split a large subtitle file? ",
      children: (
        <p>
          The Subtitle Splitter allows you to break large SRT or VTT files into
          smaller parts based on cue count or time duration.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1198",
      q: " What if my subtitles have overlapping timestamps? ",
      children: (
        <p>
          The Overlap Fixer tool automatically detects overlaps and adjusts
          timings to ensure subtitles display correctly during playback.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1199",
      q: " Does SubtitlesEdit.com work on all devices? ",
      children: (
        <p>
          Yes. All tools work on desktop, laptop, tablets, and mobile browsers —
          including Chrome, Safari, Firefox, Edge, and Opera.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-11910",
      q: " Are there any usage limits or restrictions? ",
      children: (
        <p>
          No limits. You can convert, edit, merge, split, or fix as many subtitle
          files as you want, anytime, completely free.
        </p>
      ),
    },
  ];

  return (
    <div className="divide-y divide-gray-100" aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys">
      {rows.map((row) => (
        <details key={row.id} id={row.id} className="group" open={row.open}>
          <summary className={itemTitle}>
            <span>{row.q}</span>
            <span className="shrink-0 text-[#046bd2]">
              <span className="hidden group-open:inline">−</span>
              <span className="inline group-open:hidden">+</span>
            </span>
          </summary>
          <div className={body}>{row.children}</div>
        </details>
      ))}
    </div>
  );
}

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SubtitlesEdit.com Tools",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "SRT to VTT Converter",
      url: "https://subtitlesedit.com/srt-to-vtt-converter",
      description:
        "Convert SubRip (.srt) subtitle files to WebVTT (.vtt) format directly in your browser.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "VTT to SRT Converter",
      url: "https://subtitlesedit.com/vtt-to-srt-converter",
      description:
        "Convert WebVTT (.vtt) files to SubRip (.srt) format directly in your browser.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "SBV to SRT Converter",
      url: "https://subtitlesedit.com/sbv-to-srt-converter",
      description:
        "Convert YouTube SBV captions to SRT format for use in any video player or subtitle editor.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "SRT to SBV Converter",
      url: "https://subtitlesedit.com/srt-to-sbv-converter",
      description:
        "Convert SRT subtitle files to YouTube's native SBV caption format for clean YouTube Studio uploads.",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "SRT to TXT Converter",
      url: "https://subtitlesedit.com/srt-to-txt-converter",
      description:
        "Extract clean plain text from SRT subtitle files, stripping timestamps and indices.",
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "VTT to TXT Converter",
      url: "https://subtitlesedit.com/vtt-to-txt-converter",
      description:
        "Extract clean plain text from VTT subtitle files, stripping timestamps and cue identifiers.",
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Subtitle Time Shifter",
      url: "https://subtitlesedit.com/subtitle-time-shifter",
      description:
        "Shift all subtitle timestamps forward or backward by a fixed offset.",
    },
    {
      "@type": "ListItem",
      position: 8,
      name: "Subtitle Merger",
      url: "https://subtitlesedit.com/subtitle-merger",
      description:
        "Combine multiple SRT or VTT files into a single subtitle file with continuous numbering.",
    },
    {
      "@type": "ListItem",
      position: 9,
      name: "Subtitle Splitter",
      url: "https://subtitlesedit.com/subtitle-splitter",
      description:
        "Split a long subtitle file into smaller parts by time or entry count.",
    },
    {
      "@type": "ListItem",
      position: 10,
      name: "Subtitle Overlap Fixer",
      url: "https://subtitlesedit.com/subtitle-overlap-fixer",
      description:
        "Detect and automatically fix overlapping subtitle entries.",
    },
    {
      "@type": "ListItem",
      position: 11,
      name: "Subtitle Encoding Fixer",
      url: "https://subtitlesedit.com/subtitle-encoding-fixer",
      description:
        "Fix garbled characters and mojibake in subtitle files caused by encoding mismatches.",
    },
    {
      "@type": "ListItem",
      position: 12,
      name: "Subtitle Find & Replace",
      url: "https://subtitlesedit.com/subtitle-find-replace",
      description:
        "Find and replace text across SRT, VTT, and TXT subtitle files with regex and case-sensitive options. Runs entirely in your browser.",
    },
    {
      "@type": "ListItem",
      position: 13,
      name: "AI Subtitle Drift Stabilizer",
      url: "https://subtitlesedit.com/subtitle-drift-stabilizer",
      description:
        "Fix subtitles that drift progressively out of sync using anchor-based geometric scaling.",
    },
    {
      "@type": "ListItem",
      position: 14,
      name: "Bilingual Subtitle Interleaver",
      url: "https://subtitlesedit.com/bilingual-subtitle-interleaver",
      description:
        "Merge two subtitle files into one dual-language file for language learning.",
    },
    {
      "@type": "ListItem",
      position: 15,
      name: "Subtitle Tag Stripper",
      url: "https://subtitlesedit.com/subtitle-tag-stripper",
      description:
        "Strip HTML tags, color codes, position tags, and SDH annotations from SRT/VTT files.",
    },
    {
      "@type": "ListItem",
      position: 16,
      name: "Subtitle Line Length Limiter",
      url: "https://subtitlesedit.com/subtitle-line-length-limiter",
      description:
        "Reformat subtitle files to Netflix, BBC, or custom line length standards. Splits long cues automatically.",
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Free Online Subtitle Editing Tools | Subtitles Edit</title>
        <meta
          name="description"
          content="Free online subtitle editing tools to convert, shift, merge, split, and fix SRT/VTT subtitles instantly in your browser with no uploads."
        />
        <link rel="canonical" href="https://subtitlesedit.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdItemList),
          }}
        />
      </Head>

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-48"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <div className="entry-content clear px-0" itemProp="text">
              <div className="px-4 pb-2 pt-10 sm:px-6 lg:px-[3rem]">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
                  <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    Free Online Subtitle Editing Tools
                  </h1>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
                    Convert SRT and VTT, fix timing, merge or split cues, and
                    download results in your browser with no uploads.
                  </p>
                  <a
                    href="#tools"
                    className="mt-8 inline-flex items-center justify-center rounded-lg border-2 border-white/80 bg-white px-6 py-3 text-sm font-semibold text-[#0ea5e9] shadow-sm transition-colors hover:border-white hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore tools
                  </a>
                </div>
              </div>

              <ToolGrid />

              <div className={section}>
                <p className={p}>
                  <strong>Subtitles Edit</strong> is a set of lightweight subtitle
                  tools for everyday caption work: convert subtitles between
                  formats, extract readable text from cue lists, fix subtitle
                  timing after edits, merge tracks for multi-part projects, split
                  long lines, and resolve overlaps before publishing. They are
                  meant for editors, translators, students, and creators who want
                  predictable output without installing heavyweight desktop suites.
                </p>
                <p className={p}>
                  The utilities focus on <strong>SRT</strong> and{" "}
                  <strong>VTT (WebVTT)</strong>, the pair you will see across most
                  editors, browsers, and hosting stacks. Open a tool, load a file
                  via drag-and-drop or the file picker (or paste where the page
                  supports it), then copy or download the result. There are no
                  accounts or watermarks, and processing stays on your device—no
                  mandatory uploads.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Why Subtitles Edit?</h2>
                <p className={`${p} max-w-3xl`}>
                  Most subtitle fixes are repetitive: shift the clock after a new
                  intro, convert for delivery, or merge translated lines without
                  touching video exports. These pages aim to make those moves
                  predictable—small interfaces, explicit outputs, and client-side
                  execution so you can stay inside your existing workflow.
                </p>
                <ul className="mb-0 list-disc space-y-3 pl-5 text-[#334155] marker:text-[#0ea5e9]">
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      100% browser-based
                    </strong>{" "}
                    — nothing is uploaded to a server; processing runs locally in
                    JavaScript.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      Works offline once loaded
                    </strong>{" "}
                    — after the page is cached, you can keep working without a
                    network connection.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      No signups, no accounts, no watermarks
                    </strong>{" "}
                    — open a tool and start immediately.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      Free forever
                    </strong>{" "}
                    — the full workflow stays free; there are no tiered features
                    or trial timers.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      Fast and lightweight
                    </strong>{" "}
                    — minimal UI overhead and straight-line conversions help keep
                    pages responsive and aligned with Core Web Vitals goals.
                  </li>
                  <li>
                    <strong className="font-semibold text-[#1e293b]">
                      Privacy-first by design
                    </strong>{" "}
                    — your subtitles are not stored remotely or used for
                    analytics by these tools.
                  </li>
                </ul>
              </div>

              <div className={section}>
                <h2 className={h2}>How It Works</h2>
                <p className={`${p} mb-6 max-w-3xl`}>
                  The flow stays consistent from tool to tool: choose what you are
                  trying to accomplish, bring your cues into the page, apply the
                  adjustment, then export or copy the outcome. You can jump back to
                  the grid anytime—nothing locks you into a multi-step wizard.
                </p>
                <ol className="mb-0 list-decimal space-y-6 pl-5 text-[#334155] marker:font-semibold marker:text-[#0ea5e9]">
                  <li>
                    <p className="mb-1 font-semibold text-[#1e293b]">
                      Choose a tool from the grid above
                    </p>
                    <p className="mb-0 text-[#334155]">
                      Each page handles one task—conversion, shifting, merging,
                      splitting, or overlap fixes—so you skip dashboard clutter.
                      When you need multiple passes (for example, convert VTT to SRT,
                      then shift timing), run them as separate, quick steps.
                    </p>
                  </li>
                  <li>
                    <p className="mb-1 font-semibold text-[#1e293b]">
                      Load your subtitle file by drag-and-drop, file picker, or
                      paste
                    </p>
                    <p className="mb-0 text-[#334155]">
                      Inputs vary by tool—some encourage paste for tiny snippets,
                      others expect a full file—but nothing forces an upload to a
                      remote server. Keep working entirely inside your session if
                      that matches your security requirements.
                    </p>
                  </li>
                  <li>
                    <p className="mb-1 font-semibold text-[#1e293b]">
                      Convert, edit, or fix instantly — then copy or download the
                      result
                    </p>
                    <p className="mb-0 text-[#334155]">
                      Use previews where provided to sanity-check cues, then save a
                      fresh <code className={code}>.srt</code> or{" "}
                      <code className={code}>.vtt</code> file or copy plain text for
                      downstream scripts and editors.
                    </p>
                  </li>
                </ol>
              </div>

              <div className={section}>
                <h2 className={h2}>Supported Subtitle Formats</h2>
                <p className={`${p} max-w-3xl`}>
                  SRT is the interchange format you will see in most desktop
                  editors and translation workflows. VTT is the web-native choice
                  for HTML5 video, many CDNs, and platforms that expect a{" "}
                  <code className={code}>WEBVTT</code> header and millisecond
                  timestamps. Use the table below to compare syntax at a glance.
                </p>
                <div className="mb-0 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full min-w-[280px] border-collapse text-left text-sm text-[#334155]">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="border-b border-slate-200 px-4 py-3 font-semibold text-[#1e293b]">
                          Format
                        </th>
                        <th className="border-b border-slate-200 px-4 py-3 font-semibold text-[#1e293b]">
                          Example Timestamp
                        </th>
                        <th className="border-b border-slate-200 px-4 py-3 font-semibold text-[#1e293b]">
                          Common Use
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border-b border-slate-200 px-4 py-3 align-top">
                          <strong>SRT (SubRip)</strong>
                        </td>
                        <td className="border-b border-slate-200 px-4 py-3 align-top">
                          <code className={code}>
                            00:01:05,230 --&gt; 00:01:09,450
                          </code>
                        </td>
                        <td className="border-b border-slate-200 px-4 py-3 align-top">
                          Used by editors, translators, and most video software
                        </td>
                      </tr>
                      <tr className="bg-slate-50/80">
                        <td className="px-4 py-3 align-top">
                          <strong>VTT (WebVTT)</strong>
                        </td>
                        <td className="px-4 py-3 align-top">
                          <code className={code}>
                            00:01:05.230 --&gt; 00:01:09.450
                          </code>
                        </td>
                        <td className="px-4 py-3 align-top">
                          Used by browsers, HTML5 video, YouTube, and Vimeo
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={`${p} mb-0 max-w-3xl`}>
                  When you convert subtitles between these formats, timestamp
                  precision is preserved where the specifications align—note the
                  comma separator in SRT versus the dot in WebVTT. Headers and cue
                  numbering differ as well: expect a simple numbered block for SRT
                  and an optional <code className={code}>WEBVTT</code> preamble for
                  VTT. Picking the right target upfront avoids rework when you hand
                  files to collaborators who only accept one dialect.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Frequently Asked Questions</h2>
                <FaqAccordion />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

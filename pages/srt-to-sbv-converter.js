import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const META_TITLE = "SRT to SBV Converter — Free YouTube Subtitle Tool";
const META_DESC =
  "Convert SRT subtitles to YouTube SBV format free online. Browser-based, no upload. Strips unsupported styling for clean YouTube Studio upload.";
const OG_URL = "https://subtitlesedit.com/srt-to-sbv-converter";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp";

const pageSchema = {
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
      alternateName: "SubtitlesEdit.com",
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/srt-to-sbv-converter#breadcrumb",
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
          name: "SRT to SBV Converter",
          item: "https://subtitlesedit.com/srt-to-sbv-converter",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/srt-to-sbv-converter#webpage",
      url: "https://subtitlesedit.com/srt-to-sbv-converter",
      name: META_TITLE,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": "https://subtitlesedit.com/#logo" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/srt-to-sbv-converter#breadcrumb",
      },
      mainEntity: {
        "@id": "https://subtitlesedit.com/srt-to-sbv-converter#tool",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/srt-to-sbv-converter#tool",
      name: "SRT to SBV Converter",
      url: "https://subtitlesedit.com/srt-to-sbv-converter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements:
        "Requires a modern web browser with JavaScript enabled",
      description:
        "Free browser-based tool that converts SubRip (SRT) subtitle files into YouTube's SBV caption format. Runs entirely client-side with no file uploads; it reformats timestamps and strips styling tags that SBV cannot store.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Convert SRT subtitles to SBV in the browser",
        "100% client-side processing with no file uploads",
        "Automatically strips unsupported styling tags",
        "Reformats timestamps to SBV's start,end structure",
        "Copy the output or download a .sbv file",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/srt-to-sbv-converter#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does YouTube prefer SBV over SRT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube officially supports both SRT and SBV, so SBV gives no ranking or processing advantage on its own. SBV simply mirrors what YouTube Studio's caption editor writes internally, so workflows that round-trip files through the Studio interface sometimes feel smoother when the file already matches that shape.",
          },
        },
        {
          "@type": "Question",
          name: "What styling tags get removed during conversion?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The converter strips basic SubRip-style markup such as italics, bold, underline, and font wrappers, because SBV has no field to store them. Every other character on the dialogue line is preserved exactly once those tags are removed, so only the formatting disappears and never the words.",
          },
        },
        {
          "@type": "Question",
          name: "Is my subtitle file uploaded to a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The entire conversion runs in your browser with JavaScript, so your SRT file never leaves your device or touches a server. This makes the tool safe for confidential transcripts, unreleased videos, and client work, and it also means conversion is instant with no waiting on uploads.",
          },
        },
        {
          "@type": "Question",
          name: "What does the SBV timestamp format look like?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SBV writes each cue's timing on one line as start,end with a comma between them, like 0:00:01.000,0:00:04.000. The hour has no leading zero, milliseconds follow a period instead of a comma, and there is no arrow. This converter reformats your SRT timestamps into that exact pattern.",
          },
        },
        {
          "@type": "Question",
          name: "Will YouTube auto-translate my SBV captions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Auto-translation is a separate YouTube Studio feature tied to your video and language settings, not something this converter controls. Uploading SBV instead of SRT does not change whether YouTube offers machine translations; it only changes the file structure you hand to the importer.",
          },
        },
        {
          "@type": "Question",
          name: "Can I keep italics or bold text in YouTube captions?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube's default caption renderer ignores most rich formatting, so viewers rarely see true italics or bold on the watch page regardless of file format. Stripping those tags for SBV therefore costs little in real presentation; the change is cosmetic while the spoken text stays identical.",
          },
        },
        {
          "@type": "Question",
          name: "Why am I getting an \"Invalid SRT format\" error?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That message means a cue is missing its timestamp line or the timing is not in standard SRT form (00:00:01,000 to 00:00:04,000 joined by an arrow). Check for stray blank lines, a missing arrow, or commas swapped for periods. Repairing the timing line and re-pasting usually clears the error.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert SBV back to SRT later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. If you need to move the file back into desktop subtitle software, use our SBV to SRT Converter, which restores cue numbers and SubRip-style timestamps. Round-tripping is safe because both formats store the same timing and plain dialogue; only the cue indices and styling differ between them.",
          },
        },
        {
          "@type": "Question",
          name: "What is the maximum file size YouTube accepts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "YouTube adjusts its limits over time, so check the current Studio upload dialog if you are near an extreme. In practice subtitle files are tiny next to video, so size is rarely an issue. If an SRT is unusually large, split its cues in a dedicated editor before converting here.",
          },
        },
        {
          "@type": "Question",
          name: "Can I edit the SBV file before uploading?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, SBV is plain text. Download it from this tool, adjust the wording in any text editor, then upload it through YouTube Studio. As long as each cue keeps its timestamp line in the start,end pattern, YouTube parses the edited file exactly as it parsed the converter's output.",
          },
        },
        {
          "@type": "Question",
          name: "Which browsers and devices does this work on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The converter runs in any modern browser such as Chrome, Edge, Firefox, or Safari, on Windows, macOS, Linux, Android, or iOS. No installation, extension, or account is needed. On mobile you can paste SRT text directly into the input box if selecting a file is awkward on your device.",
          },
        },
        {
          "@type": "Question",
          name: "How do I upload the SBV file to YouTube Studio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In YouTube Studio open your video, go to Subtitles, choose the language, then select the option to upload a file with timing. Pick the .sbv file this tool produced and save. The captions appear on the cue timeline ready for you to review before you publish the video.",
          },
        },
      ],
    },
  ],
};

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const SRT_TS =
  /^(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})$/;

const STRIP_STYLING_TAGS = /<\/?(?:i|b|u|font[^>]*)>/gi;

function normalizeInput(text) {
  let s = typeof text === "string" ? text : "";
  if (s.length > 0 && s.charCodeAt(0) === 0xfeff) {
    s = s.slice(1);
  }
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  s = s.trimEnd();
  return s;
}

function srtTimestampToSbvLine(h1, mm1, ss1, ms1, h2, mm2, ss2, ms2) {
  const sh1 = String(parseInt(h1, 10));
  const sh2 = String(parseInt(h2, 10));
  const a = `${sh1}:${mm1}:${ss1}.${ms1}`;
  const b = `${sh2}:${mm2}:${ss2}.${ms2}`;
  return `${a},${b}`;
}

function stripDialogueLine(line) {
  return line.replace(STRIP_STYLING_TAGS, "");
}

/** @returns {{ ok: true, out: string } | { ok: false, error: string }} */
function convertSrtToSbv(normalized) {
  if (!normalized) {
    return { ok: false, error: "File is empty" };
  }
  const rawBlocks = normalized.split(/\n\s*\n/);
  const blocks = rawBlocks.filter((b) => b.trim().length > 0);
  if (blocks.length === 0) {
    return { ok: false, error: "File is empty" };
  }
  const sbvParts = [];
  for (let i = 0; i < blocks.length; i++) {
    const cueNum = i + 1;
    const lines = blocks[i].split("\n");
    if (lines.length < 2) {
      return {
        ok: false,
        error: `Invalid SRT format at cue ${cueNum}`,
      };
    }
    const tsLine = lines[1].trim();
    const dialogueLines = lines.slice(2).map(stripDialogueLine);
    const m = tsLine.match(SRT_TS);
    if (!m) {
      return {
        ok: false,
        error: `Invalid SRT format at cue ${cueNum}`,
      };
    }
    const [, h1, mm1, ss1, ms1, h2, mm2, ss2, ms2] = m;
    const timeLine = srtTimestampToSbvLine(
      h1,
      mm1,
      ss1,
      ms1,
      h2,
      mm2,
      ss2,
      ms2,
    );
    const body = dialogueLines.join("\n");
    sbvParts.push(`${timeLine}\n${body}`.trimEnd());
  }
  return { ok: true, out: sbvParts.join("\n\n") };
}

function downloadName(original, ext) {
  const dot = original.lastIndexOf(".");
  const base = dot > 0 ? original.slice(0, dot) : original || "subtitle";
  return `${base}${ext}`;
}

const converterActionBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

const textareaBaseClass =
  "w-full border border-slate-300 rounded-lg p-4 font-mono whitespace-pre-wrap resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 h-80";

function SrtToSbvTool() {
  const fileInputRef = useRef(null);
  const [fontSize, setFontSize] = useState(16);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [convertedContent, setConvertedContent] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const runConversion = useCallback(() => {
    if (!fileContent) {
      setConvertedContent("");
      setError("");
      return;
    }
    const normalized = normalizeInput(fileContent);
    const result = convertSrtToSbv(normalized);
    if (result.ok) {
      setConvertedContent(result.out);
      setError("");
    } else {
      setConvertedContent("");
      setError(result.error);
    }
  }, [fileContent]);

  useEffect(() => {
    runConversion();
  }, [runConversion]);

  const loadFile = useCallback((file) => {
    if (!file) return;
    setError("");
    setConvertedContent("");
    setCopied(false);
    const reader = new FileReader();
    reader.onload = () => {
      const raw =
        typeof reader.result === "string" ? reader.result : "";
      const normalized = normalizeInput(raw);
      setFileName(file.name);
      if (!normalized) {
        setFileContent("");
        setError("File is empty");
        return;
      }
      setFileContent(normalized);
    };
    reader.onerror = () => {
      setFileName("");
      setFileContent("");
      setConvertedContent("");
      setError("Could not read the file.");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
    e.target.value = "";
  };

  const onTextareaDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onTextareaDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f);
  };

  const clearAll = () => {
    setFileContent("");
    setConvertedContent("");
    setFileName("");
    setError("");
    setCopied(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hasOutput = Boolean(convertedContent && !error);

  const copyOutput = async () => {
    if (!hasOutput) return;
    try {
      await navigator.clipboard.writeText(convertedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy to clipboard.");
    }
  };

  const downloadOutput = () => {
    if (!hasOutput) return;
    const name = fileName
      ? downloadName(fileName, ".sbv")
      : "converted.sbv";
    const blob = new Blob([convertedContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fontStyle = { fontSize: `${fontSize}px` };

  return (
    <>
      <div
        className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
        id="srt-sbv-tool"
        aria-label="SRT to SBV converter tool"
      >
        <div className="mb-2 flex flex-wrap items-center justify-start gap-3">
          <div>
            <label
              htmlFor="srt-sbv-font-size"
              className="mr-1 text-xs text-[#555555]"
            >
              Font size
            </label>
            <select
              id="srt-sbv-font-size"
              value={String(fontSize)}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="rounded border border-gray-300 px-1.5 py-1 text-sm"
            >
              {[12, 14, 16, 18, 20, 24].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="ml-1 text-xs text-[#777777]">px</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
            <div className="min-w-0">
              <div className="my-1 font-semibold text-slate-700">
                Paste SRT or choose a file
              </div>
              <div className="mb-2">
                <input
                  ref={fileInputRef}
                  id="srt-to-sbv-file"
                  type="file"
                  accept=".srt,.txt,text/plain"
                  className="sr-only"
                  onChange={onInputChange}
                />
                <label
                  htmlFor="srt-to-sbv-file"
                  className={`${converterActionBtnClass} cursor-pointer`}
                >
                  Choose file
                </label>
              </div>
              <textarea
                id="srt-original-input"
                className={textareaBaseClass}
                style={fontStyle}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                onDragOver={onTextareaDragOver}
                onDrop={onTextareaDrop}
                placeholder="Paste SRT here..."
                spellCheck={false}
                aria-label="SRT input"
              />
              <div className="mt-1.5 text-xs text-slate-500">
                Accepted: .srt or .txt. Output will be below.
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={converterActionBtnClass}
                  onClick={runConversion}
                >
                  Convert
                </button>
                <button
                  type="button"
                  className={converterActionBtnClass}
                  onClick={clearAll}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="min-w-0">
              <div className="my-1 font-semibold text-slate-700">
                Converted Output (SBV)
              </div>
              <textarea
                id="srt-sbv-converted-output"
                readOnly
                className={`${textareaBaseClass} bg-white`}
                style={fontStyle}
                value={convertedContent}
                placeholder="Output will appear here..."
                spellCheck={false}
                aria-live="polite"
                aria-label="Converted SBV output"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  className={converterActionBtnClass}
                  onClick={copyOutput}
                  disabled={!hasOutput}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  type="button"
                  className={converterActionBtnClass}
                  onClick={downloadOutput}
                  disabled={!hasOutput}
                >
                  Download .sbv
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <p
          className="mx-auto mb-4 max-w-[980px] text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </>
  );
}

export default function SrtToSbvConverterPage() {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={OG_URL} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={OG_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta property="og:image" content={OG_IMG} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>

      <Layout>
        <div className="mx-auto max-w-[1240px] bg-white">
          <main id="main" className="site-main">
            <article
              className="ast-article-single"
              id="post-srt-to-sbv"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
                <h1
                  className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                  itemProp="headline"
                >
                  SRT to SBV Converter
                </h1>
              </header>
              <div className="entry-content clear px-0" itemProp="text">
                <div className="px-4 sm:px-6 lg:px-[3rem]">
                  <SrtToSbvTool />
                  <div
                    className="mx-auto mb-6 max-w-[980px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500"
                    role="note"
                  >
                    Note: SBV doesn&apos;t support sequence numbers or styling
                    tags (
                    <span className="font-mono">&lt;i&gt;</span>,{" "}
                    <span className="font-mono">&lt;b&gt;</span>,{" "}
                    <span className="font-mono">&lt;u&gt;</span>,{" "}
                    <span className="font-mono">&lt;font&gt;</span>). This
                    converter strips them automatically. Timing and dialogue text
                    are preserved exactly.
                  </div>
                </div>

          <section className={section} aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading" className={h2}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  1
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b]">
                  Drop your SRT file
                </h3>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Upload any standard .srt file. Processing happens entirely in
                  your browser.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  2
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b]">
                  Automatic conversion
                </h3>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Sequence numbers and unsupported HTML-style tags are stripped.
                  Timestamps are reformatted to SBV&apos;s{" "}
                  <span className="font-mono text-sm">
                    H:MM:SS.mmm,H:MM:SS.mmm
                  </span>{" "}
                  structure.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  3
                </div>
                <h3 className="text-lg font-semibold text-[#1e293b]">
                  Download or copy
                </h3>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Save the SBV file ready for upload to YouTube Studio&apos;s
                  caption editor.
                </p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="changes-heading">
            <h2 id="changes-heading" className={h2}>
              SBV vs SRT: What Actually Changes
            </h2>
            <p className={p}>
              SRT and SBV store the same thing — timed lines of dialogue — but
              they write it differently. Converting between them touches exactly
              three things, and none of them change what your viewers read on
              screen.
            </p>
            <p className={p}>
              <strong>Cue numbers are dropped.</strong> SRT numbers every cue
              (1, 2, 3 and so on); SBV has no such field, and YouTube ignores
              those indices anyway, so removing them changes nothing.
            </p>
            <p className={p}>
              <strong>Timestamps are reshaped.</strong> SRT writes a cue as{" "}
              <span className="font-mono text-sm">
                00:00:01,000 --&gt; 00:00:04,000
              </span>
              , with a comma before the milliseconds and an arrow between the
              two times. SBV writes the same moment as{" "}
              <span className="font-mono text-sm">
                0:00:01.000,0:00:04.000
              </span>{" "}
              — a period before the milliseconds and a single comma joining the
              start and end.
            </p>
            <p className={p}>
              <strong>Styling tags are stripped.</strong> SBV cannot store
              inline markup, so italics, bold, underline, and font tags are
              removed while the words between them stay intact.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  SRT input
                </div>
                <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <code>{`1
00:00:01,000 --> 00:00:04,000
<i>Welcome</i> to the channel.

2
00:00:04,500 --> 00:00:07,200
Don't forget to subscribe.`}</code>
                </pre>
              </div>
              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  SBV output
                </div>
                <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  <code>{`0:00:01.000,0:00:04.000
Welcome to the channel.

0:00:04.500,0:00:07.200
Don't forget to subscribe.`}</code>
                </pre>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="context-heading">
            <h2 id="context-heading" className={h2}>
              Why convert SRT to SBV?
            </h2>
            <p className={p}>
              YouTube Studio accepts several caption formats—SRT, VTT, SBV, TTML,
              and more—but SBV is YouTube&apos;s native timed-text dialect and
              tends to upload with the fewest parser surprises when you are
              moving files in and out of the built-in editor.
            </p>
            <p className={p}>
              SRT files that include inline styling tags often upload fine, yet
              those tags can show up literally or behave inconsistently in edge
              cases inside YouTube&apos;s renderer. Converting to SBV first
              removes unsupported markup while keeping the spoken words and
              frame-accurate timings identical, which is ideal when captions were
              authored in desktop subtitle software and need a predictable Studio
              import.
            </p>
            <p className={p}>
              Teams use this path to batch-prepare captions for a channel,
              align uploads across languages and regional accounts, and guarantee
              clean rendering before publishing. The conversion is mostly
              lossless: only the numeric cue indices (which YouTube ignores) and
              inline styling tags (which SBV cannot represent) disappear—timing
              and plain dialogue remain intact.
            </p>
          </section>

          <section className={section} aria-labelledby="who-heading">
            <h2 id="who-heading" className={h2}>
              Who Uses This
            </h2>
            <p className={p}>
              Anyone preparing captions for YouTube can use an SBV file, but a
              few workflows lean on it more than others.
            </p>
            <p className={p}>
              <strong>Channel owners and editors</strong> who caption videos in
              desktop subtitle software often export SRT, then convert to SBV
              for a predictable import into YouTube Studio.{" "}
              <strong>Multilingual teams</strong> batch-prepare caption files
              across languages and regional accounts so every upload behaves the
              same way. <strong>Freelance captioners and agencies</strong>{" "}
              deliver clean, Studio-ready files to clients without asking them to
              install anything.
            </p>
            <p className={p}>
              Because the conversion happens entirely in your browser, it also
              suits anyone working with sensitive material — review copies,
              unreleased episodes, or confidential interviews — where uploading a
              transcript to a third-party server is not an option.
            </p>
          </section>

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={`${h3} mt-0`}>Does YouTube prefer SBV over SRT?</h3>
                <p className={p}>
                  YouTube officially supports both SRT and SBV, so SBV gives no
                  ranking or processing advantage on its own. SBV simply mirrors
                  what YouTube Studio&apos;s caption editor writes internally, so
                  workflows that round-trip files through the Studio interface
                  sometimes feel smoother when the file already matches that
                  shape.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  What styling tags get removed during conversion?
                </h3>
                <p className={p}>
                  The converter strips basic SubRip-style markup such as italics,
                  bold, underline, and font wrappers — for example{" "}
                  <span className="font-mono text-sm">&lt;i&gt;</span>,{" "}
                  <span className="font-mono text-sm">&lt;b&gt;</span>,{" "}
                  <span className="font-mono text-sm">&lt;u&gt;</span>, and{" "}
                  <span className="font-mono text-sm">&lt;font ...&gt;</span> —
                  because SBV has no field to store them. Every other character
                  on the dialogue line is preserved exactly once those tags are
                  removed.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Is my subtitle file uploaded to a server?
                </h3>
                <p className={p}>
                  No. The entire conversion runs in your browser with
                  JavaScript, so your SRT file never leaves your device or
                  touches a server. This makes the tool safe for confidential
                  transcripts, unreleased videos, and client work, and it also
                  means conversion is instant with no waiting on uploads.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  What does the SBV timestamp format look like?
                </h3>
                <p className={p}>
                  SBV writes each cue&apos;s timing on one line as{" "}
                  <span className="font-mono text-sm">start,end</span> with a
                  comma between them, like{" "}
                  <span className="font-mono text-sm">
                    0:00:01.000,0:00:04.000
                  </span>
                  . The hour has no leading zero, milliseconds follow a period
                  instead of a comma, and there is no arrow. This converter
                  reformats your SRT timestamps into that exact pattern.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Will YouTube auto-translate my SBV captions?
                </h3>
                <p className={p}>
                  Auto-translation is a separate YouTube Studio feature tied to
                  your video and language settings, not something this converter
                  controls. Uploading SBV instead of SRT does not change whether
                  YouTube offers machine translations; it only changes the file
                  structure you hand to the importer.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I keep italics or bold text in YouTube captions?
                </h3>
                <p className={p}>
                  YouTube&apos;s default caption renderer ignores most rich
                  formatting, so viewers rarely see true italics or bold on the
                  watch page regardless of file format. Stripping those tags for
                  SBV therefore costs little in real presentation; the change is
                  cosmetic while the spoken text stays identical.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Why am I getting an &quot;Invalid SRT format&quot; error?
                </h3>
                <p className={p}>
                  That message means a cue is missing its timestamp line or the
                  timing is not in standard SRT form (
                  <span className="font-mono text-sm">
                    00:00:01,000 --&gt; 00:00:04,000
                  </span>
                  ). Check for stray blank lines, a missing arrow, or commas
                  swapped for periods. Repairing the timing line and re-pasting
                  usually clears the error.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I convert SBV back to SRT later?
                </h3>
                <p className={p}>
                  Yes. If you need to move the file back into desktop subtitle
                  software, use our{" "}
                  <Link
                    href="/sbv-to-srt-converter"
                    className="text-sky-600 underline hover:text-sky-700"
                  >
                    SBV to SRT Converter
                  </Link>
                  , which restores cue numbers and SubRip-style timestamps.
                  Round-tripping is safe because both formats store the same
                  timing and plain dialogue; only the cue indices and styling
                  differ.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  What is the maximum file size YouTube accepts?
                </h3>
                <p className={p}>
                  YouTube adjusts its limits over time, so check the current
                  Studio upload dialog if you are near an extreme. In practice
                  subtitle files are tiny next to video, so size is rarely an
                  issue. If an SRT is unusually large, split its cues in a
                  dedicated editor before converting here.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I edit the SBV file before uploading?
                </h3>
                <p className={p}>
                  Yes, SBV is plain text. Download it from this tool, adjust the
                  wording in any text editor, then upload it through YouTube
                  Studio. As long as each cue keeps its timestamp line in the{" "}
                  <span className="font-mono text-sm">start,end</span> pattern,
                  YouTube parses the edited file exactly as it parsed the
                  converter&apos;s output.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Which browsers and devices does this work on?
                </h3>
                <p className={p}>
                  The converter runs in any modern browser such as Chrome, Edge,
                  Firefox, or Safari, on Windows, macOS, Linux, Android, or iOS.
                  No installation, extension, or account is needed. On mobile you
                  can paste SRT text directly into the input box if selecting a
                  file is awkward on your device.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  How do I upload the SBV file to YouTube Studio?
                </h3>
                <p className={p}>
                  In YouTube Studio open your video, go to Subtitles, choose the
                  language, then select the option to upload a file with timing.
                  Pick the .sbv file this tool produced and save. The captions
                  appear on the cue timeline ready for you to review before you
                  publish the video.
                </p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="related-heading">
            <h2 id="related-heading" className={h2}>
              Related Tools
            </h2>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <li>
                <Link
                  href="/srt-to-vtt-converter"
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-base font-semibold text-sky-600">
                    SRT to VTT Converter
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Move the same cues into WebVTT for the web.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/srt-to-txt-converter"
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-base font-semibold text-sky-600">
                    SRT to TXT Converter
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Export dialogue-only transcripts in seconds.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-find-replace"
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-base font-semibold text-sky-600">
                    Subtitle Find &amp; Replace
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Clean up terminology before you convert.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-time-shifter"
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-base font-semibold text-sky-600">
                    Subtitle Time Shifter
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Align every cue if your source edit shifted audio.
                  </p>
                </Link>
              </li>
            </ul>
          </section>
              </div>
            </article>
          </main>
        </div>
      </Layout>
    </>
  );
}

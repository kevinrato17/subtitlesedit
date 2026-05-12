import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const META_TITLE = "SRT to SBV Converter — Free YouTube Subtitle Tool";
const META_DESC =
  "Convert SRT subtitles to YouTube SBV format free online. Browser-based, no upload. Strips unsupported styling for clean YouTube Studio upload.";
const OG_URL = "https://subtitlesedit.com/srt-to-sbv-converter";

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

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={`${h3} mt-0`}>
                  Does YouTube prefer SBV over SRT?
                </h3>
                <p className={p}>
                  YouTube officially supports both, so you will not get “extra
                  points” for SBV alone. Where SBV helps is familiarity: it
                  mirrors what the Studio editor writes internally, so some
                  workflows—especially when round-tripping through the caption
                  UI—feel smoother when the file already matches that shape.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  What styling tags get removed during conversion?
                </h3>
                <p className={p}>
                  This tool strips basic SubRip-style markup such as italics,
                  bold, underline, and font wrappers—for example{" "}
                  <span className="font-mono text-sm">&lt;i&gt;</span>,{" "}
                  <span className="font-mono text-sm">&lt;b&gt;</span>,{" "}
                  <span className="font-mono text-sm">&lt;u&gt;</span>, and{" "}
                  <span className="font-mono text-sm">&lt;font ...&gt;</span>{" "}
                  pairs—because SBV has nowhere to store them. Everything else on
                  the dialogue line stays byte-for-byte once those tags are gone.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Will YouTube auto-translate my SBV captions?
                </h3>
                <p className={p}>
                  Auto-translation in YouTube is a separate Studio feature tied
                  to your video settings and available languages, not something
                  this converter toggles on or off. Uploading SBV versus SRT does
                  not change whether YouTube offers machine translations; it only
                  changes the file structure you hand to the importer.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I keep italics or bold text in YouTube captions?
                </h3>
                <p className={p}>
                  Even when you leave styling tags inside an SRT, YouTube&apos;s
                  default caption renderer ignores most rich formatting—viewers
                  rarely see true italics or bold on watch pages regardless of
                  format. Stripping those tags for SBV therefore costs you little
                  in real-world presentation; the change is cosmetic while the
                  spoken text stays identical.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  What&apos;s the maximum file size YouTube accepts?
                </h3>
                <p className={p}>
                  YouTube adjusts limits over time, so always check the current
                  Studio upload dialog if you are near extremes. In practice,
                  subtitle files are tiny compared to video uploads; if your SRT
                  is unusually large because of massive speaker logs, consider
                  splitting cues in a dedicated editor before converting here.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I edit the SBV file before uploading?
                </h3>
                <p className={p}>
                  Absolutely—SBV is plain text. Download from this tool, tweak
                  wording in any editor, then upload through YouTube Studio. As
                  long as you keep each cue&apos;s timestamp line in the{" "}
                  <span className="font-mono text-sm">
                    start,end
                  </span>{" "}
                  pattern, YouTube will continue to parse it the same way this
                  converter generated it.
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

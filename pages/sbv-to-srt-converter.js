import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";

const META_TITLE = "SBV to SRT Converter — Free YouTube Caption Tool";
const META_DESC =
  "Convert YouTube SBV captions to SRT format free in your browser. No upload, no signup. Works with multi-line cues and preserves timing exactly.";
const OG_URL = "https://subtitlesedit.com/sbv-to-srt-converter";

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const SBV_TS =
  /^(\d+):(\d{2}):(\d{2})\.(\d{3}),(\d+):(\d{2}):(\d{2})\.(\d{3})$/;

function normalizeInput(text) {
  let s = typeof text === "string" ? text : "";
  if (s.length > 0 && s.charCodeAt(0) === 0xfeff) {
    s = s.slice(1);
  }
  s = s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  s = s.trimEnd();
  return s;
}

function padHour(h) {
  return String(parseInt(h, 10)).padStart(2, "0");
}

function sbvTimestampToSrtLine(h1, mm1, ss1, ms1, h2, mm2, ss2, ms2) {
  const start = `${padHour(h1)}:${mm1}:${ss1},${ms1}`;
  const end = `${padHour(h2)}:${mm2}:${ss2},${ms2}`;
  return `${start} --> ${end}`;
}

/** @returns {{ ok: true, out: string } | { ok: false, error: string }} */
function convertSbvToSrt(normalized) {
  if (!normalized) {
    return { ok: false, error: "File is empty" };
  }
  const rawBlocks = normalized.split(/\n\s*\n/);
  const blocks = rawBlocks.filter((b) => b.trim().length > 0);
  if (blocks.length === 0) {
    return { ok: false, error: "File is empty" };
  }
  const srtParts = [];
  for (let i = 0; i < blocks.length; i++) {
    const cueNum = i + 1;
    const lines = blocks[i].split("\n");
    const tsLine = (lines[0] ?? "").trim();
    const dialogueLines = lines.slice(1);
    const m = tsLine.match(SBV_TS);
    if (!m) {
      return {
        ok: false,
        error: `Invalid SBV format at cue ${cueNum}`,
      };
    }
    const [, h1, mm1, ss1, ms1, h2, mm2, ss2, ms2] = m;
    const timeLine = sbvTimestampToSrtLine(
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
    srtParts.push(
      `${cueNum}\n${timeLine}\n${body}`.trimEnd(),
    );
  }
  return { ok: true, out: srtParts.join("\n\n") };
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

function SbvToSrtTool() {
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
    const result = convertSbvToSrt(normalized);
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
      ? downloadName(fileName, ".srt")
      : "converted.srt";
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
        id="sbv-srt-tool"
        aria-label="SBV to SRT converter tool"
      >
        <div className="mb-2 flex flex-wrap items-center justify-start gap-3">
          <div>
            <label
              htmlFor="sbv-srt-font-size"
              className="mr-1 text-xs text-[#555555]"
            >
              Font size
            </label>
            <select
              id="sbv-srt-font-size"
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
                Paste SBV or choose a file
              </div>
              <div className="mb-2">
                <input
                  ref={fileInputRef}
                  id="sbv-to-srt-file"
                  type="file"
                  accept=".sbv,.txt,text/plain"
                  className="sr-only"
                  onChange={onInputChange}
                />
                <label
                  htmlFor="sbv-to-srt-file"
                  className={`${converterActionBtnClass} cursor-pointer`}
                >
                  Choose file
                </label>
              </div>
              <textarea
                id="sbv-original-input"
                className={textareaBaseClass}
                style={fontStyle}
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                onDragOver={onTextareaDragOver}
                onDrop={onTextareaDrop}
                placeholder="Paste SBV here..."
                spellCheck={false}
                aria-label="SBV input"
              />
              <div className="mt-1.5 text-xs text-slate-500">
                Accepted: .sbv or .txt. Output will be below.
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
                Converted Output (SRT)
              </div>
              <textarea
                id="sbv-converted-output"
                readOnly
                className={`${textareaBaseClass} bg-white`}
                style={fontStyle}
                value={convertedContent}
                placeholder="Output will appear here..."
                spellCheck={false}
                aria-live="polite"
                aria-label="Converted SRT output"
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
                  Download .srt
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

export default function SbvToSrtConverterPage() {
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
              id="post-sbv-to-srt"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
                <h1
                  className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]"
                  itemProp="headline"
                >
                  SBV to SRT Converter
                </h1>
              </header>
              <div className="entry-content clear px-0" itemProp="text">
                <div className="px-4 sm:px-6 lg:px-[3rem]">
                  <SbvToSrtTool />
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
                  Drop your SBV file
                </h3>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Upload the .sbv file exported from YouTube Studio or any other
                  source. Everything runs in your browser — no upload.
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
                  The tool reads each cue, adds sequence numbers, and reformats
                  the timestamps to SRT standard. Multi-line dialogue stays
                  intact.
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
                  Save the SRT file ready for VLC, Premiere Pro, DaVinci Resolve,
                  or any standard subtitle player.
                </p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="context-heading">
            <h2 id="context-heading" className={h2}>
              Why convert SBV to SRT?
            </h2>
            <p className={p}>
              SBV is YouTube&apos;s native caption format—the one you work with
              in YouTube Studio&apos;s caption editor when you export or manage
              timed text for a video. It is compact and web-friendly, but it is
              not what most desktop editors and players expect when you step
              outside the YouTube ecosystem.
            </p>
            <p className={p}>
              Almost every other video application—VLC, Premiere Pro, DaVinci
              Resolve, Final Cut, Plex, and most web players—expects SRT (or
              VTT), not SBV. That mismatch shows up constantly when you need to
              re-upload captions to a non-YouTube platform, archive captions in a
              portable format, or open them in subtitle software that simply does
              not list SBV as an import option.
            </p>
            <p className={p}>
              Converting SBV to SRT with this tool is a clean, lossless
              structural change: every cue and every millisecond of timing is
              preserved, while the file becomes compatible with the tools your
              workflow already uses.
            </p>
          </section>

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={`${h3} mt-0`}>What is an SBV file?</h3>
                <p className={p}>
                  SBV (SubViewer-style timing used by YouTube) is a plain-text
                  caption format where each cue starts with a single line of
                  start and end times separated by a comma, followed by one or
                  more dialogue lines. YouTube Studio generates and understands
                  SBV natively, which is why exports from the caption editor often
                  arrive as .sbv.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Where does YouTube store SBV files I&apos;ve created?
                </h3>
                <p className={p}>
                  Your captions live with the video inside YouTube Studio, not as
                  a permanent “download folder” on your channel page. YouTube
                  does not expose a simple always-on SBV download link in every
                  region anymore; most creators grab a file from the caption
                  editor&apos;s{" "}
                  <strong className="font-semibold text-[#1e293b]">
                    Actions → Download
                  </strong>{" "}
                  menu after opening the subtitle track, or they rely on
                  third-party download tools when that menu is unavailable.
                  This converter then turns that SBV export into universal SRT.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Will my caption timing change after conversion?
                </h3>
                <p className={p}>
                  No. The parser reads each SBV timestamp exactly as written and
                  rewrites it in SRT&apos;s required hour-minute-second-millisecond
                  layout. Millisecond values are not rounded or recalculated, so
                  what you hear in YouTube should line up the same in any player
                  that respects SRT timing.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Does this tool work with non-English subtitles?
                </h3>
                <p className={p}>
                  Yes. The conversion only touches structure and timecodes, not
                  language. Any Unicode dialogue—Cyrillic, Arabic, CJK
                  characters, accented Latin, emoji—passes through unchanged as
                  long as your source file is valid UTF-8, which is what modern
                  browsers assume when reading the file locally.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Can I convert multiple SBV files at once?
                </h3>
                <p className={p}>
                  The page is built around one file at a time so previews stay
                  fast and readable. For a batch of videos, run the converter
                  once per SBV export; each pass still stays fully private because
                  nothing ever leaves your browser tab.
                </p>
              </div>
              <div>
                <h3 className={`${h3} mt-0`}>
                  Why doesn&apos;t my video player accept SBV directly?
                </h3>
                <p className={p}>
                  Most general-purpose players implement SubRip (SRT) and WebVTT
                  first because those formats dominate broadcast, streaming, and
                  authoring tools. SBV remained closely tied to YouTube&apos;s own
                  pipelines, so desktop players often never added a parser. SRT
                  gives you the same words and times in a format they already
                  ship with.
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
                    Turn SRT files into WebVTT for HTML5 video.
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
                    Nudge every cue earlier or later in one pass.
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
                    Bulk-edit dialogue without touching timecodes.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-encoding-fixer"
                  className="block h-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-base font-semibold text-sky-600">
                    Subtitle Encoding Fixer
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Repair mojibake before you convert or upload.
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

import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Layout from "@/components/Layout";

const CANONICAL = "https://subtitlesedit.com/subtitle-drift-stabilizer";
const META_DESC =
  "Fix subtitles that drift progressively out of sync, common in AI-generated videos. Anchor-based geometric scaling. Free, browser-based, no upload.";

const section = "mx-auto max-w-4xl px-4 mt-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const ol = "mb-4 list-decimal pl-5 text-[#334155] space-y-2";

const TIMING_LINE_RE =
  /^(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})(.*)$/gm;

const TS_RE = /^(\d{2}):(\d{2}):(\d{2})([,.])(\d{3})$/;

function stripBOM(text) {
  if (!text) return "";
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function firstNonBlankLine(text) {
  const lines = text.split(/\r\n|\n|\r/);
  for (const line of lines) {
    if (line.trim().length > 0) return line.trim();
  }
  return "";
}

/** @returns {'srt' | 'vtt'} */
function detectFormat(text) {
  const s = stripBOM(text);
  const first = firstNonBlankLine(s);
  if (/^WEBVTT\b/i.test(first)) return "vtt";
  return "srt";
}

/**
 * @param {string} raw
 * @returns {number | null} ms
 */
function parseTimestamp(raw) {
  const s = String(raw).trim();
  const m = s.match(TS_RE);
  if (!m) return null;
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ss = parseInt(m[3], 10);
  const ms = parseInt(m[5], 10);
  if (
    mm > 59 ||
    ss > 59 ||
    ms > 999 ||
    Number.isNaN(hh) ||
    Number.isNaN(mm) ||
    Number.isNaN(ss) ||
    Number.isNaN(ms)
  ) {
    return null;
  }
  return ((hh * 60 + mm) * 60 + ss) * 1000 + ms;
}

/**
 * @param {number} ms
 * @param {'srt' | 'vtt'} format
 */
function formatTimestamp(ms, format) {
  const clamped = Math.max(0, Math.round(ms));
  const h = Math.floor(clamped / 3600000);
  const rem = clamped % 3600000;
  const m = Math.floor(rem / 60000);
  const rem2 = rem % 60000;
  const s = Math.floor(rem2 / 1000);
  const milli = rem2 % 1000;
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  const sep = format === "vtt" ? "." : ",";
  return `${pad(h)}:${pad(m)}:${pad(s)}${sep}${pad(milli, 3)}`;
}

function findFirstCueStart(text) {
  const s = stripBOM(text);
  TIMING_LINE_RE.lastIndex = 0;
  const m = TIMING_LINE_RE.exec(s);
  return m ? m[1] : null;
}

function findLastCueEnd(text) {
  const s = stripBOM(text);
  let last = null;
  let m;
  TIMING_LINE_RE.lastIndex = 0;
  while ((m = TIMING_LINE_RE.exec(s)) !== null) {
    last = m[2];
  }
  return last;
}

/**
 * @param {string} text
 * @param {number} x1ms
 * @param {number} y1ms
 * @param {number} scale
 * @param {'srt' | 'vtt'} outFormat
 */
function applyDriftScaling(text, x1ms, y1ms, scale, outFormat) {
  TIMING_LINE_RE.lastIndex = 0;
  return text.replace(
    TIMING_LINE_RE,
    (full, startStr, endStr, rest = "") => {
      const t0 = parseTimestamp(startStr);
      const t1 = parseTimestamp(endStr);
      if (t0 == null || t1 == null) return full;
      const n0 = Math.max(0, Math.round(y1ms + scale * (t0 - x1ms)));
      const n1 = Math.max(0, Math.round(y1ms + scale * (t1 - x1ms)));
      return `${formatTimestamp(n0, outFormat)} --> ${formatTimestamp(n1, outFormat)}${rest}`;
    },
  );
}

function downloadExtFromFileName(fileName) {
  if (!fileName) return "srt";
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".vtt")) return "vtt";
  if (lower.endsWith(".txt")) return "txt";
  if (lower.endsWith(".srt")) return "srt";
  return "srt";
}

const textareaClass =
  "w-full border border-slate-300 rounded-lg p-4 font-mono whitespace-pre-wrap resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 h-80 bg-white";

const skyBtn =
  "inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Subtitle Drift Stabilizer",
  description: META_DESC,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (Browser-based)",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: CANONICAL,
};

function DriftStabilizerTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fontStyle = { fontSize: `${fontSize}px` };

  const anchorPreview = useMemo(() => {
    const ax1 = parseTimestamp(x1);
    const ay1 = parseTimestamp(y1);
    const ax2 = parseTimestamp(x2);
    const ay2 = parseTimestamp(y2);
    if (ax1 == null || ay1 == null || ax2 == null || ay2 == null) {
      return {
        ok: false,
        message:
          "Please enter all four anchor timestamps in HH:MM:SS,mmm or HH:MM:SS.mmm format.",
      };
    }
    if (ax1 === ax2) {
      return { ok: false, message: "Anchor timestamps cannot be identical." };
    }
    const scale = (ay2 - ay1) / (ax2 - ax1);
    if (scale <= 0 || !Number.isFinite(scale)) {
      return {
        ok: false,
        message: "Anchor points must move forward in time.",
      };
    }
    const factorStr = `${scale.toFixed(3)}×`;
    if (Math.abs(scale - 1) < 1e-6) {
      return {
        ok: true,
        message: `Scale factor: ${factorStr} (no change)`,
      };
    }
    if (scale > 1) {
      const pct = ((scale - 1) * 100).toFixed(1);
      return {
        ok: true,
        message: `Scale factor: ${factorStr} (subtitles will be stretched by ${pct}%)`,
      };
    }
    const pct = ((1 - scale) * 100).toFixed(1);
    return {
      ok: true,
      message: `Scale factor: ${factorStr} (subtitles will be compressed by ${pct}%)`,
    };
  }, [x1, y1, x2, y2]);

  const loadFileText = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = typeof reader.result === "string" ? reader.result : "";
      setInputText(t);
      setFileName(file.name);
      setErrorMessage("");
    };
    reader.onerror = () => {
      setErrorMessage("Could not read the file.");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFileText(f);
    e.target.value = "";
  };

  const onTextareaDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) loadFileText(f);
  };

  const onTextareaDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const applyDriftFix = () => {
    setErrorMessage("");
    if (!anchorPreview.ok) {
      return;
    }
    const raw = stripBOM(inputText);
    if (!raw.trim()) {
      setErrorMessage("Please paste or load subtitles first.");
      return;
    }
    const ax1 = parseTimestamp(x1);
    const ay1 = parseTimestamp(y1);
    const ax2 = parseTimestamp(x2);
    const ay2 = parseTimestamp(y2);
    const scale = (ay2 - ay1) / (ax2 - ax1);
    const fmt = detectFormat(raw);
    const out = applyDriftScaling(raw, ax1, ay1, scale, fmt);
    setOutputText(out);
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setFileName("");
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setErrorMessage("");
  };

  const fillFirstStart = () => {
    const v = findFirstCueStart(inputText);
    if (v) setX1(v);
  };

  const fillLastEnd = () => {
    const v = findLastCueEnd(inputText);
    if (v) setX2(v);
  };

  const copyOutput = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setErrorMessage("");
    } catch {
      setErrorMessage("Could not copy to clipboard.");
    }
  };

  const downloadOutput = () => {
    if (!outputText) return;
    const raw = stripBOM(inputText);
    const fmt = detectFormat(raw);
    const ext = fileName ? downloadExtFromFileName(fileName) : "srt";
    const blob = new Blob([outputText], {
      type:
        fmt === "vtt" ? "text/vtt;charset=utf-8" : "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drift-corrected.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="mx-auto max-w-6xl px-4 pb-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      aria-label="AI Subtitle Drift Stabilizer"
    >
      <div className="mb-4 max-w-6xl">
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[2rem]">
          AI Subtitle Drift Stabilizer
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Fix subtitles that drift progressively out of sync. Set two anchor
          points and the tool stretches or compresses the timeline to match. 100%
          browser-based, no upload.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label htmlFor="drift-font-size" className="text-sm text-slate-700">
          Font size:
        </label>
        <select
          id="drift-font-size"
          value={String(fontSize)}
          onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-800 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {[12, 14, 16, 18, 20, 24].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <span className="text-sm text-slate-500">px</span>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 font-semibold text-slate-700">
              Input subtitles
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <input
                id="drift-file-input"
                type="file"
                accept=".srt,.vtt,.txt"
                className="hidden"
                onChange={onFileChange}
              />
              <label
                htmlFor="drift-file-input"
                className="inline-block cursor-pointer rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-600"
              >
                Choose file
              </label>
              {fileName ? (
                <span className="text-sm text-slate-500">{fileName}</span>
              ) : null}
            </div>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setErrorMessage("");
              }}
              onDrop={onTextareaDrop}
              onDragOver={onTextareaDragOver}
              placeholder="Paste your subtitle content here, or drop a file..."
              className={textareaClass}
              style={fontStyle}
              spellCheck={false}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-2 font-semibold text-slate-700">
              Drift-corrected output
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Corrected subtitles will appear here after you click Apply Drift Fix."
              className={`${textareaClass} text-slate-800`}
              style={fontStyle}
              spellCheck={false}
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                type="button"
                className={skyBtn}
                onClick={copyOutput}
                disabled={!outputText}
              >
                Copy
              </button>
              <button
                type="button"
                className={skyBtn}
                onClick={downloadOutput}
                disabled={!outputText}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-700">
            Anchor points
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Pick two reference points: a timestamp in the original file and the
            timestamp it should actually appear at.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-slate-700">
                Anchor 1 (start of file)
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Original timestamp
                  </label>
                  <input
                    type="text"
                    value={x1}
                    onChange={(e) => {
                      setX1(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="00:00:01,000"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    True (corrected) timestamp
                  </label>
                  <input
                    type="text"
                    value={y1}
                    onChange={(e) => {
                      setY1(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="00:00:01,000"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-2 text-xs text-sky-600 underline hover:text-sky-700"
                onClick={fillFirstStart}
              >
                Use first cue&apos;s start time
              </button>
            </div>

            <div>
              <h3 className="mb-2 font-medium text-slate-700">
                Anchor 2 (end of file)
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Original timestamp
                  </label>
                  <input
                    type="text"
                    value={x2}
                    onChange={(e) => {
                      setX2(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="00:00:01,000"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    True (corrected) timestamp
                  </label>
                  <input
                    type="text"
                    value={y2}
                    onChange={(e) => {
                      setY2(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="00:00:01,000"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-2 text-xs text-sky-600 underline hover:text-sky-700"
                onClick={fillLastEnd}
              >
                Use last cue&apos;s end time
              </button>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p
              className={`text-sm ${anchorPreview.ok ? "text-slate-500" : "text-red-600"}`}
            >
              {anchorPreview.message}
            </p>
            {errorMessage ? (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button type="button" className={skyBtn} onClick={applyDriftFix}>
              Apply Drift Fix
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SubtitleDriftStabilizerPage() {
  return (
    <>
      <Head>
        <title>AI Subtitle Drift Stabilizer — Fix Progressive Sync</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta
          property="og:title"
          content="AI Subtitle Drift Stabilizer — Fix Progressive Sync"
        />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="AI Subtitle Drift Stabilizer — Fix Progressive Sync"
        />
        <meta name="twitter:description" content={META_DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </Head>

      <Layout>
        <div className="min-h-screen bg-slate-50">
          <DriftStabilizerTool />

          <div className={section}>
            <h2 className={h2}>How it works</h2>
            <ol className={ol}>
              <li>Load your subtitle file (SRT, VTT, or TXT).</li>
              <li>
                Find two reference points — a moment near the start where you
                know the correct timestamp, and a moment near the end where you
                know the correct timestamp.
              </li>
              <li>
                Enter the original timestamps from the file and the corrected
                timestamps from your video.
              </li>
              <li>
                Click Apply Drift Fix. The tool stretches or compresses the entire
                timeline so both anchors land where they should, and everything
                in between scales proportionally.
              </li>
            </ol>

            <h2 className={h2}>
              Drift fixing vs. time shifting — what&apos;s the difference?
            </h2>
            <p className={p}>
              A <strong>time shift</strong> adds or subtracts the same offset to
              every cue. That is perfect when the whole track is early or late by
              a fixed amount, but it cannot correct timing that gets worse as the
              video plays.
            </p>
            <p className={p}>
              <strong>Drift fixing</strong> rescales the timeline between two
              anchors so early and late errors are distributed across the file. If
              every subtitle is exactly the same amount off, use the{" "}
              <Link
                href="/subtitle-time-shifter"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Subtitle Time Shifter
              </Link>
              . If subtitles start correctly but progressively drift further off as
              the video plays, use this tool.
            </p>

            <h2 className={h2}>Frequently asked questions</h2>

            <h3 className={h3}>
              What&apos;s the difference between drift fixing and time shifting?
            </h3>
            <p className={p}>
              Time shifting moves every timestamp by the same delta. Drift fixing
              applies a linear scale anchored at two known-good times so the error
              at the start and end is corrected and intermediate cues move
              proportionally. Use whichever matches how your subtitles are wrong.
            </p>

            <h3 className={h3}>
              Why do AI-generated video subtitles drift out of sync?
            </h3>
            <p className={p}>
              Generated video can have slight frame pacing variance compared with a
              strict constant frame rate timeline. Latent diffusion and other
              generative pipelines do not always lock to broadcast-style timecode.
              Separately, auto-transcription tools often assume a constant frame
              rate when mapping audio to time; when the rendered video does not
              match that assumption, timestamps can creep earlier or later over a
              long clip.
            </p>

            <h3 className={h3}>
              How accurate do my anchor timestamps need to be?
            </h3>
            <p className={p}>
              For most viewing, being within about fifty milliseconds is usually
              fine. If you are delivering to broadcast or cinema standards, tighten
              that as your spec requires and verify against a known reference
              waveform or timecode display.
            </p>

            <h3 className={h3}>
              Can I fix subtitles that drift non-linearly?
            </h3>
            <p className={p}>
              This version applies a single linear scale across the whole file.
              Many real-world drift problems are close enough to linear over one
              clip. If drift is clearly non-linear, split the file into segments,
              anchor each segment, and process them separately. A future version
              may add multi-anchor support for piecewise correction.
            </p>

            <h3 className={h3}>Does this work with VTT files too?</h3>
            <p className={p}>
              Yes. The tool auto-detects SRT versus WebVTT, keeps the WEBVTT header,
              NOTE and STYLE blocks, cue identifiers, and any cue settings after
              the arrow on timing lines.
            </p>

            <h3 className={h3}>
              Are my subtitle files uploaded anywhere during processing?
            </h3>
            <p className={p}>
              No. Everything runs in your browser; files are never sent to a
              server.
            </p>

            <h2 className={h2}>Related tools</h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-[#334155]">
              <li>
                <Link
                  href="/subtitle-time-shifter"
                  className="text-sky-600 underline hover:text-sky-700"
                >
                  Subtitle Time Shifter
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-encoding-fixer"
                  className="text-sky-600 underline hover:text-sky-700"
                >
                  Subtitle Encoding Fixer
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-find-replace"
                  className="text-sky-600 underline hover:text-sky-700"
                >
                  Subtitle Find &amp; Replace
                </Link>
              </li>
              <li>
                <Link
                  href="/srt-to-vtt-converter"
                  className="text-sky-600 underline hover:text-sky-700"
                >
                  SRT to VTT Converter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

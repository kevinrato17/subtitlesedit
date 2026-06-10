import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import Layout from "@/components/Layout";

const CANONICAL = "https://subtitlesedit.com/subtitle-drift-stabilizer";
const META_DESC =
  "Fix subtitles that drift progressively out of sync, common in AI-generated videos. Anchor-based geometric scaling. Free, browser-based, no upload.";

const PAGE_TITLE = "AI Subtitle Drift Stabilizer — Fix Progressive Sync";
const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp";

const section = "mx-auto max-w-4xl px-4 mt-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-12";
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
      "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://subtitlesedit.com" },
        { "@type": "ListItem", position: 2, name: "AI Subtitle Drift Stabilizer", item: "https://subtitlesedit.com/subtitle-drift-stabilizer" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#webpage",
      url: "https://subtitlesedit.com/subtitle-drift-stabilizer",
      name: PAGE_TITLE,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": "https://subtitlesedit.com/#logo" },
      breadcrumb: { "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#breadcrumb" },
      mainEntity: { "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#tool" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#tool",
      name: "AI Subtitle Drift Stabilizer",
      url: "https://subtitlesedit.com/subtitle-drift-stabilizer",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
      description:
        "A free, browser-based tool that corrects subtitles which progressively drift out of sync. You set two known-good anchor points and it applies a deterministic linear time-scaling transform across the whole file, repositioning every cue proportionally. All processing runs client-side, so files are never uploaded.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Anchor-based linear timeline scaling (stretch or compress)",
        "Auto-detects SRT and WebVTT and preserves headers, NOTE/STYLE blocks, cue IDs, and cue settings",
        "Corrects progressive drift a fixed offset cannot fix",
        "Deterministic and repeatable \u2014 same anchors, same result",
        "100% client-side processing with no file uploads",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-drift-stabilizer#faq",
      mainEntity: [
        { "@type": "Question", name: "What's the difference between drift fixing and time shifting?", acceptedAnswer: { "@type": "Answer", text: "Time shifting moves every timestamp by the same fixed delta, which only works when the whole track is uniformly early or late. Drift fixing applies a linear scale anchored at two known-good times, so errors that grow as the video plays are corrected and every cue in between moves proportionally." } },
        { "@type": "Question", name: "Why do AI-generated and exported video subtitles drift out of sync?", acceptedAnswer: { "@type": "Answer", text: "The usual cause is a frame-rate or duration mismatch: captions authored against one timeline (say 23.976 fps) are played against another (25 or 30 fps), so the gap grows steadily. AI-generated, re-rendered, or auto-transcribed clips often end up at a slightly different rate than the captions assume, producing the same linear drift." } },
        { "@type": "Question", name: "How accurate do my anchor timestamps need to be?", acceptedAnswer: { "@type": "Answer", text: "For normal viewing, landing each anchor within about fifty milliseconds of the true time is usually enough, because the linear scale spreads any small anchor error across the file. For broadcast or cinema delivery, tighten this to your spec and verify against a reference waveform or a timecode display in your editor." } },
        { "@type": "Question", name: "Can I fix subtitles that drift non-linearly?", acceptedAnswer: { "@type": "Answer", text: "This tool applies one linear scale across the whole file, which matches most real drift caused by a constant frame-rate mismatch. If the drift clearly speeds up and slows down, split the file into segments, anchor and correct each segment separately, then recombine. Genuine non-linear drift is uncommon over a single clip." } },
        { "@type": "Question", name: "Does this work with VTT files too?", acceptedAnswer: { "@type": "Answer", text: "Yes. The tool auto-detects SRT versus WebVTT and preserves the WEBVTT header, NOTE and STYLE blocks, cue identifiers, and any cue settings that follow the arrow on a timing line. Only the start and end timestamps are rescaled; everything else passes through untouched. You can also convert formats afterwards with the SRT to VTT converter." } },
        { "@type": "Question", name: "Are my subtitle files uploaded anywhere during processing?", acceptedAnswer: { "@type": "Answer", text: "No. The entire process runs locally in your browser using JavaScript, so your subtitle file is never sent to a server, stored, or logged. That makes the tool safe for confidential, pre-release, or client work. Nothing leaves your device, and closing the tab clears everything you loaded." } },
        { "@type": "Question", name: "How do I find the right anchor timestamps?", acceptedAnswer: { "@type": "Answer", text: "Use the 'Use first cue's start time' and 'Use last cue's end time' buttons to auto-fill the original column from your file. Then play the video, note the true time each line should appear, and type those into the corrected column. Pick anchors as far apart as possible for the most accurate scale." } },
        { "@type": "Question", name: "Why does it say \"Anchor points must move forward in time\" or \"Anchor timestamps cannot be identical\"?", acceptedAnswer: { "@type": "Answer", text: "Anchor 2 must come later than Anchor 1 in both the original and corrected columns, because the tool derives a positive scale from the gap between them. If the two original timestamps are the same, or the second is earlier, the scale is undefined and you will see those messages. Choose two clearly separated points." } },
        { "@type": "Question", name: "What timestamp format should I type into the anchor fields?", acceptedAnswer: { "@type": "Answer", text: "Use HH:MM:SS,mmm with a comma (SRT style) or HH:MM:SS.mmm with a period (VTT style); both are accepted. Always include all three millisecond digits, for example 00:14:03,500. If a field is blank or malformed, the tool asks you to re-enter all four anchors before it will apply the fix." } },
        { "@type": "Question", name: "Does drift fixing change my subtitle text or formatting?", acceptedAnswer: { "@type": "Answer", text: "No. Only the start and end timestamps on timing lines are recalculated. Cue numbers, dialogue text, line breaks, styling tags, and VTT headers are left exactly as they were. If you also need to clean tags or fix garbled characters, run the Subtitle Tag Stripper or Subtitle Encoding Fixer afterwards." } },
        { "@type": "Question", name: "What if my subtitles are off by a constant amount instead of drifting?", acceptedAnswer: { "@type": "Answer", text: "Then you do not need drift fixing — a single offset fixes the whole file. Use the Subtitle Time Shifter to move every cue by the same number of seconds. If cues also overlap or sit too close together after correcting timing, the Subtitle Overlap Fixer can space them cleanly." } },
      ],
    },
  ],
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
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
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

            <h2 className={h2}>See it in action: correcting 3 seconds of drift</h2>
            <p className={p}>
              In this example the first line is already on time, but each cue
              falls a little further behind until the closing line lands about 3
              seconds late at the ten-minute mark. You anchor the start where it
              is and pull the end back by 3 seconds (a 0.995 scale); every cue in
              between is rescaled proportionally.
            </p>
            <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="mb-2 text-sm font-semibold text-[#1e293b]">
                  Before (drifts later over time)
                </div>
                <pre className="overflow-x-auto rounded-[10px] border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-[#334155]">
                  <code>{`00:00:00,000   start — correct
00:05:00,000   middle
00:10:00,000   end — 3s too late`}</code>
                </pre>
              </div>
              <div>
                <div className="mb-2 text-sm font-semibold text-[#1e293b]">
                  After (anchors: start stays, end −3s)
                </div>
                <pre className="overflow-x-auto rounded-[10px] border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-[#334155]">
                  <code>{`00:00:00,000
00:04:58,500
00:09:57,000`}</code>
                </pre>
              </div>
            </div>

            <h2 className={h2}>Who uses the drift stabilizer</h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-[#334155]">
              <li>
                Creators repurposing AI-generated or text-to-video clips, where
                captions were timed against a different render.
              </li>
              <li>
                Translators and localizers working from source subtitles exported
                at a different frame rate than the final video.
              </li>
              <li>
                Editors cleaning up 23.976 vs 25 vs 30 fps mismatches after a
                format conversion or re-encode.
              </li>
              <li>
                Accessibility and QA teams confirming captions stay in sync from
                first line to last before publishing.
              </li>
              <li>
                Anyone whose downloaded subtitles start fine but drift further off
                the longer a movie or episode plays.
              </li>
            </ul>

            <h2 className={h2}>Why use this drift fixer</h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-[#334155]">
              <li>
                <strong>Fixes progressive drift, not just a flat offset.</strong>{" "}
                A time shifter moves everything by the same amount; this rescales
                the timeline so growing errors are corrected end to end.
              </li>
              <li>
                <strong>100% client-side.</strong> Your file is processed in the
                browser and never uploaded, stored, or logged.
              </li>
              <li>
                <strong>Format-aware.</strong> Detects SRT vs WebVTT and preserves
                headers, NOTE/STYLE blocks, cue identifiers, and cue settings.
              </li>
              <li>
                <strong>Deterministic and repeatable.</strong> The same two
                anchors always produce the same output, so you can verify it and
                re-run with confidence.
              </li>
              <li>
                <strong>Free, no sign-up, no install.</strong> Open the page, set
                two anchors, download the corrected file.
              </li>
            </ul>

            <h2 className={h2}>Frequently asked questions</h2>

            <h3 className={h3}>
              What&apos;s the difference between drift fixing and time shifting?
            </h3>
            <p className={p}>
              Time shifting moves every timestamp by the same fixed delta, which
              only works when the whole track is uniformly early or late. Drift
              fixing applies a linear scale anchored at two known-good times, so
              errors that grow as the video plays are corrected and every cue in
              between moves proportionally.
            </p>

            <h3 className={h3}>
              Why do AI-generated and exported video subtitles drift out of sync?
            </h3>
            <p className={p}>
              The usual cause is a frame-rate or duration mismatch: captions
              authored against one timeline (say 23.976 fps) are played against
              another (25 or 30 fps), so the gap grows steadily. AI-generated,
              re-rendered, or auto-transcribed clips often end up at a slightly
              different rate than the captions assume, producing the same linear
              drift.
            </p>

            <h3 className={h3}>
              How accurate do my anchor timestamps need to be?
            </h3>
            <p className={p}>
              For normal viewing, landing each anchor within about fifty
              milliseconds of the true time is usually enough, because the linear
              scale spreads any small anchor error across the file. For broadcast
              or cinema delivery, tighten this to your spec and verify against a
              reference waveform or a timecode display in your editor.
            </p>

            <h3 className={h3}>Can I fix subtitles that drift non-linearly?</h3>
            <p className={p}>
              This tool applies one linear scale across the whole file, which
              matches most real drift caused by a constant frame-rate mismatch. If
              the drift clearly speeds up and slows down, split the file into
              segments, anchor and correct each segment separately, then
              recombine. Genuine non-linear drift is uncommon over a single clip.
            </p>

            <h3 className={h3}>Does this work with VTT files too?</h3>
            <p className={p}>
              Yes. The tool auto-detects SRT versus WebVTT and preserves the
              WEBVTT header, NOTE and STYLE blocks, cue identifiers, and any cue
              settings that follow the arrow on a timing line. Only the start and
              end timestamps are rescaled; everything else passes through
              untouched. You can also convert formats afterwards with the{" "}
              <Link
                href="/srt-to-vtt-converter"
                className="text-sky-600 underline hover:text-sky-700"
              >
                SRT to VTT converter
              </Link>
              .
            </p>

            <h3 className={h3}>
              Are my subtitle files uploaded anywhere during processing?
            </h3>
            <p className={p}>
              No. The entire process runs locally in your browser using
              JavaScript, so your subtitle file is never sent to a server, stored,
              or logged. That makes the tool safe for confidential, pre-release,
              or client work. Nothing leaves your device, and closing the tab
              clears everything you loaded.
            </p>

            <h3 className={h3}>How do I find the right anchor timestamps?</h3>
            <p className={p}>
              Use the {"\u201c"}Use first cue&apos;s start time{"\u201d"} and{" "}
              {"\u201c"}Use last cue&apos;s end time{"\u201d"} buttons to auto-fill
              the original column from your file. Then play the video, note the
              true time each line should appear, and type those into the corrected
              column. Pick anchors as far apart as possible for the most accurate
              scale.
            </p>

            <h3 className={h3}>
              Why does it say {"\u201c"}Anchor points must move forward in time
              {"\u201d"} or {"\u201c"}Anchor timestamps cannot be identical
              {"\u201d"}?
            </h3>
            <p className={p}>
              Anchor 2 must come later than Anchor 1 in both the original and
              corrected columns, because the tool derives a positive scale from
              the gap between them. If the two original timestamps are the same,
              or the second is earlier, the scale is undefined and you will see
              those messages. Choose two clearly separated points.
            </p>

            <h3 className={h3}>
              What timestamp format should I type into the anchor fields?
            </h3>
            <p className={p}>
              Use HH:MM:SS,mmm with a comma (SRT style) or HH:MM:SS.mmm with a
              period (VTT style); both are accepted. Always include all three
              millisecond digits, for example 00:14:03,500. If a field is blank or
              malformed, the tool asks you to re-enter all four anchors before it
              will apply the fix.
            </p>

            <h3 className={h3}>
              Does drift fixing change my subtitle text or formatting?
            </h3>
            <p className={p}>
              No. Only the start and end timestamps on timing lines are
              recalculated. Cue numbers, dialogue text, line breaks, styling tags,
              and VTT headers are left exactly as they were. If you also need to
              clean tags or fix garbled characters, run the{" "}
              <Link
                href="/subtitle-tag-stripper"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Subtitle Tag Stripper
              </Link>{" "}
              or{" "}
              <Link
                href="/subtitle-encoding-fixer"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Subtitle Encoding Fixer
              </Link>{" "}
              afterwards.
            </p>

            <h3 className={h3}>
              What if my subtitles are off by a constant amount instead of
              drifting?
            </h3>
            <p className={p}>
              Then you do not need drift fixing {"\u2014"} a single offset fixes
              the whole file. Use the{" "}
              <Link
                href="/subtitle-time-shifter"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Subtitle Time Shifter
              </Link>{" "}
              to move every cue by the same number of seconds. If cues also
              overlap or sit too close together after correcting timing, the{" "}
              <Link
                href="/subtitle-overlap-fixer"
                className="text-sky-600 underline hover:text-sky-700"
              >
                Subtitle Overlap Fixer
              </Link>{" "}
              can space them cleanly.
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

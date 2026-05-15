import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";

const CANONICAL = "https://subtitlesedit.com/bilingual-subtitle-interleaver";
const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/SRT-to-VTT-Converter-1-768x403.webp";
const META_DESC =
  "Merge two subtitle files into one dual-language file for language learning. Free, browser-based, no upload. Works with SRT and VTT.";

const section =
  "mx-auto max-w-4xl px-4 mt-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const ol = "mb-4 list-decimal pl-5 text-[#334155] space-y-2";

const textareaClass =
  "w-full border border-slate-300 rounded-lg p-4 font-mono whitespace-pre-wrap resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 bg-white";

const skyBtn =
  "inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60";

const ldJson = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Bilingual Subtitle Interleaver",
  description: META_DESC,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  url: CANONICAL,
};

function stripBOM(text) {
  if (!text) return "";
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function firstNonEmptyLine(text) {
  const lines = text.split(/\r\n|\n|\r/);
  for (const line of lines) {
    if (line.trim().length > 0) return line.trim();
  }
  return "";
}

/** @returns {'vtt' | 'srt'} */
function detectFormat(text) {
  const s = stripBOM(text);
  const first = firstNonEmptyLine(s);
  if (first.includes("WEBVTT")) return "vtt";
  return "srt";
}

/**
 * @param {string} ts
 * @returns {number}
 */
function parseSrtTimestamp(ts) {
  const s = String(ts).trim().replace(".", ",");
  const m = s.match(/^(\d{2}):(\d{2}):(\d{2})[,.](\d{3})$/);
  if (!m) return NaN;
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  const ss = parseInt(m[3], 10);
  const ms = parseInt(m[4], 10);
  if (mm > 59 || ss > 59 || ms > 999) return NaN;
  return ((hh * 60 + mm) * 60 + ss) * 1000 + ms;
}

/**
 * @param {string} ts
 * @returns {number}
 */
function parseVttTimestamp(ts) {
  const s = String(ts).trim().replace(",", ".");
  const parts = s.split(":");
  if (parts.length === 3) {
    const hh = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10);
    const last = parts[2];
    const [sec, frac = "0"] = last.split(".");
    const ss = parseInt(sec, 10);
    const ms = parseInt((frac + "000").slice(0, 3), 10);
    if (mm > 59 || ss > 59 || ms > 999) return NaN;
    return ((hh * 60 + mm) * 60 + ss) * 1000 + ms;
  }
  if (parts.length === 2) {
    const mm = parseInt(parts[0], 10);
    const last = parts[1];
    const [sec, frac = "0"] = last.split(".");
    const ss = parseInt(sec, 10);
    const ms = parseInt((frac + "000").slice(0, 3), 10);
    if (ss > 59 || ms > 999) return NaN;
    return (mm * 60 + ss) * 1000 + ms;
  }
  return NaN;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function pad3(n) {
  return String(n).padStart(3, "0");
}

/**
 * @param {number} ms
 * @returns {string}
 */
function msToSrtTimestamp(ms) {
  const clamped = Math.max(0, Math.round(ms));
  const h = Math.floor(clamped / 3600000);
  const rem = clamped % 3600000;
  const m = Math.floor(rem / 60000);
  const rem2 = rem % 60000;
  const s = Math.floor(rem2 / 1000);
  const milli = rem2 % 1000;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)},${pad3(milli)}`;
}

/**
 * @param {number} ms
 * @returns {string}
 */
function msToVttTimestamp(ms) {
  const clamped = Math.max(0, Math.round(ms));
  const h = Math.floor(clamped / 3600000);
  const rem = clamped % 3600000;
  const m = Math.floor(rem / 60000);
  const rem2 = rem % 60000;
  const s = Math.floor(rem2 / 1000);
  const milli = rem2 % 1000;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}.${pad3(milli)}`;
}

/**
 * @param {string} text
 * @returns {{ startMs: number, endMs: number, lines: string[] }[]}
 */
function parseSubtitles(text) {
  const raw = stripBOM(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const fmt = detectFormat(raw);
  if (fmt === "srt") return parseSrtCues(raw);
  return parseVttCues(raw);
}

function parseSrtCues(normalized) {
  const cues = [];
  const blocks = normalized.trim().split(/\n\n+/);
  for (const block of blocks) {
    const lines = block.split("\n");
    if (lines.length < 2) continue;
    let i = 0;
    if (/^\d+\s*$/.test(lines[0].trim())) i += 1;
    const timingLine = lines[i];
    if (!timingLine || !/-->/.test(timingLine)) continue;
    const m = timingLine.match(
      /^(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})/,
    );
    if (!m) continue;
    const startMs = parseSrtTimestamp(m[1]);
    const endMs = parseSrtTimestamp(m[2]);
    if (Number.isNaN(startMs) || Number.isNaN(endMs)) continue;
    const textLines = lines.slice(i + 1).map((l) => l.replace(/\r$/, ""));
    cues.push({ startMs, endMs, lines: textLines });
  }
  return cues;
}

function parseVttCues(normalized) {
  const cues = [];
  const lines = normalized.split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;
  if (i < lines.length && /^WEBVTT\b/i.test(lines[i].trim())) i += 1;

  while (i < lines.length) {
    while (i < lines.length && lines[i].trim() === "") i += 1;
    if (i >= lines.length) break;

    if (/^NOTE\b/i.test(lines[i].trim())) {
      while (i < lines.length && lines[i].trim() !== "") i += 1;
      continue;
    }

    if (/^STYLE\b|^REGION\b/i.test(lines[i].trim())) {
      while (i < lines.length && lines[i].trim() !== "") i += 1;
      continue;
    }

    let line = lines[i];
    if (line.trim() !== "" && !/-->/.test(line)) {
      i += 1;
      if (i >= lines.length) break;
    }

    const timingLine = lines[i];
    if (!timingLine || !/-->/.test(timingLine)) {
      i += 1;
      continue;
    }

    const tm = timingLine.match(
      /(\d{1,2}:\d{2}:\d{2}[.,]\d{3}|\d{1,2}:\d{2}[.,]\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[.,]\d{3}|\d{1,2}:\d{2}[.,]\d{3})/,
    );
    if (!tm) {
      i += 1;
      continue;
    }
    const startMs = parseVttTimestamp(tm[1]);
    const endMs = parseVttTimestamp(tm[2]);
    if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
      i += 1;
      continue;
    }
    i += 1;
    const textLines = [];
    while (i < lines.length && lines[i].trim() !== "") {
      textLines.push(lines[i]);
      i += 1;
    }
    cues.push({ startMs, endMs, lines: textLines });
  }
  return cues;
}

/**
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesA
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesB
 */
function alignByIndex(cuesA, cuesB) {
  const merged = [];
  const maxLen = Math.max(cuesA.length, cuesB.length);
  for (let i = 0; i < maxLen; i += 1) {
    const a = cuesA[i];
    const b = cuesB[i];
    if (a && b) {
      merged.push({
        startMs: a.startMs,
        endMs: a.endMs,
        linesA: a.lines,
        linesB: b.lines,
      });
    } else if (a) {
      merged.push({
        startMs: a.startMs,
        endMs: a.endMs,
        linesA: a.lines,
        linesB: [],
      });
    } else if (b) {
      merged.push({
        startMs: b.startMs,
        endMs: b.endMs,
        linesA: [],
        linesB: b.lines,
      });
    }
  }
  return merged;
}

function linesNonEmpty(lines) {
  return lines.some((l) => String(l).trim().length > 0);
}

/**
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesA
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesB
 */
function alignByTimestamp(cuesA, cuesB) {
  const TOL = 2000;
  const claimed = new Array(cuesB.length).fill(false);
  const merged = [];

  for (const a of cuesA) {
    let bestJ = -1;
    let bestDiff = Infinity;
    for (let j = 0; j < cuesB.length; j += 1) {
      if (claimed[j]) continue;
      const diff = Math.abs(cuesB[j].startMs - a.startMs);
      if (diff <= TOL && diff < bestDiff) {
        bestDiff = diff;
        bestJ = j;
      }
    }
    if (bestJ >= 0) {
      claimed[bestJ] = true;
      const b = cuesB[bestJ];
      merged.push({
        startMs: a.startMs,
        endMs: a.endMs,
        linesA: a.lines,
        linesB: b.lines,
      });
    } else {
      merged.push({
        startMs: a.startMs,
        endMs: a.endMs,
        linesA: a.lines,
        linesB: [],
      });
    }
  }

  for (let j = 0; j < cuesB.length; j += 1) {
    if (claimed[j]) continue;
    const b = cuesB[j];
    merged.push({
      startMs: b.startMs,
      endMs: b.endMs,
      linesA: [],
      linesB: b.lines,
    });
  }

  merged.sort((x, y) => x.startMs - y.startMs);
  return merged;
}

/**
 * @param {{ linesA: string[], linesB: string[] }[]} mergedCues
 * @param {boolean} showLabels
 * @param {string} labelA
 * @param {string} labelB
 */
function cueTextBlock(cue, showLabels, labelA, labelB) {
  const hasA = linesNonEmpty(cue.linesA);
  const hasB = linesNonEmpty(cue.linesB);
  const joinA = cue.linesA.join("\n");
  const joinB = cue.linesB.join("\n");

  if (hasA && hasB) {
    if (showLabels) {
      return `[${labelA}]\n${joinA}\n[${labelB}]\n${joinB}`;
    }
    return `${joinA}\n${joinB}`;
  }
  if (hasA) {
    if (showLabels) return `[${labelA}]\n${joinA}`;
    return joinA;
  }
  if (hasB) {
    if (showLabels) return `[${labelB}]\n${joinB}`;
    return joinB;
  }
  return "";
}

/**
 * @param {ReturnType<typeof alignByIndex>} mergedCues
 * @param {'srt' | 'vtt'} format
 */
function buildOutput(mergedCues, format, showLabels, labelA, labelB) {
  const bodyParts = [];
  let idx = 1;
  for (const cue of mergedCues) {
    const block = cueTextBlock(cue, showLabels, labelA, labelB);
    if (!block.trim()) continue;
    const start =
      format === "srt"
        ? msToSrtTimestamp(cue.startMs)
        : msToVttTimestamp(cue.startMs);
    const end =
      format === "srt"
        ? msToSrtTimestamp(cue.endMs)
        : msToVttTimestamp(cue.endMs);
    if (format === "srt") {
      bodyParts.push(String(idx), `${start} --> ${end}`, block, "");
      idx += 1;
    } else {
      bodyParts.push(`${start} --> ${end}`, block, "");
    }
  }
  if (bodyParts.length === 0) return "";
  if (format === "vtt") {
    return `WEBVTT\n\n${bodyParts.join("\n").replace(/\n+$/, "")}\n`;
  }
  return bodyParts.join("\n").replace(/\n+$/, "") + "\n";
}

/**
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesA
 * @param {{ startMs: number, endMs: number, lines: string[] }[]} cuesB
 * @param {ReturnType<typeof alignByIndex>} mergedCues
 * @param {'index' | 'timestamp'} mode
 */
function computeStatus(cuesA, cuesB, mergedCues, mode) {
  if (mode === "index") {
    const matched = Math.min(cuesA.length, cuesB.length);
    const unmatchedA = Math.max(0, cuesA.length - cuesB.length);
    const unmatchedB = Math.max(0, cuesB.length - cuesA.length);
    return `Matched ${matched} cues. Unmatched from File A: ${unmatchedA}. Unmatched from File B: ${unmatchedB}.`;
  }
  let matched = 0;
  let unmatchedA = 0;
  let unmatchedB = 0;
  for (const c of mergedCues) {
    const hasA = linesNonEmpty(c.linesA);
    const hasB = linesNonEmpty(c.linesB);
    if (hasA && hasB) matched += 1;
    else if (hasA && !hasB) unmatchedA += 1;
    else if (hasB && !hasA) unmatchedB += 1;
  }
  return `Matched ${matched} cues. Unmatched from File A: ${unmatchedA}. Unmatched from File B: ${unmatchedB}.`;
}

function BilingualInterleaverTool() {
  const [fileAText, setFileAText] = useState("");
  const [fileBText, setFileBText] = useState("");
  const [alignmentMode, setAlignmentMode] = useState("index");
  const [outputFormat, setOutputFormat] = useState("srt");
  const [showLabels, setShowLabels] = useState(false);
  const [labelA, setLabelA] = useState("English");
  const [labelB, setLabelB] = useState("Spanish");
  const [output, setOutput] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [copyLabel, setCopyLabel] = useState("Copy");

  const fileARef = useRef(null);
  const fileBRef = useRef(null);

  const fontStyle = { fontSize: `${fontSize}px` };

  useEffect(() => {
    if (!fileAText.trim() && !fileBText.trim()) {
      setOutput("");
      setStatusMessage("");
      return;
    }
    try {
      const cuesA = parseSubtitles(fileAText);
      const cuesB = parseSubtitles(fileBText);
      const merged =
        alignmentMode === "index"
          ? alignByIndex(cuesA, cuesB)
          : alignByTimestamp(cuesA, cuesB);
      const out = buildOutput(
        merged,
        outputFormat,
        showLabels,
        labelA,
        labelB,
      );
      setOutput(out);
      if (fileAText.trim() && fileBText.trim()) {
        setStatusMessage(computeStatus(cuesA, cuesB, merged, alignmentMode));
      } else {
        setStatusMessage("");
      }
    } catch {
      setOutput("");
      setStatusMessage(
        "Could not parse one of the files. Check the format and try again.",
      );
    }
  }, [
    fileAText,
    fileBText,
    alignmentMode,
    outputFormat,
    showLabels,
    labelA,
    labelB,
  ]);

  const loadFile = (file, setter) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = typeof reader.result === "string" ? reader.result : "";
      setter(t);
    };
    reader.readAsText(file, "UTF-8");
  };

  const onFileAChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f, setFileAText);
    e.target.value = "";
  };

  const onFileBChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f, setFileBText);
    e.target.value = "";
  };

  const onDropA = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f, setFileAText);
  };

  const onDropB = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f, setFileBText);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 1500);
    } catch {
      /* ignore */
    }
  };

  const downloadOutput = () => {
    if (!output) return;
    const name =
      outputFormat === "vtt" ? "bilingual.vtt" : "bilingual.srt";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-8 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      aria-label="Bilingual Subtitle Interleaver"
    >
      <div className="mb-4 max-w-6xl">
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[2rem]">
          Bilingual Subtitle Interleaver
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          This tool merges two subtitle tracks into a single dual-language file:
          each cue stacks both languages on separate lines so you can read along
          in two languages at once. It is built for language learners who pair
          native and target-language subtitles. Both SRT and WebVTT are
          supported on input, with your choice of output format. Everything runs
          entirely in your browser; nothing is uploaded to a server.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label htmlFor="bilingual-font-size" className="text-sm text-slate-700">
          Font size:
        </label>
        <select
          id="bilingual-font-size"
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
            <div className="mb-2 font-semibold text-slate-700">File A</div>
            <div className="mb-2">
              <input
                ref={fileARef}
                id="bilingual-file-a"
                type="file"
                accept=".srt,.vtt"
                className="hidden"
                onChange={onFileAChange}
              />
              <button
                type="button"
                className={`${skyBtn} cursor-pointer`}
                onClick={() => fileARef.current?.click()}
              >
                Choose file
              </button>
            </div>
            <textarea
              value={fileAText}
              onChange={(e) => setFileAText(e.target.value)}
              onDrop={onDropA}
              onDragOver={onDragOver}
              placeholder="Paste or drop your first subtitle file here…"
              className={`${textareaClass} h-80`}
              style={fontStyle}
              spellCheck={false}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={skyBtn}
                onClick={() => setFileAText("")}
              >
                Clear A
              </button>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-2 font-semibold text-slate-700">File B</div>
            <div className="mb-2">
              <input
                ref={fileBRef}
                id="bilingual-file-b"
                type="file"
                accept=".srt,.vtt"
                className="hidden"
                onChange={onFileBChange}
              />
              <button
                type="button"
                className={`${skyBtn} cursor-pointer`}
                onClick={() => fileBRef.current?.click()}
              >
                Choose file
              </button>
            </div>
            <textarea
              value={fileBText}
              onChange={(e) => setFileBText(e.target.value)}
              onDrop={onDropB}
              onDragOver={onDragOver}
              placeholder="Paste or drop your second subtitle file here…"
              className={`${textareaClass} h-80`}
              style={fontStyle}
              spellCheck={false}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className={skyBtn}
                onClick={() => setFileBText("")}
              >
                Clear B
              </button>
              <button
                type="button"
                className={skyBtn}
                onClick={() => {
                  const t = fileAText;
                  setFileAText(fileBText);
                  setFileBText(t);
                }}
              >
                Swap A ↔ B
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <div className="mb-3 font-semibold text-slate-700">Options</div>
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <span className="font-medium text-slate-600">Alignment mode:</span>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="align-mode"
                checked={alignmentMode === "index"}
                onChange={() => setAlignmentMode("index")}
                className="text-sky-500 focus:ring-sky-400"
              />
              Match by cue index
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="align-mode"
                checked={alignmentMode === "timestamp"}
                onChange={() => setAlignmentMode("timestamp")}
                className="text-sky-500 focus:ring-sky-400"
              />
              Match by closest timestamp
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="bilingual-out-format"
              className="mb-1 block text-sm font-medium text-slate-600"
            >
              Output format
            </label>
            <select
              id="bilingual-out-format"
              value={outputFormat}
              onChange={(e) =>
                setOutputFormat(e.target.value === "vtt" ? "vtt" : "srt")
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="srt">SRT</option>
              <option value="vtt">VTT</option>
            </select>
          </div>
          <div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={showLabels}
                onChange={(e) => setShowLabels(e.target.checked)}
                className="rounded border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              Show language labels in output
            </label>
            {showLabels ? (
              <div className="mt-3 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="label-a"
                    className="mb-1 block text-xs font-medium text-slate-600"
                  >
                    Label A:
                  </label>
                  <input
                    id="label-a"
                    type="text"
                    value={labelA}
                    onChange={(e) => setLabelA(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="label-b"
                    className="mb-1 block text-xs font-medium text-slate-600"
                  >
                    Label B:
                  </label>
                  <input
                    id="label-b"
                    type="text"
                    value={labelB}
                    onChange={(e) => setLabelB(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {statusMessage ? (
          <p className="mt-4 text-sm text-slate-600">{statusMessage}</p>
        ) : null}

        <div className="mt-6 min-w-0">
          <div className="mb-2 font-semibold text-slate-700">
            Output (dual-language)
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Merged dual-language subtitles will appear here."
            className={`${textareaClass} h-96 text-slate-800`}
            style={fontStyle}
            spellCheck={false}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={skyBtn} onClick={copyOutput}>
              {copyLabel}
            </button>
            <button type="button" className={skyBtn} onClick={downloadOutput}>
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BilingualSubtitleInterleaverPage() {
  return (
    <Layout>
      <Head>
        <title>Bilingual Subtitle Interleaver — Free Dual-Language Tool</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta
          property="og:title"
          content="Bilingual Subtitle Interleaver — Free Dual-Language Tool"
        />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bilingual Subtitle Interleaver — Free Dual-Language Tool"
        />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <BilingualInterleaverTool />

        <div className={section}>
          <h2 className={h2}>How it works</h2>
          <ol className={ol}>
            <li>
              Load both subtitle files into File A and File B using paste,
              drag-and-drop, or the Choose file buttons. The tool detects SRT and
              WebVTT automatically from the file contents, and you can mix
              formats freely—for example, an SRT track in File A and a WebVTT
              export in File B—without converting either side first.
            </li>
            <li>
              Choose how the two timelines should line up. &quot;Match by cue
              index&quot; pairs the first cue of File A with the first cue of File
              B, the second with the second, and continues in lockstep down the
              list. &quot;Match by closest timestamp&quot; instead pairs each cue
              in File A with the cue in File B whose start time is nearest, as
              long as that neighbor falls within a two-second tolerance window,
              which helps when translators split lines differently.
            </li>
            <li>
              Pick the output format that fits your workflow. SRT remains the most
              widely supported caption format and will open in virtually every
              desktop media player, editor, and streaming prep pipeline. WebVTT
              is the native subtitle format for browsers and HTML5 video, which
              makes it the better choice when you are embedding captions on a
              website or testing in a web player.
            </li>
            <li>
              Optionally enable language labels so each block of dialogue is
              prefixed with a short tag such as [English] or [Spanish]. That extra
              structure is helpful when you are annotating lines, building study
              notes, or exporting text for side-by-side review, but most viewers do
              not need labels for everyday playback.
            </li>
            <li>
              When the preview looks right, use Copy to place the merged text on
              your clipboard or Download to save a file. The saved filename is
              either bilingual.srt or bilingual.vtt depending on the output format
              you selected, so you can drop it straight into your player or editor
              without renaming.
            </li>
          </ol>

          <h2 className={h2}>
            When to use cue index versus closest timestamp
          </h2>
          <p className={p}>
            The better alignment mode depends entirely on how your two subtitle
            files were authored, exported, and timed. When both tracks describe
            the same master in the same way, index pairing is simpler and faster.
            When cue boundaries diverge because of translation style or platform
            differences, timestamp pairing keeps the dialogue aligned even if the
            lists are different lengths.
          </p>

          <h3 className={h3}>Use cue index when both files come from the same source</h3>
          <p className={p}>
            Reach for cue index when both files clearly belong to the same
            release pipeline—two language tracks exported from the same disc
            image, two caption streams downloaded for the same YouTube upload, or
            dual-language assets delivered together from a streaming vendor. In
            those situations the dialogue order and cut points almost always line
            up cue for cue, so positional pairing is both the quickest option and
            the least likely to drift. You still get the stacked bilingual text in
            every entry, but you avoid the extra bookkeeping that timestamp mode
            performs when it searches for neighbors.
          </p>

          <h3 className={h3}>
            Use closest timestamp when files have different cue counts
          </h3>
          <p className={p}>
            Professional and fan translators routinely split or merge lines
            differently across languages. A long English sentence might become
            two shorter Spanish cues, or two terse German lines might be combined
            into a single flowing French cue. When cue counts differ, index mode
            keeps pairing positionally anyway, which means one mismatch early in
            the file can leave the rest of the stacked dialogue visibly wrong for
            minutes at a time. Closest-timestamp mode instead walks through File A
            and claims the nearest unused cue in File B inside a two-second
            window, so the languages stay aligned on the timeline even when the
            lists no longer match one-to-one.
          </p>

          <h2 className={h2}>Common use cases</h2>
          <p className={p}>
            The interleaver is aimed at anyone who wants both languages visible in
            a single subtitle track instead of juggling two separate files. The
            scenarios below are the ones we see most often in feedback from
            learners, teachers, and polyglot viewers.
          </p>

          <h3 className={h3}>Studying a language with films and TV</h3>
          <p className={p}>
            Language learners often keep the original dialogue while reading a
            familiar language underneath, so they can confirm meaning without
            breaking immersion in the spoken target language. Stacking both
            languages in one cue lets the eyes move vertically instead of hunting
            through two separate tracks. People who pair video with Migaku,
            Language Reactor, LingQ, or similar study stacks can export or paste
            the merged SRT or VTT as clean input material for those workflows; the
            tool does not replace those products, it simply prepares a
            dual-language file they can import like any other subtitle.
          </p>

          <h3 className={h3}>
            Comparing official subtitles against a fan translation
          </h3>
          <p className={p}>
            Collectors, teachers, and advanced learners sometimes want the
            licensed translation on one line and a community version on the next.
            Seeing both interpretations inside the same timed cue makes it easier
            to notice mistranslations, tone shifts, or localization choices without
            constantly pausing to swap tracks. Because timing stays anchored to
            whichever alignment mode you chose, you can scan an entire episode for
            divergences the way you would use diff tools for plain text, only here
            the structure is still a valid subtitle file.
          </p>

          <h3 className={h3}>Preparing dual-language study material</h3>
          <p className={p}>
            Tutors, conversation partners, and self-study groups often distribute
            offline clips where students must read both languages without toggling
            subtitle menus mid-scene. A merged file behaves like any ordinary SRT
            or WebVTT in VLC, IINA, MPC-HC, classroom projectors, or learning
            management systems that accept standard caption uploads. That means
            you can email the file, archive it on a shared drive, or load it on a
            flight without installing specialized bilingual playback software—just
            one track with both languages stacked where learners expect them.
          </p>

          <h2 className={h2}>Why use this tool</h2>
          <p className={p}>
            Long films and TV episodes can contain thousands of subtitle cues,
            which quickly runs into token limits when you ask ChatGPT-style
            assistants to merge entire tracks in one shot. This tool avoids that
            ceiling because it runs locally in JavaScript, so there is no context
            window and no artificial cap on file length. Pairing two timelines also
            demands precise millisecond arithmetic on every cue; generative
            models occasionally hallucinate timestamps, merge dialogue incorrectly,
            or drop entries, whereas this merger applies deterministic rules so the
            same inputs always produce the same output. Privacy matters just as
            much: nothing is uploaded to a server, which is important for
            classroom clips, personal collections, or any source you would hesitate
            to hand to a third party. There are no accounts, no usage quotas, and
            no server-side inspection of your subtitle contents.
          </p>

          <h2 className={h2}>Frequently Asked Questions</h2>

          <h3 className={h3}>What is a bilingual subtitle file?</h3>
          <p className={p}>
            It is a normal SRT or WebVTT file where each timed cue contains two
            languages at once, usually stacked so one language appears on the
            first line (or block) and the other directly underneath. Players and
            study tools then show both readings in sync with the same on-screen
            timing.
          </p>

          <h3 className={h3}>
            Will this work for Netflix or YouTube subtitles?
          </h3>
          <p className={p}>
            Yes, as long as you have legitimately obtained subtitle files for both
            languages. Results are cleanest when both tracks come from the same
            platform or release, because cue boundaries and timing then tend to
            line up more predictably.
          </p>

          <h3 className={h3}>
            What&apos;s the difference between cue index and closest timestamp
            alignment?
          </h3>
          <p className={p}>
            <strong>Match by cue index</strong> pairs the first cue in File A
            with the first cue in File B, the second with the second, and so on.
            It is the fastest option when both files follow the same dialogue
            order. <strong>Match by closest timestamp</strong> is for files where
            translators split or merged lines differently: for each cue in A, the
            tool picks the unclaimed cue in B whose start time is nearest, as long
            as it is within about ±2 seconds, then adds any leftover B cues on
            their own.
          </p>

          <h3 className={h3}>Can I mix an SRT and a VTT file?</h3>
          <p className={p}>
            Yes. Each side is parsed according to whether it looks like WebVTT
            (WEBVTT header) or SRT. You still choose whether the merged file is
            written as SRT or VTT.
          </p>

          <h3 className={h3}>Does this tool upload my files anywhere?</h3>
          <p className={p}>
            No. Parsing, alignment, and export all happen in your browser. Your
            files never leave your device.
          </p>

          <h3 className={h3}>
            Why don&apos;t my two subtitle files have the same number of cues?
          </h3>
          <p className={p}>
            Different translators and platforms often split sentences into
            different numbers of on-screen lines. If counts do not match, try{" "}
            <strong>closest timestamp</strong> mode so cues are paired by time
            instead of by position in the list.
          </p>
        </div>
      </div>
    </Layout>
  );
}

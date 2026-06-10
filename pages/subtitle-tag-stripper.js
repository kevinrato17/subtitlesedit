import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import { useCallback, useEffect, useRef, useState } from "react";

const CANONICAL = "https://subtitlesedit.com/subtitle-tag-stripper";
const META_DESC =
  "Strip HTML tags, color codes, position tags, and hearing-impaired annotations from SRT and VTT subtitle files. Free, browser-based, no upload.";
const PAGE_TITLE = "Subtitle Tag Stripper — Remove HTML & Formatting";
const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp";

const TS_LINE_RE =
  /\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{3}/;

const textareaClass =
  "w-full border border-slate-300 rounded-lg p-4 font-mono whitespace-pre-wrap resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 h-80 bg-white";

const skyBtnSolid =
  "inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

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
      "@id": "https://subtitlesedit.com/subtitle-tag-stripper#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://subtitlesedit.com" },
        { "@type": "ListItem", position: 2, name: "Subtitle Tag Stripper", item: "https://subtitlesedit.com/subtitle-tag-stripper" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-tag-stripper#webpage",
      url: "https://subtitlesedit.com/subtitle-tag-stripper",
      name: PAGE_TITLE,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": "https://subtitlesedit.com/#logo" },
      breadcrumb: { "@id": "https://subtitlesedit.com/subtitle-tag-stripper#breadcrumb" },
      mainEntity: { "@id": "https://subtitlesedit.com/subtitle-tag-stripper#tool" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-tag-stripper#tool",
      name: "Subtitle Tag Stripper",
      url: "https://subtitlesedit.com/subtitle-tag-stripper",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements: "Requires a modern web browser with JavaScript enabled",
      description:
        "A free, browser-based tool that strips HTML tags, color and styling tags, ASS/SSA position overrides, hearing-impaired annotations, and speaker labels from SRT and WebVTT subtitle files. Each option is an independent toggle, stripping is deterministic, and everything runs client-side, so files are never uploaded.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Strip italic, bold, and underline HTML tags",
        "Remove font color and WebVTT class styling tags",
        "Remove inline WebVTT timestamp (karaoke) tags",
        "Remove ASS/SSA position overrides such as an8 codes",
        "Optionally strip hearing-impaired annotations and speaker labels",
        "Auto-detects SRT and WebVTT; 100% client-side with no uploads",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-tag-stripper#faq",
      mainEntity: [
        { "@type": "Question", name: "Will this tool remove dialogue I want to keep?", acceptedAnswer: { "@type": "Answer", text: "By default, no. The smart defaults only strip HTML, color, and position tags — all of which are rendering instructions, not content. Hearing-impaired annotations and speaker labels are turned off by default because they are content you might want to keep. Only enable those toggles if you have reviewed your file and want them removed." } },
        { "@type": "Question", name: "Why didn't it remove every speaker label in my file?", acceptedAnswer: { "@type": "Answer", text: "The speaker label option only catches all-caps names followed by a colon, like JOHN: or DR. SMITH:. This is intentional — mixed-case names like Dr. Smith: are too easily confused with regular sentences that happen to end in a colon, so the tool plays it safe. If your file uses mixed-case speaker labels, use the Subtitle Find & Replace tool for targeted removal." } },
        { "@type": "Question", name: "Does this work with Advanced SubStation Alpha (.ass/.ssa) files?", acceptedAnswer: { "@type": "Answer", text: "Not directly — the tool reads SRT and VTT only. However, if you convert your .ass file to SRT first using a desktop tool like Subtitle Edit or Aegisub, the resulting SRT will often carry over position overrides like {\\an8}. Running the converted file through this tool strips those overrides cleanly." } },
        { "@type": "Question", name: "What happens to cues that become empty after stripping?", acceptedAnswer: { "@type": "Answer", text: "If a cue's text is entirely removed — for example, a cue that contained only [MUSIC PLAYING] when you strip hearing-impaired annotations — the entire cue is removed from the output, and the remaining cues are renumbered sequentially for SRT files. The status line reports how many empty cues were removed." } },
        { "@type": "Question", name: "Will my italics stay if I want to keep them?", acceptedAnswer: { "@type": "Answer", text: "Yes — uncheck the HTML tags option and italics, bold, and underline tags will be preserved. You can mix and match toggles to keep some formatting and strip the rest. For example, keep italics on but still strip the heavy color and position tags." } },
        { "@type": "Question", name: "Is anything uploaded to your server?", acceptedAnswer: { "@type": "Answer", text: "No. Everything happens inside your browser — your subtitle file never leaves your device. There is no upload, no account, and no tracking of file contents. You can verify this by disconnecting from the internet after loading the page; the tool will continue to work." } },
        { "@type": "Question", name: "Does stripping tags change my subtitle timing or cue order?", acceptedAnswer: { "@type": "Answer", text: "No. The tool only edits the dialogue text inside each cue; timestamps and the order of cues are left exactly as they are. The one exception is that SRT cues are renumbered when an empty cue is dropped, but their start and end times never move. If you also need to retime, use the Subtitle Time Shifter afterwards." } },
        { "@type": "Question", name: "How is the tag stripper different from Find & Replace?", acceptedAnswer: { "@type": "Answer", text: "The tag stripper applies preset rules for known subtitle markup — HTML, color, position, SDH, and speaker patterns — in one click. Subtitle Find & Replace is for arbitrary text you type in yourself, such as a recurring typo or a watermark line. Use the stripper for standard tags and Find & Replace for anything custom." } },
        { "@type": "Question", name: "Can I clean several subtitle files at once?", acceptedAnswer: { "@type": "Answer", text: "Not in a single pass — the tool processes one file at a time. Load a file, toggle the options you want, then copy or download the cleaned result and repeat for the next file. Because the settings stay put between files, batching by hand is quick once your toggles are set." } },
        { "@type": "Question", name: "Does it keep my WebVTT header and cue identifiers?", acceptedAnswer: { "@type": "Answer", text: "Yes — for VTT input the WEBVTT header line and each cue's identifier are preserved, and only the dialogue text inside cues is cleaned. Note that separate NOTE comment, STYLE, and REGION blocks are not carried into the output, so if you rely on a custom STYLE or REGION block, keep your original file." } },
      ],
    },
  ],
};

function stripBOM(text) {
  if (!text) return "";
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function normalizeNewlines(text) {
  return stripBOM(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

/** @returns {'vtt' | 'srt'} */
function detectFormat(text) {
  const head = normalizeNewlines(text).trimStart().slice(0, 20).toUpperCase();
  return head.includes("WEBVTT") ? "vtt" : "srt";
}

function isTimestampLine(line) {
  return TS_LINE_RE.test(line);
}

function countMatches(str, re) {
  if (!str) return 0;
  const flags = re.flags.includes("g") ? re.flags : `${re.flags}g`;
  const rg = new RegExp(re.source, flags);
  return Array.from(str.matchAll(rg)).length;
}

function countNonGlobal(str, re) {
  if (!str) return 0;
  return re.test(str) ? 1 : 0;
}

function originalTagCountForLines(textLines) {
  const s = textLines.join("\n");
  return s.match(/</g)?.length ?? 0;
}

/**
 * @param {string} text
 * @param {'srt' | 'vtt'} format
 */
function parseCues(text, format) {
  const raw = normalizeNewlines(text);
  const blocks = raw.split(/\n\n+/);
  /** @type {{ index: string | null, identifier: string | null, timestamp: string, textLines: string[], originalTagCount: number }[]} */
  const cues = [];

  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.replace(/\r$/, ""));
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
    if (lines.length === 0) continue;

    if (format === "vtt") {
      if (/^WEBVTT\b/i.test(lines[0].trim())) continue;
      if (/^NOTE\b/i.test(lines[0].trim())) continue;
      if (/^STYLE\b|^REGION\b/i.test(lines[0].trim())) continue;

      let identifier = null;
      let timestampIdx = 0;
      if (lines.length >= 2 && isTimestampLine(lines[1])) {
        identifier = lines[0];
        timestampIdx = 1;
      } else if (isTimestampLine(lines[0])) {
        identifier = null;
        timestampIdx = 0;
      } else {
        continue;
      }

      const timestamp = lines[timestampIdx];
      const textLines = lines.slice(timestampIdx + 1);
      cues.push({
        index: null,
        identifier,
        timestamp,
        textLines,
        originalTagCount: originalTagCountForLines(textLines),
      });
      continue;
    }

    // SRT
    let i = 0;
    let index = null;
    if (/^\d+$/.test(lines[0].trim()) && lines.length >= 2) {
      index = lines[0].trim();
      i = 1;
    }
    const timingLine = lines[i];
    if (!timingLine || !isTimestampLine(timingLine)) continue;
    const textLines = lines.slice(i + 1);
    cues.push({
      index,
      identifier: null,
      timestamp: timingLine,
      textLines,
      originalTagCount: originalTagCountForLines(textLines),
    });
  }

  return cues;
}

/**
 * @param {string[]} textLines
 * @param {{
 *   stripHtml: boolean
 *   stripColor: boolean
 *   stripPosition: boolean
 *   stripHI: boolean
 *   stripSpeakers: boolean
 * }} options
 */
function stripText(textLines, options) {
  let tagCount = 0;
  const cleanedLines = [];

  for (const line of textLines) {
    let s = line;

    if (options.stripHtml) {
      const re = /<\/?(i|b|u)>/gi;
      tagCount += countMatches(s, re);
      s = s.replace(re, "");
    }

    if (options.stripColor) {
      const patterns = [
        /<\/?font[^>]*>/gi,
        /<\/?c(\.[a-zA-Z0-9_-]+)*>/gi,
        /<\d{2}:\d{2}:\d{2}[.,]\d{3}>/g,
      ];
      for (const re of patterns) {
        tagCount += countMatches(s, re);
        s = s.replace(re, "");
      }
    }

    if (options.stripPosition) {
      const re = /\{\\[^}]*\}/g;
      tagCount += countMatches(s, re);
      s = s.replace(re, "");
    }

    if (options.stripHI) {
      const br = /\[[^\]]*\]/g;
      tagCount += countMatches(s, br);
      s = s.replace(br, "");
      const t = s.trim();
      if (t && /^\([^)]*\)$/.test(t)) {
        tagCount += 1;
        continue;
      }
    }

    if (options.stripSpeakers) {
      const re = /^[A-Z][A-Z\s.'-]{1,30}:\s*/;
      tagCount += countNonGlobal(s, re);
      s = s.replace(re, "");
    }

    s = s.replace(/\s+/g, " ").trim();
    if (s) cleanedLines.push(s);
  }

  return { cleanedLines, tagCount };
}

/**
 * @param {string} text
 * @param {{
 *   stripHtml: boolean
 *   stripColor: boolean
 *   stripPosition: boolean
 *   stripHI: boolean
 *   stripSpeakers: boolean
 * }} options
 */
function processSubtitles(text, options) {
  if (!text || !String(text).trim()) {
    return {
      output: "",
      tagCount: 0,
      cueCount: 0,
      removedCount: 0,
      format: "srt",
    };
  }

  const format = detectFormat(text);
  const cues = parseCues(text, format);
  let totalTagCount = 0;
  let removedCount = 0;
  const kept = [];

  for (const cue of cues) {
    const { cleanedLines, tagCount } = stripText(cue.textLines, options);
    totalTagCount += tagCount;
    if (cleanedLines.length === 0) {
      removedCount += 1;
      continue;
    }
    kept.push({ ...cue, textLines: cleanedLines });
  }

  const parts = [];
  if (format === "srt") {
    let n = 1;
    for (const cue of kept) {
      parts.push(
        String(n),
        cue.timestamp,
        cue.textLines.join("\n"),
        "",
      );
      n += 1;
    }
    const assembled = parts.join("\n");
    return {
      output: assembled.trim() ? `${assembled.trim()}\n` : "",
      tagCount: totalTagCount,
      cueCount: cues.length,
      removedCount,
      format,
    };
  }

  for (const cue of kept) {
    const head = cue.identifier ? `${cue.identifier}\n` : "";
    parts.push(`${head}${cue.timestamp}\n${cue.textLines.join("\n")}\n`, "");
  }
  const body = parts.join("\n").replace(/\n+$/, "");
  const assembled = body ? `WEBVTT\n\n${body}\n` : "WEBVTT\n\n";
  return {
    output: assembled,
    tagCount: totalTagCount,
    cueCount: cues.length,
    removedCount,
    format,
  };
}

function TagStripperTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [downloadFormat, setDownloadFormat] = useState("srt");

  const [stripHtml, setStripHtml] = useState(true);
  const [stripColor, setStripColor] = useState(true);
  const [stripPosition, setStripPosition] = useState(true);
  const [stripHI, setStripHI] = useState(false);
  const [stripSpeakers, setStripSpeakers] = useState(false);

  const fileRef = useRef(null);

  const fontStyle = { fontSize: `${fontSize}px` };

  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setStatus("");
      setDownloadFormat("srt");
      return;
    }
    const opts = {
      stripHtml,
      stripColor,
      stripPosition,
      stripHI,
      stripSpeakers,
    };
    const result = processSubtitles(input, opts);
    setOutput(result.output);
    setDownloadFormat(result.format);
    setStatus(
      `Stripped ${result.tagCount} tags across ${result.cueCount} cues. ${result.removedCount} empty cues removed.`,
    );
  }, [input, stripHtml, stripColor, stripPosition, stripHI, stripSpeakers]);

  const readFileAsText = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const t = typeof reader.result === "string" ? reader.result : "";
      setInput(t);
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const handleFileChoose = useCallback(
    (e) => {
      const f = e.target.files?.[0];
      if (f) readFileAsText(f);
      e.target.value = "";
    },
    [readFileAsText],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const f = e.dataTransfer.files?.[0];
      if (f) readFileAsText(f);
    },
    [readFileAsText],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 1500);
    } catch {
      /* ignore */
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const name =
      downloadFormat === "vtt" ? "cleaned.vtt" : "cleaned.srt";
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, downloadFormat]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setStatus("");
    setCopyLabel("Copy");
  }, []);

  const fontSizes = [12, 14, 16, 18, 20, 24];

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-8 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      aria-label="Subtitle Tag Stripper"
    >
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[2rem]">
          Subtitle Tag Stripper
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Strip HTML tags, color codes, position tags, and hearing-impaired
          annotations from SRT and VTT subtitle files. Auto-detects format. 100%
          browser-based — your files never leave your device.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-slate-700">Font size:</span>
        <div className="flex flex-wrap items-center gap-1">
          {fontSizes.map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`Font size ${n}px`}
              onClick={() => setFontSize(n)}
              className={`rounded-md px-2 py-1 font-semibold transition-colors ${
                fontSize === n
                  ? "bg-sky-500 text-white shadow-sm"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              style={{ fontSize: `${n}px`, lineHeight: 1 }}
            >
              A
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500">{fontSize}px</span>
      </div>

      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 font-semibold text-slate-700">
              Input subtitle file
            </div>
            <div className="mb-2">
              <input
                ref={fileRef}
                id="tag-stripper-file"
                type="file"
                accept=".srt,.vtt"
                className="hidden"
                onChange={handleFileChoose}
              />
              <button
                type="button"
                className={`${skyBtnSolid} cursor-pointer px-4 py-2`}
                onClick={() => fileRef.current?.click()}
              >
                Choose file
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              placeholder="Paste your SRT or VTT subtitle file here, or drop a file onto this area..."
              className={textareaClass}
              style={fontStyle}
              spellCheck={false}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-2 font-semibold text-slate-700">
              Cleaned output
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Cleaned subtitles will appear here..."
              className={textareaClass}
              style={fontStyle}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 font-semibold text-slate-700">What to strip</div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={stripHtml}
                onChange={(e) => setStripHtml(e.target.checked)}
                className="mt-0.5 accent-sky-500"
              />
              <span>
                HTML tags
                <span className="mt-0.5 block text-xs text-slate-400">
                  &lt;i&gt;italics&lt;/i&gt;, &lt;b&gt;bold&lt;/b&gt;
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={stripColor}
                onChange={(e) => setStripColor(e.target.checked)}
                className="mt-0.5 accent-sky-500"
              />
              <span>
                Color &amp; styling tags
                <span className="mt-0.5 block text-xs text-slate-400">
                  &lt;font color=&quot;...&quot;&gt; , &lt;c.classname&gt;
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={stripPosition}
                onChange={(e) => setStripPosition(e.target.checked)}
                className="mt-0.5 accent-sky-500"
              />
              <span>
                Position &amp; alignment tags
                <span className="mt-0.5 block text-xs text-slate-400">
                  {"{\\an8}"}, override codes
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={stripHI}
                onChange={(e) => setStripHI(e.target.checked)}
                className="mt-0.5 accent-sky-500"
              />
              <span>
                Hearing-impaired annotations
                <span className="mt-0.5 block text-xs text-slate-400">
                  [MUSIC PLAYING], (door slams)
                </span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={stripSpeakers}
                onChange={(e) => setStripSpeakers(e.target.checked)}
                className="mt-0.5 accent-sky-500"
              />
              <span>
                Speaker labels
                <span className="mt-0.5 block text-xs text-slate-400">
                  JOHN:, DR. SMITH:
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 transition-colors hover:bg-slate-100"
          >
            Clear
          </button>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className={`${skyBtnSolid} px-5 py-2.5`}
            >
              {copyLabel}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className={`${skyBtnSolid} px-5 py-2.5`}
            >
              Download
            </button>
          </div>
        </div>

        {input.trim() ? (
          <p className="mt-4 text-center text-sm text-slate-600">{status}</p>
        ) : null}
      </div>

      <div className="mx-auto mt-12 max-w-4xl px-4">
        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          How it works
        </h2>
        <ol className="mb-4 ml-6 list-decimal space-y-2 text-slate-700">
          <li>
            Paste your SRT or VTT subtitle file into the input area, or drop a
            file directly onto it.
          </li>
          <li>
            Choose what you want stripped — HTML tags, color codes, position tags,
            hearing-impaired annotations, or speaker labels.
          </li>
          <li>
            The cleaned output appears instantly in the right panel as you toggle
            options on and off.
          </li>
          <li>
            Review the changes — the tool reports how many tags it stripped and
            whether any cues were emptied.
          </li>
          <li>
            Copy the result to your clipboard or download it as a fresh SRT or
            VTT file.
          </li>
        </ol>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          What each option strips
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          HTML tags
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Standard inline formatting tags: &lt;i&gt;, &lt;b&gt;, &lt;u&gt;, and
          their closing counterparts. These are commonly added by video players or
          subtitle editors to render italics or bold, but many video editors and
          platforms reject them or render them as literal text.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Color and styling tags
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Strips &lt;font&gt; tags (including color and face attributes), VTT class
          cues like &lt;c.yellow&gt; or &lt;c.speaker-1&gt;, and inline VTT
          timestamp tags like &lt;00:00:01.500&gt; that are used for karaoke-style
          highlighting. These are the most common cause of &quot;garbled-looking&quot;
          subtitle files.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Position and alignment tags
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Removes SubStation Alpha-style override codes wrapped in curly braces,
          such as {"{\\an8}"} for top-of-screen positioning. These tags survive when
          subtitles are converted from .ass or .ssa files and often confuse simpler
          video players.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Hearing-impaired annotations
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Strips bracketed descriptions like [MUSIC PLAYING], [DOOR SLAMS], or
          [LAUGHTER], and removes standalone parenthetical lines. This is the
          fastest way to convert SDH subtitles (Subtitles for the Deaf and Hard of
          Hearing) into standard dialogue-only subtitles.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Speaker labels
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Removes all-caps speaker prefixes at the start of cues, like JOHN:, MARY:,
          or DR. SMITH:. The tool uses a conservative pattern to avoid stripping
          mixed-case names that might appear inside dialogue.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Common use cases
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Cleaning subtitles downloaded from OpenSubtitles or Subscene
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Subtitle archives are full of files that include HTML formatting, position
          overrides from .ass conversions, and SDH annotations the user does not
          want. One pass through the tag stripper turns a messy download into a clean
          SRT ready to use in any player or video editor.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Preparing subtitles for video editing software
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Premiere Pro, DaVinci Resolve, and Final Cut handle subtitle imports
          inconsistently when tags are present — some render &lt;i&gt; as italics,
          some show it as literal text, some reject the file entirely. Stripping all
          formatting tags first gives you a clean baseline you can re-style inside
          your editor.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Converting SDH subtitles to standard subtitles
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          SDH tracks include audio descriptions and speaker IDs that are essential
          for accessibility but unnecessary for hearing viewers. Enable
          hearing-impaired annotations and speaker labels together to extract just the
          dialogue, then save the result as a parallel standard subtitle track.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Why use this tool
        </h2>
        <p className="mb-4 leading-relaxed text-slate-700">
          Deterministic stripping means the same file and the same checkboxes always
          produce the same cleaned output — no paraphrasing, no dropped dialogue, and
          none of the silent &quot;helpful&quot; rewrites you risk when you paste a
          full script into an AI chat. Privacy is absolute: parsing runs entirely in
          your browser, so nothing uploads, nothing is stored on a server, and you
          never need an account. That also sidesteps the token and context limits
          that make AI tools choke on long subtitle tracks past a few thousand cues;
          plain JavaScript regular expressions chew through a three-hour film in one
          pass on an ordinary laptop. Every toggle is live and reversible, so you
          can audition hearing-impaired text or speaker labels before you commit —
          nothing is final until you copy or save. It fits the rest of SubtitlesEdit
          naturally: clean the markup first, then{" "}
          <Link
            href="/subtitle-time-shifter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            time-shift
          </Link>{" "}
          the timeline,{" "}
          <Link
            href="/srt-to-vtt-converter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            convert format
          </Link>{" "}
          for your NLE, or{" "}
          <Link
            href="/subtitle-encoding-fixer"
            className="text-sky-600 underline hover:text-sky-700"
          >
            fix encoding
          </Link>{" "}
          when a download arrives garbled.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Frequently Asked Questions
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Will this tool remove dialogue I want to keep?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          By default, no. The smart defaults only strip HTML, color, and position
          tags — all of which are rendering instructions, not content.
          Hearing-impaired annotations and speaker labels are turned off by default
          because they are content you might want to keep. Only enable those toggles
          if you have reviewed your file and want them removed.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Why didn&apos;t it remove every speaker label in my file?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The speaker label option only catches all-caps names followed by a colon,
          like JOHN: or DR. SMITH:. This is intentional — mixed-case names like
          &quot;Dr. Smith:&quot; are too easily confused with regular sentences that
          happen to end in a colon, so the tool plays it safe. If your file uses
          mixed-case speaker labels, you can use the{" "}
          <Link
            href="/subtitle-find-replace"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Find &amp; Replace
          </Link>{" "}
          tool for targeted removal.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Does this work with Advanced SubStation Alpha (.ass/.ssa) files?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Not directly — the tool reads SRT and VTT only. However, if you convert
          your .ass file to SRT first using a desktop tool like Subtitle Edit or
          Aegisub, the resulting SRT will often carry over position overrides like{" "}
          {"{\\an8}"}. Running the converted file through this tool strips those
          overrides cleanly.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          What happens to cues that become empty after stripping?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          If a cue&apos;s text is entirely removed — for example, a cue that
          contained only [MUSIC PLAYING] when you strip hearing-impaired annotations
          — the entire cue is removed from the output, and the remaining cues are
          renumbered sequentially for SRT files. The status line reports how many
          empty cues were removed.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Will my italics stay if I want to keep them?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Yes — uncheck the &quot;HTML tags&quot; option and italics, bold, and
          underline tags will be preserved. You can mix and match toggles to keep
          some formatting and strip the rest. For example, keep italics on but still
          strip the heavy color and position tags.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Is anything uploaded to your server?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          No. Everything happens inside your browser — your subtitle file never
          leaves your device. There is no upload, no account, and no tracking of file
          contents. You can verify this by disconnecting from the internet after
          loading the page; the tool will continue to work.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Does stripping tags change my subtitle timing or cue order?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          No. The tool only edits the dialogue text inside each cue; timestamps and
          the order of cues are left exactly as they are. The one exception is that
          SRT cues are renumbered when an empty cue is dropped, but their start and
          end times never move. If you also need to retime, use the{" "}
          <Link
            href="/subtitle-time-shifter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Time Shifter
          </Link>{" "}
          afterwards.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          How is the tag stripper different from Find &amp; Replace?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The tag stripper applies preset rules for known subtitle markup — HTML,
          color, position, SDH, and speaker patterns — in one click. The{" "}
          <Link
            href="/subtitle-find-replace"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Find &amp; Replace
          </Link>{" "}
          tool is for arbitrary text you type in yourself, such as a recurring typo
          or a watermark line. Use the stripper for standard tags and Find &amp;
          Replace for anything custom.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Can I clean several subtitle files at once?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Not in a single pass — the tool processes one file at a time. Load a file,
          toggle the options you want, then copy or download the cleaned result and
          repeat for the next file. Because the settings stay put between files,
          batching by hand is quick once your toggles are set.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Does it keep my WebVTT header and cue identifiers?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Yes — for VTT input the WEBVTT header line and each cue&apos;s identifier
          are preserved, and only the dialogue text inside cues is cleaned. Note that
          separate NOTE comment, STYLE, and REGION blocks are not carried into the
          output, so if you rely on a custom STYLE or REGION block, keep your
          original file.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Related tools
        </h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-700">
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
              href="/subtitle-encoding-fixer"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Encoding Fixer
            </Link>
          </li>
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
              href="/srt-to-vtt-converter"
              className="text-sky-600 underline hover:text-sky-700"
            >
              SRT to VTT Converter
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function SubtitleTagStripperPage() {
  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
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
          <TagStripperTool />
        </div>
      </Layout>
    </>
  );
}

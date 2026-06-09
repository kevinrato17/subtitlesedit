import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import Layout from "../components/Layout";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const ol =
  "mb-4 list-decimal pl-5 text-[#334155] space-y-2 [&_p]:mb-0 [&_li>p]:mb-0";

const PAGE_TITLE = "SRT to TXT Converter — Extract Subtitle Text Free";
const META_DESC =
  "Convert SRT subtitles to plain TXT in your browser. Extract dialogue text with or without timestamps. Free, private, no uploads or sign-up.";
const CANONICAL = "https://subtitlesedit.com/srt-to-txt-converter";
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
      "@id": "https://subtitlesedit.com/srt-to-txt-converter#breadcrumb",
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
          name: "SRT to TXT Converter",
          item: "https://subtitlesedit.com/srt-to-txt-converter",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/srt-to-txt-converter#webpage",
      url: "https://subtitlesedit.com/srt-to-txt-converter",
      name: PAGE_TITLE,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      primaryImageOfPage: { "@id": "https://subtitlesedit.com/#logo" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/srt-to-txt-converter#breadcrumb",
      },
      mainEntity: {
        "@id": "https://subtitlesedit.com/srt-to-txt-converter#tool",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/srt-to-txt-converter#tool",
      name: "SRT to TXT Converter",
      url: "https://subtitlesedit.com/srt-to-txt-converter",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in a web browser)",
      browserRequirements:
        "Requires a modern web browser with JavaScript enabled",
      description:
        "Free browser-based tool that extracts plain text from SubRip (SRT) subtitle files. Runs entirely client-side with no uploads; it outputs dialogue with or without start timestamps and strips inline italic, bold, and font tags.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Extract plain dialogue text from SRT subtitles",
        "Optional timestamped output with cue start times",
        "100% client-side processing with no file uploads",
        "Removes inline italic, bold, and font tags",
        "Copy the output or download a .txt file",
      ],
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/srt-to-txt-converter#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the SRT to TXT converter free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The converter is completely free with no sign-up, no watermarks, and no limit on how many files you convert. Because everything runs in your browser, there are no server costs to pass on, so you can extract text from as many SRT files as you need at no charge.",
          },
        },
        {
          "@type": "Question",
          name: "Are my subtitle files uploaded anywhere?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Every step runs locally in your browser using JavaScript, so your SRT content never leaves your device or touches a server. That makes the tool safe for confidential transcripts, unreleased scripts, and client work, and it also means conversion is instant with no upload wait.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between plain text and timestamped output?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Plain text only returns dialogue lines with no timings, one cue per line, which is ideal for transcripts and drafts. Include timestamps prefixes each line with the cue's start time in brackets, like [00:01:02] Hello there, which helps when you need to reference where a line appears in the video.",
          },
        },
        {
          "@type": "Question",
          name: "Which formatting tags does the converter remove?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The converter strips common inline subtitle markup such as italics, bold, and font tags, so your text reads cleanly without leftover code. The words between those tags are always kept; only the tags themselves are removed, leaving plain readable dialogue.",
          },
        },
        {
          "@type": "Question",
          name: "How are multi-line subtitle cues handled?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When a single cue spans two or more lines, the converter joins them into one line separated by a space, so each cue becomes a single readable sentence. This keeps the transcript tidy and avoids the awkward mid-sentence breaks that on-screen subtitle wrapping introduces.",
          },
        },
        {
          "@type": "Question",
          name: "Why am I getting an \"Invalid SRT cue\" error?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "That error means a block does not match SRT structure, usually a missing or malformed timestamp line. Each cue needs timings in the pattern 00:00:00,000 --> 00:00:00,000, optionally preceded by a cue number. Fix the broken timing line and convert again.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert VTT files to TXT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This page is built for SRT specifically. For WebVTT files, use our VTT to TXT Converter, which handles WebVTT cue syntax directly. If you have an SRT but need WebVTT later, the SRT to VTT Converter covers that direction too.",
          },
        },
        {
          "@type": "Question",
          name: "Can I clean up the dialogue before converting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. To fix recurring typos or names first, run the file through Subtitle Find and Replace, or remove leftover styling with the Subtitle Tag Stripper, then bring the cleaned SRT here so your TXT transcript comes out polished.",
          },
        },
        {
          "@type": "Question",
          name: "Does this tool work offline?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "After the page loads once, the converter keeps working without a connection in most modern browsers, because all processing is client-side. If you reload the tab while offline it may not reopen, so keep the page open if you plan to convert several files away from a network.",
          },
        },
        {
          "@type": "Question",
          name: "What can I do with the converted TXT file?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use it as a transcript, a script or blog draft, a translation source document, AI prompt material, podcast show notes, or accessibility copy. Plain text drops easily into word processors and content tools that cannot read subtitle markup, so the dialogue becomes reusable across almost any workflow.",
          },
        },
        {
          "@type": "Question",
          name: "Which browsers and devices does it work on?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The converter runs in any modern browser such as Chrome, Edge, Firefox, or Safari, on Windows, macOS, Linux, Android, or iOS. No installation, extension, or account is required. On mobile you can paste SRT text straight into the box if choosing a file is awkward on your device.",
          },
        },
        {
          "@type": "Question",
          name: "Will large subtitle files convert without issues?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Subtitle files are small as text, so even a feature-length SRT with thousands of cues converts almost instantly on a typical phone or laptop. Because the work happens locally there is no upload size cap; the only practical limit is your device's available memory.",
          },
        },
      ],
    },
  ],
};

/** Matches SRT timestamp line: 00:00:00,000 --> 00:00:00,000 (comma or dot ms). */
const TIMESTAMP_LINE_RE =
  /^\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[,.]\d{3}/;

/** Strip common inline subtitle tags (<i>, <b>, <font …>, closing tags). */
const STRIP_TAGS_RE = /<\/?(?:i|b|font)(?:\s[^>]*)?>/gi;

function stripSubtitleTags(text) {
  return text.replace(STRIP_TAGS_RE, "");
}

/**
 * Normalize Windows/mac line endings to \n at the start of processing.
 */
function normalizeLineEndings(raw) {
  return String(raw)
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

/**
 * Parse SRT: split by blank lines into cue blocks.
 * Each block: optional cue number, timestamp line, then one or more text lines.
 * Handles extra blank lines between cues and missing cue numbers (timestamp first).
 */
function parseSrtToCues(srtText) {
  const normalized = normalizeLineEndings(srtText).trim();
  if (!normalized) {
    return { ok: false, error: "No subtitle content to convert.", cues: [] };
  }

  const blocks = normalized
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const cues = [];

  for (let b = 0; b < blocks.length; b++) {
    const lines = blocks[b].split("\n").map((line) => line.trim());
    if (lines.length === 0) continue;

    let timeLine;
    let textStart;

    if (TIMESTAMP_LINE_RE.test(lines[0])) {
      timeLine = lines[0];
      textStart = 1;
    } else if (
      lines.length >= 2 &&
      /^\d+$/.test(lines[0]) &&
      TIMESTAMP_LINE_RE.test(lines[1])
    ) {
      timeLine = lines[1];
      textStart = 2;
    } else {
      return {
        ok: false,
        error: `Invalid SRT cue (block ${b + 1}): expected a cue number followed by a timestamp line, or a timestamp line first. Check that timings use the pattern 00:00:00,000 --> 00:00:00,000.`,
        cues: [],
      };
    }

    const textLines = lines.slice(textStart).filter((ln) => ln.length > 0);
    const startRaw = timeLine.split(/-->/)[0].trim();
    cues.push({
      startDisplay: startRaw.replace(/[,.]\d{3}$/, ""),
      textLines,
    });
  }

  if (cues.length === 0) {
    return {
      ok: false,
      error:
        "Could not find any subtitle cues. Make sure the file is valid SRT format.",
      cues: [],
    };
  }

  return { ok: true, error: "", cues };
}

function buildPlainTextOutput(cues) {
  return cues
    .map((cue) =>
      cue.textLines
        .map((line) => stripSubtitleTags(line).trim())
        .filter(Boolean)
        .join(" ")
    )
    .join("\n");
}

function buildTimestampedOutput(cues) {
  return cues
    .map((cue) => {
      const body = cue.textLines
        .map((line) => stripSubtitleTags(line).trim())
        .filter(Boolean)
        .join(" ");
      return `[${cue.startDisplay}] ${body}`;
    })
    .join("\n");
}

function deriveTxtFilename(uploadName) {
  if (!uploadName || typeof uploadName !== "string") return "subtitles.txt";
  const lower = uploadName.toLowerCase();
  if (lower.endsWith(".srt")) {
    return `${uploadName.slice(0, -4)}.txt`;
  }
  return `${uploadName.replace(/\.[^/.]+$/, "")}.txt`;
}

function DotIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 shrink-0 fill-[#046bd2]"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      className="h-4 w-4 shrink-0 fill-[#0ea5e9]"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-60";

function SrtToTxtConverterTool() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [outputMode, setOutputMode] = useState("plain");
  const [filename, setFilename] = useState("subtitles.txt");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChosen = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setInputText(String(reader.result || ""));
      setFilename(deriveTxtFilename(file.name));
      setErrorMessage("");
      setSuccess(false);
    };
    reader.onerror = () => {
      setErrorMessage("Could not read that file. Try another .srt file.");
      setSuccess(false);
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const onConvert = useCallback(() => {
    setErrorMessage("");
    setSuccess(false);
    const parsed = parseSrtToCues(inputText);
    if (!parsed.ok) {
      setOutputText("");
      setErrorMessage(parsed.error);
      return;
    }
    const out =
      outputMode === "timestamp"
        ? buildTimestampedOutput(parsed.cues)
        : buildPlainTextOutput(parsed.cues);
    setOutputText(out);
    setSuccess(true);
  }, [inputText, outputMode]);

  const onCopy = useCallback(async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setSuccess(true);
      setErrorMessage("");
    } catch {
      setErrorMessage("Copy failed. Select the text manually or try again.");
      setSuccess(false);
    }
  }, [outputText]);

  const onDownload = useCallback(() => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "subtitles.txt";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSuccess(true);
    setErrorMessage("");
  }, [outputText, filename]);

  return (
    <div
      className="se-scope mx-auto my-6 max-w-[980px] font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      id="srt-txt-tool"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-3">
        {/* Drop zone + file input */}
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            const f = e.dataTransfer.files && e.dataTransfer.files[0];
            if (f) handleFileChosen(f);
          }}
          className={`mb-4 cursor-pointer rounded-lg border-2 border-dashed border-sky-300 px-4 py-8 text-center transition hover:border-sky-500 ${
            dragActive ? "border-sky-500 bg-sky-50" : "bg-white"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".srt,text/plain"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (f) handleFileChosen(f);
              e.target.value = "";
            }}
          />
          <p className="text-sm font-medium text-[#111827]">
            Drag and drop an .srt file here
          </p>
          <p className="mt-1 text-xs text-[#666666]">or click to choose a file</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="min-w-[300px] flex-1 basis-[420px]">
            <div className="my-1 font-semibold text-[#111827]">
              Paste SRT or use the drop zone above
            </div>
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setErrorMessage("");
                setSuccess(false);
                setFilename("subtitles.txt");
              }}
              placeholder="Paste SRT subtitle text here..."
              className="min-h-[220px] w-full rounded-[10px] border border-gray-300 p-2 font-mono text-base leading-snug"
            />
            <div className="mt-3 space-y-2">
              <span className="text-sm font-medium text-[#111827]">
                Output mode
              </span>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#334155]">
                  <input
                    type="radio"
                    name="srt-txt-mode"
                    className="text-sky-500 focus:ring-sky-500"
                    checked={outputMode === "plain"}
                    onChange={() => setOutputMode("plain")}
                  />
                  Plain text only
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[#334155]">
                  <input
                    type="radio"
                    name="srt-txt-mode"
                    className="text-sky-500 focus:ring-sky-500"
                    checked={outputMode === "timestamp"}
                    onChange={() => setOutputMode("timestamp")}
                  />
                  Include timestamps
                </label>
              </div>
            </div>
            <div className="mt-1.5 text-xs text-[#666666]">
              Accepted: <b>.srt</b>. Conversion runs in your browser only.
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <button type="button" onClick={onConvert} className={primaryBtnClass}>
                Convert to TXT
              </button>
            </div>
          </div>

          <div className="min-w-[300px] flex-1 basis-[420px]">
            <div className="my-1 font-semibold text-[#111827]">
              Converted output (TXT)
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Converted text will appear here..."
              className="min-h-[220px] w-full rounded-[10px] border border-gray-300 bg-white p-2 font-mono text-base leading-snug"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onCopy}
                disabled={!outputText}
                className={primaryBtnClass}
              >
                Copy to Clipboard
              </button>
              <button
                type="button"
                onClick={onDownload}
                disabled={!outputText}
                className={primaryBtnClass}
              >
                Download .txt File
              </button>
            </div>
            {errorMessage ? (
              <p className="mt-2 text-[0.95rem] text-red-600" role="alert">
                {errorMessage}
              </p>
            ) : null}
            {success && !errorMessage ? (
              <p className="mt-2 text-[0.95rem] text-emerald-700">
                Success — your text is ready to copy or download.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const faqItemTitle =
  "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";

function FaqSection() {
  const items = [
    {
      q: "Is the SRT to TXT converter free to use?",
      id: "faq-free",
      body: (
        <p>
          Yes. The converter is completely free with no sign-up, no watermarks,
          and no limit on how many files you convert. Because everything runs in
          your browser, there are no server costs to pass on, so you can extract
          text from as many SRT files as you need at no charge.
        </p>
      ),
    },
    {
      q: "Are my subtitle files uploaded anywhere?",
      id: "faq-privacy",
      body: (
        <p>
          No. Every step runs locally in your browser using JavaScript, so your
          SRT content never leaves your device or touches a server. That makes
          the tool safe for confidential transcripts, unreleased scripts, and
          client work, and it also means conversion is instant with no upload
          wait.
        </p>
      ),
    },
    {
      q: "What's the difference between plain text and timestamped output?",
      id: "faq-modes",
      body: (
        <p>
          <strong>Plain text only</strong> returns dialogue lines with no
          timings, one cue per line — ideal for transcripts and drafts.{" "}
          <strong>Include timestamps</strong> prefixes each line with the
          cue&apos;s start time in brackets, like{" "}
          <code className="rounded bg-gray-100 px-1">[00:01:02] Hello there</code>
          , which helps when you need to reference where a line appears in the
          video.
        </p>
      ),
    },
    {
      q: "Which formatting tags does the converter remove?",
      id: "faq-tags",
      body: (
        <p>
          The converter strips common inline subtitle markup — italics (
          <code className="rounded bg-gray-100 px-1">&lt;i&gt;</code>), bold (
          <code className="rounded bg-gray-100 px-1">&lt;b&gt;</code>), and{" "}
          <code className="rounded bg-gray-100 px-1">&lt;font&gt;</code> tags — so
          your text reads cleanly without leftover code. The words between those
          tags are always kept; only the tags themselves are removed.
        </p>
      ),
    },
    {
      q: "How are multi-line subtitle cues handled?",
      id: "faq-multiline",
      body: (
        <p>
          When a single cue spans two or more lines, the converter joins them
          into one line separated by a space, so each cue becomes a single
          readable sentence. This keeps the transcript tidy and avoids the
          awkward mid-sentence breaks that on-screen subtitle wrapping
          introduces.
        </p>
      ),
    },
    {
      q: "Why am I getting an \"Invalid SRT cue\" error?",
      id: "faq-error",
      body: (
        <p>
          That error means a block does not match SRT structure — usually a
          missing or malformed timestamp line. Each cue needs timings in the
          pattern{" "}
          <code className="rounded bg-gray-100 px-1">
            00:00:00,000 --&gt; 00:00:00,000
          </code>
          , optionally preceded by a cue number. Fix the broken timing line and
          convert again.
        </p>
      ),
    },
    {
      q: "Can I convert VTT files to TXT?",
      id: "faq-vtt",
      body: (
        <p>
          This page is built for SRT specifically. For WebVTT files, use our{" "}
          <a
            href="/vtt-to-txt-converter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            VTT to TXT Converter
          </a>
          , which handles WebVTT cue syntax directly. If you have an SRT but need
          WebVTT later, the{" "}
          <a
            href="/srt-to-vtt-converter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            SRT to VTT Converter
          </a>{" "}
          covers that direction too.
        </p>
      ),
    },
    {
      q: "Can I clean up the dialogue before converting?",
      id: "faq-cleanup",
      body: (
        <p>
          Yes. To fix recurring typos or names first, run the file through{" "}
          <a
            href="/subtitle-find-replace"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Find &amp; Replace
          </a>
          , or remove leftover styling with the{" "}
          <a
            href="/subtitle-tag-stripper"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Tag Stripper
          </a>
          , then bring the cleaned SRT here so your TXT transcript comes out
          polished.
        </p>
      ),
    },
    {
      q: "Does this tool work offline?",
      id: "faq-offline",
      body: (
        <p>
          After the page loads once, the converter keeps working without a
          connection in most modern browsers, because all processing is
          client-side. If you reload the tab while offline it may not reopen, so
          keep the page open if you plan to convert several files away from a
          network.
        </p>
      ),
    },
    {
      q: "What can I do with the converted TXT file?",
      id: "faq-uses",
      body: (
        <p>
          Use it as a transcript, a script or blog draft, a translation source
          document, AI prompt material, podcast show notes, or accessibility
          copy. Plain text drops easily into word processors and content tools
          that cannot read subtitle markup, so the dialogue becomes reusable
          across almost any workflow.
        </p>
      ),
    },
    {
      q: "Which browsers and devices does it work on?",
      id: "faq-browsers",
      body: (
        <p>
          The converter runs in any modern browser — Chrome, Edge, Firefox, or
          Safari — on Windows, macOS, Linux, Android, or iOS. No installation,
          extension, or account is required. On mobile you can paste SRT text
          straight into the box if choosing a file is awkward on your device.
        </p>
      ),
    },
    {
      q: "Will large subtitle files convert without issues?",
      id: "faq-largefiles",
      body: (
        <p>
          Yes. Subtitle files are small as text, so even a feature-length SRT
          with thousands of cues converts almost instantly on a typical phone or
          laptop. Because the work happens locally there is no upload size cap;
          the only practical limit is your device&apos;s available memory.
        </p>
      ),
    },
  ];

  return (
    <div
      className="divide-y divide-gray-100"
      aria-label="Frequently asked questions"
    >
      {items.map((row, i) => (
        <details key={row.id} id={row.id} className="group" open={i === 0}>
          <summary className={faqItemTitle}>
            <span>{row.q}</span>
            <span className="shrink-0 text-[#046bd2]">
              <span className="hidden group-open:inline">−</span>
              <span className="inline group-open:hidden">+</span>
            </span>
          </summary>
          <div className="pb-4 pl-1 text-[#334155] leading-relaxed">{row.body}</div>
        </details>
      ))}
    </div>
  );
}

export default function SrtToTxtConverterPage() {
  return (
    <Layout>
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

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article className="ast-article-single" id="post-srt-to-txt">
            <div className="entry-content clear px-0">
              <div className="px-4 sm:px-6 lg:px-[3rem]">
                <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
                  <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    SRT to TXT Converter
                  </h1>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
                    Extract plain text from your SRT subtitle files instantly —
                    100% in your browser, no uploads.
                  </p>
                </div>

                <SrtToTxtConverterTool />
              </div>

              <div className={`${section} entry-content`}>
                <h2 className={h2}>Why Convert SRT to TXT?</h2>
                <p className={p}>
                  Turning subtitles into plain text makes it easy to{" "}
                  <strong>repurpose dialogue</strong> for articles, newsletters,
                  course notes, or social posts without retyping everything by
                  hand.
                </p>
                <p className={p}>
                  Many teams paste clean transcripts into{" "}
                  <strong>AI prompts</strong> for summarization, tagging, or
                  rewriting—timestamp-free text is often the most useful starting
                  point.
                </p>
                <p className={p}>
                  If you are preparing a <strong>translation</strong>, a TXT
                  export gives linguists readable source copy that is simpler to
                  segment and gloss than raw SRT markup.
                </p>
                <p className={p}>
                  You can also use the output as a quick{" "}
                  <strong>transcript</strong> for accessibility reviews, captions
                  QA, podcast show notes, or <strong>blog content</strong> drafts
                  built from what was actually spoken on screen.
                </p>

                <h2 className={h2}>How to Use the SRT to TXT Converter</h2>
                <ol className={ol}>
                  <li>
                    <p>
                      <strong>Add your SRT</strong>
                      <br />
                      Drag and drop an .srt file onto the dashed area, click to
                      choose a file, or paste SRT content into the text box.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Choose an output mode</strong>
                      <br />
                      Pick “Plain text only” for dialogue-only lines, or
                      “Include timestamps” to prefix each line with start times.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Convert</strong>
                      <br />
                      Click “Convert to TXT” to extract text instantly in your
                      browser—nothing is uploaded.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Copy or download</strong>
                      <br />
                      Copy the result to your clipboard or download a .txt file
                      (named from your upload when possible).
                    </p>
                  </li>
                </ol>

                <h2 className={h2}>Plain Text vs Timestamped Output</h2>
                <p className={p}>
                  The converter offers two output modes, and the right one
                  depends on what you plan to do with the text. Both strip
                  subtitle markup and give you clean, readable lines — the only
                  difference is whether each line keeps its start time.
                </p>
                <p className={p}>
                  <strong>Plain text only</strong> is best for a
                  natural-reading transcript: a blog draft, translation source,
                  or AI prompt where timings would only get in the way.{" "}
                  <strong>Include timestamps</strong> is better for review and
                  QA work, where being able to jump to the moment a line is
                  spoken matters.
                </p>
                <p className={p}>Here is the same SRT cue block in each mode:</p>
                <div className="mb-4">
                  <div className="mb-2 text-sm font-semibold text-slate-700">
                    SRT input
                  </div>
                  <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                    <code>{`1
00:00:01,000 --> 00:00:04,000
<i>Welcome</i> to the show.

2
00:00:04,500 --> 00:00:07,200
Thanks for joining us today.`}</code>
                  </pre>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-700">
                      Plain text only
                    </div>
                    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <code>{`Welcome to the show.
Thanks for joining us today.`}</code>
                    </pre>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-semibold text-slate-700">
                      Include timestamps
                    </div>
                    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                      <code>{`[00:00:01] Welcome to the show.
[00:00:04] Thanks for joining us today.`}</code>
                    </pre>
                  </div>
                </div>

                <h2 className={h2}>Features</h2>
                <ul className="mb-6 space-y-3 text-[#334155]">
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      100% browser-based — no server uploads and no waiting in a
                      queue.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Instant conversion for typical subtitle files, with clear
                      errors when a cue does not look like valid SRT.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Private by design — your file stays on your device for the
                      whole workflow.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Two output modes: plain dialogue only, or one line per cue
                      with bracketed start times.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      Works with standard SRT cue blocks, including cues with
                      multi-line text and common inline tags stripped from the
                      output.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>Free forever — no trial limits or subscription.</span>
                  </li>
                </ul>

                <h2 className={h2}>Who Uses an SRT to TXT Converter</h2>
                <p className={p}>
                  Extracting plain text from subtitles is useful well beyond
                  video editing. A few groups reach for it regularly:
                </p>
                <ul className="mb-6 space-y-3 text-[#334155]">
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <strong>Content creators and marketers</strong> turn
                      spoken video into blog posts, newsletters, and social
                      captions without retyping a word.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <strong>Translators and localizers</strong> pull readable
                      source copy that is far easier to segment than raw SRT
                      markup.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <strong>Researchers and students</strong> convert lecture
                      or interview captions into searchable, quotable notes.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <strong>Accessibility and QA teams</strong> read the full
                      script as plain text to proof wording and catch errors.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <strong>Anyone using AI tools</strong> feeds clean,
                      timestamp-free dialogue into chatbots for summaries,
                      tagging, or rewriting.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={section}>
                <h2 className={h2}>Frequently Asked Questions</h2>
                <FaqSection />
              </div>

              <div className={`${section} entry-content`}>
                <h2 className={h2}>Related Subtitle Tools</h2>
                <ul className="mb-6 space-y-3">
                  <li>
                    <a
                      href="/srt-to-vtt-converter"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>SRT to VTT Converter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/vtt-to-srt-converter"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>VTT to SRT Converter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-time-shifter"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Time Shifter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-merger"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Merger</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-splitter"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Splitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/subtitle-overlap-fixer"
                      className="flex items-start gap-3 text-[#046bd2] hover:text-[#045cb4]"
                    >
                      <DotIcon />
                      <span>Subtitle Overlap Fixer</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

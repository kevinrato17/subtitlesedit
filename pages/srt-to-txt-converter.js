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

const PAGE_TITLE =
  "SRT to TXT Converter – Free Online Tool to Extract Text from SRT Subtitles";
const META_DESC =
  "Convert SRT subtitle files to plain TXT instantly in your browser. Extract dialogue text from subtitles with or without timestamps. Free, private, no uploads.";
const CANONICAL = "https://subtitlesedit.com/srt-to-txt-converter";

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
      q: "Is the SRT to TXT Converter free to use?",
      id: "faq-free",
      body: (
        <p>
          Yes. The tool is free with no sign-up, no watermarks, and no limits on
          how many files you convert.
        </p>
      ),
    },
    {
      q: "Are my subtitle files uploaded anywhere?",
      id: "faq-privacy",
      body: (
        <p>
          No. Everything runs locally in your browser. Your SRT content never
          leaves your device.
        </p>
      ),
    },
    {
      q: "What's the difference between plain text and timestamped output?",
      id: "faq-modes",
      body: (
        <p>
          <strong>Plain text only</strong> gives you dialogue lines only, one cue
          per line, with basic tags like{" "}
          <code className="rounded bg-gray-100 px-1">&lt;i&gt;</code> removed.{" "}
          <strong>Include timestamps</strong> adds the start time in brackets
          before each line, like{" "}
          <code className="rounded bg-gray-100 px-1">
            [00:01:02] Hello there
          </code>
          .
        </p>
      ),
    },
    {
      q: "Can I convert VTT files to TXT?",
      id: "faq-vtt",
      body: (
        <p>
          This page is built for SRT. For WebVTT, open your .vtt in an editor,
          copy the cues, or use an SRT-based workflow (for example convert with
          the VTT to SRT tool first, then extract text here).
        </p>
      ),
    },
    {
      q: "Does this tool work offline?",
      id: "faq-offline",
      body: (
        <p>
          After the page has loaded once, the converter keeps working offline in
          most browsers because processing is entirely client-side.
        </p>
      ),
    },
    {
      q: "What can I do with the converted TXT file?",
      id: "faq-uses",
      body: (
        <p>
          Use it as a transcript, blog or script draft, translation source
          document, AI prompt material, captions for documents, or any workflow
          that needs plain text instead of subtitles.
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

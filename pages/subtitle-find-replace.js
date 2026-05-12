import Head from "next/head";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import Layout from "../components/Layout";

const META_DESC =
  "Find and replace text across subtitle files in your browser. Supports SRT, VTT, TXT with regex and case-sensitive options. Timestamps preserved.";

const OG_URL = "https://subtitlesedit.com/subtitle-find-replace";
const OG_TITLE =
  "Subtitle Find & Replace — Edit SRT, VTT, TXT Online Free";

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Clone so lastIndex never leaks between operations. */
function regexClone(re) {
  return new RegExp(re.source, re.flags);
}

function countMatchesInString(str, re) {
  if (!str) return 0;
  const r = regexClone(re);
  const m = str.match(r);
  return m ? m.length : 0;
}

function replaceInString(str, re, replacement) {
  return str.replace(regexClone(re), replacement);
}

function detectFileKind(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".srt")) return "srt";
  if (lower.endsWith(".vtt")) return "vtt";
  if (lower.endsWith(".txt")) return "txt";
  return "txt";
}

function processTxt(content, re, replacement) {
  const count = countMatchesInString(content, re);
  const output = replaceInString(content, re, replacement);
  return { output, count };
}

function processSrt(content, re, replacement) {
  const blocks = content.split(/\r?\n\r?\n/);
  let total = 0;
  const outBlocks = blocks.map((block) => {
    const lines = block.split(/\r?\n/);
    if (lines.length <= 2) return block;
    const head = lines.slice(0, 2);
    const tail = lines.slice(2);
    const newTail = tail.map((line) => {
      total += countMatchesInString(line, re);
      return replaceInString(line, re, replacement);
    });
    return [...head, ...newTail].join("\n");
  });
  return { output: outBlocks.join("\n\n"), count: total };
}

function isWebVttHeaderBlock(lines) {
  if (!lines.length) return false;
  return /^WEBVTT\b/.test(lines[0]);
}

function isNoteOrStyleBlock(lines) {
  if (!lines.length) return false;
  const first = lines[0].trim();
  if (first === "NOTE" || lines[0].startsWith("NOTE")) return true;
  if (first === "STYLE" || lines[0].startsWith("STYLE")) return true;
  return false;
}

function processVtt(content, re, replacement) {
  const blocks = content.split(/\r?\n\r?\n/);
  let total = 0;
  const outBlocks = blocks.map((block) => {
    const lines = block.split(/\r?\n/);
    if (isWebVttHeaderBlock(lines) || isNoteOrStyleBlock(lines)) {
      return block;
    }
    let tsIdx = -1;
    if (lines[0] && lines[0].includes(" --> ")) tsIdx = 0;
    else if (lines[1] && lines[1].includes(" --> ")) tsIdx = 1;
    else {
      return block;
    }
    const head = lines.slice(0, tsIdx + 1);
    const dialogue = lines.slice(tsIdx + 1);
    const newDialogue = dialogue.map((line) => {
      total += countMatchesInString(line, re);
      return replaceInString(line, re, replacement);
    });
    return [...head, ...newDialogue].join("\n");
  });
  return { output: outBlocks.join("\n\n"), count: total };
}

function editedDownloadName(original) {
  const dot = original.lastIndexOf(".");
  if (dot <= 0) return `${original}-edited.txt`;
  const base = original.slice(0, dot);
  const ext = original.slice(dot);
  return `${base}-edited${ext}`;
}

function SubtitleFindReplaceTool() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [resultText, setResultText] = useState("");
  const [find, setFind] = useState("");
  const [replaceWith, setReplaceWith] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matchMessage, setMatchMessage] = useState("");
  const [matchMessageTone, setMatchMessageTone] = useState("neutral");
  const [regexError, setRegexError] = useState("");
  const [readError, setReadError] = useState("");
  const [copied, setCopied] = useState(false);

  const preClass =
    "max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-mono text-[#334155]";

  const loadFile = useCallback((file) => {
    if (!file) return;
    setReadError("");
    setRegexError("");
    setMatchMessage("");
    setMatchMessageTone("neutral");
    setResultText("");
    const reader = new FileReader();
    reader.onload = () => {
      const text =
        typeof reader.result === "string" ? reader.result : "";
      setFileName(file.name);
      setOriginalText(text);
    };
    reader.onerror = () => {
      setReadError("Could not read the file.");
      setFileName("");
      setOriginalText("");
      setResultText("");
    };
    reader.readAsText(file, "UTF-8");
  }, []);

  const onInputChange = (e) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const replaceAll = () => {
    setRegexError("");
    setMatchMessage("");
    if (!originalText || !find.trim()) return;

    let re;
    try {
      let patternBody = useRegex ? find : escapeRegex(find);
      if (wholeWord) {
        patternBody = `\\b${patternBody}\\b`;
      }
      const flags = caseSensitive ? "g" : "gi";
      re = new RegExp(patternBody, flags);
    } catch {
      setRegexError("Invalid regex pattern");
      return;
    }

    const kind = detectFileKind(fileName || "subtitle.txt");
    let output;
    let count;
    try {
      if (kind === "txt") {
        ({ output, count } = processTxt(originalText, re, replaceWith));
      } else if (kind === "srt") {
        ({ output, count } = processSrt(originalText, re, replaceWith));
      } else {
        ({ output, count } = processVtt(originalText, re, replaceWith));
      }
    } catch {
      setRegexError("Invalid regex pattern");
      return;
    }

    setResultText(output);
    if (count === 0) {
      setMatchMessage("0 matches found");
      setMatchMessageTone("neutral");
    } else {
      setMatchMessage(`${count} matches replaced`);
      setMatchMessageTone("success");
    }
  };

  const downloadResult = () => {
    if (!resultText) return;
    const name = editedDownloadName(fileName || "subtitle.txt");
    const blob = new Blob([resultText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyResult = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setReadError("Could not copy to clipboard.");
    }
  };

  const hasFile = Boolean(originalText);
  const replaceDisabled = !find.trim() || !hasFile;
  const resultEmpty = !resultText;

  const matchMsgClass =
    matchMessageTone === "success"
      ? "text-sky-600"
      : matchMessageTone === "neutral"
        ? "text-slate-500"
        : "text-slate-500";

  return (
    <section
      className="se-scope mx-auto my-6 max-w-[980px] px-4 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif] sm:px-6"
      aria-label="Subtitle find and replace tool"
    >
      <label
        className={`mb-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-sky-400 p-12 text-center transition hover:border-sky-500 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-500 ${
          dragActive ? "border-sky-500 bg-sky-50" : "bg-sky-50/40"
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={onDragOver}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          id="find-replace-file"
          type="file"
          accept=".srt,.vtt,.txt"
          className="sr-only"
          onChange={onInputChange}
        />
        <span className="text-base font-medium text-sky-600">
          Drop a file here or click to browse
        </span>
        <span className="mt-2 text-sm text-slate-600">
          Supports .srt, .vtt, .txt files
        </span>
        {fileName ? (
          <span className="mt-3 max-w-full truncate text-sm text-slate-700">
            Selected: <strong>{fileName}</strong>
          </span>
        ) : null}
      </label>

      {readError ? (
        <p
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {readError}
        </p>
      ) : null}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Find &amp; Replace
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="find-input"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Find
            </label>
            <input
              id="find-input"
              type="text"
              value={find}
              onChange={(e) => {
                setFind(e.target.value);
                setRegexError("");
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              autoComplete="off"
            />
          </div>
          <div>
            <label
              htmlFor="replace-input"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Replace with
            </label>
            <input
              id="replace-input"
              type="text"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              autoComplete="off"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <input
                id="opt-case"
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="opt-case" className="text-sm text-slate-700">
                Case-sensitive
              </label>
            </div>
            <div className="flex items-start gap-2">
              <input
                id="opt-word"
                type="checkbox"
                checked={wholeWord}
                onChange={(e) => setWholeWord(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="opt-word" className="text-sm text-slate-700">
                Whole word only
              </label>
            </div>
            <div className="flex items-start gap-2">
              <input
                id="opt-regex"
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
              />
              <label htmlFor="opt-regex" className="text-sm text-slate-700">
                Use regex
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={replaceAll}
            disabled={replaceDisabled}
            className="w-full rounded-lg bg-sky-500 py-3 text-center text-base font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500"
          >
            Replace All
          </button>
          {regexError ? (
            <p className="text-sm text-red-600" role="alert">
              {regexError}
            </p>
          ) : null}
          {matchMessage && !regexError ? (
            <p className={`text-sm font-medium ${matchMsgClass}`}>
              {matchMessage}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-orange-600">
              Original
            </h2>
            <pre
              className={preClass}
              aria-label="Original file content"
            >
              {!hasFile ? (
                <span className="text-slate-400">
                  Drop a file to get started
                </span>
              ) : (
                originalText
              )}
            </pre>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-sky-600">Result</h2>
            <pre
              className={preClass}
              aria-live="polite"
              aria-label="Edited subtitle result"
            >
              {resultEmpty ? (
                <span className="text-slate-400">
                  Your edited subtitle will appear here
                </span>
              ) : (
                resultText
              )}
            </pre>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadResult}
              disabled={resultEmpty}
              className="rounded-lg bg-sky-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-500"
            >
              Download
            </button>
            <button
              type="button"
              onClick={copyResult}
              disabled={resultEmpty}
              className="rounded-lg border border-sky-500 bg-white px-6 py-3 text-sm font-medium text-sky-600 shadow-sm transition-colors hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SubtitleFindReplacePage() {
  return (
    <>
      <Head>
        <title>{OG_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={OG_URL} />
        <meta property="og:title" content={OG_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={OG_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={OG_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
      </Head>

      <Layout>
        <div className="mx-auto max-w-[1240px] px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Subtitle Find &amp; Replace
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
              Edit SRT, VTT, and TXT subtitle files right in your browser.
              Supports regex, case-sensitive matching, and whole-word search —
              and your timestamps are never touched.
            </p>
          </div>

          <SubtitleFindReplaceTool />

          <section className={section} aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading" className={h2}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  1
                </div>
                <p className="text-lg font-semibold text-[#1e293b]">
                  Drop your file
                </p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Upload an SRT, VTT, or TXT subtitle file. Everything happens in
                  your browser — no uploads.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  2
                </div>
                <p className="text-lg font-semibold text-[#1e293b]">
                  Enter your search
                </p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Type what to find and what to replace it with. Toggle regex,
                  case-sensitive, or whole-word matching as needed.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
                  3
                </div>
                <p className="text-lg font-semibold text-[#1e293b]">
                  Download the result
                </p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Click Replace All, review the changes, then download your
                  edited subtitle file. Timestamps stay untouched.
                </p>
              </div>
            </div>
          </section>

          <section
            className={section}
            aria-labelledby="context-heading"
          >
            <h2 id="context-heading" className={h2}>
              Why Use a Dedicated Subtitle Find &amp; Replace?
            </h2>
            <p className={p}>
              Generic text editors treat SRT files as plain text, which means a
              careless search like <code className="rounded bg-slate-100 px-1 font-mono text-sm">\d+</code> can
              destroy timestamps and break your subtitles.
            </p>
            <p className={p}>
              This tool parses subtitle structure, applies find-and-replace only
              to the dialogue lines, and leaves timestamps mathematically
              untouchable. Useful for translators swapping speaker names,
              YouTubers updating branding, or captioners standardising
              terminology across a project.
            </p>
          </section>

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>

            <h3 className={h3}>
              Can I use regex in the find field?
            </h3>
            <p className={p}>
              Yes. Toggle &quot;Use regex&quot; and your find string is treated
              as a raw JavaScript RegExp pattern. Useful for matching patterns
              like <code className="rounded bg-slate-100 px-1 font-mono text-sm">\bMr\.\s+\w+</code> to find any
              &quot;Mr.&quot; followed by a name.
            </p>

            <h3 className={h3}>
              Will this break my subtitle timestamps?
            </h3>
            <p className={p}>
              No. The tool parses your file into structural blocks and only
              applies find-and-replace to dialogue lines. Timestamps and cue
              indices are never modified, even when you use regex.
            </p>

            <h3 className={h3}>
              Does it work with VTT files that have styling cues?
            </h3>
            <p className={p}>
              Yes. WEBVTT headers, STYLE blocks, and NOTE blocks pass through
              unchanged. Find-and-replace runs only on the actual caption text.
            </p>

            <h3 className={h3}>Is my file uploaded anywhere?</h3>
            <p className={p}>
              No. Everything runs entirely in your browser using JavaScript.
              Your subtitle files never leave your device.
            </p>

            <h3 className={h3}>
              Can I do multiple replacements at once?
            </h3>
            <p className={p}>
              Currently the tool runs one find-replace operation at a time. For
              sequential edits, run the tool, download the result, then
              re-upload it for the next replacement.
            </p>

            <h3 className={h3}>
              What if my replacement produces zero matches?
            </h3>
            <p className={p}>
              The tool will display &quot;0 matches found&quot; so you know
              nothing changed. Check your case-sensitivity setting and whether
              &quot;Whole word only&quot; is restricting matches.
            </p>
          </section>

          <section className={section} aria-labelledby="related-heading">
            <h2 id="related-heading" className={h2}>
              Related Tools
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <li>
                <Link
                  href="/subtitle-encoding-fixer"
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-lg font-semibold text-sky-600">
                    Subtitle Encoding Fixer
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Fix garbled characters and mojibake in subtitle files.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-time-shifter"
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-lg font-semibold text-sky-600">
                    Subtitle Time Shifter
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Shift all subtitle timestamps forward or backward.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/srt-to-vtt-converter"
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-lg font-semibold text-sky-600">
                    SRT to VTT Converter
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Convert SubRip files to WebVTT format.
                  </p>
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-overlap-fixer"
                  className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-300 hover:shadow-sm"
                >
                  <span className="text-lg font-semibold text-sky-600">
                    Subtitle Overlap Fixer
                  </span>
                  <p className="mt-2 text-sm text-slate-600">
                    Detect and fix overlapping subtitle entries.
                  </p>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
}

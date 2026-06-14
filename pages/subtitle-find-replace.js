import Head from "next/head";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import Layout from "../components/Layout";

const PAGE_TITLE =
  "Subtitle Find & Replace Online Free | Subtitles Edit";

const META_DESC =
  "Find and replace text in SRT, VTT, and TXT subtitle files free in your browser. Regex, case-sensitive, whole-word options. Timestamps preserved.";

const OG_URL = "https://subtitlesedit.com/subtitle-find-replace";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Find-Replace-tool-1024x538.webp";

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-12";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const linkClass =
  "text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]";

const tableWrap =
  "my-6 overflow-x-auto rounded-[10px] border border-gray-200";
const tableEl = "min-w-full divide-y divide-gray-200 text-sm";
const thEl =
  "px-4 py-3 text-left font-semibold text-[#1e293b] bg-gray-50";
const tdEl = "px-4 py-3 align-top text-[#334155]";
const tdMono = `${tdEl} font-mono whitespace-nowrap`;

const inlineCode =
  "rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-[#334155]";

const faqs = [
  {
    q: "Can I use regex in the find field?",
    a: "Yes. Toggle \"Use regex\" and your find string is treated as a JavaScript RegExp pattern. The global flag is always set, with case-insensitive added when case-sensitive is off. Useful for matching patterns like \\bMr\\.\\s+\\w+ to find any \"Mr.\" followed by a name, or \\d{4} for year numbers in dialogue.",
  },
  {
    q: "Will this break my subtitle timestamps?",
    a: "No. The tool parses your file into structural blocks. For SRT files, the first two lines of each block (cue index and timestamp) are skipped — find-and-replace only touches dialogue lines. For VTT, the parser identifies timestamp lines by the \" --> \" separator and edits only lines below it. Timestamps remain mathematically untouched.",
  },
  {
    q: "Does it work with VTT files that have styling cues?",
    a: "Yes. The WEBVTT header block, STYLE blocks (CSS), and NOTE blocks (comments) are all detected and passed through unchanged. Find-and-replace runs only on actual caption text. Cue identifiers (the optional name line above a timestamp line) are also preserved. REGION blocks pass through as cues — uncommon enough that this rarely matters.",
  },
  {
    q: "Is my file uploaded anywhere?",
    a: "No. The Subtitle Find & Replace runs entirely in your browser using local JavaScript. Your file is read with the FileReader API, processed in memory, and never sent to any server. No account, no install, no usage tracking on file contents. Close the browser tab and the data is gone.",
  },
  {
    q: "Can I do multiple replacements at once?",
    a: "Currently the tool runs one find-and-replace operation per cycle. For sequential edits, click Replace All, then either click Copy to Clipboard and paste elsewhere, or click Download, then re-upload the edited file and run the next pattern. Multi-pattern batch mode is a planned future enhancement.",
  },
  {
    q: "What if my replacement produces zero matches?",
    a: "The tool displays \"0 matches found\" so you know nothing changed. The most common causes are case sensitivity being on when the source text uses different case, the \"Whole word only\" option excluding partial matches, or a regex pattern with a typo. Double-check the find field and toggles, then try again.",
  },
  {
    q: "How do I remove all-caps shouting from subtitles?",
    a: "Toggle Use regex and Case-sensitive, then search for \\b[A-Z]{2,}\\b to find any sequence of two or more uppercase letters. The Replace field can't directly lowercase via this tool (no JavaScript expression in the replacement), so download the file and pass the result through a text-case converter, or do targeted per-word replacements.",
  },
  {
    q: "Can I use back-references like $1 in the replacement field?",
    a: "Yes, when Use regex is enabled. Use parentheses in the find field to capture groups, then $1, $2, and so on in the replacement field to reference them. For example, find (\\w+) (\\w+) and replace with $2 $1 to swap two consecutive words. Up to 9 capture groups are supported by the browser's regex engine.",
  },
  {
    q: "Does it handle multi-line subtitle cues correctly?",
    a: "Yes. The parser splits each subtitle block by blank lines first, then walks each block's lines individually. For multi-line dialogue (when one cue spans multiple lines), find-and-replace is applied to each text line separately. Pattern matching does not cross line boundaries unless you explicitly add \\n inside a regex pattern.",
  },
  {
    q: "What's the difference between \"Whole word only\" and the regex \\b boundary?",
    a: "They produce the same result when both are used. The \"Whole word only\" checkbox automatically wraps your find pattern in \\b...\\b boundaries; regex mode lets you place \\b manually. Use the checkbox for simple cases. Use regex with manual boundaries when you want word-boundary matching on only part of a complex pattern.",
  },
  {
    q: "Can I use this to fix translation typos in bulk?",
    a: "Yes. Subtitle Find & Replace is well-suited for terminology consistency across a translated subtitle file — for example, replacing every variation of a character's name, fixing a misspelled location, or standardising on either British or American English forms (colour/color, behaviour/behavior, defence/defense). All changes preserve cue numbers and timestamps.",
  },
  {
    q: "Does the regex support Unicode character classes?",
    a: "The regex engine is your browser's built-in RegExp, which supports most ECMAScript regex features. Unicode property escapes like \\p{Letter} require the u flag, which this tool does not currently expose. Standard escapes (\\w, \\d, \\s, \\b) work and match basic ASCII. For full Unicode coverage, use character ranges or alternation.",
  },
  {
    q: "What happens if my regex pattern is invalid?",
    a: "The tool shows \"Invalid regex pattern\" in red and does not modify your file. Common causes are unmatched parentheses, brackets, or curly braces; an unescaped special character; or an invalid character class range. Edit your find field and click Replace All again. The original text in the left pane stays intact throughout.",
  },
  {
    q: "Will this work with .ass or .ssa subtitle formats?",
    a: "The file picker accepts .srt, .vtt, and .txt. ASS and SSA files have a more complex structure (Script Info, Styles, Events sections) that this tool doesn't parse specifically. If you upload one as .txt, find-and-replace will work on the text content, but you risk corrupting the styles section. Best practice: convert to SRT or VTT first.",
  },
  {
    q: "How do I remove music notation from karaoke subtitles?",
    a: "Toggle Use regex, then in Find enter ♪\\s* (or \\u266A\\s* if you prefer escape codes). Leave Replace with empty. Click Replace All. The \\s* matches any whitespace after each note so spacing is cleaned in the same pass. Then optionally run \\s+$ (regex, replace empty) to trim trailing whitespace.",
  },
  {
    q: "Can I find and replace inside formatting tags like <i> or <b>?",
    a: "Yes. Tags like <i>, <b>, <u>, <font>, and their closing variants are part of the dialogue text in SRT and VTT files, so they are subject to find-and-replace. To remove italic tags everywhere, toggle Use regex and search for </?i> with an empty replacement. For bulk tag removal across all formatting types, the dedicated Subtitle Tag Stripper is simpler.",
  },
];

const recipes = [
  {
    name: "Replacing a character name across an entire subtitle file",
    description:
      "If a character was renamed during translation or editing — for example, 'John' needs to become 'Jonathan' — find-and-replace can update every occurrence at once while keeping partial matches like 'Johnson' intact.",
    steps: [
      "Drag the subtitle file into the drop zone.",
      "In the Find field, type John.",
      "In the Replace with field, type Jonathan.",
      "Check Whole word only to avoid matching Johnson or Johnny.",
      "Check Case-sensitive if you only want to replace capitalised John (and not john in lowercase dialogue).",
      "Click Replace All. The match counter shows how many lines were edited.",
      "Review the Result pane and click Download.",
    ],
  },
  {
    name: "Removing music notation (♪) from karaoke subtitles",
    description:
      "Karaoke and song subtitles often wrap lyrics in music notes like ♪ lyrics ♪. To strip them out for a clean dialogue-only file:",
    steps: [
      "Drag the file in.",
      "Toggle Use regex.",
      "In the Find field, type ♪\\s* — the \\s* matches any whitespace after the note.",
      "Leave Replace with empty.",
      "Click Replace All.",
      "Optionally run a second pass with \\s+$ (regex, replace empty) to clean trailing whitespace.",
      "Download.",
    ],
  },
  {
    name: "Standardising terminology across a translation project",
    description:
      "Translation projects often have inconsistent terminology — Council vs. Counsel, Strategist vs. Tactician. Subtitle Find & Replace can normalise across a single file at a time.",
    steps: [
      "Drag the subtitle file in.",
      "In Find, type the inconsistent variant (e.g. Counsel).",
      "In Replace with, type the correct version (e.g. Council).",
      "Toggle Whole word only and Case-sensitive as appropriate for your style guide.",
      "Click Replace All. The match counter confirms how many lines changed.",
      "Repeat for each term in your style guide.",
      "Download the final cleaned file.",
    ],
  },
  {
    name: "Normalising ellipses and smart quotes",
    description:
      "Subtitle files from different sources mix straight quotes (\") with smart quotes (\u201C and \u201D), and use various ellipsis forms (..., \u2026, . . .). To normalise to a consistent style:",
    steps: [
      "Drag the file in.",
      "Toggle Use regex.",
      "To normalise ellipses, Find: \\.{3,} Replace with: \u2026 Click Replace All.",
      "To convert straight double quotes to smart quotes, Find: \"([^\"]*)\" Replace with: \u201C$1\u201D using the back-reference.",
      "Click Replace All again.",
      "Download the normalised file.",
    ],
  },
  {
    name: "Removing speaker labels like JOHN:",
    description:
      "Some captioning workflows include all-caps speaker prefixes (JOHN:, MARY:) at the start of each line. To strip them:",
    steps: [
      "Drag the file in.",
      "Toggle Use regex.",
      "In Find, type ^[A-Z]{2,}:\\s* — this matches an uppercase prefix at the start of a line, a colon, then optional whitespace.",
      "Leave Replace with empty.",
      "Click Replace All.",
      "Review the Result pane and download.",
    ],
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://subtitlesedit.com/#organization",
      name: "Subtitles Edit",
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
        "SubtitlesEdit.com is a free, browser-based toolkit for creating, editing, and perfecting subtitle and caption files.",
    },
    {
      "@type": "WebSite",
      "@id": "https://subtitlesedit.com/#website",
      url: "https://subtitlesedit.com",
      name: "Subtitles Edit",
      publisher: { "@id": "https://subtitlesedit.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://subtitlesedit.com/subtitle-find-replace#breadcrumb",
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
          name: "Subtitle Find & Replace",
          item: "https://subtitlesedit.com/subtitle-find-replace",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-find-replace#webpage",
      url: "https://subtitlesedit.com/subtitle-find-replace",
      name: PAGE_TITLE,
      description: META_DESC,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/subtitle-find-replace#breadcrumb",
      },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMG },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-find-replace#software",
      name: "Subtitle Find & Replace",
      url: "https://subtitlesedit.com/subtitle-find-replace",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (browser-based)",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Find and replace text in SRT, VTT, and TXT subtitle files",
        "Regex support with capture groups and back-references",
        "Case-sensitive and whole-word matching options",
        "Preserves cue numbers, timestamps, WEBVTT headers, STYLE and NOTE blocks",
        "Match counter shows how many lines were edited",
        "Download or copy to clipboard",
        "Runs entirely in the browser — no upload, no account, no install",
      ],
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-find-replace#faq",
      mainEntity: faqs.map((row) => ({
        "@type": "Question",
        name: row.q,
        acceptedAnswer: { "@type": "Answer", text: row.a },
      })),
    },
    {
      "@type": "HowTo",
      "@id": "https://subtitlesedit.com/subtitle-find-replace#howto",
      name: "How to find and replace text in subtitle files",
      description:
        "Step-by-step recipes for common subtitle editing tasks: replacing character names, stripping music notation, standardising terminology, normalising punctuation, and removing speaker labels.",
      step: recipes.map((recipe, i) => ({
        "@type": "HowToSection",
        position: i + 1,
        name: recipe.name,
        itemListElement: recipe.steps.map((stepText, j) => ({
          "@type": "HowToStep",
          position: j + 1,
          text: stepText,
        })),
      })),
    },
  ],
};

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
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <link rel="canonical" href={OG_URL} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={OG_URL} />
        <meta property="og:site_name" content="Subtitles Edit" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:secure_url" content={OG_IMG} />
        <meta property="og:image:alt" content="Subtitle Find and Replace" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={OG_IMG} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      </Head>

      <Layout>
        <div className="mx-auto max-w-[1240px] px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Subtitle Find &amp; Replace — Edit SRT, VTT, and TXT Without
              Touching Timestamps
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
              Find and replace text across SRT, VTT, and TXT subtitle files
              right in your browser. Regex, case-sensitive, and whole-word
              options. Your timestamps and cue numbers are never modified.
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
                  Upload an SRT, VTT, or TXT subtitle file. Everything happens
                  in your browser — no uploads, no account.
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
                  Click Replace All, review the changes in the Result pane,
                  then download or copy your edited file. Timestamps stay
                  untouched.
                </p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="before-after-heading">
            <h2 id="before-after-heading" className={h2}>
              Before and After
            </h2>
            <p className={p}>
              An SRT file with a character named John that needs to become
              Jonathan:
            </p>
            <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,000
John walked into the room.

2
00:00:03,500 --> 00:00:06,000
"Hi, John," said Mary.

3
00:00:06,500 --> 00:00:09,000
Johnson watched from the corner.`}
            </pre>
            <p className={p}>
              After Find: <code className={inlineCode}>John</code>, Replace
              with: <code className={inlineCode}>Jonathan</code>, with{" "}
              <strong>Whole word only</strong> checked:
            </p>
            <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,000
Jonathan walked into the room.

2
00:00:03,500 --> 00:00:06,000
"Hi, Jonathan," said Mary.

3
00:00:06,500 --> 00:00:09,000
Johnson watched from the corner.`}
            </pre>
            <p className={p}>
              Cue numbers and timestamps are preserved exactly. Whole-word
              matching kept the name "Johnson" intact — only the standalone
              "John" was replaced. Two matches were edited.
            </p>
          </section>

          <section className={section} aria-labelledby="regex-ref-heading">
            <h2 id="regex-ref-heading" className={h2}>
              Regex Pattern Reference
            </h2>
            <p className={p}>
              When the <strong>Use regex</strong> option is on, the find field
              accepts JavaScript regular expression syntax. Below are the
              most useful patterns for subtitle editing:
            </p>
            <div className={tableWrap}>
              <table className={tableEl}>
                <thead>
                  <tr>
                    <th className={thEl}>Pattern</th>
                    <th className={thEl}>What it matches</th>
                    <th className={thEl}>Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className={tdMono}>\d</td>
                    <td className={tdEl}>Any digit 0–9</td>
                    <td className={tdEl}>matches "5"</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\d+</td>
                    <td className={tdEl}>One or more digits</td>
                    <td className={tdEl}>matches "123" or "2024"</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>{`\\d{2,4}`}</td>
                    <td className={tdEl}>2 to 4 digits</td>
                    <td className={tdEl}>matches "12", "123", or "1234"</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\w</td>
                    <td className={tdEl}>Letter, digit, or underscore</td>
                    <td className={tdEl}>matches "a", "5", or "_"</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\W</td>
                    <td className={tdEl}>NOT a word character</td>
                    <td className={tdEl}>matches space or punctuation</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\s</td>
                    <td className={tdEl}>Any whitespace</td>
                    <td className={tdEl}>space, tab, newline</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\S</td>
                    <td className={tdEl}>NOT whitespace</td>
                    <td className={tdEl}>letters, digits, punctuation</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>.</td>
                    <td className={tdEl}>Any character except newline</td>
                    <td className={tdEl}>matches any single character</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>\b</td>
                    <td className={tdEl}>Word boundary</td>
                    <td className={tdEl}>{`\\bcat\\b matches "cat" not "category"`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>^</td>
                    <td className={tdEl}>Start of string</td>
                    <td className={tdEl}>{`^Hello matches a line starting with Hello`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>$</td>
                    <td className={tdEl}>End of string</td>
                    <td className={tdEl}>{`bye$ matches "bye" at the end`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>*</td>
                    <td className={tdEl}>0 or more of previous</td>
                    <td className={tdEl}>{`a* matches "", "a", or "aaa"`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>+</td>
                    <td className={tdEl}>1 or more of previous</td>
                    <td className={tdEl}>{`a+ matches "a" or "aaa", not ""`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>?</td>
                    <td className={tdEl}>0 or 1 of previous</td>
                    <td className={tdEl}>{`colou?r matches "color" or "colour"`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>*? +?</td>
                    <td className={tdEl}>Non-greedy quantifiers</td>
                    <td className={tdEl}>{`<.+?> matches "<i>" not the rest of the line`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>[abc]</td>
                    <td className={tdEl}>One of a, b, or c</td>
                    <td className={tdEl}>matches any single listed char</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>[^abc]</td>
                    <td className={tdEl}>NOT a, b, or c</td>
                    <td className={tdEl}>excludes those characters</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>[a-z]</td>
                    <td className={tdEl}>Lowercase letter range</td>
                    <td className={tdEl}>matches any lowercase letter</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>(...)</td>
                    <td className={tdEl}>Capture group</td>
                    <td className={tdEl}>{`for use with $1, $2 in replacement`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>{`a|b`}</td>
                    <td className={tdEl}>Either pattern</td>
                    <td className={tdEl}>{`cat|dog matches either word`}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>$1 $2 …</td>
                    <td className={tdEl}>Back-reference (replacement)</td>
                    <td className={tdEl}>insert captured group in output</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={section} aria-labelledby="common-patterns-heading">
            <h2 id="common-patterns-heading" className={h2}>
              Common Subtitle Edit Patterns
            </h2>
            <p className={p}>
              These eight patterns cover the most frequent subtitle
              find-and-replace tasks. Paste them straight into the Find and
              Replace fields with the listed options:
            </p>
            <div className={tableWrap}>
              <table className={tableEl}>
                <thead>
                  <tr>
                    <th className={thEl}>Goal</th>
                    <th className={thEl}>Find</th>
                    <th className={thEl}>Replace with</th>
                    <th className={thEl}>Options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className={tdEl}>Change a speaker name</td>
                    <td className={tdMono}>John</td>
                    <td className={tdMono}>Jonathan</td>
                    <td className={tdEl}>Whole word, case-sensitive</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Remove music notes</td>
                    <td className={tdMono}>{`♪\\s*`}</td>
                    <td className={tdEl}>(empty)</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Normalise ellipses to one character</td>
                    <td className={tdMono}>{`\\.{3,}`}</td>
                    <td className={tdMono}>…</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Remove speaker labels (JOHN:)</td>
                    <td className={tdMono}>{`^[A-Z]{2,}:\\s*`}</td>
                    <td className={tdEl}>(empty)</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Remove italic tags</td>
                    <td className={tdMono}>{`</?i>`}</td>
                    <td className={tdEl}>(empty)</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Replace straight with smart quotes</td>
                    <td className={tdMono}>{`"([^"]*)"`}</td>
                    <td className={tdMono}>{`"$1"`}</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Strip trailing whitespace</td>
                    <td className={tdMono}>{`\\s+$`}</td>
                    <td className={tdEl}>(empty)</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Swap two adjacent words</td>
                    <td className={tdMono}>{`(\\w+) (\\w+)`}</td>
                    <td className={tdMono}>$2 $1</td>
                    <td className={tdEl}>Use regex</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={section} aria-labelledby="capabilities-heading">
            <h2 id="capabilities-heading" className={h2}>
              What Find &amp; Replace Can Do for Subtitles
            </h2>
            <p className={p}>
              Beyond simple text swaps, subtitle find-and-replace solves a
              wide range of editing problems that would otherwise need a code
              editor or a dedicated subtitle suite:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                <strong>Character renames</strong> — Update every line where a
                character speaks or is mentioned, even across long-form
                content.
              </li>
              <li>
                <strong>Terminology consistency</strong> — Standardise on a
                style guide (British vs. American English, project glossary,
                client-specific terminology).
              </li>
              <li>
                <strong>Punctuation normalisation</strong> — Convert straight
                quotes to smart quotes, three-dot ellipses to a single …
                character, multiple spaces to single spaces.
              </li>
              <li>
                <strong>Speaker label removal</strong> — Strip patterns like{" "}
                <code className={inlineCode}>JOHN:</code> from captioned
                dialogue when preparing translations or simplified subtitles.
              </li>
              <li>
                <strong>Music notation cleanup</strong> — Remove ♪ wrapping
                lyrics in karaoke or musical captions.
              </li>
              <li>
                <strong>Formatting tag removal</strong> — Strip individual{" "}
                <code className={inlineCode}>&lt;i&gt;</code>,{" "}
                <code className={inlineCode}>&lt;b&gt;</code>, or{" "}
                <code className={inlineCode}>&lt;font&gt;</code> tags when
                they're unwanted in a specific output.
              </li>
              <li>
                <strong>Typo and OCR correction</strong> — Fix recurring
                misspellings or OCR errors in scanned subtitle imports.
              </li>
              <li>
                <strong>Bulk content edits</strong> — Update product or brand
                names across a long-form subtitle file.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="parser-heading">
            <h2 id="parser-heading" className={h2}>
              How the Tool Parses Subtitle Structure
            </h2>
            <p className={p}>
              Generic find-and-replace tools treat subtitle files as plain
              text, which means a careless pattern like{" "}
              <code className={inlineCode}>\d+</code> can wipe out timestamps
              and break your subtitles. This tool parses each format
              specifically:
            </p>

            <h3 className={h3}>SRT</h3>
            <p className={p}>
              The file is split on blank lines into cue blocks. For each
              block, the first line (cue index) and the second line
              (timestamp) are excluded from find-and-replace. The third line
              onwards is the dialogue, which is the only part the pattern
              touches. Multi-line dialogue is processed line by line.
            </p>

            <h3 className={h3}>VTT</h3>
            <p className={p}>
              The file is also split on blank lines, but the parser is
              smarter. The WEBVTT header block at the top, any{" "}
              <strong>NOTE</strong> blocks (file comments), and any{" "}
              <strong>STYLE</strong> blocks (CSS styling) are detected and
              passed through completely unchanged. For each remaining cue
              block, the parser locates the timestamp line by searching for
              the <code className={inlineCode}>{`-->`}</code> separator —
              which means cue identifiers (the optional name line above the
              timestamp) are also preserved. Find-and-replace runs only on
              dialogue lines below the timestamp.
            </p>

            <h3 className={h3}>TXT</h3>
            <p className={p}>
              Plain text files have no structural rules, so find-and-replace
              is applied to the entire content. Useful when you want to edit
              transcript exports or notes that have no SRT/VTT structure.
            </p>
          </section>

          <section className={section} aria-labelledby="options-heading">
            <h2 id="options-heading" className={h2}>
              Choosing the Right Options for Your Edit
            </h2>

            <h3 className={h3}>Case-sensitive</h3>
            <p className={p}>
              Off by default. When off, the regex flag is{" "}
              <code className={inlineCode}>gi</code> and the pattern matches
              regardless of case. Turn on when you want to preserve
              capitalisation differences — for example, replacing only
              capitalised <strong>John</strong> but leaving lowercase{" "}
              <strong>john</strong> alone.
            </p>

            <h3 className={h3}>Whole word only</h3>
            <p className={p}>
              When on, the tool automatically wraps your find pattern in{" "}
              <code className={inlineCode}>\b</code> word-boundary markers.
              This prevents partial matches: searching for{" "}
              <code className={inlineCode}>cat</code> with whole-word on will
              not match the "cat" inside "category" or "scatter". Combine
              with regex mode if you want word-boundary matching on only part
              of a complex pattern (turn whole-word off and place{" "}
              <code className={inlineCode}>\b</code> manually).
            </p>

            <h3 className={h3}>Use regex</h3>
            <p className={p}>
              When on, the find string is treated as a JavaScript regular
              expression instead of literal text. Special characters like{" "}
              <code className={inlineCode}>.</code>,{" "}
              <code className={inlineCode}>*</code>,{" "}
              <code className={inlineCode}>+</code>,{" "}
              <code className={inlineCode}>?</code>,{" "}
              <code className={inlineCode}>{`(`}</code>, and{" "}
              <code className={inlineCode}>{`[`}</code> become regex
              metacharacters. Capture groups in the find field can be
              referenced in the replace field with{" "}
              <code className={inlineCode}>$1</code>,{" "}
              <code className={inlineCode}>$2</code>, etc.
            </p>
          </section>

          <section className={section} aria-labelledby="recipes-heading">
            <h2 id="recipes-heading" className={h2}>
              Step-by-Step Recipes for Common Scenarios
            </h2>
            <p className={p}>
              Below are explicit walkthroughs for the five most common
              subtitle find-and-replace tasks.
            </p>

            {recipes.map((recipe, i) => (
              <div key={recipe.name} className={i > 0 ? "mt-10" : ""}>
                <h3 className={h3}>
                  Recipe {i + 1}: {recipe.name}
                </h3>
                <p className={p}>{recipe.description}</p>
                <ol className="mb-4 ml-6 list-decimal space-y-2 text-[#334155]">
                  {recipe.steps.map((step, j) => (
                    <li key={j}>{step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </section>

          <section className={section} aria-labelledby="when-to-use-heading">
            <h2 id="when-to-use-heading" className={h2}>
              When to Use Subtitle Find &amp; Replace
            </h2>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                Renaming characters or speakers across a long-form subtitle
                file.
              </li>
              <li>
                Standardising terminology when bridging two translators'
                work, or aligning to a client style guide.
              </li>
              <li>
                Removing speaker labels, music notation, or other captioning
                markers when preparing files for a different audience.
              </li>
              <li>
                Normalising punctuation across files from different sources
                (smart vs. straight quotes, ellipses, dashes).
              </li>
              <li>
                Fixing recurring typos or OCR errors in scanned subtitle
                imports.
              </li>
              <li>
                Removing or replacing formatting tags like{" "}
                <code className={inlineCode}>&lt;i&gt;</code> or{" "}
                <code className={inlineCode}>&lt;font&gt;</code> in specific
                contexts.
              </li>
              <li>
                Updating brand names, product names, or URLs across a
                subtitle file before publication.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="who-uses-heading">
            <h2 id="who-uses-heading" className={h2}>
              Who Uses This Tool
            </h2>
            <p className={p}>
              Translators consolidating terminology across a translated
              subtitle file. Video editors and captioners cleaning up
              auto-generated subtitle drafts. YouTubers updating branding or
              sponsor mentions across episodes. Broadcasters preparing
              compliance edits. Localisation teams standardising on regional
              spelling. Anyone who would otherwise open the file in a code
              editor and risk corrupting the timestamps.
            </p>
          </section>

          <section className={section} aria-labelledby="why-use-heading">
            <h2 id="why-use-heading" className={h2}>
              Why Use This Subtitle Find &amp; Replace
            </h2>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                Timestamps are structurally protected — the parser skips them
                entirely, so no pattern (regex or otherwise) can corrupt
                them.
              </li>
              <li>
                Full regex support with capture groups and back-references
                (<code className={inlineCode}>$1</code>,{" "}
                <code className={inlineCode}>$2</code>, etc.).
              </li>
              <li>
                Smart VTT parsing preserves WEBVTT headers, STYLE blocks,
                NOTE blocks, and cue identifiers.
              </li>
              <li>
                Case-sensitive and whole-word options for precision.
              </li>
              <li>
                Match counter feedback after every replace operation.
              </li>
              <li>
                Both Download and Copy to Clipboard options on the result.
              </li>
              <li>
                Runs entirely in the browser — no upload, no account, no
                install, no usage tracking on file contents.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="glossary-heading">
            <h2 id="glossary-heading" className={h2}>
              Regex Patterns Glossary
            </h2>
            <p className={p}>
              Key terminology for working with regex patterns in this tool
              and elsewhere.
            </p>
            <dl className="space-y-5">
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Regex / Regular expression
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A pattern language for matching text. JavaScript's built-in
                  RegExp engine powers this tool's regex mode, which means
                  any pattern that works in JavaScript (and most ECMAScript
                  regex features) works here.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Character class
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A set of characters in square brackets.{" "}
                  <code className={inlineCode}>[aeiou]</code> matches any
                  vowel; <code className={inlineCode}>[a-z]</code> matches
                  any lowercase letter;{" "}
                  <code className={inlineCode}>[^0-9]</code> matches any
                  non-digit.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Quantifier</dt>
                <dd className="mt-1 text-[#334155]">
                  A symbol that controls how many times the previous pattern
                  matches. <code className={inlineCode}>*</code> (zero or
                  more), <code className={inlineCode}>+</code> (one or more),{" "}
                  <code className={inlineCode}>?</code> (zero or one),{" "}
                  <code className={inlineCode}>{`{n,m}`}</code> (between n and
                  m times).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Anchor</dt>
                <dd className="mt-1 text-[#334155]">
                  A position-matching symbol that doesn't consume any text.{" "}
                  <code className={inlineCode}>^</code> for start of line,{" "}
                  <code className={inlineCode}>$</code> for end of line,{" "}
                  <code className={inlineCode}>\b</code> for word boundary.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Capture group
                </dt>
                <dd className="mt-1 text-[#334155]">
                  Parentheses around a pattern that "capture" the matched
                  text. Use <code className={inlineCode}>$1</code>,{" "}
                  <code className={inlineCode}>$2</code>, etc. in the
                  replacement field to reference what each group captured —
                  for example, <code className={inlineCode}>(\w+) (\w+)</code>{" "}
                  with replace <code className={inlineCode}>$2 $1</code>{" "}
                  swaps the two words.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Back-reference
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A reference to a previously captured group, either inside
                  the pattern itself (<code className={inlineCode}>\1</code>,{" "}
                  <code className={inlineCode}>\2</code>) or in the
                  replacement string (<code className={inlineCode}>$1</code>,{" "}
                  <code className={inlineCode}>$2</code>).
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Greedy vs. non-greedy
                </dt>
                <dd className="mt-1 text-[#334155]">
                  Quantifiers like <code className={inlineCode}>+</code> and{" "}
                  <code className={inlineCode}>*</code> are greedy by default
                  — they match as much text as possible. Adding{" "}
                  <code className={inlineCode}>?</code> makes them
                  non-greedy: <code className={inlineCode}>.+?</code> matches
                  the smallest possible string.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Escape sequence
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A backslash followed by a character, used to match special
                  characters literally.{" "}
                  <code className={inlineCode}>\\.</code> matches a literal
                  period; <code className={inlineCode}>\\</code> matches a
                  literal backslash;{" "}
                  <code className={inlineCode}>\\(</code> matches a literal
                  opening parenthesis.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Flag</dt>
                <dd className="mt-1 text-[#334155]">
                  A modifier that changes regex behaviour. This tool always
                  uses <code className={inlineCode}>g</code> (global, so
                  every match is replaced) and adds{" "}
                  <code className={inlineCode}>i</code> (case-insensitive)
                  when Case-sensitive is off.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Look-ahead / Look-behind
                </dt>
                <dd className="mt-1 text-[#334155]">
                  Advanced patterns that match a position relative to another
                  pattern without consuming text.{" "}
                  <code className={inlineCode}>foo(?=bar)</code> matches{" "}
                  <code className={inlineCode}>foo</code> only if followed by{" "}
                  <code className={inlineCode}>bar</code>. Supported by the
                  underlying RegExp engine but rarely needed for subtitle
                  edits.
                </dd>
              </div>
            </dl>
          </section>

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>
            {faqs.map((row, i) => (
              <div key={i}>
                <h3 className={h3}>{row.q}</h3>
                <p className={p}>{row.a}</p>
              </div>
            ))}
          </section>

          <section className={section} aria-labelledby="related-heading">
            <h2 id="related-heading" className={h2}>
              Related Tools
            </h2>
            <p className={p}>
              Other free subtitle tools you can use alongside Find &amp;
              Replace:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                <Link href="/subtitle-tag-stripper" className={linkClass}>
                  Subtitle Tag Stripper
                </Link>
              </li>
              <li>
                <Link href="/subtitle-encoding-fixer" className={linkClass}>
                  Subtitle Encoding Fixer
                </Link>
              </li>
              <li>
                <Link href="/subtitle-time-shifter" className={linkClass}>
                  Subtitle Time Shifter
                </Link>
              </li>
              <li>
                <Link href="/subtitle-overlap-fixer" className={linkClass}>
                  Subtitle Overlap Fixer
                </Link>
              </li>
              <li>
                <Link href="/srt-to-vtt-converter" className={linkClass}>
                  SRT to VTT Converter
                </Link>
              </li>
              <li>
                <Link href="/vtt-to-srt-converter" className={linkClass}>
                  VTT to SRT Converter
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
}

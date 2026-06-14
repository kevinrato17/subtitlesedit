import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";

const PAGE_TITLE =
  "Subtitle Encoding Fixer Online Free | Subtitles Edit";

const META_DESC =
  "Fix corrupted subtitle encoding free in your browser. Repair mojibake, weird characters, and garbled text in SRT, VTT, and TXT files instantly.";

const OG_URL = "https://subtitlesedit.com/subtitle-encoding-fixer";

const OG_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Encoding-Fixer-tool-1024x538.webp";

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-12";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-[10px] border-2 border-[#0ea5e9] bg-white px-4 py-2.5 text-sm font-medium text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9]";

const linkClass =
  "text-[#046bd2] underline underline-offset-2 hover:text-[#045cb4]";

const tableWrap =
  "my-6 overflow-x-auto rounded-[10px] border border-gray-200";
const tableEl = "min-w-full divide-y divide-gray-200 text-sm";
const thEl =
  "px-4 py-3 text-left font-semibold text-[#1e293b] bg-gray-50";
const tdEl = "px-4 py-3 align-top text-[#334155]";
const tdMono = `${tdEl} font-mono`;

const encodingOptions = [
  { label: "UTF-8", value: "utf-8" },
  { label: "Windows-1252 (Western)", value: "windows-1252" },
  { label: "Windows-1251 (Cyrillic)", value: "windows-1251" },
  { label: "Windows-1250 (Central European)", value: "windows-1250" },
  { label: "ISO-8859-1 (Latin-1)", value: "iso-8859-1" },
  { label: "ISO-8859-2 (Latin-2)", value: "iso-8859-2" },
  { label: "Shift_JIS (Japanese)", value: "shift_jis" },
  { label: "GB18030 (Simplified Chinese)", value: "gb18030" },
  { label: "Big5 (Traditional Chinese)", value: "big5" },
  { label: "EUC-KR (Korean)", value: "euc-kr" },
];

const faqs = [
  {
    q: "Why are my subtitles showing weird characters like â€™ or Ã©?",
    a: "Sequences like â€™ or Ã© are called mojibake. They appear when a UTF-8 file is opened with a different encoding, usually Windows-1252. Byte sequences that should have shown smart quotes or accented letters end up displayed as multiple Latin-1 characters. Selecting the correct source encoding or enabling reverse mojibake usually restores the original letters.",
  },
  {
    q: "What is mojibake?",
    a: 'Mojibake is garbled text caused by reading bytes with the wrong character mapping — for example, displaying UTF-8 bytes as if they were Latin-1. The name comes from Japanese 文字化け (moji-bake), literally "character transformation." The result is sequences of random accents, question marks, or replacement symbols instead of real words.',
  },
  {
    q: "What encoding should I save subtitles in?",
    a: "UTF-8 is the modern standard for SRT, VTT, and TXT subtitles because it supports every script in a single file. This tool always exports UTF-8 regardless of the input encoding. If older players such as VLC on Windows or Windows Media Player show non-English characters incorrectly, enable the UTF-8 BOM checkbox before downloading.",
  },
  {
    q: "How does the auto-detect work?",
    a: "The tool checks for a byte-order mark first — UTF-8 BOM, UTF-16LE BOM, or UTF-16BE BOM — and uses the matching encoding when found. If there's no BOM, it tries strict UTF-8 decoding; if the bytes are valid UTF-8, it uses that. If neither works, it falls back to Windows-1252 as a sensible guess for Western text.",
  },
  {
    q: "What encodings does the tool support?",
    a: "The dropdown lists ten encodings: UTF-8, Windows-1252 (Western), Windows-1251 (Cyrillic), Windows-1250 (Central European), ISO-8859-1 (Latin-1), ISO-8859-2 (Latin-2), Shift_JIS (Japanese), GB18030 (Simplified Chinese), Big5 (Traditional Chinese), and EUC-KR (Korean). The tool uses the browser's built-in TextDecoder API so support depends on your browser, though modern browsers cover all of these.",
  },
  {
    q: 'What does the "reverse mojibake fix" toggle do?',
    a: "It handles a specific corruption pattern: UTF-8 bytes that were once misread as Windows-1252 and then saved again as UTF-8. The toggle reinterprets the visible mojibake characters back as raw bytes and decodes them as UTF-8. Try it if the standard encoding choices don't fully clean up text that contains literal sequences like Ã©.",
  },
  {
    q: "Do I need to add a UTF-8 BOM?",
    a: "Most modern subtitle players and video apps read UTF-8 correctly with or without a BOM. Some older Windows-era tools, including some configurations of VLC and Windows Media Player, expect a BOM before they treat the file as UTF-8 and may display non-English characters as gibberish without one. Try the BOM checkbox if those tools misread your file.",
  },
  {
    q: "Is my subtitle file uploaded to a server?",
    a: "No. The Subtitle Encoding Fixer reads your file as bytes directly in your browser using the FileReader API and decodes it using TextDecoder. Nothing is sent to any server, no account is required, and no copy of your file is stored. Close the browser tab and the data is gone.",
  },
  {
    q: "Why does the preview only show the first 2000 characters?",
    a: "To keep the page responsive on large subtitle files. The preview is for visual confirmation that your chosen encoding produces readable text; the full file is decoded and exported when you click Download. A long film's subtitles can run to tens of thousands of characters, and rendering all of them in a preview pane would be slow.",
  },
  {
    q: "How can I tell what encoding my subtitle file is in?",
    a: 'There\'s no foolproof way to identify a file\'s encoding from the bytes alone — the same bytes can be valid in multiple encodings. Open the file in a text editor that shows encoding metadata: Notepad++ on Windows and BBEdit on macOS both display it. Or upload it here and read the "Detected encoding" badge after auto-detect runs.',
  },
  {
    q: "What is ANSI encoding, and is it the same as UTF-8?",
    a: 'ANSI is a legacy Windows term that means "whichever single-byte encoding is your system default." On English Windows it\'s usually Windows-1252; on Russian Windows it\'s Windows-1251. ANSI is NOT the same as UTF-8 — ANSI files use one byte per character, while UTF-8 uses 1–4 bytes. Save as UTF-8 for cross-platform compatibility.',
  },
  {
    q: "Why does my subtitle work in VLC but not on my Smart TV?",
    a: 'VLC handles subtitle encoding very tolerantly, while Smart TVs often have stricter requirements. The most common difference is BOM expectation — some TVs require a UTF-8 BOM to recognize multi-byte characters. Try downloading your file with the "Add UTF-8 BOM" checkbox enabled, then test on the TV again.',
  },
  {
    q: "Can it fix subtitles in a language I don't speak?",
    a: "Yes, but you'll need to know roughly which script the file should contain. If the original is Russian, try Windows-1251 or ISO-8859-5. For Japanese, try Shift_JIS. For Korean, try EUC-KR. The After preview will look like real words in that script when the right encoding is selected, even if you can't read it personally.",
  },
  {
    q: "Does this tool change the subtitle timing or text content?",
    a: "No. The Subtitle Encoding Fixer only changes how the existing bytes are interpreted as characters — it doesn't touch timestamps, cue numbers, line breaks, or formatting tags. The corrected output has identical structure to the input, just with characters that decode correctly. Use the dedicated time shifter or overlap fixer if you also need timing changes.",
  },
  {
    q: "Does this tool work with .ass or .ssa subtitle formats?",
    a: "The tool reads any text file and only changes how its bytes are interpreted as characters. ASS and SSA subtitle files are plain text under the hood, so encoding fixes work the same as for SRT. If the upload picker won't accept .ass directly, rename to .txt, fix the encoding, then rename back to .ass. Cue formatting is preserved.",
  },
  {
    q: "What if my file is in an encoding not in the dropdown?",
    a: "The tool supports the ten most common subtitle encodings. If your file uses something rarer — KOI8-R, Windows-1256 Arabic, ISO-8859-7 Greek, or another variant — you can sometimes find a close-enough match in the existing list. If results still look wrong, open the file in a text editor that supports your specific encoding, copy the text, and save fresh as UTF-8.",
  },
];

const recipes = [
  {
    name: "Fixing a Russian subtitle file with boxes or question marks",
    description:
      "If a Russian subtitle file shows boxes, question marks, or replacement characters instead of Cyrillic letters, the file is almost certainly Windows-1251 (the standard Cyrillic encoding) but is being read as UTF-8.",
    steps: [
      "Upload the file. Detected encoding will likely show windows-1252 (the fallback, since strict UTF-8 fails on Cyrillic bytes).",
      'Open the "Interpret file as" dropdown and select Windows-1251 (Cyrillic).',
      "The After preview should now show readable Russian text — Привет, Здравствуйте, and so on.",
      "Leave reverse mojibake off and BOM off. Click Download Fixed Subtitle.",
    ],
  },
  {
    name: "Fixing French subtitles with sequences like â€™ and Ã©",
    description:
      "If French (or any Western European language) subtitles show literal â€™, Ã©, Ã¨, Ã  characters in the visible text, the file is double-encoded — UTF-8 was misread as Windows-1252 and then re-saved as UTF-8.",
    steps: [
      "Upload the file. Detected encoding will show UTF-8 because the file IS valid UTF-8 — it just contains mojibake characters as its actual content.",
      "The Before preview shows the mojibake characters.",
      "Click the Try reverse mojibake fix button.",
      "The After preview now shows clean French — café, résumé, c'est, and so on.",
      "Click Download Fixed Subtitle.",
    ],
  },
  {
    name: "Fixing Japanese subtitles that show random symbols",
    description:
      "Japanese subtitle files released before about 2010 are commonly encoded as Shift_JIS rather than UTF-8. Reading them as UTF-8 produces a mix of replacement characters and unreadable glyphs.",
    steps: [
      "Upload the file. Detected encoding will likely show windows-1252 (the fallback).",
      "From the dropdown, select Shift_JIS (Japanese).",
      "The After preview should now show readable Japanese — both kanji and kana.",
      "Click Download Fixed Subtitle.",
    ],
  },
  {
    name: "Fixing subtitles that display correctly in VLC but break on Smart TVs",
    description:
      "Older Smart TV firmware sometimes requires UTF-8 with a BOM to recognize multi-byte characters. A BOM-less UTF-8 file may display fine in VLC but show boxes or wrong characters on TVs.",
    steps: [
      "Upload the file. Detected encoding should show UTF-8.",
      "Leave the encoding picker on UTF-8.",
      "Check the Add UTF-8 BOM checkbox.",
      "Click Download Fixed Subtitle. The downloaded file is identical to the source but with an EF BB BF BOM prefix.",
    ],
  },
  {
    name: "Fixing AI-transcribed subtitles with corrupted smart quotes",
    description:
      "AI transcription tools sometimes produce subtitle files where smart quotes have been corrupted to mojibake sequences after a round-trip through legacy software.",
    steps: [
      "Upload the file. Detected encoding will likely show UTF-8.",
      "If you see â€™, â€œ, or â€¦ in the Before preview, click Try reverse mojibake fix.",
      "The After preview should show clean punctuation.",
      "Click Download Fixed Subtitle.",
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
      "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#breadcrumb",
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
          name: "Subtitle Encoding Fixer",
          item: "https://subtitlesedit.com/subtitle-encoding-fixer",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#webpage",
      url: "https://subtitlesedit.com/subtitle-encoding-fixer",
      name: PAGE_TITLE,
      description: META_DESC,
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
      breadcrumb: {
        "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#breadcrumb",
      },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMG },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#software",
      name: "Subtitle Encoding Fixer",
      url: "https://subtitlesedit.com/subtitle-encoding-fixer",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (browser-based)",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Auto-detects UTF-8 (with or without BOM), UTF-16LE, and UTF-16BE",
        "10 manual encoding options including Windows-1252/1251/1250, ISO-8859-1/2, Shift_JIS, GB18030, Big5, EUC-KR",
        "Reverse mojibake toggle for double-encoded UTF-8 files",
        "Optional UTF-8 BOM on export",
        "Always exports valid UTF-8 regardless of input encoding",
        "Runs entirely in the browser — no upload, no account, no install",
      ],
      isPartOf: { "@id": "https://subtitlesedit.com/#website" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#faq",
      mainEntity: faqs.map((row) => ({
        "@type": "Question",
        name: row.q,
        acceptedAnswer: { "@type": "Answer", text: row.a },
      })),
    },
    {
      "@type": "HowTo",
      "@id": "https://subtitlesedit.com/subtitle-encoding-fixer#howto",
      name: "How to fix subtitle encoding and repair mojibake",
      description:
        "Step-by-step recipes for fixing common subtitle encoding problems including Cyrillic boxes, double-encoded UTF-8, Japanese symbols, Smart TV BOM issues, and AI-corrupted smart quotes.",
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

/**
 * Auto-detect encoding. UTF-16 inputs are transcoded to UTF-8 bytes for a consistent pipeline.
 */
function normalizeAndDetect(bytes) {
  const b = bytes;
  if (
    b.length >= 3 &&
    b[0] === 0xef &&
    b[1] === 0xbb &&
    b[2] === 0xbf
  ) {
    return {
      bytes: b,
      detectedLabel: "UTF-8 (BOM)",
      codec: "utf-8",
    };
  }
  if (b.length >= 2 && b[0] === 0xff && b[1] === 0xfe) {
    try {
      const text = new TextDecoder("utf-16le").decode(b);
      const out = new TextEncoder().encode(text);
      return { bytes: out, detectedLabel: "UTF-16LE", codec: "utf-8" };
    } catch {
      return { bytes: b, detectedLabel: "UTF-16LE", codec: "utf-8" };
    }
  }
  if (b.length >= 2 && b[0] === 0xfe && b[1] === 0xff) {
    try {
      const text = new TextDecoder("utf-16be").decode(b);
      const out = new TextEncoder().encode(text);
      return { bytes: out, detectedLabel: "UTF-16BE", codec: "utf-8" };
    } catch {
      return { bytes: b, detectedLabel: "UTF-16BE", codec: "utf-8" };
    }
  }
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(b);
    return { bytes: b, detectedLabel: "UTF-8", codec: "utf-8" };
  } catch {
    return { bytes: b, detectedLabel: "windows-1252", codec: "windows-1252" };
  }
}

function decodeWithEncoding(bytes, encoding) {
  try {
    const dec = new TextDecoder(encoding);
    return dec.decode(bytes);
  } catch (e) {
    throw e instanceof Error
      ? e
      : new Error("This browser does not support the selected encoding.");
  }
}

/**
 * Reverse "UTF-8 misread as Windows-1252 then saved again" mojibake.
 *
 * For each character we need to recover the byte that Windows-1252 mapped
 * that character to. For code points ≤ 255 the byte equals the code point
 * (Windows-1252 is a superset of ISO-8859-1 in that range). For the 27
 * Windows-1252 characters in 0x80–0x9F (€, smart quotes, em-dash, ellipsis,
 * etc.) Unicode maps them to higher code points, so we need an explicit
 * lookup table.
 */
const WIN1252_HIGH_BYTES = {
  0x20ac: 0x80, // €
  0x201a: 0x82, // ‚
  0x0192: 0x83, // ƒ
  0x201e: 0x84, // „
  0x2026: 0x85, // …
  0x2020: 0x86, // †
  0x2021: 0x87, // ‡
  0x02c6: 0x88, // ˆ
  0x2030: 0x89, // ‰
  0x0160: 0x8a, // Š
  0x2039: 0x8b, // ‹
  0x0152: 0x8c, // Œ
  0x017d: 0x8e, // Ž
  0x2018: 0x91, // '
  0x2019: 0x92, // '
  0x201c: 0x93, // "
  0x201d: 0x94, // "
  0x2022: 0x95, // •
  0x2013: 0x96, // –
  0x2014: 0x97, // —
  0x02dc: 0x98, // ˜
  0x2122: 0x99, // ™
  0x0161: 0x9a, // š
  0x203a: 0x9b, // ›
  0x0153: 0x9c, // œ
  0x017e: 0x9e, // ž
  0x0178: 0x9f, // Ÿ
};

function applyReverseMojibake(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c <= 255) {
      bytes.push(c);
    } else {
      const mapped = WIN1252_HIGH_BYTES[c];
      if (mapped !== undefined) bytes.push(mapped);
      // characters with no Windows-1252 mapping (e.g. CJK) cannot be
      // reverse-mojibaked and are dropped
    }
  }
  const arr = new Uint8Array(bytes);
  return new TextDecoder("utf-8", { fatal: false }).decode(arr);
}

function buildPreview(fullText) {
  const slice = fullText.slice(0, 2000);
  return fullText.length > 2000 ? `${slice}…` : slice;
}

function fixedDownloadName(original) {
  const dot = original.lastIndexOf(".");
  if (dot <= 0) return `${original}-fixed`;
  return `${original.slice(0, dot)}-fixed${original.slice(dot)}`;
}

function EncodingFixerTool() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [rawBytes, setRawBytes] = useState(null);
  const [selectedEncoding, setSelectedEncoding] = useState("utf-8");
  const [detectedEncoding, setDetectedEncoding] = useState("");
  const [addBom, setAddBom] = useState(false);
  const [isDoubleEncoded, setIsDoubleEncoded] = useState(false);
  const [toolError, setToolError] = useState(null);

  const { beforePreview, afterPreview, error, fullDecodedText } = useMemo(() => {
    if (!rawBytes || rawBytes.length === 0) {
      return {
        beforePreview: "",
        afterPreview: "",
        error: null,
        fullDecodedText: "",
      };
    }
    const looseUtf8 = new TextDecoder("utf-8", { fatal: false }).decode(
      rawBytes,
    );
    const beforePreview = buildPreview(looseUtf8);
    try {
      let full = decodeWithEncoding(rawBytes, selectedEncoding);
      if (isDoubleEncoded) {
        full = applyReverseMojibake(full);
      }
      return {
        beforePreview,
        afterPreview: buildPreview(full),
        error: null,
        fullDecodedText: full,
      };
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Could not decode with this encoding.";
      return {
        beforePreview,
        afterPreview: "",
        error: msg,
        fullDecodedText: "",
      };
    }
  }, [rawBytes, selectedEncoding, isDoubleEncoded]);

  const getFullOutputText = useCallback(() => {
    if (error) return "";
    return fullDecodedText;
  }, [error, fullDecodedText]);

  const loadFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const buf = reader.result;
      if (!(buf instanceof ArrayBuffer)) return;
      const incoming = new Uint8Array(buf);
      const { bytes, detectedLabel, codec } = normalizeAndDetect(incoming);
      setFileName(file.name);
      setRawBytes(bytes);
      setDetectedEncoding(detectedLabel);
      setSelectedEncoding(codec);
      setAddBom(false);
      setIsDoubleEncoded(false);
      setToolError(null);
    };
    reader.onerror = () => {
      setToolError("Could not read the file.");
      setRawBytes(null);
      setFileName("");
      setDetectedEncoding("");
    };
    reader.readAsArrayBuffer(file);
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

  const downloadFixed = () => {
    if (rawBytes == null) return;
    setToolError(null);
    try {
      const text = getFullOutputText();
      const encoder = new TextEncoder();
      let out = encoder.encode(text);
      if (addBom) {
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const merged = new Uint8Array(bom.length + out.length);
        merged.set(bom, 0);
        merged.set(out, bom.length);
        out = merged;
      }
      const blob = new Blob([out], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fixedDownloadName(fileName || "subtitle.txt");
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setToolError(
        e instanceof Error ? e.message : "Download failed.",
      );
    }
  };

  const hasFile = rawBytes != null;
  const displayError = toolError || error;

  const previewPreClass =
    "max-h-[400px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-gray-300 bg-white p-3 font-mono text-xs leading-relaxed text-[#334155] sm:text-sm";

  const placeholderClass = "text-gray-400";

  return (
    <section
      className="se-scope mx-auto my-6 max-w-[980px] px-4 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif] sm:px-6"
      aria-label="Subtitle encoding fixer tool"
    >
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <input
          ref={fileInputRef}
          id="encoding-file"
          type="file"
          accept=".srt,.vtt,.txt,text/plain"
          className="sr-only"
          onChange={onInputChange}
        />
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
          onDrop={onDrop}
          className={`mb-4 flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-sky-300 px-4 py-8 text-center transition hover:border-[#0ea5e9] ${
            dragActive ? "border-[#0ea5e9] bg-sky-50" : "bg-sky-50/40"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="text-sm font-medium text-[#0ea5e9]">
            Drop a file here or click to browse
          </span>
          <span className="mt-2 text-xs text-[#64748b]">.srt, .vtt, .txt</span>
          {fileName ? (
            <span className="mt-3 max-w-full truncate text-sm text-[#334155]">
              Selected: <strong>{fileName}</strong>
            </span>
          ) : null}
        </div>

        <p className="mb-4 text-xs text-[#64748b]">
          First 2000 characters per preview. &quot;After&quot; updates when you
          change encoding or reverse mojibake.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-1 text-base font-semibold text-orange-600">
              Before (raw UTF-8)
            </div>
            <p className="mb-3 text-xs text-[#64748b]">
              How the file appears with default UTF-8 reading.
            </p>
            <pre
              className={previewPreClass}
              aria-label="Before: raw UTF-8 interpretation"
            >
              {!hasFile ? (
                <span className={placeholderClass}>
                  Upload a file to see preview
                </span>
              ) : (
                beforePreview
              )}
            </pre>

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-[#1e293b]">
                Detected encoding:{" "}
                <span className="font-semibold text-[#0ea5e9]">
                  {detectedEncoding || "—"}
                </span>
              </p>
              <label
                htmlFor="encoding-select"
                className="mb-1 block text-sm font-medium text-[#374151]"
              >
                Interpret file as
              </label>
              <select
                id="encoding-select"
                value={selectedEncoding}
                onChange={(e) => {
                  setToolError(null);
                  setSelectedEncoding(e.target.value);
                }}
                className="w-full rounded-[10px] border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#334155] shadow-sm focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-sky-200"
              >
                {encodingOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-1 text-base font-semibold text-sky-600">
              After (fixed)
            </div>
            <p className="mb-3 text-xs text-[#64748b]">
              Result with your chosen encoding applied.
            </p>
            <pre
              className={previewPreClass}
              aria-live="polite"
              aria-label="After: fixed decoding"
            >
              {!hasFile ? (
                <span className={placeholderClass}>
                  Upload a file to see preview
                </span>
              ) : error ? (
                ""
              ) : (
                afterPreview
              )}
            </pre>

            <div className="mt-6 space-y-5">
              <div>
                <button
                  type="button"
                  className={`${secondaryBtnClass} w-full sm:w-auto`}
                  onClick={() => {
                    setToolError(null);
                    setIsDoubleEncoded((v) => !v);
                  }}
                >
                  {isDoubleEncoded
                    ? "Disable reverse mojibake fix"
                    : "Try reverse mojibake fix"}
                </button>
                <p className="mt-2 text-xs leading-relaxed text-[#64748b]">
                  Use this if your file already contains literal mojibake
                  characters like â€™ or Ã© that need to be un-corrupted.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="add-bom"
                  type="checkbox"
                  checked={addBom}
                  onChange={(e) => setAddBom(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                />
                <label htmlFor="add-bom" className="text-sm text-[#334155]">
                  <span className="font-medium">Add UTF-8 BOM</span>
                  <span className="mt-1 block text-xs text-[#64748b]">
                    Some older players (VLC, Windows Media Player) need a BOM
                    to display non-English characters correctly.
                  </span>
                </label>
              </div>

              <div>
                <button
                  type="button"
                  className={`${primaryBtnClass} w-full sm:w-auto`}
                  onClick={downloadFixed}
                  disabled={!hasFile || Boolean(error)}
                >
                  Download Fixed Subtitle
                </button>
              </div>
            </div>
          </div>
        </div>

        {displayError ? (
          <p
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            role="alert"
          >
            {displayError}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export default function SubtitleEncodingFixerPage() {
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
        <meta property="og:image:alt" content="Subtitle Encoding Fixer" />
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
              Subtitle Encoding Fixer — Repair Mojibake and Weird Characters
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
              Fix mojibake, weird characters, and garbled text in SRT, VTT, and
              TXT subtitle files. Free, private, and works entirely in your
              browser.
            </p>
          </div>

          <EncodingFixerTool />

          <section className={section} aria-labelledby="how-it-works-heading">
            <h2 id="how-it-works-heading" className={h2}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                  Step 1
                </p>
                <p className="text-lg font-semibold text-[#1e293b]">Upload</p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Choose or drag in your .srt, .vtt, or .txt file. The bytes
                  stay on your device; nothing is sent to a server.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                  Step 2
                </p>
                <p className="text-lg font-semibold text-[#1e293b]">
                  Preview &amp; Adjust
                </p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  The tool suggests an encoding from your file. Override it
                  from the list, toggle reverse mojibake if text still looks
                  wrong, and optionally add a UTF-8 BOM for picky players.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                  Step 3
                </p>
                <p className="text-lg font-semibold text-[#1e293b]">
                  Download Fixed File
                </p>
                <p className={`${p} mb-0 mt-2 text-sm`}>
                  Export clean UTF-8 text with one click. The filename adds{" "}
                  <strong>-fixed</strong> before the extension so your original
                  stays safe.
                </p>
              </div>
            </div>
          </section>

          <section className={section} aria-labelledby="before-after-heading">
            <h2 id="before-after-heading" className={h2}>
              Before and After
            </h2>
            <p className={p}>
              A French subtitle line saved correctly as UTF-8:
            </p>
            <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,000
"Bonjour, mon ami — ça va?" elle dit avec un sourire.`}
            </pre>
            <p className={p}>
              The same line after a typical encoding round-trip mistake (UTF-8
              read as Windows-1252, then re-saved as UTF-8):
            </p>
            <pre className="mb-4 overflow-x-auto rounded-[10px] border border-gray-200 bg-gray-50 p-3 font-mono text-sm leading-snug text-[#334155]">
{`1
00:00:01,000 --> 00:00:03,000
"Bonjour, mon ami â€" Ã§a va?" elle dit avec un sourire.`}
            </pre>
            <p className={p}>
              The em-dash (<code>—</code>) has become <code>â€"</code> and the{" "}
              <code>ç</code> has become <code>Ã§</code>. Selecting the correct
              source encoding from the dropdown — or enabling reverse mojibake
              if the file has already been double-encoded — restores the
              original text. Timestamps and cue numbers are never affected.
            </p>
          </section>

          <section className={section} aria-labelledby="decoder-table-heading">
            <h2 id="decoder-table-heading" className={h2}>
              Mojibake Character Decoder
            </h2>
            <p className={p}>
              If your subtitles show literal sequences of two or three Latin
              characters where accented letters or smart quotes should be, the
              file is almost certainly UTF-8 being read as Windows-1252. The
              table below lists the most common mojibake patterns and what
              they should decode to.
            </p>
            <div className={tableWrap}>
              <table className={tableEl}>
                <thead>
                  <tr>
                    <th className={thEl}>What you see</th>
                    <th className={thEl}>What it should be</th>
                    <th className={thEl}>Original character</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className={tdMono}>â€™</td>
                    <td className={tdEl}>Right single quote</td>
                    <td className={tdMono}>{'\u2019'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€˜</td>
                    <td className={tdEl}>Left single quote</td>
                    <td className={tdMono}>{'\u2018'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€œ</td>
                    <td className={tdEl}>Left double quote</td>
                    <td className={tdMono}>{'\u201C'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€</td>
                    <td className={tdEl}>Right double quote</td>
                    <td className={tdMono}>{'\u201D'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€"</td>
                    <td className={tdEl}>En dash</td>
                    <td className={tdMono}>{'\u2013'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€"</td>
                    <td className={tdEl}>Em dash</td>
                    <td className={tdMono}>{'\u2014'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>â€¦</td>
                    <td className={tdEl}>Ellipsis</td>
                    <td className={tdMono}>{'\u2026'}</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã©</td>
                    <td className={tdEl}>e with acute accent</td>
                    <td className={tdMono}>é</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã¨</td>
                    <td className={tdEl}>e with grave accent</td>
                    <td className={tdMono}>è</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã </td>
                    <td className={tdEl}>a with grave accent</td>
                    <td className={tdMono}>à</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã§</td>
                    <td className={tdEl}>c with cedilla</td>
                    <td className={tdMono}>ç</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã¼</td>
                    <td className={tdEl}>u with umlaut</td>
                    <td className={tdMono}>ü</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã¶</td>
                    <td className={tdEl}>o with umlaut</td>
                    <td className={tdMono}>ö</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>Ã±</td>
                    <td className={tdEl}>n with tilde</td>
                    <td className={tdMono}>ñ</td>
                  </tr>
                  <tr>
                    <td className={tdMono}>ÃŸ</td>
                    <td className={tdEl}>German sharp s</td>
                    <td className={tdMono}>ß</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={p}>
              Every pattern in this table has the same root cause: UTF-8 bytes
              being interpreted as Windows-1252. The fix is the same in all
              cases. If the encoding picker is set to UTF-8 and you see these
              sequences, click <strong>Try reverse mojibake fix</strong>. If
              the picker is on Windows-1252, switching to UTF-8 (or the
              correct source encoding for your script) usually resolves them.
            </p>
          </section>

          <section
            className={section}
            aria-labelledby="common-problems-heading"
          >
            <h2 id="common-problems-heading" className={h2}>
              What Is Mojibake and How Does It Happen?
            </h2>
            <p className={p}>
              Subtitle files break when one application saves them in UTF-8
              and another opens them with a legacy single-byte encoding like
              Windows-1252 — or the reverse. That mismatch produces{" "}
              <strong>mojibake</strong>: strings of replacement symbols,
              accented letters turned into pairs of Latin characters, or
              diamond question marks where real letters should be.
            </p>
            <p className={p}>
              Three patterns cause most subtitle corruption:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                <strong>Encoding mismatch.</strong> The file was written in
                one encoding and is being read as another. Russian subtitles
                saved as Windows-1251 but opened as UTF-8 produce one type of
                garbled output; UTF-8 French subtitles opened as Windows-1252
                produce another.
              </li>
              <li>
                <strong>Double-encoding.</strong> UTF-8 bytes were misread as
                Windows-1252, then re-saved as UTF-8. The result is mojibake
                layered on top of itself — literal sequences like{" "}
                <code>Ã©</code> appearing in the text instead of{" "}
                <code>é</code>. The reverse mojibake toggle is built for this
                exact case.
              </li>
              <li>
                <strong>BOM confusion.</strong> Some older Windows
                applications expect a UTF-8 byte-order mark to recognise
                multilingual content; others mishandle it. The BOM checkbox
                lets you control whether the exported file includes one.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="detection-heading">
            <h2 id="detection-heading" className={h2}>
              How the Tool Detects Encoding
            </h2>
            <p className={p}>
              On upload, the Subtitle Encoding Fixer auto-detects encoding in
              this order:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                <strong>UTF-8 BOM</strong> (bytes <code>EF BB BF</code>) →
                labelled &quot;UTF-8 (BOM)&quot;
              </li>
              <li>
                <strong>UTF-16LE BOM</strong> (bytes <code>FF FE</code>) →
                decoded and transcoded to UTF-8 for a consistent pipeline
              </li>
              <li>
                <strong>UTF-16BE BOM</strong> (bytes <code>FE FF</code>) →
                decoded and transcoded to UTF-8
              </li>
              <li>
                <strong>Strict UTF-8 validation</strong> → if all bytes form
                valid UTF-8 sequences, labelled &quot;UTF-8&quot;
              </li>
              <li>
                <strong>Fallback</strong> → Windows-1252, a sensible default
                for Western legacy text
              </li>
            </ul>
            <p className={p}>
              Legacy non-BOM encodings like Windows-1251 (Cyrillic), Shift_JIS
              (Japanese), or Big5 (Traditional Chinese) cannot be
              unambiguously detected from bytes alone. If auto-detect picks
              Windows-1252 but your file is actually Cyrillic or East Asian,
              pick the right encoding from the dropdown and watch the After
              preview update in real time.
            </p>
          </section>

          <section
            className={section}
            aria-labelledby="encoding-by-language-heading"
          >
            <h2 id="encoding-by-language-heading" className={h2}>
              Choosing the Right Encoding for Your Language
            </h2>
            <p className={p}>
              Auto-detect handles BOM-marked files and valid UTF-8 files
              automatically. For legacy files without BOMs, use this guide to
              pick the most likely encoding from the dropdown:
            </p>
            <div className={tableWrap}>
              <table className={tableEl}>
                <thead>
                  <tr>
                    <th className={thEl}>Language or script</th>
                    <th className={thEl}>Try first</th>
                    <th className={thEl}>If that fails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <tr>
                    <td className={tdEl}>
                      English, French, Spanish, German, Italian, Portuguese,
                      Dutch
                    </td>
                    <td className={tdEl}>Windows-1252 (Western)</td>
                    <td className={tdEl}>ISO-8859-1 (Latin-1)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>
                      Polish, Czech, Hungarian, Romanian, Slovak, Slovenian,
                      Croatian
                    </td>
                    <td className={tdEl}>Windows-1250 (Central European)</td>
                    <td className={tdEl}>ISO-8859-2 (Latin-2)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>
                      Russian, Ukrainian, Bulgarian, Serbian Cyrillic,
                      Belarusian
                    </td>
                    <td className={tdEl}>Windows-1251 (Cyrillic)</td>
                    <td className={tdEl}>UTF-8 (modern files)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Japanese</td>
                    <td className={tdEl}>Shift_JIS</td>
                    <td className={tdEl}>UTF-8 (modern files)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Simplified Chinese</td>
                    <td className={tdEl}>GB18030</td>
                    <td className={tdEl}>UTF-8 (modern files)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Traditional Chinese</td>
                    <td className={tdEl}>Big5</td>
                    <td className={tdEl}>UTF-8 (modern files)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Korean</td>
                    <td className={tdEl}>EUC-KR</td>
                    <td className={tdEl}>UTF-8 (modern files)</td>
                  </tr>
                  <tr>
                    <td className={tdEl}>Mixed-script / multilingual</td>
                    <td className={tdEl}>UTF-8</td>
                    <td className={tdEl}>Try reverse mojibake fix</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={p}>
              The &quot;Try first&quot; column reflects the encoding that historically
              shipped with subtitle files for that language before UTF-8
              became universal around 2010. Files produced after about 2015
              are most often UTF-8 regardless of language.
            </p>
          </section>

          <section className={section} aria-labelledby="recipes-heading">
            <h2 id="recipes-heading" className={h2}>
              Step-by-Step Recipes for Common Scenarios
            </h2>
            <p className={p}>
              Below are explicit walkthroughs for the five most common
              subtitle encoding problems.
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
              When to Use the Subtitle Encoding Fixer
            </h2>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                After downloading a subtitle file that displays gibberish —
                accented characters turned into question marks, or sequences
                like <code>â€™</code> or <code>Ã©</code>.
              </li>
              <li>
                After converting subtitles between platforms — some older
                video editors export legacy encodings while modern players
                expect UTF-8.
              </li>
              <li>
                When subtitles play correctly in one app but break in another
                — usually an encoding mismatch rather than a corruption.
              </li>
              <li>
                Before uploading subtitles to YouTube, Vimeo, or other
                platforms that require valid UTF-8.
              </li>
              <li>
                When passing subtitles between Windows, macOS, and Linux
                systems that have different default encodings.
              </li>
              <li>
                After AI auto-transcription tools occasionally produce files
                with mixed or unexpected encodings.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="who-uses-heading">
            <h2 id="who-uses-heading" className={h2}>
              Who Uses This Tool
            </h2>
            <p className={p}>
              Video editors and captioners working with subtitle files from
              international sources. Translators bridging files between
              language editors that default to different encodings. YouTubers,
              Vimeo creators, and broadcasters who need clean UTF-8
              deliveries. Anyone who downloaded a subtitle pack from a
              non-English release and saw boxes or random symbols instead of
              real letters.
            </p>
          </section>

          <section className={section} aria-labelledby="why-use-heading">
            <h2 id="why-use-heading" className={h2}>
              Why Use This Subtitle Encoding Fixer
            </h2>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                Auto-detects UTF-8 (with or without BOM), UTF-16LE, and
                UTF-16BE on load.
              </li>
              <li>
                Ten manual encoding options covering Western, Cyrillic,
                Central European, Latin, Japanese, Chinese, and Korean
                scripts.
              </li>
              <li>
                Reverse mojibake toggle for the common double-encoding case.
              </li>
              <li>
                Optional UTF-8 BOM on export for older Windows tools.
              </li>
              <li>
                Always exports valid UTF-8, regardless of input encoding.
              </li>
              <li>
                Runs entirely in your browser — no upload, no account, no
                install.
              </li>
              <li>
                Preserves all timestamps, cue numbers, and formatting tags
                untouched — only the byte-to-character mapping changes.
              </li>
            </ul>
          </section>

          <section className={section} aria-labelledby="glossary-heading">
            <h2 id="glossary-heading" className={h2}>
              Glossary of Subtitle Encoding Terms
            </h2>
            <p className={p}>
              Key terminology you will see in encoding documentation, error
              messages, and across subtitle tools.
            </p>
            <dl className="space-y-5">
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Character encoding
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A mapping between binary byte sequences and the characters
                  they represent. The same bytes can mean different
                  characters in different encodings, which is why subtitle
                  files sometimes display correctly in one tool and
                  incorrectly in another.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Code point</dt>
                <dd className="mt-1 text-[#334155]">
                  A unique number assigned to each character in the Unicode
                  standard. The letter &quot;A&quot; is code point U+0041; the symbol
                  &quot;♥&quot; is U+2665; the smart apostrophe &apos; is U+2019.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">UTF-8</dt>
                <dd className="mt-1 text-[#334155]">
                  The dominant character encoding for modern text files. It
                  uses 1 byte for ASCII characters and 2 to 4 bytes for
                  everything else. UTF-8 is the WHATWG standard for the web
                  and the default for modern subtitle workflows.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">UTF-16</dt>
                <dd className="mt-1 text-[#334155]">
                  A two-byte-per-character encoding (with surrogate pairs for
                  higher code points). UTF-16 files always start with a
                  byte-order mark: <code>FF FE</code> for little-endian,{" "}
                  <code>FE FF</code> for big-endian.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  BOM (Byte Order Mark)
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A few bytes at the start of a file that signal the encoding
                  to the reader. UTF-8 BOM is <code>EF BB BF</code>; UTF-16LE
                  BOM is <code>FF FE</code>; UTF-16BE BOM is{" "}
                  <code>FE FF</code>. BOMs are optional for UTF-8 but
                  mandatory for UTF-16.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Windows-1252
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A single-byte encoding designed for Western European
                  languages. Often confused with ISO-8859-1 (Latin-1) but
                  slightly different. It&apos;s the most common source of mojibake
                  when its bytes are misread as UTF-8.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">ANSI</dt>
                <dd className="mt-1 text-[#334155]">
                  A legacy Windows term that refers to whichever single-byte
                  encoding is active on a given Windows system — usually
                  Windows-1252 in English/Western European installations,
                  Windows-1251 on Russian Windows, etc. ANSI is NOT a
                  specific encoding; it&apos;s a system setting.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Mojibake</dt>
                <dd className="mt-1 text-[#334155]">
                  Garbled text that appears when bytes are interpreted with
                  the wrong character encoding. The name comes from Japanese
                  文字化け (moji-bake), literally &quot;character transformation.&quot;
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">
                  Replacement character
                </dt>
                <dd className="mt-1 text-[#334155]">
                  A symbol (typically U+FFFD, shown as a black diamond with a
                  question mark, or as an empty box) used to represent bytes
                  that don&apos;t form a valid character in the chosen encoding.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1e293b]">Code page</dt>
                <dd className="mt-1 text-[#334155]">
                  Another name (chiefly Windows) for a character encoding.
                  Windows-1252 is also called &quot;Code Page 1252&quot; or &quot;CP1252.&quot;
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
              Other free subtitle tools you can use alongside the Encoding
              Fixer:
            </p>
            <ul className="mb-4 ml-6 list-disc space-y-2 text-[#334155]">
              <li>
                <Link href="/subtitle-tag-stripper" className={linkClass}>
                  Subtitle Tag Stripper
                </Link>
              </li>
              <li>
                <Link href="/subtitle-find-replace" className={linkClass}>
                  Subtitle Find &amp; Replace
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
              <li>
                <Link href="/subtitle-overlap-fixer" className={linkClass}>
                  Subtitle Overlap Fixer
                </Link>
              </li>
              <li>
                <Link href="/subtitle-time-shifter" className={linkClass}>
                  Subtitle Time Shifter
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </Layout>
    </>
  );
}

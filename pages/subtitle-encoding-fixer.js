import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";

const META_DESC =
  "Free browser-based tool to fix corrupted subtitle encoding. Repair mojibake, weird characters, and garbled text in SRT, VTT, and TXT files. No upload needed.";

const OG_URL = "https://subtitlesedit.com/subtitle-encoding-fixer";

const section =
  "mx-auto max-w-4xl px-4 py-12 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p =
  "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60";

const secondaryBtnClass =
  "inline-flex items-center justify-center rounded-[10px] border-2 border-[#0ea5e9] bg-white px-4 py-2.5 text-sm font-medium text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9]";

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

/** Reverse “UTF-8 misread as Windows-1252 then saved again” mojibake. */
function applyReverseMojibake(text) {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    if (c <= 255) bytes.push(c);
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

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
        {/* Full-width drop zone — mirrors srt-to-txt-converter */}
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
          {/* Input column: Before + source interpretation */}
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

          {/* Output column: After + export controls */}
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
                    Some older players (VLC, Windows Media Player) need a BOM to
                    display non-English characters correctly.
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
        <title>
          Subtitle Encoding Fixer — Fix Mojibake & Weird Characters
        </title>
        <meta name="description" content={META_DESC} />
        <link rel="canonical" href={OG_URL} />
        <meta property="og:title" content="Subtitle Encoding Fixer — Fix Mojibake & Weird Characters" />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:url" content={OG_URL} />
        <meta property="og:type" content="website" />
      </Head>

      <Layout>
        <div className="mx-auto max-w-[1240px] px-4 pb-6 pt-6 sm:px-6 lg:px-8">
          <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-600 px-6 py-14 text-center shadow-lg sm:px-10 sm:py-16">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Subtitle Encoding Fixer
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
              Fix mojibake, weird characters, and garbled text in your subtitle
              files. Free, private, and works entirely in your browser.
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
                  Choose or drag in your .srt, .vtt, or .txt file. The bytes stay
                  on your device; nothing is sent to a server.
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
                  We suggest an encoding from your file. Override it from the
                  list, toggle reverse mojibake if text still looks wrong, and
                  optionally add a UTF-8 BOM for picky players.
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
                  <strong>-fixed</strong> before the extension so you keep the
                  original safe.
                </p>
              </div>
            </div>
          </section>

          <section
            className={section}
            aria-labelledby="common-problems-heading"
          >
            <h2 id="common-problems-heading" className={h2}>
              Common Subtitle Encoding Problems
            </h2>
            <p className={p}>
              Subtitles often break when one app saves UTF-8 but another opens
              them as a legacy single-byte encoding (or the reverse). That
              mismatch produces <strong>mojibake</strong>—replacement symbols,
              accented letters turned into nonsense, or diamond characters.
              Byte-order marks (BOMs) can also confuse tools: some players expect
              a BOM for UTF-8 with certain languages, while others ignore or
              mishandle it. <strong>Double-encoding</strong> happens when UTF-8
              bytes were misread as Windows-1252 (or similar), then written out
              again as UTF-8, layering corruption on top of the original text.
              This tool lets you decode from the source bytes with the right
              legacy encoding, optionally undo that double step, and save proper
              UTF-8.
            </p>
          </section>

          <section className={section} aria-labelledby="faq-heading">
            <h2 id="faq-heading" className={h2}>
              Frequently Asked Questions
            </h2>

            <h3 className={h3}>
              Why are my subtitles showing weird characters like â€™ or Ã©?
            </h3>
            <p className={p}>
              Those sequences usually mean the file was saved as UTF-8 but opened
              or converted using a different encoding (often Windows-1252), or the
              opposite: legacy bytes were interpreted as UTF-8. Picking the
              correct source encoding here—or using reverse mojibake—typically
              restores the intended letters and punctuation.
            </p>

            <h3 className={h3}>
              What encoding should I use for subtitle files?
            </h3>
            <p className={p}>
              Today, <strong>UTF-8</strong> is the standard for new SRT, VTT, and
              TXT subtitles because it supports every language in one file.
              Older downloads may still be Windows-1252, Latin-1, or a regional
              legacy encoding; match the encoding your file was actually written
              in when decoding, then export UTF-8 from this tool.
            </p>

            <h3 className={h3}>What is mojibake?</h3>
            <p className={p}>
              <strong>Mojibake</strong> is garbled text caused by reading bytes
              with the wrong character mapping—like displaying UTF-8 bytes as if
              they were Latin-1. The result looks like random accents and symbols
              instead of real words. Fixing it means decoding with the encoding
              that matches how the file was produced.
            </p>

            <h3 className={h3}>Do I need a BOM in my subtitle file?</h3>
            <p className={p}>
              Most modern apps handle UTF-8 without a BOM. Some older Windows
              players and workflows expect a UTF-8 BOM to recognize multilingual
              text; if playback looks wrong only on those systems, try exporting
              with the BOM option enabled here.
            </p>

            <h3 className={h3}>Is my file uploaded to a server?</h3>
            <p className={p}>
              No. All decoding and preview happen in your browser using the
              standard <strong>TextDecoder</strong> API. Your file never leaves
              your machine unless you choose to download or share it elsewhere.
            </p>
          </section>

          <section className={section} aria-labelledby="related-heading">
            <h2 id="related-heading" className={h2}>
              Related Tools
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <li>
                <Link
                  href="/srt-to-vtt-converter"
                  className="block rounded-xl border border-gray-200 bg-white p-4 text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  SRT to VTT Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/vtt-to-srt-converter"
                  className="block rounded-xl border border-gray-200 bg-white p-4 text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  VTT to SRT Converter
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-overlap-fixer"
                  className="block rounded-xl border border-gray-200 bg-white p-4 text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  Subtitle Overlap Fixer
                </Link>
              </li>
              <li>
                <Link
                  href="/subtitle-time-shifter"
                  className="block rounded-xl border border-gray-200 bg-white p-4 text-[#0ea5e9] shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
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

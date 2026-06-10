import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { useState, useEffect, useCallback, useRef } from 'react'

const CANONICAL = 'https://subtitlesedit.com/subtitle-line-length-limiter'
const META_DESC =
  'Reformat SRT and VTT subtitle files to Netflix, BBC, or custom line length standards. Re-wrap and split long cues automatically. Free, browser-based.'

const TS_LINE_RE =
  /\d{2}:\d{2}:\d{2}[.,]\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}[.,]\d{3}/

const textareaClass =
  'w-full border border-slate-300 rounded-lg p-4 font-mono whitespace-pre-wrap resize-y focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 h-80 bg-white'

const skyBtnSolid =
  'inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500'

const OG_IMG =
  'https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp'

const PAGE_TITLE = 'Subtitle Line Length Limiter — Fix Long SRT & VTT Lines'

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://subtitlesedit.com/#organization',
      name: 'Subtitlesedit.com',
      url: 'https://subtitlesedit.com',
      email: 'support@subtitlesedit.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://subtitlesedit.com/#logo',
        url: 'https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp',
        contentUrl:
          'https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design.webp',
        caption: 'Subtitles Edit',
        inLanguage: 'en-US',
        width: 500,
        height: 500,
      },
      description:
        'SubtitlesEdit.com is a free, browser-based toolkit for creating, editing, and perfecting subtitle and caption files. We help video creators, YouTubers, educators, translators, and media teams easily convert, merge, split, sync, and fix subtitles online \u2014 no software installation or sign-up required.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://subtitlesedit.com/#website',
      url: 'https://subtitlesedit.com',
      name: 'Subtitles Edit',
      alternateName: 'SubtitlesEdit.com',
      publisher: { '@id': 'https://subtitlesedit.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://subtitlesedit.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Subtitle Line Length Limiter',
          item: 'https://subtitlesedit.com/subtitle-line-length-limiter',
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#webpage',
      url: 'https://subtitlesedit.com/subtitle-line-length-limiter',
      name: PAGE_TITLE,
      isPartOf: { '@id': 'https://subtitlesedit.com/#website' },
      primaryImageOfPage: { '@id': 'https://subtitlesedit.com/#logo' },
      breadcrumb: {
        '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#breadcrumb',
      },
      mainEntity: {
        '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#tool',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#tool',
      name: 'Subtitle Line Length Limiter',
      url: 'https://subtitlesedit.com/subtitle-line-length-limiter',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (runs in a web browser)',
      browserRequirements: 'Requires a modern web browser with JavaScript enabled',
      description:
        'A free, browser-based tool that reformats SRT and VTT subtitles to a chosen characters-per-line limit (Netflix 42, BBC 37, or custom). It re-wraps text at word boundaries and can split overly long cues into two with proportional timing. All processing happens locally in your browser with no uploads or sign-up.',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'Auto-detects SRT and VTT input',
        'Netflix (42), BBC (37), and custom 20-80 character limits',
        'Word-aware line wrapping',
        'Optional proportional cue splitting',
        'Runs entirely in the browser with no file uploads',
      ],
      publisher: { '@id': 'https://subtitlesedit.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://subtitlesedit.com/subtitle-line-length-limiter#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What character limit should I use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "For streaming platforms, 42 (Netflix's standard) is the safest default. For UK broadcast or BBC-style work, use 37. For loose web video or internal training content, 47 is fine. If you're producing for a specific platform, check their style guide for the exact requirement and use the custom field.",
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to the timing when a cue is split in two?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The tool splits the timing proportionally based on character count. If the first half of the wrapped text is 60 percent of the total characters, it gets 60 percent of the original cue's duration, and the second half gets the remaining 40 percent. Original timestamps are preserved at the boundaries: the first cue starts when the original did, and the second cue ends when the original did.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why did not the tool break this long word across two lines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'By design. Breaking a word mid-character produces unreadable results and breaks language conventions. If a single word exceeds your character limit, such as a long URL or unusual compound word, the tool lets that line overflow rather than fragment the word. You can manually edit the cue or raise the character limit if needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will this work on subtitles in non-Latin scripts (Chinese, Arabic, etc.)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Partially. The character-counting logic treats each character as one unit, which works for Chinese and Japanese where each character is roughly one display unit. For Arabic and Hebrew, right-to-left direction is preserved but you should verify the wrap points suit your language. The 42-character convention is Latin-script-centric; consider lower limits of 15 to 20 for CJK scripts.',
          },
        },
        {
          '@type': 'Question',
          name: 'What if a split cue still exceeds two lines after splitting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tool splits each oversized cue once. If one of the resulting halves is still too long for two lines at your character limit, the tool accepts the overflow rather than recursively splitting, which would fragment timing absurdly. This is rare and only happens with extremely long cues at very tight limits. The fix is to raise your limit or break the cue manually.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is anything uploaded to your server?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Everything happens inside your browser, so your subtitle file never leaves your device. There is no upload, no account, and no tracking of file contents. You can verify by disconnecting from the internet after loading the page; the tool keeps working normally.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the tool merge short lines or only break long ones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both. It re-flows the full text of each cue to fit your character limit, so a long line is broken across multiple lines and two short lines that comfortably fit together are merged into one. The result is consistent wrapping throughout the file rather than a mix of your original line breaks and new ones.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I limit line length without creating extra cues?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Yes. Untick the 'Split overly long cues' checkbox in Settings. With splitting off, every cue keeps its original timing and stays a single cue; the text is simply wrapped to your chosen limit, even if that leaves more than two lines on screen. Turn splitting back on when a platform requires strict two-line cues.",
          },
        },
        {
          '@type': 'Question',
          name: 'Why are the subtitle numbers different in my SRT output?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The tool renumbers SRT cues sequentially from 1 in the output. If your input had gaps in its numbering, or a cue was split into two, the output numbers will not match the originals. This is expected and keeps the file valid, because players rely on cue order and timing, not on the specific index values.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does my VTT file have extra blank lines between cues?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The VTT output can include an extra blank line between cues. This is harmless: the WebVTT format treats any run of blank lines as a single separator, so the file plays correctly in every compliant player and editor. If you prefer tighter spacing, collapse the blank lines in any text editor.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does this fit with other subtitle tools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is one step in a clean-up workflow. Strip styling with the Subtitle Tag Stripper, fix line lengths here, then correct timing with the Subtitle Time Shifter or resolve clashes with the Subtitle Overlap Fixer. If you need to break a long file into smaller parts rather than re-wrap lines, use the Subtitle Splitter instead.',
          },
        },
      ],
    },
  ],
}

function detectFormat(text) {
  const head = (text || '').slice(0, 20).toUpperCase().trim()
  return head.includes('WEBVTT') ? 'vtt' : 'srt'
}

function parseTimestamp(str, format) {
  const trimmed = String(str).trim()
  const sepIdx = Math.max(trimmed.lastIndexOf(','), trimmed.lastIndexOf('.'))
  const timePart = sepIdx >= 0 ? trimmed.slice(0, sepIdx) : trimmed
  const msPart = sepIdx >= 0 ? trimmed.slice(sepIdx + 1) : '0'
  const [hh, mm, ss] = timePart.split(':').map((n) => parseInt(n, 10))
  const mmm = parseInt(msPart, 10) || 0
  return (hh || 0) * 3600000 + (mm || 0) * 60000 + (ss || 0) * 1000 + mmm
}

function formatTimestamp(ms, format) {
  const sep = format === 'vtt' ? '.' : ','
  let t = Math.max(0, Math.round(ms))
  const mmm = t % 1000
  t = Math.floor(t / 1000)
  const ss = t % 60
  t = Math.floor(t / 60)
  const mm = t % 60
  const hh = Math.floor(t / 60)
  const pad = (n, len) => String(n).padStart(len, '0')
  return `${pad(hh, 2)}:${pad(mm, 2)}:${pad(ss, 2)}${sep}${pad(mmm, 3)}`
}

function parseCueTimestampLine(line, format) {
  const m = line.match(
    /(\d{2}:\d{2}:\d{2}[.,]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})(.*)/,
  )
  if (!m) return null
  return {
    startMs: parseTimestamp(m[1], format),
    endMs: parseTimestamp(m[2], format),
    cueSettings: m[3] || '',
  }
}

function parseCues(text, format) {
  const blocks = (text || '').split(/\r?\n\r?\n/)
  const cues = []

  for (const block of blocks) {
    const lines = block.split(/\r?\n/)
    while (lines.length && lines[0].trim() === '') lines.shift()
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop()
    if (lines.length === 0) continue

    if (format === 'vtt') {
      if (/^WEBVTT\b/i.test(lines[0].trim())) continue
      if (/^NOTE\b/i.test(lines[0].trim())) continue
      if (/^STYLE\b|^REGION\b/i.test(lines[0].trim())) continue

      let identifier = ''
      let tsIdx = -1
      for (let i = 0; i < lines.length; i++) {
        if (TS_LINE_RE.test(lines[i])) {
          tsIdx = i
          break
        }
      }
      if (tsIdx < 0) continue

      if (tsIdx > 0) {
        identifier = lines.slice(0, tsIdx).join('\n')
      }

      const tsParsed = parseCueTimestampLine(lines[tsIdx], format)
      if (!tsParsed) continue

      const textLines = lines.slice(tsIdx + 1)
      cues.push({
        index: null,
        identifier,
        startMs: tsParsed.startMs,
        endMs: tsParsed.endMs,
        cueSettings: tsParsed.cueSettings,
        textLines,
      })
      continue
    }

    // SRT
    let i = 0
    let index = '1'
    if (/^\d+$/.test(lines[0].trim()) && lines.length >= 2) {
      index = lines[0].trim()
      i = 1
    }
    const timingLine = lines[i]
    if (!timingLine || !TS_LINE_RE.test(timingLine)) continue
    const tsParsed = parseCueTimestampLine(timingLine, 'srt')
    if (!tsParsed) continue
    const textLines = lines.slice(i + 1)
    cues.push({
      index,
      identifier: '',
      startMs: tsParsed.startMs,
      endMs: tsParsed.endMs,
      cueSettings: tsParsed.cueSettings,
      textLines,
    })
  }

  return cues
}

function wrapLine(text, limit) {
  const collapsed = String(text).replace(/\s+/g, ' ').trim()
  if (!collapsed) return []
  const words = collapsed.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    if (currentLine === '') {
      currentLine = word
    } else if (currentLine.length + 1 + word.length <= limit) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  if (currentLine) lines.push(currentLine)
  return lines
}

function processCue(cue, limit, allowSplit, format) {
  const joinedText = cue.textLines.join(' ').replace(/\s+/g, ' ').trim()
  const wrappedLines = wrapLine(joinedText, limit)
  const originalText = cue.textLines.join('\n')
  const newText = wrappedLines.join('\n')

  if (wrappedLines.length <= 2) {
    return {
      cues: [{ ...cue, textLines: wrappedLines }],
      wasRewrapped: newText !== originalText,
      wasSplit: false,
    }
  }

  if (allowSplit) {
    const totalChars = wrappedLines.join(' ').length
    let running = 0
    let k = 0
    for (let i = 0; i < wrappedLines.length; i++) {
      const add = wrappedLines[i].length + (i > 0 ? 1 : 0)
      running += add
      if (running >= totalChars / 2) {
        k = i
        break
      }
    }
    if (k === wrappedLines.length - 1) {
      k = Math.floor(wrappedLines.length / 2)
    }
    const firstLines = wrappedLines.slice(0, k + 1)
    const secondLines = wrappedLines.slice(k + 1)
    const firstChars = firstLines.join(' ').length
    const duration = cue.endMs - cue.startMs
    const fraction = totalChars > 0 ? firstChars / totalChars : 0.5
    const splitMs = Math.round(cue.startMs + duration * fraction)
    const cue1 = {
      ...cue,
      startMs: cue.startMs,
      endMs: splitMs,
      textLines: firstLines,
    }
    const cue2 = {
      ...cue,
      identifier: '',
      startMs: splitMs,
      endMs: cue.endMs,
      textLines: secondLines,
    }
    return { cues: [cue1, cue2], wasRewrapped: true, wasSplit: true }
  }

  return {
    cues: [{ ...cue, textLines: wrappedLines }],
    wasRewrapped: true,
    wasSplit: false,
  }
}

function processSubtitles(text, limit, allowSplit) {
  if (!text || !String(text).trim()) {
    return {
      output: '',
      rewrapped: 0,
      split: 0,
      unchanged: 0,
      format: 'srt',
    }
  }

  const format = detectFormat(text)
  const cues = parseCues(text, format)
  let rewrappedCount = 0
  let splitCount = 0
  let unchangedCount = 0
  const resultCues = []

  for (const cue of cues) {
    const result = processCue(cue, limit, allowSplit, format)
    if (result.wasSplit) splitCount++
    else if (result.wasRewrapped) rewrappedCount++
    else unchangedCount++
    resultCues.push(...result.cues)
  }

  const parts = []
  if (format === 'srt') {
    let n = 1
    for (const cue of resultCues) {
      parts.push(
        String(n),
        `${formatTimestamp(cue.startMs, 'srt')} --> ${formatTimestamp(cue.endMs, 'srt')}`,
        cue.textLines.join('\n'),
        '',
      )
      n += 1
    }
    const assembled = parts.join('\n')
    return {
      output: assembled.trim() ? `${assembled.trim()}\n` : '',
      rewrapped: rewrappedCount,
      split: splitCount,
      unchanged: unchangedCount,
      format,
    }
  }

  for (const cue of resultCues) {
    const idLine = cue.identifier ? `${cue.identifier}\n` : ''
    const tsLine = `${formatTimestamp(cue.startMs, 'vtt')} --> ${formatTimestamp(cue.endMs, 'vtt')}${cue.cueSettings || ''}`
    parts.push(`${idLine}${tsLine}\n${cue.textLines.join('\n')}\n`, '')
  }
  const body = parts.join('\n').replace(/\n+$/, '')
  const assembled = body ? `WEBVTT\n\n${body}\n` : 'WEBVTT\n\n'
  return {
    output: assembled,
    rewrapped: rewrappedCount,
    split: splitCount,
    unchanged: unchangedCount,
    format,
  }
}

function LineLengthLimiterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState('')
  const [fontSize, setFontSize] = useState(16)
  const [copyLabel, setCopyLabel] = useState('Copy')
  const [downloadFormat, setDownloadFormat] = useState('srt')
  const [charLimitPreset, setCharLimitPreset] = useState('42')
  const [customCharLimit, setCustomCharLimit] = useState(42)
  const [splitLongCues, setSplitLongCues] = useState(true)

  const fileRef = useRef(null)
  const fontSizes = [12, 14, 16, 18, 20, 24]
  const fontStyle = { fontSize: `${fontSize}px` }

  const charLimit =
    charLimitPreset === 'custom'
      ? customCharLimit
      : parseInt(charLimitPreset, 10)

  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setStatus('')
      setDownloadFormat('srt')
      return
    }
    const result = processSubtitles(input, charLimit, splitLongCues)
    setOutput(result.output)
    setDownloadFormat(result.format)
    setStatus(
      `${result.rewrapped} cues rewrapped. ${result.split} cues split. ${result.unchanged} cues unchanged.`,
    )
  }, [input, charLimit, splitLongCues])

  const readFileAsText = useCallback((file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const t = typeof reader.result === 'string' ? reader.result : ''
      setInput(t)
    }
    reader.readAsText(file, 'UTF-8')
  }, [])

  const handleFileChoose = useCallback(
    (e) => {
      const f = e.target.files?.[0]
      if (f) readFileAsText(f)
      e.target.value = ''
    },
    [readFileAsText],
  )

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      const f = e.dataTransfer.files?.[0]
      if (f) readFileAsText(f)
    },
    [readFileAsText],
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const handleCopy = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      setCopyLabel('Copied!')
      setTimeout(() => setCopyLabel('Copy'), 1500)
    } catch {
      /* ignore */
    }
  }, [output])

  const handleDownload = useCallback(() => {
    if (!output) return
    const name =
      downloadFormat === 'vtt' ? 'formatted.vtt' : 'formatted.srt'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
  }, [output, downloadFormat])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setStatus('')
    setCopyLabel('Copy')
  }, [])

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-8 font-[system-ui,-apple-system,Segoe_UI,Roboto,Arial,sans-serif]"
      aria-label="Subtitle Line Length Limiter"
    >
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold leading-tight text-slate-900 md:text-[2rem]">
          Subtitle Line Length Limiter
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Reformat subtitle files to Netflix, BBC, or custom line length standards.
          Auto-detects SRT and VTT. 100% browser-based — your files never leave your
          device.
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
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
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
            <label className="mb-2 block font-semibold text-slate-700">
              Input subtitle file
            </label>
            <div className="mb-2">
              <input
                ref={fileRef}
                id="line-limiter-file"
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
            <label className="mb-2 block font-semibold text-slate-700">
              Reformatted output
            </label>
            <textarea
              value={output}
              readOnly
              placeholder="Reformatted subtitles will appear here..."
              className={textareaClass}
              style={fontStyle}
              spellCheck={false}
            />
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="mb-3 font-semibold text-slate-700">Settings</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="char-limit-preset"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Characters per line
              </label>
              <select
                id="char-limit-preset"
                value={charLimitPreset}
                onChange={(e) => setCharLimitPreset(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white p-2"
              >
                <option value="32">32 — Broadcast tight</option>
                <option value="37">37 — BBC</option>
                <option value="42">42 — Netflix (default)</option>
                <option value="47">47 — Loose web</option>
                <option value="custom">Custom...</option>
              </select>
              {charLimitPreset === 'custom' ? (
                <div className="mt-3">
                  <label
                    htmlFor="custom-char-limit"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Custom limit (20–80)
                  </label>
                  <input
                    id="custom-char-limit"
                    type="number"
                    min={20}
                    max={80}
                    value={customCharLimit}
                    onChange={(e) =>
                      setCustomCharLimit(
                        Math.min(80, Math.max(20, parseInt(e.target.value, 10) || 42)),
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2"
                  />
                </div>
              ) : null}
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={splitLongCues}
                  onChange={(e) => setSplitLongCues(e.target.checked)}
                  className="mt-0.5 accent-sky-500"
                />
                <span>
                  Split overly long cues
                  <span className="mt-1 block text-xs text-slate-500">
                    If a cue still needs more than 2 lines after wrapping, split it
                    into two cues with proportional timing.
                  </span>
                </span>
              </label>
            </div>
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
            Paste your SRT or VTT subtitle file into the input area, or drop a file
            directly onto it.
          </li>
          <li>
            Pick a character-per-line limit from the presets, or enter a custom value
            between 20 and 80.
          </li>
          <li>
            Decide whether you want overly long cues split into two cues with
            proportional timing — on by default.
          </li>
          <li>
            The reformatted output appears instantly in the right panel as you adjust
            settings.
          </li>
          <li>
            Copy the result to your clipboard or download it as a fresh SRT or VTT
            file ready for your video editor or streaming platform.
          </li>
        </ol>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Before and after example
        </h2>
        <p className="mb-4 leading-relaxed text-slate-700">
          Here is a single overlong line reformatted to the 42-character Netflix
          limit. Because the wrapped text needs more than two lines, the tool splits
          it into two cues and divides the original duration proportionally by
          character count.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Before — one long line
            </p>
            <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
              <code>{`1
00:00:01,000 --> 00:00:05,000
This is a really long single line of subtitle text that clearly runs well past the forty-two character limit and needs wrapping.`}</code>
            </pre>
          </div>
          <div className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-slate-700">
              After — wrapped to 42, split into two cues
            </p>
            <pre className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
              <code>{`1
00:00:01,000 --> 00:00:03,438
This is a really long single line of
subtitle text that clearly runs well past

2
00:00:03,438 --> 00:00:05,000
the forty-two character limit and needs
wrapping.`}</code>
            </pre>
          </div>
        </div>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Choosing the right character limit
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          32 characters — broadcast tight
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Used by some traditional broadcasters and live captioning workflows where
          on-screen real estate is limited or text must stay readable on small
          displays. Tight limits force frequent line breaks and are rarely needed for
          modern streaming work.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          37 characters — BBC standard
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The BBC subtitle guidelines specify 37 characters per line as the working
          maximum for pre-recorded content. This is widely adopted across UK broadcast
          captioning and many European public service broadcasters.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          42 characters — Netflix standard
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Netflix&apos;s published Timed Text Style Guide specifies 42 characters per
          line as the maximum for most languages. This has effectively become the de
          facto standard for streaming submissions and is the most common limit used
          by professional captioners worldwide.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          47 characters — loose web
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          A looser limit suited to web video players with larger viewport allocations,
          internal company training videos, or YouTube uploads where strict style
          compliance isn&apos;t required. Gives more flexibility but can produce
          subtitles that overrun mobile screens.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Common use cases
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Fixing YouTube auto-caption line lengths
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          YouTube&apos;s automatic captions and Whisper-style AI transcription tools
          produce subtitles with no awareness of professional line length conventions. A
          30-second clip can come back with one long unbroken line that overruns the
          screen on any device. Running the output through this tool reformats
          everything to a readable limit in a single pass.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Preparing subtitles for Netflix or streaming submission
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Streaming platforms reject subtitle files that exceed their style guide
          specifications. Netflix in particular is strict about the 42-character limit
          and will return files for resubmission if they don&apos;t comply. Catching
          the violations before submission saves a round-trip and gets your captions
          accepted on the first pass.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Cleaning up subtitles from machine translation
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Machine-translated subtitles often expand text significantly compared to the
          source language — German and Finnish translations can be 30 percent longer
          than English. The original line breaks no longer fit. Re-wrapping after
          translation restores professional formatting without manual line-by-line
          editing.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Who uses this tool
        </h2>
        <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
          <li>
            <strong>Streaming and broadcast captioners</strong> preparing files to
            Netflix (42), BBC (37), or platform-specific limits before submission.
          </li>
          <li>
            <strong>YouTubers and video editors</strong> cleaning up auto-generated
            captions that arrive as long, unbroken lines.
          </li>
          <li>
            <strong>Translators and localizers</strong> re-wrapping subtitles after
            translation expands the text beyond the original line breaks.
          </li>
          <li>
            <strong>E-learning and corporate video teams</strong> standardizing
            caption formatting across large content libraries.
          </li>
          <li>
            <strong>Anyone working from Whisper or AI transcripts</strong> that ignore
            professional line-length conventions.
          </li>
        </ul>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Why use this tool
        </h2>
        <p className="mb-4 leading-relaxed text-slate-700">
          Deterministic line wrapping means the same input always produces the same
          output — unlike AI tools that may decide to &quot;improve&quot; your dialogue
          text while they reformat. When a cue must be split, proportional timing is
          calculated from character counts in plain JavaScript, so timestamps stay
          exact across thousands of cues; large language models often hallucinate
          sequential floating-point math on long files. Everything runs in your
          browser: no upload, no server, and no account, so your subtitles never leave
          your device. There are no token or context limits either — a three-hour film
          re-wraps in milliseconds on a typical laptop. Toggle presets and splitting on
          or off and watch the output update live before you copy or download. It pairs
          naturally with the rest of SubtitlesEdit:{' '}
          <Link
            href="/subtitle-tag-stripper"
            className="text-sky-600 underline hover:text-sky-700"
          >
            strip tags
          </Link>{' '}
          first, fix line lengths here, then{' '}
          <Link
            href="/subtitle-time-shifter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            adjust timing
          </Link>{' '}
          or{' '}
          <Link
            href="/subtitle-overlap-fixer"
            className="text-sky-600 underline hover:text-sky-700"
          >
            fix overlaps
          </Link>{' '}
          when cues drift on the timeline.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Frequently Asked Questions
        </h2>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          What character limit should I use?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          For streaming platforms, 42 (Netflix&apos;s standard) is the safest default.
          For UK broadcast or BBC-style work, use 37. For loose web video or internal
          training content, 47 is fine. If you&apos;re producing for a specific platform,
          check their style guide for the exact requirement and use the custom field.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          What happens to the timing when a cue is split in two?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The tool splits the timing proportionally based on character count. If the
          first half of the wrapped text is 60 percent of the total characters, it gets
          60 percent of the original cue&apos;s duration, and the second half gets the
          remaining 40 percent. Original timestamps are preserved at the boundaries —
          the first cue starts when the original did, and the second cue ends when the
          original did.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Why didn&apos;t the tool break this long word across two lines?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          By design. Breaking a word mid-character produces unreadable results and breaks
          language conventions. If a single word exceeds your character limit (typically
          a long URL or unusual compound word), the tool allows that line to overflow
          rather than fragment the word. You can manually edit the cue or raise the
          character limit if needed.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Will this work on subtitles in non-Latin scripts (Chinese, Arabic, etc.)?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Partially. The character-counting logic treats each character as one unit,
          which works correctly for Chinese and Japanese where each character is roughly
          one display unit. For Arabic and Hebrew, the right-to-left direction is
          preserved but you should verify the wrap points make sense for your language.
          The 42-character convention is Latin-script-centric; consider lower limits
          (15–20) for CJK scripts.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          What if a split cue still exceeds two lines after splitting?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The tool splits each oversized cue once. If one of the resulting halves is
          still too long for two lines at your character limit, the tool accepts the
          overflow rather than recursively splitting (which would fragment timing
          absurdly). This is rare — it only happens with extremely long cues at very
          tight limits. The fix is to raise your character limit or manually break the
          cue further.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Is anything uploaded to your server?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          No. Everything happens inside your browser — your subtitle file never leaves
          your device. There&apos;s no upload, no account, and no tracking of file
          contents. You can verify by disconnecting from the internet after loading the
          page; the tool will continue to work normally.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Does the tool merge short lines or only break long ones?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Both. It re-flows the full text of each cue to fit your character limit, so a
          long line is broken across multiple lines and two short lines that comfortably
          fit together are merged into one. The result is consistent wrapping throughout
          the file rather than a mix of your original line breaks and new ones.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Can I limit line length without creating extra cues?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          Yes. Untick the &quot;Split overly long cues&quot; checkbox in Settings. With
          splitting off, every cue keeps its original timing and stays a single cue — the
          text is simply wrapped to your chosen limit, even if that leaves more than two
          lines on screen. Turn splitting back on when a platform requires strict
          two-line cues.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Why are the subtitle numbers different in my SRT output?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The tool renumbers SRT cues sequentially from 1 in the output. If your input
          had gaps in its numbering, or a cue was split into two, the output numbers
          won&apos;t match the originals. This is expected and keeps the file valid —
          players rely on cue order and timing, not on the specific index values.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          Why does my VTT file have extra blank lines between cues?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          The VTT output can include an extra blank line between cues. This is harmless:
          the WebVTT format treats any run of blank lines as a single separator, so the
          file plays correctly in every compliant player and editor. If you prefer tighter
          spacing, collapse the blank lines in any text editor.
        </p>

        <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-700">
          How does this fit with other subtitle tools?
        </h3>
        <p className="mb-4 leading-relaxed text-slate-700">
          It is one step in a clean-up workflow. Strip styling with the{' '}
          <Link
            href="/subtitle-tag-stripper"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Tag Stripper
          </Link>
          , fix line lengths here, then correct timing with the{' '}
          <Link
            href="/subtitle-time-shifter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Time Shifter
          </Link>{' '}
          or resolve clashes with the{' '}
          <Link
            href="/subtitle-overlap-fixer"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Overlap Fixer
          </Link>
          . If you need to break a long file into smaller parts rather than re-wrap
          lines, use the{' '}
          <Link
            href="/subtitle-splitter"
            className="text-sky-600 underline hover:text-sky-700"
          >
            Subtitle Splitter
          </Link>{' '}
          instead.
        </p>

        <h2 className="mt-12 mb-4 text-2xl font-bold text-slate-800">
          Related tools
        </h2>
        <ul className="mb-4 ml-6 list-disc space-y-2 text-slate-700">
          <li>
            <Link
              href="/subtitle-tag-stripper"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Tag Stripper
            </Link>{' '}
            — remove HTML, styling, and formatting tags before re-wrapping.
          </li>
          <li>
            <Link
              href="/subtitle-time-shifter"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Time Shifter
            </Link>{' '}
            — move every cue earlier or later by a fixed offset.
          </li>
          <li>
            <Link
              href="/subtitle-overlap-fixer"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Overlap Fixer
            </Link>{' '}
            — resolve cues whose timings collide on the timeline.
          </li>
          <li>
            <Link
              href="/subtitle-merger"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Merger
            </Link>{' '}
            — join multiple subtitle files into one.
          </li>
          <li>
            <Link
              href="/subtitle-splitter"
              className="text-sky-600 underline hover:text-sky-700"
            >
              Subtitle Splitter
            </Link>{' '}
            — break one subtitle file into smaller parts.
          </li>
        </ul>
      </div>
    </section>
  )
}

export default function SubtitleLineLengthLimiterPage() {
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
          <LineLengthLimiterTool />
        </div>
      </Layout>
    </>
  )
}

import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";

const HERO_IMG =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Subtitle-Overlap-Fixer-tool-1024x538.webp";

const section =
  "mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-[3rem] py-10 lg:py-12";
const h2 =
  "text-[1.875rem] font-semibold leading-snug text-[#1e293b] mb-4 mt-2";
const h3 = "text-xl font-semibold text-[#1e293b] mb-3 mt-8";
const p = "mb-4 text-[#334155] leading-relaxed [&_strong]:font-semibold [&_strong]:text-[#1e293b]";
const ul = "mb-4 list-disc pl-5 text-[#334155] space-y-2 [&_p]:mb-0";
const ol = "mb-4 list-decimal pl-5 text-[#334155] space-y-2 [&_p]:mb-0";
const code =
  "rounded bg-[#ECEFF3] px-1.5 py-0.5 text-sm font-normal text-[#111827]";

function HubGrid() {
  const cardBase =
    "flex min-h-[160px] flex-col items-center justify-center gap-2.5 rounded-[14px] border border-gray-200 bg-white px-[18px] py-[22px] text-center shadow-[0_2px_12px_rgba(0,0,0,.06)] outline-0 transition-[transform,box-shadow,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-sky-400/45 hover:bg-gradient-to-b hover:from-white hover:to-[#fbfdff] hover:shadow-[0_6px_26px_rgba(0,0,0,.10)] focus-visible:border-sky-500 focus-visible:shadow-[0_0_0_3px_rgba(14,165,233,.35),0_2px_12px_rgba(0,0,0,.06)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";
  const ico =
    "grid h-[52px] w-[52px] place-items-center rounded-xl border border-gray-200 bg-slate-50";
  const icoSvg = "h-7 w-7 fill-[#0ea5e9]";
  const title = "text-[1.02rem] font-bold tracking-tight text-[#111827]";
  const desc = "text-[0.95rem] text-[#6b7280]";

  return (
    <section
      className="mx-auto mb-12 mt-8 max-w-[1100px] px-4 text-[#111827]"
      aria-labelledby="se-hub-title"
    >
      <p
        id="se-hub-title"
        className="mb-6 text-[0.975rem] text-[#6b7280]"
      >
        All tools run 100% in your browser. No uploads. No tracking.
      </p>

      <nav className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3" aria-label="Tool grid">
        <a
          className={cardBase}
          href="/srt-to-vtt-converter"
          aria-label="Open SRT to VTT Converter"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M4 4h16v6H4zM4 14h7v6H4zM13 14h7v6h-7z" />
            </svg>
          </span>
          <span className={title}>SRT → VTT Converter</span>
          <span className={desc}>Convert .srt to browser-native .vtt</span>
        </a>

        <a
          className={cardBase}
          href="/vtt-to-srt-converter"
          aria-label="Open VTT to SRT Converter"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M4 4h7v6H4zM13 4h7v6h-7zM4 14h16v6H4z" />
            </svg>
          </span>
          <span className={title}>VTT → SRT Converter</span>
          <span className={desc}>Convert .vtt files back to .srt</span>
        </a>

        <a
          className={cardBase}
          href="/subtitle-time-shifter"
          aria-label="Open Subtitle Time Shifter"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 5h-2v6l5 3 1-1.732-4-2.268V7z" />
            </svg>
          </span>
          <span className={title}>Subtitle Time Shifter</span>
          <span className={desc}>Shift timestamps forward or back</span>
        </a>

        <a
          className={cardBase}
          href="/subtitle-merger"
          aria-label="Open Subtitle Merger"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M7 3h4v4H7zM13 3h4v4h-4zM7 17h10v4H7zM11 7h2v6h-2z" />
            </svg>
          </span>
          <span className={title}>Subtitle Merger</span>
          <span className={desc}>Combine multiple .srt/.vtt files</span>
        </a>

        <a
          className={cardBase}
          href="/subtitle-splitter"
          aria-label="Open Subtitle Splitter"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M4 4h16v4H4zM4 10h7v4H4zM13 10h7v4h-7zM4 16h16v4H4z" />
            </svg>
          </span>
          <span className={title}>Subtitle Splitter</span>
          <span className={desc}>Split long subs into parts</span>
        </a>

        <a
          className={cardBase}
          href="/subtitle-overlap-fixer"
          aria-label="Open Subtitle Overlap Fixer"
        >
          <span className={ico} aria-hidden>
            <svg className={icoSvg} viewBox="0 0 24 24" role="img">
              <path d="M5 5h8v8H5zM11 11h8v8h-8z" />
            </svg>
          </span>
          <span className={title}>Subtitle Overlap Fixer</span>
          <span className={desc}>Detect & fix overlapping cues</span>
        </a>
      </nav>
    </section>
  );
}

function FaqAccordion() {
  const itemTitle =
    "flex w-full cursor-pointer list-none items-center justify-between gap-3 border-b border-gray-200 px-1 py-4 text-left font-medium text-[#1e293b] [&::-webkit-details-marker]:hidden";
  const body = "pb-4 pl-1 text-[#334155] leading-relaxed";

  const rows = [
    {
      id: "e-n-accordion-item-1190",
      open: true,
      q: " What is SubtitlesEdit.com? ",
      children: (
        <p>
          SubtitlesEdit.com is a free collection of fast, browser-based subtitle
          tools that let you convert, edit, merge, split, fix, and adjust
          subtitle timing instantly without installing any software.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1191",
      q: " Do I need to upload my subtitle files to use the tools? ",
      children: (
        <p>
          No. All tools run entirely inside your browser using JavaScript. Your
          SRT or VTT files never leave your device, ensuring full privacy and
          security.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1192",
      q: " Which subtitle formats do your tools support? ",
      children: (
        <p>
          Currently, SubtitlesEdit.com supports SRT (SubRip) and VTT (WebVTT) —
          the two most widely used subtitle formats for YouTube, HTML5 video
          players, e-learning platforms, and editing software.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1193",
      q: " Is the SRT to VTT Converter free to use? ",
      children: (
        <p>
          Yes. Every tool on SubtitlesEdit.com — including the SRT to VTT
          Converter — is 100% free and requires no sign-up, no credit card, and
          no file uploads.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1194",
      q: " Can I convert VTT back to SRT? ",
      children: (
        <>
          <p>
            Absolutely. Use the VTT to SRT Converter for fast and accurate
            conversions in both directions.
          </p>
          <hr className="my-4 border-gray-200" />
          <p> </p>
        </>
      ),
    },
    {
      id: "e-n-accordion-item-1195",
      q: " What if my subtitles are out of sync? ",
      children: (
        <p>
          Use the Subtitle Time Shifter tool to delay or advance all subtitle
          timestamps by any number of seconds — including decimals for precise
          synchronization.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1196",
      q: " Can I merge two or more subtitle files? ",
      children: (
        <p>
          Yes. The Subtitle Merger lets you combine multiple SRT or VTT files
          into one, preserving cue order and syncing timestamps correctly.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1197",
      q: " How can I split a large subtitle file? ",
      children: (
        <p>
          The Subtitle Splitter allows you to break large SRT or VTT files into
          smaller parts based on cue count or time duration.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1198",
      q: " What if my subtitles have overlapping timestamps? ",
      children: (
        <p>
          The Overlap Fixer tool automatically detects overlaps and adjusts
          timings to ensure subtitles display correctly during playback.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-1199",
      q: " Does SubtitlesEdit.com work on all devices? ",
      children: (
        <p>
          Yes. All tools work on desktop, laptop, tablets, and mobile browsers —
          including Chrome, Safari, Firefox, Edge, and Opera.
        </p>
      ),
    },
    {
      id: "e-n-accordion-item-11910",
      q: " Are there any usage limits or restrictions? ",
      children: (
        <p>
          No limits. You can convert, edit, merge, split, or fix as many subtitle
          files as you want, anytime, completely free.
        </p>
      ),
    },
  ];

  return (
    <div className="divide-y divide-gray-100" aria-label="Accordion. Open links with Enter or Space, close with Escape, and navigate with Arrow Keys">
      {rows.map((row) => (
        <details key={row.id} id={row.id} className="group" open={row.open}>
          <summary className={itemTitle}>
            <span>{row.q}</span>
            <span className="shrink-0 text-[#046bd2]">
              <span className="hidden group-open:inline">−</span>
              <span className="inline group-open:hidden">+</span>
            </span>
          </summary>
          <div className={body}>{row.children}</div>
        </details>
      ))}
    </div>
  );
}

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "SubtitlesEdit.com Tools",
  itemListElement: [
    {
      "@type": "SiteNavigationElement",
      name: "SRT to VTT Converter",
      url: "/srt-to-vtt-converter",
    },
    {
      "@type": "SiteNavigationElement",
      name: "VTT to SRT Converter",
      url: "/vtt-to-srt-converter",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Subtitle Time Shifter",
      url: "/subtitle-time-shifter",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Subtitle Merger",
      url: "/subtitle-merger",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Subtitle Splitter",
      url: "/subtitle-splitter",
    },
    {
      "@type": "SiteNavigationElement",
      name: "Subtitle Overlap Fixer",
      url: "/subtitle-overlap-fixer",
    },
  ],
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>
          Free Subtitle Edit Tools for SRT &amp; WebVTT Conversion
        </title>
        <meta
          name="description"
          content="All tools run 100% in your browser. No uploads. No tracking."
        />
        <link rel="canonical" href="https://subtitlesedit.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdItemList),
          }}
        />
      </Head>

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article
            className="ast-article-single"
            id="post-48"
            itemScope
            itemType="https://schema.org/CreativeWork"
          >
            <header className="entry-header px-4 pb-2 pt-10 text-left sm:px-6 lg:px-[3rem]">
              <h1
                className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-4xl"
                itemProp="headline"
              >
                Free Subtitle Edit Tools for SRT &amp; WebVTT Conversion,
                Editing, and Fixing
              </h1>
            </header>

            <div className="entry-content clear px-0" itemProp="text">
              <HubGrid />

              <div className={section}>
                <h2 className={h2}>
                  Convert, Edit, and Fix Subtitles Instantly — 100% Private,
                  Fast, and Works Offline
                </h2>
              </div>

              <div className={section}>
                <p className={p}>
                  Welcome to <strong>Subtitles Edit</strong>, your one-stop suite
                  of <strong>online subtitle tools</strong> designed for
                  creators, translators, and editors who want total control of
                  their captions.
                  <br />
                  Whether you need to <strong>convert SRT to VTT</strong>,{" "}
                  <strong>fix subtitle timing</strong>, or{" "}
                  <strong>merge multiple subtitle files</strong>, every tool here
                  works directly inside your browser — with{" "}
                  <strong>
                    no uploads, no logins, and complete privacy
                  </strong>
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> provide essential
                  features that streamline the editing process for creators.
                </p>
              </div>

              <div className={section}>
                <div className="mb-8 overflow-hidden rounded-lg">
                  <Image
                    src={HERO_IMG}
                    alt="A person using subtitle edit tools to edit subtitles"
                    width={1024}
                    height={578}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
                <h2 className={h2}>
                  Convert SRT to VTT or WebVTT Instantly
                </h2>
                <p className={p}>
                  <span className="text-base text-black">
                    Our most popular utility is the{" "}
                  </span>
                  <strong className="text-black">SRT to VTT Converter</strong>
                  <span className="text-base text-black">
                    , which lets you{" "}
                  </span>
                  <strong className="text-black">convert SRT to WebVTT</strong>
                  <span className="text-base text-black">
                    {" "}
                    format in seconds.
                  </span>
                  <br />
                  <span className="text-base text-black">
                    Many modern players and platforms — including YouTube,
                    Vimeo, and HTML5 — use the{" "}
                  </span>
                  <code className={`${code} text-black`}>.vtt</code>
                  <span className="text-base text-black">
                    {" "}
                    (WebVTT) format for captions.
                  </span>
                  <br />
                  <span className="text-base text-black">
                    This tool makes it simple to{" "}
                  </span>
                  <strong className="text-black">
                    convert SRT to VTT online
                  </strong>
                  <span className="text-base text-black">, or even </span>
                  <strong className="text-black">convert SRT to WebVTT</strong>
                  <span className="text-base text-black">
                    {" "}
                    with perfect accuracy and no software downloads.
                  </span>
                  <br />
                </p>
                <p className={p}>
                  The <strong>Subtitle Edit Tools</strong> allow for seamless
                  integration with your video projects.
                </p>
              </div>

              <div className={section}>
                <h3 className={h3}>Why Use Our SRT to VTT Converter?</h3>
                <ul className={ul}>
                  <li>
                    <ul className="mb-4 list-disc pl-5 space-y-2">
                      <li>
                        <p className="mb-0 text-[#334155]">
                          <strong>Instant results:</strong> paste or upload your{" "}
                          <code className={code}>.srt</code> file and get{" "}
                          <code className={code}>.vtt</code> in one click
                        </p>
                      </li>
                      <li>
                        <p className="mb-0 text-[#334155]">
                          <strong>Fully private:</strong> everything runs in
                          your browser — nothing uploaded
                        </p>
                      </li>
                      <li>
                        <p className="mb-0 text-[#334155]">
                          <strong>Accurate conversion:</strong> maintains
                          original timestamps and cue order
                        </p>
                      </li>
                      <li>
                        <p className="mb-0 text-[#334155]">
                          <strong>Supports WebVTT syntax:</strong> compatible
                          with all HTML5 video players
                        </p>
                      </li>
                    </ul>
                    <p className="mb-4 text-[#334155]">
                      So whether you need an{" "}
                      <strong>SRT to WebVTT converter</strong> for your site or
                      just want to <strong>convert SRT to VTT</strong> quickly,
                      this free browser-based tool gets it done safely.
                    </p>
                    <p className="mb-4 text-[#334155]"> </p>
                  </li>
                </ul>
              </div>

              <div className={section}>
                <h2 className={h2}>
                  Convert VTT to SRT Offline — No Uploads Required
                </h2>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> are designed to make
                  the editing experience as efficient as possible.
                </p>
                <h3 className={h3}>
                  Essential Subtitle Edit Tools for Every Creator
                </h3>
                <p className={p}>
                  If you’re looking to reverse the process, the{" "}
                  <strong>VTT to SRT Converter</strong> does exactly that.
                  <br />
                  It lets you <strong>convert VTT to SRT offline</strong>,
                  directly inside your browser window.
                  <br />
                  Because Subtitles Edit runs fully on client-side code, you can
                  even disconnect from the internet after the page loads — and
                  keep <strong>converting VTT to SRT</strong> securely.
                </p>
                <h3 className={h3}>
                  Benefits of Converting VTT to SRT{"\u200b"}
                </h3>
                <ul className={ul}>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      No file transfer — 100% private
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Ideal for editors who prefer the SRT format
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Works for WebVTT subtitles from YouTube, Vimeo, and more
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Perfect for translating, syncing, or merging caption files
                    </p>
                  </li>
                </ul>
                <p className={p}>
                  Whether you’re <strong>converting VTT to SRT</strong> for
                  editing in software like Premiere Pro, or using it as part of a
                  localization workflow, Subtitles Edit handles it flawlessly.
                </p>
                <p className={p}>
                  Using our <strong>Subtitle Edit Tools</strong>, you will
                  experience fast and accurate subtitle conversions.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Powerful Subtitle Utilities in One Place</h2>
                <p className={p}>
                  Each tool is fast, lightweight, and built for professionals
                  who need reliability.
                </p>
                <h3 className={h3}>Subtitle Time Shifter</h3>
                <p className={p}>
                  Easily adjust subtitle timing — shift timestamps forward or
                  backward to fix synchronization issues caused by frame-rate
                  differences.
                </p>
                <p className={p}>
                  With these <strong>Subtitle Edit Tools</strong>, timing
                  adjustments can be made effortlessly.
                </p>
                <h3 className={h3}>Subtitle Merger</h3>
                <p className={p}>
                  Combine multiple subtitle files into a single timeline. Ideal
                  for merging translated scripts or episodic content.
                </p>
                <h3 className={h3}>Subtitle Splitter</h3>
                <p className={p}>
                  Split large <code className={code}>.srt</code> or{" "}
                  <code className={code}>.vtt</code> files into smaller chunks by
                  line count or duration — perfect for breaking long movies into
                  manageable parts.
                </p>
                <h3 className={h3}>Subtitle Overlap Fixer</h3>
                <p className={p}>
                  The <strong>Subtitle Edit Tools</strong> help detect issues
                  that commonly arise in subtitle files.
                </p>
                <p className={p}>
                  Detect and fix overlapping cues automatically for smoother
                  playback and better readability.
                </p>
                <p className={p}>
                  All of these tools support both <code className={code}>.srt</code>{" "}
                  and <code className={code}>.vtt</code> formats, giving you
                  complete flexibility.
                </p>
                <p className={p}> </p>
              </div>

              <div className={section}>
                <h2 className={h2}>How Subtitles Edit Works</h2>
                <p className={p}>
                  Subtitles Edit uses advanced{" "}
                  <strong>JavaScript parsing and timestamp conversion</strong>{" "}
                  logic to process your subtitle files directly in the browser.
                  <br />
                  There are <strong>no backend servers</strong> — your data never
                  leaves your computer.
                </p>
                <p className={p}>
                  When you <strong>convert SRT to VTT</strong> or{" "}
                  <strong>convert SRT to WebVTT</strong>, the system:
                </p>
                <ol className={ol}>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Reads your file with the <strong>FileReader API</strong>
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Parses timestamps (
                      <code className={code}>00:01:02,000</code> →{" "}
                      <code className={code}>00:01:02.000</code>)
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Preserves cue numbering and line spacing
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      Outputs a perfectly formatted <code className={code}>.vtt</code>{" "}
                      file ready for use
                    </p>
                  </li>
                </ol>
                <p className={p}>
                  Similarly, when <strong>converting VTT to SRT</strong>, it
                  reverses the process — switching dots to commas and cleaning up
                  the headers automatically.
                </p>
                <p className={p}>
                  This is why both <strong>SRT to VTT conversion</strong> and{" "}
                  <strong>VTT to SRT conversion</strong> happen instantly and
                  privately.
                </p>
                <p className={p}> </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Supported Formats</h2>
                <p className={p}>
                  We support a wide range of formats with our{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full min-w-[280px] border-collapse border border-gray-200 text-left text-sm text-[#334155]">
                    <thead>
                      <tr className="bg-[#F0F5FA]">
                        <th className="border border-gray-200 px-3 py-2 font-semibold text-[#1e293b]">
                          Format
                        </th>
                        <th className="border border-gray-200 px-3 py-2 font-semibold text-[#1e293b]">
                          Example Timestamp
                        </th>
                        <th className="border border-gray-200 px-3 py-2 font-semibold text-[#1e293b]">
                          Common Use
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-3 py-2">
                          <strong>SRT (SubRip)</strong>
                        </td>
                        <td className="border border-gray-200 px-3 py-2">
                          <code className={code}>
                            00:01:05,230 --&gt; 00:01:09,450
                          </code>
                        </td>
                        <td className="border border-gray-200 px-3 py-2">
                          Used by editors &amp; translators
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-3 py-2">
                          <strong>VTT (WebVTT)</strong>
                        </td>
                        <td className="border border-gray-200 px-3 py-2">
                          <code className={code}>WEBVTT</code> header +{" "}
                          <code className={code}>
                            00:01:05.230 --&gt; 00:01:09.450
                          </code>
                        </td>
                        <td className="border border-gray-200 px-3 py-2">
                          Used by browsers &amp; streaming platforms
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className={p}>
                  Subtitles Edit handles both formats seamlessly, making it the
                  best place to <strong>convert SRT to WebVTT</strong> and{" "}
                  <strong>convert VTT to SRT offline</strong>.{" "}
                </p>
                <p className={p}>
                  Experience the difference with our advanced{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> can help bring your
                  creative vision to life.
                </p>
                <p className={p}>
                  Let our <strong>Subtitle Edit Tools</strong> transform your
                  projects today.
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> are perfect for various
                  editing scenarios.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>Why Choose Subtitles Edit?</h2>
                <ul className={ul}>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <strong>Browser-based</strong> — no installation needed
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <strong>Offline capable</strong> — once loaded, works
                      without internet
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <strong>Privacy-first</strong> — no uploads or tracking
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <strong>Fast conversions</strong> — optimized JavaScript
                      engine
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <strong>Free forever</strong> — no watermarks or signups
                    </p>
                  </li>
                </ul>
                <p className={p}>
                  Our goal is to give creators the fastest and safest way to{" "}
                  <strong>convert subtitles</strong>,{" "}
                  <strong>fix sync issues</strong>, and{" "}
                  <strong>manage caption files</strong> with total confidence.
                </p>
                <p className={p}>
                  Every user benefits from utilizing our comprehensive{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> guarantee privacy and
                  speed with every use.
                </p>
                <p className={p}>
                  Join our community and discover the benefits of using our{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> offer the best solutions
                  for your editing tasks.
                </p>
                <p className={p}>
                  Transform your workflow with our innovative{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>About Subtitles Edit</h2>
                <p className={p}>
                  Count on our <strong>Subtitle Edit Tools</strong> for reliable
                  performance on every project.
                </p>
                <p className={p}>
                  Check out the reviews of our effective{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  Experience excellence with our feature-rich{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  <strong>SubtitlesEdit.com</strong> is a lightweight subtitle
                  toolkit built for simplicity, speed, and privacy.
                  <br />
                  Our tools are trusted by <strong>YouTube creators</strong>,{" "}
                  <strong>translators</strong>, and{" "}
                  <strong>post-production professionals</strong> worldwide who
                  need to <strong>convert SRT to WebVTT</strong> or{" "}
                  <strong>convert VTT to SRT offline</strong> without compromising
                  security.
                </p>
                <p className={p}>
                  Everything runs in your browser — safe, fast, and free.
                  <br />
                  No uploads. No installations. Just seamless subtitle editing.
                </p>
                <p className={p}>
                  The <strong>Subtitle Edit Tools</strong> are continuously
                  improved based on user feedback.
                </p>
                <p className={p}>
                  Join thousands who trust our <strong>Subtitle Edit Tools</strong>{" "}
                  to get the job done.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>
                  <br />
                  Related Subtitle Tools
                </h2>
                <p className={p}>
                  Each feature of our <strong>Subtitle Edit Tools</strong> is
                  designed to be intuitive.
                </p>
                <p className={p}>
                  Consider our <strong>Subtitle Edit Tools</strong> for all your
                  subtitle needs.
                </p>
                <p className={p}>
                  Utilize our <strong>Subtitle Edit Tools</strong> to elevate your
                  work.
                </p>
                <ul className={`${ul} entry-content`}>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/srt-to-vtt-converter"
                        rel="noopener"
                      >
                        SRT → VTT Converter
                      </a>{" "}
                      — Convert SRT to WebVTT in seconds
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/vtt-to-srt-converter"
                        rel="noopener"
                      >
                        VTT → SRT Converter
                      </a>{" "}
                      — Convert WebVTT to SRT offline
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/subtitle-time-shifter"
                        rel="noopener"
                      >
                        Subtitle Time Shifter
                      </a>{" "}
                      — Fix delayed subtitles
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/subtitle-merger"
                        rel="noopener"
                      >
                        Subtitle Merger
                      </a>{" "}
                      — Combine multiple files
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/subtitle-splitter"
                        rel="noopener"
                      >
                        Subtitle Splitter
                      </a>{" "}
                      — Break long subtitles into smaller files
                    </p>
                  </li>
                  <li>
                    <p className="mb-0 text-[#334155]">
                      <a
                        className="decorated-link text-[#046bd2]"
                        href="/subtitle-overlap-fixer"
                        rel="noopener"
                      >
                        Subtitle Overlap Fixer
                      </a>{" "}
                      — Remove overlapping timestamps
                    </p>
                  </li>
                </ul>
                <p className={p}>
                  Explore our range of <strong>Subtitle Edit Tools</strong> to
                  enhance your video content.
                </p>
                <p className={p}>
                  Our <strong>Subtitle Edit Tools</strong> are perfect for both
                  beginners and professionals alike.
                </p>
                <p className={p}>
                  Embrace the power of our innovative{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
                <p className={p}>
                  With our <strong>Subtitle Edit Tools</strong>, you will never
                  look back.
                </p>
                <p className={p}>
                  The future of editing is here with our{" "}
                  <strong>Subtitle Edit Tools</strong>.
                </p>
              </div>

              <div className={section}>
                <h2 className={h2}>
                  Frequently Asked Questions (FAQs)
                </h2>
                <FaqAccordion />
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

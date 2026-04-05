"use client";

import { useState } from "react";
import Image from "next/image";

const LOGO_SRC =
  "https://subtitlesedit.com/wp-content/uploads/2025/11/Untitled-design-150x150.webp";
const LOGO_ALT =
  "Subtitles Edit logo featuring a cyan speech-bubble icon and bold black text on a white background, representing an online subtitle editing toolkit";

const toolsLinks = [
  {
    href: "/srt-to-vtt-converter",
    label: "SRT to VTT Converter",
  },
  {
    href: "/vtt-to-srt-converter",
    label: "VTT to SRT Converter",
  },
  {
    href: "/subtitle-time-shifter",
    label: "Subtitle Time Shifter",
  },
  {
    href: "/subtitle-merger",
    label: "Subtitle Merger",
  },
  {
    href: "/subtitle-splitter",
    label: "Subtitle Splitter",
  },
  {
    href: "/subtitle-overlap-fixer",
    label: "Subtitle Overlap Fixer",
  },
];

function ChevronDown({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 13h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 7h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1zM3 19h18c0.552 0 1-0.448 1-1s-0.448-1-1-1h-18c-0.552 0-1 0.448-1 1s0.448 1 1 1z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z" />
    </svg>
  );
}

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white" id="page">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:shadow focus:outline focus:outline-2 focus:outline-[#046bd2]"
        href="#content"
        title="Skip to content"
      >
        Skip to content
      </a>

      <header
        className="sticky top-0 z-50 border-b border-gray-200 bg-white"
        id="masthead"
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3 md:px-6 lg:px-8">
          <div className="flex shrink-0 items-center">
            <a
              href="/"
              className="inline-flex max-h-[120px] items-center"
              rel="home"
            >
              <Image
                src={LOGO_SRC}
                alt={LOGO_ALT}
                width={150}
                height={150}
                className="h-auto max-h-[120px] w-[150px] max-w-full object-contain"
                priority
              />
            </a>
          </div>

          <nav
            className="hidden items-center gap-6 lg:flex"
            aria-label="Primary Site Navigation"
          >
            <a
              href="/"
              className="whitespace-nowrap text-[#334155] transition-colors hover:text-[#0ea5e9]"
              aria-current="page"
            >
              Home
            </a>
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <a
                href="#"
                className="inline-flex items-center gap-1 whitespace-nowrap text-[#334155] transition-colors hover:text-[#0ea5e9]"
                aria-expanded={toolsOpen}
                aria-haspopup="true"
                onClick={(e) => {
                  e.preventDefault();
                  setToolsOpen((o) => !o);
                }}
              >
                Tools
                <ChevronDown className="opacity-70" />
              </a>
              <div
                className={`absolute left-0 top-full z-50 min-w-[240px] pt-2 ${toolsOpen ? "block" : "hidden"}`}
              >
                <ul className="rounded-[10px] border-t-2 border-[#046bd2] bg-white py-2 shadow-lg ring-1 ring-black/5">
                  {toolsLinks.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-[#334155] transition-colors hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href="/blog"
              className="whitespace-nowrap text-[#334155] transition-colors hover:text-[#0ea5e9]"
            >
              Blog
            </a>
            <a
              href="/contact-us"
              className="whitespace-nowrap text-[#334155] transition-colors hover:text-[#0ea5e9]"
            >
              Contact Us
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 text-[#046bd2] lg:hidden"
            aria-expanded={mobileOpen}
            aria-label="Main menu toggle"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">Main Menu</span>
            <span className={mobileOpen ? "hidden" : "block"}>
              <MenuIcon />
            </span>
            <span className={mobileOpen ? "block" : "hidden"}>
              <CloseIcon />
            </span>
          </button>
        </div>

        <div
          className={`border-t border-gray-100 bg-white lg:hidden ${mobileOpen ? "block" : "hidden"}`}
        >
          <nav
            className="mx-auto max-w-[1240px] px-5 py-4"
            aria-label="Site Navigation"
          >
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  href="/blog"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  aria-current="page"
                  onClick={() => setMobileOpen(false)}
                >
                  Free Subtitle Edit Tools for SRT &amp; WebVTT Conversion,
                  Editing, and Fixing
                </a>
              </li>
              <li>
                <a
                  href="/srt-to-vtt-converter"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  SRT to VTT Converter – Free Online Tool to Convert SRT to
                  WebVTT Files
                </a>
              </li>
              <li>
                <a
                  href="/subtitle-merger"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Subtitle Merger to Merge Subtitles Instantly (SRT &amp; VTT)
                </a>
              </li>
              <li>
                <a
                  href="/subtitle-overlap-fixer"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Subtitle Overlap Fixer to Remove Overlapping Subtitles
                  Instantly (SRT &amp; VTT)
                </a>
              </li>
              <li>
                <a
                  href="/subtitle-splitter"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Subtitle Splitter to Split Subtitles Instantly (SRT &amp; VTT)
                </a>
              </li>
              <li>
                <a
                  href="/subtitle-time-shifter"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  Subtitle Time Shifter to Synchronize Subtitles Instantly (SRT
                  &amp; VTT)
                </a>
              </li>
              <li>
                <a
                  href="/vtt-to-srt-converter"
                  className="block rounded px-3 py-2 text-[#334155] hover:bg-[#F0F5FA] hover:text-[#045cb4]"
                  onClick={() => setMobileOpen(false)}
                >
                  VTT to SRT Converter (Free WebVTT to SRT Conversion Tool)
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div id="content" className="flex-1">
        {children}
      </div>

      <footer
        className="site-footer border-t border-gray-200 bg-white"
        id="colophon"
      />
    </div>
  );
}

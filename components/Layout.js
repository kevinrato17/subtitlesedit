"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const LOGO_SRC = "/logo.png";
const LOGO_ALT = "Subtitles Edit logo";

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
    href: "/sbv-to-srt-converter",
    label: "SBV to SRT Converter",
  },
  {
    href: "/srt-to-sbv-converter",
    label: "SRT to SBV Converter",
  },
  {
    href: "/srt-to-txt-converter",
    label: "SRT to TXT Converter",
  },
  {
    href: "/vtt-to-txt-converter",
    label: "VTT to TXT Converter",
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
  {
    href: "/subtitle-encoding-fixer",
    label: "Subtitle Encoding Fixer",
  },
  {
    href: "/subtitle-find-replace",
    label: "Subtitle Find & Replace",
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
  const router = useRouter();
  const pathname = router.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsExpanded, setMobileToolsExpanded] = useState(false);

  const toolSectionActive = toolsLinks.some((t) => t.href === pathname);

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
              className="inline-flex max-h-[120px] items-center gap-2"
              rel="home"
            >
              <Image
                src={LOGO_SRC}
                alt={LOGO_ALT}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="text-lg font-bold text-[#1e293b]">
                Subtitles Edit
              </span>
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
            onClick={() => {
              setMobileOpen((prev) => {
                const next = !prev;
                if (!next) setMobileToolsExpanded(false);
                return next;
              });
            }}
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
            <ul className="flex flex-col divide-y divide-gray-100">
              <li className="py-1">
                <a
                  href="/"
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-3 text-lg font-medium transition-colors ${
                    pathname === "/"
                      ? "bg-sky-50 text-[#0ea5e9]"
                      : "text-[#334155] hover:bg-[#F0F5FA] hover:text-[#0ea5e9]"
                  }`}
                  aria-current={pathname === "/" ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </a>
              </li>
              <li className="py-1">
                <button
                  type="button"
                  id="mobile-tools-trigger"
                  className={`flex min-h-[44px] w-full items-center justify-between rounded-lg px-3 py-3 text-left text-lg font-medium transition-colors ${
                    toolSectionActive
                      ? "bg-sky-50 text-[#0ea5e9]"
                      : "text-[#334155] hover:bg-[#F0F5FA] hover:text-[#0ea5e9]"
                  }`}
                  aria-expanded={mobileToolsExpanded}
                  aria-controls="mobile-tools-submenu"
                  onClick={() => setMobileToolsExpanded((o) => !o)}
                >
                  Tools
                  <span
                    className={`inline-block text-[#0ea5e9] transition-transform duration-200 ease-out ${
                      mobileToolsExpanded ? "rotate-180" : "rotate-0"
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                <div
                  id="mobile-tools-submenu"
                  role="region"
                  aria-labelledby="mobile-tools-trigger"
                  className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                    mobileToolsExpanded ? "max-h-[560px]" : "max-h-0"
                  }`}
                >
                  <ul className="flex flex-col gap-1 pb-3 pl-5 pt-1">
                    {toolsLinks.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className={`flex min-h-[44px] items-center rounded-lg px-3 py-2.5 text-sm transition-colors ${
                              active
                                ? "bg-sky-50 font-medium text-[#0ea5e9]"
                                : "text-[#475569] hover:bg-[#F0F5FA] hover:text-[#0ea5e9]"
                            }`}
                            aria-current={active ? "page" : undefined}
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li className="py-1">
                <a
                  href="/blog"
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-3 text-lg font-medium transition-colors ${
                    pathname === "/blog"
                      ? "bg-sky-50 text-[#0ea5e9]"
                      : "text-[#334155] hover:bg-[#F0F5FA] hover:text-[#0ea5e9]"
                  }`}
                  aria-current={pathname === "/blog" ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  Blog
                </a>
              </li>
              <li className="py-1">
                <a
                  href="/contact-us"
                  className={`flex min-h-[44px] items-center rounded-lg px-3 py-3 text-lg font-medium transition-colors ${
                    pathname === "/contact-us"
                      ? "bg-sky-50 text-[#0ea5e9]"
                      : "text-[#334155] hover:bg-[#F0F5FA] hover:text-[#0ea5e9]"
                  }`}
                  aria-current={
                    pathname === "/contact-us" ? "page" : undefined
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  Contact Us
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

"use client";

import Head from "next/head";
import { useState } from "react";
import Layout from "@/components/Layout";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = "d9e53600-fd6e-4aa0-936b-32d5962d7aa5";

const btnClass =
  "inline-flex w-full items-center justify-center rounded-[10px] bg-[#0ea5e9] px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#0284c7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0ea5e9] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

const inputClass =
  "w-full rounded-[10px] border border-gray-300 bg-white px-3 py-2.5 text-[#334155] shadow-sm placeholder:text-gray-400 focus:border-[#0ea5e9] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]/25";

const labelClass = "mb-1.5 block text-sm font-medium text-[#111827]";

export default function ContactUsPage() {
  const [status, setStatus] = useState("idle");
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorText("");
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("idle");
        setErrorText(
          data.message || "Something went wrong. Please try again later.",
        );
      }
    } catch {
      setStatus("idle");
      setErrorText("Network error. Please check your connection and try again.");
    }
  }

  return (
    <Layout>
      <Head>
        <title>Contact Us – Subtitles Edit</title>
        <meta
          name="description"
          content="Get in touch with Subtitles Edit. Send us a message and we will respond as soon as we can."
        />
        <link rel="canonical" href="https://subtitlesedit.com/contact-us/" />
      </Head>

      <div className="mx-auto max-w-[1240px] bg-white">
        <main id="main" className="site-main">
          <article className="ast-article-single px-4 pb-16 pt-10 sm:px-6 lg:px-[3rem]">
            <header className="mx-auto max-w-lg text-center">
              <h1 className="text-3xl font-semibold leading-tight text-[#1e293b] md:text-[2rem]">
                Contact Us
              </h1>
              <p className="mt-3 text-[#334155] leading-relaxed">
                Have a question or feedback? Fill out the form below and we will
                get back to you.
              </p>
            </header>

            <div className="mx-auto mt-10 max-w-lg">
              {status === "success" ? (
                <div
                  className="rounded-[10px] border border-emerald-200 bg-emerald-50 px-4 py-5 text-center text-[#065f46]"
                  role="status"
                >
                  <p className="text-base font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                  <p className="mt-2 text-sm text-emerald-800/90">
                    We will reply as soon as we can.
                  </p>
                  <button
                    type="button"
                    className={`${btnClass} mt-6`}
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  action={WEB3FORMS_URL}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5 rounded-[14px] border border-gray-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,.06)] sm:p-8"
                >
                  <input type="hidden" name="access_key" value={ACCESS_KEY} />

                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      className={`${inputClass} min-h-[140px] resize-y font-[system-ui,sans-serif]`}
                      placeholder="How can we help?"
                    />
                  </div>

                  {errorText ? (
                    <p
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                      role="alert"
                    >
                      {errorText}
                    </p>
                  ) : null}

                  <div className="flex justify-center pt-1">
                    <button
                      type="submit"
                      className={btnClass}
                      disabled={status === "submitting"}
                    >
                      {status === "submitting" ? "Sending…" : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
}

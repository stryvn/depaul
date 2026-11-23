"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import "./tc.css";

const TC_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyEYcq_8pN-In_BKIqZf9_1dPf3BJ0lDsxI4OpwRg6CsEm1tmnpifMp3fYaAM8KCvvk/exec";

export function TcPortalClient() {
  return (
    <div className="tc-page selection:bg-brand-royal selection:text-white">
      {/* Existing reusable site navbar */}
      <TopNavbar isMerged={true} />

      <main id="main" tabIndex={-1}>
        <div className="wrap tc-layout">
          <div className="tc-intro">
            <section className="tc-title" aria-labelledby="tc-title">
              <div className="tc-title-copy">
                <svg
                  className="tc-document"
                  width="34"
                  height="34"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 27H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l6 6v5M18 3v6h6M10 13h8M10 17h5" />
                  <circle cx="22" cy="21" r="4" />
                  <path d="m19 24-1 5 4-2 4 2-1-5" />
                </svg>
                <h1 id="tc-title">
                  Transfer<br />certificate
                </h1>
                <p className="lede">
                  Check a transfer certificate issued by De Paul Public School &amp; Junior College.
                </p>
              </div>
              <Image
                className="tc-photo"
                src="/assets/campus.webp"
                width={1280}
                height={720}
                priority
                alt="De Paul school campus in Rajamudy"
              />
            </section>
            <aside className="tc-help" aria-labelledby="tc-help-title">
              <h2 id="tc-help-title">Need help with a TC?</h2>
              <p>For a copy, a correction, or help locating a record, contact the school office.</p>
              <Link href="/#contact">Contact the school office</Link>
            </aside>
          </div>
          <section className="tc-verification" aria-label="Verify a transfer certificate">
            <iframe
              className="tc-frame"
              src={TC_SCRIPT_URL}
              title="De Paul transfer certificate verification form"
              referrerPolicy="no-referrer"
            />
            <div className="tc-fallback">
              <a
                href={TC_SCRIPT_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open verification in a new tab
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Existing reusable site footer */}
      <Footer />
    </div>
  );
}

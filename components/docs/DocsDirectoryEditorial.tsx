"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Layers } from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import type { Document } from "@/db/schema";
import "./editorial-docs.css";

interface DocsDirectoryEditorialProps {
  documents: Document[];
}

const SLUG_ALIASES: Record<string, string> = {
  "cbse-mandatory-public-disclosure": "disclosure",
  "academic-calendar-examination-schedule-2026-27": "calendar",
  "cbse-affiliation-extension-letter-2026-2031": "affiliation",
  "teaching-staff-registry-qualifications": "teachers",
  "fire-safety-certificate-noc": "fire-safety",
  "pta-executive-committee-2026-27": "pta",
};

export function DocsDirectoryEditorial({ documents }: DocsDirectoryEditorialProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Handle hash scrolling if navigating with anchor
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Compute category pills
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: documents.length };
    for (const doc of documents) {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    }
    return Object.keys(counts).map((cat) => ({
      name: cat,
      count: counts[cat],
    }));
  }, [documents]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === "All" || doc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchQuery]);

  return (
    <div className="editorial-page min-h-screen flex flex-col bg-[#f8fafc] text-[#0b1b3d]">
      {/* Top Navbar */}
      <TopNavbar isMerged={true} />

      <main id="main" tabIndex={-1} className="pt-[100px] flex-1">
        {/* Editorial Hero Section */}
        <section className="hero ed-wrap ed-hero" aria-labelledby="ed-title">
          <div className="hero-copy">
            <p className="label">Rajamudy, Idukki</p>
            <h1 id="ed-title">
              School<br /> <span>documents</span>
            </h1>
            <p className="lede">
              View or download official school documents and CBSE disclosures.
            </p>
          </div>
          <figure className="hero-photo">
            <Image
              src="/assets/campus.webp"
              alt="The De Paul campus in Rajamudy"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 850px) 100vw, 800px"
            />
          </figure>
        </section>

        {/* Editorial Body: Document Library */}
        <section className="ed-wrap ed-section ed-body" aria-labelledby="documents-list">
          <div className="ed-head">
            <h2 id="documents-list">Document library</h2>
            <Link className="ed-text-link" href="/#docs">
              Verify a transfer certificate
            </Link>
          </div>

          {/* Quick Filter & Live Search Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="ed-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  data-active={selectedCategory === cat.name ? "true" : undefined}
                  className="ed-filter-pill"
                >
                  <span>{cat.name}</span>
                  <span className="ed-count">{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#d7e0ec] bg-white text-[#0b1b3d] placeholder:text-slate-400 focus:outline-hidden focus:border-[#173e82] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 hover:text-slate-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Document List */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#d7e0ec]">
              <p className="text-slate-500 text-sm">
                No documents found matching &quot;{searchQuery}&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-3 text-xs font-bold text-[#173e82] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <ul className="ed-file-list">
              {filteredDocuments.map((doc) => {
                const aliasId = SLUG_ALIASES[doc.slug] || doc.slug;
                const fileType = doc.fileType || "PDF";
                const fileSize = doc.fileSize || "1.0 MB";
                const downloadUrl = `/api/documents/${doc.slug}/download`;

                return (
                  <React.Fragment key={doc.id}>
                    {/* Anchor target for both full slug and short alias */}
                    {SLUG_ALIASES[doc.slug] && (
                      <span id={doc.slug} className="block -mt-24 pt-24 invisible" />
                    )}
                    <li id={aliasId} className="ed-file">
                      <div>
                        <p>
                          {doc.category} · {fileType} · {fileSize}
                        </p>
                        <h3>{doc.title}</h3>
                        <p>{doc.description}</p>
                      </div>
                      <div className="ed-file-actions">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                          <span className="ed-sr">
                            {" "}for {doc.title} (opens in a new tab)
                          </span>
                        </a>
                        <a
                          href={downloadUrl}
                          download
                        >
                          Download
                          <span className="ed-sr"> {doc.title}</span>
                        </a>
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

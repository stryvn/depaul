"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Search,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import type { Document } from "@/db/schema";
import { cn } from "@/components/ui/utils";

interface DocumentsDirectoryClientProps {
  initialDocuments: Document[];
}

export function DocumentsDirectoryClient({
  initialDocuments,
}: DocumentsDirectoryClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Distinct categories with counts
  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: initialDocuments.length };
    for (const doc of initialDocuments) {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    }
    return Object.keys(counts).map((cat) => ({
      name: cat,
      count: counts[cat],
    }));
  }, [initialDocuments]);

  // Filtered documents
  const filteredDocuments = useMemo(() => {
    return initialDocuments.filter((doc) => {
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
  }, [initialDocuments, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-royal selection:text-white">
      {/* Top Navbar */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-brand-royal/10 via-surface-offwhite to-slate-50 border-b border-slate-200/80 py-16 sm:py-20 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-brand-royal/5 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-brand-royal text-xs font-semibold uppercase tracking-wider mb-5">
                <ShieldCheck className="w-4 h-4 text-brand-royal" />
                <span>CBSE Statutory Repository • Affiliation No. 930624</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display tracking-tight leading-[1.1]">
                Institutional Documents & Public Disclosures
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
                Official documents, CBSE Appendix-IX mandatory disclosures, state government approvals, fire & building safety NOCs, fee regulations, and academic calendars published for transparency and public verification.
              </p>

              {/* Fast verification banner */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> School Code: 75543
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> Extension Valid Until: March 2031
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> 100% Verified Records
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          {/* Controls Bar: Search & Categories */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-md mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, certificate, or keyword..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Summary count */}
              <div className="text-xs text-slate-500 font-medium">
                Showing <strong className="text-slate-800">{filteredDocuments.length}</strong> of{" "}
                <strong className="text-slate-800">{initialDocuments.length}</strong> documents
              </div>
            </div>

            {/* Category filter pills */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer",
                    selectedCategory === cat.name
                      ? "bg-brand-royal text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  )}
                >
                  <span>{cat.name}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px]",
                      selectedCategory === cat.name
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    )}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-display">
                No matching documents found
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                No compliance records or documents match &quot;{searchQuery}&quot;. Try adjusting your search query or switching categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredDocuments.map((doc, idx) => {
                  const isPDF = (doc.fileType || "PDF").toUpperCase() === "PDF";
                  const downloadUrl = `/api/documents/${doc.id}/download`;

                  return (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.3) }}
                      className={cn(
                        "group bg-white rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg relative overflow-hidden",
                        doc.isFeatured
                          ? "border-brand-royal/40 ring-1 ring-brand-royal/20 hover:border-brand-royal"
                          : "border-slate-200 hover:border-brand-sky"
                      )}
                    >
                      {/* Subtle featured accent bar */}
                      {doc.isFeatured && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-royal to-brand-sky" />
                      )}

                      <div>
                        {/* Top row */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
                              isPDF
                                ? "bg-red-50 text-brand-crimson border border-red-200"
                                : "bg-blue-50 text-brand-royal border border-blue-200"
                            )}
                          >
                            {doc.fileType || "PDF"} • {doc.fileSize}
                          </span>

                          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {doc.date || "2026–27"}
                          </span>
                        </div>

                        {/* Icon & Category */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-brand-royal flex items-center justify-center group-hover:bg-brand-royal group-hover:text-white transition-all duration-300">
                            <FileText className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                            {doc.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-royal transition-colors line-clamp-2 leading-snug">
                          {doc.title}
                        </h3>

                        {/* Description */}
                        {doc.description && (
                          <p className="mt-2.5 text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                            {doc.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom action row */}
                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">
                          {doc.downloadsCount.toLocaleString()} Verified Downloads
                        </span>

                        <div className="flex items-center gap-2">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Direct PDF Preview"
                            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-royal hover:bg-blue-900 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
                          >
                            <span>Download</span>
                            <Download className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {/* Bottom compliance note */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-display font-bold text-base text-slate-900">
                Need Specific Student or Administrative Verification?
              </h4>
              <p className="text-xs text-slate-500 max-w-xl">
                For Transfer Certificate (TC) student tracking, bonafide certificates, or SARAS verification queries, contact the school administrative office directly.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/#docs"
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
              >
                Transfer Certificate (TC) Portal
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-royal text-white text-xs font-semibold hover:bg-blue-900 transition-colors shadow-2xs"
              >
                <span>Contact Office</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

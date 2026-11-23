"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

export interface DocItem {
  id: number;
  title: string;
  slug?: string;
  category: string;
  type?: string;
  fileType?: string;
  size?: string;
  fileSize?: string;
  date: string;
  description: string;
  isFeatured?: boolean;
  downloadsCount: number;
  fileUrl?: string;
  href?: string;
}

interface DocCardProps {
  doc: DocItem;
  isFeatured?: boolean;
  className?: string;
}

export function DocCard({ doc, isFeatured = false, className }: DocCardProps) {
  const fileType = doc.fileType || doc.type || "PDF";
  const fileSize = doc.fileSize || doc.size || "1.0 MB";
  const isPDF = fileType.toUpperCase() === "PDF";
  const isPortal = fileType.toUpperCase() === "PORTAL";
  const destinationUrl = doc.href || (doc.id ? `/api/documents/${doc.id}/download` : (doc.fileUrl || "#"));
  const isInternal = destinationUrl.startsWith("/");

  if (isFeatured) {
    return (
      <div
        className={cn(
          "group bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md hover:shadow-xl hover:border-brand-sky transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden",
          className
        )}
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-royal/5 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-sky/10 transition-colors" />

        <div>
          {/* Header row */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                isPDF
                  ? "bg-red-50 text-brand-crimson border border-red-200"
                  : "bg-blue-50 text-brand-royal border border-blue-200"
              )}
            >
              {fileType} • {fileSize}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Official Mandatory Disclosure
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-brand-royal/10 text-brand-royal flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-royal group-hover:text-white transition-all duration-300 shadow-sm">
            <FileText className="w-7 h-7" />
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-royal group-hover:text-blue-900 transition-colors">
            {doc.title}
          </h3>

          <p className="mt-3 text-surface-muted text-sm sm:text-base leading-relaxed">
            {doc.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" /> Updated: {doc.date}
            </span>
            <span>•</span>
            <span>{doc.downloadsCount.toLocaleString()} Verified Downloads</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Format
            </span>
            <span className="text-sm font-semibold text-surface-dark">
              Standard {fileType} Document
            </span>
          </div>

          <motion.a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-royal hover:bg-blue-900 text-white text-sm font-semibold shadow-md group/btn transition-colors cursor-pointer"
          >
            <span>Download</span>
            <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>
    );
  }

  // Smaller bento card
  return (
    <div
      className={cn(
        "group bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-sky transition-all duration-300 flex flex-col justify-between h-full relative",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider",
              isPDF
                ? "bg-red-50 text-brand-crimson border border-red-200"
                : "bg-blue-50 text-brand-royal border border-blue-200"
            )}
          >
            {fileType} • {fileSize}
          </span>
          <span className="text-[11px] font-medium text-slate-500">{doc.date}</span>
        </div>

        <div className="w-10 h-10 rounded-xl bg-slate-100 text-brand-royal flex items-center justify-center mb-3 group-hover:bg-brand-royal group-hover:text-white transition-all duration-300">
          <FileText className="w-5 h-5" />
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg text-surface-dark group-hover:text-brand-royal transition-colors line-clamp-2">
          {doc.title}
        </h3>

        <p className="mt-2 text-xs text-surface-muted line-clamp-2 leading-relaxed">
          {doc.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">{doc.category}</span>
        {isInternal ? (
          <Link
            href={destinationUrl}
            className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-royal group-hover:text-white flex items-center justify-center text-slate-700 transition-colors shadow-sm cursor-pointer hover:scale-110 active:scale-95"
            title={isPortal ? "Open TC Verification Portal" : `View ${doc.title}`}
          >
            {isPortal ? (
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            ) : (
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            )}
          </Link>
        ) : (
          <motion.a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-crimson group-hover:text-white flex items-center justify-center text-slate-700 transition-colors shadow-sm cursor-pointer"
            title={`Download ${doc.title}`}
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </motion.a>
        )}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { DocCard, DocItem } from "./DocCard";

export const DOCS_DATA: DocItem[] = [
  {
    id: 1,
    title: "CBSE Mandatory Public Disclosure 2026-27",
    category: "Statutory",
    type: "PDF",
    size: "2.4 MB",
    date: "November 2026",
    description:
      "Complete statutory compliance dossier including affiliation status, building safety certificates, fire NOC, water testing certificates, PTA list, and staff strength breakdown.",
    downloadsCount: 1420,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Academic Calendar & Examination Schedule",
    category: "Academics",
    type: "PDF",
    size: "1.2 MB",
    date: "Oct 2026",
    description:
      "Term milestones, unit tests, mid-term & final board schedule with school holidays.",
    downloadsCount: 890,
  },
  {
    id: 3,
    title: "Transfer Certificate (TC) Application & Guidelines",
    category: "Admissions",
    type: "PDF",
    size: "640 KB",
    date: "Oct 2026",
    description:
      "Official withdrawal procedure, clearance certificate checklist, and sample TC specimen format.",
    downloadsCount: 540,
  },
  {
    id: 4,
    title: "Student Code of Conduct & School Handbook",
    category: "Regulations",
    type: "PDF",
    size: "3.1 MB",
    date: "Sep 2026",
    description:
      "Rules regarding uniform, punctuality, digital safety, library ethics, and laboratory protocols.",
    downloadsCount: 780,
  },
  {
    id: 5,
    title: "Fee Structure & Payment Schedule 2026-27",
    category: "Finance",
    type: "PDF",
    size: "450 KB",
    date: "Aug 2026",
    description:
      "Comprehensive tuition fee breakdown per term, bus transportation rates, and online payment modes.",
    downloadsCount: 1100,
  },
];

export function BentoGrid() {
  const featuredDoc = DOCS_DATA[0];
  const otherDocs = DOCS_DATA.slice(1, 5);

  return (
    <div>
      {/* Desktop Bento Grid (>= 1024px) */}
      <div className="hidden lg:grid grid-cols-12 gap-6">
        {/* Featured Left Doc: spans 6 columns, full height */}
        <div className="col-span-6">
          <DocCard doc={featuredDoc} isFeatured={true} className="h-full" />
        </div>

        {/* Right 4 Docs: 2 columns of 2 rows each */}
        <div className="col-span-6 grid grid-cols-2 gap-6">
          {otherDocs.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>

      {/* Mobile Bento Grid (< 1024px) */}
      <div className="lg:hidden flex flex-col gap-4">
        {/* Full width featured */}
        <DocCard doc={featuredDoc} isFeatured={true} />

        {/* 2-column grid for others */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherDocs.map((doc) => (
            <DocCard key={doc.id} doc={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}

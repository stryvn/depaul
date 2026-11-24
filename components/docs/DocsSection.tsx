import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import "./editorial-docs.css";
import type { DocItem } from "./DocCard";

interface DocsSectionProps {
  docs?: DocItem[];
}

export function DocsSection({ docs }: DocsSectionProps) {
  // Find specific documents by slug or keywords, or use database items
  const findDoc = (predicate: (d: DocItem) => boolean, fallback: DocItem) => {
    return docs?.find(predicate) || fallback;
  };

  const disclosureDoc = findDoc(
    (d) => Boolean(d.slug?.includes("disclosure") || d.title.toLowerCase().includes("disclosure")),
    {
      id: 1,
      slug: "cbse-mandatory-public-disclosure",
      title: "Mandatory public disclosure",
      category: "CBSE",
      type: "PDF",
      size: "578 KB",
      date: "November 2026",
      description: "School information and statutory disclosures.",
      downloadsCount: 1420,
    }
  );

  const calendarDoc = findDoc(
    (d) => Boolean(d.slug?.includes("calendar") || d.title.toLowerCase().includes("calendar")),
    {
      id: 2,
      slug: "academic-calendar-examination-schedule-2026-27",
      title: "Academic calendar",
      category: "2026–27",
      type: "PDF",
      size: "1.6 MB",
      date: "October 2026",
      description: "Term dates and the school schedule.",
      downloadsCount: 890,
    }
  );

  const affiliationDoc = findDoc(
    (d) => Boolean(d.slug?.includes("affiliation") || d.title.toLowerCase().includes("affiliation")),
    {
      id: 3,
      slug: "cbse-affiliation-extension-letter-2026-2031",
      title: "CBSE affiliation",
      category: "Affiliation",
      type: "PDF",
      size: "1.1 MB",
      date: "October 2026",
      description: "Senior secondary affiliation letter.",
      downloadsCount: 740,
    }
  );

  const teachersDoc = findDoc(
    (d) => Boolean(d.slug?.includes("teacher") || d.title.toLowerCase().includes("teacher")),
    {
      id: 14,
      slug: "teaching-staff-registry-qualifications",
      title: "Teachers list",
      category: "Staff",
      type: "PDF",
      size: "112 KB",
      date: "November 2026",
      description: "The school’s published staff list.",
      downloadsCount: 680,
    }
  );

  const fireSafetyDoc = findDoc(
    (d) => Boolean(d.slug?.includes("fire") || d.title.toLowerCase().includes("fire")),
    {
      id: 5,
      slug: "fire-safety-certificate-noc",
      title: "Fire safety certificate",
      category: "Campus safety",
      type: "PDF",
      size: "220 KB",
      date: "September 2026",
      description: "Fire and Rescue Services certificate.",
      downloadsCount: 520,
    }
  );

  const ptaDoc = findDoc(
    (d) => Boolean(d.slug?.includes("pta") || d.title.toLowerCase().includes("pta")),
    {
      id: 13,
      slug: "pta-executive-committee-2026-27",
      title: "PTA executive committee",
      category: "2026–27",
      type: "PDF",
      size: "267 KB",
      date: "October 2026",
      description: "Parent–Teacher Association executive committee.",
      downloadsCount: 560,
    }
  );

  return (
    <section className="ed-section ed-home ed-doc-section" id="docs" aria-labelledby="home-docs">
      <div className="ed-doc-intro">
        <h2 id="home-docs">School documents</h2>
        <p>Find CBSE disclosures, the academic calendar and school records.</p>
      </div>

      <div className="ed-doc-grid">
        <div className="ed-doc-featured">
          <Link
            className="ed-doc ed-doc-disclosure"
            href={`/docs#${disclosureDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{disclosureDoc.category || "CBSE"}</span>
              <strong>{disclosureDoc.title}</strong>
            </div>
            <Image
              className="ed-doc-art"
              src="/assets/disclosure-preview.webp"
              width={142}
              height={180}
              unoptimized
              alt="Mandatory Public Disclosure Preview"
            />
            <span className="ed-arrow" aria-hidden="true" />
          </Link>

          <Link
            className="ed-doc ed-doc-calendar"
            href={`/docs#${calendarDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{calendarDoc.category || "2026–27"}</span>
              <strong>{calendarDoc.title}</strong>
            </div>
            <span className="ed-arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className="ed-doc-secondary">
          <Link
            className="ed-doc ed-doc-affiliation"
            href={`/docs#${affiliationDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{affiliationDoc.category || "Affiliation"}</span>
              <strong>{affiliationDoc.title}</strong>
            </div>
            <span className="ed-arrow" aria-hidden="true" />
          </Link>

          <Link
            className="ed-doc ed-doc-teachers"
            href={`/docs#${teachersDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{teachersDoc.category || "Staff"}</span>
              <strong>{teachersDoc.title}</strong>
            </div>
            <span className="ed-arrow" aria-hidden="true" />
          </Link>

          <Link
            className="ed-doc ed-doc-fire-safety"
            href={`/docs#${fireSafetyDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{fireSafetyDoc.category || "Campus safety"}</span>
              <strong>{fireSafetyDoc.title}</strong>
            </div>
            <span className="ed-arrow" aria-hidden="true" />
          </Link>

          <Link
            className="ed-doc ed-doc-pta"
            href={`/docs#${ptaDoc.slug}`}
          >
            <div className="ed-doc-copy">
              <span>{ptaDoc.category || "2026–27"}</span>
              <strong>{ptaDoc.title}</strong>
            </div>
            <span className="ed-arrow" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="ed-section-actions">
        <Link className="ed-section-cta" href="/docs">
          View all documents
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

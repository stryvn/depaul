import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle, ExternalLink, Calendar, MapPin, Building } from "lucide-react";

export function AboutCBSEAffiliation() {
  const disclosureItems = [
    { label: "CBSE Affiliation Number", value: "930624", note: "OASIS & LOC Registration ID" },
    { label: "Official School Code", value: "75543", note: "New Delhi Examination Code" },
    { label: "Affiliation Status", value: "Senior Secondary", note: "Valid until 31/03/2031" },
    { label: "Managing Society", value: "Vincentian Fathers", note: "Marymatha Province, Angamaly" },
    { label: "Campus Expanse", value: "13,745 sq meters", note: "Surveyed Educational Land" },
    { label: "District / State", value: "Idukki, Kerala", note: "Pincode: 685604" },
  ];

  return (
    <section id="affiliation" className="py-20 sm:py-24 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-slate-800 shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-royal/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-sky text-xs font-bold uppercase tracking-wider mb-4">
                  <ShieldCheck className="w-4 h-4 text-brand-sky" />
                  <span>Statutory Accreditation</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                  CBSE Affiliation & Official Institutional Records
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-300 font-sans">
                  De Paul Public School & Junior College is fully recognized by the Central Board of Secondary Education (CBSE), New Delhi, adhering to all statutory guidelines, academic calendars, and safety disclosures.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/#docs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                >
                  <FileText className="w-4 h-4 text-brand-sky" />
                  <span>View Mandatory Disclosures (Bento)</span>
                </Link>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {disclosureItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm"
                >
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    {item.label}
                  </p>
                  <p className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                    {item.value}
                  </p>
                  <p className="text-xs text-brand-sky mt-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.note}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Regulatory Assurance */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
              <p>
                Official School ID: <span className="text-white font-medium">930624-75543</span> • Audited under CBSE SARAS 5.0 Guidelines.
              </p>
              <div className="flex items-center gap-4 text-slate-300">
                <span>Building Safety Certified</span>
                <span>•</span>
                <span>Water Testing Verified</span>
                <span>•</span>
                <span>Fire NOC Valid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

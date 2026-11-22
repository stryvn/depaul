"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

const TC_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyEYcq_8pN-In_BKIqZf9_1dPf3BJ0lDsxI4OpwRg6CsEm1tmnpifMp3fYaAM8KCvvk/exec";

export function TcPortalClient() {
  const [iframeKey, setIframeKey] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white bg-[#f8fafc]">
      {/* 1. Sticky Nav matching Site Architecture */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-20">
        {/* 2. Hero & Context Section */}
        <section className="py-6 sm:py-10 border-b border-slate-200/80 bg-white">
          <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
            {/* Back link & Compliance Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-brand-royal transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to De Paul</span>
              </Link>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-brand-royal border border-blue-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-royal" />
                  CBSE Affiliation No. 930624
                </span>
                <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  School Code: 75543
                </span>
              </div>
            </div>

            {/* Title & Introduction */}
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-royal">
                Institutional Records &amp; Verification
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight mt-1">
                Transfer Certificate Verification
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Use the official De Paul Public School &amp; Junior College portal to verify transfer certificates. Records are queried directly against our secure institutional registry to confirm academic standing, dues clearance, and student authenticity.
              </p>
            </div>

            {/* Quick Action Bar */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-slate-800">TC Verification Portal Online</span>
                <span className="hidden md:inline text-slate-400">• Academic Sessions 2024-25, 2025-26, 2026-27</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  title="Reload portal frame"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reload</span>
                </button>

                <a
                  href={TC_SCRIPT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-royal hover:bg-blue-900 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>Open in New Tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Embedded TC Portal Container */}
        <section className="py-8 sm:py-12">
          <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md overflow-hidden relative">
              {/* Frame Top Header Bar */}
              <div className="bg-slate-50/90 border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 ml-2 hidden sm:inline">
                    De Paul Institutional Verification Portal
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="hidden md:inline">Connected to Google Apps Script Engine</span>
                  <a
                    href={TC_SCRIPT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-royal hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Direct Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-x-0 top-12 bottom-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8">
                  <div className="w-10 h-10 border-3 border-slate-200 border-t-brand-royal rounded-full animate-spin mb-4" />
                  <p className="text-sm font-semibold text-slate-800">
                    Connecting to De Paul Transfer Certificate System...
                  </p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm text-center">
                    Loading student certificate verification database and PDF renderer engine.
                  </p>
                </div>
              )}

              {/* The Iframe Portal */}
              <div className="relative w-full min-h-[740px] sm:min-h-[820px] lg:min-h-[880px] bg-[#f3f6fa]">
                <iframe
                  key={iframeKey}
                  id="tc-frame"
                  src={TC_SCRIPT_URL}
                  title="De Paul Public School & Junior College Transfer Certificate Verification Portal"
                  className="w-full h-full min-h-[740px] sm:min-h-[820px] lg:min-h-[880px] border-0 block"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="clipboard-write; fullscreen"
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Verification Guidelines & Instructions */}
        <section className="py-6 sm:py-10">
          <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: How to Verify */}
              <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4 text-brand-royal" />
                  </div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                    Verification Instructions
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  To verify the authenticity of a Transfer Certificate issued by the institution, enter the parameters exactly as they appear on the physical or digital document:
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-brand-royal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        Academic Year
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Select the academic session during which the student withdrew or completed studies (e.g. 2026-27, 2025-26, or 2024-25).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-brand-royal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        TC Number
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Enter the unique certificate serial number printed on the certificate header (e.g. <span className="font-mono font-semibold text-slate-800">DPPS/588/APRIL-2026</span>).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-brand-royal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        Admission Number
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Provide the student&apos;s unique admission ID number assigned at enrollment (e.g. <span className="font-mono font-semibold text-slate-800">DPPS3642</span>).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-6 h-6 rounded-full bg-brand-royal text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                        Student Full Name
                      </h3>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Type the student&apos;s full name matching school records and CBSE registration spelling.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Upon successful verification, the verified certificate record and full high-resolution digital copy will be displayed on screen with print options.
                  </span>
                </div>
              </div>

              {/* Right Column: Support & Institutional Notice */}
              <div className="md:col-span-5 space-y-6">
                {/* CBSE Compliance Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-brand-royal" />
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                      CBSE Regulatory Notice
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    Transfer Certificates issued by De Paul Public School &amp; Junior College, Rajamudy comply with CBSE Affiliation Bye-Laws (Affiliation No. 930624) and Government of Kerala Education Code.
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                      <span>Valid across all CBSE, ICSE, and State Board schools.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                      <span>Contains student academic and conduct assessment.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-royal" />
                      <span>Signed by Principal under official institutional seal.</span>
                    </li>
                  </ul>
                </div>

                {/* Office Contact Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="w-5 h-5 text-slate-700" />
                    <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                      Need Assistance?
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    If you cannot find a record, require archival TC records prior to 2024, or need an official duplicate copy, contact the administrative office:
                  </p>

                  <div className="mt-4 space-y-2.5 text-xs sm:text-sm">
                    <a
                      href="tel:+919605602400"
                      className="flex items-center gap-2.5 text-slate-700 hover:text-brand-royal font-medium transition-colors"
                    >
                      <Phone className="w-4 h-4 text-brand-royal shrink-0" />
                      <span>+91 96056 02400 / +91 95447 29133</span>
                    </a>

                    <a
                      href="mailto:depaulrajamudy@gmail.com"
                      className="flex items-center gap-2.5 text-slate-700 hover:text-brand-royal font-medium transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-brand-royal shrink-0" />
                      <span>depaulrajamudy@gmail.com</span>
                    </a>

                    <div className="flex items-start gap-2.5 text-slate-600">
                      <MapPin className="w-4 h-4 text-brand-royal shrink-0 mt-0.5" />
                      <span>Upputhode Road, Rajamudy P.O, Idukki District, Kerala - 685604</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Office Hours
                    </span>
                    <span className="text-xs font-medium text-slate-700">
                      Mon–Fri: 9:00 AM – 4:00 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

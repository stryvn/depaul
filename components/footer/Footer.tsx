"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "../ui/SocialIcons";

export function Footer() {
  const currentYear = 2026;

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#f8fafc] text-slate-800 overflow-hidden pt-14 sm:pt-16 pb-12 sm:pb-14 select-none border-t border-slate-200/80">
      {/* Subtle hairline gradient accent matching About & Stories */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Atmospheric ambient glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0 relative z-10">
        
        {/* 1. Footer Top Bar: Eyebrow motto + Back to top */}
        <div className="flex items-center justify-between pb-6 sm:pb-8 border-b border-slate-200/70">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand-royal font-sans">
            FOR GOD &amp; COUNTRY
          </span>
          <a
            href="#"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-brand-royal transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 2. Main Content Grid: Left Brand Column (inline lockup + social buttons) + Right 4 Nav Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 sm:pt-10 pb-10 sm:pb-12 border-b border-slate-200/70">
          
          {/* Left Column (5 cols): Inline Title Lockup + Credentials + Social Media Buttons */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <Link href="/" className="group inline-block">
                <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-snug group-hover:text-brand-royal transition-colors">
                  De Paul{" "}
                  <span className="font-bold text-lg sm:text-xl text-slate-700 block sm:inline font-sans">
                    Public School &amp; Junior College
                  </span>
                </h3>
              </Link>
              <p className="text-sm text-slate-600 font-sans mt-1">
                Rajamudy, Idukki, Kerala — 685604
              </p>
            </div>

            <div className="pt-1">
              <span className="inline-block text-xs font-medium text-brand-royal bg-brand-royal/5 border border-brand-royal/15 rounded-full px-3 py-1">
                Affiliated to CBSE, New Delhi · Affiliation No. 930624
              </span>
            </div>

            {/* Social Media Button Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://wa.me/919605602400"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 hover:bg-emerald-600 border border-slate-900/10 hover:border-emerald-600 text-slate-700 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                title="WhatsApp Us"
                aria-label="WhatsApp Channel"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/depaulschoolrajamudy"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-slate-900/10 hover:border-pink-500 text-slate-700 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600 group-hover:text-white transition-colors" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/depaulschoolrajamudy"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 hover:bg-blue-600 border border-slate-900/10 hover:border-blue-600 text-slate-700 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                title="Facebook Page"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-600 group-hover:text-white transition-colors" />
                <span>Facebook</span>
              </a>

              <a
                href="https://www.youtube.com/@depaulschoolrajamudy"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 hover:bg-red-600 border border-slate-900/10 hover:border-red-600 text-slate-700 hover:text-white text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                title="YouTube Channel"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-red-600 group-hover:text-white transition-colors" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Right 4 Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6">
            
            {/* Column 1: INSTITUTION */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                INSTITUTION
              </h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-medium">
                <Link href="/about" className="text-slate-700 hover:text-brand-royal transition-colors">
                  About the school
                </Link>
                <Link href="/about#leadership" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Administration
                </Link>
                <Link href="/about#mission" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Mission &amp; Vision
                </Link>
              </div>
            </div>

            {/* Column 2: NAVIGATION */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                NAVIGATION
              </h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-medium">
                <Link href="/stories" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Stories
                </Link>
                <Link href="/gallery" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Gallery
                </Link>
                <Link href="/#contact" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Admission
                </Link>
                <Link href="/contact" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Column 3: DOCUMENTS */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                DOCUMENTS
              </h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-medium">
                <Link href="/#docs" className="text-slate-700 hover:text-brand-royal transition-colors">
                  School documents
                </Link>
                <Link href="/tc" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Transfer certificate
                </Link>
                <Link href="/alumni" className="text-slate-700 hover:text-brand-royal transition-colors">
                  Alumni Network
                </Link>
              </div>
            </div>

            {/* Column 4: CONTACT */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">
                CONTACT
              </h4>
              <div className="flex flex-col space-y-2 text-xs sm:text-sm font-medium">
                <a href="tel:+919605602400" className="text-slate-700 hover:text-brand-royal transition-colors">
                  +91 96056 02400
                </a>
                <a href="tel:+919544729133" className="text-slate-700 hover:text-brand-royal transition-colors">
                  +91 95447 29133
                </a>
                <a href="mailto:depaulrajamudy@gmail.com" className="text-slate-700 hover:text-brand-royal transition-colors break-all">
                  depaulrajamudy@gmail.com
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Footer Bottom: Copyright ONLY (STRYVN watermark completely removed) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-sans">
          <span>
            &copy; {currentYear} De Paul Public School &amp; Junior College, Rajamudy
          </span>
          <div className="flex items-center gap-4 text-slate-500">
            <span>CBSE School Code: 75543</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

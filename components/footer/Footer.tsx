import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: School Brand (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-md p-1 border border-white/20">
                <Image
                  src="/assets/branding/logo.png"
                  alt="De Paul School Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white tracking-wide">
                  DE PAUL PUBLIC SCHOOL
                </h3>
                <p className="text-xs text-brand-sky font-semibold tracking-wider uppercase">
                  Rajamudy, Idukki, Kerala
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 font-serif italic max-w-sm">
              &ldquo;For God & Country&rdquo; — dedicated to cultivating academic distinction, ethical virtue, and selfless community leadership in the high ranges of Idukki.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-crimson shrink-0" />
                <span>Rajamudy P.O., Murickassery via, Idukki Dt., Kerala - 685604</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-sky shrink-0" />
                <a href="tel:+914868272312" className="hover:text-white transition-colors">
                  +91 4868 272312
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <a href="mailto:depaulrajamudy@gmail.com" className="hover:text-white transition-colors">
                  depaulrajamudy@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#about" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • About Us
              </a>
              <a href="#stories" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • School News
              </a>
              <a href="#docs" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • CBSE Disclosures
              </a>
              <a href="#contact" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • Admissions
              </a>
              <a href="/alumni" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • Alumni Network
              </a>
              <a href="#docs" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • Transfer Certificate
              </a>
              <a href="#contact" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • Campus Visit
              </a>
              <a href="/privacy" className="text-slate-400 hover:text-white hover:translate-x-1 transition-all">
                • Privacy Policy
              </a>
            </div>
          </div>

          {/* Column 3: Institutional Affiliation & Badges (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-2">
              Affiliation & Patronage
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">Affiliation:</span>
                <span className="text-brand-sky font-mono">CBSE New Delhi</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">Managed By:</span>
                <span className="text-white font-medium">Vincentian Fathers</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold">Curriculum:</span>
                <span className="text-emerald-400 font-medium">NCERT / CBSE</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="#contact"
                className="inline-flex w-full items-center justify-center py-2.5 px-4 rounded-full bg-brand-crimson hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-red-600/30"
              >
                Inquire For Admission
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} De Paul Public School Rajamudy. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Crafted for De Paul Educational Excellence</span>
            <Heart className="w-3.5 h-3.5 text-brand-crimson fill-brand-crimson" />
          </p>
        </div>
      </div>
    </footer>
  );
}

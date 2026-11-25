import React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, MessageSquare, MapPin, Calendar, CheckCircle } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-royal/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#023b73] via-brand-royal to-slate-950 p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden border border-white/20">
          {/* Subtle backdrop elements */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-sky/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold uppercase tracking-wider text-white mb-6">
              Begin Your Child&apos;s Journey
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white">
              Experience the De Paul Difference in Rajamudy
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-200 font-sans leading-relaxed">
              Admissions are open for Kindergarten through Senior Secondary. We invite parents and guardians to visit our campus, tour our scientific laboratories, and meet our faculty.
            </p>

            {/* Admissions Highlights */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-sky" />
                <span>Kindergarten to Class XII Admissions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-sky" />
                <span>Transparent CBSE Fee Structure</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-sky" />
                <span>Campus Bus Route Coverage</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                href="/admissions"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-b from-[#0262b6] to-[#02498b] hover:from-[#036bc7] hover:to-[#02539d] text-white text-sm sm:text-base font-semibold tracking-wide border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(2,86,161,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_4px_28px_rgba(2,86,161,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                <span>Apply for Admission / Inquire</span>
                <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </span>
              </Link>

              <a
                href="https://wa.me/919605602400"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-sm sm:text-base font-semibold tracking-wide transition-all shadow-md active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Admissions Desk</span>
              </a>
            </div>

            {/* Quick Contact Footnote */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-sky" />
                <span>Admissions Helpline:</span>
                <a href="tel:+919605602400" className="text-white font-semibold hover:underline">
                  +91 96056 02400
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-crimson" />
                <span>Rajamudi P.O, Murickassery via, Idukki – 685604</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

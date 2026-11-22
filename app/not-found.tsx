import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#071329] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-royal/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative w-24 h-24 p-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <Image
              src="/assets/branding/logo.png"
              alt="De Paul Public School Rajamudy"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-brand-sky font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 inline-block">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">
            Off The Campus Path
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            The page you are looking for doesn&apos;t exist or has moved. Return to the main gate to explore De Paul Public School Rajamudy.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-royal text-white font-semibold text-sm hover:bg-brand-royal/90 transition-colors shadow-lg shadow-brand-royal/25"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            About School
          </Link>
        </div>

        <p className="text-xs text-slate-400 tracking-wide pt-4">
          De Paul Public School &amp; Junior College, Rajamudy
        </p>
      </div>
    </main>
  );
}

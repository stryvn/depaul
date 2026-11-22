"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by boundary:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#071329] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 inline-block">
            Notice
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            An unexpected error occurred while loading this section. You can retry or head back to the home page.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-royal text-white font-semibold text-sm hover:bg-brand-royal/90 transition-colors cursor-pointer shadow-lg shadow-brand-royal/25"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors border border-white/10"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

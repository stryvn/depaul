"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface NavButtonProps {
  name: string;
  href: string;
  isLight?: boolean;
  className?: string;
}

export function NavButton({ name, href, isLight = false, className = "" }: NavButtonProps) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold tracking-wider uppercase active:scale-95 transition-all whitespace-nowrap ${
        isLight
          ? "text-slate-800 hover:text-brand-royal hover:bg-slate-900/5"
          : "text-white/90 hover:text-white hover:bg-white/20"
      } ${className}`}
    >
      <span>{name}</span>
      <ArrowUpRight
        className={`w-3.5 h-3.5 opacity-0 -translate-x-1.5 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 ${
          isLight ? "text-brand-royal" : "text-white/60"
        }`}
      />
    </a>
  );
}

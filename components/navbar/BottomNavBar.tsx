"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../ui/utils";
import { NavButton } from "./NavButton";
import { ArrowUpRight } from "lucide-react";

interface BottomNavBarProps {
  isMerged: boolean;
}

const BOTTOM_LINKS = [
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Docs", href: "#docs" },
  { name: "News", href: "#stories" },
  { name: "Alumni", href: "/alumni" },
  { name: "TC", href: "#docs" },
];

export function BottomNavBar({ isMerged }: BottomNavBarProps) {
  return (
    <div
      id="bottom-nav-container"
      className={cn(
        "absolute bottom-3 sm:bottom-8 left-0 right-0 z-40 flex justify-center px-3 sm:px-5 pointer-events-none transition-all duration-300",
        isMerged ? "opacity-0 -translate-y-4" : "opacity-100"
      )}
    >
      {/* Sentinel for IntersectionObserver */}
      <div id="bottom-nav-sentinel" className="absolute -top-16 left-0 right-0 h-4 pointer-events-none" />

      {/* Desktop Layout (>= 640px): Full single-row pill matching top navbar */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isMerged ? 0 : 1, y: isMerged ? -10 : 0 }}
        transition={{ duration: 0.35 }}
        className={cn(
          "hidden sm:flex pointer-events-auto w-full max-w-[1140px] rounded-full border px-3 sm:px-5 py-2 sm:py-2.5 items-center justify-center transition-all duration-400 select-none",
          "bg-white/20 hover:bg-white/25 backdrop-blur-md border-white/30 text-white shadow-xl shadow-black/20"
        )}
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-max px-2">
          {BOTTOM_LINKS.map((item) => (
            <NavButton key={item.name} name={item.name} href={item.href} />
          ))}
        </div>
      </motion.nav>

      {/* Mobile Layout (< 640px): 2x3 Grid inside a compact frosted glass card */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isMerged ? 0 : 1, y: isMerged ? -10 : 0 }}
        transition={{ duration: 0.35 }}
        className={cn(
          "sm:hidden pointer-events-auto w-full max-w-sm mx-auto rounded-2xl border p-2 select-none",
          "bg-white/20 backdrop-blur-md border-white/30 text-white shadow-xl shadow-black/25"
        )}
      >
        <div className="grid grid-cols-3 gap-1.5">
          {BOTTOM_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group flex items-center justify-center gap-1 px-2 py-2 rounded-xl bg-white/10 hover:bg-white/25 active:bg-white/30 text-xs font-semibold tracking-wide uppercase text-white/95 transition-all text-center"
            >
              <span>{item.name}</span>
              <ArrowUpRight className="w-3 h-3 text-white/60 group-hover:text-white transition-colors" />
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function HeroCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 select-none"
    >
      {/* Primary CTA: "Admissions" — firmly anchored (no translateY lift), responds via light, depth, and border transition */}
      <a
        href="#contact"
        className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-b from-[#0262b6] to-[#02498b] hover:from-[#036bc7] hover:to-[#02539d] text-white text-sm sm:text-base font-semibold tracking-wide border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(2,86,161,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_4px_28px_rgba(2,86,161,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
      >
        <span>Admissions</span>
        <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </span>
      </a>

      {/* Secondary Companion: "Explore Campus" */}
      <a
        href="#about"
        className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors duration-200 py-2.5 px-2"
      >
        <span>Explore Campus</span>
        <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
      </a>
    </motion.div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroTitle() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl px-4 select-none">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.08]"
      >
        DE PAUL PUBLIC SCHOOL
      </motion.h1>

      <motion.span
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        className="text-lg sm:text-2xl font-display font-semibold tracking-wider text-slate-200 uppercase mt-3 drop-shadow"
      >
        RAJAMUDY • IDUKKI
      </motion.span>

      <motion.p
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-3 text-base sm:text-xl font-medium text-brand-sky tracking-wide drop-shadow"
      >
        &ldquo;For God & Country&rdquo;
      </motion.p>
    </div>
  );
}

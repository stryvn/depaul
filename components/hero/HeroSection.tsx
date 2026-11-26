"use client";

import React, { useEffect, useRef } from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroCTA } from "./HeroCTA";
import { BottomNavBar } from "../navbar/BottomNavBar";

interface HeroSectionProps {
  isMerged: boolean;
}

export function HeroSection({ isMerged }: HeroSectionProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateParallax = () => {
      background.style.transform = reducedMotion.matches
        ? ""
        : `translate3d(0, ${Math.max(0, window.scrollY) * 0.25}px, 0)`;
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    reducedMotion.addEventListener("change", updateParallax);
    return () => {
      window.removeEventListener("scroll", updateParallax);
      reducedMotion.removeEventListener("change", updateParallax);
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col justify-end overflow-hidden bg-brand-navy pb-24 sm:pb-28">
      {/* Background Campus Exterior from project curated assets with parallax */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 will-change-transform"
        ref={backgroundRef}
      >
        <picture>
          <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/campus_exterior/drone-shot-portrait.webp" />
          <img
            src="/assets/campus_exterior/drone-shot-final-frame.webp"
            alt="Aerial view of De Paul Public School in Rajamudy"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center brightness-95"
          />
        </picture>
        {/* Balanced gradient overlay: leaves the top and middle school building visible, darkening towards bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Center Content placed lower to reveal full campus building overhead */}
      <div className="relative z-20 flex flex-col mx-auto w-full max-w-5xl items-center px-4 mb-6 sm:mb-8">
        <HeroTitle />
        <HeroCTA />
      </div>

      {/* Bottom Nav Bar placed at the bottom of hero */}
      <BottomNavBar isMerged={isMerged} />
    </section>
  );
}

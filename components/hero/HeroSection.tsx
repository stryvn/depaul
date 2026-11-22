"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HeroTitle } from "./HeroTitle";
import { HeroCTA } from "./HeroCTA";
import { BottomNavBar } from "../navbar/BottomNavBar";

interface HeroSectionProps {
  isMerged: boolean;
}

export function HeroSection({ isMerged }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[680px] flex flex-col justify-end overflow-hidden pb-24 sm:pb-28">
      {/* Background Campus Exterior from project curated assets with parallax */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.25}px, 0)`,
        }}
      >
        <Image
          src="/assets/campus_exterior/drone-shot-final-frame.jpeg"
          alt="De Paul Public School Rajamudy Campus Drone Shot"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-95"
        />
        {/* Balanced gradient overlay: leaves the top and middle school building visible, darkening towards bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
      </div>

      {/* Decorative Brand Accent Lines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-15">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      {/* Center Content placed lower to reveal full campus building overhead */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto w-full mb-6 sm:mb-8">
        <HeroTitle />
        <HeroCTA />
      </div>

      {/* Bottom Nav Bar placed at the bottom of hero */}
      <BottomNavBar isMerged={isMerged} />
    </section>
  );
}

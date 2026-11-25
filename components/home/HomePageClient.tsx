"use client";

import React from "react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { useNavbarMerge } from "@/components/navbar/useNavbarMerge";
import { HeroSection } from "@/components/hero/HeroSection";

export function HomePageClient({ children }: { children: React.ReactNode }) {
  const { isMerged } = useNavbarMerge("bottom-nav-sentinel");

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white">
      {/* Dynamic Floating / Merged Header */}
      <TopNavbar isMerged={isMerged} />

      <main className="flex-1 w-full">
        {/* Section 1: Hero Section */}
        <HeroSection isMerged={isMerged} />

        {children}
      </main>
    </div>
  );
}

"use client";

import React from "react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { useNavbarMerge } from "@/components/navbar/useNavbarMerge";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { StoriesSection } from "@/components/stories/StoriesSection";
import { DocsSection } from "@/components/docs/DocsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  const { isMerged } = useNavbarMerge("bottom-nav-sentinel");

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white">
      {/* Dynamic Floating / Merged Header */}
      <TopNavbar isMerged={isMerged} />

      <main className="flex-1 w-full">
        {/* Section 1: Hero Section */}
        <HeroSection isMerged={isMerged} />

        {/* Section 2: About Section */}
        <AboutSection />

        {/* Section 3: Stories Section */}
        <StoriesSection />

        {/* Section 4: Docs Bento Section */}
        <DocsSection />

        {/* Section 5: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

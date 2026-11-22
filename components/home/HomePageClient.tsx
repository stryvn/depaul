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
import type { StoryItem } from "@/components/stories/StoryTile";
import type { DocItem } from "@/components/docs/DocCard";

interface HomePageClientProps {
  stories?: StoryItem[];
  docs?: DocItem[];
}

export function HomePageClient({ stories, docs }: HomePageClientProps) {
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
        <StoriesSection stories={stories} />

        {/* Section 4: Docs Bento Section */}
        <DocsSection docs={docs} />

        {/* Section 5: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

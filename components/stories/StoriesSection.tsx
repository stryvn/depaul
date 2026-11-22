import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { MasonryGrid } from "./MasonryGrid";
import { ScrollReveal } from "../ui/ScrollReveal";
import type { StoryItem } from "./StoryTile";

interface StoriesSectionProps {
  stories?: StoryItem[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  return (
    <section id="stories" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Top Section Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Background subtle accent atmospheric glow & lines */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0 relative z-10">
        <ScrollReveal>
          <SectionHeading
            title="De Paul Stories"
            align="left"
            className="mb-8 md:mb-10"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MasonryGrid stories={stories} />
        </ScrollReveal>
      </div>
    </section>
  );
}

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { MasonryGrid } from "./MasonryGrid";
import { ScrollReveal } from "../ui/ScrollReveal";

export function StoriesSection() {
  return (
    <section id="stories" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            badge="Life at De Paul"
            title="School Stories & News"
            subtitle="Catch up with campus celebrations, student victories, academic updates, and community milestones."
            actionText="View All Stories"
            actionHref="/stories"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MasonryGrid />
        </ScrollReveal>
      </div>
    </section>
  );
}

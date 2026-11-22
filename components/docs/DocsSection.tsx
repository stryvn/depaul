import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { BentoGrid } from "./BentoGrid";
import { ScrollReveal } from "../ui/ScrollReveal";

export function DocsSection() {
  return (
    <section id="docs" className="py-20 sm:py-28 bg-surface-offwhite relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            badge="Institutional Transparency"
            title="Important Documents & Disclosures"
            subtitle="Access CBSE public disclosures, academic schedules, policy handbooks, and official transfer certificates."
            actionText="View All Documents"
            actionHref="/documents"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <BentoGrid />
        </ScrollReveal>
      </div>
    </section>
  );
}

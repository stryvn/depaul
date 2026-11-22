import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { BentoGrid } from "./BentoGrid";
import { ScrollReveal } from "../ui/ScrollReveal";
import type { DocItem } from "./DocCard";

interface DocsSectionProps {
  docs?: DocItem[];
}

export function DocsSection({ docs }: DocsSectionProps) {
  return (
    <section id="docs" className="py-20 sm:py-28 bg-surface-offwhite relative">
      <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0">
        <ScrollReveal>
          <SectionHeading
            badge="Institutional Transparency"
            title="Important Documents & Disclosures"
            subtitle="Access CBSE public disclosures, academic schedules, policy handbooks, and official transfer certificates."
            actionText="View All Documents"
            actionHref="/documents"
            align="left"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <BentoGrid docs={docs} />
        </ScrollReveal>
      </div>
    </section>
  );
}

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { AboutCardGrid } from "./AboutCardGrid";
import { ScrollReveal } from "../ui/ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-surface-offwhite relative overflow-hidden">
      {/* Background subtle accent grid/decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            badge="Institutional Pillars"
            title="About De Paul Public School"
            subtitle="Nurturing intellectually sound, spiritually oriented, and socially responsible citizens through holistic education."
            actionText="Full Institution Profile"
            actionHref="/about"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <AboutCardGrid />
        </ScrollReveal>
      </div>
    </section>
  );
}

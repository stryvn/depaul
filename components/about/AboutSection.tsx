import React from "react";
import { AboutMotionGallery } from "./AboutMotionGallery";
import { ScrollReveal } from "../ui/ScrollReveal";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Top Section Divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Bottom Section Divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      {/* Background subtle accent atmospheric glow & lines */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-sky/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <ScrollReveal>
          <div className="ed-section mb-8 md:mb-10">
            <h2>About De Paul</h2>
          </div>
        </ScrollReveal>

        <AboutMotionGallery />
      </div>
    </section>
  );
}

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { MapEmbed } from "./MapEmbed";
import { ContactInfo } from "./ContactInfo";
import { ScrollReveal } from "../ui/ScrollReveal";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-brand-royal relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-700/40 via-brand-royal to-blue-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <SectionHeading
            badge="Get In Touch"
            title="Contact & Campus Visit"
            subtitle="Plan a visit to our picturesque Rajamudy campus or get in touch with our admissions counsellors."
            theme="dark"
          />
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Map (takes ~60% width on desktop = 7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col justify-center">
            <ScrollReveal direction="left" delay={0.1}>
              <MapEmbed />
            </ScrollReveal>
          </div>

          {/* Info panel (takes ~40% width on desktop = 5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <ScrollReveal direction="right" delay={0.2}>
              <ContactInfo />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

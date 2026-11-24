"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "../ui/SocialIcons";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/919605602400",
    icon: WhatsAppIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/depaulschoolrajamudy",
    icon: InstagramIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/depaulschoolrajamudy",
    icon: FacebookIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@depaulschoolrajamudy",
    icon: YoutubeIcon,
  },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="home-contact-title"
      className="site-container my-10 sm:my-16"
    >
      <div className="bg-[#0b1b3d] text-white rounded-2xl p-2 sm:p-2.5 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch gap-4 sm:gap-6 border border-white/10">
        {/* Left Copy Column */}
        <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-8 lg:p-10 min-w-0">
          <span className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#a9c6ed] mb-2 sm:mb-3 block">
            Rajamudy, Idukki
          </span>
          <h2
            id="home-contact-title"
            className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight font-display text-white leading-[1.08]"
          >
            Contact De Paul
          </h2>

          <address className="not-italic text-[#e0eafa] text-sm sm:text-base mt-3 sm:mt-4 leading-relaxed font-sans">
            Upputhode Road, Rajamudy
            <br />
            Idukki, Kerala 685604
          </address>

          <div className="mt-4 sm:mt-5 space-y-1 text-sm sm:text-base font-medium">
            <div>
              <a
                href="tel:+919605602400"
                className="text-white hover:text-[#38bdf8] hover:underline underline-offset-4 transition-colors"
              >
                +91 96056 02400
              </a>
              <span className="text-slate-400 mx-2">/</span>
              <a
                href="tel:+919544729133"
                className="text-white hover:text-[#38bdf8] hover:underline underline-offset-4 transition-colors"
              >
                +91 95447 29133
              </a>
            </div>
            <div>
              <a
                href="mailto:depaulrajamudy@gmail.com"
                className="text-white hover:text-[#38bdf8] hover:underline underline-offset-4 break-all transition-colors"
              >
                depaulrajamudy@gmail.com
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-7">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#edf3fa] hover:bg-[#d9e8fb] text-[#0b1b3d] font-bold text-sm sm:text-base transition-colors shadow-sm active:scale-95"
            >
              <span>Contact details</span>
              <ArrowUpRight className="w-4 h-4 text-[#0256a1]" />
            </Link>
            <a
              href="https://www.google.com/maps/search/?api=1&query=De+Paul+Public+School+Rajamudy+Idukki"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#e0eafa] hover:text-white font-bold text-sm sm:text-base underline underline-offset-4 transition-colors"
            >
              <span>Get directions</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links on Contact Section */}
          <div className="mt-7 pt-6 border-t border-white/15">
            <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              Connect With De Paul
            </h4>
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 text-xs font-semibold text-[#e0eafa] transition-colors hover:border-[#a9c6ed] hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    title={item.name}
                    aria-label={item.name}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Google Maps Embed */}
        <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full rounded-xl overflow-hidden border border-white/10 bg-slate-900 shadow-inner">
          <iframe
            src="https://maps.google.com/maps?q=De+Paul+Public+School+Rajamudy+Idukki&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Google Maps location of De Paul Public School Rajamudy"
            loading="lazy"
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

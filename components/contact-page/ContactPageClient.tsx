"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export function ContactPageClient() {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white bg-[#f8fafc]">
      {/* 1. Official Sticky Pill Navbar (Full state) */}
      <TopNavbar isMerged={true} />

      <main id="main" className="flex-1 w-full pt-20 sm:pt-24 pb-16 sm:pb-24">
        {/* 2. Contact Hero Card */}
        <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 min-[1180px]:px-0">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-labelledby="contact-title"
            className="relative bg-[#0b1b3d] text-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[360px] sm:min-h-[420px] lg:min-h-[450px]"
          >
            {/* Left Copy Column */}
            <div className="lg:col-span-5 flex flex-col justify-center p-6 sm:p-10 lg:p-12 z-10">
              <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#a9c6ed] mb-2 sm:mb-3">
                Rajamudy, Idukki
              </p>
              <h1
                id="contact-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.98] font-display text-white"
              >
                Contact
                <br />
                <span className="text-white">De Paul</span>
              </h1>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#e0eafa] leading-relaxed max-w-sm">
                Speak with the school office or get directions to our campus.
              </p>
              <div className="mt-6 sm:mt-8">
                <a
                  href="tel:+919605602400"
                  className="inline-flex items-center gap-2.5 min-h-[44px] px-5 py-2.5 bg-[#edf3fa] hover:bg-[#d9e8fb] text-[#0b1b3d] rounded-md font-extrabold text-sm sm:text-base transition-colors shadow-sm active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#0256a1]" />
                  <span>Call the school office</span>
                </a>
              </div>
            </div>

            {/* Right Hero Campus Photo Column */}
            <figure className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-[#1b2b4d] overflow-hidden">
              <Image
                src="/assets/about-campus.webp"
                alt="The De Paul school campus and courtyard in Rajamudy"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-0 right-0 px-3.5 py-2 bg-[#0b1b3d]/95 backdrop-blur-sm text-[#eff5fe] text-xs sm:text-[13px] font-medium tracking-wide">
                De Paul Public School &amp; Junior College
              </figcaption>
            </figure>
          </motion.section>
        </div>

        {/* 3. Contact Details & Interactive Campus Map */}
        <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 min-[1180px]:px-0 mt-8 sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
          >
            {/* Left Card: School Office */}
            <section
              aria-labelledby="office-title"
              className="lg:col-span-5 bg-[#edf3fa] border border-[#d7e0ec] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <h2
                  id="office-title"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0b1b3d]"
                >
                  School office
                </h2>

                <dl className="mt-5 sm:mt-6 divide-y divide-[#cedaeb]">
                  {/* Phone Section */}
                  <div className="py-3.5 first:pt-0">
                    <dt className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#173e82]">
                      Phone
                    </dt>
                    <dd className="mt-1 space-y-1">
                      <a
                        href="tel:+919605602400"
                        className="block text-base sm:text-lg font-bold text-[#0b1b3d] hover:text-[#0256a1] hover:underline underline-offset-4 transition-colors"
                      >
                        +91 96056 02400
                      </a>
                      <a
                        href="tel:+919544729133"
                        className="block text-base sm:text-lg font-bold text-[#0b1b3d] hover:text-[#0256a1] hover:underline underline-offset-4 transition-colors"
                      >
                        +91 95447 29133
                      </a>
                    </dd>
                  </div>

                  {/* Email Section */}
                  <div className="py-3.5">
                    <dt className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#173e82]">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:depaulrajamudy@gmail.com"
                        className="text-base sm:text-lg font-bold text-[#0b1b3d] hover:text-[#0256a1] hover:underline underline-offset-4 break-all transition-colors"
                      >
                        depaulrajamudy@gmail.com
                      </a>
                    </dd>
                  </div>

                  {/* Address Section */}
                  <div className="py-3.5 last:pb-0">
                    <dt className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-[#173e82]">
                      Address
                    </dt>
                    <dd className="mt-1">
                      <address className="not-italic text-sm sm:text-base font-medium text-[#1e293b] leading-relaxed">
                        De Paul Public School &amp; Junior College
                        <br />
                        Upputhode Road, Rajamudy
                        <br />
                        Idukki, Kerala 685604
                      </address>
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Office hours & quick WhatsApp action */}
              <div className="mt-6 pt-5 border-t border-[#cedaeb] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Mon – Sat: 8:30 AM – 4:30 PM</span>
                </div>
                <a
                  href="https://wa.me/919605602400"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 hover:text-white font-semibold transition-all shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </section>

            {/* Right Card: Interactive Campus Map & Location */}
            <section
              aria-labelledby="location-title"
              className="lg:col-span-7 flex flex-col min-w-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3">
                <h2
                  id="location-title"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-[#0b1b3d]"
                >
                  Find the campus
                </h2>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=De+Paul+Public+School+Rajamudy+Idukki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-[#173e82] hover:text-[#0256a1] underline underline-offset-4 transition-colors"
                >
                  <span>Get directions</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Interactive Vector Campus Map Iframe */}
              <div className="relative w-full flex-1 min-h-[350px] sm:min-h-[420px] rounded-xl border border-[#c9d6e5] overflow-hidden bg-[#eef0ed] shadow-sm">
                <iframe
                  src="/campus-map.html"
                  title="Interactive map of the De Paul campus in Rajamudy"
                  loading="lazy"
                  className="w-full h-full border-0 absolute inset-0"
                />
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      {/* 4. Official Institutional Footer */}
      <Footer />
    </div>
  );
}

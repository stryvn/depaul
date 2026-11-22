import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Shield, Award, Users, BookOpen, Building2, Calendar, Compass } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-slate-900 via-[#03234a] to-slate-900 text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-royal/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-brand-sky/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Grid line pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-brand-sky/80 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white font-semibold">About Us</span>
        </div>

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wide text-white mb-6 shadow-sm">
          <Shield className="w-4 h-4 text-brand-sky" />
          <span>Vincentian Congregation • CBSE Affiliation No. 930624 • Est. 2002</span>
        </div>

        {/* Main Swiss Heading */}
        <div className="max-w-4xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
            Nurturing Character, Compassion & Academic Rigour.
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            Established in 2002 under the spiritual patronage of the Vincentian Fathers, De Paul Public School & Junior College Rajamudy delivers holistic CBSE education across the scenic Western Ghats of Idukki. Guided by our motto <span className="text-white font-semibold italic">&ldquo;For God & Country&rdquo;</span>, we equip students from Kindergarten to Senior Secondary with ethical clarity, scientific curiosity, and lifelong leadership.
          </p>

          {/* Action Row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#leadership"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-b from-[#0262b6] to-[#02498b] hover:from-[#036bc7] hover:to-[#02539d] text-white text-sm sm:text-base font-semibold tracking-wide border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(2,86,161,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_4px_28px_rgba(2,86,161,0.5),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300"
            >
              <span>Meet Our Leadership</span>
              <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </a>

            <a
              href="#facilities"
              className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-white/80 hover:text-white transition-colors duration-200 py-2.5 px-2 select-none"
            >
              <span>Explore Campus Facilities</span>
              <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </div>
        </div>

        {/* Key Statistics Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { label: "Year Founded", value: "2002", icon: Calendar, note: "24+ Yrs of Service" },
            { label: "Affiliation Period", value: "2031", icon: Award, note: "CBSE Sr. Secondary" },
            { label: "Campus Expanse", value: "13,745 m²", icon: Compass, note: "Scenic Idukki Hills" },
            { label: "Smart Classrooms", value: "34", icon: Building2, note: "AV-Integrated" },
            { label: "Dedicated Labs", value: "6", icon: BookOpen, note: "Physics, Chem, Bio, IT" },
            { label: "Faculty & Staff", value: "49+", icon: Users, note: "Qualified Educators" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.1] border border-white/15 backdrop-blur-md transition-colors shadow-lg"
              >
                <div className="flex items-center justify-between text-brand-sky mb-2">
                  <Icon className="w-4 h-4 text-brand-sky" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/50">Verified</span>
                </div>
                <div className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.note}</div>
              </div>
            );
          })}
        </div>

        {/* Visual Hero Showcase Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Exterior Drone Shot */}
          <div className="md:col-span-8 relative h-[280px] sm:h-[380px] md:h-[460px] rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
            <Image
              src="/assets/campus_exterior/drone-shot-final-frame.jpeg"
              alt="De Paul Public School Rajamudy Campus Drone Shot"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-royal/80 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white mb-2">
                Scenic Hill Campus
              </span>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
                Rajamudy, Idukki District, Kerala
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Nestled amidst serene misty hills, providing an unpolluted, focused, and tranquil setting for comprehensive scholastic and personal development.
              </p>
            </div>
          </div>

          {/* Secondary Visual Tiles */}
          <div className="md:col-span-4 flex flex-col gap-4 lg:gap-6">
            {/* Top Secondary: Community / Assembly */}
            <div className="relative h-[180px] sm:h-[215px] rounded-3xl overflow-hidden border border-white/20 shadow-xl group">
              <Image
                src="/assets/about-community.webp"
                alt="Students of De Paul Public School"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-sky">Community Life</span>
                <p className="font-display font-semibold text-sm sm:text-base text-white">
                  Values-based character formation in action
                </p>
              </div>
            </div>

            {/* Bottom Secondary: Academic Labs & Classroom */}
            <div className="relative h-[180px] sm:h-[215px] rounded-3xl overflow-hidden border border-white/20 shadow-xl group">
              <Image
                src="/assets/about-learning.webp"
                alt="Classroom and lab learning at De Paul"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">Experiential STEM</span>
                <p className="font-display font-semibold text-sm sm:text-base text-white">
                  Modern laboratories and discovery learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

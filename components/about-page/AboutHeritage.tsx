import React from "react";
import Image from "next/image";
import { HeartHandshake, BookOpenCheck, ShieldCheck, Cpu, Users, Sparkles, Quote } from "lucide-react";

export function AboutHeritage() {
  const missionPoints = [
    {
      icon: HeartHandshake,
      title: "Vincentian Tradition",
      desc: "Delivering value-grounded education inspired by the compassionate service and spiritual legacy of St. Vincent de Paul.",
      color: "from-blue-500/20 to-blue-600/5",
      accent: "text-brand-royal",
    },
    {
      icon: BookOpenCheck,
      title: "Academic Rigour",
      desc: "Upholding high scholastic standards through the Central Board of Secondary Education (CBSE) syllabus, experiential enquiry, and holistic assessment.",
      color: "from-sky-500/20 to-sky-600/5",
      accent: "text-brand-sky",
    },
    {
      icon: ShieldCheck,
      title: "Character & Discipline",
      desc: "Instilling deep moral integrity, civic awareness, self-discipline, and mutual respect throughout everyday school life.",
      color: "from-amber-500/20 to-amber-600/5",
      accent: "text-brand-gold",
    },
    {
      icon: Cpu,
      title: "Future-Ready Skills",
      desc: "Integrating coding, robotics, data awareness, and laboratory science to develop agile thinkers capable of excelling in modern professions.",
      color: "from-cyan-500/20 to-cyan-600/5",
      accent: "text-brand-cyan",
    },
    {
      icon: Users,
      title: "Inclusive & Secure Campus",
      desc: "Fostering a student-first atmosphere across 13,745 m² with 24/7 CCTV surveillance, individual attention, and nurturing pastoral care.",
      color: "from-emerald-500/20 to-emerald-600/5",
      accent: "text-brand-emerald",
    },
    {
      icon: Sparkles,
      title: "Service to Community",
      desc: "Inspiring pupils to step outside their comfort zones, leading rural environmental initiatives and compassionate community outreach across Idukki.",
      color: "from-rose-500/20 to-rose-600/5",
      accent: "text-brand-crimson",
    },
  ];

  return (
    <section id="heritage" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200">
      {/* Decorative background radial effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-royal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
            Our Foundation & Charism
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Rooted in the Vincentian Spirit of Service & Truth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Since its inception in 2002 by the Vincentian Fathers, De Paul Public School has championed holistic schooling in the high ranges of Idukki — uniting intellectual ambition with genuine moral conviction.
          </p>
        </div>

        {/* Vision Statement Spotlight Card */}
        <div className="mb-16 sm:mb-20 rounded-3xl bg-gradient-to-br from-slate-900 via-[#032958] to-slate-950 p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-8 right-8 text-white/10 hidden md:block">
            <Quote className="w-24 h-24" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-brand-sky mb-6">
              Official Vision Statement
            </div>
            <blockquote className="font-display font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight text-white">
              &ldquo;To empower every learner with knowledge, wisdom, and values, enabling them to become compassionate, innovative, and responsible global citizens who contribute positively to society.&rdquo;
            </blockquote>

            <div className="mt-8 pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold tracking-wide uppercase text-brand-sky">
                  Core Motto: For God & Country
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Institutional Directive of the Vincentian Fathers, Marymatha Province
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-white/10 p-1 border border-white/20 shrink-0">
                  <Image
                    src="/assets/branding/logo.png"
                    alt="De Paul School Shield"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white tracking-wider uppercase">De Paul Rajamudy</p>
                  <p className="text-[10px] text-slate-300">CBSE Affiliated No. 930624</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Matrix (6-Card Grid) */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                Our Guiding Mission Pillars
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                The six core educational imperatives governing classroom instruction and student mentorship.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-5 text-brand-royal shadow-sm">
                      <Icon className="w-6 h-6 text-brand-royal" />
                    </div>
                    <h4 className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight mb-2.5">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Pillar {idx + 1} of 6</span>
                    <span className="text-brand-royal font-bold">Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

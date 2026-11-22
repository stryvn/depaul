import React from "react";
import Image from "next/image";
import { Monitor, FlaskConical, Wifi, Video, ShieldCheck, Bus, Dumbbell, Sparkles } from "lucide-react";

export function AboutFacilities() {
  const facilities = [
    {
      title: "Advanced Physics & Chemistry Laboratories",
      category: "Practical Sciences",
      desc: "Fully equipped with modern apparatus, optical benches, analytical balances, and safety stations meeting rigorous CBSE Senior Secondary standards.",
      image: "/assets/attachments/physicslab.jpg",
      icon: FlaskConical,
      stats: "2 Dedicated Physical Science Labs",
    },
    {
      title: "Biology & Life Sciences Lab",
      category: "Biological Enquiry",
      desc: "Equipped with high-precision microscopes, botanical specimens, anatomical models, and observation bays for hands-on biological studies.",
      image: "/assets/attachments/biologylab.jpg",
      icon: Sparkles,
      stats: "High-Resolution Microscopy",
    },
    {
      title: "34 Audio-Visual Smart Classrooms",
      category: "Digital Pedagogy",
      desc: "Each classroom measures standard 37 sq m with interactive projection, digital multimedia boards, ergonomic student desks, and natural cross-ventilation.",
      image: "/assets/about-classroom.webp",
      icon: Monitor,
      stats: "34 AV Smart Rooms",
    },
    {
      title: "High-Speed Computer & Robotics Lab",
      category: "STEM & Computing",
      desc: "Networked workstations with high-speed internet, programming environments (Python, Scratch, C++), and robotics experimentation kits.",
      image: "/assets/about-learning.webp",
      icon: Wifi,
      stats: "Modern Networked PCs",
    },
    {
      title: "13,745 m² Hilltop Scenic Campus",
      category: "Campus Environment",
      desc: "Set on clean, pristine hill terrain in Rajamudy, offering open air, clean mountain drinking water, athletic fields, and peace for focused study.",
      image: "/assets/campus_exterior/drone-shot-final-frame.jpeg",
      icon: Dumbbell,
      stats: "13,745 m² Expanse",
    },
    {
      title: "Safe Corridors & 24/7 Security",
      category: "Student Safety",
      desc: "Campus-wide 24/7 CCTV surveillance, boundary walls, fire-safety compliance, and 52 modern hygienic restrooms (28 Boys, 24 Girls).",
      image: "/assets/attachments/hallway.jpg",
      icon: ShieldCheck,
      stats: "24/7 Monitored CCTV",
    },
  ];

  return (
    <section id="facilities" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
            Campus Infrastructure
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            World-Class Facilities on an Expansive Hilltop
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            De Paul Rajamudy provides an exceptional physical and digital learning infrastructure designed to stimulate scientific inquiry, creative expression, and athletic vitality.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold uppercase tracking-wider text-white">
                      <Icon className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{facility.category}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-brand-sky drop-shadow">
                      {facility.stats}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight group-hover:text-brand-royal transition-colors">
                      {facility.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 font-sans leading-relaxed">
                      {facility.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>CBSE Standard Verified</span>
                    <span className="text-brand-royal font-semibold">Active Daily</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Essential Amenities Banner */}
        <div className="mt-12 rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
          <h4 className="font-display font-bold text-lg text-slate-900 tracking-tight mb-4">
            Additional Campus Highlights & Health Standards
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <Bus className="w-5 h-5 text-brand-royal shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">School Bus Fleet</p>
                <p className="text-xs text-slate-500 mt-0.5">Reliable transport covering major mountain routes around Rajamudy and Murickassery.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 text-brand-crimson shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">CCTV Coverage</p>
                <p className="text-xs text-slate-500 mt-0.5">Round-the-clock recorded surveillance ensuring complete campus perimeter safety.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">52 Restrooms</p>
                <p className="text-xs text-slate-500 mt-0.5">28 boys&apos; and 24 girls&apos; modern sanitation units with dedicated hygiene attendants.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800">Purified Hill Water</p>
                <p className="text-xs text-slate-500 mt-0.5">Certified water purification stations providing clean drinking water across all blocks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

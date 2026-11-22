import React from "react";
import Image from "next/image";
import { Phone, Mail, Award, CheckCircle2, Quote, Shield } from "lucide-react";

export function AboutLeadership() {
  const leaders = [
    {
      name: "Rev. Fr. George Arackal",
      role: "Manager",
      affiliation: "Vincentian Congregation",
      phone: "+91 94465 74004",
      image: "/assets/leadership/Rev._Fr._George_Arackal.png",
      tagline: "Visionary Governance & Pastoral Stewardship",
      bio: "Provides strategic leadership guided by Vincentian principles, fostering institutional integrity, spiritual foundation, and collaborative trust across families and the Rajamudy community.",
      highlights: ["Vincentian Governance", "Institutional Strategy", "Community Outreach"],
    },
    {
      name: "Rev. Fr. Benedict Kuruppamtharamukalel VC",
      role: "Principal",
      affiliation: "Senior Administrator & Academic Leader",
      phone: "+91 95447 29133",
      image: "/assets/leadership/Rev._Fr._Benedict_Kuruppamtharamukalel_VC.jpeg",
      tagline: "Academic Direction & Student Flourishing",
      bio: "Directs academic operations and character formation, championing an inspiring environment where every child's unique talents are identified, nurtured, and elevated to excellence.",
      quote:
        "Every child possesses unique talents and immense potential. Guided by the Vincentian spirit of Service, Compassion, and Excellence, we encourage our students to become lifelong learners, responsible citizens, and compassionate leaders.",
      highlights: ["CBSE Academic Guidance", "Values Formation", "Holistic Mentorship"],
      featured: true,
    },
    {
      name: "Fr. Aloshi Kozhuppathadathil VC",
      role: "Bursar",
      affiliation: "Financial Administration & Infrastructure",
      phone: "+91 75104 43524",
      image: "/assets/leadership/Fr._Aloshi_Kozhuppathadathil_VC.png",
      tagline: "Campus Development & Resource Stewardship",
      bio: "Stewards campus infrastructural expansion, laboratory enhancements, modern IT equipment, and operational facilities with meticulous fiscal transparency.",
      highlights: ["Campus Infrastructure", "Lab Modernisation", "Operational Welfare"],
    },
  ];

  return (
    <section id="leadership" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
            Administrative Governance
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Guided by Dedicated Vincentian Leadership
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            De Paul Public School is administered by the Vincentian Fathers, combining century-old educational heritage with progressive CBSE academic governance.
          </p>
        </div>

        {/* Principal's Spotlight Feature */}
        <div className="mb-16 rounded-3xl bg-slate-900 text-white overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12">
          {/* Photo Column */}
          <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[440px] bg-slate-950">
            <Image
              src="/assets/leadership/Rev._Fr._Benedict_Kuruppamtharamukalel_VC.jpeg"
              alt="Rev. Fr. Benedict Kuruppamtharamukalel VC"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
          </div>

          {/* Details & Quote Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand-royal text-xs font-bold uppercase tracking-wider text-white">
                  Principal
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-brand-sky">
                  Vincentian Congregation
                </span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
                Rev. Fr. Benedict Kuruppamtharamukalel VC
              </h3>
              <p className="text-sm font-semibold text-brand-sky mt-1">
                Head of School & Academic Principal
              </p>

              <div className="mt-6 relative pl-6 border-l-2 border-brand-royal">
                <p className="font-sans italic text-slate-300 text-base sm:text-lg leading-relaxed">
                  &ldquo;Every child possesses unique talents and immense potential. Our responsibility is to create an inspiring environment where these gifts are discovered, nurtured, and developed. Guided by the Vincentian spirit of Service, Compassion, and Excellence, we encourage our students to become lifelong learners, responsible citizens, and compassionate leaders.&rdquo;
                </p>
              </div>

              <p className="mt-6 text-sm text-slate-400 font-sans leading-relaxed">
                Rev. Fr. Benedict oversees the holistic instructional ecosystem of De Paul, ensuring that CBSE curricular excellence goes hand-in-hand with student well-being, creative inquiry, and moral discipline.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Phone className="w-4 h-4 text-brand-sky" />
                <span>Office Direct:</span>
                <a href="tel:+919544729133" className="font-semibold text-white hover:text-brand-sky transition-colors">
                  +91 95447 29133
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Open Pastoral & Academic Guidance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manager & Bursar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manager */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm shrink-0">
                  <Image
                    src="/assets/leadership/Rev._Fr._George_Arackal.png"
                    alt="Rev. Fr. George Arackal"
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-royal/10 text-brand-royal text-[11px] font-bold uppercase tracking-wider">
                    Manager
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight mt-1.5">
                    Rev. Fr. George Arackal
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    Institutional Governance & Community Trust
                  </p>
                  <p className="text-xs text-brand-royal font-medium mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-royal" />
                    <a href="tel:+919446574004" className="hover:underline">
                      +91 94465 74004
                    </a>
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-600 leading-relaxed font-sans">
                Rev. Fr. George Arackal guides the overarching spiritual and institutional roadmap of De Paul Public School. He champions strong collaborative partnerships between teachers, parents, and community stakeholders.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Vincentian Governance", "Institutional Strategy", "Community Trust"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bursar */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm shrink-0">
                  <Image
                    src="/assets/leadership/Fr._Aloshi_Kozhuppathadathil_VC.png"
                    alt="Fr. Aloshi Kozhuppathadathil VC"
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-royal/10 text-brand-royal text-[11px] font-bold uppercase tracking-wider">
                    Bursar
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-slate-900 tracking-tight mt-1.5">
                    Fr. Aloshi Kozhuppathadathil VC
                  </h4>
                  <p className="text-xs font-semibold text-slate-500">
                    Finance & Campus Infrastructure
                  </p>
                  <p className="text-xs text-brand-royal font-medium mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-royal" />
                    <a href="tel:+917510443524" className="hover:underline">
                      +91 75104 43524
                    </a>
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-600 leading-relaxed font-sans">
                Fr. Aloshi manages institutional financial administration, budgetary stewardship, and infrastructural development with transparency and precision, sustaining the highest standards of safety, laboratories, and physical campus welfare.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Campus Infrastructure", "Lab Modernisation", "Operational Welfare"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Officers Bar */}
        <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-royal/10 text-brand-royal flex items-center justify-center font-bold text-sm shrink-0">
              <Shield className="w-5 h-5 text-brand-royal" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Senior Academic Officers</p>
              <p className="font-display font-semibold text-slate-900 text-sm sm:text-base">
                Vice-Principal: <span className="font-bold">Mr. Biju Paul (PGT, M.A)</span> • Coordinator: <span className="font-bold">Mr. Jijo C.B (TGT, M.A)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Coordinating 49+ Faculty Members across K-12</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

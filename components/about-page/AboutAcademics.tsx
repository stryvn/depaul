import React from "react";
import Image from "next/image";
import { GraduationCap, BookOpen, BrainCircuit, Compass, CheckCircle2, Award, UserCheck } from "lucide-react";

export function AboutAcademics() {
  const tiers = [
    {
      level: "Kindergarten & Early Years",
      grades: "Pre-KG • LKG • UKG",
      desc: "Child-centred playful exploration developing foundational phonics, motor agility, numerical curiosity, and warm social interaction.",
      points: ["Montessori-inspired play bays", "Language & phonics immersion", "Creative arts & rhythm", "Gentle pastoral care"],
      badge: "Foundational Stage",
    },
    {
      level: "Primary School",
      grades: "Classes I to V",
      desc: "Structured scholastic grounding with balanced emphasis on linguistic fluency (English, Malayalam, Hindi), arithmetic, and general science.",
      points: ["Activity-based experiential learning", "Environmental science discovery", "Daily moral and values education", "Introductory computer literacy"],
      badge: "Preparatory Stage",
    },
    {
      level: "Middle School",
      grades: "Classes VI to VIII",
      desc: "Transition to analytical reasoning with rigorous subject specialisation across physical sciences, algebra, world geography, and coding basics.",
      points: ["Hands-on laboratory demonstrations", "Coding & STEM robotics projects", "Debating & public speaking clubs", "House athletics & team sports"],
      badge: "Middle Stage",
    },
    {
      level: "Secondary School",
      grades: "Classes IX to X",
      desc: "Comprehensive preparation for the CBSE All India Secondary School Examination (AISSE) alongside character discipline and career orientation.",
      points: ["Individual CBSE syllabus mentoring", "Rigorous lab experiment schedules", "Regular mock examinations & reviews", "Remedial doubt-clearing sessions"],
      badge: "Secondary Stage",
    },
    {
      level: "Senior Secondary (Junior College)",
      grades: "Classes XI to XII",
      desc: "Specialised streams tailored for competitive national entrances (NEET, JEE, KEAM, CUET) and premier university degree admissions.",
      points: [
        "Science: Physics, Chem, Bio, Math / CS",
        "Commerce: Accountancy, Business, Economics, IP",
        "Focused competitive exam orientation",
        "Career guidance & counseling desk",
      ],
      badge: "Senior Secondary (CBSE)",
      highlight: true,
    },
  ];

  return (
    <section id="academics" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
            Academic Pathway
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Continuous Scholastic Excellence from KG to Class XII
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Our Central Board of Secondary Education (CBSE) curriculum is sequenced to cultivate deep conceptual mastery, moral courage, and future career readiness at each stage of a child&apos;s development.
          </p>
        </div>

        {/* 5-Stage Progression Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 sm:p-8 border flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? "bg-slate-900 text-white border-slate-800 shadow-xl md:col-span-2 lg:col-span-2"
                  : "bg-slate-50 text-slate-900 border-slate-200/90 shadow-sm hover:shadow-md hover:bg-white"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      tier.highlight
                        ? "bg-brand-royal text-white"
                        : "bg-brand-royal/10 text-brand-royal"
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      tier.highlight ? "text-brand-sky" : "text-slate-500"
                    }`}
                  >
                    {tier.grades}
                  </span>
                </div>

                <h3
                  className={`font-display font-bold text-xl sm:text-2xl tracking-tight ${
                    tier.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.level}
                </h3>

                <p
                  className={`mt-3 text-sm font-sans leading-relaxed ${
                    tier.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {tier.desc}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-200/40">
                  <ul className="space-y-2.5">
                    {tier.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            tier.highlight ? "text-emerald-400" : "text-brand-royal"
                          }`}
                        />
                        <span className={tier.highlight ? "text-slate-200" : "text-slate-700"}>
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {tier.highlight && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <span className="text-slate-400">
                    Provisional Senior Secondary Affiliation valid through March 2031
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/15 text-white font-semibold">
                    CBSE Code: 75543
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Faculty Excellence Feature */}
        <div className="rounded-3xl bg-[#f8fafc] border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          {/* Photo side */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] bg-slate-100">
            <Image
              src="/assets/attachments/teachers.jpg"
              alt="De Paul Public School Teachers and Faculty"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details side */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
                Faculty Body
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                49+ Qualified Educators Dedicated to Student Success
              </h3>
              <p className="mt-4 text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Our teaching fraternity consists of experienced Post Graduate Teachers (PGT), Trained Graduate Teachers (TGT), and Primary Teachers (PRT) holding postgraduate credentials (M.Sc, M.A, M.Ed, B.Ed).
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <p className="font-display font-bold text-xl text-brand-royal">1 : 25</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Teacher-Student Ratio</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <p className="font-display font-bold text-xl text-brand-royal">100%</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">CBSE Pass Record</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                  <p className="font-display font-bold text-xl text-brand-royal">Weekly</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Doubt Clarification</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs sm:text-sm text-slate-600">
                Continuous teacher training workshops aligned with NEP 2020 pedagogical norms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

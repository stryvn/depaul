"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Quote } from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import { AboutMotionGallery } from "@/components/about/AboutMotionGallery";

export interface DetailedAboutTopic {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  photo: string;
  position: string;
  summary: string;
  description: string;
  points: string[];
  stats: { label: string; value: string }[];
  quote?: string;
  quoteAuthor?: string;
}

export const DETAILED_ABOUT_TOPICS: DetailedAboutTopic[] = [
  {
    id: "history",
    number: "01",
    title: "History & Foundation",
    category: "Heritage",
    tagline: "Since 2002 in Rajamudy, Idukki",
    photo: "/assets/about-campus.webp",
    position: "49% 51%",
    summary:
      "Founded in 2002 under the spiritual patronage of the Vincentian Fathers (Marymatha Province), De Paul Public School was established to bring high-caliber CBSE education to the high ranges of Idukki.",
    description:
      "Starting from humble beginnings, De Paul has blossomed into an expansive 13,745 square-meter Senior Secondary institution affiliated with CBSE New Delhi (Affiliation No. 930624). Over the past two decades, the institution has stood as an academic beacon, upholding a flawless 100% board examination pass record while nurturing generations of responsible, morally upright citizens who serve across the globe.",
    points: [
      "Founded in 2002 by the Vincentian Congregation",
      "Located in the serene mountain environs of Rajamudy, Idukki",
      "Provisional Senior Secondary CBSE affiliation extended until 2031",
      "Continuous comprehensive education from Kindergarten to Class XII",
    ],
    stats: [
      { label: "Year Founded", value: "2002" },
      { label: "Affiliation No.", value: "930624" },
      { label: "Campus Expanse", value: "13,745 m²" },
      { label: "Board Pass Record", value: "100%" },
    ],
  },
  {
    id: "values",
    number: "02",
    title: "Values & Institutional Ethos",
    category: "Vincentian Charism",
    tagline: "For God & Country",
    photo: "/assets/about-community.webp",
    position: "44% 46%",
    summary:
      "Our educational philosophy is anchored in the timeless motto 'For God & Country', inspired by the compassionate life and selfless service of St. Vincent de Paul.",
    description:
      "At De Paul, academic distinction is inseparable from ethical character formation. We strive to cultivate empathy, civic responsibility, and moral courage. Through student-led community outreach, environmental preservation drives across the Western Ghats, and daily values reflection, students learn that true greatness lies in selfless service to humanity.",
    points: [
      "Institutional motto: 'For God & Country'",
      "Compassionate outreach to the underprivileged and rural community",
      "Character formation, self-discipline, and spiritual grounding",
      "Active eco-conservation drives preserving Idukki's natural ecology",
    ],
    stats: [
      { label: "Governing Body", value: "Vincentian Fathers" },
      { label: "Province", value: "Marymatha Province" },
      { label: "Core Pillars", value: "Service & Integrity" },
      { label: "Student Houses", value: "4 Active Houses" },
    ],
  },
  {
    id: "leadership",
    number: "03",
    title: "Leadership & Administration",
    category: "Governance",
    tagline: "Visionary Direction & Pastoral Care",
    photo: "/assets/leadership/Rev._Fr._Benedict_Kuruppamtharamukalel_VC.jpeg",
    position: "50% 30%",
    summary:
      "Led by experienced Vincentian administrators dedicated to academic rigour, student well-being, and modern campus infrastructure.",
    description:
      "Under the guidance of Manager Rev. Fr. George Arackal, Principal Rev. Fr. Benedict Kuruppamtharamukalel VC, and Bursar Fr. Aloshi Kozhuppathadathil VC, De Paul operates with visionary clarity and pastoral dedication. The leadership maintains an open-door policy for parents and fosters a collaborative community where every student is mentored to realize their fullest potential.",
    quote:
      "Every child possesses unique talents and immense potential. Guided by the Vincentian spirit of Service, Compassion, and Excellence, we encourage our students to become lifelong learners, responsible citizens, and compassionate leaders.",
    quoteAuthor: "Rev. Fr. Benedict Kuruppamtharamukalel VC — Principal",
    points: [
      "Rev. Fr. George Arackal — Manager (+91 94465 74004)",
      "Rev. Fr. Benedict Kuruppamtharamukalel VC — Principal (+91 95447 29133)",
      "Fr. Aloshi Kozhuppathadathil VC — Bursar (+91 75104 43524)",
      "Mr. Biju Paul (Vice-Principal) & Mr. Jijo C.B (Academic Coordinator)",
    ],
    stats: [
      { label: "Manager", value: "Fr. George Arackal" },
      { label: "Principal", value: "Fr. Benedict VC" },
      { label: "Bursar", value: "Fr. Aloshi VC" },
      { label: "Office Phone", value: "+91 96056 02400" },
    ],
  },
  {
    id: "faculty",
    number: "04",
    title: "Faculty & Teaching Excellence",
    category: "Academic Fraternity",
    tagline: "49+ Qualified Educators Dedicated to Mentorship",
    photo: "/assets/attachments/teachers.jpg",
    position: "56% 42%",
    summary:
      "A distinguished teaching fraternity combining deep subject mastery with nurturing pedagogical care across all scholastic tiers.",
    description:
      "Our faculty comprises 49+ qualified teachers holding Post Graduate (M.Sc, M.A), Graduate (B.Sc, B.Com, B.A), and education degrees (B.Ed, M.Ed). With a low student-to-teacher ratio (1:25), our teachers provide individual attention, conduct weekly remedial and doubt-clarification clinics, and guide students towards success in competitive national entrance examinations (NEET, JEE, KEAM).",
    points: [
      "Experienced PGT, TGT, and PRT educators across all disciplines",
      "Personalized student attention with a healthy 1:25 teacher-student ratio",
      "Continuous teacher training workshops aligned with CBSE & NEP 2020",
      "Specialized mentorship for NEET, JEE, and Olympiad aspirants",
    ],
    stats: [
      { label: "Teaching Staff", value: "49+ Educators" },
      { label: "Ratio", value: "1 : 25" },
      { label: "Senior Secondary", value: "Science & Commerce" },
      { label: "Board Success", value: "100% Pass" },
    ],
  },
  {
    id: "facilities",
    number: "05",
    title: "Campus Facilities & STEM Labs",
    category: "Infrastructure",
    tagline: "Experiential Learning & Modern Science Laboratories",
    photo: "/assets/about-learning.webp",
    position: "52% 48%",
    summary:
      "Comprehensive physical and digital infrastructure designed to stimulate scientific inquiry, creative curiosity, and physical vitality.",
    description:
      "De Paul provides state-of-the-art facilities across its scenic 13,745 m² campus. These include 6 dedicated modern laboratories (Physics, Chemistry, Biology, Mathematics, Robotics, and Computer Science), 34 tech-enabled audio-visual classrooms, an extensive library, full athletic grounds, 24/7 CCTV security, and a GPS-enabled bus transit fleet serving high-range routes.",
    points: [
      "6 fully equipped laboratories (Physics, Chemistry, Biology, IT & Robotics)",
      "34 spacious audio-visual smart classrooms with interactive projection",
      "Campus-wide high-speed broadband networking and computing bays",
      "24/7 CCTV surveillance, 52 hygienic restrooms, and mountain bus fleet",
    ],
    stats: [
      { label: "Classrooms", value: "34 AV Smart Rooms" },
      { label: "Laboratories", value: "6 Modern Labs" },
      { label: "Campus Size", value: "13,745 m²" },
      { label: "Surveillance", value: "24/7 CCTV" },
    ],
  },
];

export function AboutInteractivePage() {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white bg-[#f8fafc]">
      {/* 1. The Same Navbar From Home Page (Full State) */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-20">
        {/* 2. Hero Section: "About De Paul" heading + Homepage About Section */}
        <section className="py-8 sm:py-12 border-b border-slate-200/80">
          {/* "About De Paul" Heading - Aligned with the left edge of the navbar */}
          <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0">
            <div className="mb-8 sm:mb-12">
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight">
                About De Paul
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-600 font-sans max-w-2xl leading-relaxed">
                Rooted in the Vincentian tradition of service, compassion, and academic rigour under the motto{" "}
                <span className="font-semibold text-slate-900 italic">&ldquo;For God & Country&rdquo;</span>.
              </p>
            </div>
          </div>

          {/* Homepage About Section (Interactive Gallery) */}
          <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0">
            <AboutMotionGallery skipIntro={true} showCta={false} />
          </div>
        </section>

        {/* 3. Detailed Cards Kept Under This Hero Section */}
        <section className="py-12 sm:py-20 bg-white">
          <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0 divide-y divide-slate-200/80 space-y-12 sm:space-y-16">
            {DETAILED_ABOUT_TOPICS.map((topic, idx) => {
              return (
                <div
                  key={topic.id}
                  id={`card-${topic.id}`}
                  className={idx === 0 ? "" : "pt-12 sm:pt-16"}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Column: Rounded Thumbnail */}
                    <div className="md:col-span-5 lg:col-span-5">
                      <div className="relative aspect-[3/4] sm:aspect-[4/5] md:h-[480px] w-full rounded-[36px] sm:rounded-[44px] overflow-hidden bg-slate-100">
                        <Image
                          src={topic.photo}
                          alt={topic.title}
                          fill
                          priority={idx === 0}
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover"
                          style={{ objectPosition: topic.position }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="inline-block px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                            {topic.tagline}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Topic Details */}
                    <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-center">
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
                        {topic.title}
                      </h2>
                      <p className="text-base sm:text-lg text-brand-royal font-semibold mt-1">
                        {topic.tagline}
                      </p>

                      <p className="mt-4 text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
                        {topic.description}
                      </p>

                      {/* Principal's Quote if Leadership card */}
                      {topic.quote && (
                        <div className="mt-5 pl-5 border-l-2 border-brand-royal py-1">
                          <Quote className="w-5 h-5 text-brand-royal mb-2" />
                          <p className="italic text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
                            &ldquo;{topic.quote}&rdquo;
                          </p>
                          <p className="text-xs font-bold uppercase tracking-wider text-brand-royal mt-2">
                            {topic.quoteAuthor}
                          </p>
                        </div>
                      )}

                      {/* Key Points Bullet List */}
                      <div className="mt-6 pt-6 border-t border-slate-200/60">
                        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-3">
                          Key Details & Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {topic.points.map((pt, pIdx) => (
                            <div
                              key={pIdx}
                              className="flex items-start gap-2.5 text-sm sm:text-base text-slate-800"
                            >
                              <CheckCircle2 className="w-5 h-5 text-brand-royal shrink-0 mt-0.5" />
                              <span className="font-medium">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stat Metrics Grid */}
                      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/60">
                        {topic.stats.map((stat, sIdx) => (
                          <div key={sIdx}>
                            <p className="font-display font-bold text-lg sm:text-xl text-slate-900">
                              {stat.value}
                            </p>
                            <p className="text-[11px] text-slate-500 font-semibold uppercase mt-0.5">
                              {stat.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

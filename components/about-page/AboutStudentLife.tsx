import React from "react";
import Image from "next/image";
import { Trophy, Palette, Trees, Heart, Sparkles, Music } from "lucide-react";

export function AboutStudentLife() {
  const events = [
    {
      title: "Nexora 2k26 — Annual Cultural Fest",
      category: "Arts & Culture",
      desc: "A celebration of student talent spanning classical and contemporary dance, vocal music, instrumental recitals, theatrical drama, and visual arts exhibitions.",
      image: "/assets/events/Nexora2k26.jpeg",
      icon: Palette,
      date: "Annual Grand Showcase",
    },
    {
      title: "Annual Athletics & Sports Meet",
      category: "Sports & Athletics",
      desc: "Inter-house athletic championships featuring track and field sprints, relays, high jump, shot put, football, and badminton tournaments encouraging sportsmanship.",
      image: "/assets/events/sportsday01.jpeg",
      icon: Trophy,
      date: "Inter-House Championship",
    },
    {
      title: "Environment Day & Green Hills Project",
      category: "Ecology & Sustainability",
      desc: "Student-led tree planting drives, environmental awareness campaigns, and organic gardening across Rajamudy to preserve the Western Ghats ecosystem.",
      image: "/assets/events/environmentday.jpg",
      icon: Trees,
      date: "Eco-Club Initiative",
    },
    {
      title: "Children's Day Celebrations",
      category: "Community Joy",
      desc: "Fun-filled campus galas with faculty stage performances, games, literary quiz competitions, and sweet distributions celebrating the spark of childhood.",
      image: "/assets/events/childrensday.jpeg",
      icon: Heart,
      date: "November Festivities",
    },
  ];

  return (
    <section id="student-life" className="py-20 sm:py-28 bg-[#f8fafc] relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-royal/10 border border-brand-royal/20 text-brand-royal text-xs font-bold uppercase tracking-wider mb-4">
            Co-Curricular Culture
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
            Vibrant Student Life Beyond the Classroom
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Education at De Paul encompasses athletics, artistic discovery, leadership clubs, and environmental stewardship, ensuring every learner thrives in mind, body, and spirit.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, idx) => {
            const Icon = event.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                      <Icon className="w-3.5 h-3.5 text-brand-sky" />
                      <span>{event.category}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-sky">
                      {event.date}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    {event.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>De Paul Traditions</span>
                    <span className="text-brand-royal">Active Participation</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Houses & Clubs Pill Row */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg">
              House System & Student Clubs
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Fostering teamwork, healthy rivalry, and leadership through inter-house points.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              "St. Vincent House",
              "Blue Sapphire House",
              "Green Emerald House",
              "Red Ruby House",
              "Robotics & Coding Club",
              "Eco Club",
              "Literary & Debating Society",
            ].map((club, cIdx) => (
              <span
                key={cIdx}
                className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700"
              >
                {club}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

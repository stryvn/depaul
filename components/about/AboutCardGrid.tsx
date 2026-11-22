"use client";

import React, { useState } from "react";
import { History, HeartHandshake, Award, GraduationCap, Building2 } from "lucide-react";
import { AboutCard, AboutItem } from "./AboutCard";
import { cn } from "../ui/utils";

export const ABOUT_DATA: AboutItem[] = [
  {
    id: 1,
    title: "History",
    tagline: "Legacy of Service",
    description:
      "Founded under the patronage of the Vincentian Congregation, De Paul Public School Rajamudy has stood as a beacon of quality education and moral values in Idukki district for decades.",
    icon: History,
    badge: "Est. Heritage",
    color: "from-blue-600 to-indigo-700",
    image: "/assets/campus_exterior/drone-shot-final-frame.jpeg",
  },
  {
    id: 2,
    title: "Values",
    tagline: "For God & Country",
    description:
      "Rooted in compassion, integrity, and discipline. We cultivate ethical leadership, respect for cultural diversity, and holistic human growth guided by our patron St. Vincent de Paul.",
    icon: HeartHandshake,
    badge: "Core Ethos",
    color: "from-red-600 to-amber-600",
    image: "/assets/attachments/explanation.jpg",
  },
  {
    id: 3,
    title: "Leadership",
    tagline: "Visionary Guidance",
    description:
      "A dedicated governance board and experienced principal leading institutional transformation, fostering academic excellence, modern pedagogy, and student well-being.",
    icon: Award,
    badge: "Direction",
    color: "from-amber-600 to-yellow-600",
    image: "/assets/leadership/Rev._Fr._George_Arackal.png",
  },
  {
    id: 4,
    title: "Faculty",
    tagline: "Passionate Mentors",
    description:
      "Highly qualified, empathetic educators committed to student-centric learning, experiential education, and continuous curriculum enrichment in every subject.",
    icon: GraduationCap,
    badge: "Academics",
    color: "from-emerald-600 to-teal-700",
    image: "/assets/attachments/teachers.jpg",
  },
  {
    id: 5,
    title: "Facilities",
    tagline: "Modern Campus",
    description:
      "Advanced physics, chemistry and biology laboratories, cutting-edge IT infrastructure, spacious smart classrooms, and serene campus grounds in Rajamudy.",
    icon: Building2,
    badge: "Infrastructure",
    color: "from-purple-600 to-indigo-800",
    image: "/assets/attachments/physicslab.jpg",
  },
];

export function AboutCardGrid() {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <div>
      {/* Desktop Layout: 5 cards inline row */}
      <div className="hidden lg:grid lg:grid-cols-5 gap-6">
        {ABOUT_DATA.map((item) => (
          <AboutCard key={item.id} item={item} />
        ))}
      </div>

      {/* Mobile Layout: Dynamic active card layout */}
      <div className="lg:hidden">
        <p className="text-xs text-center text-slate-500 mb-4 select-none">
          Tap any card to view detailed overview
        </p>

        {/* Dynamic Grid depending on active card */}
        <div className="grid grid-cols-2 gap-3.5">
          {ABOUT_DATA.map((item) => {
            const isActive = item.id === activeId;
            return (
              <div
                key={item.id}
                className={cn(
                  "transition-all duration-300",
                  isActive ? "col-span-2 row-span-2" : "col-span-1"
                )}
              >
                <AboutCard
                  item={item}
                  isActive={isActive}
                  isMobileLayout={true}
                  onClick={() => setActiveId(item.id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

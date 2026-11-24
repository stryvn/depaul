"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import "./about-motion.css";

export interface AboutTopic {
  id: string;
  title: string;
  tagline: string;
  photo: string;
  position: string;
  points: string[];
  mobilePoints?: string[];
}

export const ABOUT_TOPICS: AboutTopic[] = [
  {
    id: "history",
    title: "History",
    tagline: "Since 2002",
    photo: "/assets/about-campus.webp",
    position: "49% 51%",
    points: [
      "Founded in 2002",
      "Based in Rajamudy, Idukki",
      "Rooted in the Vincentian tradition",
      "Kindergarten to Senior Secondary",
    ],
    mobilePoints: [
      "Founded in 2002",
      "Rajamudy, Idukki",
      "Vincentian roots",
      "Kindergarten to Senior Secondary",
    ],
  },
  {
    id: "values",
    title: "Values",
    tagline: "For God & Country",
    photo: "/assets/about-community.webp",
    position: "44% 46%",
    points: [
      "For God & Country",
      "Service to others",
      "Compassion in school life",
      "Education guided by character",
    ],
    mobilePoints: [
      "For God & Country",
      "Service to others",
      "Compassion",
      "Character",
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    tagline: "Meet the principal",
    photo: "/assets/about-principal.webp",
    position: "50% 39%",
    points: [
      "Rev. Fr. Benedict Kuruppamtharamukalel VC",
      "Principal",
      "Leads De Paul in Rajamudy",
      "Guides the school’s Vincentian mission",
    ],
    mobilePoints: [
      "Rev. Fr. Benedict Kuruppamtharamukalel VC",
      "Principal",
      "Leads De Paul in Rajamudy",
      "Vincentian mission",
    ],
  },
  {
    id: "faculty",
    title: "Faculty",
    tagline: "The people who teach",
    photo: "/assets/about-classroom.webp",
    position: "56% 42%",
    points: [
      "Teachers from Kindergarten to Senior Secondary",
      "Classroom teaching",
      "Support during practical work",
      "Guidance into Senior Secondary",
    ],
    mobilePoints: [
      "Kindergarten to Senior Secondary",
      "Classroom teaching",
      "Practical work",
      "Senior Secondary guidance",
    ],
  },
  {
    id: "facilities",
    title: "Facilities",
    tagline: "Learning by doing",
    photo: "/assets/about-learning.webp",
    position: "52% 48%",
    points: [
      "Science laboratories",
      "Spaces for arts",
      "Sports facilities",
      "Technology for practical learning",
    ],
    mobilePoints: [
      "Science labs",
      "Arts spaces",
      "Sports facilities",
      "Technology",
    ],
  },
];

interface AboutMotionGalleryProps {
  skipIntro?: boolean;
  showCta?: boolean;
}

export function AboutMotionGallery({ showCta = true }: AboutMotionGalleryProps) {
  // Default to index 2 (Leadership)
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const activeTopic = ABOUT_TOPICS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ABOUT_TOPICS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === ABOUT_TOPICS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="depaul-about-root w-full select-none">
      <div className="about-gallery">
        {/* ── Desktop Accordion (>= 901px) ── */}
        <div className="about-gallery-window about-track-desktop">
          <div className="about-track" role="group" aria-label="About De Paul topics">
            {ABOUT_TOPICS.map((topic, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={topic.id}
                  className="about-card group"
                  data-active={isActive ? "true" : "false"}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                >
                  {/* Photo container */}
                  <div className="about-thumb">
                    <Image
                      src={topic.photo}
                      alt={topic.title}
                      fill
                      sizes="(max-width: 900px) 240px, 460px"
                      priority={index === 2}
                      style={{ objectPosition: topic.position }}
                    />
                  </div>

                  {/* Content container */}
                  <div className="about-card-content">
                    {isActive && topic.id === "facilities" ? (
                      <Link
                        href="/about#facilities"
                        className="about-title-link group/title"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Navigate to facilities section on about page"
                      >
                        <span className="font-display font-bold text-[clamp(1.65rem,2.7vw,2.35rem)] leading-[1.05] tracking-[-0.03em] text-[#0256a1] group-hover/title:text-[#036bc7]">
                          {topic.title}
                        </span>
                        <span className="about-title-arrow">
                          <ArrowUpRight className="w-4 h-4 text-[#0256a1]" />
                        </span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="about-card-trigger"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(index);
                        }}
                      >
                        <span>{topic.title}</span>
                      </button>
                    )}

                    {!isActive ? (
                      <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-1">
                        {topic.tagline}
                      </p>
                    ) : (
                      <ul className="about-points">
                        {topic.points.map((point, pIdx) => (
                          <li key={pIdx}>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── Mobile Deck (<= 900px) ── */}
        <div className="about-mobile-deck">
          {/* Scrollable / Tap Topic Selector Pills */}
          <div className="about-mobile-tabs" role="tablist" aria-label="About De Paul topics">
            {ABOUT_TOPICS.map((topic, i) => {
              const isCurrent = activeIndex === i;
              return (
                <button
                  key={topic.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className="about-mobile-tab-pill"
                  data-active={isCurrent ? "true" : "false"}
                  onClick={() => setActiveIndex(i)}
                >
                  {topic.title}
                </button>
              );
            })}
          </div>

          {/* Focused Topic Card */}
          <article className="about-mobile-card" aria-live="polite">
            <div className="about-mobile-thumb">
              <Image
                src={activeTopic.photo}
                alt={activeTopic.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 500px"
                className="object-cover"
                style={{ objectPosition: activeTopic.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                  {activeTopic.tagline}
                </span>
                {/* Arrow navigation buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous topic"
                    className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next topic"
                    className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="about-mobile-content">
              <h3 className="about-mobile-title">{activeTopic.title}</h3>
              <p className="about-mobile-tagline">{activeTopic.tagline}</p>
              <ul className="about-mobile-points">
                {(activeTopic.mobilePoints || activeTopic.points).map((pt, idx) => (
                  <li key={idx}>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* ── Bottom Control Bar & Action CTA ── */}
        <div className="about-controls">
          <div className="about-positions hidden min-[901px]:flex" aria-label="Select a topic" role="group">
            {ABOUT_TOPICS.map((topic, i) => {
              const isCurrent = activeIndex === i;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className="about-position-pill"
                  data-current={isCurrent ? "true" : "false"}
                  aria-label={topic.title}
                  title={topic.title}
                  onClick={() => setActiveIndex(i)}
                />
              );
            })}
          </div>

          {/* Primary CTA to /about */}
          {showCta && (
            <Link href="/about" className="ed-section-cta">
              About De Paul
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

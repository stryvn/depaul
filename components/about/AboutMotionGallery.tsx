"use client";

import React, { useEffect, useRef, useState } from "react";
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

const AUTO_PLAY_DELAY = 4500;
const MANUAL_SELECTION_DELAY = 7000;

interface AboutMotionGalleryProps {
  skipIntro?: boolean;
  showCta?: boolean;
}

export function AboutMotionGallery({ showCta = true }: AboutMotionGalleryProps) {
  const [selection, setSelection] = useState({ index: 2, delay: AUTO_PLAY_DELAY });
  const [canAutoPlay, setCanAutoPlay] = useState(false);
  const desktopGalleryRef = useRef<HTMLDivElement>(null);
  const activeIndex = selection.index;
  const activeTopic = ABOUT_TOPICS[activeIndex];

  useEffect(() => {
    const gallery = desktopGalleryRef.current;
    if (!gallery || !("IntersectionObserver" in window)) return;

    const desktopMotion = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let inView = false;
    const updateAutoPlay = () => {
      setCanAutoPlay(inView && desktopMotion.matches && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      updateAutoPlay();
    }, { threshold: 0.2 });

    observer.observe(gallery);
    desktopMotion.addEventListener("change", updateAutoPlay);
    document.addEventListener("visibilitychange", updateAutoPlay);
    return () => {
      observer.disconnect();
      desktopMotion.removeEventListener("change", updateAutoPlay);
      document.removeEventListener("visibilitychange", updateAutoPlay);
    };
  }, []);

  useEffect(() => {
    if (!canAutoPlay) return;

    const timer = window.setTimeout(() => {
      setSelection((current) => current === selection
        ? { index: (current.index + 1) % ABOUT_TOPICS.length, delay: AUTO_PLAY_DELAY }
        : current);
    }, selection.delay);

    return () => window.clearTimeout(timer);
  }, [canAutoPlay, selection]);

  const selectTopic = (index: number) => setSelection({ index, delay: MANUAL_SELECTION_DELAY });
  const handlePrev = () => selectTopic((activeIndex + ABOUT_TOPICS.length - 1) % ABOUT_TOPICS.length);
  const handleNext = () => selectTopic((activeIndex + 1) % ABOUT_TOPICS.length);

  return (
    <div className="depaul-about-root w-full select-none">
      <div className="about-gallery">
        {/* ── Desktop Accordion (>= 901px) ── */}
        <div className="about-gallery-window about-track-desktop" ref={desktopGalleryRef}>
          <div className="about-track" role="group" aria-label="About De Paul topics">
            {ABOUT_TOPICS.map((topic, index) => {
              const isActive = activeIndex === index;

              return (
                <article
                  key={topic.id}
                  className="about-card group"
                  data-active={isActive ? "true" : "false"}
                  onClick={() => selectTopic(index)}
                  aria-expanded={isActive}
                >
                  {/* Photo container */}
                  <div className="about-thumb">
                    <Image
                      src={topic.photo}
                      alt={topic.title}
                      fill
                      sizes="(max-width: 900px) 240px, 460px"

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
                          selectTopic(index);
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
                  onClick={() => selectTopic(i)}
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
                  onClick={() => selectTopic(i)}
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

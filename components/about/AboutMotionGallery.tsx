"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      "Leads De Paul",
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

const INITIAL_CELLS = [0, 2, 3, 4, 5]; // 2x3 grid positions

interface AboutMotionGalleryProps {
  skipIntro?: boolean;
  showCta?: boolean;
}

export function AboutMotionGallery({ skipIntro = false, showCta = true }: AboutMotionGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default to middle card (Leadership)
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [cells, setCells] = useState<number[]>(INITIAL_CELLS);
  const [emptyCell, setEmptyCell] = useState<number>(1);
  const [announcement, setAnnouncement] = useState<string>("");
  const [hasPlayedIntro, setHasPlayedIntro] = useState<boolean>(skipIntro);

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileBusyRef = useRef<boolean>(false);
  const introVersionRef = useRef<number>(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Match viewport size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Automatic progression logic (every 4.5s on desktop, resets on user interaction)
  const scheduleNext = useCallback((delay = 4500) => {
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    if (isMobile) return; // desktop accordion feature

    autoPlayTimerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % ABOUT_TOPICS.length);
    }, delay);
  }, [isMobile]);

  // Keep auto-play running sequentially
  useEffect(() => {
    if (!hasPlayedIntro || isMobile) return;
    scheduleNext(4500);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [activeIndex, hasPlayedIntro, isMobile, scheduleNext]);

  // Web Animations API Intro Animation (identical to reference site)
  const playIntro = useCallback(() => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const track = trackRef.current;
    if (!track) return;

    introVersionRef.current += 1;
    const version = introVersionRef.current;
    const centerIndex = 2; // Middle card (Leadership)
    const centerEl = cardRefs.current[centerIndex];
    if (!centerEl) return;

    track.setAttribute("data-intro", "true");
    const centerCard = centerEl.getBoundingClientRect();

    const animations = cardRefs.current.map((card, index) => {
      if (!card) return null;
      if (index === centerIndex) {
        return card.animate(
          [
            { transform: "translateY(23px) scale(0.92)", opacity: 0 },
            { transform: "translateY(0) scale(1)", opacity: 1 },
          ],
          { duration: 570, easing: "cubic-bezier(0.22, 0.72, 0.2, 1)", fill: "both" }
        );
      }

      const bounds = card.getBoundingClientRect();
      const x = centerCard.left + centerCard.width / 2 - (bounds.left + bounds.width / 2);
      const y = centerCard.top + centerCard.height / 2 - (bounds.top + bounds.height / 2);
      const outer = Math.abs(index - centerIndex) > 1;

      return card.animate(
        [
          { transform: `translate(${x}px, ${y}px) scale(0.72)`, opacity: 0 },
          { opacity: 0.94, offset: 0.44 },
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
        ],
        {
          duration: 780,
          delay: outer ? 525 : 420,
          easing: "cubic-bezier(0.22, 0.67, 0.22, 1)",
          fill: "both",
        }
      );
    });

    Promise.allSettled(
      animations.filter((a): a is Animation => Boolean(a)).map((a) => a.finished)
    ).then(() => {
      if (version === introVersionRef.current && track) {
        track.removeAttribute("data-intro");
      }
    });
  }, []);

  // Trigger intro on view entry via IntersectionObserver
  useEffect(() => {
    if (skipIntro || hasPlayedIntro) return;
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedIntro) {
            setHasPlayedIntro(true);
            playIntro();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, [hasPlayedIntro, playIntro]);

  // Mobile tile sliding neighbors
  const getNeighbors = (cell: number) => {
    const colNeighbor = cell ^ 1;
    return [colNeighbor, cell - 2, cell + 2].filter((i) => i >= 0 && i < 6);
  };

  const routeEmptyCell = useCallback((target: number, currentEmpty: number) => {
    const destinations = getNeighbors(target);
    const queue: number[][] = [[currentEmpty]];
    const visited = new Set<number>([currentEmpty, target]);

    for (const path of queue) {
      const cell = path[path.length - 1];
      if (destinations.includes(cell)) return path.slice(1);
      for (const next of getNeighbors(cell)) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push([...path, next]);
        }
      }
    }
    return [];
  }, []);

  const selectTopic = useCallback(
    (index: number) => {
      setAnnouncement(`${ABOUT_TOPICS[index].title}, topic ${index + 1} of ${ABOUT_TOPICS.length}`);

      if (!isMobile) {
        // Desktop: expand selected card, pause auto-play and resume after 6 seconds
        setActiveIndex(index);
        scheduleNext(6000);
        return;
      }

      // Mobile: slide tiles smoothly
      if (mobileBusyRef.current || index === activeIndex) return;
      mobileBusyRef.current = true;

      setCells((prevCells) => {
        let currentEmpty = emptyCell;
        const newCells = [...prevCells];

        if (activeIndex >= 0) {
          const prevCell = newCells[activeIndex];
          newCells[activeIndex] = currentEmpty;
          currentEmpty = prevCell;
        }

        const path = routeEmptyCell(newCells[index], currentEmpty);
        for (const nextCell of path) {
          const movedIdx = newCells.indexOf(nextCell);
          if (movedIdx !== -1) {
            newCells[movedIdx] = currentEmpty;
            currentEmpty = nextCell;
          }
        }

        setEmptyCell(currentEmpty);
        return newCells;
      });

      setActiveIndex(index);
      setTimeout(() => {
        mobileBusyRef.current = false;
      }, 250);
    },
    [isMobile, activeIndex, emptyCell, routeEmptyCell]
  );

  return (
    <div className="depaul-about-root w-full select-none">
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <div className="about-gallery">
        <div className="about-gallery-window">
          <div ref={trackRef} className="about-track" role="group" aria-label="About De Paul topics">
            {ABOUT_TOPICS.map((topic, index) => {
              const isActive = activeIndex === index;

              // Mobile positioning variables
              const cell = cells[index];
              const isWide = isActive && Math.floor(cell / 2) === Math.floor(emptyCell / 2);
              const firstCell = isActive ? Math.min(cell, emptyCell) : cell;
              const row = Math.floor(firstCell / 2);
              const col = firstCell % 2;
              const rowSpan = isActive && !isWide ? 2 : 1;
              const colSpan = isWide ? 2 : 1;

              const mobileStyle = isMobile
                ? ({
                    "--row": row,
                    "--column": col,
                    "--rows": rowSpan,
                    "--columns": colSpan,
                  } as React.CSSProperties)
                : undefined;

              return (
                <article
                  key={topic.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="about-card group"
                  data-active={isActive ? "true" : "false"}
                  data-wide={isWide ? "true" : "false"}
                  style={mobileStyle}
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
                          selectTopic(index);
                        }}
                      >
                        <span>{topic.title}</span>
                      </button>
                    )}

                    {/* Compact teaser shown when collapsed, replaced by detailed points when active */}
                    {!isActive ? (
                      <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-1">
                        {topic.tagline}
                      </p>
                    ) : (
                      <ul className="about-points">
                        {(isMobile && topic.mobilePoints ? topic.mobilePoints : topic.points).map(
                          (point, pIdx) => (
                            <li key={pIdx}>
                              <span>{point}</span>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Control Bar & Action CTA */}
        <div className="about-controls">
          <div className="about-positions" aria-label="Select a topic" role="group">
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

          {/* Primary CTA to /about following De Paul tactile button guidelines */}
          {showCta && (
            <Link
              href="/about"
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-b from-[#0262b6] to-[#02498b] hover:from-[#036bc7] hover:to-[#02539d] text-white text-xs sm:text-sm font-semibold tracking-wide border border-white/20 hover:border-white/40 shadow-[0_4px_20px_rgba(2,86,161,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_4px_26px_rgba(2,86,161,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] transition-all duration-300 active:scale-[0.98]"
            >
              <span>Explore Full About Us</span>
              <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-200">
                <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

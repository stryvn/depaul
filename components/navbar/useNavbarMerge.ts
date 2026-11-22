"use client";

import { useState, useEffect } from "react";

export function useNavbarMerge(sentinelId: string = "bottom-nav-sentinel") {
  const [isMerged, setIsMerged] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) {
      // Fallback: check window scroll if sentinel not ready
      const handleScroll = () => {
        const heroHeight = window.innerHeight;
        setIsMerged(window.scrollY > heroHeight - 120);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel scrolls out of view above top or reaches threshold, trigger merge
        const bounding = entry.boundingClientRect;
        const rootTop = entry.rootBounds ? entry.rootBounds.top : 0;
        
        // If bottom nav sentinel has scrolled past the top navbar area (~80px from top)
        if (!entry.isIntersecting && bounding.top <= 90) {
          setIsMerged(true);
        } else if (entry.isIntersecting && bounding.top > 90) {
          setIsMerged(false);
        }
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: [0, 1.0],
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [sentinelId]);

  return { isMerged };
}

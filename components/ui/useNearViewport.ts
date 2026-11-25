"use client";

import { useEffect, useRef, useState } from "react";

export function useNearViewport() {
  const ref = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!("IntersectionObserver" in window)) {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsNear(true);
      observer.disconnect();
    }, { rootMargin: "200px" });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isNear };
}

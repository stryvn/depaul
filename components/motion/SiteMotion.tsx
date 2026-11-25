"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/admissions": "Admissions",
  "/contact": "Contact",
  "/docs": "School Documents",
  "/documents": "School Documents",
  "/stories": "Stories",
  "/alumni": "Alumni",
  "/tc": "Transfer Certificate",
};

export function SiteMotion() {
  const path = usePathname()?.replace(/\/$/, "") || "/";
  const page = pageNames[path] ?? (path.startsWith("/stories/") ? "Stories" : undefined);

  useEffect(() => {
    if (!page || !("IntersectionObserver" in window)) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const played = new WeakSet<HTMLImageElement>();
    const visible = new WeakSet<HTMLImageElement>();
    let observer: IntersectionObserver;

    function reveal(image: HTMLImageElement) {
      if (!visible.has(image) || played.has(image) || !image.complete || !image.naturalWidth) return;
      played.add(image);
      observer.unobserve(image);
      if (preference.matches) return;
      image.animate(
        [{ clipPath: "inset(22% 0 0 0)", opacity: 0.75 }, { clipPath: "inset(0)", opacity: 1 }],
        { duration: 500, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const image = entry.target as HTMLImageElement;
        if (entry.isIntersecting) {
          visible.add(image);
          reveal(image);
        } else {
          visible.delete(image);
        }
      }
    }, { threshold: 0.12 });

    function observeImages() {
      document.querySelectorAll<HTMLImageElement>("main img, #stories img, #about img").forEach((image) => {
        if (!played.has(image) && image.getAttribute("fetchpriority") !== "high") observer.observe(image);
      });
    }

    function onLoad(event: Event) {
      if (event.target instanceof HTMLImageElement) reveal(event.target);
    }

    observeImages();
    const changes = new MutationObserver(observeImages);
    changes.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("load", onLoad, true);
    return () => {
      observer.disconnect();
      changes.disconnect();
      document.removeEventListener("load", onLoad, true);
    };
  }, [path, page]);

  if (!page) return null;
  return (
    <div key={path} className="site-page-transition" aria-hidden="true">
      <div>
        <span>DE PAUL</span>
        <strong>{page}</strong>
      </div>
    </div>
  );
}

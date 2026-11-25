import React from "react";

export function HeroTitle() {
  return (
    <div className="hero-copy-enter flex flex-col items-center text-center max-w-4xl px-4 select-none">
      <h1
        className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white drop-shadow-lg leading-[1.08]"
      >
        DE PAUL PUBLIC SCHOOL
      </h1>

      <span
        className="text-lg sm:text-2xl font-display font-semibold tracking-wider text-slate-200 uppercase mt-3 drop-shadow"
      >
        RAJAMUDY • IDUKKI
      </span>

      <p
        className="mt-3 text-base sm:text-xl font-medium text-brand-sky tracking-wide drop-shadow"
      >
        &ldquo;For God & Country&rdquo;
      </p>
    </div>
  );
}

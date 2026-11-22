import React from "react";
import { cn } from "./utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  actionHref?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  actionText,
  actionHref,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "w-full",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3",
            isDark
              ? "bg-brand-sky/20 text-brand-sky border border-brand-sky/30"
              : "bg-brand-royal/10 text-brand-royal border border-brand-royal/20"
          )}
        >
          {badge}
        </span>
      )}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-4",
          align === "center"
            ? "items-center justify-center"
            : "items-start sm:items-end justify-between"
        )}
      >
        <div className={align === "center" ? "" : "max-w-2xl"}>
          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight",
              isDark ? "text-white" : "text-brand-royal"
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-3 text-base sm:text-lg leading-relaxed",
                isDark ? "text-slate-300" : "text-surface-muted"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        {actionText && actionHref && (
          <a
            href={actionHref}
            className={cn(
              "text-sm font-semibold inline-flex items-center gap-1 group transition-colors shrink-0 mb-1",
              isDark
                ? "text-brand-sky hover:text-white"
                : "text-brand-crimson hover:text-red-700"
            )}
          >
            {actionText}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

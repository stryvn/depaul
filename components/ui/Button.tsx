"use client";

import React from "react";
import { cn } from "./utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "glass" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  asAnchor?: boolean;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  asAnchor = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95";

  const sizeStyles = {
    sm: "px-4 py-1.5 text-xs sm:text-sm",
    md: "px-6 py-2.5 text-sm sm:text-base",
    lg: "px-8 py-3.5 text-base sm:text-lg font-semibold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-brand-royal text-white hover:bg-blue-900 shadow-md hover:shadow-lg focus-visible:ring-brand-royal",
    accent:
      "bg-brand-crimson text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/30 hover:scale-105 focus-visible:ring-brand-crimson",
    secondary:
      "bg-brand-sky text-surface-dark hover:bg-blue-400 shadow focus-visible:ring-brand-sky",
    glass:
      "bg-white/20 backdrop-blur-md text-white hover:bg-white/35 border border-white/30 shadow-sm focus-visible:ring-white",
    outline:
      "bg-transparent border border-brand-royal text-brand-royal hover:bg-brand-royal/10 focus-visible:ring-brand-royal",
  };

  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href || asAnchor) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

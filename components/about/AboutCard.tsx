"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

export interface AboutItem {
  id: number;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  color: string;
  image: string;
}

interface AboutCardProps {
  item: AboutItem;
  isActive?: boolean;
  isMobileLayout?: boolean;
  onClick?: () => void;
}

export function AboutCard({
  item,
  isActive = false,
  isMobileLayout = false,
  onClick,
}: AboutCardProps) {
  const Icon = item.icon;

  if (isMobileLayout) {
    return (
      <motion.div
        layout
        onClick={onClick}
        transition={{ layout: { duration: 0.4, type: "spring", stiffness: 280, damping: 28 } }}
        className={cn(
          "cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between",
          isActive
            ? "bg-white border-brand-royal/40 shadow-xl ring-2 ring-brand-royal/20"
            : "bg-white/80 border-slate-200/80 shadow hover:shadow-md hover:bg-white"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm",
              isActive ? "bg-brand-royal text-white" : "bg-slate-100 text-brand-royal"
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
              isActive
                ? "bg-brand-crimson/10 text-brand-crimson border-brand-crimson/20"
                : "bg-slate-100 text-slate-500 border-slate-200"
            )}
          >
            {item.badge}
          </span>
        </div>

        <div className="mt-4">
          <h3
            className={cn(
              "font-display font-bold leading-snug",
              isActive ? "text-xl text-brand-royal" : "text-base text-surface-dark"
            )}
          >
            {item.title}
          </h3>
          <p className="text-xs font-medium text-brand-sky font-sans mt-0.5">{item.tagline}</p>

          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-xs sm:text-sm text-surface-muted leading-relaxed"
            >
              {item.description}
            </motion.p>
          )}
        </div>

        {isActive && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-royal">
            <span>Explore Sub-section</span>
            <ArrowUpRight className="w-4 h-4 text-brand-crimson" />
          </div>
        )}
      </motion.div>
    );
  }

  // Desktop Card (5 inline row)
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-brand-sky shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-royal via-brand-sky to-brand-crimson opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-13 h-13 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-brand-royal group-hover:text-white group-hover:border-brand-royal flex items-center justify-center text-brand-royal transition-all duration-300 shadow-sm">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-brand-royal/10 group-hover:text-brand-royal transition-colors">
            {item.badge}
          </span>
        </div>

        <h3 className="font-display font-bold text-xl text-brand-royal group-hover:text-blue-900 transition-colors">
          {item.title}
        </h3>
        <p className="text-xs font-medium text-brand-crimson mt-0.5 tracking-wide">
          {item.tagline}
        </p>

        <p className="mt-3 text-sm text-surface-muted leading-relaxed line-clamp-4">
          {item.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-brand-royal transition-colors">
        <span>Learn more</span>
        <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-brand-royal group-hover:text-white flex items-center justify-center transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

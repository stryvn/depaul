"use client";

import React from "react";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "../ui/utils";

export interface StoryItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  isFeatured?: boolean;
}

interface StoryTileProps {
  story: StoryItem;
  className?: string;
  isFeatured?: boolean;
}

export function StoryTile({ story, className, isFeatured = false }: StoryTileProps) {
  return (
    <article
      className={cn(
        "group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-slate-900 border border-slate-800 cursor-pointer flex flex-col justify-end",
        className
      )}
    >
      {/* Image with zoom on hover */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-opacity group-hover:opacity-95" />
      </div>

      {/* Category Pill Top Left */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-royal/85 text-white backdrop-blur-md border border-white/20 shadow-sm">
          {story.category}
        </span>
        {isFeatured && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-crimson text-white shadow-sm animate-pulse">
            Latest
          </span>
        )}
      </div>

      {/* Top right icon */}
      <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 group-hover:bg-brand-royal group-hover:text-white transition-all duration-300">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>

      {/* Bottom Content Bar overlaid */}
      <div className="relative z-10 p-5 sm:p-6 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-center gap-2 text-xs text-brand-sky font-medium mb-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{story.date}</span>
        </div>

        <h3
          className={cn(
            "font-display font-bold text-white leading-tight drop-shadow-sm group-hover:text-brand-sky transition-colors",
            isFeatured ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"
          )}
        >
          {story.title}
        </h3>

        {story.excerpt && (
          <p
            className={cn(
              "text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed transition-all duration-300",
              isFeatured
                ? "line-clamp-3 sm:line-clamp-2"
                : "line-clamp-2 opacity-90 group-hover:opacity-100"
            )}
          >
            {story.excerpt}
          </p>
        )}
      </div>
    </article>
  );
}

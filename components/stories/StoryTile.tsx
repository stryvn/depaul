"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { storyImageSources } from "./storyImageSources";
import { cn } from "../ui/utils";

export interface StoryItem {
  id: number;
  title: string;
  excerpt?: string;
  date?: string;
  publishedAt?: string;
  category?: string;
  image?: string;
  coverImage?: string;
  slug?: string;
  isFeatured?: boolean;
}

interface StoryTileProps {
  story: StoryItem;
  className?: string;
  isLead?: boolean;
  showDate?: boolean;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function StoryTile({
  story,
  className,
  isLead = false,
  showDate = false,
}: StoryTileProps) {
  const imageUrl = story.coverImage || story.image || "/assets/about-campus.webp";
  const href = story.slug ? `/stories/${story.slug}` : "/stories";
  const dateFormatted = formatDate(story.publishedAt || story.date);

  return (
    <article className={cn("ed-story", isLead && "ed-lead", className)}>
      <Link prefetch={false} href={href} className="group">
        <img
          {...storyImageSources(imageUrl)}
          sizes={isLead ? "(max-width: 650px) 100vw, 50vw" : "(max-width: 650px) 50vw, 30vw"}
          alt={story.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.getAttribute("src") !== "/assets/about-campus.webp") {
              target.removeAttribute("srcset");
              target.src = "/assets/about-campus.webp";
            }
          }}
        />
        <div className="ed-story-caption">
          <div>
            <h3>{story.title}</h3>
            {(showDate || isLead) && dateFormatted && (
              <time dateTime={story.publishedAt || story.date}>
                {dateFormatted}
              </time>
            )}
          </div>
          <span
            className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full border border-[#d7e0ec] bg-[#edf3fa] text-[#173e82] flex items-center justify-center transition-all duration-200 group-hover:bg-[#173e82] group-hover:text-white shrink-0 shadow-xs"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

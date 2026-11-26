import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MasonryGrid } from "./MasonryGrid";
import type { StoryItem } from "./StoryTile";

interface StoriesSectionProps {
  stories: StoryItem[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  return (
    <section className="ed-section ed-home" id="stories" aria-labelledby="home-stories">
      <div className="ed-head">
        <h2 id="home-stories">De Paul Stories</h2>
      </div>

      {stories.length > 0 ? (
        <MasonryGrid stories={stories} />
      ) : (
        <p className="text-slate-600">No stories are currently published.</p>
      )}
      <div className="ed-section-actions">
        <Link prefetch={false} className="ed-section-cta" href="/stories">
          View all stories
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

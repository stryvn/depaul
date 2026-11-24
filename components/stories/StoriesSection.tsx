import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MasonryGrid } from "./MasonryGrid";
import type { StoryItem } from "./StoryTile";

interface StoriesSectionProps {
  stories?: StoryItem[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  return (
    <section className="ed-section ed-home" id="stories" aria-labelledby="home-stories">
      <div className="ed-head">
        <h2 id="home-stories">De Paul Stories</h2>
      </div>

      <MasonryGrid stories={stories} />
      <div className="ed-section-actions">
        <Link className="ed-section-cta" href="/stories">
          View all stories
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

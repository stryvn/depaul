import React from "react";
import Link from "next/link";
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
        <Link className="ed-text-link" href="/stories">
          All stories
        </Link>
      </div>

      <MasonryGrid stories={stories} />
    </section>
  );
}

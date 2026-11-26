import React from "react";
import { StoryTile, StoryItem } from "./StoryTile";

interface MasonryGridProps {
  stories: StoryItem[];
}

export function MasonryGrid({ stories }: MasonryGridProps) {
  return (
    <>
      <div className="ed-story-grid ed-story-feature">
        {stories.slice(0, 5).map((story, index) => (
          <StoryTile key={story.id} story={story} isLead={index === 0} />
        ))}
      </div>
      {stories[5] && (
        <StoryTile story={stories[5]} className="ed-story-followup" showDate />
      )}
    </>
  );
}

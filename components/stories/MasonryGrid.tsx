import React from "react";
import { StoryTile, StoryItem } from "./StoryTile";

export const STORIES_DATA: StoryItem[] = [
  {
    id: 1,
    title: "Sports Day at De Paul",
    date: "15/11/2026",
    publishedAt: "2026-11-15",
    category: "Sports & Athletics",
    coverImage: "/assets/stories/sports-day.webp",
    slug: "annual-sports-meet-athlos-celebrates-athletic-brilliance",
  },
  {
    id: 3,
    title: "Children’s Day",
    date: "14/11/2026",
    publishedAt: "2026-11-14",
    category: "Campus Life",
    coverImage: "/assets/stories/childrens-day.webp",
    slug: "childrens-day-commemoration-cultural-assemblies",
  },
  {
    id: 2,
    title: "Nexora 2k26",
    date: "10/11/2026",
    publishedAt: "2026-11-10",
    category: "Academics & Tech",
    coverImage: "/assets/stories/nexora.webp",
    slug: "nexora-fest-inter-school-tech-cultural-summit",
  },
  {
    id: 4,
    title: "Environment Day",
    date: "05/11/2026",
    publishedAt: "2026-11-05",
    category: "Social Outreach",
    coverImage: "/assets/stories/environment-day.webp",
    slug: "environment-day-greenery-plantation-drive",
  },
  {
    id: 5,
    title: "Inter-house track and field",
    date: "28/10/2026",
    publishedAt: "2026-10-28",
    category: "Sports",
    coverImage: "/assets/stories/track-and-field.webp",
    slug: "inter-house-track-field-championships",
  },
  {
    id: 6,
    title: "Learning in the lab",
    date: "15/10/2026",
    publishedAt: "2026-10-15",
    category: "Academics",
    coverImage: "/assets/stories/learning-in-the-lab.webp",
    slug: "advanced-laboratories-experiential-stem-curriculum",
  },
];

interface MasonryGridProps {
  stories?: StoryItem[];
}

export function MasonryGrid({ stories }: MasonryGridProps) {
  const items = stories && stories.length > 0 ? stories : STORIES_DATA;
  return (
    <>
      <div className="ed-story-grid ed-story-feature">
        {items.slice(0, 5).map((story, index) => (
          <StoryTile key={story.id} story={story} isLead={index === 0} />
        ))}
      </div>
      {items[5] && (
        <StoryTile story={items[5]} className="ed-story-followup" showDate />
      )}
    </>
  );
}

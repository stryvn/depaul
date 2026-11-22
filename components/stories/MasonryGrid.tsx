"use client";

import React from "react";
import { StoryTile, StoryItem } from "./StoryTile";

export const STORIES_DATA: StoryItem[] = [
  {
    id: 1,
    title: "Annual Sports Meet 'Athlos' Celebrates Athletic Brilliance",
    excerpt:
      "A thrilling display of sportsmanship, track events, and house championships conducted with distinguished regional sports dignitaries on campus.",
    date: "Annual Event",
    category: "Sports & Athletics",
    image: "/assets/events/sportsday01.jpeg",
    slug: "annual-sports-meet-athlos-celebrates-athletic-brilliance",
  },
  {
    id: 2,
    title: "Nexora Fest — Inter-School Tech & Cultural Summit",
    excerpt: "Students engineered autonomous prototypes and showcased artistic brilliance.",
    date: "Campus Meet",
    category: "Academics & Tech",
    image: "/assets/events/Nexora2k26.jpeg",
    slug: "nexora-fest-inter-school-tech-cultural-summit",
  },
  {
    id: 3,
    title: "Children's Day Commemoration & Cultural Assemblies",
    excerpt: "Vibrant performances and games honoring the spirit of our young learners.",
    date: "Celebration",
    category: "Campus Life",
    image: "/assets/events/childrensday.jpeg",
    slug: "childrens-day-commemoration-cultural-assemblies",
  },
  {
    id: 4,
    title: "Environment Day Greenery & Plantation Drive",
    excerpt: "Planting native trees across the campus grounds to champion ecological harmony.",
    date: "Eco Initiative",
    category: "Social Outreach",
    image: "/assets/events/environmentday.jpg",
    slug: "environment-day-greenery-plantation-drive",
  },
  {
    id: 5,
    title: "Inter-House Track & Field Championships",
    excerpt: "Athletes competing across track relays, sprints, and field events with spirited house pride.",
    date: "Athletics",
    category: "Sports",
    image: "/assets/events/sportsday02.jpeg",
    slug: "inter-house-track-field-championships",
  },
  {
    id: 6,
    title: "Advanced Laboratories & Experiential STEM Curriculum",
    excerpt: "Hands-on scientific inquiry and laboratory discovery guiding higher secondary scholars.",
    date: "Academic Excellence",
    category: "Academics",
    image: "/assets/attachments/biologylab.jpg",
    slug: "advanced-laboratories-experiential-stem-curriculum",
  },
];

interface MasonryGridProps {
  stories?: StoryItem[];
}

export function MasonryGrid({ stories }: MasonryGridProps) {
  const items = stories && stories.length > 0 ? stories : STORIES_DATA;
  const featuredStory = items[0];
  const sideStories = items.slice(1, 5);
  const bottomStory = items[5];

  if (!featuredStory) {
    return null;
  }

  return (
    <div>
      {/* Desktop Layout (>= 1024px) */}
      <div className="hidden lg:grid grid-cols-3 gap-6 auto-rows-[220px]">
        {/* Story 1 (Latest, Spans 2 rows, Left 1 col) */}
        <div className="col-span-1 row-span-2">
          <StoryTile story={featuredStory} isFeatured={true} className="h-full" />
        </div>

        {/* Stories 2 & 3 */}
        {sideStories[0] && (
          <div className="col-span-1 row-span-1">
            <StoryTile story={sideStories[0]} className="h-full" />
          </div>
        )}
        {sideStories[1] && (
          <div className="col-span-1 row-span-1">
            <StoryTile story={sideStories[1]} className="h-full" />
          </div>
        )}

        {/* Stories 4 & 5 */}
        {sideStories[2] && (
          <div className="col-span-1 row-span-1">
            <StoryTile story={sideStories[2]} className="h-full" />
          </div>
        )}
        {sideStories[3] && (
          <div className="col-span-1 row-span-1">
            <StoryTile story={sideStories[3]} className="h-full" />
          </div>
        )}

        {/* Story 6 spanning across or wide */}
        {bottomStory && (
          <div className="col-span-3 row-span-1">
            <StoryTile story={bottomStory} className="h-full" />
          </div>
        )}
      </div>

      {/* Mobile & Tablet Layout (< 1024px) */}
      <div className="lg:hidden flex flex-col gap-4">
        {/* Latest story */}
        <div className="aspect-square sm:aspect-[16/10] w-full">
          <StoryTile story={featuredStory} isFeatured={true} className="h-full w-full" />
        </div>

        {/* 2-column grid of smaller squares below */}
        {items.length > 1 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {items.slice(1).map((story) => (
              <div key={story.id} className="aspect-square">
                <StoryTile story={story} className="h-full w-full" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

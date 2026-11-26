import { connection } from "next/server";
import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStoryBySlug, getLatestStories } from "@/db/queries";
import { renderMarkdown } from "@/lib/markdown";
import { StoryDetailClient } from "@/components/stories/StoryDetailClient";


interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

function formatLongDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found — De Paul Public School",
    };
  }

  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: story.coverImage ? [story.coverImage] : [],
      url: `https://depaulidukki.com/stories/${story.slug}`,
    },
    alternates: {
      canonical: `https://depaulidukki.com/stories/${story.slug}`,
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  await connection();
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  // Fetch latest stories for the sidebar (excluding the active story)
  const allLatest = await getLatestStories(6);
  const recentStories = allLatest
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const htmlContent = await renderMarkdown(story.body || "");
  const formattedDate = formatLongDate(story.publishedAt);

  return (
    <StoryDetailClient
      story={story}
      recentStories={recentStories}
      htmlContent={htmlContent}
      formattedDate={formattedDate}
    />
  );
}

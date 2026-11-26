import { connection } from "next/server";
import React from "react";
import Link from "next/link";
import { Footer } from "@/components/footer/Footer";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { withdrawnStorySlugs } from "@/lib/withdrawn-stories";
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
  if (withdrawnStorySlugs.includes(slug)) {
    return { title: "Story withdrawn", robots: { index: false, follow: true } };
  }

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
  if (withdrawnStorySlugs.includes(slug)) {
    return (
      <>
        <TopNavbar isMerged />
        <main className="mx-auto min-h-[50vh] w-[var(--public-content-width)] pb-16 pt-[104px]">
          <h1 className="text-4xl font-bold text-[#0b1b3d]">Story withdrawn</h1>
          <p className="mt-4 text-slate-600">This story was withdrawn because it contained inaccurate information.</p>
          <Link href="/stories" className="mt-6 inline-block font-semibold text-[#173e82] hover:underline">
            Back to Stories
          </Link>
        </main>
        <Footer />
      </>
    );
  }

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

import React from "react";
import Link from "next/link";
import { getAllStories } from "@/db/queries";
import { StoryTile } from "@/components/stories/StoryTile";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export const instant = false;

export const metadata = {
  title: "School Stories & News — De Paul Public School Rajamudy",
  description:
    "Explore campus celebrations, student victories, academic updates, and community milestones at De Paul Public School Rajamudy.",
};

export default async function StoriesListingPage() {
  const stories = await getAllStories();

  return (
    <div className="min-h-screen flex flex-col bg-surface-offwhite selection:bg-brand-royal selection:text-white">
      {/* Top Navbar */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight">
              School Stories & Updates
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Celebrating milestones, achievements, inter-school accolades, and
              the vibrant student journey across our Rajamudy campus.
            </p>
          </div>

          {/* Stories Grid */}
          {stories.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-base">No stories published yet.</p>
              <Link
                href="/"
                className="mt-4 inline-block text-sm font-semibold text-brand-royal hover:underline"
              >
                Return to homepage →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {stories.map((story, index) => (
                <div key={story.id} className="h-[380px] sm:h-[420px]">
                  <StoryTile
                    story={story}
                    isFeatured={index === 0}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { connection } from "next/server";
import React from "react";
import Link from "next/link";
import { getAllStories } from "@/db/queries";
import { MasonryGrid } from "@/components/stories/MasonryGrid";
import { storyImageSources } from "@/components/stories/storyImageSources";
import { StoryTile } from "@/components/stories/StoryTile";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";


export const metadata = {
  title: "Stories",
  openGraph: { title: "Stories | De Paul Public School Rajamudy", url: "/stories" },
  alternates: { canonical: "/stories" },
  description: "Read stories from De Paul Public School & Junior College Rajamudy.",
};

export default async function StoriesListingPage() {
  await connection();
  const stories = await getAllStories();
  const heroImage =
    stories[0]?.coverImage || "/assets/stories/sports-day.webp";

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0b1b3d] font-sans selection:bg-brand-royal selection:text-white">
      {/* Top Navbar */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-[104px] pb-16">
        {/* Editorial Hero Section */}
        <div className="ed-hero-wrap">
          <section className="ed-hero-container" aria-labelledby="ed-title">
            <div className="ed-hero-copy hero-card-copy">
              <p className="ed-label">Rajamudy, Idukki</p>
              <h1 id="ed-title">
                De Paul
                <br /> <span>Stories</span>
              </h1>
              <p className="ed-lede">
                From school events to everyday life on campus.
              </p>
            </div>
            <figure className="ed-hero-photo">
              <img
                {...storyImageSources(heroImage)}
                sizes="(max-width: 850px) 100vw, 60vw"
                alt="De Paul Campus Stories"
                fetchPriority="high"
              />
            </figure>
          </section>
        </div>

        {/* Stories Archive Grid */}
        <section
          className="ed-hero-wrap ed-section ed-body"
          aria-labelledby="recent-stories"
        >
          <div className="ed-head">
            <h2 id="recent-stories">Recent stories</h2>
          </div>

          {stories.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#d7e0ec]">
              <p className="text-slate-500 text-base">No stories published yet.</p>
              <Link
                href="/"
                className="mt-4 inline-block text-sm font-semibold text-[#173e82] hover:underline"
              >
                Return to homepage →
              </Link>
            </div>
          ) : (
            <>
              <MasonryGrid stories={stories} />
              {stories.length > 6 && (
                <div className="ed-story-grid ed-archive">
                  {stories.slice(6).map((story) => (
                    <StoryTile key={story.id} story={story} showDate />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

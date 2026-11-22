import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Calendar, ArrowLeft, Tag, Share2 } from "lucide-react";
import { getStoryBySlug } from "@/db/queries";
import { renderMarkdown } from "@/lib/markdown";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export const instant = false;

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found — De Paul Public School",
    };
  }

  return {
    title: `${story.title} — De Paul Public School`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      images: [story.coverImage],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const htmlContent = await renderMarkdown(story.body || story.excerpt);

  return (
    <div className="min-h-screen flex flex-col bg-surface-offwhite selection:bg-brand-royal selection:text-white">
      {/* Top Navbar */}
      <TopNavbar isMerged={true} />

      <main className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="w-full max-w-[1140px] mx-auto px-3 sm:px-5 min-[1180px]:px-0">
          <article className="max-w-4xl">
          {/* Breadcrumb / Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
            <Link
              href="/stories"
              className="inline-flex items-center gap-1.5 hover:text-brand-royal transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Stories</span>
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px] sm:max-w-none">
              {story.category}
            </span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-royal/10 text-brand-royal text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {story.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <time dateTime={story.publishedAt}>{story.publishedAt}</time>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4">
              {story.title}
            </h1>

            {story.excerpt && (
              <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal border-l-4 border-brand-royal/40 pl-4 py-1 italic">
                {story.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {story.coverImage && (
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-10 bg-slate-900">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>
          )}

          {/* Story Body */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200">
            <div
              className={
                "prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700 " +
                "[&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:font-display [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-4 " +
                "[&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:font-display [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h3]:mb-3 " +
                "[&>p]:mb-5 [&>p]:leading-relaxed " +
                "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul]:space-y-2 " +
                "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol]:space-y-2 " +
                "[&>blockquote]:border-l-4 [&>blockquote]:border-brand-royal [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:my-6 " +
                "[&>img]:rounded-2xl [&>img]:shadow-md [&>img]:my-8 [&>img]:w-full [&>img]:max-h-[500px] [&>img]:object-cover"
              }
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Bottom Actions */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-royal hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Stories</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

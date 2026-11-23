"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  Phone,
  Mail,
  MapPin,
  BookOpen,
} from "lucide-react";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import { WhatsAppIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import type { Story } from "@/db/schema";

interface StoryDetailClientProps {
  story: Story;
  recentStories: Story[];
  htmlContent: string;
  formattedDate: string;
}

export function StoryDetailClient({
  story,
  recentStories,
  htmlContent,
  formattedDate,
}: StoryDetailClientProps) {
  const [copied, setCopied] = useState(false);

  // Estimate reading time in minutes
  const wordCount = (story.body || "").split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://depaulidukki.com/stories/${story.slug}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${story.title} - De Paul Public School Rajamudy\n${currentUrl}`
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-brand-royal selection:text-white bg-[#f8fafc]">
      {/* 1. Official Sticky Pill Navbar */}
      <TopNavbar isMerged={true} />

      <main id="main" className="flex-1 w-full pt-20 sm:pt-24 pb-16 sm:pb-24">
        {/* 2. Hero Section: Deep Navy Card matching Contact and Alumni */}
        <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 min-[1180px]:px-0">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-labelledby="story-title"
            className="relative bg-[#0b1b3d] text-white rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 min-h-[380px] sm:min-h-[420px] lg:min-h-[460px]"
          >
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10">
              <div>
                {/* Back Link Breadcrumb */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Link
                    href="/stories"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#a9c6ed] hover:text-white transition-colors group"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    <span>All Stories</span>
                  </Link>

                  <span className="text-[#475871] text-xs">/</span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#173e82]/60 border border-[#2059aa]/40 text-[#d0e2fa] text-[11px] font-bold uppercase tracking-wider">
                    <BookOpen className="w-3 h-3 text-[#7ba5de]" />
                    {story.category || "Campus Life"}
                  </span>
                </div>

                {/* Display Headline */}
                <h1
                  id="story-title"
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.08] font-display text-white"
                >
                  {story.title}
                </h1>

                {/* Lead Excerpt */}
                {story.excerpt && (
                  <p className="mt-4 sm:mt-5 text-sm sm:text-base text-[#e0eafa] leading-relaxed max-w-xl">
                    {story.excerpt}
                  </p>
                )}
              </div>

              {/* Story Meta & Read Time */}
              <div className="mt-6 pt-5 border-t border-[#1b2f5b] flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#a9c6ed]">
                {formattedDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#7ba5de]" />
                    <time dateTime={story.publishedAt}>{formattedDate}</time>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7ba5de]" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>

            {/* Right Hero Cover Photo Column */}
            <figure className="lg:col-span-6 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-[#1b2b4d] overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-0 right-0 px-3.5 py-2 bg-[#0b1b3d]/95 backdrop-blur-sm text-[#eff5fe] text-xs sm:text-[13px] font-medium tracking-wide">
                De Paul Public School &amp; Junior College
              </figcaption>
            </figure>
          </motion.section>
        </div>

        {/* 3. Main Grid: Story Content (8 cols) + Sidebar Widgets (4 cols) */}
        <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 min-[1180px]:px-0 mt-8 sm:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Full Editorial Body */}
            <section
              aria-label="Story content"
              className="lg:col-span-8 space-y-8"
            >
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                className="bg-white border border-[#d7e0ec] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs"
              >
                {/* Rendered Markdown Prose */}
                {htmlContent ? (
                  <div
                    className="story-prose"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                ) : (
                  <p className="text-slate-500 italic">No content available for this story.</p>
                )}

                {/* Social Share & Quick Actions Bar */}
                <div className="mt-12 pt-8 border-t border-[#d7e0ec] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#475871] flex items-center gap-1.5 mr-1">
                      <Share2 className="w-3.5 h-3.5 text-[#173e82]" />
                      Share
                    </span>

                    {/* WhatsApp Button */}
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 border border-emerald-600/20 hover:border-emerald-600 text-emerald-700 hover:text-white text-xs font-bold transition-all shadow-2xs active:scale-95"
                      title="Share to WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Facebook Button */}
                    <a
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 border border-blue-600/20 hover:border-blue-600 text-blue-700 hover:text-white text-xs font-bold transition-all shadow-2xs active:scale-95"
                      title="Share to Facebook"
                    >
                      <FacebookIcon className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>

                    {/* Copy Link Button */}
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs active:scale-95"
                      title="Copy link to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy link</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Return Link */}
                  <Link
                    href="/stories"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#173e82] hover:text-[#0b1b3d] hover:underline underline-offset-4 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to all stories</span>
                  </Link>
                </div>
              </motion.article>
            </section>

            {/* Right Sidebar: Recent Stories & School Office Contact */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Widget 1: More Recent Stories */}
              {recentStories.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
                  aria-labelledby="recent-stories-title"
                  className="bg-white border border-[#d7e0ec] rounded-2xl p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#edf3fa]">
                    <h2
                      id="recent-stories-title"
                      className="text-lg font-extrabold tracking-tight font-display text-[#0b1b3d]"
                    >
                      More Stories
                    </h2>
                    <Link
                      href="/stories"
                      className="text-xs font-bold text-[#173e82] hover:underline"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="mt-4 divide-y divide-[#edf3fa]">
                    {recentStories.map((item) => (
                      <Link
                        key={item.id}
                        href={`/stories/${item.slug}`}
                        className="group flex items-center gap-3.5 py-3.5 first:pt-1 last:pb-1 transition-colors"
                      >
                        <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-[#d7e0ec]">
                          <Image
                            src={item.coverImage}
                            alt={item.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#173e82] block mb-1">
                            {item.category || "Campus Life"}
                          </span>
                          <h3 className="text-xs font-bold text-[#0b1b3d] group-hover:text-[#0256a1] transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                        </div>

                        <div className="shrink-0 w-7 h-7 rounded-full bg-[#edf3fa] group-hover:bg-[#0256a1] text-[#173e82] group-hover:text-white flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Widget 2: School Office Card (Matching Contact Page) */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
                aria-labelledby="sidebar-office-title"
                className="bg-[#edf3fa] border border-[#d7e0ec] rounded-2xl p-6 shadow-xs"
              >
                <h2
                  id="sidebar-office-title"
                  className="text-lg font-extrabold tracking-tight font-display text-[#0b1b3d]"
                >
                  School Office
                </h2>
                <p className="mt-1 text-xs text-[#475871] leading-relaxed">
                  Have questions about admissions or school events? Speak with our office team.
                </p>

                <dl className="mt-4 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#0256a1] shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>
                        <a
                          href="tel:+919605602400"
                          className="font-bold text-[#0b1b3d] hover:text-[#0256a1] transition-colors"
                        >
                          +91 96056 02400
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#0256a1] shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd>
                        <a
                          href="mailto:depaulrajamudy@gmail.com"
                          className="font-bold text-[#0b1b3d] hover:text-[#0256a1] transition-colors break-all"
                        >
                          depaulrajamudy@gmail.com
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0256a1] shrink-0 mt-0.5" />
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd className="text-slate-600">
                        Upputhode Road, Rajamudy P.O, Idukki - 685604
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-5 pt-4 border-t border-[#cedaeb]">
                  <a
                    href="https://wa.me/919605602400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0b1b3d] hover:bg-[#173e82] text-white rounded-lg font-bold text-xs transition-colors shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </motion.section>

              {/* Widget 3: Institutional Credential Card */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
                className="bg-[#0b1b3d] text-white rounded-2xl p-6 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative shrink-0 bg-white/10 rounded-xl p-1 border border-white/20">
                    <Image
                      src="/assets/branding/logo.png"
                      alt="De Paul School Crest"
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold tracking-tight text-white leading-tight">
                      De Paul Public School
                    </h3>
                    <p className="text-[11px] font-medium text-[#a9c6ed]">
                      &amp; Junior College, Rajamudy
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-white/10 text-[11px] text-[#e0eafa] space-y-1">
                  <p className="font-semibold italic text-[#a9c6ed]">
                    &ldquo;For God &amp; Country&rdquo;
                  </p>
                  <p className="text-[#a9c6ed]/90">
                    CBSE Affiliation No. 930624 &bull; School Code: 75543
                  </p>
                </div>
              </motion.section>
            </aside>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

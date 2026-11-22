"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, ArrowLeft } from "lucide-react";
import { createStory, updateStory } from "@/app/actions/stories";
import { uploadImage } from "@/app/actions/upload";
import { generateSlug } from "@/lib/slug";
import { RichTextEditor } from "./RichTextEditor";
import type { Story } from "@/db/schema";

interface StoryFormProps {
  initialData?: Story;
}

export function StoryForm({ initialData }: StoryFormProps) {
  const isEditing = !!initialData;
  const [isPending, startTransition] = useTransition();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [category, setCategory] = useState(initialData?.category || "Campus Life");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt || new Date().toISOString().split("T")[0]
  );

  // Update slug automatically when title changes unless user manually edited slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isCustomSlug && !isEditing) {
      setSlug(generateSlug(val));
    }
  };

  // Upload cover image
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadImage(formData);
      if (res.error) {
        setError(res.error);
      } else if (res.url) {
        setCoverImage(res.url);
      }
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please provide a story title.");
      return;
    }
    if (!excerpt.trim()) {
      setError("Please provide a short excerpt.");
      return;
    }
    if (!coverImage.trim()) {
      setError("Please provide or upload a cover image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug || generateSlug(title));
    formData.append("excerpt", excerpt);
    formData.append("body", body);
    formData.append("category", category);
    formData.append("coverImage", coverImage);
    formData.append("publishedAt", publishedAt);

    startTransition(async () => {
      try {
        if (isEditing && initialData) {
          await updateStory(initialData.id, formData);
        } else {
          await createStory(formData);
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An error occurred";
        if (!message.includes("NEXT_REDIRECT")) {
          setError(message);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/stories"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            {isEditing ? "Edit Story" : "Publish New Story"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/stories"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending || uploadingImage}
            className="px-5 py-2.5 rounded-xl bg-brand-royal text-white font-medium text-sm hover:bg-brand-royal/90 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending
              ? isEditing
                ? "Saving..."
                : "Publishing..."
              : isEditing
              ? "Update Story"
              : "Publish Story"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content Fields */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Story Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Annual Sports Meet 'Athlos' Celebrates Athletic Brilliance"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                URL Slug
              </label>
              <span className="text-[11px] text-slate-400">
                /stories/{slug || "slug-preview"}
              </span>
            </div>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setIsCustomSlug(true);
                setSlug(e.target.value);
              }}
              placeholder="url-slug"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Excerpt * (Card Summary)
            </label>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence overview of the event or achievement to show on card tiles."
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent transition-all"
            />
          </div>

          {/* Visual WYSIWYG Story Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Story Content (Visual Editor)
              </label>
              <span className="text-[11px] text-slate-400">
                Click buttons or select text to format headers, bold, or insert photos
              </span>
            </div>

            <RichTextEditor value={body} onChange={setBody} />
          </div>
        </div>

        {/* Sidebar / Meta Fields */}
        <div className="space-y-6">
          {/* Cover Image Upload / URL */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Cover Image *
            </label>

            {coverImage ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <Image
                  src={coverImage}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCoverImage("")}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 hover:border-brand-royal rounded-xl p-6 text-center transition-colors">
                <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <label className="block text-xs font-semibold text-brand-royal hover:underline cursor-pointer mb-1">
                  {uploadingImage ? "Uploading..." : "Upload from Computer"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-slate-500">JPG, PNG, WEBP up to 5MB</p>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-slate-600 mb-1">
                Or paste any online image URL:
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or /assets/..."
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-brand-royal"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Accepts any external image URL or local asset path
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Category
            </label>
            <input
              type="text"
              list="category-suggestions"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Sports & Athletics"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-royal"
            />
            <datalist id="category-suggestions">
              <option value="Sports & Athletics" />
              <option value="Academics & Tech" />
              <option value="Campus Life" />
              <option value="Social Outreach" />
              <option value="Cultural & Arts" />
              <option value="Announcements" />
            </datalist>
          </div>

          {/* Published Date */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Published Date
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-royal"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

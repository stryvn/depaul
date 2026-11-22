"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { createDocument, updateDocument } from "@/app/actions/documents";
import { uploadDocument } from "@/app/actions/upload";
import { generateSlug } from "@/lib/slug";
import type { Document } from "@/db/schema";

interface DocumentFormProps {
  initialData?: Document;
}

const CATEGORY_PRESETS = [
  "Statutory",
  "Academics",
  "Admissions",
  "Regulations",
  "Finance",
  "Committees",
];

export function DocumentForm({ initialData }: DocumentFormProps) {
  const isEditing = !!initialData;
  const [isPending, startTransition] = useTransition();
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [category, setCategory] = useState(initialData?.category || "Statutory");
  const [description, setDescription] = useState(initialData?.description || "");
  const [fileUrl, setFileUrl] = useState(initialData?.fileUrl || "");
  const [fileType, setFileType] = useState(initialData?.fileType || "PDF");
  const [fileSize, setFileSize] = useState(initialData?.fileSize || "1.0 MB");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [date, setDate] = useState(
    initialData?.date ||
      new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
  );
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);

  // Update slug automatically when title changes unless custom
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isCustomSlug && !isEditing) {
      setSlug(generateSlug(val));
    }
  };

  // Upload document file handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadDocument(formData);

      if (res.error) {
        setError(res.error);
      } else {
        if (res.url) setFileUrl(res.url);
        if (res.size) setFileSize(res.size);
        if (res.fileType) setFileType(res.fileType);
      }
    } catch {
      setError("Failed to upload document. Please ensure it is a PDF or Word document under 25MB.");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please provide a document title.");
      return;
    }
    if (!fileUrl.trim()) {
      setError("Please upload a document file or specify a valid file URL.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug || generateSlug(title));
    formData.append("category", category);
    formData.append("description", description);
    formData.append("fileUrl", fileUrl);
    formData.append("fileType", fileType);
    formData.append("fileSize", fileSize);
    formData.append("isFeatured", isFeatured ? "true" : "false");
    formData.append("date", date);
    formData.append("displayOrder", displayOrder.toString());

    startTransition(async () => {
      try {
        if (isEditing && initialData) {
          await updateDocument(initialData.id, formData);
        } else {
          await createDocument(formData);
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/documents"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
            {isEditing ? "Edit Document / Disclosure" : "Upload Document / Disclosure"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/documents"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending || uploadingDoc}
            className="px-5 py-2.5 rounded-xl bg-brand-royal text-white font-medium text-sm hover:bg-brand-royal/90 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isPending
              ? isEditing
                ? "Saving..."
                : "Publishing..."
              : isEditing
              ? "Update Document"
              : "Publish Document"}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main 2-column fields */}
        <div className="md:col-span-2 space-y-6">
          {/* Document Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Document Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. CBSE Mandatory Public Disclosure 2026-27"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal transition-all text-slate-900 font-medium"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Document Slug (Unique Identifier)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setIsCustomSlug(true);
                setSlug(e.target.value);
              }}
              placeholder="cbse-mandatory-public-disclosure"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal transition-all text-xs font-mono text-slate-600 bg-slate-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Summary / Scope of Document
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of statutory compliance certificates, academic scope, or administrative guidelines contained in this document..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal transition-all text-sm text-slate-900 leading-relaxed"
            />
          </div>

          {/* File Upload Box */}
          <div className="p-5 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-royal flex items-center justify-center mb-3">
                <FileText className="w-6 h-6" />
              </div>

              <p className="text-sm font-semibold text-slate-800">
                {uploadingDoc ? "Uploading document..." : "Upload Official Document"}
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                PDF or Word documents up to 25MB (CBSE Appendices, NOCs, Schedules)
              </p>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 hover:border-slate-400 shadow-2xs transition-all cursor-pointer">
                <Upload className="w-4 h-4 text-slate-500" />
                <span>{uploadingDoc ? "Processing..." : "Select File"}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploadingDoc}
                  className="hidden"
                />
              </label>

              {fileUrl && (
                <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>File Linked: {fileUrl}</span>
                </div>
              )}
            </div>

            {/* Manual URL / File Path Override */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Direct File URL / Path Override
              </label>
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="/assets/documents/mandatory-disclosure-CBSE-1.pdf"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Category selection */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <label className="block text-sm font-semibold text-slate-800">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_PRESETS.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    category === cat
                      ? "bg-brand-royal text-white shadow-2xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Or enter custom category..."
              className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal"
            />
          </div>

          {/* File Metadata */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">
              Document Metadata
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Format / Type
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
              >
                <option value="PDF">Standard PDF Document</option>
                <option value="DOC">Word Document (.docx)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 2.4 MB"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Date / Term
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. November 2026 or 2026-27"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Display Order (Weight)
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first in the directory.
              </p>
            </div>
          </div>

          {/* Featured on Bento Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 mt-1 rounded text-brand-royal focus:ring-brand-royal border-slate-300"
              />
              <div>
                <span className="text-sm font-semibold text-slate-900 block">
                  Featured on Home Bento Grid
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Pin this dossier prominently in the primary showcase slot of the homepage documents section.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}

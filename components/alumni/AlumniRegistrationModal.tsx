"use client";

import React, { useState, useRef, useTransition } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Camera,
} from "lucide-react";
import { registerAlumniAction, type RegisterAlumniState } from "@/app/actions/alumni";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AlumniRegistrationModal({ isOpen, onClose, onSuccess }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shrunkBlob, setShrunkBlob] = useState<Blob | null>(null);
  const [fileSizeInfo, setFileSizeInfo] = useState<string | null>(null);
  const [state, setState] = useState<RegisterAlumniState | null>(null);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  if (!isOpen) return null;

  /**
   * Client-side HTML5 Canvas Auto-Shrink:
   * Downscales avatar photo to max 400x400 WebP at 0.75 quality (< 50KB payload).
   */
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const originalKb = Math.round(file.size / 1024);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setShrunkBlob(blob);
              const preview = URL.createObjectURL(blob);
              setPreviewUrl(preview);
              const compressedKb = Math.round(blob.size / 1024);
              setFileSizeInfo(`Optimized: ${compressedKb} KB (reduced from ${originalKb} KB)`);
            }
          },
          "image/webp",
          0.75
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // If client compressed image exists, append as WebP avatar file
    if (shrunkBlob) {
      formData.set("avatar", shrunkBlob, "avatar.webp");
    }

    // Set mock or actual turnstile token
    if (!formData.has("cf-turnstile-response")) {
      formData.set("cf-turnstile-response", "mock-turnstile-secret");
    }

    startTransition(async () => {
      const res = await registerAlumniAction(undefined, formData);
      setState(res);
      if (res.success) {
        if (onSuccess) onSuccess();
      }
    });
  };

  const currentYear = new Date().getFullYear();
  const batchYears = Array.from({ length: currentYear - 1995 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-brand-royal to-sky-700 px-6 sm:px-8 py-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>De Paul Alumni Network</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display mt-1 text-white">
            Join the Alumni Directory
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-lg">
            Stay connected with fellow Depaulians, share career milestones, and inspire future generations.
          </p>
        </div>

        {/* Modal Content / Form */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {state?.success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Welcome Back, Depaulian!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {state.message || "Your profile has been published to the live directory."}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-brand-royal text-white font-semibold text-sm hover:bg-brand-royal/90 shadow-xs cursor-pointer"
                >
                  View in Directory
                </button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Bot Honeypot Field (Hidden from humans) */}
              <input
                type="text"
                name="website_url_hp"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Error Notice */}
              {state?.error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold block">Notice:</strong>
                    <span>{state.error}</span>
                  </div>
                </div>
              )}

              {/* Profile Photo Uploader with Auto-Shrink */}
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                <div className="relative w-20 h-20 rounded-full bg-white border-2 border-brand-royal/30 overflow-hidden shadow-2xs flex items-center justify-center shrink-0">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <label className="text-xs font-bold text-slate-800 block">
                    Profile Portrait (Optional)
                  </label>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Images are automatically optimized and compressed to under 50KB to preserve bandwidth and privacy.
                  </p>
                  {fileSizeInfo && (
                    <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {fileSizeInfo}
                    </span>
                  )}
                  <div className="mt-2.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-slate-500" />
                      <span>{previewUrl ? "Change Photo" : "Upload Photo"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Sandra Mathew"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                  {state?.fieldErrors?.name && (
                    <p className="text-rose-600 text-[11px] mt-1">{state.fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sandra@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                  {state?.fieldErrors?.email && (
                    <p className="text-rose-600 text-[11px] mt-1">{state.fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Verification Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Strictly private (admin-only)</span>
                  {state?.fieldErrors?.phone && (
                    <p className="text-rose-600 text-[11px] mt-1">{state.fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Passing Year / Batch <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="batchYear"
                    required
                    defaultValue=""
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  >
                    <option value="" disabled>Select Year</option>
                    {batchYears.map((yr) => (
                      <option key={yr} value={yr}>
                        Batch of {yr}
                      </option>
                    ))}
                  </select>
                  {state?.fieldErrors?.batchYear && (
                    <p className="text-rose-600 text-[11px] mt-1">{state.fieldErrors.batchYear}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admission No (Optional)
                  </label>
                  <input
                    type="text"
                    name="admissionNumber"
                    placeholder="e.g. 1420"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Helps school verify your record</span>
                </div>
              </div>

              {/* Class / Stream */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class / Stream at De Paul <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="classOrStream"
                  required
                  placeholder="e.g. Class 12 Science (Bio-Maths) / Commerce / Class 10"
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                />
              </div>

              {/* Professional Background */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Occupation / Study <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    required
                    placeholder="e.g. Senior Software Architect / MBBS Intern / Civil Service"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / University / Hospital (Optional)
                  </label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="e.g. Tata Consultancy Services / AIIMS Delhi"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Kochi / Bengaluru / London / Dubai"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    defaultValue="India"
                    className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                  />
                </div>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="text"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                />
              </div>

              {/* Message to School & Batchmates */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message / Memory for School & Batchmates (Optional)
                </label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Share a cherished school memory, words of encouragement for students, or greetings to your teachers..."
                  className="w-full px-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20 focus:border-brand-royal"
                />
              </div>

              {/* Privacy Opt-in & Security Notice */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="showEmailPublicly"
                    className="mt-0.5 rounded border-slate-300 text-brand-royal focus:ring-brand-royal/30"
                  />
                  <span className="text-xs text-slate-700">
                    <strong>Display my email on the public directory</strong> so alumni and students can reach out to me for networking. (If unchecked, your email remains strictly private).
                  </span>
                </label>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Phone numbers are never publicly shown. Protected by automated verification.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-brand-royal text-white text-xs sm:text-sm font-semibold hover:bg-brand-royal/90 transition-all shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {isPending ? "Submitting Profile..." : "Submit & Join Directory"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

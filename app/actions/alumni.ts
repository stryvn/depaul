"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/auth";
import { sanitizeAndSaveAvatar } from "@/lib/image-sanitize";
import { verifyTurnstileToken } from "@/lib/turnstile";
import {
  createAlumni,
  getAlumniByEmail,
  getAlumniById,
  updateAlumni,
  deleteAlumni,
} from "@/db/queries";
import { promises as fs } from "fs";
import path from "path";

export interface RegisterAlumniState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  message?: string;
}

/**
 * Public registration action with Honeypot + Turnstile bot protection,
 * duplicate email conflict check, and automatic activation.
 */
export async function registerAlumniAction(
  _prevState: RegisterAlumniState | undefined,
  formData: FormData
): Promise<RegisterAlumniState> {
  // 1. Honeypot check: spambots fill hidden field `website_url_hp`
  const honeypot = formData.get("website_url_hp")?.toString()?.trim();
  if (honeypot) {
    // Silently succeed to mislead the bot without saving spam
    return {
      success: true,
      message: "Thank you for registering! Your alumni profile is now active.",
    };
  }

  // 2. Cloudflare Turnstile token validation
  const turnstileToken = formData.get("cf-turnstile-response")?.toString()?.trim() || "";
  const isHuman = await verifyTurnstileToken(turnstileToken);
  if (!isHuman) {
    return {
      error: "Security check failed. Please refresh the page and try again.",
    };
  }

  // 3. Extract and validate fields
  const name = formData.get("name")?.toString()?.trim() || "";
  const email = formData.get("email")?.toString()?.trim().toLowerCase() || "";
  const phone = formData.get("phone")?.toString()?.trim() || "";
  const showEmailPublicly = formData.get("showEmailPublicly") === "true" || formData.get("showEmailPublicly") === "on";
  const batchYearStr = formData.get("batchYear")?.toString()?.trim() || "";
  const classOrStream = formData.get("classOrStream")?.toString()?.trim() || "";
  const admissionNumber = formData.get("admissionNumber")?.toString()?.trim() || null;
  const occupation = formData.get("occupation")?.toString()?.trim() || "";
  const organization = formData.get("organization")?.toString()?.trim() || null;
  const city = formData.get("city")?.toString()?.trim() || "";
  const country = formData.get("country")?.toString()?.trim() || "India";
  const linkedinUrlRaw = formData.get("linkedinUrl")?.toString()?.trim() || "";
  const bio = formData.get("bio")?.toString()?.trim() || null;
  const message = formData.get("message")?.toString()?.trim() || null;

  const fieldErrors: Record<string, string> = {};

  if (!name || name.length < 2) {
    fieldErrors.name = "Please enter your full name.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!phone || phone.length < 7) {
    fieldErrors.phone = "Please enter a valid phone number (used only for school verification).";
  }

  const batchYear = parseInt(batchYearStr, 10);
  const currentYear = new Date().getFullYear();
  if (isNaN(batchYear) || batchYear < 1995 || batchYear > currentYear + 1) {
    fieldErrors.batchYear = `Batch year must be between 1995 and ${currentYear + 1}.`;
  }

  if (!classOrStream) {
    fieldErrors.classOrStream = "Please specify your class or stream (e.g. Science, Commerce, Class 10/12).";
  }

  if (!occupation) {
    fieldErrors.occupation = "Please enter your current occupation or course of study.";
  }

  if (!city) {
    fieldErrors.city = "Please enter your current city.";
  }

  let linkedinUrl: string | null = null;
  if (linkedinUrlRaw) {
    if (!linkedinUrlRaw.startsWith("http://") && !linkedinUrlRaw.startsWith("https://")) {
      linkedinUrl = `https://${linkedinUrlRaw}`;
    } else {
      linkedinUrl = linkedinUrlRaw;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors, error: "Please correct the highlighted fields." };
  }

  // 4. Duplicate check: Has this email already registered?
  const existing = getAlumniByEmail(email);
  if (existing) {
    return {
      error:
        "An alumni profile with this email address already exists in the directory. If you need to update or remove your details, please contact school administration at depaulrajamudy@gmail.com.",
    };
  }

  // 5. Avatar processing with client-shrunk payload validation & EXIF strip
  let avatarUrl: string | null = null;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
    const uploadRes = await sanitizeAndSaveAvatar(avatarFile);
    if (uploadRes.error) {
      return { error: `Photo upload failed: ${uploadRes.error}` };
    }
    avatarUrl = uploadRes.url || null;
  }

  // 6. Insert new active alumni record
  try {
    createAlumni({
      name,
      email,
      phone,
      showEmailPublicly,
      batchYear,
      classOrStream,
      admissionNumber,
      occupation,
      organization,
      city,
      country,
      linkedinUrl,
      bio,
      message,
      avatarUrl,
      isFeatured: false,
      status: "ACTIVE",
    });

    revalidatePath("/alumni");
    revalidatePath("/admin/alumni");

    return {
      success: true,
      message: "Welcome to the De Paul Alumni Network! Your profile has been published to the directory.",
    };
  } catch (err) {
    console.error("Failed to register alumni:", err);
    return {
      error: "An unexpected error occurred while saving your profile. Please try again.",
    };
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN ACTIONS (AUTHENTICATED)
───────────────────────────────────────────────────────────────────────────── */

/** Quick toggle between ACTIVE, HIDDEN, and FLAGGED statuses. */
export async function updateAlumniStatusAction(id: number, status: "ACTIVE" | "HIDDEN" | "FLAGGED") {
  const session = await getCurrentSession();
  if (!session) throw new Error("Unauthorized");

  updateAlumni(id, { status });
  revalidatePath("/alumni");
  revalidatePath("/admin/alumni");
  return { success: true };
}

/** Quick toggle for Featured / Spotlight badge. */
export async function toggleFeaturedAlumniAction(id: number, isFeatured: boolean) {
  const session = await getCurrentSession();
  if (!session) throw new Error("Unauthorized");

  updateAlumni(id, { isFeatured });
  revalidatePath("/alumni");
  revalidatePath("/admin/alumni");
  return { success: true };
}

/** Full record update from Admin editing modal. */
export async function updateAlumniAction(id: number, formData: FormData) {
  const session = await getCurrentSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim().toLowerCase();
  const phone = formData.get("phone")?.toString()?.trim();
  const batchYearStr = formData.get("batchYear")?.toString()?.trim();
  const classOrStream = formData.get("classOrStream")?.toString()?.trim();
  const admissionNumber = formData.get("admissionNumber")?.toString()?.trim() || null;
  const occupation = formData.get("occupation")?.toString()?.trim();
  const organization = formData.get("organization")?.toString()?.trim() || null;
  const city = formData.get("city")?.toString()?.trim();
  const country = formData.get("country")?.toString()?.trim() || "India";
  const linkedinUrl = formData.get("linkedinUrl")?.toString()?.trim() || null;
  const bio = formData.get("bio")?.toString()?.trim() || null;
  const message = formData.get("message")?.toString()?.trim() || null;
  const adminNotes = formData.get("adminNotes")?.toString()?.trim() || null;
  const status = formData.get("status")?.toString() as "ACTIVE" | "HIDDEN" | "FLAGGED" | undefined;
  const isFeatured = formData.get("isFeatured") === "true";
  const showEmailPublicly = formData.get("showEmailPublicly") === "true";

  const updates: Record<string, unknown> = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (phone) updates.phone = phone;
  if (batchYearStr) updates.batchYear = parseInt(batchYearStr, 10);
  if (classOrStream) updates.classOrStream = classOrStream;
  updates.admissionNumber = admissionNumber;
  if (occupation) updates.occupation = occupation;
  updates.organization = organization;
  if (city) updates.city = city;
  if (country) updates.country = country;
  updates.linkedinUrl = linkedinUrl;
  updates.bio = bio;
  updates.message = message;
  updates.adminNotes = adminNotes;
  if (status) updates.status = status;
  updates.isFeatured = isFeatured;
  updates.showEmailPublicly = showEmailPublicly;

  // Handle avatar replacement if provided
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
    const uploadRes = await sanitizeAndSaveAvatar(avatarFile);
    if (!uploadRes.error && uploadRes.url) {
      updates.avatarUrl = uploadRes.url;
    }
  }

  updateAlumni(id, updates);
  revalidatePath("/alumni");
  revalidatePath("/admin/alumni");
  return { success: true };
}

/** Delete an alumni record and remove any uploaded avatar file. */
export async function deleteAlumniAction(id: number) {
  const session = await getCurrentSession();
  if (!session) throw new Error("Unauthorized");

  const existing = getAlumniById(id);
  if (existing?.avatarUrl && existing.avatarUrl.startsWith("/uploads/alumni/")) {
    try {
      const filename = path.basename(existing.avatarUrl);
      const filePath = path.join(process.cwd(), "public", "uploads", "alumni", filename);
      await fs.unlink(filePath).catch(() => {});
    } catch {
      // Ignore filesystem unlink errors if already deleted
    }
  }

  deleteAlumni(id);
  revalidatePath("/alumni");
  revalidatePath("/admin/alumni");
  return { success: true };
}

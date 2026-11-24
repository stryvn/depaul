"use server";

import { saveUpload } from "@/lib/uploads";
import crypto from "crypto";
import { getCurrentSession } from "@/lib/auth";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const ALLOWED_DOC_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_DOC_SIZE_BYTES = 25 * 1024 * 1024; // 25MB for statutory/compliance dossiers

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  const session = await getCurrentSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const file = formData.get("file") as File | null;
  if (!file || !(file instanceof File) || file.size === 0) {
    return { error: "No valid file uploaded." };
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { error: "Only JPG, PNG, WEBP, and GIF images are allowed." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { error: "Image size must be 5MB or less." };
  }

  const ext = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
  const randomName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

  const url = await saveUpload("stories", randomName, new Uint8Array(await file.arrayBuffer()), file.type);

  return { url: url };
}

export async function uploadDocument(
  formData: FormData
): Promise<{ url?: string; size?: string; fileType?: "PDF" | "DOC"; error?: string }> {
  const session = await getCurrentSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const file = formData.get("file") as File | null;
  if (!file || !(file instanceof File) || file.size === 0) {
    return { error: "No valid file uploaded." };
  }

  if (!ALLOWED_DOC_MIME_TYPES.has(file.type)) {
    return { error: "Only PDF and Word documents (.pdf, .doc, .docx) are allowed." };
  }

  if (file.size > MAX_DOC_SIZE_BYTES) {
    return { error: "Document size must be 25MB or less." };
  }

  const ext = file.type === "application/pdf" ? "pdf" : file.type === "application/msword" ? "doc" : "docx";
  const fileType: "PDF" | "DOC" = ext === "pdf" ? "PDF" : "DOC";
  const randomName = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}.${ext}`;

  const url = await saveUpload("documents", randomName, new Uint8Array(await file.arrayBuffer()), file.type);

  return {
    url: url,
    size: formatFileSize(file.size),
    fileType,
  };
}

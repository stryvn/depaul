"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, ne } from "drizzle-orm";
import { db } from "@/db";
import { documents } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

async function ensureUniqueDocumentSlug(desiredSlug: string, currentId?: number): Promise<string> {
  let slug = desiredSlug;
  let counter = 1;

  while (true) {
    const query = currentId
      ? db
          .select({ id: documents.id })
          .from(documents)
          .where(and(eq(documents.slug, slug), ne(documents.id, currentId)))
          .get()
      : db
          .select({ id: documents.id })
          .from(documents)
          .where(eq(documents.slug, slug))
          .get();

    if (!query) {
      return slug;
    }

    counter++;
    slug = `${desiredSlug}-${counter}`;
  }
}

export async function createDocument(formData: FormData) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString()?.trim() || "";
  const customSlug = formData.get("slug")?.toString()?.trim();
  const category = formData.get("category")?.toString()?.trim() || "Statutory";
  const description = formData.get("description")?.toString()?.trim() || "";
  const fileUrl = formData.get("fileUrl")?.toString()?.trim() || "";
  const fileType = formData.get("fileType")?.toString()?.trim() || "PDF";
  const fileSize = formData.get("fileSize")?.toString()?.trim() || "1.0 MB";
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const date = formData.get("date")?.toString()?.trim() || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10) || 0;

  if (!title || !fileUrl) {
    throw new Error("Title and Document File URL are required.");
  }

  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  const slug = await ensureUniqueDocumentSlug(baseSlug);

  db.insert(documents)
    .values({
      title,
      slug,
      category,
      description,
      fileUrl,
      fileType,
      fileSize,
      isFeatured,
      date,
      displayOrder,
      downloadsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath("/admin/documents");
  redirect("/admin/documents");
}

export async function updateDocument(id: number, formData: FormData) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString()?.trim() || "";
  const customSlug = formData.get("slug")?.toString()?.trim();
  const category = formData.get("category")?.toString()?.trim() || "Statutory";
  const description = formData.get("description")?.toString()?.trim() || "";
  const fileUrl = formData.get("fileUrl")?.toString()?.trim() || "";
  const fileType = formData.get("fileType")?.toString()?.trim() || "PDF";
  const fileSize = formData.get("fileSize")?.toString()?.trim() || "1.0 MB";
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on";
  const date = formData.get("date")?.toString()?.trim() || "";
  const displayOrder = parseInt(formData.get("displayOrder")?.toString() || "0", 10) || 0;

  if (!title || !fileUrl) {
    throw new Error("Title and Document File URL are required.");
  }

  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  const slug = await ensureUniqueDocumentSlug(baseSlug, id);

  db.update(documents)
    .set({
      title,
      slug,
      category,
      description,
      fileUrl,
      fileType,
      fileSize,
      isFeatured,
      date,
      displayOrder,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(documents.id, id))
    .run();

  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath("/admin/documents");
  redirect("/admin/documents");
}

export async function deleteDocument(id: number) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  db.delete(documents).where(eq(documents.id, id)).run();

  revalidatePath("/");
  revalidatePath("/documents");
  revalidatePath("/admin/documents");
  return { success: true };
}

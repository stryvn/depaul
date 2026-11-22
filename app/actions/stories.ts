"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, ne } from "drizzle-orm";
import { db } from "@/db";
import { stories } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";

async function ensureUniqueSlug(desiredSlug: string, currentId?: number): Promise<string> {
  let slug = desiredSlug;
  let counter = 1;

  while (true) {
    const query = currentId
      ? db
          .select({ id: stories.id })
          .from(stories)
          .where(and(eq(stories.slug, slug), ne(stories.id, currentId)))
          .get()
      : db
          .select({ id: stories.id })
          .from(stories)
          .where(eq(stories.slug, slug))
          .get();

    if (!query) {
      return slug;
    }

    counter++;
    slug = `${desiredSlug}-${counter}`;
  }
}

export async function createStory(formData: FormData) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString()?.trim() || "";
  const customSlug = formData.get("slug")?.toString()?.trim();
  const excerpt = formData.get("excerpt")?.toString()?.trim() || "";
  const body = formData.get("body")?.toString()?.trim() || "";
  const category = formData.get("category")?.toString()?.trim() || "General";
  const coverImage = formData.get("coverImage")?.toString()?.trim() || "";
  const publishedAt =
    formData.get("publishedAt")?.toString()?.trim() ||
    new Date().toISOString().split("T")[0];

  if (!title || !excerpt || !coverImage) {
    throw new Error("Title, excerpt, and cover image are required.");
  }

  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  const slug = await ensureUniqueSlug(baseSlug);

  db.insert(stories)
    .values({
      title,
      slug,
      excerpt,
      body,
      category,
      coverImage,
      publishedAt,
      updatedAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/");
  revalidatePath("/stories");
  redirect("/admin/stories");
}

export async function updateStory(id: number, formData: FormData) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title")?.toString()?.trim() || "";
  const customSlug = formData.get("slug")?.toString()?.trim();
  const excerpt = formData.get("excerpt")?.toString()?.trim() || "";
  const body = formData.get("body")?.toString()?.trim() || "";
  const category = formData.get("category")?.toString()?.trim() || "General";
  const coverImage = formData.get("coverImage")?.toString()?.trim() || "";
  const publishedAt =
    formData.get("publishedAt")?.toString()?.trim() ||
    new Date().toISOString().split("T")[0];

  if (!title || !excerpt || !coverImage) {
    throw new Error("Title, excerpt, and cover image are required.");
  }

  const baseSlug = customSlug ? generateSlug(customSlug) : generateSlug(title);
  const slug = await ensureUniqueSlug(baseSlug, id);

  db.update(stories)
    .set({
      title,
      slug,
      excerpt,
      body,
      category,
      coverImage,
      publishedAt,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(stories.id, id))
    .run();

  revalidatePath("/");
  revalidatePath("/stories");
  revalidatePath(`/stories/${slug}`);
  redirect("/admin/stories");
}

export async function deleteStory(id: number) {
  const session = await getCurrentSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  db.delete(stories).where(eq(stories.id, id)).run();

  revalidatePath("/");
  revalidatePath("/stories");
  return { success: true };
}

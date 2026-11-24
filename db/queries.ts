import { eq, desc, asc, and, or, like, sql } from "drizzle-orm";
import { db } from "./index";
import { stories, alumni, documents, type NewAlumni, type Document } from "./schema";

/** Latest N stories (default 6), newest first. */
export async function getLatestStories(limit = 6) {
  return db
    .select()
    .from(stories)
    .orderBy(desc(stories.publishedAt))
    .limit(limit);
}

/** All stories, newest first. */
export async function getAllStories() {
  return db.select().from(stories).orderBy(desc(stories.publishedAt));
}

/** Single story by its unique slug. */
export async function getStoryBySlug(slug: string) {
  return db.select().from(stories).where(eq(stories.slug, slug)).get();
}

/** Single story by primary key. */
export async function getStoryById(id: number) {
  return db.select().from(stories).where(eq(stories.id, id)).get();
}

/** Lightweight list for the admin panel. */
export async function getAllStoriesForAdmin() {
  return db
    .select({
      id: stories.id,
      title: stories.title,
      category: stories.category,
      publishedAt: stories.publishedAt,
      slug: stories.slug,
    })
    .from(stories)
    .orderBy(desc(stories.createdAt));
}

/* ─────────────────────────────────────────────────────────────────────────────
   ALUMNI QUERIES
───────────────────────────────────────────────────────────────────────────── */

/** Get distinct batch years of active alumni for filter dropdowns. */
export async function getAlumniBatchYears() {
  const rows = await db
    .selectDistinct({ batchYear: alumni.batchYear })
    .from(alumni)
    .where(eq(alumni.status, "ACTIVE"))
    .orderBy(desc(alumni.batchYear))
    .all();
  return rows.map((r) => r.batchYear);
}

/** Public directory listing: phone is strictly excluded, email excluded unless showEmailPublicly is true. */
export async function getPublicAlumniList(params: {
  batchYear?: number;
  search?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const { batchYear, search, limit = 24, offset = 0 } = params;

  const conditions = [eq(alumni.status, "ACTIVE")];

  if (batchYear && !isNaN(batchYear)) {
    conditions.push(eq(alumni.batchYear, batchYear));
  }

  if (search && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    conditions.push(
      or(
        like(sql`lower(${alumni.name})`, term),
        like(sql`lower(${alumni.occupation})`, term),
        like(sql`lower(coalesce(${alumni.organization}, ''))`, term),
        like(sql`lower(${alumni.city})`, term)
      )!
    );
  }

  const whereClause = and(...conditions);

  const items = await db
    .select({
      id: alumni.id,
      name: alumni.name,
      batchYear: alumni.batchYear,
      classOrStream: alumni.classOrStream,
      occupation: alumni.occupation,
      organization: alumni.organization,
      city: alumni.city,
      country: alumni.country,
      linkedinUrl: alumni.linkedinUrl,
      bio: alumni.bio,
      message: alumni.message,
      avatarUrl: alumni.avatarUrl,
      isFeatured: alumni.isFeatured,
      email: sql<string | null>`case when ${alumni.showEmailPublicly} = 1 then ${alumni.email} else null end`,
    })
    .from(alumni)
    .where(whereClause)
    .orderBy(desc(alumni.isFeatured), desc(alumni.batchYear), asc(alumni.name))
    .limit(limit)
    .offset(offset)
    .all();

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(alumni)
    .where(whereClause)
    .get();

  return {
    items,
    total: countResult?.count ?? 0,
  };
}

/** Featured alumni for spotlights / homepage highlights. */
export async function getFeaturedAlumni(limit = 6) {
  return db
    .select({
      id: alumni.id,
      name: alumni.name,
      batchYear: alumni.batchYear,
      classOrStream: alumni.classOrStream,
      occupation: alumni.occupation,
      organization: alumni.organization,
      city: alumni.city,
      country: alumni.country,
      avatarUrl: alumni.avatarUrl,
      bio: alumni.bio,
      message: alumni.message,
      linkedinUrl: alumni.linkedinUrl,
      isFeatured: alumni.isFeatured,
      email: sql<string | null>`case when ${alumni.showEmailPublicly} = 1 then ${alumni.email} else null end`,
    })
    .from(alumni)
    .where(and(eq(alumni.status, "ACTIVE"), eq(alumni.isFeatured, true)))
    .orderBy(desc(alumni.batchYear))
    .limit(limit)
    .all();
}

/** Check if an alumnus already registered with this email. */
export async function getAlumniByEmail(email: string) {
  return db
    .select()
    .from(alumni)
    .where(eq(sql`lower(${alumni.email})`, email.trim().toLowerCase()))
    .get();
}

/** Single alumnus by primary key (admin view). */
export async function getAlumniById(id: number) {
  return db.select().from(alumni).where(eq(alumni.id, id)).get();
}

/** Admin panel listing with full search, filter, and unmasked fields. */
export async function getAdminAlumniList(params: {
  status?: string;
  batchYear?: number;
  search?: string;
  limit?: number;
  offset?: number;
} = {}) {
  const { status, batchYear, search, limit = 50, offset = 0 } = params;

  const conditions = [];

  if (status && status !== "ALL") {
    conditions.push(eq(alumni.status, status as "ACTIVE" | "HIDDEN" | "FLAGGED"));
  }

  if (batchYear && !isNaN(batchYear)) {
    conditions.push(eq(alumni.batchYear, batchYear));
  }

  if (search && search.trim()) {
    const term = `%${search.trim().toLowerCase()}%`;
    conditions.push(
      or(
        like(sql`lower(${alumni.name})`, term),
        like(sql`lower(${alumni.email})`, term),
        like(sql`lower(${alumni.phone})`, term),
        like(sql`lower(${alumni.occupation})`, term),
        like(sql`lower(coalesce(${alumni.organization}, ''))`, term),
        like(sql`lower(coalesce(${alumni.admissionNumber}, ''))`, term)
      )!
    );
  }

  const whereClause = conditions.length ? and(...conditions) : undefined;

  const items = await db
    .select()
    .from(alumni)
    .where(whereClause)
    .orderBy(desc(alumni.createdAt))
    .limit(limit)
    .offset(offset)
    .all();

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(alumni)
    .where(whereClause)
    .get();

  return {
    items,
    total: countResult?.count ?? 0,
  };
}

/** Admin overview metrics. */
export async function getAlumniMetrics() {
  const total = (await db.select({ count: sql<number>`count(*)` }).from(alumni).get())?.count ?? 0;
  const active = (await db.select({ count: sql<number>`count(*)` }).from(alumni).where(eq(alumni.status, "ACTIVE")).get())?.count ?? 0;
  const hidden = (await db.select({ count: sql<number>`count(*)` }).from(alumni).where(eq(alumni.status, "HIDDEN")).get())?.count ?? 0;
  const flagged = (await db.select({ count: sql<number>`count(*)` }).from(alumni).where(eq(alumni.status, "FLAGGED")).get())?.count ?? 0;
  const featured = (await db.select({ count: sql<number>`count(*)` }).from(alumni).where(eq(alumni.isFeatured, true)).get())?.count ?? 0;

  return { total, active, hidden, flagged, featured };
}

/** Full list for CSV export. */
export async function getAllAlumniForExport() {
  return db
    .select()
    .from(alumni)
    .orderBy(desc(alumni.batchYear), asc(alumni.name))
    .all();
}

/** Insert a new alumni record. */
export async function createAlumni(data: NewAlumni) {
  return db.insert(alumni).values(data).returning().get();
}

/** Update an existing alumni record. */
export async function updateAlumni(id: number, data: Partial<NewAlumni>) {
  return db
    .update(alumni)
    .set({
      ...data,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(alumni.id, id))
    .returning()
    .get();
}

/** Delete an alumni record. */
export async function deleteAlumni(id: number) {
  return db.delete(alumni).where(eq(alumni.id, id)).returning().get();
}

/* ─────────────────────────────────────────────────────────────────────────────
   DOCUMENT QUERIES
───────────────────────────────────────────────────────────────────────────── */

/** Documents for the home page BentoGrid: featured first, then sorted by display order / date. */
export async function getBentoDocuments(limit = 5): Promise<Document[]> {
  return db
    .select()
    .from(documents)
    .orderBy(desc(documents.isFeatured), asc(documents.displayOrder), desc(documents.createdAt))
    .limit(limit)
    .all();
}

/** All public documents, optionally filtered by category. */
export async function getAllDocuments(category?: string): Promise<Document[]> {
  if (category && category !== "All") {
    return db
      .select()
      .from(documents)
      .where(eq(documents.category, category))
      .orderBy(desc(documents.isFeatured), asc(documents.displayOrder), desc(documents.createdAt))
      .all();
  }
  return db
    .select()
    .from(documents)
    .orderBy(desc(documents.isFeatured), asc(documents.displayOrder), desc(documents.createdAt))
    .all();
}

/** Single document by primary key. */
export async function getDocumentById(id: number): Promise<Document | undefined> {
  return db.select().from(documents).where(eq(documents.id, id)).get();
}

/** Single document by its unique slug. */
export async function getDocumentBySlug(slug: string): Promise<Document | undefined> {
  return db.select().from(documents).where(eq(documents.slug, slug)).get();
}

/** Lightweight list for the admin documents panel. */
export async function getAllDocumentsForAdmin() {
  return db
    .select({
      id: documents.id,
      title: documents.title,
      slug: documents.slug,
      category: documents.category,
      fileType: documents.fileType,
      fileSize: documents.fileSize,
      fileUrl: documents.fileUrl,
      isFeatured: documents.isFeatured,
      date: documents.date,
      downloadsCount: documents.downloadsCount,
      displayOrder: documents.displayOrder,
      createdAt: documents.createdAt,
    })
    .from(documents)
    .orderBy(desc(documents.isFeatured), asc(documents.displayOrder), desc(documents.createdAt))
    .all();
}

/** Atomically increment download counter for a document and return updated document. */
export async function incrementDocumentDownloads(id: number): Promise<Document | undefined> {
  return db
    .update(documents)
    .set({
      downloadsCount: sql`${documents.downloadsCount} + 1`,
    })
    .where(eq(documents.id, id))
    .returning()
    .get();
}

/** Atomically increment download counter by slug. */
export async function incrementDocumentDownloadsBySlug(slug: string): Promise<Document | undefined> {
  return db
    .update(documents)
    .set({
      downloadsCount: sql`${documents.downloadsCount} + 1`,
    })
    .where(eq(documents.slug, slug))
    .returning()
    .get();
}

/** Document statistics for admin overview cards. */
export async function getDocumentStats() {
  const total = (await db.select({ count: sql<number>`count(*)` }).from(documents).get())?.count ?? 0;
  const featured = (await db.select({ count: sql<number>`count(*)` }).from(documents).where(eq(documents.isFeatured, true)).get())?.count ?? 0;
  const totalDownloads = (await db.select({ sum: sql<number>`sum(${documents.downloadsCount})` }).from(documents).get())?.sum ?? 0;
  
  return {
    total,
    featured,
    totalDownloads: totalDownloads || 0,
  };
}



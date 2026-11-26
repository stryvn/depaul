import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const stories = sqliteTable("stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull().default(""),
  category: text("category").notNull().default(""),
  coverImage: text("cover_image").notNull(),
  publishedAt: text("published_at").notNull(),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export type Story = typeof stories.$inferSelect;
export type NewStory = typeof stories.$inferInsert;

export const alumni = sqliteTable("alumni", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  showEmailPublicly: integer("show_email_publicly", { mode: "boolean" }).notNull().default(false),
  batchYear: integer("batch_year").notNull(),
  classOrStream: text("class_or_stream").notNull(),
  admissionNumber: text("admission_number"),

  // Professional & Current Info
  occupation: text("occupation").notNull(),
  organization: text("organization"),
  city: text("city").notNull(),
  country: text("country").notNull().default("India"),
  linkedinUrl: text("linkedin_url"),
  bio: text("bio"),
  message: text("message"), // Message / note to school and batchmates

  // Media & Badging
  avatarUrl: text("avatar_url"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),

  // Moderation & Status
  status: text("status", { enum: ["ACTIVE", "HIDDEN", "FLAGGED"] }).notNull().default("ACTIVE"),
  adminNotes: text("admin_notes"),

  // Timestamps
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export type Alumni = typeof alumni.$inferSelect;
export type NewAlumni = typeof alumni.$inferInsert;

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default("Statutory"),
  description: text("description").notNull().default(""),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull().default("PDF"),
  fileSize: text("file_size").notNull().default("1.0 MB"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  date: text("date").notNull().default(""),
  downloadsCount: integer("downloads_count").notNull().default(0),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;


export const admissionRegistrations = sqliteTable("admission_registrations", {
  id: text("id").primaryKey(),
  studentName: text("student_name").notNull(),
  classSought: text("class_sought").notNull(),
  guardianName: text("guardian_name").notNull(),
  guardianPhone: text("guardian_phone").notNull(),
  guardianEmail: text("guardian_email"),
  message: text("message"),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  expiresAt: text("expires_at").notNull().default(sql`(datetime('now', '+12 months'))`),
});

import { connection } from "next/server";
import type { MetadataRoute } from "next";
import { getAllStories } from "@/db/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const site = "https://depaulidukki.com";
  const pages = ["/", "/about", "/admissions", "/contact", "/gallery", "/docs", "/stories", "/alumni", "/tc"];
  const stories = await getAllStories();

  return [
    ...pages.map((path) => ({ url: new URL(path, site).href })),
    ...stories.map(({ slug, publishedAt }) => ({
      url: new URL(`/stories/${slug}`, site).href,
      ...(publishedAt && !Number.isNaN(Date.parse(publishedAt)) ? { lastModified: new Date(publishedAt) } : {}),
    })),
  ];
}

import { connection } from "next/server";
import type { Metadata } from "next";
import { getPublicAlumniList, getFeaturedAlumni, getAlumniBatchYears } from "@/db/queries";
import { AlumniDirectoryClient } from "@/components/alumni/AlumniDirectoryClient";


export const metadata: Metadata = {
  title: "Alumni Network",
  alternates: { canonical: "/alumni" },
  description:
    "Explore the official alumni network of De Paul Public School Rajamudy. Connect with fellow graduates across batches, discover career achievements, and register your alumni profile.",
  openGraph: {
    title: "Alumni Network | De Paul Public School Rajamudy",
    description:
      "Official alumni directory of De Paul Public School & Junior College, Rajamudy. For God & Country.",
    url: "https://depaulidukki.com/alumni",
    siteName: "De Paul Public School Rajamudy",
    type: "website",
  },
};

export default async function AlumniPage() {
  await connection();
  const { items, total } = await getPublicAlumniList({ limit: 200 });
  const featured = await getFeaturedAlumni(6);
  const batchYears = await getAlumniBatchYears();

  return (
    <AlumniDirectoryClient
      initialItems={items}
      featuredItems={featured}
      batchYears={batchYears}
      totalCount={total}
    />
  );
}

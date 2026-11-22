import type { Metadata } from "next";
import { getPublicAlumniList, getFeaturedAlumni, getAlumniBatchYears } from "@/db/queries";
import { AlumniDirectoryClient } from "@/components/alumni/AlumniDirectoryClient";

export const metadata: Metadata = {
  title: "Alumni Network | De Paul Public School & Junior College, Rajamudy",
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
  const { items, total } = getPublicAlumniList({ limit: 200 });
  const featured = getFeaturedAlumni(6);
  const batchYears = getAlumniBatchYears();

  return (
    <AlumniDirectoryClient
      initialItems={items}
      featuredItems={featured}
      batchYears={batchYears}
      totalCount={total}
    />
  );
}

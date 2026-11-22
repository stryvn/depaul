import React from "react";
import { getLatestStories, getBentoDocuments } from "@/db/queries";
import { HomePageClient } from "@/components/home/HomePageClient";

export const instant = false;

export default async function HomePage() {
  const [stories, docs] = await Promise.all([
    getLatestStories(6),
    getBentoDocuments(5),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "De Paul Public School & Junior College, Rajamudy",
    alternateName: "De Paul Public School Rajamudy",
    url: "https://depaulidukki.com",
    logo: "https://depaulidukki.com/assets/branding/logo.png",
    image: "https://depaulidukki.com/opengraph-image.png",
    description:
      "De Paul Public School & Junior College, Rajamudy, Idukki, Kerala. Affiliated to CBSE (No. 930624). Committed to holistic education and moral integrity.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Upputhode Road, Rajamudy P.O.",
      addressLocality: "Rajamudy",
      addressRegion: "Kerala",
      postalCode: "685604",
      addressCountry: "IN",
    },
    telephone: "+91-9605602400",
    email: "depaulrajamudy@gmail.com",
    slogan: "For God & Country",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient stories={stories} docs={docs} />
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import { getAllDocuments } from "@/db/queries";
import { DocumentsDirectoryClient } from "./DocumentsDirectoryClient";

export const metadata: Metadata = {
  title: "Official Documents & Disclosures — De Paul Public School Rajamudy",
  description:
    "Official CBSE Appendix-IX public disclosures, affiliation certificates, fire safety, building stability, fee structures, and academic handbooks of De Paul Public School & Junior College, Rajamudy (Affiliation No: 930624).",
  openGraph: {
    title: "Official Documents & Disclosures — De Paul Public School Rajamudy",
    description:
      "Access CBSE mandatory disclosures, affiliation certificates, and statutory school policies.",
    url: "https://depaulidukki.com/documents",
  },
};

export default async function DocumentsPage() {
  const documents = await getAllDocuments();

  return <DocumentsDirectoryClient initialDocuments={documents} />;
}

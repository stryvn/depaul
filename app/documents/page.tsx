import React from "react";
import type { Metadata } from "next";
import { getAllDocuments } from "@/db/queries";
import { DocsDirectoryEditorial } from "@/components/docs/DocsDirectoryEditorial";

export const instant = false;

export const metadata: Metadata = {
  title: "School documents | De Paul Public School Rajamudy",
  description: "View or download official school documents and CBSE disclosures.",
  openGraph: {
    title: "School documents | De Paul Public School Rajamudy",
    description: "View or download official school documents and CBSE disclosures.",
    url: "https://depaulidukki.com/documents",
  },
};

export default async function DocumentsPage() {
  const documents = await getAllDocuments();

  return <DocsDirectoryEditorial documents={documents} />;
}

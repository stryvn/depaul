import { connection } from "next/server";
import React from "react";
import type { Metadata } from "next";
import { getAllDocuments } from "@/db/queries";
import { DocsDirectoryEditorial } from "@/components/docs/DocsDirectoryEditorial";


export const metadata: Metadata = {
  title: "School documents",
  alternates: { canonical: "/docs" },
  description: "View or download official school documents and CBSE disclosures.",
  openGraph: {
    title: "School documents | De Paul Public School Rajamudy",
    description: "View or download official school documents and CBSE disclosures.",
    url: "https://depaulidukki.com/docs",
  },
};

export default async function DocumentsPage() {
  await connection();
  const documents = await getAllDocuments();

  return <DocsDirectoryEditorial documents={documents} />;
}

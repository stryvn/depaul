import React from "react";
import { notFound } from "next/navigation";
import { getDocumentById } from "@/db/queries";
import { DocumentForm } from "../../DocumentForm";

export default async function EditDocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  if (isNaN(numId)) {
    notFound();
  }

  const doc = await getDocumentById(numId);

  if (!doc) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <DocumentForm initialData={doc} />
    </div>
  );
}

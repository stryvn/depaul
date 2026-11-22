import React from "react";
import { notFound } from "next/navigation";
import { getStoryById } from "@/db/queries";
import { StoryForm } from "../../StoryForm";

export default async function EditStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);

  if (isNaN(numId)) {
    notFound();
  }

  const story = await getStoryById(numId);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <StoryForm initialData={story} />
    </div>
  );
}

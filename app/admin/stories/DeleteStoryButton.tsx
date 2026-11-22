"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteStory } from "@/app/actions/stories";

export function DeleteStoryButton({ id, title }: { id: number; title: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      startTransition(async () => {
        await deleteStory(id);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Delete Story"
      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import { getAllStoriesForAdmin } from "@/db/queries";
import { DeleteStoryButton } from "./DeleteStoryButton";

export default async function AdminStoriesPage() {
  if (!(await getCurrentSession())) redirect("/admin/login");
  const storiesList = await getAllStoriesForAdmin();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Manage Stories
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish campus events, achievements, sports updates, and news.
          </p>
        </div>
        <Link
          href="/admin/stories/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-royal text-white font-medium text-sm hover:bg-brand-royal/90 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Story</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        {storiesList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400 text-sm">No stories published yet.</p>
            <Link
              href="/admin/stories/new"
              className="mt-3 inline-block text-sm font-semibold text-brand-royal hover:underline"
            >
              Create the first story →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Title & Slug
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {storiesList.map((story) => (
                  <tr
                    key={story.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-md">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {story.title}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        /stories/{story.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-brand-royal border border-blue-100">
                        {story.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                      {story.publishedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/stories/${story.slug}`}
                          target="_blank"
                          title="View Live Page"
                          className="p-1.5 text-slate-400 hover:text-brand-royal hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/stories/${story.id}/edit`}
                          title="Edit Story"
                          className="p-1.5 text-slate-400 hover:text-brand-royal hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteStoryButton id={story.id} title={story.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

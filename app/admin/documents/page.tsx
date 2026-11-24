import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import { Plus, Edit, ExternalLink, FileText, Download, ShieldCheck, Star } from "lucide-react";
import { getAllDocumentsForAdmin, getDocumentStats } from "@/db/queries";
import { DeleteDocumentButton } from "./DeleteDocumentButton";

export default async function AdminDocumentsPage() {
  if (!(await getCurrentSession())) redirect("/admin/login");
  const documentsList = await getAllDocumentsForAdmin();
  const stats = await getDocumentStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Manage Documents & Disclosures
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish CBSE mandatory disclosures, affiliation certificates, safety NOCs, calendars, and handbooks.
          </p>
        </div>
        <Link
          href="/admin/documents/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-royal text-white font-medium text-sm hover:bg-brand-royal/90 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </Link>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Documents
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Featured on Bento
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {stats.featured} {stats.featured === 1 ? "Dossier" : "Dossiers"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Downloads
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">
                {stats.totalDownloads.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        {documentsList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-slate-400 text-sm">No documents published yet.</p>
            <Link
              href="/admin/documents/new"
              className="mt-3 inline-block text-sm font-semibold text-brand-royal hover:underline"
            >
              Upload the first document →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Document Title & Category
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Type / Size
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Downloads
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documentsList.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-royal flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {doc.title}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                              {doc.category}
                            </span>
                            {doc.isFeatured ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                <ShieldCheck className="w-3 h-3 text-amber-600" />
                                Bento Featured
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-brand-crimson border border-red-100 uppercase tracking-wider">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                      {doc.date || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        <Download className="w-3 h-3" />
                        {doc.downloadsCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View / Download PDF"
                          className="p-1.5 text-slate-400 hover:text-brand-royal hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/documents/${doc.id}/edit`}
                          title="Edit Document"
                          className="p-1.5 text-slate-400 hover:text-brand-royal hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteDocumentButton id={doc.id} title={doc.title} />
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

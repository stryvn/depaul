"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Eye,
  EyeOff,
  Star,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  MapPin,
  X,
  MessageSquare,
} from "lucide-react";
import type { Alumni } from "@/db/schema";
import {
  updateAlumniStatusAction,
  toggleFeaturedAlumniAction,
  deleteAlumniAction,
  updateAlumniAction,
} from "@/app/actions/alumni";

interface Props {
  initialAlumni: Alumni[];
  metrics: {
    total: number;
    active: number;
    hidden: number;
    flagged: number;
    featured: number;
  };
  batchYears: number[];
}

export function AlumniAdminClient({ initialAlumni, metrics, batchYears }: Props) {
  const [alumniList, setAlumniList] = useState<Alumni[]>(initialAlumni);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [batchFilter, setBatchFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAlumnus, setSelectedAlumnus] = useState<Alumni | null>(null);
  const [editingAlumnus, setEditingAlumnus] = useState<Alumni | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const showNotification = (type: "success" | "error", msg: string) => {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 4000);
  };

  // Filter list
  const filteredList = alumniList.filter((item) => {
    if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
    if (batchFilter !== "ALL" && item.batchYear !== parseInt(batchFilter, 10)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchEmail = item.email.toLowerCase().includes(q);
      const matchPhone = item.phone.toLowerCase().includes(q);
      const matchOcc = item.occupation.toLowerCase().includes(q);
      const matchOrg = (item.organization || "").toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchOcc && !matchOrg && !matchCity) return false;
    }
    return true;
  });

  const handleStatusToggle = (id: number, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "HIDDEN" : "ACTIVE";
    startTransition(async () => {
      try {
        await updateAlumniStatusAction(id, nextStatus as "ACTIVE" | "HIDDEN");
        setAlumniList((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: nextStatus as "ACTIVE" | "HIDDEN" } : a))
        );
        showNotification(
          "success",
          nextStatus === "ACTIVE" ? "Profile restored to live directory." : "Profile revoked / hidden from public directory."
        );
      } catch {
        showNotification("error", "Failed to update status.");
      }
    });
  };

  const handleFeaturedToggle = (id: number, currentFeatured: boolean) => {
    const nextFeatured = !currentFeatured;
    startTransition(async () => {
      try {
        await toggleFeaturedAlumniAction(id, nextFeatured);
        setAlumniList((prev) =>
          prev.map((a) => (a.id === id ? { ...a, isFeatured: nextFeatured } : a))
        );
        showNotification(
          "success",
          nextFeatured ? "Added to Featured Alumni spotlight." : "Removed from Featured spotlight."
        );
      } catch {
        showNotification("error", "Failed to toggle spotlight.");
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteAlumniAction(id);
        setAlumniList((prev) => prev.filter((a) => a.id !== id));
        setDeletingId(null);
        showNotification("success", "Alumni record deleted successfully.");
      } catch {
        showNotification("error", "Failed to delete alumni record.");
      }
    });
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAlumnus) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await updateAlumniAction(editingAlumnus.id, formData);
        // Refresh local state
        const name = formData.get("name")?.toString() || editingAlumnus.name;
        const occupation = formData.get("occupation")?.toString() || editingAlumnus.occupation;
        const organization = formData.get("organization")?.toString() || editingAlumnus.organization;
        const city = formData.get("city")?.toString() || editingAlumnus.city;
        const batchYear = parseInt(formData.get("batchYear")?.toString() || `${editingAlumnus.batchYear}`, 10);
        const status = (formData.get("status")?.toString() as "ACTIVE" | "HIDDEN" | "FLAGGED") || editingAlumnus.status;
        const adminNotes = formData.get("adminNotes")?.toString() || editingAlumnus.adminNotes;
        const message = formData.get("message")?.toString() || editingAlumnus.message;

        setAlumniList((prev) =>
          prev.map((a) =>
            a.id === editingAlumnus.id
              ? { ...a, name, occupation, organization, city, batchYear, status, adminNotes, message }
              : a
          )
        );
        setEditingAlumnus(null);
        showNotification("success", "Alumni profile updated successfully.");
      } catch {
        showNotification("error", "Failed to update profile.");
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
            notification.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-rose-50 text-rose-900 border-rose-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Alumni Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Supervise registered alumni, verify school records, feature distinguished graduates, and export lists.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/alumni/export"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Registered</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{metrics.total}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Active Live</span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">{metrics.active}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">Revoked / Hidden</span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-700 mt-1">{metrics.hidden}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-royal">Featured Spotlights</span>
          <div className="text-2xl sm:text-3xl font-bold text-brand-royal mt-1">{metrics.featured}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto overflow-x-auto">
          {["ALL", "ACTIVE", "HIDDEN", "FLAGGED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {st === "ALL" ? "All Profiles" : st === "ACTIVE" ? "Active" : st === "HIDDEN" ? "Hidden / Revoked" : "Flagged"}
            </button>
          ))}
        </div>

        {/* Search and Batch dropdown */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
          >
            <option value="ALL">All Batches</option>
            {batchYears.map((yr) => (
              <option key={yr} value={yr}>
                Batch of {yr}
              </option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, job, email, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
            />
          </div>
        </div>
      </div>

      {/* Alumni Data Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        {filteredList.length === 0 ? (
          <div className="py-16 text-center">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium text-sm">No alumni records found.</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4">Alumnus</th>
                  <th scope="col" className="px-6 py-4">Batch & Class</th>
                  <th scope="col" className="px-6 py-4">Current Role</th>
                  <th scope="col" className="px-6 py-4">Contact (Admin)</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredList.map((alumnus) => (
                  <tr key={alumnus.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Alumnus Avatar & Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {alumnus.avatarUrl ? (
                          <Image
                            src={alumnus.avatarUrl}
                            alt={alumnus.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-brand-royal/10 text-brand-royal font-bold text-xs flex items-center justify-center border border-brand-royal/20">
                            {alumnus.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <span>{alumnus.name}</span>
                            {alumnus.isFeatured && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold border border-amber-200">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                Spotlight
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-300" />
                            <span>{alumnus.city}, {alumnus.country}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Batch & Class */}
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        <span>Class of {alumnus.batchYear}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {alumnus.classOrStream}
                        {alumnus.admissionNumber && (
                          <span className="text-slate-400 block text-[11px]">Adm No: {alumnus.admissionNumber}</span>
                        )}
                      </div>
                    </td>

                    {/* Current Role */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800 text-xs flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[180px]">{alumnus.occupation}</span>
                      </div>
                      {alumnus.organization && (
                        <div className="text-xs text-slate-500 truncate max-w-[180px] mt-0.5">
                          {alumnus.organization}
                        </div>
                      )}
                      {alumnus.linkedinUrl && (
                        <a
                          href={alumnus.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-brand-royal hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                        >
                          LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </td>

                    {/* Contact (Private Admin View) */}
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{alumnus.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 truncate max-w-[180px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{alumnus.email}</span>
                        </div>
                        {alumnus.message && (
                          <button
                            type="button"
                            onClick={() => setSelectedAlumnus(alumnus)}
                            className="inline-flex items-center gap-1 text-[11px] text-brand-royal hover:underline font-medium cursor-pointer"
                          >
                            <MessageSquare className="w-3 h-3" />
                            View Message
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {alumnus.status === "ACTIVE" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : alumnus.status === "HIDDEN" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Revoked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Flagged
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Spotlight toggle */}
                        <button
                          type="button"
                          onClick={() => handleFeaturedToggle(alumnus.id, alumnus.isFeatured)}
                          disabled={isPending}
                          title={alumnus.isFeatured ? "Remove from Spotlight" : "Feature on Spotlight"}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            alumnus.isFeatured
                              ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                              : "bg-white text-slate-400 border-slate-200 hover:text-amber-500 hover:bg-slate-50"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${alumnus.isFeatured ? "fill-amber-500" : ""}`} />
                        </button>

                        {/* Status Toggle (Revoke / Restore) */}
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(alumnus.id, alumnus.status)}
                          disabled={isPending}
                          title={alumnus.status === "ACTIVE" ? "Revoke / Hide from live directory" : "Restore to live directory"}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            alumnus.status === "ACTIVE"
                              ? "bg-white text-slate-600 border-slate-200 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          {alumnus.status === "ACTIVE" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => setEditingAlumnus(alumnus)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-brand-royal hover:bg-slate-50 transition-colors cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeletingId(alumnus.id)}
                          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Message Modal */}
      {selectedAlumnus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Message from {selectedAlumnus.name}</h3>
              <button
                onClick={() => setSelectedAlumnus(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm whitespace-pre-wrap leading-relaxed border border-slate-100">
                {selectedAlumnus.message || "No message provided."}
              </div>
              {selectedAlumnus.bio && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Bio / Profile</h4>
                  <p className="text-xs text-slate-600">{selectedAlumnus.bio}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAlumnus(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-medium text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-lg">Delete Alumni Record?</h3>
            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to permanently delete this alumni profile and avatar? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-medium hover:bg-rose-700 cursor-pointer shadow-xs"
              >
                {isPending ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingAlumnus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Edit Alumni Record</h3>
              <button
                onClick={() => setEditingAlumnus(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingAlumnus.name}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingAlumnus.email}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={editingAlumnus.phone}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Year</label>
                  <input
                    type="number"
                    name="batchYear"
                    defaultValue={editingAlumnus.batchYear}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admission No (Optional)</label>
                  <input
                    type="text"
                    name="admissionNumber"
                    defaultValue={editingAlumnus.admissionNumber || ""}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class / Stream</label>
                  <input
                    type="text"
                    name="classOrStream"
                    defaultValue={editingAlumnus.classOrStream}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Current Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    defaultValue={editingAlumnus.occupation}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    name="organization"
                    defaultValue={editingAlumnus.organization || ""}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editingAlumnus.city}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    defaultValue={editingAlumnus.country}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  defaultValue={editingAlumnus.linkedinUrl || ""}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Note to School & Batch</label>
                <textarea
                  name="message"
                  rows={2}
                  defaultValue={editingAlumnus.message || ""}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Notes (Internal)</label>
                <input
                  type="text"
                  name="adminNotes"
                  defaultValue={editingAlumnus.adminNotes || ""}
                  placeholder="e.g. Verified against 2018 roll register by Fr. Principal"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Moderation Status</label>
                  <select
                    name="status"
                    defaultValue={editingAlumnus.status}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
                  >
                    <option value="ACTIVE">ACTIVE (Visible on public directory)</option>
                    <option value="HIDDEN">HIDDEN (Revoked / hidden from directory)</option>
                    <option value="FLAGGED">FLAGGED (Under investigation)</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      value="true"
                      defaultChecked={editingAlumnus.isFeatured}
                      className="rounded border-slate-300 text-brand-royal focus:ring-brand-royal/30"
                    />
                    <span>Feature on Spotlight</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showEmailPublicly"
                      value="true"
                      defaultChecked={editingAlumnus.showEmailPublicly}
                      className="rounded border-slate-300 text-brand-royal focus:ring-brand-royal/30"
                    />
                    <span>Show Email Publicly</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingAlumnus(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-xl bg-brand-royal text-white text-xs font-semibold hover:bg-brand-royal/90 cursor-pointer shadow-xs"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

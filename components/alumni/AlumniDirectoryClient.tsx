"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  Mail,
  UserPlus,
  Star,
  MessageSquare,
  Sparkles,
  X,
  Filter,
} from "lucide-react";
import { AlumniRegistrationModal } from "./AlumniRegistrationModal";

export interface DirectoryAlumniItem {
  id: number;
  name: string;
  batchYear: number;
  classOrStream: string;
  occupation: string;
  organization: string | null;
  city: string;
  country: string;
  linkedinUrl: string | null;
  bio: string | null;
  message: string | null;
  avatarUrl: string | null;
  isFeatured: boolean;
  email: string | null;
}

interface Props {
  initialItems: DirectoryAlumniItem[];
  featuredItems: DirectoryAlumniItem[];
  batchYears: number[];
  totalCount: number;
}

export function AlumniDirectoryClient({
  initialItems,
  featuredItems,
  batchYears,
  totalCount,
}: Props) {
  const [items] = useState<DirectoryAlumniItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalAlumnus, setActiveModalAlumnus] = useState<DirectoryAlumniItem | null>(null);

  // Filtered view
  const filteredItems = items.filter((item) => {
    if (selectedBatch !== "ALL" && item.batchYear !== parseInt(selectedBatch, 10)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchOcc = item.occupation.toLowerCase().includes(q);
      const matchOrg = (item.organization || "").toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      if (!matchName && !matchOcc && !matchOrg && !matchCity) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-royal via-[#01417a] to-slate-900 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>De Paul Public School & Junior College, Rajamudy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-tight">
            De Paul Alumni Network
          </h1>

          <p className="text-base sm:text-lg text-sky-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            United by our motto <span className="font-semibold text-white">“For God & Country”</span>. Celebrating the global community of Depaulians shaping leadership, medicine, technology, and civil service.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register as Alumni</span>
            </button>
            <div className="text-xs text-sky-200/80 font-medium sm:border-l sm:border-white/20 sm:pl-4 py-1">
              <strong>{totalCount}</strong> Depaulians Registered
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Search & Filter Bar Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
            >
              <option value="ALL">All Batches</option>
              {batchYears.map((yr) => (
                <option key={yr} value={yr}>
                  Class of {yr}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, profession, company, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-royal/20"
            />
          </div>
        </div>

        {/* Featured Spotlights (if any) */}
        {featuredItems.length > 0 && selectedBatch === "ALL" && !searchQuery.trim() && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-xl font-bold text-slate-900 font-display">Featured Depaulians</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((alumnus) => (
                <div
                  key={`featured-${alumnus.id}`}
                  onClick={() => setActiveModalAlumnus(alumnus)}
                  className="group bg-gradient-to-br from-amber-50/60 to-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md hover:shadow-xl hover:border-amber-300 transition-all cursor-pointer relative"
                >
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider">
                    <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                    Spotlight
                  </div>

                  <div className="flex items-center gap-4">
                    {alumnus.avatarUrl ? (
                      <Image
                        src={alumnus.avatarUrl}
                        alt={alumnus.name}
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-brand-royal text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                        {alumnus.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-royal transition-colors">
                        {alumnus.name}
                      </h3>
                      <div className="text-xs text-amber-800 font-semibold mt-0.5">
                        Class of {alumnus.batchYear} • {alumnus.classOrStream}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-amber-200/50 space-y-1.5 text-xs">
                    <div className="font-medium text-slate-800 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{alumnus.occupation}</span>
                    </div>
                    {alumnus.organization && (
                      <div className="text-slate-600 truncate pl-5">{alumnus.organization}</div>
                    )}
                    <div className="text-slate-500 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{alumnus.city}, {alumnus.country}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Directory Card Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {selectedBatch !== "ALL" ? `Batch of ${selectedBatch}` : "All Alumni"}
              <span className="text-sm font-normal text-slate-500 ml-2">
                ({filteredItems.length} {filteredItems.length === 1 ? "alumnus" : "alumni"})
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No alumni found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                No profiles match your search criteria. Be the first from this batch or field to register!
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-royal text-white text-xs font-semibold hover:bg-brand-royal/90 cursor-pointer shadow-xs"
                >
                  Register Profile Now
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((alumnus) => (
                <div
                  key={alumnus.id}
                  onClick={() => setActiveModalAlumnus(alumnus)}
                  className="group bg-white rounded-3xl p-5 border border-slate-200 hover:border-brand-royal/40 shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top: Avatar & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      {alumnus.avatarUrl ? (
                        <Image
                          src={alumnus.avatarUrl}
                          alt={alumnus.name}
                          width={52}
                          height={52}
                          className="w-13 h-13 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
                        />
                      ) : (
                        <div className="w-13 h-13 rounded-2xl bg-brand-royal/10 text-brand-royal font-bold text-sm flex items-center justify-center shrink-0 border border-brand-royal/20">
                          {alumnus.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 text-brand-royal text-[11px] font-bold border border-sky-100">
                        Class of {alumnus.batchYear}
                      </span>
                    </div>

                    {/* Alumnus Name & Stream */}
                    <div className="mt-3.5">
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-royal transition-colors">
                        {alumnus.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {alumnus.classOrStream}
                      </p>
                    </div>

                    {/* Role & Org */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs">
                      <div className="font-medium text-slate-800 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{alumnus.occupation}</span>
                      </div>
                      {alumnus.organization && (
                        <div className="text-slate-500 truncate pl-5 text-[11px]">
                          {alumnus.organization}
                        </div>
                      )}
                      <div className="text-slate-400 flex items-center gap-1.5 pt-1 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                        <span className="truncate">{alumnus.city}, {alumnus.country}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Message badge & Social */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {alumnus.message ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-royal">
                        <MessageSquare className="w-3 h-3" />
                        <span>Has message</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">View profile</span>
                    )}

                    <div className="flex items-center gap-2">
                      {alumnus.linkedinUrl && (
                        <a
                          href={alumnus.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-md text-slate-400 hover:text-brand-royal hover:bg-slate-100 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {alumnus.email && (
                        <a
                          href={`mailto:${alumnus.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded-md text-slate-400 hover:text-brand-royal hover:bg-slate-100 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Alumnus Detail Modal */}
      {activeModalAlumnus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                {activeModalAlumnus.avatarUrl ? (
                  <Image
                    src={activeModalAlumnus.avatarUrl}
                    alt={activeModalAlumnus.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-brand-royal text-white font-bold text-base flex items-center justify-center">
                    {activeModalAlumnus.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900 text-lg font-display">
                    {activeModalAlumnus.name}
                  </h3>
                  <div className="text-xs font-semibold text-brand-royal mt-0.5">
                    Class of {activeModalAlumnus.batchYear} • {activeModalAlumnus.classOrStream}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAlumnus(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <Briefcase className="w-4 h-4 text-brand-royal shrink-0" />
                  <span>{activeModalAlumnus.occupation}</span>
                  {activeModalAlumnus.organization && (
                    <span className="text-slate-500">at {activeModalAlumnus.organization}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{activeModalAlumnus.city}, {activeModalAlumnus.country}</span>
                </div>
              </div>

              {activeModalAlumnus.message && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-brand-royal" />
                    <span>Memory / Message to School & Batchmates</span>
                  </h4>
                  <div className="bg-sky-50/70 p-4 rounded-2xl text-slate-800 italic leading-relaxed border border-sky-100">
                    “{activeModalAlumnus.message}”
                  </div>
                </div>
              )}

              {activeModalAlumnus.bio && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Bio & Achievements
                  </h4>
                  <p className="text-slate-600 leading-relaxed">{activeModalAlumnus.bio}</p>
                </div>
              )}

              {/* Contact Links */}
              <div className="pt-2 flex items-center gap-3">
                {activeModalAlumnus.linkedinUrl && (
                  <a
                    href={activeModalAlumnus.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {activeModalAlumnus.email && (
                  <a
                    href={`mailto:${activeModalAlumnus.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-royal/10 hover:bg-brand-royal/20 text-brand-royal text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    <span>{activeModalAlumnus.email}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalAlumnus(null)}
                className="px-5 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <AlumniRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Re-fetch or window reload to see immediate activation
        }}
      />
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";
import { AlumniRegistrationModal } from "./AlumniRegistrationModal";
import "./alumni.css";

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
  batchYears,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = useState(1);
  const [activeProfile, setActiveProfile] = useState<DirectoryAlumniItem | null>(null);

  const pageSize = 6;

  // Real alumni data only
  const allProfiles = initialItems;

  // Extract distinct leaving years sorted descending
  const availableYears = useMemo(() => {
    const yrSet = new Set<number>([
      ...batchYears,
      ...allProfiles.map((p) => p.batchYear),
    ]);
    return Array.from(yrSet).sort((a, b) => b - a);
  }, [batchYears, allProfiles]);

  // Filter profiles based on input
  const filteredProfiles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allProfiles.filter((profile) => {
      // Class filter (X or XII)
      if (selectedClass) {
        const stream = (profile.classOrStream || "").toUpperCase();
        if (selectedClass === "X") {
          const isTen = stream.includes("10") || (stream.includes("X") && !stream.includes("XII"));
          if (!isTen) return false;
        } else if (selectedClass === "XII") {
          const isTwelve = stream.includes("12") || stream.includes("XII");
          if (!isTwelve) return false;
        }
      }

      // Year filter
      if (selectedYear) {
        if (profile.batchYear !== Number(selectedYear)) return false;
      }

      // Name, city, or occupation search
      if (q) {
        const matchesName = profile.name.toLowerCase().includes(q);
        const matchesCity = profile.city.toLowerCase().includes(q);
        const matchesOcc = profile.occupation.toLowerCase().includes(q);
        const matchesOrg = (profile.organization || "").toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesOcc && !matchesOrg) return false;
      }

      return true;
    });
  }, [allProfiles, searchQuery, selectedClass, selectedYear]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProfiles.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleProfiles = filteredProfiles.slice(startIndex, startIndex + pageSize);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedClass("");
    setSelectedYear("");
    setPage(1);
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getNormalizedClass = (classOrStream: string) => {
    const upper = (classOrStream || "").toUpperCase();
    if (upper.includes("10") || (upper.includes("X") && !upper.includes("XII"))) {
      return "Class X";
    }
    return "Class XII";
  };

  return (
    <div className="alumni-page">
      {/* Official Top Navbar */}
      <TopNavbar isMerged={true} />

      <main id="main" tabIndex={-1}>
        {/* Hero Section */}
        <section className="hero wrap alumni-hero" aria-labelledby="alumni-title">
          <div className="hero-copy">
            <p className="label">Rajamudy, Idukki</p>
            <h1 id="alumni-title">
              De Paul<br /> <span>Alumni</span>
            </h1>
            <p className="lede">
              Find your classmates and see when alumni are getting together.
            </p>
            <div className="hero-actions">
              <a className="contact-action" href="#directory">
                Browse the directory
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="register-action"
              >
                Join the Directory
              </button>
            </div>
          </div>
          <figure className="hero-photo">
            <Image
              src="/assets/campus.webp"
              alt="Aerial view of the De Paul campus in Rajamudy"
              priority
              width={1280}
              height={720}
            />
            <figcaption>De Paul campus, Rajamudy</figcaption>
          </figure>
        </section>

        {/* Two-column layout: Events & Directory */}
        <div className="wrap alumni-layout">
          {/* Left Column: Events */}
          <section id="events" className="event-section" aria-labelledby="events-title">
            <div className="section-heading">
              <h2 id="events-title">Alumni events</h2>
            </div>
            <div className="agenda">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 text-sm text-slate-500">
                No upcoming alumni events scheduled at this time. Announcements for alumni meets and reunions will be published here.
              </div>
            </div>
          </section>

          {/* Right Column: Directory */}
          <section id="directory" aria-labelledby="directory-title">
            <div className="section-heading">
              <h2 id="directory-title">Alumni directory</h2>
            </div>

            <form
              className="filters"
              role="search"
              aria-label="Search alumni directory"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="field">
                <label htmlFor="search">Search by name or city</label>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="e.g. Maya or Kochi"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="field">
                <label htmlFor="leaving-class">Class left</label>
                <select
                  name="leavingClass"
                  id="leaving-class"
                  value={selectedClass}
                  onChange={(e) => {
                    setSelectedClass(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Both classes</option>
                  <option value="X">Class X</option>
                  <option value="XII">Class XII</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="leaving-year">Year left</label>
                <select
                  name="leavingYear"
                  id="leaving-year"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">All years</option>
                  {availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="clear"
                onClick={handleClearFilters}
              >
                Clear filters
              </button>
            </form>

            {/* Results count status */}
            <p className="result-count" id="result-count" role="status" tabIndex={-1}>
              {filteredProfiles.length > 0
                ? `Showing ${startIndex + 1}–${startIndex + visibleProfiles.length} of ${filteredProfiles.length} ${
                    filteredProfiles.length === 1 ? "profile" : "profiles"
                  }`
                : allProfiles.length === 0
                ? "0 profiles registered"
                : "0 matching profiles"}
            </p>

            {/* Empty state */}
            {filteredProfiles.length === 0 && (
              <div className="empty">
                {allProfiles.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-xl border border-slate-200/80 space-y-3">
                    <p className="text-slate-700 font-semibold text-base">The alumni directory is open for registration.</p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Be among the first Depaulians to join the official network. Register your profile to connect with classmates.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2059aa] text-white font-semibold text-sm hover:bg-[#17478d] transition-colors cursor-pointer mt-2"
                    >
                      Register Your Profile
                    </button>
                  </div>
                ) : (
                  <p id="empty">No matches found. Try changing the name, city, class or year.</p>
                )}
              </div>
            )}

            {/* Profiles List */}
            {filteredProfiles.length > 0 && (
              <ul className="alumni-list" id="alumni-list" aria-label="Alumni profiles">
                {visibleProfiles.map((profile) => (
                  <li key={profile.id}>
                    <div className="profile-header">
                      {profile.avatarUrl ? (
                        <Image
                          src={profile.avatarUrl}
                          alt={profile.name}
                          width={46}
                          height={46}
                          className="initials-img"
                        />
                      ) : (
                        <span className="initials" aria-hidden="true">
                          {getInitials(profile.name)}
                        </span>
                      )}
                      <div>
                        <h3>{profile.name}</h3>
                        <p>{profile.city}</p>
                      </div>
                    </div>

                    <div className="profile-footer">
                      <p>
                        {getNormalizedClass(profile.classOrStream)} · {profile.batchYear}
                      </p>
                      <button
                        type="button"
                        className="profile-open"
                        aria-label={`View profile for ${profile.name}`}
                        aria-haspopup="dialog"
                        onClick={() => setActiveProfile(profile)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                id="pagination"
                className="pagination"
                role="group"
                aria-label="Directory pages"
              >
                <button
                  type="button"
                  id="previous-page"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </button>
                <span id="page-count">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  id="next-page"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Profile Preview Modal */}
      {activeProfile && (
        <div
          className="profile-preview-overlay"
          onClick={() => setActiveProfile(null)}
        >
          <div
            className="profile-preview"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-name"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-preview-header">
              {activeProfile.avatarUrl ? (
                <Image
                  src={activeProfile.avatarUrl}
                  alt={activeProfile.name}
                  width={62}
                  height={62}
                  className="initials-img"
                  style={{ width: "62px", height: "62px", marginBottom: "11px" }}
                />
              ) : (
                <span id="profile-initials" className="initials" aria-hidden="true">
                  {getInitials(activeProfile.name)}
                </span>
              )}
              <h2 id="profile-name">{activeProfile.name}</h2>
            </div>

            <dl className="profile-facts">
              <div>
                <dt>Class left</dt>
                <dd id="profile-class">{getNormalizedClass(activeProfile.classOrStream)}</dd>
              </div>
              <div>
                <dt>Year left</dt>
                <dd id="profile-year">{activeProfile.batchYear}</dd>
              </div>
              <div>
                <dt>City</dt>
                <dd id="profile-city">{activeProfile.city}</dd>
              </div>

              {activeProfile.occupation && activeProfile.occupation !== "Alumnus" && (
                <div>
                  <dt>Role</dt>
                  <dd>
                    {activeProfile.occupation}
                    {activeProfile.organization ? ` · ${activeProfile.organization}` : ""}
                  </dd>
                </div>
              )}

              {activeProfile.message && (
                <div>
                  <dt>Message</dt>
                  <dd className="italic font-normal text-slate-700">“{activeProfile.message}”</dd>
                </div>
              )}

              {activeProfile.linkedinUrl && (
                <div>
                  <dt>LinkedIn</dt>
                  <dd>
                    <a
                      href={activeProfile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#173e82] underline font-semibold"
                    >
                      View LinkedIn Profile ↗
                    </a>
                  </dd>
                </div>
              )}

              {activeProfile.email && (
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a
                      href={`mailto:${activeProfile.email}`}
                      className="text-[#173e82] underline font-semibold"
                    >
                      {activeProfile.email}
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-close"
                aria-label="Close profile"
                onClick={() => setActiveProfile(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <AlumniRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Official Footer */}
      <Footer />
    </div>
  );
}

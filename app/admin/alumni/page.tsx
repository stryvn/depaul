import React from "react";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { getAdminAlumniList, getAlumniMetrics, getAlumniBatchYears } from "@/db/queries";
import { AlumniAdminClient } from "./AlumniAdminClient";

export default async function AdminAlumniPage() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { items: alumniList } = await getAdminAlumniList({ limit: 1000 });
  const metrics = await getAlumniMetrics();
  const batchYears = await getAlumniBatchYears();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <AlumniAdminClient
        initialAlumni={alumniList}
        metrics={metrics}
        batchYears={batchYears}
      />
    </div>
  );
}

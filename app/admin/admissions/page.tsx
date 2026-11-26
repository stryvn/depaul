import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, gt, sql } from "drizzle-orm";
import { db } from "@/db";
import { admissionRegistrations } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth";

const PAGE_SIZE = 25;

export default async function AdminAdmissionsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  if (!(await getCurrentSession())) redirect("/admin/login");

  const requested = Number((await searchParams).page);
  const page = Number.isSafeInteger(requested) && requested > 0 ? Math.min(requested, 10000) : 1;
  const enquiries = await db.select().from(admissionRegistrations)
    .where(gt(admissionRegistrations.expiresAt, sql`datetime('now')`))
    .orderBy(desc(admissionRegistrations.createdAt), desc(admissionRegistrations.id))
    .limit(PAGE_SIZE + 1).offset((page - 1) * PAGE_SIZE);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Admissions enquiries</h1>
      <p className="mt-2 text-sm text-slate-600">Contact parents and guardians who have enquired about a place.</p>
      {enquiries.length === 0 ? (
        <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6">No enquiries on this page.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {enquiries.slice(0, PAGE_SIZE).map((enquiry) => (
            <article key={enquiry.id} className="min-w-0 rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="break-words text-lg font-bold">{enquiry.studentName} · {enquiry.classSought}</h2>
              <p className="mt-1 break-all text-xs text-slate-600">{enquiry.createdAt} UTC · {enquiry.id}</p>
              <p className="mt-3 break-words text-sm">{enquiry.guardianName} · <a className="underline" href={`tel:${enquiry.guardianPhone.replace(/[^+\d]/g, "")}`}>{enquiry.guardianPhone}</a></p>
              {enquiry.guardianEmail && <p className="break-all text-sm"><a className="underline" href={`mailto:${enquiry.guardianEmail}`}>{enquiry.guardianEmail}</a></p>}
              {enquiry.message && <p className="mt-3 whitespace-pre-wrap break-words text-sm text-slate-700">{enquiry.message}</p>}
            </article>
          ))}
        </div>
      )}
      <nav aria-label="Enquiry pages" className="mt-6 flex items-center gap-4 text-sm font-semibold">
        {page > 1 && <Link href={`?page=${page - 1}`} className="underline">Previous</Link>}
        <span>Page {page}</span>
        {enquiries.length > PAGE_SIZE && <Link href={`?page=${page + 1}`} className="underline">Next</Link>}
      </nav>
    </section>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/auth";
import { getAllAlumniForExport } from "@/db/queries";

function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  const str = String(value).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(request: NextRequest) {
  const session = await getCurrentSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const alumniList = getAllAlumniForExport();

  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Batch Year",
    "Class / Stream",
    "Admission Number",
    "Occupation",
    "Organization",
    "City",
    "Country",
    "LinkedIn URL",
    "Bio",
    "Message / Memory",
    "Show Email Publicly",
    "Status",
    "Is Featured",
    "Admin Notes",
    "Registered At",
  ];

  const rows = alumniList.map((a) => [
    escapeCsvCell(a.id),
    escapeCsvCell(a.name),
    escapeCsvCell(a.email),
    escapeCsvCell(a.phone),
    escapeCsvCell(a.batchYear),
    escapeCsvCell(a.classOrStream),
    escapeCsvCell(a.admissionNumber),
    escapeCsvCell(a.occupation),
    escapeCsvCell(a.organization),
    escapeCsvCell(a.city),
    escapeCsvCell(a.country),
    escapeCsvCell(a.linkedinUrl),
    escapeCsvCell(a.bio),
    escapeCsvCell(a.message),
    escapeCsvCell(a.showEmailPublicly ? "Yes" : "No"),
    escapeCsvCell(a.status),
    escapeCsvCell(a.isFeatured ? "Yes" : "No"),
    escapeCsvCell(a.adminNotes),
    escapeCsvCell(a.createdAt),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `depaul-alumni-export-${dateStr}.csv`;

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

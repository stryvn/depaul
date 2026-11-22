import { NextResponse } from "next/server";
import { incrementDocumentDownloads } from "@/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const docId = parseInt(id, 10);

    if (isNaN(docId)) {
      return new NextResponse("Invalid document ID", { status: 400 });
    }

    const doc = incrementDocumentDownloads(docId);
    if (!doc || !doc.fileUrl) {
      return new NextResponse("Document not found", { status: 404 });
    }

    // Redirect to the actual document file URL (browser initiates download / preview)
    const fileUrl = doc.fileUrl.startsWith("http")
      ? doc.fileUrl
      : new URL(doc.fileUrl, request.url).toString();

    return NextResponse.redirect(fileUrl, { status: 307 });
  } catch (error) {
    console.error("Error serving document download:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

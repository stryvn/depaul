import { NextResponse } from "next/server";
import { incrementDocumentDownloads, incrementDocumentDownloadsBySlug } from "@/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isNumeric = /^\d+$/.test(id);

    const doc = isNumeric
      ? await incrementDocumentDownloads(parseInt(id, 10))
      : await incrementDocumentDownloadsBySlug(id);

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

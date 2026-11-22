import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const MAX_IMAGE_BYTES = 200 * 1024; // 200KB hard ceiling (client compresses to < 50KB)

/**
 * Validates image buffer magic bytes.
 * Returns the detected MIME type, or null if invalid.
 */
export function detectImageMime(buffer: Buffer): "image/webp" | "image/jpeg" | "image/png" | null {
  if (buffer.length < 12) return null;

  // WebP: RIFF .... WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  return null;
}

/**
 * Strips EXIF metadata (camera details, GPS location) from JPEG buffers.
 */
function stripJpegExif(buffer: Buffer): Buffer {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return buffer;
  }

  const pieces: Buffer[] = [Buffer.from([0xff, 0xd8])];
  let offset = 2;

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;

    const marker = buffer[offset + 1];

    // Standalone markers without length: RST, SOI, EOI, TEM
    if (marker === 0xd9) {
      // EOI (End of Image)
      pieces.push(buffer.subarray(offset, offset + 2));
      break;
    }

    if (offset + 4 > buffer.length) break;
    const length = buffer.readUInt16BE(offset + 2);
    const segmentEnd = offset + 2 + length;

    // Marker 0xE1 is APP1 (EXIF / GPS). Omit it to strip privacy metadata.
    // Marker 0xED is APP13 (Photoshop IPTC).
    if (marker !== 0xe1 && marker !== 0xed) {
      pieces.push(buffer.subarray(offset, segmentEnd));
    }

    // SOS (Start of Scan - 0xDA): followed directly by compressed entropy stream
    if (marker === 0xda) {
      pieces.push(buffer.subarray(segmentEnd));
      break;
    }

    offset = segmentEnd;
  }

  return Buffer.concat(pieces);
}

/**
 * Strips EXIF/XMP chunks from WebP container buffers.
 */
function stripWebpMetadata(buffer: Buffer): Buffer {
  if (buffer.length < 12 || detectImageMime(buffer) !== "image/webp") {
    return buffer;
  }

  // If Simple WebP (VP8 or VP8L without RIFF container chunks), there are no EXIF chunks.
  const fourCC = buffer.toString("ascii", 12, 16);
  if (fourCC === "VP8 " || fourCC === "VP8L") {
    return buffer; // Pure bitstream, zero EXIF metadata
  }

  // If Extended WebP (VP8X), walk through chunks and discard EXIF and XMP chunks
  const chunks: Buffer[] = [];
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const paddedSize = chunkSize + (chunkSize % 2); // WebP chunks are 2-byte aligned
    const chunkTotal = 8 + paddedSize;

    if (offset + chunkTotal > buffer.length) break;

    if (chunkId !== "EXIF" && chunkId !== "XMP ") {
      chunks.push(buffer.subarray(offset, offset + chunkTotal));
    }

    offset += chunkTotal;
  }

  const payload = Buffer.concat(chunks);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0);
  header.writeUInt32LE(payload.length + 4, 4);
  header.write("WEBP", 8);

  return Buffer.concat([header, payload]);
}

/**
 * Sanitizes, strips metadata, and writes the avatar image to `public/uploads/alumni/`.
 * Returns the public URL path.
 */
export async function sanitizeAndSaveAvatar(file: File): Promise<{ url?: string; error?: string }> {
  if (file.size === 0) {
    return { error: "Empty file." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Image payload exceeds 200KB limit. Please choose a smaller photo." };
  }

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  const mime = detectImageMime(rawBuffer);

  if (!mime) {
    return { error: "Invalid image format. Only WebP, JPEG, and PNG images are supported." };
  }

  let sanitizedBuffer: Uint8Array = new Uint8Array(rawBuffer);
  let ext = "webp";

  if (mime === "image/webp") {
    sanitizedBuffer = new Uint8Array(stripWebpMetadata(rawBuffer));
    ext = "webp";
  } else if (mime === "image/jpeg") {
    sanitizedBuffer = new Uint8Array(stripJpegExif(rawBuffer));
    ext = "jpg";
  } else if (mime === "image/png") {
    ext = "png";
  }

  const randomHash = crypto.randomBytes(8).toString("hex");
  const filename = `alumni-${Date.now()}-${randomHash}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", "alumni");

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), sanitizedBuffer);

  return { url: `/uploads/alumni/${filename}` };
}

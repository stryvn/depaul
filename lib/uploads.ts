import { promises as fs } from "node:fs";
import path from "node:path";
import { cloudflareBindings } from "./cloudflare";

const mediaOrigin = "https://media.depaulidukki.com";

export async function saveUpload(
  directory: "stories" | "documents" | "alumni",
  filename: string,
  content: Uint8Array<ArrayBuffer>,
  contentType: string,
): Promise<string> {
  const { STORAGE, DEPAUL_CLOUDFLARE } = cloudflareBindings();
  const key = `uploads/${directory}/${filename}`;
  if (STORAGE) {
    await STORAGE.put(key, content, { httpMetadata: { contentType } });
    return `${mediaOrigin}/${key}`;
  }
  if (DEPAUL_CLOUDFLARE) throw new Error("Missing R2 binding STORAGE");
  const localPath = path.join(process.cwd(), "public", key);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, content);
  return `/${key}`;
}

export async function removeAlumniPhoto(url: string): Promise<void> {
  const { STORAGE } = cloudflareBindings();
  const prefix = `${mediaOrigin}/uploads/alumni/`;
  const filename = path.basename(url);
  if (STORAGE && url === prefix + filename) {
    await STORAGE.delete(`uploads/alumni/${filename}`);
  } else if (!STORAGE && url === `/uploads/alumni/${filename}`) {
    await fs.unlink(path.join(process.cwd(), "public", "uploads", "alumni", filename));
  }
}

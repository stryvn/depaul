import { getCloudflareContext } from "@opennextjs/cloudflare";

type Bindings = {
  DB?: D1Database;
  STORAGE?: R2Bucket;
  DEPAUL_CLOUDFLARE?: string;
};

export function cloudflareBindings(): Bindings {
  try {
    return getCloudflareContext().env as Bindings;
  } catch {
    return {};
  }
}

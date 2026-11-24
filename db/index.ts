import { drizzle } from "drizzle-orm/sqlite-proxy";
import { cloudflareBindings } from "../lib/cloudflare";
import * as schema from "./schema";

let local: import("better-sqlite3").Database | undefined;

export const db = drizzle(async (query, params, method) => {
  const { DB, DEPAUL_CLOUDFLARE } = cloudflareBindings();
  if (DB) {
    const statement = DB.prepare(query).bind(...params);
    if (method === "run") {
      await statement.run();
      return { rows: [] };
    }
    const rows = await statement.raw();
    return { rows: method === "get" ? rows[0] : rows };
  }

  if (DEPAUL_CLOUDFLARE) throw new Error("Missing D1 binding DB");
  if (!local) {
    const { default: Database } = await import("better-sqlite3");
    local = new Database("local.db");
    local.pragma("journal_mode = WAL");
  }
  const statement = local.prepare(query);
  if (method === "run") {
    statement.run(...params);
    return { rows: [] };
  }
  const raw = statement.raw();
  if (method === "get") return { rows: raw.get(...params) as unknown[] };
  return { rows: raw.all(...params) };
}, { schema });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "sqlite",
  out: "./cloudflare-migrations",
  dbCredentials: {
    url: "./local.db",
  },
});

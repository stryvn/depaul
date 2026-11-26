import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const converter = require.resolve("@opennextjs/aws/overrides/converters/edge.js");
const source = readFileSync(converter, "utf8");

// Cookie 1.x exports parse as a named function. OpenNext's default import
// can become undefined after the Cloudflare bundle is built.
const original = 'import cookieParser from "cookie";';
const corrected = 'import { parse as parseCookie } from "cookie";';
if (source.includes(original) && source.includes("cookieParser.parse(cookieHeader)")) {
  writeFileSync(converter, source.replace(original, corrected)
    .replace("cookieParser.parse(cookieHeader)", "parseCookie(cookieHeader)"));
} else if (!source.includes(corrected) || !source.includes("parseCookie(cookieHeader)")) {
  throw new Error("OpenNext cookie converter changed. Review the compatibility patch.");
}

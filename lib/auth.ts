/* ── helpers ────────────────────────────────────────────────── */

function base64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const b64 = (str + pad).replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Admin session signing is not configured.");
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/* ── public API ─────────────────────────────────────────────── */

/**
 * Create a JWT signed with HMAC-SHA256.
 * Payload receives `sub` (username) and `exp` (7-day expiry) automatically
 * if not already present.
 */
export async function signJwt(payload: Record<string, unknown>): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = {
    ...payload,
    sub: payload.sub ?? payload.username,
    exp: payload.exp ?? now + 60 * 60 * 24 * 7, // 7 days
  };

  const enc = new TextEncoder();
  const segments = `${base64url(enc.encode(JSON.stringify(header)).buffer)}.${base64url(enc.encode(JSON.stringify(body)).buffer)}`;

  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(segments));
  return `${segments}.${base64url(sig)}`;
}

/**
 * Verify a JWT and return its payload, or `null` if invalid / expired.
 */
export async function verifyJwt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const enc = new TextEncoder();
    const key = await getKey();
    const data = enc.encode(`${parts[0]}.${parts[1]}`);
    const sig = base64urlDecode(parts[2]);

    const valid = await crypto.subtle.verify("HMAC", key, sig as unknown as BufferSource, data);
    if (!valid) return null;

    const payload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(parts[1]))
    ) as Record<string, unknown>;

    // Check expiry
    if (typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Read the `admin_session` cookie from a cookie store (e.g. `cookies()`)
 * and return the session payload or `null`.
 */
export async function getSession(
  cookieStore: { get(name: string): { value: string } | undefined }
): Promise<{ username: string } | null> {
  const cookie = cookieStore.get("admin_session");
  if (!cookie?.value) return null;

  const payload = await verifyJwt(cookie.value);
  if (!payload || typeof payload.sub !== "string") return null;

  return { username: payload.sub };
}

/**
 * Convenience helper for Server Actions & Server Components in Next.js App Router.
 */
export async function getCurrentSession(): Promise<{ username: string } | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return getSession(cookieStore);
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

/**
 * Auth guard – protects every /admin/* route except /admin/login.
 * Next.js 16: exported as `proxy`, not `middleware`.
 */
export async function proxy(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const payload = await verifyJwt(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)"],
};

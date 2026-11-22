"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signJwt } from "@/lib/auth";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const username = formData.get("username")?.toString()?.trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { error: "Please provide both username and password." };
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { error: "Invalid username or password." };
  }

  const token = await signJwt({ username });
  const cookieStore = await cookies();

  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin/stories");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

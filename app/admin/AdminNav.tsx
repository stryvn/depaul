import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentSession } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export async function AdminNav() {
  const session = await getCurrentSession();
  if (!session) return null;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin/stories" className="flex items-center gap-3">
            <Image
              src="/assets/branding/logo.png"
              alt="De Paul Logo"
              width={34}
              height={34}
              className="rounded-full"
            />
            <span className="font-bold text-brand-royal text-lg tracking-tight">
              De Paul CMS
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/admin/stories"
              className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-brand-royal hover:bg-slate-100 transition-colors"
            >
              Stories
            </Link>
            <Link
              href="/admin/documents"
              className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-brand-royal hover:bg-slate-100 transition-colors"
            >
              Documents
            </Link>
            <Link
              href="/admin/alumni"
              className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-brand-royal hover:bg-slate-100 transition-colors"
            >
              Alumni
            </Link>
            <Link
              href="/documents"
              target="_blank"
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-colors text-xs flex items-center gap-1"
            >
              Live Docs ↗
            </Link>
            <Link
              href="/alumni"
              target="_blank"
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition-colors text-xs flex items-center gap-1"
            >
              Live Directory ↗
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Signed in as <strong className="text-slate-700">{session.username}</strong>
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

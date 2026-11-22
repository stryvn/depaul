"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 relative mb-4">
            <Image
              src="/assets/branding/logo.png"
              alt="De Paul School Logo"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            School Staff Portal
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage news and school stories
          </p>
        </div>

        {state?.error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
            {state.error}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="admin"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent text-sm transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-royal focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-brand-royal hover:bg-brand-royal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-royal disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              {isPending ? "Signing in..." : "Sign in to Dashboard"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

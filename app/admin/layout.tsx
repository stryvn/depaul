import React, { Suspense } from "react";
import { AdminNav } from "./AdminNav";

export const instant = false;

export const metadata = {
  title: "Admin Portal — De Paul Public School",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Suspense fallback={null}>
        <AdminNav />
      </Suspense>
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}

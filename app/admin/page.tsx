import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";

export default async function AdminPage() {
  redirect((await getCurrentSession()) ? "/admin/admissions" : "/admin/login");
}

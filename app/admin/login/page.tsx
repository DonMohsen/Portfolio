import { redirect } from "next/navigation";
import { getRefreshSessionUser } from "@/lib/auth/admin-auth";
import AdminLoginForm from "./AdminLoginForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLoginPage() {
  const admin = await getRefreshSessionUser();

  if (admin) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}

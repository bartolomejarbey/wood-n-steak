import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Server-side authoritative auth gate. Runs on every admin route render —
// never relies solely on the proxy-level optimistic check.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/prihlaseni?redirect=/admin");
  }

  // Admin email allowlist from env (comma-separated). If empty, no one can
  // access admin — fail closed.
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = user.email?.toLowerCase() ?? "";
  if (!allowlist.includes(userEmail)) {
    redirect("/");
  }

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}

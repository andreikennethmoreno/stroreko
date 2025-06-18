import { stackServerApp } from "@/stack";
import { notFound, redirect } from "next/navigation";

async function AdminPage() {
  const user = await stackServerApp.getUser();

  const adminId = process.env.ADMIN_ID;
  const adminEmail = process.env.ADMIN_EMAIL;

  const isAdmin =
    user && user.id === adminId && user.primaryEmail === adminEmail;

  if (!isAdmin) return notFound();

  // 👇 Redirect to /admin/myproducts
  return redirect("/admin/myproducts");
}

export default AdminPage;

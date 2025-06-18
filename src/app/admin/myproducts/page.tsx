import { getProducts } from "@/actions/product.aciton";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { notFound } from "next/navigation";

async function AdminProductsPfga() {
  const user = await stackServerApp.getUser();

  // Grab admin credentials from environment
  const adminId = process.env.ADMIN_ID;
  const adminEmail = process.env.ADMIN_EMAIL;

  // Check if user matches admin credentials
  const isAdmin =
    user && user.id === adminId && user.primaryEmail === adminEmail;

  if (!isAdmin) return notFound();

  const products = await getProducts();
  

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
       
        <InventoryTable products={products} />
      </div>
    </div>
  );
}

export default AdminProductsPfga;

import { getProducts } from "@/actions/product.aciton";
import CardList from "@/components/CardList";
import InventoryTable from "@/components/InventoryTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function page() {
  const user = await stackServerApp.getUser();
  const products = await getProducts();

  return (
    <>
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          {/* <InventoryTable products={products} /> */}
          <CardList products={products} />
        </div>
      </div>
    </>
  );
}

export default page;

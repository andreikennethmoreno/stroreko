import { getProducts } from "@/actions/product.aciton";
import CardList from "@/components/CardList";
import InventoryTable from "@/components/InventoryTable";
import Spinner from "@/components/Spinner";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React, { Suspense } from "react";

async function page() {
  const user = await stackServerApp.getUser();
  const products = await getProducts();

  return (
    <>
      <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
          {/* <InventoryTable products={products} /> */}
          <Suspense fallback={<Spinner></Spinner>}>
            <CardList products={products} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default page;

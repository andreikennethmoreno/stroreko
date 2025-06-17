import React from "react";
import { stackServerApp } from "@/stack";
import { SignIn } from "@stackframe/stack";
import { getProductById } from "@/actions/product.aciton";
import ProductCard from "./ProductCard";

// 🧠 Dynamic metadata generation for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  return {
    title: product ? product.name : "Product Details",
    description: product ? product.description : "Product details page",
  };
}

async function Page({ params }: { params: { slug: string } }) {
  const user = await stackServerApp.getUser();
  const [id] = params.slug.split("--");
  const product = await getProductById(id);

  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <ProductCard product={product} />
      </div>
    </div>
  );
}

export default Page;

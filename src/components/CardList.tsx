"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combo-box";
import CreateDialog from "@/components/CreateDialog";
import { type getProducts } from "@/actions/product.aciton";
import Link from "next/link";
import AddToCartButton from "./AddtoCartButton";

type Products = Awaited<ReturnType<typeof getProducts>>;

interface CardListProps {
  products: Products;
}

export default function CardList({ products }: CardListProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products?.userProducts?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <div className="w-full">
      {/* Filter/Search Bar */}
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => {
          const slugifiedName = product.name.toLowerCase().replace(/\s+/g, "-");
          const slug = `${product.id}--${slugifiedName}`;
          const productUrl = `/products/${slug}`;

          return (
            <Card
              key={product.id}
              className="max-w-xs w-full rounded-xl cursor-pointer hover:shadow-lg transition"
              onClick={() => router.push(productUrl)}
            >
              <div className="grid gap-4 p-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="grid gap-1.5">
                  <h3 className="font-semibold text-sm md:text-base">
                    {product.name}
                  </h3>
                  <p className="font-semibold text-sm md:text-base">
                    ₱{product.price}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {product.category}
                  </p>
                </div>
                <div
                  className="flex justify-end space-x-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AddToCartButton productId={product.id} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

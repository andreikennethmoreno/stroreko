"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { getProducts } from "@/actions/product.aciton";

type Products = Awaited<ReturnType<typeof getProducts>>;

interface InventoryTableProps {
  products: Products;
}

export default function InventoryTable({ products }: InventoryTableProps) {
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
        <CreateDialog />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Image</TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts?.map((product) => {
            const slugifiedName = product.name
              .toLowerCase()
              .replace(/\s+/g, "-");
            const slug = `${product.id}--${slugifiedName}`;
            const productUrl = `/products/${slug}`;

            return (
              <TableRow
                key={product.id}
                onClick={() => router.push(productUrl)}
              >
                <TableCell>{product.id.slice(0, 10)}...</TableCell>
                <TableCell>
                  <div className="w-16 h-16">
                    <img
                      src={product.imageUrl ?? undefined}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className="font-bold">{product.stock}</TableCell>
                <TableCell className="text-right">
                  <div
                    className="flex justify-end space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditDialog product={product} />
                    <DeleteDialog product={product} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

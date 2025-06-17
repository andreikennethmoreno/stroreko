"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import RemoveFromCartButton from "./RemoveToCart";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/actions/user.action";
import { revalidatePath } from "next/cache";
import { updateCartQuantity } from "@/actions/cart.action";
import toast from "react-hot-toast";

type CartItems = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl?: string | null;
  };
}[];

interface CartTableProps {
  cartItems: CartItems;
}

export default function CartTable({ cartItems }: CartTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function toggleSelect(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const filteredItems = cartItems.filter((item) =>
    item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    

    const [isPending, startTransition] = useTransition();

    const handleQuantityChange = (id: string, newQuantity: number) => {
      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));

      startTransition(() => {
        updateCartQuantity(id, newQuantity)
          .then(() => {
            toast.success("Cart updated");
            router.refresh();
          })
          .catch((err) => {
            console.error("Failed to update quantity:", err);
            toast.error("Failed to update cart");
          });
      });
    };
    
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Search cart..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2"
        >
          Check Out
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Select</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => {
            const { product } = item;
            const quantity = quantities[item.id] ?? item.quantity;
            const total = (product.price * quantity).toFixed(2);

            return (
              <TableRow key={item.id}>
                <TableCell className="text-center">
                  <Checkbox
                    className="scale-150"
                    checked={selected[item.id] || false}
                    onCheckedChange={() => toggleSelect(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="w-16 h-16">
                    <img
                      src={product.imageUrl ?? ""}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₱{product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.id, Math.max(quantity - 1, 1))
                      }
                      disabled={isPending}
                    >
                      −
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      readOnly
                      className="w-14 h-9 text-center text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuantityChange(item.id, quantity + 1)
                      }
                      disabled={isPending}
                    >
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ₱{total}
                </TableCell>
                <TableCell>
                  <div className="text-right">
                    <RemoveFromCartButton cartItemId={item.id} />
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

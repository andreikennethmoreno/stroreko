"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart.action";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
  redirectTo?: string; // optional prop if you want dynamic redirect targets
};

export default function AddToCartButton({
  productId,
  quantity = 1,
  redirectTo = "/cart", // default redirect to /cart
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(productId, quantity);
      toast.success("Added to cart!");
      router.push(redirectTo); // 🔁 redirect after success
    } catch (error) {
      console.error("Add to cart failed", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleAddToCart} disabled={isLoading}>
      {isLoading ? "Adding..." : "Add to cart"}
    </Button>
  );
}

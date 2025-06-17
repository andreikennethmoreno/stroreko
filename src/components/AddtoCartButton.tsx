"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart.action"; // adjust the import if needed
import { useState } from "react";
import toast from "react-hot-toast";

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
};

export default function AddToCartButton({
  productId,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(productId, quantity);
      toast.success("Added to cart!");
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

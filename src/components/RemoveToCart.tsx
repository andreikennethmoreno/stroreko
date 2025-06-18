"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { removeFromCart } from "@/actions/cart.action";

interface RemoveFromCartButtonProps {
  cartItemId: string;
}

export default function RemoveFromCartButton({
  cartItemId,
}: RemoveFromCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(() => {
      removeFromCart(cartItemId)
        .then(() => {
          toast.success("Removed from cart!");
          router.refresh(); // update cart view
        })
        .catch((err) => {
          console.error("Error removing from cart:", err);
          toast.error("Failed to remove from cart.");
        });
    });
  };

  return (
    <Button
      variant="destructive"
      size="icon"
      onClick={(e) => {
        e.stopPropagation(); // avoid row navigation
        handleClick();
      }}
      disabled={isPending}
    >
      <Trash2 className="w-4 h-4 text-default" />
    </Button>
  );
}

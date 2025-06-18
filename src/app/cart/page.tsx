import { getCartItems } from "@/actions/cart.action";
import { getProducts } from "@/actions/product.aciton";
import CartTable from "@/components/CartTable";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import React from "react";

async function Cart() {
  const user = await stackServerApp.getUser();
  const cartItems = await getCartItems();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
              <p className="text-muted-foreground">
                Review your selected items and proceed to checkout when ready.
              </p>
            </div>
            <CartTable cartItems={cartItems} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}

export default Cart;

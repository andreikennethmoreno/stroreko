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
            <h1>this is cart</h1>
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

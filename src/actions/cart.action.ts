"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

// Add a product to cart
export async function addToCart(productId: string, quantity: number = 1) {
  try {
    const userId = await getUserId();
    if (!userId) return;

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        userId,
        productId,
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if already in cart
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId,
          quantity,
        },
      });
    }

    revalidatePath("/cart");
    return cartItem;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}


// Get all cart items for the current user
export async function getCartItems() {
    try {
      const userId = await getUserId();
      if (!userId) return [];
  
      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: {
          product: true, // include product details
        },
      });
  
      revalidatePath("/cart");
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return [];
    }
}

// Get a single cart item by productId
export async function getCartItemByProductId(productId: string) {
    try {
      const userId = await getUserId();
      if (!userId) return null;
  
      const cartItem = await prisma.cartItem.findFirst({
        where: {
          userId,
          productId,
        },
        include: {
          product: true,
        },
      });
  
      return cartItem;
    } catch (error) {
      console.error("Error fetching cart item by productId:", error);
      return null;
    }
}


// Remove an item from the cart
export async function removeFromCart(cartItemId: string) {
    try {
      const currentUserId = await getUserId();
      if (!currentUserId) return;
  
      // Optional: check ownership before deletion
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: cartItemId },
      });
  
      if (!cartItem || cartItem.userId !== currentUserId) {
        throw new Error("Unauthorized or item not found.");
      }
  
      const deletedCartItem = await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
  
      revalidatePath("/cart");
      return deletedCartItem;
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
}

export async function updateCartQuantity(
  cartItemId: string,
  newQuantity: number
) {
  try {
    const userId = await getUserId();
    if (!userId || newQuantity < 1) return;

    const updatedItem = await prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity: newQuantity,
      },
    });

    revalidatePath("/cart");
    return updatedItem;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
}
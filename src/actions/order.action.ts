"use server";

import { prisma } from "@/lib/prisma";
import { getUserEmail, getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack";

export async function createOrderFromCart(selectedCartItemIds: string[]) {
  try {
    const userId = await getUserId();
    const email = await getUserEmail();

    if (!userId) throw new Error("User not authenticated");
    if (!email) throw new Error("User email not found");
    if (selectedCartItemIds.length === 0) throw new Error("No items selected");

    // Fetch only the selected cart items
    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
        id: { in: selectedCartItemIds },
      },
      include: { product: true },
    });

    if (cartItems.length === 0)
      throw new Error("Selected cart items not found");

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId,
        email, 
        total,
        items: {
          create: cartItems.map((item) => ({
            userId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Optional: Clear only selected items from the cart
    await prisma.cartItem.deleteMany({
      where: {
        userId,
        id: { in: selectedCartItemIds },
      },
    });

    revalidatePath("/orders");
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrders() {
  try {
    const user = await stackServerApp.getUser();

    const adminId = process.env.ADMIN_ID;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!user) throw new Error("User not authenticated");

    const isAdmin = user.id === adminId && user.primaryEmail === adminEmail;

    const whereClause = isAdmin
      ? {} // Admin sees all
      : { userId: user.id }; // Regular users see only theirs

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    revalidatePath("/orders");

    return { success: true, orders, isAdmin };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      success: false,
      message: "Failed to retrieve orders",
      isAdmin: false,
    };
  }
}
  
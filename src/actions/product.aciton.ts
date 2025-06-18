"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { stackServerApp } from "@/stack";


// Get all products with optional search (visible to everyone)
export async function getProducts(searchTerm?: string) {
  try {
    const whereClause: any = {};

    if (searchTerm) {
      whereClause.name = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const userProducts = await prisma.product.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userProducts };
  } catch (error) {
    console.log("Error in getProducts", error);
  }
}


// Get single product by ID
export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: Prisma.ProductCreateInput) {
  console.log("Creating product:", data);
  
  try {
    const user = await stackServerApp.getUser();

    const adminId = process.env.ADMIN_ID;
    const adminEmail = process.env.ADMIN_EMAIL;

    const isAdmin =
      user && user.id === adminId && user.primaryEmail === adminEmail;

    if (!isAdmin) {
      console.error("Unauthorized create attempt");
      return null; // or throw new Error("Unauthorized")
    }

    const newProduct = await prisma.product.create({
      data: {
        ...data,
        userId: user.id,
      },
    });

    revalidatePath("/products");
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}


// Update a product
export async function editProduct(id: string, data: Prisma.ProductUpdateInput) {
  try {
    const currentUserId = await getUserId();

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });

    revalidatePath("/products");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product and clean up any empty orders
export async function deleteProduct(id: string) {
  try {
    console.log("Deleting:", id);
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    // 0. Delete CartItems first
    await prisma.cartItem.deleteMany({
      where: { productId: id },
    });

    // 1. Find orders that include this product
    const orderItems = await prisma.orderItem.findMany({
      where: { productId: id },
      select: { orderId: true },
    });

    const orderIds = Array.from(
      new Set(orderItems.map((item) => item.orderId))
    );

    // 2. Delete the product (this will cascade delete orderItems)
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    // 3. Delete orders that are now empty
    for (const orderId of orderIds) {
      const remaining = await prisma.orderItem.count({
        where: { orderId },
      });

      if (remaining === 0) {
        await prisma.order.delete({
          where: { id: orderId },
        });
      }
    }

    revalidatePath("/products");
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

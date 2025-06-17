"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

// Get all products for current user with optional search
export async function getProducts(searchTerm?: string) {
  try {
    const currentUserId = await getUserId();

    const whereClause: any = {
      userId: currentUserId,
    };

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

// Create a new product
export async function createProduct(data: Prisma.ProductCreateInput) {
  console.log("Creating product:", data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newProduct = await prisma.product.create({
      data: {
        ...data,
        userId: currentUserId,
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

// Delete a product
export async function deleteProduct(id: string) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedProduct = await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/products");
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

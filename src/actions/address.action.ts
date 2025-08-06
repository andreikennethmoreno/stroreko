"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";


// ✅ Check if user has at least one shipping address
export async function hasShippingAddress(): Promise<boolean> {
  try {
    const userId = await getUserId();
    if (!userId) return false;

    const count = await prisma.shippingAddress.count({
      where: { userId },
    });

    return count > 0;
  } catch (error) {
    console.error("Error checking for shipping address:", error);
    return false;
  }
}


// ✅ Add a new shipping address
export async function addShippingAddress(data: {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}) {
  try {
    const userId = await getUserId();
    if (!userId) return;

    const address = await prisma.shippingAddress.create({
      data: {
        userId,
        ...data,
      },
    });
// console.log("createing address", address)
    return address;
  } catch (error) {
    console.error("Error adding shipping address:", error);
    throw error;
  }
}

// ✅ Get all addresses for current user
export async function getShippingAddresses() {
  try {
    const userId = await getUserId();
    if (!userId) return [];

    const addresses = await prisma.shippingAddress.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return addresses;
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);
    return [];
  }
}

// ✅ Get a single address by ID
export async function getShippingAddressById(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) return null;

    const address = await prisma.shippingAddress.findUnique({
      where: { id },
    });

    if (address?.userId !== userId) {
      throw new Error("Unauthorized access");
    }

    return address;
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    return null;
  }
}

// ✅ Update an existing address
export async function updateShippingAddress(
  id: string,
  data: {
    fullName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  }
) {
  try {
    const userId = await getUserId();
    if (!userId) return;

    const address = await prisma.shippingAddress.findUnique({ where: { id } });
    if (!address || address.userId !== userId) {
      throw new Error("Unauthorized or address not found");
    }

    const updated = await prisma.shippingAddress.update({
      where: { id },
      data,
    });

    return updated;
  } catch (error) {
    console.error("Error updating shipping address:", error);
    throw error;
  }
}

// ✅ Delete an address
export async function deleteShippingAddress(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) return;

    const address = await prisma.shippingAddress.findUnique({ where: { id } });
    if (!address || address.userId !== userId) {
      throw new Error("Unauthorized or address not found");
    }

    const deleted = await prisma.shippingAddress.delete({
      where: { id },
    });

    return deleted;
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    throw error;
  }
}

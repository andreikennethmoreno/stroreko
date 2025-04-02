"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

export async function getPlants(searchTerm?: string) {
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

    const userPlants = await prisma.plants.findMany({
      where: whereClause,
    });

    revalidatePath("/");
    return { success: true, userPlants };
  } catch (error) {
    console.log("Error in getPlants", error);
  }
}

export async function getPlantById(id: string) {
  // Example using Prisma; adjust based on your data layer
  return await prisma.plants.findUnique({
    where: { id },
  });
}

export async function createPlant(data: Prisma.PlantsCreateInput) {
  console.log("creating plant");
  console.log(data);
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const newPlant = await prisma.plants.create({
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
    return newPlant;
  } catch (error) {
    console.error("Error Creating Plant:", error);
    throw error;
  }
}

export async function editPlant(
  id: string, //identify which plant we are editing
  data: Prisma.PlantsUpdateInput
) {
  try {
    const currentUserId = await getUserId();
    const updatedPlant = await prisma.plants.update({
      where: { id },
      data: {
        ...data,
        userId: currentUserId,
      },
    });
    revalidatePath("/plants");
  } catch (error) {
    console.error("Error updating plant:", error);
    throw error;
  }
}

export async function deletePlant(
  id: string //identify which plant we are editing
) {
  try {
    const currentUserId = await getUserId();
    if (!currentUserId) return;

    const deletedPlant = await prisma.plants.delete({
      where: { id },
    });
    revalidatePath("/plants");
    return deletedPlant;
  } catch (error) {
    console.error("Error deleting plant:", error);
    throw error;
  }
}

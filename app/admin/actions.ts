"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "@/types/globals";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  // First we need to check if the user calling this function is admin or not.
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not authorized!!");
  }

  // If the user is admin, Clerk client will be used to update the role
  const client = await clerkClient();

  // This Server Action expects a form submission with 2 types of Info.
  const id = formData.get("id") as string; // id refers to the users we're updating
  const role = formData.get("role") as Roles; // role refers to what role we're assigning the user

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
    revalidatePath("/admin"); // This method will automatically update the admin UI without us having to refresh the page when we update the role.
  } catch {
    throw new Error("Failed to set role");
  }
}

export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not authorized!!");
  }

  const client = await clerkClient();

  const id = formData.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to remove role");
  }
}
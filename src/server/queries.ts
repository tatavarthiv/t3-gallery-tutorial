import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
import { redirect } from "next/navigation";
import { analyticsServerClient } from "./analytics";
import { revalidatePath } from "next/cache";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => [desc(model.id)],
  });
  return images;
}

export async function getImage(id: number) {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) {
    redirect("/");
  }

  if (image.userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "image_deleted",
    properties: {
      image_id: id,
    },
  });

  revalidatePath("/");
  redirect("/");
}

import { notFound } from "next/navigation";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;

  const numericId = parseInt(photoId);
  if (isNaN(numericId)) {
    notFound();
  }

  return <FullPageImageView id={numericId} />;
}

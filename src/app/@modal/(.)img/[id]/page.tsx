import { getImage } from "~/server/queries";
import { notFound } from "next/navigation";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;

  const numericId = parseInt(photoId);
  if (isNaN(numericId)) {
    notFound();
  }

  try {
    const image = await getImage(numericId);

    return (
      <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
        <img src={image.url} className="w-96" alt={image.name} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

import { notFound } from "next/navigation";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

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
    return (
      <Modal>
        <FullPageImageView id={numericId} />
      </Modal>
    );
  } catch (error) {
    notFound();
  }
}

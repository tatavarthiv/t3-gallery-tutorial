import { getImage } from "~/server/queries";
import Image from "next/image";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id: photoId } = await params;

  const image = await getImage(parseInt(photoId));

  return (
    <div>
      <h1>{image.name}</h1>
      <Image
        src={image.url}
        alt={image.name}
        width={192}
        height={192}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

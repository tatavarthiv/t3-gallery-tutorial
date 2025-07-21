import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

export async function Images() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap gap-4">
      {[...images].map((image, index) => (
        <div key={image.id + "-" + index} className="flex w-48 flex-col">
          <p>{image.name}</p>
          <img src={image.url} alt={`Image ${image.id}`} />
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="text-ceter h-full w-full text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

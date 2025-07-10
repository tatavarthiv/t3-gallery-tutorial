import Link from "next/link";

const mockUrls = [
  "https://ce8o6czm88.ufs.sh/f/5QJyK0l2pCNE2SMhis1pPb6YGNmu2I9d1XAaUF0BiSc8fl5D",
  "https://ce8o6czm88.ufs.sh/f/5QJyK0l2pCNEoOAqzYkIqwpBb47Mj0H29dGngKaeAY8kCUv5",
  "https://ce8o6czm88.ufs.sh/f/5QJyK0l2pCNEFt41clLjwuLcmHJgYbV4dSrtf8hP5B9ICpyQ",
  "https://ce8o6czm88.ufs.sh/f/5QJyK0l2pCNEatvJvkOISPREADMK2B6c14qG5rLmbJzVjU7x",
  "https://ce8o6czm88.ufs.sh/f/5QJyK0l2pCNET4743sdQOuwJipTaeF0Uhvj8fVZtmHkLBCq4",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages, ...mockImages].map(
          (image) => (
            <div key={image.id} className="w-48">
              <img src={image.url} alt={`Image ${image.id}`} />
            </div>
          ),
        )}
      </div>
    </main>
  );
}

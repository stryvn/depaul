import type { Metadata } from "next";
import Image from "next/image";
import { TopNavbar } from "@/components/navbar/TopNavbar";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Campus Gallery",
  description: "Photographs of the De Paul campus and school life in Rajamudy.",
  alternates: { canonical: "/gallery" },
};

const photos = [
  ["/assets/about-campus.webp", "De Paul campus"],
  ["/assets/about-classroom.webp", "Classroom learning"],
  ["/assets/about-community.webp", "School community"],
  ["/assets/about-learning.webp", "Practical learning"],
  ["/assets/story-covers/sports-day-720.webp", "Sports Day"],
  ["/assets/story-covers/environment-day-720.webp", "Environment Day"],
];

export default function GalleryPage() {
  return (
    <>
      <TopNavbar isMerged />
      <main className="mx-auto w-[var(--public-content-width)] pb-16 pt-[104px]">
        <h1 className="mb-6 text-4xl font-bold text-[#0b1b3d]">Campus gallery</h1>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map(([src, caption]) => (
            <figure key={src} className="overflow-hidden rounded-xl border border-[#d7e0ec] bg-white">
              <div className="relative aspect-[3/2]">
                <Image src={src} alt={caption} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="p-3 font-semibold text-[#0b1b3d]">{caption}</figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

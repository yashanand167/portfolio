import Image from "next/image";

type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const artworks: GalleryItem[] = [
  { src: "/Arts/Art1.png", alt: "Dragon encounter", width: 1800, height: 1207 },
  { src: "/Arts/Art5.png", alt: "Sunset street", width: 1800, height: 1386 },
  { src: "/Arts/Art8.png", alt: "Apple landscape", width: 1800, height: 1800 },
  { src: "/Arts/Art2.png", alt: "Forest stairs", width: 1506, height: 1800 },
  { src: "/Arts/Art3.png", alt: "Balcony sunset", width: 1440, height: 1800 },
  { src: "/Arts/Art4.png", alt: "Surfer in bowl", width: 1599, height: 1800 },
  { src: "/Arts/Art7.png", alt: "Cat at window", width: 1516, height: 1800 },
  { src: "/Arts/Art10.png", alt: "Forest arch", width: 1800, height: 1602 },
  { src: "/Arts/Art11.png", alt: "Forest crane", width: 1800, height: 1270 },
];

const sketches: GalleryItem[] = [
  { src: "/Arts/Art6.png", alt: "Guitar sketch", width: 1350, height: 1800 },
  { src: "/Arts/Art9.png", alt: "Doctor Strange sketch", width: 1350, height: 1800 },
];

const galleryItems = [...artworks, ...sketches];

export default function Artworks() {
  return (
    <div className="mt-6 columns-2 gap-4 sm:mt-8 sm:columns-3 sm:gap-5">
      {galleryItems.map((art, index) => (
        <figure key={art.src} className="mb-4 break-inside-avoid sm:mb-5">
          <Image
            src={art.src}
            alt={art.alt}
            width={art.width}
            height={art.height}
            priority={index === 0}
            loading={index === 0 ? undefined : index < 6 ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 33vw"
            className="h-auto w-full rounded-lg"
          />
        </figure>
      ))}
    </div>
  );
}

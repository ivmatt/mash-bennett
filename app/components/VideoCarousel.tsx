"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface VideoCarouselProps {
  videos: { videoId: string; title: string; thumbnail: string }[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex gap-8 md:gap-12">
        {videos.map((video, index) => {
          const isActive = index === selectedIndex;
          const isNearby = Math.abs(index - selectedIndex) <= 2;

          return (
            <div
              key={video.videoId}
              className={`min-w-0 relative flex-[0_0_85%] md:flex-[0_0_60%] transition-all duration-500 ease-in-out origin-center ${
                isActive ? "opacity-100 scale-100" : "opacity-50 scale-[0.7]"
              }`}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 9" }}
              >
                {isNearby ? (
                  <>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ border: "none" }}
                    />
                    {/* Clickable overlay for inactive neighbors */}
                    {!isActive && (
                      <button
                        type="button"
                        className="absolute inset-0 w-full h-full cursor-pointer z-10"
                        onClick={() => emblaApi?.scrollTo(index)}
                        aria-label={`Play ${video.title}`}
                      />
                    )}
                  </>
                ) : (
                  <button
                    type="button"
                    className="block w-full h-full cursor-pointer"
                    onClick={() => emblaApi?.scrollTo(index)}
                    aria-label={`Play ${video.title}`}
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 60vw"
                      className="object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg"
                      >
                        <circle cx="32" cy="32" r="32" fill="rgba(255,255,255,0.3)" />
                        <polygon points="26,20 26,44 46,32" fill="white" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface VideoCarouselProps {
  videos: { videoId: string; title: string; thumbnail: string }[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < videos.length) {
        setSelectedIndex(index);
      }
    },
    [videos.length]
  );

  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < videos.length - 1;

  const getSlideStyle = (index: number): React.CSSProperties => {
    const diff = index - selectedIndex;

    if (diff === 0) {
      return {
        transform: "translateX(0%) scale(1)",
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
      };
    } else if (diff === 1) {
      return {
        transform: "translateX(18%) scale(0.85)",
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "none",
      };
    } else if (diff === -1) {
      return {
        transform: "translateX(-18%) scale(0.85)",
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "none",
      };
    } else {
      return {
        transform: `translateX(${diff > 0 ? "60%" : "-60%"}) scale(0.7)`,
        zIndex: 0,
        opacity: 0,
        pointerEvents: "none",
      };
    }
  };

  const isNearby = (index: number) => Math.abs(index - selectedIndex) <= 2;

  return (
    <div className="relative w-[60%] mx-auto flex items-center">
      {/* Left chevron */}
      <button
        type="button"
        onClick={() => goTo(selectedIndex - 1)}
        disabled={!canGoPrev}
        aria-label="Previous video"
        className={`absolute z-10 transition-opacity ${
          canGoPrev ? "opacity-70 hover:opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        style={{ left: "-200px" }}
      >
        <Image
          src="/chevron.svg"
          alt=""
          width={42}
          height={74}
          aria-hidden={true}
          className="h-12 w-auto"
        />
      </button>

      {/* Slides */}
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        {videos.map((video, index) => {
          const nearby = isNearby(index);
          const slideStyle = getSlideStyle(index);

          return (
            <div
              key={video.videoId}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                ...slideStyle,
                pointerEvents: slideStyle.pointerEvents as "auto" | "none",
              }}
            >
              <div className="relative w-full h-full">
                {nearby ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ border: "none" }}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      sizes="60vw"
                      className="object-cover"
                    />
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
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right chevron (flipped horizontally) */}
      <button
        type="button"
        onClick={() => goTo(selectedIndex + 1)}
        disabled={!canGoNext}
        aria-label="Next video"
        className={`absolute z-10 transition-opacity ${
          canGoNext ? "opacity-70 hover:opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
        style={{ right: "-200px" }}
      >
        <Image
          src="/chevron.svg"
          alt=""
          width={42}
          height={74}
          aria-hidden={true}
          className="h-12 w-auto -scale-x-100"
        />
      </button>
    </div>
  );
}
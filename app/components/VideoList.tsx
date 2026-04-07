"use client";

import Image from "next/image";
import { useState } from "react";

interface VideoListProps {
  videos: { videoId: string; title: string; thumbnail: string }[];
}

export default function VideoList({ videos }: VideoListProps) {
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(
    new Set(videos.length > 0 ? [videos[0].videoId] : [])
  );

  const handlePlay = (videoId: string) => {
    setLoadedVideos((prev) => new Set(prev).add(videoId));
  };

  return (
    <div className="flex flex-col gap-6 w-full px-4">
      {videos.map((video) => {
        const isLoaded = loadedVideos.has(video.videoId);

        return (
          <div key={video.videoId}>
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9" }}
            >
              {isLoaded ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              ) : (
                <button
                  type="button"
                  className="block w-full h-full cursor-pointer relative"
                  onClick={() => handlePlay(video.videoId)}
                  aria-label={`Play ${video.title}`}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="56"
                      height="56"
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
  );
}
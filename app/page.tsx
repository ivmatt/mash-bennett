import Image from "next/image";
import { fetchChannelVideos } from "./lib/youtube";
import VideoCarousel from "./components/VideoCarousel";
import VideoList from "./components/VideoList";

export const revalidate = 900; // revalidate every 15 minutes

export default async function Home() {
  const videos = await fetchChannelVideos(10);

  return (
    <div className="flex flex-col min-h-screen bg-[#E45F0B] text-[#F7EFE5] font-sans">
      {/* Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 pt-14 pb-5">
        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-center gap-30">
          {/* Left: Party 101 */}
          <div>
            <a
              href="https://www.party101.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/party101_logo.png"
                alt="Party 101"
                width={384}
                height={168}
                className="h-9 w-auto"
                priority
              />
            </a>
          </div>

          {/* Center: Mash Bennett */}
          <div>
            <Image
              src="/mash_bennett_logo.svg"
              alt="Mash Bennett"
              width={218}
              height={82}
              className="h-20 w-auto"
              priority
            />
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/mattbennett/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/ig.png"
                alt="Instagram"
                width={128}
                height={128}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.tiktok.com/@mattbennett"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/tt.png"
                alt="TikTok"
                width={112}
                height={128}
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Mobile header */}
        <div className="flex flex-col items-center gap-10 md:hidden">
          {/* Top: Mash Bennett */}
          <Image
            src="/mash_bennett_logo.svg"
            alt="Mash Bennett"
            width={218}
            height={82}
            className="h-16 w-auto"
            priority
          />

          {/* Bottom row: Party 101 + Social Icons side by side */}
          <div className="flex items-center justify-around w-full">
            <a
              href="https://www.party101.club/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                src="/party101_logo.png"
                alt="Party 101"
                width={384}
                height={168}
                className="h-8 w-auto"
                priority
              />
            </a>
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/mattbennett/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-opacity hover:opacity-70"
              >
                <Image
                  src="/ig.png"
                  alt="Instagram"
                  width={128}
                  height={128}
                  className="h-6 w-6"
                />
              </a>
              <a
                href="https://www.tiktok.com/@mattbennett"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="transition-opacity hover:opacity-70"
              >
                <Image
                  src="/tt.png"
                  alt="TikTok"
                  width={112}
                  height={128}
                  className="h-6 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-start pt-14 md:justify-center md:pt-0 px-0 pb-16">
        {videos.length > 0 ? (
          <>
            {/* Desktop: carousel */}
            <div className="hidden md:block w-full">
              <VideoCarousel videos={videos} />
            </div>
            {/* Mobile: scrollable list */}
            <div className="block md:hidden w-full">
              <VideoList videos={videos} />
            </div>
          </>
        ) : (
          <div className="w-full md:w-[85%] lg:w-[60%] mx-auto px-4">
            {/* Fallback: static video if API fails */}
            <div
              className="relative w-full"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center md:justify-end mt-4 w-full md:w-[85%] lg:w-[60%] mx-auto px-4">
          <a
            href="https://www.youtube.com/@MottBonnott"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#F7EFE5] font-bold tracking-wide transition-opacity hover:opacity-70"
            style={{ fontSize: "1.25rem" }}
          >
            <span>see more on YouTube</span>
            <Image
              src="/arrow.svg"
              alt=""
              width={29}
              height={23}
              aria-hidden={true}
              className="h-5 w-auto"
            />
          </a>
        </div>
      </main>
    </div>
  );
}
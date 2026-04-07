export interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
}

export async function fetchChannelVideos(
  maxResults = 10,
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error("YOUTUBE_API_KEY environment variable is not set");
    return [];
  }

  try {
    // Step 1: Resolve the channel ID from the handle @MottBonnott
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=@MottBonnott&key=${apiKey}`,
    );

    if (!channelRes.ok) {
      console.error(
        `Failed to resolve channel ID: ${channelRes.status} ${channelRes.statusText}`,
      );
      return [];
    }

    const channelData = await channelRes.json();
    const channelId: string | undefined = channelData.items?.[0]?.id;

    if (!channelId) {
      console.error("Could not find channel ID for @MottBonnott");
      return [];
    }

    // Step 2: Fetch the latest videos from the channel
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=${maxResults}&publishedAfter=2025-11-24T00:00:00Z&key=${apiKey}`,
    );

    if (!searchRes.ok) {
      console.error(
        `Failed to fetch videos: ${searchRes.status} ${searchRes.statusText}`,
      );
      return [];
    }

    const searchData = await searchRes.json();

    if (!searchData.items || !Array.isArray(searchData.items)) {
      console.error("Unexpected response shape from YouTube search endpoint");
      return [];
    }

    // Step 3: Map the results to our YouTubeVideo shape
    const videos: YouTubeVideo[] = searchData.items.map(
      (item: {
        id: { videoId: string };
        snippet: {
          title: string;
          thumbnails: {
            high?: { url: string };
            medium?: { url: string };
            default?: { url: string };
          };
        };
      }) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          item.snippet.thumbnails.default?.url ??
          "",
      }),
    );

    return videos;
  } catch (error) {
    console.error("Error fetching YouTube channel videos:", error);
    return [];
  }
}
import axios from 'axios';

export type ErrorCallback = (error: Error) => void;

export function getCommentsSummarizer(
  apiKey: string,
  errorCallback: ErrorCallback
): (url: string) => Promise<Map<string, string[]>> {
  return async function commentsSummarizer(url: string): Promise<Map<string, string[]>> {
    const channelId = await getChannelId(url, apiKey, errorCallback);

    if (channelId == null) {
      return new Map<string, string[]>();
    }

    const comments = await getCommentsForChannel(channelId, apiKey, errorCallback);
    return comments;
  };
}

export async function getChannelId(url: string, apiKey: string, errorCallback: ErrorCallback): Promise<string | null> {
  try {
    const channelUrl = new URL(url);
    const pathSegments = channelUrl.pathname.split('/').filter((segment) => segment !== '');
    const channelId = pathSegments[0];

    return channelId;
  } catch (error) {
    if (typeof errorCallback !== 'undefined' && error instanceof Error) {
      errorCallback(error);
    }

    return null;
  }
}

export async function getCommentsForChannel(
  channelId: string,
  apiKey: string,
  errorCallback?: ErrorCallback
): Promise<Map<string, string[]>> {
  const comments = new Map<string, string[]>();
  const videoIds = await getVideoIdsForChannel(channelId, apiKey, errorCallback);

  for (const videoId of videoIds) {
    const videoComments = await getCommentsForVideo(videoId, apiKey, errorCallback);
    comments.set(videoId, videoComments);
  }

  return comments;
}

export async function getVideoIdsForChannel(channelId: string, apiKey: string, errorCallback?: ErrorCallback): Promise<string[]> {
  const url = 'https://www.googleapis.com/youtube/v3/videos';
  const params = {
    channelId: channelId,
    key: apiKey,
    chart: 'mostPopular',
  };

  try {
    const response = await axios.get(url, { params });
    const videoIds = response.data.items.map((item: any) => item.id);

    return videoIds;
  } catch (error) {
    if (typeof errorCallback !== 'undefined' && error instanceof Error) {
      errorCallback(error);
    }

    return [];
  }
}

export async function getCommentsForVideo(videoId: string, apiKey: string, errorCallback?: ErrorCallback): Promise<string[]> {
  const url = 'https://www.googleapis.com/youtube/v3/commentThreads';
  const params = {
    key: apiKey,
    videoId: videoId,
    part: 'snippet',
  };

  try {
    const response = await axios.get(url, { params });
    const comments = response.data.items.map((item: any) => item.snippet.topLevelComment.snippet.textDisplay);

    return comments;
  } catch (error) {
    if (typeof errorCallback !== 'undefined' && error instanceof Error) {
      errorCallback(error);
    }

    return [];
  }
}

import axios from 'axios';
import { parseVideos } from '../schemas/youtube-v3/videos.schema';
import { parseCommentThreads } from '../schemas/youtube-v3/comment-threads.schema';

export type ErrorCallback = (error: Error) => void;

export function getCommentsSummarizer(
  apiKey: string,
  errorCallback: ErrorCallback
): (url: string) => Promise<Map<string, string[]>> {
  return async function commentsSummarizer(url: string): Promise<Map<string, string[]>> {
    const channelId = getChannelId(url, errorCallback);

    if (channelId == null) {
      return new Map<string, string[]>();
    }

    const comments = await getCommentsForChannel(channelId, apiKey, errorCallback);
    return comments;
  };
}

export function getChannelId(url: string, errorCallback: ErrorCallback): string | null {
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
    const data = parseVideos(response.data);
    const videoIds = data.items.map((item) => item.id);

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
    const data = parseCommentThreads(response.data);
    const comments = data.items.map((item) => item.snippet.topLevelComment.snippet.textDisplay);

    return comments;
  } catch (error) {
    if (typeof errorCallback !== 'undefined' && error instanceof Error) {
      errorCallback(error);
    }

    return [];
  }
}

import type { HttpClient } from './http-client';

export interface YoutubeApiRepository {
  getVideosFromChannel(channelId: string, apiKey: string): Promise<unknown>;
  getCommentThreadsFromVideo(videoId: string, apiKey: string): Promise<unknown>;
}

export class YoutubeApiHttpRepository implements YoutubeApiRepository {
  private readonly baseUrl: string = 'https://www.googleapis.com/youtube/v3';

  constructor(private readonly httpClient: HttpClient) {}

  async getVideosFromChannel(channelId: string, apiKey: string): Promise<unknown> {
    const url = `${this.baseUrl}/videos`;
    const params = {
      channelId: channelId,
      key: apiKey,
      chart: 'mostPopular',
    };

    const response = await this.httpClient.get(url, params);
    return response;
  }

  async getCommentThreadsFromVideo(videoId: string, apiKey: string): Promise<unknown> {
    const url = `${this.baseUrl}/commentThreads`;
    const params = {
      key: apiKey,
      videoId: videoId,
      part: 'snippet',
    };

    const response = await this.httpClient.get(url, params);
    return response;
  }
}

export default YoutubeApiHttpRepository;

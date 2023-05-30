import { AxiosHttpClient } from '../../features/http';
import { YoutubeApiHttpRepository } from '../../features/http/repositories/youtube-api';
import { YoutubeService } from '../youtube';

export type ErrorCallback = (error: Error) => void;

export class ApiFetcherService {
  private readonly youtubeApiKey: string;

  private readonly errorCallback: ErrorCallback;

  private readonly youtubeRepository: YoutubeApiHttpRepository;

  private readonly youtubeService: YoutubeService;

  constructor(youtubeApiKey: string, errorCallback: ErrorCallback) {
    this.youtubeApiKey = youtubeApiKey;
    this.errorCallback = errorCallback;
    this.youtubeRepository = new YoutubeApiHttpRepository(new AxiosHttpClient());
    this.youtubeService = new YoutubeService(this.youtubeRepository, this.youtubeApiKey);
  }

  async fetchYoutubeComments(channelUrl: string): Promise<Map<string, string[]>> {
    const channelId = this.getChannelId(channelUrl);

    if (channelId == null) {
      return new Map<string, string[]>();
    }

    const comments = await this.getCommentsForChannel(channelId);
    return comments;
  }

  private getChannelId(url: string): string | null {
    try {
      const channelUrl = new URL(url);
      const pathSegments = channelUrl.pathname.split('/').filter((segment) => segment !== '');
      const channelId = pathSegments[0];

      return channelId;
    } catch (error) {
      if (error instanceof Error) {
        this.errorCallback(error);
      }

      return null;
    }
  }

  private async getCommentsForChannel(channelId: string): Promise<Map<string, string[]>> {
    const comments = new Map<string, string[]>();

    try {
      const videoIds = await this.youtubeService.getVideoIdsWhichThrows(channelId);

      for (const videoId of videoIds) {
        const videoComments = await this.youtubeService.getVideoCommentThreadsWhichThrows(videoId);
        comments.set(videoId, videoComments);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.errorCallback(error);
      }
    }

    return comments;
  }
}

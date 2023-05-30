import { parseVideos, parseCommentThreads } from '../../schemas/youtube-v3';
import type { YoutubeApiRepository } from '../../features/http';

export type VideoId = string;

export type Comment = string;

export class YoutubeService {
  constructor(private readonly youtubeApiRepository: YoutubeApiRepository, private readonly apiKey: string) {}

  async getVideoIdsWhichThrows(channelId: string): Promise<VideoId[]> {
    if (!channelId) {
      throw new Error('YoutubeService: Missing channelId');
    }

    const videos = await this.youtubeApiRepository.getVideosFromChannel(channelId, this.apiKey);
    const data = parseVideos(videos);
    const videoIds = data.items.map((item) => item.id);

    return videoIds;
  }

  async getVideoCommentThreadsWhichThrows(videoId: string): Promise<Comment[]> {
    if (!videoId) {
      throw new Error('YoutubeService: Missing videoId');
    }

    const commentThreads = await this.youtubeApiRepository.getCommentThreadsFromVideo(videoId, this.apiKey);
    const data = parseCommentThreads(commentThreads);
    const comments = data.items.map((item) => item.snippet.topLevelComment.snippet.textDisplay);

    return comments;
  }
}

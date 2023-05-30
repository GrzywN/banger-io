import { YoutubeService, VideoId, Comment } from './youtube.service';
import { YoutubeApiRepository } from '../../features/http';

const mockRepository: YoutubeApiRepository = {
  async getVideosFromChannel(channelId: string, apiKey: string): Promise<unknown> {
    return Promise.resolve({
      kind: 'youtube#videoListResponse',
      etag: 'CDxZ14scYgPawZGwTGHqyWvnrSU',
      items: [
        {
          kind: 'youtube#video',
          etag: 'BLwXFr8DdfbLFqfD7k8tKBY8dcw',
          id: 'video1',
        },
        {
          kind: 'youtube#video',
          etag: 'cFwxbvPPh0Hl6A8OV5BDsyrO1a0',
          id: 'video2',
        },
        {
          kind: 'youtube#video',
          etag: 'Ku4baK71dit9V3WIgu6jw5gOkD4',
          id: 'video3',
        },
      ],
      nextPageToken: 'CAUQAA',
      pageInfo: {
        totalResults: 200,
        resultsPerPage: 5,
      },
    });
  },
  async getCommentThreadsFromVideo(videoId: string, apiKey: string): Promise<unknown> {
    return Promise.resolve({
      kind: 'youtube#commentThreadListResponse',
      etag: 'NBRZewhr6YQUW4uj0UgJ065B0Ms',
      nextPageToken:
        'QURTSl9pMDhLaWU3V2ZtQ1hOazdXM2w5T1hXcXRVZjZfTW1oNXRZSHo1Z1FkbTBGTy1pYmZkYnppNVY2N3JkVEdQbHd0ckpMTTJ5bWNIMA==',
      pageInfo: {
        totalResults: 20,
        resultsPerPage: 20,
      },
      items: [
        {
          kind: 'youtube#commentThread',
          etag: 'jHlUTxOaj7kD_ZnHBhhjT4zWEX8',
          id: 'UgyheN2DqD790Lu34vR4AaABAg',
          snippet: {
            videoId: 'IuabP_JlImk',
            topLevelComment: {
              kind: 'youtube#comment',
              etag: 'fRTwZuPeYgw2pRNRFXQbbIHPMJw',
              id: 'UgyheN2DqD790Lu34vR4AaABAg',
              snippet: {
                videoId: 'IuabP_JlImk',
                textDisplay: 'Comment 1',
                textOriginal: 'Comment 1',
                authorDisplayName: 'Sami Hussain',
                authorProfileImageUrl:
                  'https://yt3.ggpht.com/ytc/AGIKgqM3dSIB-Lq_yE2AXepPEq8YgkhfaglzrUA1CXjGxuYpwNQkOaZdpvO4dZRdbZnO=s48-c-k-c0x00ffffff-no-rj',
                authorChannelUrl: 'http://www.youtube.com/channel/UCY0LBVktPq1P9awShZ7UODw',
                authorChannelId: {
                  value: 'UCY0LBVktPq1P9awShZ7UODw',
                },
                canRate: true,
                viewerRating: 'none',
                likeCount: 0,
                publishedAt: '2023-05-26T12:20:38Z',
                updatedAt: '2023-05-26T12:20:38Z',
              },
            },
            canReply: true,
            totalReplyCount: 0,
            isPublic: true,
          },
        },
        {
          kind: 'youtube#commentThread',
          etag: 'jHlUTxOaj7kD_ZnHBhhjT4zWEX8',
          id: 'UgyheN2DqD790Lu34vR4AaABAg',
          snippet: {
            videoId: 'IuabP_JlImk',
            topLevelComment: {
              kind: 'youtube#comment',
              etag: 'fRTwZuPeYgw2pRNRFXQbbIHPMJw',
              id: 'UgyheN2DqD790Lu34vR4AaABAg',
              snippet: {
                videoId: 'IuabP_JlImk',
                textDisplay: 'Comment 2',
                textOriginal: 'Comment 2',
                authorDisplayName: 'Sami Hussain',
                authorProfileImageUrl:
                  'https://yt3.ggpht.com/ytc/AGIKgqM3dSIB-Lq_yE2AXepPEq8YgkhfaglzrUA1CXjGxuYpwNQkOaZdpvO4dZRdbZnO=s48-c-k-c0x00ffffff-no-rj',
                authorChannelUrl: 'http://www.youtube.com/channel/UCY0LBVktPq1P9awShZ7UODw',
                authorChannelId: {
                  value: 'UCY0LBVktPq1P9awShZ7UODw',
                },
                canRate: true,
                viewerRating: 'none',
                likeCount: 0,
                publishedAt: '2023-05-26T12:20:38Z',
                updatedAt: '2023-05-26T12:20:38Z',
              },
            },
            canReply: true,
            totalReplyCount: 0,
            isPublic: true,
          },
        },
        {
          kind: 'youtube#commentThread',
          etag: 'jHlUTxOaj7kD_ZnHBhhjT4zWEX8',
          id: 'UgyheN2DqD790Lu34vR4AaABAg',
          snippet: {
            videoId: 'IuabP_JlImk',
            topLevelComment: {
              kind: 'youtube#comment',
              etag: 'fRTwZuPeYgw2pRNRFXQbbIHPMJw',
              id: 'UgyheN2DqD790Lu34vR4AaABAg',
              snippet: {
                videoId: 'IuabP_JlImk',
                textDisplay: 'Comment 3',
                textOriginal: 'Comment 3',
                authorDisplayName: 'Sami Hussain',
                authorProfileImageUrl:
                  'https://yt3.ggpht.com/ytc/AGIKgqM3dSIB-Lq_yE2AXepPEq8YgkhfaglzrUA1CXjGxuYpwNQkOaZdpvO4dZRdbZnO=s48-c-k-c0x00ffffff-no-rj',
                authorChannelUrl: 'http://www.youtube.com/channel/UCY0LBVktPq1P9awShZ7UODw',
                authorChannelId: {
                  value: 'UCY0LBVktPq1P9awShZ7UODw',
                },
                canRate: true,
                viewerRating: 'none',
                likeCount: 0,
                publishedAt: '2023-05-26T12:20:38Z',
                updatedAt: '2023-05-26T12:20:38Z',
              },
            },
            canReply: true,
            totalReplyCount: 0,
            isPublic: true,
          },
        },
      ],
    });
  },
};

describe('YoutubeService', () => {
  let youtubeService: YoutubeService;

  beforeEach(() => {
    youtubeService = new YoutubeService(mockRepository, 'mockApiKey');
  });

  describe('getVideoIdsWhichThrows', () => {
    it('should throw an error when channelId is missing', async () => {
      await expect(youtubeService.getVideoIdsWhichThrows('')).rejects.toThrowError('YoutubeService: Missing channelId');
    });

    it('should return an array of videoIds when channelId is provided', async () => {
      const videoIds: VideoId[] = await youtubeService.getVideoIdsWhichThrows('channel123');
      expect(videoIds).toEqual(['video1', 'video2', 'video3']);
    });
  });

  describe('getVideoCommentThreadsWhichThrows', () => {
    it('should throw an error when videoId is missing', async () => {
      await expect(youtubeService.getVideoCommentThreadsWhichThrows('')).rejects.toThrowError('YoutubeService: Missing videoId');
    });

    it('should return an array of comments when videoId is provided', async () => {
      const comments: Comment[] = await youtubeService.getVideoCommentThreadsWhichThrows('video123');
      expect(comments).toEqual(['Comment 1', 'Comment 2', 'Comment 3']);
    });
  });
});

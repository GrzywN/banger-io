import { ApiFetcherService, ErrorCallback } from './api-fetcher';

describe('ApiFetcherService', () => {
  const mockErrorCallback: ErrorCallback = jest.fn();

  const youtubeApiKey = 'YOUTUBE_API_KEY';

  let apiFetcherService: ApiFetcherService;

  beforeEach(() => {
    apiFetcherService = new ApiFetcherService(youtubeApiKey, mockErrorCallback);
  });

  describe('fetchYoutubeComments', () => {
    it('should return an empty map if channelId is null', async () => {
      const channelUrl = 'https://www.youtube.com/CHANNEL_ID';

      const result = await apiFetcherService.fetchYoutubeComments(channelUrl);

      expect(result).toEqual(new Map<string, string[]>());
    });

    it('should call getCommentsForChannel with the correct channelId', async () => {
      const channelUrl = 'https://www.youtube.com/CHANNEL_ID';
      const mockGetCommentsForChannel = jest
        .spyOn(apiFetcherService as any, 'getCommentsForChannel')
        .mockResolvedValue(new Map<string, string[]>());

      await apiFetcherService.fetchYoutubeComments(channelUrl);

      expect(mockGetCommentsForChannel).toHaveBeenCalledWith('CHANNEL_ID');
    });
  });

  describe('getChannelId', () => {
    it('should return the channelId from a valid channel URL', () => {
      const channelUrl = 'https://www.youtube.com/CHANNEL_ID';

      const result = (apiFetcherService as any).getChannelId(channelUrl);

      expect(result).toBe('CHANNEL_ID');
    });

    it.todo('should call errorCallback with an error if an invalid URL is provided');
  });

  describe('getCommentsForChannel', () => {
    it('should return a map of video comments', async () => {
      const channelId = 'CHANNEL_ID';
      const mockVideoIds = ['VIDEO_ID_1', 'VIDEO_ID_2'];
      const mockVideoComments = new Map<string, string[]>();
      mockVideoComments.set('VIDEO_ID_1', ['Comment 1', 'Comment 2']);
      mockVideoComments.set('VIDEO_ID_2', ['Comment 3', 'Comment 4']);
      const mockGetVideoIdsWhichThrows = jest
        .spyOn(apiFetcherService['youtubeService'], 'getVideoIdsWhichThrows')
        .mockResolvedValue(Promise.resolve(mockVideoIds));
      const mockGetVideoCommentThreadsWhichThrows = jest
        .spyOn(apiFetcherService['youtubeService'], 'getVideoCommentThreadsWhichThrows')
        .mockImplementation((videoId: string) => {
          if (videoId === 'VIDEO_ID_1') {
            return Promise.resolve(['Comment 1', 'Comment 2']);
          } else if (videoId === 'VIDEO_ID_2') {
            return Promise.resolve(['Comment 3', 'Comment 4']);
          }
          return Promise.resolve([]);
        });

      const result = await (apiFetcherService as any).getCommentsForChannel(channelId);

      expect(mockGetVideoIdsWhichThrows).toHaveBeenCalledWith(channelId);
      expect(mockGetVideoCommentThreadsWhichThrows).toHaveBeenCalledWith('VIDEO_ID_1');
      expect(mockGetVideoCommentThreadsWhichThrows).toHaveBeenCalledWith('VIDEO_ID_2');
      expect(result).toEqual(mockVideoComments);
    });

    it.todo('should call errorCallback with an error if an error occurs');
  });
});

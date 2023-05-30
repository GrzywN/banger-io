import { YoutubeApiHttpRepository } from './youtube-api-repository';

describe('YoutubeApiHttpRepository', () => {
  const mockHttpClient = {
    get: jest.fn(),
  };

  const youtubeApiKey = 'YOUR_YOUTUBE_API_KEY';

  let youtubeApiRepository: YoutubeApiHttpRepository;

  beforeEach(() => {
    youtubeApiRepository = new YoutubeApiHttpRepository(mockHttpClient as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getVideosFromChannel', () => {
    it('should call httpClient.get with the correct parameters', async () => {
      const channelId = 'CHANNEL_ID';
      const expectedUrl = 'https://www.googleapis.com/youtube/v3/videos';
      const expectedParams = {
        channelId: channelId,
        key: youtubeApiKey,
        chart: 'mostPopular',
      };

      await youtubeApiRepository.getVideosFromChannel(channelId, youtubeApiKey);

      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl, expectedParams);
    });

    it('should return the response from httpClient.get', async () => {
      const mockResponse = { data: 'response data' };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await youtubeApiRepository.getVideosFromChannel('CHANNEL_ID', youtubeApiKey);

      expect(result).toBe(mockResponse);
    });
  });

  describe('getCommentThreadsFromVideo', () => {
    it('should call httpClient.get with the correct parameters', async () => {
      const videoId = 'VIDEO_ID';
      const expectedUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';
      const expectedParams = {
        key: youtubeApiKey,
        videoId: videoId,
        part: 'snippet',
      };

      await youtubeApiRepository.getCommentThreadsFromVideo(videoId, youtubeApiKey);

      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl, expectedParams);
    });

    it('should return the response from httpClient.get', async () => {
      const mockResponse = { data: 'response data' };
      mockHttpClient.get.mockResolvedValue(mockResponse);

      const result = await youtubeApiRepository.getCommentThreadsFromVideo('VIDEO_ID', youtubeApiKey);

      expect(result).toBe(mockResponse);
    });
  });
});

describe('getCommentsSummarizer', () => {
  it.todo('should return a function');

  it.todo('should return an empty map if channelId is null');

  it.todo('should call getChannelId with the correct parameters');

  it.todo('should call getCommentsForChannel with the correct parameters');

  it.todo('should return the comments map');
});

describe('getChannelId', () => {
  it.todo('should return the channelId from a valid URL');

  it.todo('should call errorCallback with the error if URL parsing fails');

  it.todo('should call errorCallback if it is provided and an error occurs');
});

describe('getCommentsForChannel', () => {
  it.todo('should return an empty map if videoIds is empty');

  it.todo('should call getVideoIdsForChannel with the correct parameters');

  it.todo('should call getCommentsForVideo for each videoId');

  it.todo('should call errorCallback if it is provided and an error occurs');
});

describe('getVideoIdsForChannel', () => {
  it.todo('should return an empty array if the API response is empty');

  it.todo('should return an array of videoIds from the API response');

  it.todo('should call errorCallback if it is provided and an error occurs');
});

describe('getCommentsForVideo', () => {
  it.todo('should return an empty array if the API response is empty');

  it.todo('should return an array of comments from the API response');

  it.todo('should call errorCallback if it is provided and an error occurs');
});

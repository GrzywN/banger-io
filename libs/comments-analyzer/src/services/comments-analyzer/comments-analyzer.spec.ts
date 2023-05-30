import { CommentsAnalyzerService, VideoIdsAndComments, Criteria } from './comments-analyzer.service';

describe('CommentsAnalyzerService', () => {
  let commentsAnalyzerService: CommentsAnalyzerService;

  describe('analyzeComments', () => {
    it('should analyze comments and count matching criteria', () => {
      const comments: VideoIdsAndComments = new Map([
        ['VIDEO_ID_1', ['Comment 1', 'Comment 2']],
        ['VIDEO_ID_2', ['Comment 3', 'Comment 4']],
      ]);

      const matchCriteria: string[] = ['criteria1', 'criteria2'];

      commentsAnalyzerService = new CommentsAnalyzerService(matchCriteria);
      const result = commentsAnalyzerService.analyzeComments(comments);

      expect(result.size).toBe(2);
      expect(result.get('VIDEO_ID_1')).toEqual(
        new Map([
          ['criteria1', 0],
          ['criteria2', 0],
        ])
      );
      expect(result.get('VIDEO_ID_2')).toEqual(
        new Map([
          ['criteria1', 0],
          ['criteria2', 0],
        ])
      );
    });

    it('should count matching criteria in comments', () => {
      const comments: VideoIdsAndComments = new Map([
        ['VIDEO_ID_1', ['Comment 1 with criteria1', 'Comment 2 with criteria2']],
        ['VIDEO_ID_2', ['Comment 3 with criteria1', 'Comment 4 with criteria2']],
      ]);

      const matchCriteria: string[] = ['criteria1', 'criteria2'];

      commentsAnalyzerService = new CommentsAnalyzerService(matchCriteria);
      const result = commentsAnalyzerService.analyzeComments(comments);

      expect(result.size).toBe(2);
      expect(result.get('VIDEO_ID_1')).toEqual(
        new Map([
          ['criteria1', 1],
          ['criteria2', 1],
        ])
      );
      expect(result.get('VIDEO_ID_2')).toEqual(
        new Map([
          ['criteria1', 1],
          ['criteria2', 1],
        ])
      );
    });

    it('should handle empty comments', () => {
      const comments: VideoIdsAndComments = new Map();

      const matchCriteria: string[] = ['criteria1', 'criteria2'];

      commentsAnalyzerService = new CommentsAnalyzerService(matchCriteria);
      const result = commentsAnalyzerService.analyzeComments(comments);

      expect(result.size).toBe(0);
    });

    it('should handle empty match criteria', () => {
      const comments: VideoIdsAndComments = new Map([
        ['VIDEO_ID_1', ['Comment 1', 'Comment 2']],
        ['VIDEO_ID_2', ['Comment 3', 'Comment 4']],
      ]);

      const matchCriteria: string[] = [];

      commentsAnalyzerService = new CommentsAnalyzerService(matchCriteria);
      const result = commentsAnalyzerService.analyzeComments(comments);

      expect(result.size).toBe(2);
      expect(result.get('VIDEO_ID_1')).toEqual(new Map());
      expect(result.get('VIDEO_ID_2')).toEqual(new Map());
    });
  });

  describe('updateMatchCriteria', () => {
    it('should update the match criteria', () => {
      const matchCriteria: Criteria[] = [];
      const newMatchCriteria: Criteria[] = ['criteria3'];

      commentsAnalyzerService = new CommentsAnalyzerService(matchCriteria);
      commentsAnalyzerService.updateMatchCriteria(newMatchCriteria);

      expect(commentsAnalyzerService['matchCriteria']).toEqual(newMatchCriteria);
    });
  });
});

export type VideoIdsAndComments = Map<string, string[]>;

export type VideoId = string;

export type Criteria = string;

export type Counter = number;

export class CommentsAnalyzerService {
  constructor(private matchCriteria: Criteria[]) {}

  analyzeComments(comments: VideoIdsAndComments): Map<VideoId, Map<Criteria, Counter>> {
    const videosAndCriteriaCounters = new Map<VideoId, Map<Criteria, Counter>>();

    comments.forEach((videoComments, videoId) => {
      const counter = new Map<Criteria, Counter>();

      for (const comment of videoComments) {
        for (const criteria of this.matchCriteria) {
          const regex = new RegExp(criteria);
          const didMatch = regex.test(comment);

          if (counter.get(criteria) == null) {
            counter.set(criteria, 0);
          }

          if (didMatch) {
            counter.set(criteria, (counter.get(criteria) || 0) + 1);
          }
        }
      }

      videosAndCriteriaCounters.set(videoId, counter);
    });

    return videosAndCriteriaCounters;
  }

  updateMatchCriteria(matchCriteria: Criteria[]) {
    this.matchCriteria = matchCriteria;
  }
}

export default CommentsAnalyzerService;

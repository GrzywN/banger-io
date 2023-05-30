import { z } from 'zod';

export const CommentThreadsSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string(),
  pageInfo: z.object({ totalResults: z.number(), resultsPerPage: z.number() }),
  items: z.array(
    z.object({
      kind: z.string(),
      etag: z.string(),
      id: z.string(),
      snippet: z.object({
        videoId: z.string(),
        topLevelComment: z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.string(),
          snippet: z.object({
            videoId: z.string(),
            textDisplay: z.string(),
            textOriginal: z.string(),
            authorDisplayName: z.string(),
            authorProfileImageUrl: z.string(),
            authorChannelUrl: z.string(),
            authorChannelId: z.object({ value: z.string() }),
            canRate: z.boolean(),
            viewerRating: z.string(),
            likeCount: z.number(),
            publishedAt: z.string(),
            updatedAt: z.string(),
          }),
        }),
        canReply: z.boolean(),
        totalReplyCount: z.number(),
        isPublic: z.boolean(),
      }),
    })
  ),
});

export const parseCommentThreads = (response: unknown) => CommentThreadsSchema.parse(response);

export type CommentThreads = z.infer<typeof CommentThreadsSchema>;

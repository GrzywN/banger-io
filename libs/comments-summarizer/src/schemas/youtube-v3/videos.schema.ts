import { z } from 'zod';

export const VideosSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  items: z.array(z.object({ kind: z.string(), etag: z.string(), id: z.string() })),
  nextPageToken: z.string(),
  pageInfo: z.object({ totalResults: z.number(), resultsPerPage: z.number() }),
});

export const parseVideos = (response: unknown) => VideosSchema.parse(response);

export type Videos = z.infer<typeof VideosSchema>;

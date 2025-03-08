import { z } from 'zod';

const selectors = z.object({
  name: z.string(),
  base64: z.string(),
  order: z.number(),
});

export type ISelectors = z.infer<typeof selectors>;

export default selectors;

import { z } from 'zod';

const selectors = z.object({
  name: z.string(),
  description: z.string(),
  base64: z.string(),
  order: z.number(),
});

export type ISelectors = Record<string, z.infer<typeof selectors>[]>;

export type ISelector = z.infer<typeof selectors>;

export interface ISubscriptionMeta {
  name: string;
  id: string;
  description?: string;
  author?: string;
  selectors: string;
}

export default selectors;

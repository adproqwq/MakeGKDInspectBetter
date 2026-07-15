import { z } from 'zod';

const selectors = z.object({
  name: z.string(),
  description: z.string(),
  selector: z.string(),
  order: z.number(),
});

export type ISelector = z.infer<typeof selectors>;

export type ISelectors = Record<string, ISelector[]>;

export interface ISubscriptionMeta {
  name: string;
  id: string;
  description?: string;
  author?: string;
  selectors: string;
}

export default selectors;

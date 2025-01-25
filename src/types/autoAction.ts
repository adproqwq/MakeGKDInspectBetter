import type { Snapshot } from './snapshot';

export interface AutoAction extends Snapshot {
  autoAction?: AutoActionTerms;
}

export interface AutoActionTerms {
  autoSearchSelector: string;
}

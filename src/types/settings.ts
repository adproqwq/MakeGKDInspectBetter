import { RawCategory } from '@gkd-kit/api';
import type { RulesKeyOrder } from '../utils/sort';
import type { ISubscriptionMeta } from './selectors';

export interface ISettings {
  categories: RawCategory[];
  rulesKeySort: RulesKeyOrder;
  subscriptions: ISubscriptionMeta[];
  hideLoadSnackbar: boolean;
  simplyName: boolean;
  autoAddSelector: boolean;
  activityIdsSimply: boolean;
  readClipboard: boolean;
}

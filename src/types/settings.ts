import { RawCategory } from '@gkd-kit/api';
import type { RulesKeyOrder } from '../utils/sort';

export interface ISettings {
  categories: RawCategory[];
  rulesKeySort: RulesKeyOrder;
  hideLoadSnackbar: boolean;
  simplyName: boolean;
  activityIdsSimply: boolean;
  readClipboard: boolean;
  vidAdaption: boolean;
}

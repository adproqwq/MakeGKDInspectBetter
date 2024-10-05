import { RawCategory } from '@gkd-kit/api';

export interface ISettings {
  categories: RawCategory[];
  hideLoadSnackbar: boolean;
  simplyName: boolean;
  autoAddSelector: boolean;
  activityIdsSimply: boolean;
};
import { RawCategory } from '@gkd-kit/api';
import { saveAs } from 'file-saver';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISettings } from '../types/settings';
import type { ISubscriptionMeta } from '../types/selectors';
import type { RulesKeyOrder } from '../utils/sort';

export default async () => {
  const activityIdsSimply = await getHanashiroSettings<boolean>('activityIdsSimply');
  const autoAddSelector = await getHanashiroSettings<boolean>('autoAddSelector');
  const categories = await getHanashiroSettings<RawCategory[]>('categories');
  const hideLoadSnackbar = await getHanashiroSettings<boolean>('hideLoadSnackbar');
  const quickReplaceNodeInfo = await getHanashiroSettings<boolean>('quickReplaceNodeInfo');
  const rulesKeySort = (await getHanashiroSettings<RulesKeyOrder>('rulesKeySort'))!;
  const subscriptions = await getHanashiroSettings<ISubscriptionMeta[]>('categories');
  const simplyName = await getHanashiroSettings<boolean>('simplyName');
  const readClipboard = await getHanashiroSettings<boolean>('readClipboard');
  const vidAdaption = await getHanashiroSettings<boolean>('vidAdaption');

  const settings: ISettings = {
    activityIdsSimply: activityIdsSimply ?? false,
    autoAddSelector: autoAddSelector ?? false,
    categories: categories ?? [],
    hideLoadSnackbar: hideLoadSnackbar ?? false,
    quickReplaceNodeInfo: quickReplaceNodeInfo ?? false,
    rulesKeySort: rulesKeySort,
    subscriptions: subscriptions ?? [],
    simplyName: simplyName ?? false,
    readClipboard: readClipboard ?? false,
    vidAdaption: vidAdaption ?? false,
  };

  const settingsFile = new Blob([JSON.stringify(settings, undefined, 2)]);
  saveAs(settingsFile, 'settings.json5');
};

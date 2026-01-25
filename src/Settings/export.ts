import { RawCategory } from '@gkd-kit/api';
import { saveAs } from 'file-saver';
import { getHanashiroSettings } from '../utils/indexedDB';
import { ISettings } from '../types/settings';
import type { RulesKeyOrder } from '../utils/sort';

export default async () => {
  const activityIdsSimply = await getHanashiroSettings<boolean>('activityIdsSimply');
  const autoAddSelector = await getHanashiroSettings<boolean>('autoAddSelector');
  const categories = await getHanashiroSettings<RawCategory[]>('categories');
  const hideLoadSnackbar = await getHanashiroSettings<boolean>('hideLoadSnackbar');
  const rulesKeySort = (await getHanashiroSettings<RulesKeyOrder>('rulesKeySort'))!;
  const simplyName = await getHanashiroSettings<boolean>('simplyName');
  const readClipboard = await getHanashiroSettings<boolean>('readClipboard');

  const settings: ISettings = {
    activityIdsSimply: activityIdsSimply ? activityIdsSimply : false,
    autoAddSelector: autoAddSelector ? autoAddSelector : false,
    categories: categories ? categories : [],
    hideLoadSnackbar: hideLoadSnackbar ? hideLoadSnackbar : false,
    rulesKeySort: rulesKeySort,
    simplyName: simplyName ? simplyName : false,
    readClipboard: readClipboard ? readClipboard : false,
  };

  const settingsFile = new Blob([JSON.stringify(settings, undefined, 2)]);
  saveAs(settingsFile, 'settings.json5');
};

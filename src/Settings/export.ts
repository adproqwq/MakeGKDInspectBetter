import { RawCategory } from '@gkd-kit/api';
import json5 from 'json5';
import { saveAs } from 'file-saver';
import { getHanashiroSettings } from '../utils/indexedDB';
import { ISettings } from '../types/settings';

export default async () => {
  const activityIdsSimply = await getHanashiroSettings<boolean>('activityIdsSimply');
  const autoAddSelector = await getHanashiroSettings<boolean>('autoAddSelector');
  const categories = await getHanashiroSettings<RawCategory[]>('categories');
  const hideLoadSnackbar = await getHanashiroSettings<boolean>('hideLoadSnackbar');
  const simplyName = await getHanashiroSettings<boolean>('simplyName');

  const settings: ISettings = {
    activityIdsSimply: activityIdsSimply ? activityIdsSimply : false,
    autoAddSelector: autoAddSelector ? autoAddSelector : false,
    categories: categories ? categories : [],
    hideLoadSnackbar: hideLoadSnackbar ? hideLoadSnackbar : false,
    simplyName: simplyName ? simplyName : false,
  };

  const settingsFile = new Blob([json5.stringify(settings, undefined, 2)]);
  saveAs(settingsFile, 'settings.json5');
};
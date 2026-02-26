import { TextField, Switch, snackbar } from 'mdui';
import json5 from 'json5';
import { z } from 'zod';
import { setHanashiroSettings, getInspectSettings, setInspectSettings } from '../utils/indexedDB';
import { send } from '../utils/event';
import { RawCategoryZod } from '../types/categoryZod';

export default async () => {
  const categories = (document.querySelector('#categories') as TextField).value;
  const rulesKeySort = (document.querySelector('#rulesKeySort') as TextField).value;
  const subscriptions = (document.querySelector('#subscriptions') as TextField).value;
  const maxShowSize = (document.querySelector('#maxShowSize') as TextField).value;
  const isHideLoadSnackbar = (document.querySelector('#hideLoadSnackbar') as Switch).checked;
  const isSimplyName = (document.querySelector('#simplyName') as Switch).checked;
  const isAutoAddSelector = (document.querySelector('#autoAddSelector') as Switch).checked;
  const isActivityIdsSimply = (document.querySelector('#activityIdsSimply') as Switch).checked;
  const isQuickReplaceNodeInfo = (document.querySelector('#quickReplaceNodeInfo') as Switch).checked;
  const isReadClipboard = (document.querySelector('#readClipboard') as Switch).checked;

  const inspectSettings = (await getInspectSettings())!;

  let isCategoriesLegal = true;

  try {
    json5
      .parse<z.infer<typeof RawCategoryZod>[]>(categories ? categories : '[]')
      .forEach((category) => {
        RawCategoryZod.parse(category);
      });
  } catch {
    isCategoriesLegal = false;
    snackbar({
      message: '分类格式错误！分类设置已跳过！',
      placement: 'top',
    });
  }

  if (isCategoriesLegal)
    await setHanashiroSettings('categories', json5.parse(categories ? categories : '[]'));
  await setHanashiroSettings('rulesKeySort', json5.parse(rulesKeySort ? rulesKeySort : '[]'));
  await setHanashiroSettings('subscriptions', json5.parse(subscriptions ? subscriptions : '[]'));
  await setHanashiroSettings('hideLoadSnackbar', isHideLoadSnackbar);
  await setHanashiroSettings('simplyName', isSimplyName);
  await setHanashiroSettings('autoAddSelector', isAutoAddSelector);
  await setHanashiroSettings('activityIdsSimply', isActivityIdsSimply);
  await setHanashiroSettings('quickReplaceNodeInfo', isQuickReplaceNodeInfo);
  await setHanashiroSettings('readClipboard', isReadClipboard);

  inspectSettings.maxShowNodeSize = Number(maxShowSize);
  await setInspectSettings(inspectSettings);

  send('closePage');
};

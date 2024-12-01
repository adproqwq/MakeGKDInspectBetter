import { TextField, Switch } from 'mdui';
import json5 from 'json5';
import { setHanashiroSettings, getInspectSettings, setInspectSettings } from '../utils/indexedDB';
import { send } from '../utils/communicate';

export default async () => {
  const categories = (document.querySelector('#categories') as TextField).value;
  const rulesKeySort = (document.querySelector('#rulesKeySort') as TextField).value;
  const maxShowSize = (document.querySelector('#maxShowSize') as TextField).value;
  const isHideLoadSnackbar = (document.querySelector('#hideLoadSnackbar') as Switch).checked;
  const isSimplyName = (document.querySelector('#simplyName') as Switch).checked;
  const isAutoAddSelector = (document.querySelector('#autoAddSelector') as Switch).checked;
  const isActivityIdsSimply = (document.querySelector('#activityIdsSimply') as Switch).checked;

  const inspectSettings = (await getInspectSettings())!;

  await setHanashiroSettings('categories', json5.parse(categories ? categories : '[]'));
  await setHanashiroSettings('rulesKeySort', json5.parse(rulesKeySort ? rulesKeySort : '[]'));
  await setHanashiroSettings('hideLoadSnackbar', isHideLoadSnackbar);
  await setHanashiroSettings('simplyName', isSimplyName);
  await setHanashiroSettings('autoAddSelector', isAutoAddSelector);
  await setHanashiroSettings('activityIdsSimply', isActivityIdsSimply);

  inspectSettings.maxShowNodeSize = Number(maxShowSize);
  await setInspectSettings(inspectSettings);

  send('closePage');
};
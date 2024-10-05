import { TextField, Switch } from 'mdui';
import json5 from 'json5';
import { setHanashiroSettings } from '../utils/indexedDB';
import { send } from '../utils/communicate';

export default async () => {
  const categories = (document.querySelector('#categories') as TextField).value;
  const isHideLoadSnackbar = (document.querySelector('#hideLoadSnackbar') as Switch).checked;
  const isSimplyName = (document.querySelector('#simplyName') as Switch).checked;
  const isAutoAddSelector = (document.querySelector('#autoAddSelector') as Switch).checked;
  const isActivityIdsSimply = (document.querySelector('#activityIdsSimply') as Switch).checked;

  await setHanashiroSettings('categories', json5.parse(categories ? categories : '{}'));
  await setHanashiroSettings('hideLoadSnackbar', isHideLoadSnackbar);
  await setHanashiroSettings('simplyName', isSimplyName);
  await setHanashiroSettings('autoAddSelector', isAutoAddSelector);
  await setHanashiroSettings('activityIdsSimply', isActivityIdsSimply);

  send('closePage');
};
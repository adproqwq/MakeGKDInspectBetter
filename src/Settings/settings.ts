import { TextField, Switch, Dialog } from 'mdui';
import json5 from 'json5';
import { setHanashiroSettings } from '../utils/indexedDB';

export default async () => {
  const categories = (document.querySelector('#categories') as TextField).value;
  const isSimplyName = (document.querySelector('#simplyName') as Switch).checked;
  const isAutoAddSelector = (document.querySelector('#autoAddSelector') as Switch).checked;
  const isActivityIdsSimply = (document.querySelector('#activityIdsSimply') as Switch).checked;

  await setHanashiroSettings('categories', json5.parse(categories ? categories : '{}'));
  await setHanashiroSettings('simplyName', isSimplyName);
  await setHanashiroSettings('autoAddSelector', isAutoAddSelector);
  await setHanashiroSettings('activityIdsSimply', isActivityIdsSimply);

  (document.querySelector('#page') as Dialog).open = false;
};
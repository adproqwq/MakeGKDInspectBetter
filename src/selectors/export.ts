import json5 from 'json5';
import { saveAs } from 'file-saver';
import { getHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

export default async () => {
  const selectors = await getHanashiroSettings<ISelectors[]>('selectors');

  const selectorsFile = new Blob([json5.stringify(selectors, undefined, 2)]);
  saveAs(selectorsFile, 'selectors.json5');
};
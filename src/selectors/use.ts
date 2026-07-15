import type { Tabs } from 'mdui';
import { encodeURI } from 'js-base64';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

export const updateSelectors = async () => {
  const panel = (document.querySelector('#selectorTabs') as Tabs).value!;

  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;

  return selectors[panel].sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
  });
};

export const search = async () => {
  const target = new URL(window.location.href);

  target.searchParams.set('gkd', encodeURI(window.Hanashiro.currentSelector.selector));

  window.location.href = target.toString();
};

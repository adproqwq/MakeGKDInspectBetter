import { getHanashiroSettings, setHanashiroSettings } from './indexedDB';
import type { ISubscriptionMeta, ISelectors } from '../types/selectors';

export default async (meta: ISubscriptionMeta) => {
  const selectors: ISelectors = await (await fetch(meta.selectors)).json();
  const savedSelectors = (await getHanashiroSettings<ISelectors>('selectors'))!;

  savedSelectors[meta.id] = selectors[meta.id];

  savedSelectors[meta.id].sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
  });

  await setHanashiroSettings('selectors', savedSelectors);
};

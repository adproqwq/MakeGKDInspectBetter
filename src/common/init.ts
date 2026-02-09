import { snackbar, confirm } from 'mdui';
import {
  getHanashiroSettings,
  setHanashiroSettings,
  getInspectSettings,
  setInspectSettings,
} from '../utils/indexedDB';
import fetchSubscription from '../utils/fetchSubscription';
import type { ICount } from '../types/count';
import type { ISelector, ISelectors, ISubscriptionMeta } from '../types/selectors';

Object.defineProperty(window, 'Hanashiro', {
  value: {},
  writable: true,
});

const userRulesKeySort = (await getHanashiroSettings<Array<string>>('rulesKeySort'))!;
const rulesKeySort = [
  'key',
  'preKeys',
  'fastQuery',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'priorityTime',
  'matchRoot',
  'action',
  'activityIds',
  'position',
  'matches',
  'exampleUrls',
  'snapshotUrls',
];

if (!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', {});
if (Array.isArray(await getHanashiroSettings('selectors'))) {
  const selectorRecord: ISelectors = {
    本地: [],
  };

  console.log(await getHanashiroSettings<ISelector[]>('selectors'));
  Array.from((await getHanashiroSettings<ISelector[]>('selectors'))!).forEach((selector) => {
    selectorRecord['本地'].push(selector);
  });

  await setHanashiroSettings('selectors', selectorRecord);
}

if (!(await getHanashiroSettings('subscriptions'))) await setHanashiroSettings('subscriptions', []);

if (!(await getHanashiroSettings('rulesKeySort')) || userRulesKeySort.length == 0) {
  await setHanashiroSettings('rulesKeySort', rulesKeySort);
}

if (userRulesKeySort.length != rulesKeySort.length)
  confirm({
    headline: '同步最新rulesKey排序',
    description:
      '检测你的rulesKey排序有多余或缺失字段，可能无法使用最新的功能。是否同步？注意：这会丢失你现有的排序设置。',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    confirmText: '同步',
    cancelText: '取消',
    onConfirm: async () => await setHanashiroSettings('rulesKeySort', rulesKeySort),
  });
else {
  for (const rulesKey of userRulesKeySort) {
    if (!rulesKeySort.includes(rulesKey))
      confirm({
        headline: '同步最新rulesKey排序',
        description:
          '检测你的rulesKey排序有多余或缺失字段，可能无法使用最新的功能。是否同步？注意：这会丢失你现有的排序设置。',
        closeOnEsc: true,
        closeOnOverlayClick: true,
        confirmText: '同步',
        cancelText: '取消',
        onConfirm: async () => await setHanashiroSettings('rulesKeySort', rulesKeySort),
      });
    break;
  }
}

if (!(await getInspectSettings()))
  await setInspectSettings({
    autoUploadImport: false,
    ignoreUploadWarn: false,
    ignoreWasmWarn: false,
    maxShowNodeSize: 2000,
  });

if (!(await getHanashiroSettings<ICount>('count')))
  await setHanashiroSettings<ICount>('count', {
    rejectRules: 0,
    loaded: 0,
  });

const count = (await getHanashiroSettings<ICount>('count'))!;
count.loaded++;
await setHanashiroSettings<ICount>('count', count);

if (!(await getHanashiroSettings<boolean>('hideLoadSnackbar'))) {
  snackbar({
    message: '世界第一公主殿下已经降下魔法~',
    autoCloseDelay: 2000,
    placement: 'top',
  });
}

if (
  (await getHanashiroSettings<number>('subscriptionsLastUpdateTime')) === null ||
  Date.now() - (await getHanashiroSettings<number>('subscriptionsLastUpdateTime'))! >=
    60 * 60 * 1000
) {
  Array.from((await getHanashiroSettings<ISubscriptionMeta[]>('subscriptions'))!).forEach(
    (meta) => {
      fetchSubscription(meta)
        .then(() => {
          snackbar({
            message: `订阅【${meta.name}】已更新`,
            placement: 'top',
          });
        })
        .catch(() => {
          snackbar({
            message: `订阅【${meta.name}】更新失败`,
            placement: 'top',
          });
        })
        .finally(async () => {
          await setHanashiroSettings('subscriptionsLastUpdateTime', Date.now());
        });
    },
  );
}

import { snackbar, confirm } from 'mdui';
import { decode, encode } from 'js-base64';
import {
  getHanashiroSettings,
  setHanashiroSettings,
  getInspectSettings,
  setInspectSettings,
  getSnapshotInfo,
} from '../utils/indexedDB';
import fetchSubscription from '../utils/fetchSubscription';
import { receive } from '../utils/event';
import getSnapshotId from '../utils/getSnapshotId';
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

  Array.from((await getHanashiroSettings<ISelector[]>('selectors'))!).forEach((selector) => {
    selectorRecord['本地'].push(selector);
  });

  await setHanashiroSettings('selectors', selectorRecord);
}
if (
  Object.entries((await getHanashiroSettings<ISelectors>('selectors'))!).some(([_, selectors]) =>
    selectors.some((selector) => Object.hasOwn(selector, 'base64')),
  )
) {
  const oldSelectors = Object.entries((await getHanashiroSettings<ISelectors>('selectors'))!);
  let newSelectors: ISelectors = {};

  oldSelectors.forEach(([category, selectors]) => {
    selectors.forEach((selector, index) => {
      if (Object.hasOwn(selector, 'base64')) {
        selector.selector = decode((selector as ISelector & { base64?: string }).base64!);
        delete (selector as ISelector & { base64?: string }).base64;
        selectors[index] = selector;
      }
    });

    newSelectors[category] = selectors;
  });

  await setHanashiroSettings('selectors', newSelectors);
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

receive('openVscode', async () => {
  const packageName = (await getSnapshotInfo(await getSnapshotId()))?.appId;

  window.location.href = `vscode://tianfangyetan.gkd-toolkit/open?app=${packageName}`;
});
receive('openVscodeAppend', async () => {
  const packageName = (await getSnapshotInfo(await getSnapshotId()))?.appId;

  receive(
    'ruleWriteClipboardDone',
    () => {
      window.location.href = `vscode://tianfangyetan.gkd-toolkit/append?app=${packageName}&payload=${encode(window.Hanashiro.returnResult, true)}`;
    },
    true,
  );
});

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

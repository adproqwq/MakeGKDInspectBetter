import { snackbar, confirm } from 'mdui';
import { encode } from 'js-base64';
import {
  getHanashiroSettings,
  setHanashiroSettings,
  getInspectSettings,
  setInspectSettings,
  getSnapshotInfo,
} from '../utils/indexedDB';
import { receive } from '../utils/event';
import getSnapshotId from '../utils/getSnapshotId';
import type { ICount } from '../types/count';

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

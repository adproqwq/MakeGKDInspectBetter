import { snackbar, confirm } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings, getInspectSettings, setInspectSettings } from '../utils/indexedDB';

const rulesKeySort = [
  'key',
  'preKeys',
  'fastQuery',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'priorityTime',
  'action',
  'activityIds',
  'position',
  'matches',
  'exampleUrls',
  'snapshotUrls',
];

if(!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', []);

if(!(await getHanashiroSettings('rulesKeySort')) || (await getHanashiroSettings<Array<string>>('rulesKeySort'))!.length == 0){
  await setHanashiroSettings('rulesKeySort', rulesKeySort);
}

for(const rulesKey of (await getHanashiroSettings<Array<string>>('rulesKeySort'))!){
  if(!rulesKeySort.includes(rulesKey)) confirm({
    headline: '同步最新rulesKey排序',
    description: '检测你的rulesKey排序有多余或缺失字段，可能无法使用最新的功能。是否同步？注意：这会丢失你现有的排序设置。',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    confirmText: '同步',
    cancelText: '取消',
    onConfirm: async () => await setHanashiroSettings('rulesKeySort', rulesKeySort),
  });
}

if(!(await getInspectSettings())) await setInspectSettings({
  autoUploadImport: false,
  ignoreUploadWarn: false,
  ignoreWasmWarn: false,
  maxShowNodeSize: 2000,
});

Object.defineProperty(window, 'Hanashiro', {
  value: {},
  writable: true,
});

if((await getHanashiroSettings<boolean>('hideLoadSnackbar')) === false){
  snackbar({
    message: '竹外一枝斜，想佳人，天寒日暮。',
    autoCloseDelay: 2000,
    placement: 'top',
  });
}
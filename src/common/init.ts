import { snackbar, confirm } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';

const rulesKeySort = [
  'key',
  'preKeys',
  'fastQuery',
  'quickFind',
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
if((await getHanashiroSettings<Array<string>>('rulesKeySort'))!.length != rulesKeySort.length) confirm({
  headline: '同步最新rulesKey排序',
  description: '检测你的rulesKey排序不是最新的，可能无法使用最新的功能。是否同步？注意：这会丢失你现有的排序设置。',
  closeOnEsc: true,
  closeOnOverlayClick: true,
  confirmText: '同步',
  cancelText: '取消',
  onConfirm: async () => await setHanashiroSettings('rulesKeySort', rulesKeySort),
});

Object.defineProperty(window, 'Hanashiro', {
  value: {},
  writable: true,
});

if((await getHanashiroSettings<boolean>('hideLoadSnackbar')) === false){
  snackbar({
    message: '雾露夜侵衣，关山晓催轴。',
    autoCloseDelay: 2000,
    placement: 'top',
  });
}
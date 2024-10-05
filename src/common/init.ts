import { snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';

if(!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', []);
if(!(await getHanashiroSettings('rulesKeySort')) || (await getHanashiroSettings<Array<string>>('rulesKeySort'))!.length == 0){
  await setHanashiroSettings('rulesKeySort', [
    'key',
    'preKeys',
    'fastQuery',
    'quickFind',
    'matchTime',
    'actionMaximum',
    'resetMatch',
    'action',
    'activityIds',
    'position',
    'matches',
    'exampleUrls',
    'snapshotUrls',
  ]);
}

Object.defineProperty(window, 'Hanashiro', {
  value: {},
  writable: true,
});

if((await getHanashiroSettings<boolean>('hideLoadSnackbar')) === false){
  snackbar({
    message: '好段东风，好轮明月，尽教封侯误。',
    autoCloseDelay: 2000,
    placement: 'top',
  });
}
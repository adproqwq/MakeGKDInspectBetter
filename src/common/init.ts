import { snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';

if(!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', []);

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
import { snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';

if(!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', []);

Object.defineProperty(window, 'Hanashiro', {
  value: {},
});

if((await getHanashiroSettings<boolean>('hideLoadSnackbar')) === false){
  snackbar({
    message: '木落雁南度，北风江上寒。',
    autoCloseDelay: 3000,
    placement: 'top',
  });
}
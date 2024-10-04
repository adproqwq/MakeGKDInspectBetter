import { snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';

if(!(await getHanashiroSettings('selectors'))) await setHanashiroSettings('selectors', []);

Object.defineProperty(window, 'Hanashiro', {
  value: {},
});

snackbar({
  message: '深秋帘幕千家雨，落日楼台一笛风。',
  autoCloseDelay: 3000,
  placement: 'top',
});
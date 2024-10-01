import { snackbar } from 'mdui';

if(!window.localStorage.getItem('selectors')) window.localStorage.setItem('selectors', '[]');

Object.defineProperty(window, 'Hanashiro', {
  value: {},
});

snackbar({
  message: '深秋帘幕千家雨，落日楼台一笛风。',
  autoCloseDelay: 3000,
  placement: 'top',
});
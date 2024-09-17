import { snackbar } from 'mdui';

if(!window.localStorage.getItem('selectors')) window.localStorage.setItem('selectors', '[]');

snackbar({
  message: '低声问向谁行宿，城上已三更。',
  autoCloseDelay: 3000,
  placement: 'top',
});
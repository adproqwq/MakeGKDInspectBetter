import { snackbar } from 'mdui';

if(!window.localStorage.getItem('selectors')) window.localStorage.setItem('selectors', '[]');

snackbar({
  message: '忆对中秋丹桂丛，花也杯中，月也杯中。',
  autoCloseDelay: 3000,
  placement: 'top',
});
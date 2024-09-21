import { snackbar } from 'mdui';

if(!window.localStorage.getItem('selectors')) window.localStorage.setItem('selectors', '[]');

snackbar({
  message: '对秋深，离恨苦，数夜满庭风雨。',
  autoCloseDelay: 3000,
  placement: 'top',
});
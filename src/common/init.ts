import { snackbar } from 'mdui';

if(!window.localStorage.getItem('selectors')) window.localStorage.setItem('selectors', '[]');

snackbar({
  message: '滩声秋更急，峡气晓多阴。',
  autoCloseDelay: 3000,
  placement: 'top',
});
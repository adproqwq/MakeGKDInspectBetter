import { TextField, Switch, Dialog } from 'mdui';

export default () => {
  const isSimplyName = (document.querySelector('#simplyName') as Switch).checked;
  const isAutoAddSelector = (document.querySelector('#autoAddSelector') as Switch).checked;

  window.localStorage.setItem('categories', (document.querySelector('#categories') as TextField).value);
  window.localStorage.setItem('simplyName', isSimplyName ? 'true' : 'false');
  window.localStorage.setItem('autoAddSelector', isAutoAddSelector ? 'true' : 'false');

  (document.querySelector('#page') as Dialog).open = false;
};
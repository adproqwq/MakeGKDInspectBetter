import { send } from './communicate';
import observeElement from './observeElement';

observeElement('.n-radio-group > div', () => {
  const radioGroup = document.querySelector('.n-radio-group > div')!;
  const iconButton = document.createElement('mdui-button-icon');
  iconButton.icon = 'settings';
  iconButton.onclick = () => {
    send('openSettings');
  };
  radioGroup.appendChild(iconButton);
});
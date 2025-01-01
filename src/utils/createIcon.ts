import { ButtonIcon } from 'mdui';

export const createBarIcon = (icon: string, onclick: () => void): ButtonIcon => {
  const iconElement = document.createElement('mdui-button-icon');
  iconElement.icon = icon;
  iconElement.style.height = '36px';
  iconElement.style.width = '36px';
  iconElement.onclick = onclick;

  return iconElement;
};
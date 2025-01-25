import { Tooltip } from 'mdui';

export const createBarIcon = (
  icon: string,
  tooltip: string,
  onclick: () => void,
): Tooltip => {
  const iconTooltip = document.createElement('mdui-tooltip');
  iconTooltip.content = tooltip;

  const iconElement = document.createElement('mdui-button-icon');
  iconElement.icon = icon;
  iconElement.style.height = '36px';
  iconElement.style.width = '36px';
  iconElement.onclick = onclick;

  iconTooltip.append(iconElement);

  return iconTooltip;
};

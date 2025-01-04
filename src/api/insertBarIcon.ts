import { Tooltip } from 'mdui';

export default (icon: Tooltip) => {
  const iconBar = document.querySelector('#iconBar')! as HTMLDivElement;

  iconBar.append(icon);
};
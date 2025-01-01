import { ButtonIcon } from 'mdui';

export default (icon: ButtonIcon) => {
  const iconBar = document.querySelector('#iconBar')! as HTMLDivElement;

  iconBar.append(icon);
};
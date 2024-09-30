import { RadioGroup, Radio } from 'mdui';
import json5 from 'json5';
import { ISelectors } from '../types/selectors';

export const generateSelectors = () => {
  const selectors = json5.parse(window.localStorage.getItem('selectors')!) as ISelectors[];
  const selectorsGroup = (document.querySelector('#selectors') as RadioGroup);

  let innerHtmlString = '';

  selectors.forEach(({ name, base64 }, index) => {
    innerHtmlString += `<mdui-radio id="selector" value=${base64} data-index="${String(index)}">${name}</mdui-radio>`;
  });

  selectorsGroup.innerHTML = innerHtmlString;

  document.querySelectorAll('#selector')!.forEach((radio) => {
    radio.addEventListener('click', (e) => {
      window.Hanashiro.currentUseSelectorIndex = Number((e.target as Radio).getAttribute('data-index')!);
    });
  });
};

export const search = () => {
  const selectors = json5.parse(window.localStorage.getItem('selectors')!) as ISelectors[];

  const target = new URL(window.location.href);

  target.searchParams.set('gkd', selectors[window.Hanashiro.currentUseSelectorIndex].base64);

  window.location.href = target.toString();
};
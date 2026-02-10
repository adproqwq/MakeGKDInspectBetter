import type { Tabs, Radio } from 'mdui';
import { encodeURI, decode } from 'js-base64';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

export const generateSelectors = async () => {
  const panel = (document.querySelector('#selectorTabs') as Tabs).value!;

  if (document.querySelector(`mdui-tab-panel[value="${panel}"] > mdui-radio-group`)) return;

  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
  const selectorsGroup = document.createElement('mdui-radio-group');
  selectorsGroup.id = 'selectors';

  let innerHtmlString = '';

  selectors[panel].sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
  });

  selectors[panel].forEach(({ name, description, selector, order }, index) => {
    innerHtmlString += `<mdui-radio
    id="selectorRadio"
    value=${encodeURI(selector)}
    data-index="${String(index)}"
    data-description="${description ?? ''}"
    data-order="${String(order ?? 1)}">
      ${name}
    </mdui-radio>`;
  });

  selectorsGroup.innerHTML = innerHtmlString;
  document.querySelector(`mdui-tab-panel[value="${panel}"]`)!.append(selectorsGroup);

  document.querySelectorAll('#selectorRadio')!.forEach((radio) => {
    radio.addEventListener('click', (e) => {
      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        description: (e.target as Radio).getAttribute('data-description')!,
        selector: decode((e.target as Radio).value),
        order: Number((e.target as Radio).getAttribute('data-order')!),
      };
    });
  });
};

export const search = async () => {
  const target = new URL(window.location.href);

  target.searchParams.set('gkd', encodeURI(window.Hanashiro.currentSelector.selector));

  window.location.href = target.toString();
};

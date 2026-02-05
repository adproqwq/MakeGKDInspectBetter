import { decode, encodeURI } from 'js-base64';
import { TextField, Radio, Tabs, snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

export const generateSelectors = async () => {
  const panel = (document.querySelector('#selectorTabs') as Tabs).value!;

  if (document.querySelector(`mdui-tab-panel[value=${panel}] > mdui-radio-group`)) return;

  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
  const selectorsGroup = document.createElement('mdui-radio-group');
  selectorsGroup.id = 'selectors';

  let innerHtmlString = '';

  selectors[panel].sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
  });

  selectors[panel].forEach(({ name, description, base64, order }, index) => {
    innerHtmlString += `<mdui-radio
    id="selectorRadio"
    value=${base64}
    data-index="${String(index)}"
    data-description="${description ?? ''}"
    data-order="${String(order ?? 1)}">
      ${name}
    </mdui-radio>`;
  });

  selectorsGroup.innerHTML = innerHtmlString;
  document.querySelector(`mdui-tab-panel[value=${panel}]`)!.append(selectorsGroup);

  document.querySelectorAll('#selectorRadio').forEach((radio) => {
    radio.addEventListener('click', (e) => {
      const nameTextField = document.querySelector('#name')! as TextField;
      const descriptionTextField = document.querySelector('#description')! as TextField;
      const selectorTextField = document.querySelector('#selector')! as TextField;
      const orderTextField = document.querySelector('#order')! as TextField;

      nameTextField.value = (e.target as Radio).innerText;
      descriptionTextField.value = (e.target as Radio).getAttribute('data-description')!;
      selectorTextField.value = decode((e.target as Radio).value);
      orderTextField.value = (e.target as Radio).getAttribute('data-order')!;

      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        description: (e.target as Radio).getAttribute('data-description')!,
        base64: (e.target as Radio).value,
        order: Number((e.target as Radio).getAttribute('data-order')!),
      };
    });
  });
};

export const editSelector = async () => {
  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
  const category = (document.querySelector('#selectorTabs') as Tabs).value!;
  const nameTextField = document.querySelector('#name')! as TextField;
  const descriptionTextField = document.querySelector('#description')! as TextField;
  const selectorTextField = document.querySelector('#selector')! as TextField;
  const orderTextField = document.querySelector('#order')! as TextField;

  if (selectorTextField.value) {
    selectors[category][window.Hanashiro.currentSelector.index] = {
      name: nameTextField.value,
      description: descriptionTextField.value,
      base64: encodeURI(selectorTextField.value),
      order: Number(orderTextField.value == '' ? 1 : orderTextField.value),
    };
  } else selectors[category].splice(window.Hanashiro.currentSelector.index, 1);

  await setHanashiroSettings('selectors', selectors);

  snackbar({
    message: '修改成功！',
    placement: 'top',
  });
};

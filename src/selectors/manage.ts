import { decode, encodeURI } from 'js-base64';
import { RadioGroup, TextField, Radio, snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

export const generateSelectors = async () => {
  const selectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;
  const selectorsGroup = document.querySelector('#selectors') as RadioGroup;

  let innerHtmlString = '';

  selectors.sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
  });

  selectors.forEach(({ name, base64, order }, index) => {
    innerHtmlString += `<mdui-radio id="selectorRadio" value=${base64} data-index="${String(index)}" data-order="${String(order ?? 1)}">${name}</mdui-radio>`;
  });

  selectorsGroup.innerHTML = innerHtmlString;

  document.querySelectorAll('#selectorRadio').forEach((radio) => {
    radio.addEventListener('click', (e) => {
      const nameTextField = document.querySelector('#name')! as TextField;
      const selectorTextField = document.querySelector('#selector')! as TextField;
      const orderTextField = document.querySelector('#order')! as TextField;

      nameTextField.value = (e.target as Radio).innerText;
      selectorTextField.value = decode((e.target as Radio).value);
      orderTextField.value = (e.target as Radio).getAttribute('data-order')!;

      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        base64: (e.target as Radio).value,
      };
    });
  });
};

export const editSelector = async () => {
  const selectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;
  const nameTextField = document.querySelector('#name')! as TextField;
  const selectorTextField = document.querySelector('#selector')! as TextField;
  const orderTextField = document.querySelector('#order')! as TextField;

  if (selectorTextField.value) {
    selectors[window.Hanashiro.currentSelector.index] = {
      name: nameTextField.value,
      base64: encodeURI(selectorTextField.value),
      order: Number(orderTextField.value == '' ? 1 : orderTextField.value),
    };
  } else selectors.splice(window.Hanashiro.currentSelector.index, 1);

  await setHanashiroSettings('selectors', selectors);

  snackbar({
    message: '修改成功！',
    placement: 'top',
  });
};

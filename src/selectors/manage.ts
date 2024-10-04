import { decode, encodeURI } from 'js-base64';
import { RadioGroup, TextField, Radio } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

export const generateSelectors = async () => {
  const selectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;
  const selectorsGroup = (document.querySelector('#selectors') as RadioGroup);

  let innerHtmlString = '';

  selectors.forEach(({ name, base64 }, index) => {
    innerHtmlString += `<mdui-radio id="selectorRadio" value=${base64} data-index="${String(index)}">${name}</mdui-radio>`;
  });

  selectorsGroup.innerHTML = innerHtmlString;

  document.querySelectorAll('#selectorRadio').forEach((radio) => {
    radio.addEventListener('click', (e) => {
      const nameTextField = document.querySelector('#name')! as TextField;
      const selectorTextField = document.querySelector('#selector')! as TextField;

      nameTextField.value = (e.target as Radio).innerText;
      selectorTextField.value = decode((e.target as Radio).value);

      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        base64: (e.target as Radio).value,
      };
    });
  });
};

export const editSelector = async () => {
  let selectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;
  const nameTextField = document.querySelector('#name')! as TextField;
  const selectorTextField = document.querySelector('#selector')! as TextField;

  if(selectorTextField.value){
    selectors[window.Hanashiro.currentSelector.index] = {
      name: nameTextField.value,
      base64: encodeURI(selectorTextField.value),
    };
  }
  else selectors.splice(window.Hanashiro.currentSelector.index, 1);

  await setHanashiroSettings('selectors', selectors);
};
import json5 from 'json5';
import { decode, encodeURI } from 'js-base64';
import { RadioGroup, TextField, Radio, type RadioEventMap } from 'mdui';
import { ISelectors } from '../types/selectors';

export const generateSelectors = () => {
  const selectors = json5.parse(window.localStorage.getItem('selectors')!) as ISelectors[];
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

      window.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        base64: (e.target as Radio).value,
      };
    });
  });
};

export const editSelector = () => {
  let selectors = json5.parse(window.localStorage.getItem('selectors')!) as ISelectors[];
  const nameTextField = document.querySelector('#name')! as TextField;
  const selectorTextField = document.querySelector('#selector')! as TextField;

  if(selectorTextField.value){
    selectors[window.currentSelector.index] = {
      name: nameTextField.value,
      base64: encodeURI(selectorTextField.value),
    };
  }
  else selectors.splice(window.currentSelector.index, 1);

  window.localStorage.setItem('selectors', json5.stringify(selectors));
};
import { type TextField, type Tabs, snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

export const updateSelectors = async () => {
  const panel = (document.querySelector('#selectorTabs') as Tabs).value!;

  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;

  return selectors[panel].sort((a, b) => {
    if (a.order > b.order) return -1;
    else if (a.order == b.order) return 0;
    else return 1;
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
      selector: selectorTextField.value,
      order: Number(orderTextField.value == '' ? 1 : orderTextField.value),
    };
  } else selectors[category].splice(window.Hanashiro.currentSelector.index, 1);

  await setHanashiroSettings('selectors', selectors);

  snackbar({
    message: '修改成功！',
    placement: 'top',
  });
};

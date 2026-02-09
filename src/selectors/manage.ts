import { type TextField, type Radio, type Tabs, type Chip, snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { encode, decode } from 'he';
import type { ISelectors } from '../types/selectors';

export const generateSelectorGroups = async () => {
  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;

  Object.keys(selectors).forEach((category) => {
    const selectorGroup = document.createElement('mdui-chip');

    selectorGroup.variant = 'assist';
    selectorGroup.deletable = true;
    selectorGroup.deleteIcon = 'delete_forever';
    selectorGroup.elevated = true;
    selectorGroup.textContent = category;

    selectorGroup.addEventListener('delete', async (e) => {
      const currentSelectors = (await getHanashiroSettings<ISelectors>('selectors'))!;

      delete currentSelectors[(e.target as Chip).textContent];

      await setHanashiroSettings('selectors', currentSelectors);

      snackbar({
        message: `快捷选择器组【${category}】已删除！`,
        placement: 'top',
      });
    });

    document.querySelector('#selectorGroups')!.append(selectorGroup);
  });
};

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

  selectors[panel].forEach(({ name, description, selector, order }, index) => {
    innerHtmlString += `<mdui-radio
    id="selectorRadio"
    value=${encode(selector)}
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
      selectorTextField.value = decode((e.target as Radio).value, { isAttributeValue: true });
      orderTextField.value = (e.target as Radio).getAttribute('data-order')!;

      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        description: (e.target as Radio).getAttribute('data-description')!,
        selector: (e.target as Radio).value,
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

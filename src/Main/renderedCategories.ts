import { RadioGroup } from 'mdui';
import json5 from 'json5';
import { RawCategory } from '@gkd-kit/api';
import { getHanashiroSettings } from '../utils/indexedDB';

export default async () => {
  const categories = (await getHanashiroSettings<RawCategory[]>('categories'))!;
  const categoriesGroup = (document.querySelector('#category') as RadioGroup);

  if(categories){
    let innerHtmlString = '';

    categories.forEach((category) => {
      innerHtmlString += `<mdui-radio value=${category.name}>${category.name}</mdui-radio>`;
    });

    categoriesGroup.innerHTML = innerHtmlString;
  }
};
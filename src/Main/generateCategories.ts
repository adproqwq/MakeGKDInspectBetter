import { RadioGroup } from 'mdui';
import json5 from 'json5';
import { RawCategory } from '@gkd-kit/api';

export default () => {
  const categoriesString = window.localStorage.getItem('categories');
  const categoriesGroup = (document.querySelector('#category') as RadioGroup);

  if(categoriesString){
    const categories: RawCategory[] = json5.parse(categoriesString);
    let innerHtmlString = '';

    categories.forEach((category) => {
      innerHtmlString += `<mdui-radio value=${category.name}>${category.name}</mdui-radio>`;
    });

    categoriesGroup.innerHTML = innerHtmlString;
  }
};
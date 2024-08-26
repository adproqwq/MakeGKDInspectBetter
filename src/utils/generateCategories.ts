import { RadioGroup } from 'mdui';
import json5 from 'json5';
import { RawCategory } from '@gkd-kit/api';

export default () => {
  const categoriesString = window.localStorage.getItem('categories');
  const categoriesGroup = (document.querySelector('#category') as RadioGroup);

  if(categoriesString){
    const categories: RawCategory[] = json5.parse(categoriesString);

    categories.forEach((category) => {
      const radio = document.createElement('mdui-radio');
      radio.value = category.name;
      radio.textContent = category.name;
      categoriesGroup.appendChild(radio);
    });
  }
};
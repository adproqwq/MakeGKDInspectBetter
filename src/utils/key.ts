import { RadioGroup, TextField, snackbar } from 'mdui';
import json5 from 'json5';
import { RawApp, IArray, RawAppRule } from '@gkd-kit/api';
import iArrayToArray from './iArrayToArray';

export default () => {
  const mode = (document.querySelector('#mode') as RadioGroup).value;
  const key = (document.querySelector('#key') as TextField).value;
  const origin: RawApp = json5.parse(window.originRule);

  if(key){
    if(mode == 'rules'){
      const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
      rule.key = Number(key);
      origin.groups[0].rules = [rule];
    }
    else origin.groups[0].key = Number(key);

    window.originRule = json5.stringify(origin, null, 2);

    snackbar({
      message: 'key值修改成功！',
      placement: 'top',
    });
  }
};
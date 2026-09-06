import { TextField, snackbar } from 'mdui';
import json5 from 'json5';
import { RawApp, IArray, RawAppRule } from '@gkd-kit/api';
import iArrayToArray from '../utils/iArrayToArray';

export default () => {
  const key = (document.querySelector('#key') as TextField).value;
  const origin: RawApp = json5.parse(window.Hanashiro.originRule);

  if (key) {
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.key = Number(key);
    origin.groups[0].rules = [rule];

    window.Hanashiro.originRule = json5.stringify(origin, null, 2);

    snackbar({
      message: 'key 值修改成功！',
      placement: 'top',
    });
  }
};

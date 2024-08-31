import { snackbar, prompt } from 'mdui';
import json5 from 'json5';
import { receive, send } from '../utils/communicate';
import { ISelectors } from '../types/selectors';

const attrList = [
  'id',
  'vid',
  'text',
  'text.length',
  'desc',
  'desc.length',
  'clickable',
  'focusable',
  'checkable',
  'checked',
  'editable',
  'longClickable',
  'visibleToUser',
  'left',
  'top',
  'right',
  'bottom',
  'width',
  'height',
  'childCount',
  'index',
];

const copyProxy = new Proxy(navigator.clipboard.writeText, {
  apply: async (target, thisArg, args) => {
    const data: string = args[0];

    if(data.startsWith('{') && data.endsWith('}')){
      window.originRule = args[0];

      // 发送复制事件
      send('copyEvent');

      // 等待 modifyEnd
      await new Promise((resolve) => {
        receive('modifyEnd', async () => {
          await Reflect.apply(target, thisArg, [window.returnResult]);
          snackbar({
            message: '注入修改成功',
            placement: 'top',
            onClosed: () => resolve(true),
          });
        });
      });
    }
    else if(data.startsWith('name=')){
      if(window.localStorage.getItem('simplyName') == 'true'){
        const fullname = data.split('"')[1];
        const splitedName = fullname.split('.');
        const name = splitedName[splitedName.length - 1];
        await Reflect.apply(target, thisArg, [name]);
      }
      else await Reflect.apply(target, thisArg, [data]);
    }
    else if(attrList.filter((attr) => data.startsWith(`${attr}=`)).length != 0){
      await Reflect.apply(target, thisArg, [`[${data}]`]);
    }
    else if(data.startsWith(window.origin)){
      const selectors = window.localStorage.getItem('selectors');

      if(selectors){
        const copiedUrl = new URL(data);

        if(copiedUrl.searchParams.has('gkd')){
          const selectorBase64 = copiedUrl.searchParams.get('gkd')!;
          const parsedSelectors: ISelectors[] = json5.parse(selectors);

          prompt({
            headline: '备注',
            description: '给该选择器的备注，留空就用默认的了哦~',
            confirmText: '就决定是你了！',
            cancelText: '这个不要保存！',
            closeOnEsc: true,
            closeOnOverlayClick: true,
            onConfirm: (value) => {
              parsedSelectors.push({
                name: value ? value : selectorBase64,
                base64: selectorBase64,
              });

              window.localStorage.setItem('selectors', json5.stringify(parsedSelectors));
            },
          }).catch();
        }
      }

      await Reflect.apply(target, thisArg, [data]);
    }
    else await Reflect.apply(target, thisArg, [data]);
  },
});
navigator.clipboard.writeText = copyProxy;
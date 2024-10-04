import { snackbar, prompt } from 'mdui';
import { attrList } from './attrList';
import { receive, send } from '../utils/communicate';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

const copyProxy = new Proxy(navigator.clipboard.writeText, {
  apply: async (target, thisArg, args) => {
    const data: string = args[0];

    if(data.startsWith('{') && data.endsWith('}')){
      window.Hanashiro.originRule = args[0];

      // 发送复制事件
      send('copyEvent');

      // 等待 modifyEnd
      await new Promise((resolve) => {
        receive('modifyEnd', async () => {
          await Reflect.apply(target, thisArg, [window.Hanashiro.returnResult]);
          snackbar({
            message: '注入修改成功',
            placement: 'top',
            onClosed: () => resolve(true),
          });
        });
      });
    }
    else if(data.startsWith('name=')){
      if(await getHanashiroSettings('simplyName') == true){
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
      const selectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;

      if(selectors.length != 0){
        const copiedUrl = new URL(data);

        if(copiedUrl.searchParams.has('gkd')){
          const selectorBase64 = copiedUrl.searchParams.get('gkd')!;

          prompt({
            headline: '备注',
            description: '给该选择器的备注，留空就用默认的了哦~',
            confirmText: '就决定是你了！',
            cancelText: '这个不要保存！',
            closeOnEsc: true,
            closeOnOverlayClick: true,
            onConfirm: async (value) => {
              selectors.push({
                name: value ? value : selectorBase64,
                base64: selectorBase64,
              });

              await setHanashiroSettings('selectors', selectors);
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
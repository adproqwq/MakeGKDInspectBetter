import { snackbar } from 'mdui';
import { attrList } from './attrList';
import { receive, send, clear } from '../utils/event';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ICount } from '../types/count';

const copyProxy = new Proxy(navigator.clipboard.writeText, {
  apply: async (target, thisArg, args) => {
    const data: string = args[0];

    if (data.startsWith('{') && data.endsWith('}')) {
      window.Hanashiro.originRule = args[0];

      const result = await new Promise<string>((resolve, reject) => {
        try {
          // 注册modifyEnd监听器
          receive(
            'modifyEnd',
            async () => {
              const count = (await getHanashiroSettings<ICount>('count'))!;
              count.rejectRules++;
              await setHanashiroSettings<ICount>('count', count);

              resolve(window.Hanashiro.returnResult);
            },
            true,
          );

          receive('closeWithCancaled', () => clear('modifyEnd'), true);

          // 发送打开复制修改窗口事件
          send('openMain');
        } catch {
          reject();
        }
      });

      if (result) {
        snackbar({
          message: '注入修改成功',
          placement: 'top',
        });

        await Reflect.apply(target, thisArg, [result]);
        send('ruleWriteClipboardDone');
      }

      return;
    } else if (data.startsWith('name=')) {
      if ((await getHanashiroSettings('simplyName')) == true) {
        const fullname = data.split('"')[1];
        const splitedName = fullname.split('.');
        const name = splitedName[splitedName.length - 1];

        return await Reflect.apply(target, thisArg, [name]);
      } else return await Reflect.apply(target, thisArg, [data]);
    } else if (attrList.filter((attr) => data.startsWith(`${attr}=`)).length != 0) {
      return await Reflect.apply(target, thisArg, [`[${data}]`]);
    } else return await Reflect.apply(target, thisArg, [data]);
  },
});
navigator.clipboard.writeText = copyProxy;

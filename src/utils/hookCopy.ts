import { snackbar } from 'mdui';
import { receive, send } from './communicate';

const copyProxy = new Proxy(navigator.clipboard.writeText, {
  apply: async (target, thisArg, args) => {
    if(args[0].startsWith('{') && args[0].endsWith('}')){
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
          });
          resolve(true);
        });
      });
    }
    else if(args[0].startsWith('name=')){
      if(window.localStorage.getItem('simplyName') == 'true'){
        const fullname = args[0].split('"')[1];
        const splitedName = fullname.split('.');
        const name = splitedName[splitedName.length - 1];
        await Reflect.apply(target, thisArg, [name]);
      }
      else await Reflect.apply(target, thisArg, [args[0]]);
    }
    else await Reflect.apply(target, thisArg, [args[0]]);
  },
});
navigator.clipboard.writeText = copyProxy;
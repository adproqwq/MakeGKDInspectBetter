import { dialog, prompt, snackbar } from 'mdui';
import json5 from 'json5';
import { fileOpen } from 'browser-fs-access';
import { ISelectors } from '../types/selectors';
import { setHanashiroSettings } from '../utils/indexedDB';

const setValue = async (selectors: ISelectors[]) => {
  try{
    await setHanashiroSettings('selectors', selectors);
  } catch{
    snackbar({
      message: '应用设置失败',
      placement: 'top',
    });
    return;
  }
};

const getRemoteSelectors = async (url: string) => {
  let remoteSelectors: ISelectors[];
  try{
    remoteSelectors = json5.parse(await (await fetch(url)).text());
  } catch{
    snackbar({
      message: '请求失败！',
      placement: 'top',
    });
    return;
  }

  await setValue(remoteSelectors);

  snackbar({
    message: '设置应用成功！重新打开页面即可看见更改',
    placement: 'top',
  });
};

const getLocalSelectors = async () => {
  const file = await fileOpen({
    description: '选择器清单文件',
    extensions: ['.json5'],
    excludeAcceptAllOption: true,
  });

  const localSelectors = json5.parse<ISelectors[]>(await file.text());

  await setValue(localSelectors);

  snackbar({
    message: '设置应用成功！重新打开页面即可看见更改',
    placement: 'top',
  });
};

export default () => {
  dialog({
    headline: '选择导入方式',
    description: '选择从本地导入或者远程导入',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    actions: [
      {
        text: '本地导入',
        onClick: async () => await getLocalSelectors(),
      },
      {
        text: '远程导入',
        onClick: () => {
          prompt({
            headline: '远程设置文件链接',
            description: '请输入远程设置文件的链接以导入',
            closeOnEsc: true,
            closeOnOverlayClick: true,
            confirmText: '导入',
            cancelText: '取消',
            onConfirm: async (value) => {
              if(!value){
                snackbar({
                  message: '请输入链接！',
                  placement: 'top',
                });

                return new Promise((_, reject) => reject(false));
              }
              else await getRemoteSelectors(value);
            },
          });
        },
      },
    ],
  });
};
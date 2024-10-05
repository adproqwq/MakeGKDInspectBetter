import { dialog, prompt, snackbar } from 'mdui';
import json5 from 'json5';
import { fileOpen } from 'browser-fs-access';
import { ISettings } from '../types/settings';
import { setHanashiroSettings } from '../utils/indexedDB';

const setValue = async (settings: ISettings) => {
  try{
    await setHanashiroSettings('activityIdsSimply', settings.activityIdsSimply);
    await setHanashiroSettings('autoAddSelector', settings.autoAddSelector);
    await setHanashiroSettings('categories', settings.categories);
    await setHanashiroSettings('hideLoadSnackbar', settings.hideLoadSnackbar);
    await setHanashiroSettings('rulesKeySort', settings.rulesKeySort);
    await setHanashiroSettings('simplyName', settings.simplyName);
  } catch{
    snackbar({
      message: '应用设置失败',
      placement: 'top',
    });
    return;
  }
};

const getRemoteSettings = async (url: string) => {
  let remoteSettings: ISettings;
  try{
    remoteSettings = json5.parse(await (await fetch(url)).text());
  } catch{
    snackbar({
      message: '请求失败！',
      placement: 'top',
    });
    return;
  }

  await setValue(remoteSettings);

  snackbar({
    message: '设置应用成功！重新打开页面即可看见更改',
    placement: 'top',
  });
};

const getLocalSettings = async () => {
  const file = await fileOpen({
    description: '设置文件',
    extensions: ['.json5'],
    excludeAcceptAllOption: true,
  });

  const localSettings = json5.parse<ISettings>(await file.text());

  await setValue(localSettings);

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
        onClick: async () => await getLocalSettings(),
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
              else await getRemoteSettings(value);
            },
          });
        },
      },
    ],
  });
};
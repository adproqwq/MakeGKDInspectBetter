import { prompt, snackbar } from 'mdui';
import json5 from 'json5';
import { ISettings } from '../types/settings';
import { setHanashiroSettings } from '../utils/indexedDB';

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

  try{
    await setHanashiroSettings('activityIdsSimply', remoteSettings.activityIdsSimply);
    await setHanashiroSettings('autoAddSelector', remoteSettings.autoAddSelector);
    await setHanashiroSettings('categories', remoteSettings.categories);
    await setHanashiroSettings('hideLoadSnackbar', remoteSettings.hideLoadSnackbar);
    await setHanashiroSettings('simplyName', remoteSettings.simplyName);
  } catch{
    snackbar({
      message: '应用设置失败',
      placement: 'top',
    });
    return;
  }

  snackbar({
    message: '设置应用成功！打开其他页面再打开设置页即可看见更改',
    placement: 'top',
  });
};

export default () => {
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
};
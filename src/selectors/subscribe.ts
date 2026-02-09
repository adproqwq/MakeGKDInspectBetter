import { prompt, snackbar } from 'mdui';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import fetchSubscription from '../utils/fetchSubscription';
import type { ISubscriptionMeta } from '../types/selectors';

export default () => {
  prompt({
    headline: '请输入订阅链接',
    description: '输入订阅的 meta 文件链接。如果只有订阅的选择器部分，推荐使用远程导入方式',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    cancelText: '取消',
    confirmText: '订阅',
    onConfirm: async (value) => {
      try {
        const savedSubscriptions =
          (await getHanashiroSettings<ISubscriptionMeta[]>('subscriptions'))!;
        const meta: ISubscriptionMeta = await (await fetch(value)).json();

        await fetchSubscription(meta);

        if (savedSubscriptions.some((savedSubscription) => savedSubscription.id === meta.id)) {
          savedSubscriptions[
            savedSubscriptions.findIndex((savedSubscription) => savedSubscription.id === meta.id)
          ] = meta;

          snackbar({
            message: '已覆盖原订阅',
            placement: 'top',
          });
        } else savedSubscriptions.push(meta);

        await setHanashiroSettings('subscriptions', savedSubscriptions);
      } catch {
        snackbar({
          message: '订阅失败',
          placement: 'top',
        });
      }
    },
  });
};

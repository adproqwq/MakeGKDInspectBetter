import { saveAs } from 'file-saver';
import { dialog, prompt, snackbar } from 'mdui';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

const defaultExport = async () => {
  const selectors = await getHanashiroSettings<ISelectors>('selectors');

  const selectorsFile = new Blob([JSON.stringify(selectors, undefined, 2)]);
  saveAs(selectorsFile, 'selectors.json');
};

const subscriptionExport = async (id: string) => {
  const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
  const exportedSelectors: ISelectors = {};

  exportedSelectors[id] = selectors['本地'];

  const selectorsFile = new Blob([JSON.stringify(exportedSelectors, undefined, 2)]);
  saveAs(selectorsFile, 'selectors.subscription.json');
};

export default () => {
  dialog({
    headline: '选择导出方式',
    description: '可以选择订阅导出方式，也可以选择默认导出方式。订阅导出将只会导出本地的选择器。',
    closeOnEsc: true,
    closeOnOverlayClick: true,
    queue: 'export',
    actions: [
      {
        text: '默认导出',
        onClick: defaultExport,
      },
      {
        text: '订阅导出',
        onClick: () => {
          prompt({
            headline: '订阅 id',
            description: '请输入订阅 id',
            closeOnEsc: true,
            closeOnOverlayClick: true,
            confirmText: '确定',
            cancelText: '取消',
            onConfirm: async value => {
              if (!value) {
                snackbar({
                  message: '请输入 id！',
                  placement: 'top',
                });

                return new Promise((_, reject) => reject(false));
              } else await subscriptionExport(value);
            },
          });
        },
      },
    ],
  });
};

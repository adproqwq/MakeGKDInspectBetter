import { snackbar, dialog, prompt } from 'mdui';
import { getNodeAttr, editNode, downloadSnapshot } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';
import getCurrentNodeId from './getCurrentNodeId';

// 优化：单个函数处理字符串打码，避免重复逻辑
const maskString = (str: string, reg: RegExp): string => {
  // 直接替换所有匹配项为对应长度的*，无需循环
  return str.replace(reg, (match) => '*'.repeat(match.length));
};

export const replaceNodeInfo = async (reg: RegExp = /./g) => {
  const snapshotId = getSnapshotId();
  const nodeId = getCurrentNodeId() === -1 ? 0 : getCurrentNodeId();

  const text = (await getNodeAttr(snapshotId, nodeId, 'text')) as string | null;
  const desc = (await getNodeAttr(snapshotId, nodeId, 'desc')) as string | null;

  let newText = text;
  let newDesc = desc;

  if (newText) {
    newText = maskString(newText, reg);
  }

  if (newDesc) {
    newDesc = maskString(newDesc, reg);
  }

  await editNode(snapshotId, nodeId, [
    {
      target: 'text',
      value: newText,
    },
    {
      target: 'desc',
      value: newDesc,
    },
  ]);

  snackbar({
    message: '修改成功！你可以选择上传获取导入链接或下载快照分享',
    placement: 'top',
  });
};

export default () => {
  dialog({
    headline: '确认要对该节点打码吗？',
    description:
      '进行打码操作会对导入的快照造成无法恢复的修改，如需恢复，需要删除当前快照重新导入。建议你先下载备份！',
    actions: [
      {
        text: '我再想想',
      },
      {
        text: '下载快照文件并打码',
        onClick: () => {
          return new Promise((resolve, reject) => {
            snackbar({
              message: '开始下载中……下载开始后会自动关闭弹窗',
              placement: 'top',
            });
            downloadSnapshot(getSnapshotId())
              .then(() => {
                resolve();
                prompt({
                  headline: '请输入一个正则表达式',
                  description: '已默认使用 g 修饰符，暂不支持其他修饰符！留空则全部打码。',
                  confirmText: '确认',
                  cancelText: '取消',
                  onConfirm: (value) =>
                    replaceNodeInfo(!value ? undefined : new RegExp(value, 'g')),
                  closeOnEsc: true,
                  closeOnOverlayClick: true,
                });
              })
              .catch(() => {
                snackbar({
                  message: '下载失败',
                  placement: 'top',
                });
                reject();
              });
          });
        },
      },
      {
        text: '直接打码',
        onClick: () => {
          prompt({
            headline: '请输入一个正则表达式',
            description: '已默认使用 g 修饰符，暂不支持其他修饰符！留空则全部打码。',
            confirmText: '确认',
            cancelText: '取消',
            onConfirm: (value) => replaceNodeInfo(!value ? undefined : new RegExp(value, 'g')),
            closeOnEsc: true,
            closeOnOverlayClick: true,
          });
        },
      },
    ],
    closeOnEsc: true,
    closeOnOverlayClick: true,
  });
};

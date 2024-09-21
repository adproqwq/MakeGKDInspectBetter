import { snackbar, dialog } from 'mdui';
import { editNode, downloadSnapshot } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

const replaceNodeInfo = () => {
  const snapshotId = getSnapshotId();
  const nodeId = Number((document.querySelectorAll('tr > td > span')[23] as HTMLSpanElement).textContent);
  editNode(snapshotId, nodeId, [
    {
      target: 'text',
      value: '本节点信息已由 GKD网页审查工具增强 脚本修改',
    },
    {
      target: 'desc',
      value: '本节点信息已由 GKD网页审查工具增强 脚本修改',
    },
  ]).then((result) => {
    if(result) snackbar({
      message: '修改成功！你可以选择上传获取导入链接或下载快照分享',
      placement: 'top',
    });
  });
};

export default () => {
  dialog({
    headline: '确认要对该节点打码吗？',
    description: '进行打码操作会对导入的快照造成无法恢复的修改，如需恢复，需要删除当前快照重新导入。建议你先下载备份！',
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
              autoCloseDelay: 1000,
            });
            downloadSnapshot(getSnapshotId())
              .then(() => {
                resolve();
                replaceNodeInfo();
              })
              .catch(() => {
                snackbar({
                  message: '下载失败',
                  placement: 'top',
                  autoCloseDelay: 1000,
                });
                reject();
              });
          });
        },
      },
      {
        text: '直接打码',
        onClick: () => replaceNodeInfo(),
      },
    ],
    closeOnEsc: true,
    closeOnOverlayClick: true,
  });
};
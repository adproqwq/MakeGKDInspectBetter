import { snackbar } from 'mdui';
import { editNode } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

export default () => {
  const snapshotId = getSnapshotId();
  const nodeId = Number((document.querySelectorAll('tr > td > span')[23] as HTMLSpanElement).textContent);
  editNode(snapshotId, nodeId, {
    target: 'text',
    value: '本节点信息已由 GKD网页审查工具增强 脚本修改',
  }).then((result) => {
    if(result){
      editNode(snapshotId, nodeId, {
        target: 'desc',
        value: '本节点信息已由 GKD网页审查工具增强 脚本修改',
      }).then((result) => {
        if(result) snackbar({
          message: '修改成功！你可以选择上传获取导入链接或下载快照分享',
          placement: 'top',
        });
        else snackbar({
          message: '节点desc修改失败',
          placement: 'top',
        });
      });
    }
    else snackbar({
      message: '节点text修改失败',
      placement: 'top',
    });
  });
};
import { snackbar } from 'mdui';
import { send } from '../utils/communicate';
import observeElement from '../utils/observeElement';
import { editNode } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

observeElement('.n-radio-group > div', () => {
  const radioGroup = document.querySelector('.n-radio-group > div')!;

  // 搜索选择器按钮
  const UseSelectorIcon = document.createElement('mdui-button-icon');
  UseSelectorIcon.icon = 'search';
  UseSelectorIcon.onclick = () => {
    send('openUseSelector');
  };

  // 添加选择器按钮
  const AddSelectorIcon = document.createElement('mdui-button-icon');
  AddSelectorIcon.icon = 'add';
  AddSelectorIcon.onclick = () => {
    send('openAddSelector');
  };

  // 管理选择器按钮
  const ManageSelectorsIcon = document.createElement('mdui-button-icon');
  ManageSelectorsIcon.icon = 'edit';
  ManageSelectorsIcon.onclick = () => {
    send('openManageSelectors');
  };

  // 设置按钮
  const SettingsIcon = document.createElement('mdui-button-icon');
  SettingsIcon.icon = 'settings';
  SettingsIcon.onclick = () => {
    send('openSettings');
  };

  radioGroup.append(UseSelectorIcon, AddSelectorIcon, ManageSelectorsIcon, SettingsIcon);
});

observeElement('.z-1.box-shadow-dim.bg-white', () => {
  const app = document.querySelector('#app')!;

  // 搜索选择器按钮
  const editNodeIcon = document.createElement('mdui-fab');
  editNodeIcon.icon = 'edit';
  editNodeIcon.variant = 'secondary';
  editNodeIcon.extended = true;
  editNodeIcon.textContent = '替换当前节点信息';
  editNodeIcon.style.right = '16px';
  editNodeIcon.style.bottom = '120px';
  editNodeIcon.setAttribute('fixed', '');
  editNodeIcon.onclick = () => {
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

  app.append(editNodeIcon);
});
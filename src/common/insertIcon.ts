import { send } from '../utils/communicate';
import observeElement from '../utils/observeElement';
import replaceNodeInfo from '../utils/replaceNodeInfo';

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
  editNodeIcon.onclick = replaceNodeInfo;

  app.append(editNodeIcon);
});
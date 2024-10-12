import { send } from '../utils/communicate';
import observeElement from '../utils/observeElement';
import replaceNodeInfo from '../utils/replaceNodeInfo';

observeElement('.n-input-group', () => {
  if(!document.querySelector('#iconBar')){
    const inputGroup = document.querySelector('.n-input-group')!;
    const iconBar = document.createElement('div');
    iconBar.id = 'iconBar';

    // 搜索选择器按钮
    const UseSelectorIcon = document.createElement('mdui-button-icon');
    UseSelectorIcon.icon = 'search';
    UseSelectorIcon.style.height = '36px';
    UseSelectorIcon.style.width = '36px';
    UseSelectorIcon.onclick = () => {
      send('openUseSelector');
    };

    // 添加选择器按钮
    const AddSelectorIcon = document.createElement('mdui-button-icon');
    AddSelectorIcon.icon = 'add';
    AddSelectorIcon.style.height = '36px';
    AddSelectorIcon.style.width = '36px';
    AddSelectorIcon.onclick = () => {
      send('openAddSelector');
    };

    // 管理选择器按钮
    const ManageSelectorsIcon = document.createElement('mdui-button-icon');
    ManageSelectorsIcon.icon = 'edit';
    ManageSelectorsIcon.style.height = '36px';
    ManageSelectorsIcon.style.width = '36px';
    ManageSelectorsIcon.onclick = () => {
      send('openManageSelectors');
    };

    // 设置按钮
    const SettingsIcon = document.createElement('mdui-button-icon');
    SettingsIcon.icon = 'settings';
    SettingsIcon.style.height = '36px';
    SettingsIcon.style.width = '36px';
    SettingsIcon.onclick = () => {
      send('openSettings');
    };

    // 帮助按钮
    const HelpIcon = document.createElement('mdui-button-icon');
    HelpIcon.icon = 'help';
    HelpIcon.style.height = '36px';
    HelpIcon.style.width = '36px';
    HelpIcon.onclick = () => {
      send('openHelp');
    };

    iconBar.append(UseSelectorIcon, AddSelectorIcon, ManageSelectorsIcon, SettingsIcon, HelpIcon);
    inputGroup.insertAdjacentElement('beforebegin', iconBar);
  }
}, true);

observeElement('.z-1.box-shadow-dim.bg-white', () => {
  const app = document.querySelector('#app')!;

  // 节点打码按钮
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
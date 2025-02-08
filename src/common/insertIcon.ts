import { send } from '../utils/event';
import observeElement from '../utils/observeElement';
import { createBarIcon } from '../utils/createIcon';
import replaceNodeInfo from '../utils/replaceNodeInfo';

observeElement(
  '.n-input-group',
  () => {
    if (!document.querySelector('#iconBar')) {
      const inputGroup = document.querySelector('.n-input-group')!;
      const iconBar = document.createElement('div');
      iconBar.id = 'iconBar';

      // 搜索选择器按钮
      const UseSelectorIcon = createBarIcon('search', '搜索选择器', () => {
        send('openUseSelector');
      });

      // 添加选择器按钮
      const AddSelectorIcon = createBarIcon('add', '添加选择器', () => {
        send('openAddSelector');
      });

      // 管理选择器按钮
      const ManageSelectorsIcon = createBarIcon('edit', '管理选择器', () => {
        send('openManageSelectors');
      });

      // 更换截图按钮
      const ChangeScreenshotIcon = createBarIcon('photo', '更换截图', () => {
        send('openChangeScreenshot');
      });

      // 设置按钮
      const SettingsIcon = createBarIcon('settings', '脚本设置', () => {
        send('openSettings');
      });

      // 帮助按钮
      const HelpIcon = createBarIcon('help', '帮助', () => {
        send('openHelp');
      });

      // 捐赠按钮
      const SponsorIcon = createBarIcon('coffee', '捐赠', () => {
        window.open('https://afdian.com/a/Adpro');
      });

      iconBar.append(
        UseSelectorIcon,
        AddSelectorIcon,
        ManageSelectorsIcon,
        ChangeScreenshotIcon,
        SettingsIcon,
        HelpIcon,
        SponsorIcon,
      );
      inputGroup.insertAdjacentElement('beforebegin', iconBar);
    }
  },
  true,
);

observeElement('#app', () => {
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

  // 生成坐标按钮
  const positionIcon = document.createElement('mdui-fab');
  positionIcon.icon = 'open_with';
  positionIcon.variant = 'secondary';
  positionIcon.extended = true;
  positionIcon.textContent = '生成坐标';
  positionIcon.style.right = '16px';
  positionIcon.style.bottom = '60px';
  positionIcon.setAttribute('fixed', '');
  positionIcon.onclick = () => send('openGeneratePosition');

  app.append(editNodeIcon, positionIcon);
});

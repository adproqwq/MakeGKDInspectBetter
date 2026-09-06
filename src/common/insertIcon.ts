import { send } from '../utils/event';
import observeElement from '../utils/observeElement';
import { createBarIcon } from '../utils/createIcon';
import replaceNodeInfo, {
  replaceNodeInfo as directReplaceNodeInfo,
} from '../utils/replaceNodeInfo';
import { getHanashiroSettings } from '../utils/indexedDB';

observeElement(
  '.GkDraggableCard > .app-panel > .selector-syntax-field',
  () => {
    if (!document.querySelector('#iconBar')) {
      const selectorSyntaxField = document.querySelector('.GkDraggableCard > .app-panel > .selector-syntax-field')!;
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

      // 统计按钮
      const CountIcon = createBarIcon('bar_chart', '统计', () => {
        send('openCount');
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
        CountIcon,
        HelpIcon,
        SponsorIcon,
      );
      selectorSyntaxField.insertAdjacentElement('beforebegin', iconBar);
    }
  },
  true,
);

observeElement('#iconBar', async () => {
  // 节点打码按钮
  const editNodeIcon = document.createElement('mdui-fab');
  editNodeIcon.icon = 'edit';
  editNodeIcon.variant = 'secondary';
  editNodeIcon.extended = true;
  editNodeIcon.textContent = '替换当前节点信息';
  editNodeIcon.style.right = '16px';
  editNodeIcon.style.bottom = '180px';
  editNodeIcon.setAttribute('fixed', '');
  editNodeIcon.onclick = (await getHanashiroSettings<boolean>('quickReplaceNodeInfo'))
    ? async () => await directReplaceNodeInfo()
    : replaceNodeInfo;

  // 生成坐标按钮
  const positionIcon = document.createElement('mdui-fab');
  positionIcon.icon = 'open_with';
  positionIcon.variant = 'secondary';
  positionIcon.extended = true;
  positionIcon.textContent = '生成坐标';
  positionIcon.style.right = '16px';
  positionIcon.style.bottom = '120px';
  positionIcon.setAttribute('fixed', '');
  positionIcon.onclick = () => send('openGeneratePosition');

  // 在 Vscode 中打开按钮
  const openVscodeIcon = document.createElement('mdui-fab');
  openVscodeIcon.icon = 'open_in_new';
  openVscodeIcon.variant = 'secondary';
  openVscodeIcon.extended = true;
  openVscodeIcon.textContent = '在 VSCode 中打开';
  openVscodeIcon.style.right = '16px';
  openVscodeIcon.style.bottom = '60px';
  openVscodeIcon.setAttribute('fixed', '');
  openVscodeIcon.onclick = () => send('openVscode');

  document
    .querySelectorAll('div[data-v-app=""]')
    .item(1)
    .firstElementChild!.append(editNodeIcon, positionIcon, openVscodeIcon);
});

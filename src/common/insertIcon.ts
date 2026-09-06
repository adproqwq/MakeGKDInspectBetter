import { send } from '../utils/event';
import observeElement from '../utils/observeElement';
import { createBarIcon } from '../utils/createIcon';

observeElement(
  '.GkDraggableCard > .app-panel > .selector-syntax-field',
  () => {
    if (!document.querySelector('#iconBar')) {
      const selectorSyntaxField = document.querySelector(
        '.GkDraggableCard > .app-panel > .selector-syntax-field',
      )!;
      const iconBar = document.createElement('div');
      iconBar.id = 'iconBar';

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
  // 在 Vscode 中打开按钮
  const openVscodeIcon = document.createElement('mdui-fab');
  openVscodeIcon.icon = 'open_in_new';
  openVscodeIcon.variant = 'secondary';
  openVscodeIcon.extended = true;
  openVscodeIcon.textContent = '在 VSCode 中打开';
  openVscodeIcon.style.right = '16px';
  openVscodeIcon.style.bottom = '180px';
  openVscodeIcon.setAttribute('fixed', '');
  openVscodeIcon.onclick = () => send('openVscode');

  document.querySelectorAll('div[data-v-app=""]').item(1).firstElementChild!.append(openVscodeIcon);
});

import { snackbar } from 'mdui';
import observeElement from '../utils/observeElement';
import { send } from '../utils/communicate';

observeElement('.n-button.n-button--default-type.n-button--medium-type', () => {
  const settingsButton = document.querySelectorAll('.n-button.n-button--default-type.n-button--medium-type')[1] as HTMLButtonElement;

  settingsButton.onclick = () => {
    snackbar({
      message: '网页审查工具未实现该功能，脚本粗略替代实现。未来官方实现可能与目前不同，请勿过度依赖。',
      placement: 'top',
    });
    send('openInspectSettings');
  };
});
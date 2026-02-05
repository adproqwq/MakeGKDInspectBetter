import { snackbar } from 'mdui';
import { getHanashiroSettings } from '../utils/indexedDB';

if (
  (await getHanashiroSettings<boolean>('readClipboard')) &&
  document.location.href == `${document.location.origin}/`
) {
  try {
    navigator.clipboard.readText().then((firstClipboardText) => {
      if (firstClipboardText.endsWith('.zip')) {
        const dataTransfer = new DataTransfer();
        dataTransfer.setData('text', firstClipboardText);
        document.body.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dataTransfer }));
      }
    });
  } catch {
    snackbar({
      message: '未授予剪贴板权限！',
      placement: 'top',
    });
  }
}

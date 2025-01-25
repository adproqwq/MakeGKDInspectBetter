import { type TextField, snackbar } from 'mdui';
import { getAutoAction, setAutoAction } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';
import type { AutoActionTerms } from '../types/autoAction';

export const showAutoAction = async () => {
  const autoAction = await getAutoAction(getSnapshotId());

  (document.querySelector('#autoSearchSelector') as TextField).value = autoAction.autoSearchSelector;
};

export const manage = async () => {
  const autoAction: AutoActionTerms = {
    autoSearchSelector: '',
  };

  const autoSearchSelector = (document.querySelector('#autoSearchSelector') as TextField).value;

  if(autoSearchSelector) autoAction.autoSearchSelector = autoSearchSelector.replaceAll('"', '\"');

  await setAutoAction(getSnapshotId(), autoAction);

  snackbar({
    message: '修改成功！如果已经上传到Github，需要重新获取快照链接！',
    placement: 'top',
  });
};
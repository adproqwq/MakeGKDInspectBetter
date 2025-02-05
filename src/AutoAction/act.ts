import { encodeURI } from 'js-base64';
import getSnapshotId from '../utils/getSnapshotId';
import { getAutoAction } from '../utils/indexedDB';

const intervalId = setInterval(async () => {
  if(window.location.href.includes('sanpshot')){
    const autoAction = await getAutoAction(getSnapshotId());

    if (autoAction.autoSearchSelector) {
      const url = new URL(window.location.href);

      if (!url.searchParams.get('gkd')) {
        const selectorBase64 = encodeURI(
          autoAction.autoSearchSelector.replaceAll('\"', '"'),
        );

        url.searchParams.set('gkd', selectorBase64);

        window.location.href = url.toString();
      }
    }

    clearInterval(intervalId);
  }
}, 100);

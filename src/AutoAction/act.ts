import { encodeURI } from 'js-base64';
import getSnapshotId from '../utils/getSnapshotId';
import { getAutoAction } from '../utils/indexedDB';

const autoAction = await getAutoAction(getSnapshotId());

if(autoAction.autoSearchSelector){
  const url = new URL(window.location.href);

  if(!url.searchParams.get('gkd')){
    // eslint-disable-next-line no-useless-escape
    const selectorBase64 = encodeURI(autoAction.autoSearchSelector.replaceAll('\"', '"'));

    url.searchParams.set('gkd', selectorBase64);

    window.location.href = url.toString();
  }
}
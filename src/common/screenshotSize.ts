import observeElement from '../utils/observeElement';
import { getScreenshot } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else return `${(bytes / 1048576).toFixed(2)} MB`;
};

observeElement('.DraggableCard > * > .n-input-group', async () => {
  const origin = document.querySelector('img + div + div') as HTMLDivElement;
  const layer = origin.lastElementChild!.cloneNode() as HTMLDivElement;

  layer.title = '体积';
  layer.textContent = formatSize((await getScreenshot(await getSnapshotId())).byteLength);

  origin.append(layer);
});

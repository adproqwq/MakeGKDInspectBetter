import localforage from 'localforage';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Snapshot, PrimitiveType } from '../types/snapshot';
import { AttrList } from '../common/attrList';

interface EditNodeOption {
  target: AttrList;
  value: PrimitiveType;
};

const snapshotStorage = localforage.createInstance({
  name: 'snapshot',
  version: 1,
});
const screenshotStorage = localforage.createInstance({
  name: 'screenshot',
  version: 1,
});

export const simplyActivityIds = async (snapshotId: string): Promise<string | false> => {
  const snapshotInfo = await snapshotStorage.getItem<Snapshot>(snapshotId);

  if(snapshotInfo?.activityId.startsWith(snapshotInfo.appId)){
    const simplyActivityIds = snapshotInfo.activityId.replace(snapshotInfo.appId, '');

    return simplyActivityIds;
  }
  else return false;
};

export const editNode = async (snapshotId: string, nodeId: number, options: EditNodeOption[]): Promise<boolean> => {
  try{
    const snapshotInfo = await snapshotStorage.getItem<Snapshot>(snapshotId);

    const nodes = snapshotInfo!.nodes;
    const nodeAttr = nodes[nodeId].attr;

    options.forEach((option) => (nodeAttr[option.target] as PrimitiveType) = option.value);

    nodes[nodeId].attr = nodeAttr;
    snapshotInfo!.nodes = nodes;

    await snapshotStorage.setItem(snapshotId, snapshotInfo);

    return true;
  } catch{
    return false;
  }
};

export const downloadSnapshot = async (snapshotId: string) => {
  const snapshotInfo = await snapshotStorage.getItem<Snapshot>(snapshotId);
  const screenshot = await screenshotStorage.getItem<ArrayBuffer>(snapshotId);

  const jszip = new JSZip();
  jszip.file(`snapshot-${snapshotId}.json`, JSON.stringify(snapshotInfo, undefined, 2));
  jszip.file(`screenshot-${snapshotId}.png`, screenshot);
  jszip.generateAsync({ type: 'blob' }).then((snapshotFile) => {
    saveAs(snapshotFile, `snapshot-${snapshotId}.zip`);
  });
};
import localforage from 'localforage';
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
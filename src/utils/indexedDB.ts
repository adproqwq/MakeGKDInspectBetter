import localforage from 'localforage';
import { Snapshot } from '../types/snapshot';

const shallowSnapshotStorage = localforage.createInstance({
  name: 'shallowSnapshot',
  version: 1,
});

export const simplyActivityIds = async (snapshotId: string): Promise<string | false> => {
  const snapshotInfo = await shallowSnapshotStorage.getItem<Snapshot>(snapshotId);

  if(snapshotInfo?.activityId.startsWith(snapshotInfo.appId)){
    const simplyActivityIds = snapshotInfo.activityId.replace(snapshotInfo.appId, '');

    return simplyActivityIds;
  }
  else return false;
};
import type { RawAppGroup, RawAppRule } from '@gkd-kit/api';
import { getHanashiroSettings } from './indexedDB';

type GroupsKeyOrder = [
  'key',
  'name',
  'desc',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'rules',
];

export type RulesKeyOrder = [
  'key',
  'preKeys',
  'fastQuery',
  'quickFind',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'action',
  'activityIds',
  'position',
  'matches',
  'exampleUrls',
  'snapshotUrls',
];

export const groupsKeyOrder: GroupsKeyOrder = [
  'key',
  'name',
  'desc',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'rules',
];

export default async (groups: RawAppGroup): Promise<RawAppGroup> => {
  const rulesKeyOrder = (await getHanashiroSettings<RulesKeyOrder>('rulesKeySort'))!;

  const groupsKeyValue: any[] = [];
  const rulesKeyValue: any[] = [];

  groupsKeyOrder.forEach((groupsKey) => {
    if(groups[groupsKey] !== undefined) groupsKeyValue.push(groups[groupsKey]);
    else groupsKeyValue.push(undefined);
  });
  rulesKeyOrder.forEach((rulesKey) => {
    if((groups.rules as RawAppRule[])[0][rulesKey] !== undefined) rulesKeyValue.push((groups.rules as RawAppRule[])[0][rulesKey]);
    else rulesKeyValue.push(undefined);
  });

  const sortedRules: RawAppRule = {};
  rulesKeyOrder.forEach((rulesKey, index) => {
    sortedRules[rulesKey] = rulesKeyValue[index];
  });
  const sortedGroups: RawAppGroup = {
    key: groupsKeyValue[0],
    name: groupsKeyValue[1],
    desc: groupsKeyValue[2],
    matchTime: groupsKeyValue[3],
    actionMaximum: groupsKeyValue[4],
    resetMatch: groupsKeyValue[5],
    rules: [sortedRules],
  };

  return sortedGroups;
};
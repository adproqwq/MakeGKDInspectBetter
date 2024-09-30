import type { RawAppGroup, RawAppRule } from '@gkd-kit/api';

type GroupsKeyOrder = [
  'key',
  'name',
  'desc',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'rules',
];

type RulesKeyOrder = [
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

const groupsKeyOrder: GroupsKeyOrder = [
  'key',
  'name',
  'desc',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'rules',
];

const rulesKeyOrder: RulesKeyOrder = [
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

export default (groups: RawAppGroup): RawAppGroup => {
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
  const sortedRules: RawAppRule = {
    key: rulesKeyValue[0],
    preKeys: rulesKeyValue[1],
    fastQuery: rulesKeyValue[2],
    quickFind: rulesKeyValue[3],
    matchTime: rulesKeyValue[4],
    actionMaximum: rulesKeyValue[5],
    resetMatch: rulesKeyValue[6],
    action: rulesKeyValue[7],
    activityIds: rulesKeyValue[8],
    position: rulesKeyValue[9],
    matches: rulesKeyValue[10],
    exampleUrls: rulesKeyValue[11],
    snapshotUrls: rulesKeyValue[12],
  };
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
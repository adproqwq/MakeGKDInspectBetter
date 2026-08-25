import type { RawAppGroup, RawAppRule } from '@gkd-kit/api';
import { getHanashiroSettings } from './indexedDB';

type GroupsKeyOrder = [
  'key',
  'name',
  'desc',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'priorityTime',
  'matchRoot',
  'rules',
];

export type RulesKeyOrder = [
  'key',
  'preKeys',
  'fastQuery',
  'matchTime',
  'actionMaximum',
  'resetMatch',
  'priorityTime',
  'matchRoot',
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
  'priorityTime',
  'matchRoot',
  'rules',
];

const orderFields = <T extends object>(source: T, keys: readonly (keyof T)[]): T =>
  Object.fromEntries(keys.map((key) => [key, source[key]])) as T;

export default async (group: RawAppGroup): Promise<RawAppGroup> => {
  const rulesKeyOrder = (await getHanashiroSettings<RulesKeyOrder>('rulesKeySort'))!;
  const [rule] = group.rules as RawAppRule[];

  return {
    ...orderFields(group, groupsKeyOrder),
    rules: [orderFields(rule, rulesKeyOrder)],
  };
};

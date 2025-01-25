import { RadioGroup, Switch, TextField, snackbar } from 'mdui';
import { RawApp, Position, IArray, RawAppRule } from '@gkd-kit/api';
import json5 from 'json5';
import { constructPositionArray } from './position';
import iArrayToArray from '../utils/iArrayToArray';
import { send } from '../utils/event';
import sort from '../utils/sort';
import { simplyActivityIds, getHanashiroSettings } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

const checkPositionLegality = (position: Position): boolean => {
  const { top, left, right, bottom } = position;

  if (top) {
    if (bottom || (!left && !right)) {
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if (left) {
    if (right || (!top && !bottom)) {
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if (right) {
    if (left || (!top && !bottom)) {
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if (bottom) {
    if (top || (!left && !right)) {
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }

  return true;
};

export default async () => {
  const copyDepth = (document.querySelector('#copyDepth') as RadioGroup).value;
  const action = (document.querySelector('#action') as RadioGroup).value as
    | 'clickCenter'
    | 'back'
    | 'longClick'
    | undefined;
  const ruleName = (document.querySelector('#ruleName') as TextField).value;
  const ruleDesc = (document.querySelector('#ruleDesc') as TextField).value;
  const category = window.Hanashiro.currentCategory;
  const isLimit = (document.querySelector('#limit') as Switch).checked;
  const isNoExample = (document.querySelector('#noExample') as Switch).checked;
  const preKeys = (document.querySelector('#preKeys') as TextField).value;
  const position =
    constructPositionArray().length != 0 ? constructPositionArray() : false;
  const isSimplyActivityIds = await getHanashiroSettings('activityIdsSimply');
  const origin: RawApp = json5.parse(window.Hanashiro.originRule);

  if (ruleName) origin.groups[0].name = ruleName;
  else origin.groups[0].name = '';

  if (ruleDesc) origin.groups[0].desc = ruleDesc;
  else delete origin.groups[0].desc;

  if (category) {
    if (!ruleName) origin.groups[0].name = category;
    else origin.groups[0].name = `${category}-${origin.groups[0].name}`;

    if (category == '开屏广告') {
      origin.groups[0].priorityTime = 10000;
      const rule = iArrayToArray(
        origin.groups[0].rules as IArray<RawAppRule>,
      )[0];
      delete rule.activityIds;
      origin.groups[0].rules = [rule];
    }
  }

  if (action) {
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.action = action;
    origin.groups[0].rules = [rule];
  }

  if (isLimit) {
    if (copyDepth == 'rules') {
      const rule = iArrayToArray(
        origin.groups[0].rules as IArray<RawAppRule>,
      )[0];
      rule.actionMaximum = 1;
      rule.resetMatch = 'app';
      rule.matchTime = 10000;
      origin.groups[0].rules = [rule];
    } else {
      origin.groups[0].actionMaximum = 1;
      origin.groups[0].resetMatch = 'app';
      origin.groups[0].matchTime = 10000;
    }
  }

  if (isNoExample) {
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    delete rule.exampleUrls;
    origin.groups[0].rules = [rule];
  }

  if (preKeys) {
    const preKeysArray = preKeys.split(',');
    const preKeysNumberArray: number[] = [];

    preKeysArray.forEach((preKey) => {
      preKeysNumberArray.push(Number(preKey));
    });

    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.preKeys = preKeysNumberArray;
    origin.groups[0].rules = [rule];
  }

  if (position) {
    const positionName: ['top', 'left', 'right', 'bottom'] = [
      'top',
      'left',
      'right',
      'bottom',
    ];
    const positionObject: Position = {};

    position.forEach((position, index) => {
      if (position) {
        positionObject[positionName[index]] = position;
      }
    });

    if (!checkPositionLegality(positionObject)) return;

    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.position = positionObject;
    origin.groups[0].rules = [rule];
  }

  if (isSimplyActivityIds === true) {
    const snapshotId = getSnapshotId();
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];

    const result = await simplyActivityIds(snapshotId);

    if (result && rule.activityIds) {
      rule.activityIds = result;
      origin.groups[0].rules = [rule];
    }
  }

  origin.groups[0] = await sort(origin.groups[0]);

  const stringify = json5.stringify(origin, null, 2);
  if (copyDepth == 'ts') {
    const text = `import { defineGkdApp } from '@gkd-kit/define';\r\rexport default defineGkdApp(${stringify});\r`;
    window.Hanashiro.returnResult = text;
  } else if (copyDepth == 'app') window.Hanashiro.returnResult = stringify;
  else if (copyDepth == 'groups')
    window.Hanashiro.returnResult = json5.stringify(origin.groups[0], null, 2);
  else if (copyDepth == 'rules')
    window.Hanashiro.returnResult = json5.stringify(
      iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0],
      null,
      2,
    );

  send('closePage');
  send('modifyEnd');
};

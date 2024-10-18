import { RadioGroup, Switch, TextField, snackbar } from 'mdui';
import { RawApp, Position, IArray, RawAppRule } from '@gkd-kit/api';
import json5 from 'json5';
import iArrayToArray from '../utils/iArrayToArray';
import { send } from '../utils/communicate';
import sort from '../utils/sort';
import { simplyActivityIds, getHanashiroSettings } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

const checkPositionLegal = (position: Position): boolean => {
  const { top, left, right, bottom } = position;

  if(top){
    if(bottom || (!left && !right)){
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if(left){
    if(right || (!top && !bottom)){
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if(right){
    if(left || (!top && !bottom)){
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return false;
    }
  }
  if(bottom){
    if(top || (!left && !right)){
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
  const mode = (document.querySelector('#mode') as RadioGroup).value;
  const action = (document.querySelector('#action') as RadioGroup).value as 'clickCenter' | 'back' | undefined;
  const ruleName = (document.querySelector('#ruleName') as TextField).value;
  const ruleDesc = (document.querySelector('#ruleDesc') as TextField).value;
  const category = window.Hanashiro.currentCategory;
  const isPriority = (document.querySelector('#priority') as Switch).checked;
  const isLimit = (document.querySelector('#limit') as Switch).checked;
  const isNoExample = (document.querySelector('#noExample') as Switch).checked;
  const isUseFastQuery = (document.querySelector('#fastQuery') as Switch).checked;
  const preKeys = (document.querySelector('#preKeys') as TextField).value;
  const position = (document.querySelector('#position') as TextField).value;
  const isSimplyActivityIds = await getHanashiroSettings('activityIdsSimply');
  const origin: RawApp = json5.parse(window.Hanashiro.originRule);

  if(ruleName) origin.groups[0].name = ruleName;
  else origin.groups[0].name = '';

  if(ruleDesc) origin.groups[0].desc = ruleDesc;
  else delete origin.groups[0].desc;

  if(category){
    if(!ruleName) origin.groups[0].name = category;
    else origin.groups[0].name = `${category}-${origin.groups[0].name}`;

    if(category == '开屏广告'){
      const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
      delete rule.activityIds;
      origin.groups[0].rules = [rule];
    }
  }

  if(action){
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.action = action;
    origin.groups[0].rules = [rule];
  }

  if(isLimit){
    if(mode == 'rules'){
      const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
      rule.actionMaximum = 1;
      rule.resetMatch = 'app';
      rule.matchTime = 10000;
      origin.groups[0].rules = [rule];
    }
    else{
      origin.groups[0].actionMaximum = 1;
      origin.groups[0].resetMatch = 'app';
      origin.groups[0].matchTime = 10000;
    }
  }

  if(isPriority){
    if(mode == 'rules'){
      const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
      rule.priorityTime = 10000;
      origin.groups[0].rules = [rule];
    }
    else origin.groups[0].priorityTime = 10000;
  }

  if(isNoExample){
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    delete rule.exampleUrls;
    origin.groups[0].rules = [rule];
  }

  if(isUseFastQuery){
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    if(rule.quickFind){
      delete rule.quickFind;
      rule.fastQuery = true;
    }
    origin.groups[0].rules = [rule];
  }

  if(preKeys){
    const preKeysArray = preKeys.split(',');
    const preKeysNumberArray: number[] = [];

    preKeysArray.forEach((preKey) => {
      preKeysNumberArray.push(Number(preKey));
    });

    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    rule.preKeys = preKeysNumberArray;
    origin.groups[0].rules = [rule];
  }

  if(position){
    if(position.startsWith('[') && position.endsWith(']')){
      const purePosition = position.slice(1, position.length - 1);
      const positionArray = purePosition.split(',');
      const positionName: ['top', 'left', 'right', 'bottom'] = ['top', 'left', 'right', 'bottom'];
      const positionObject: Position = {};

      positionArray.forEach((position, index) => {
        if(position){
          positionObject[positionName[index]] = position;
        }
      });

      if(!checkPositionLegal(positionObject)){
        snackbar({
          message: '非法坐标',
          placement: 'top',
        });
        return;
      }

      const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
      rule.position = positionObject;
      origin.groups[0].rules = [rule];
    }
    else{
      snackbar({
        message: '非法坐标',
        placement: 'top',
      });
      return;
    }
  }

  if(isSimplyActivityIds === true){
    const snapshotId = getSnapshotId();
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];

    const result = await simplyActivityIds(snapshotId);

    if(result && rule.activityIds){
      rule.activityIds = result;
      origin.groups[0].rules = [rule];
    }
  }

  origin.groups[0] = await sort(origin.groups[0]);

  const stringify = json5.stringify(origin, null, 2);
  if(mode == 'ts'){
    const text = `import { defineGkdApp } from '@gkd-kit/define';\r\rexport default defineGkdApp(${stringify});\r`;
    window.Hanashiro.returnResult = text;
  }
  else if(mode == 'app') window.Hanashiro.returnResult = stringify;
  else if(mode == 'groups') window.Hanashiro.returnResult = json5.stringify(origin.groups[0], null, 2);
  else if(mode == 'rules') window.Hanashiro.returnResult = json5.stringify(iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0], null, 2);

  send('closePage');
  send('modifyEnd');
};
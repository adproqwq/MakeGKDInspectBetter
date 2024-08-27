import { RadioGroup, Radio, Switch, TextField, Dialog, snackbar } from "mdui";
import { RawApp, Position, IArray, RawAppRule } from "@gkd-kit/api";
import json5 from 'json5';
import iArrayToArray from "./iArrayToArray";
import { send } from "./communicate";

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

export default () => {
  const mode = (document.querySelector('#mode') as RadioGroup).value;
  const ruleName = (document.querySelector('#ruleName') as TextField).value;
  const ruleDesc = (document.querySelector('#ruleDesc') as TextField).value;
  const category = window.currentCategory;
  const isLimit = (document.querySelector('#limit') as Switch).checked;
  const isNoExample = (document.querySelector('#noExample') as Switch).checked;
  const position = (document.querySelector('#position') as TextField).value;
  const origin: RawApp = json5.parse(window.originRule);

  if(ruleName) origin.groups[0].name = ruleName;

  if(ruleDesc) origin.groups[0].desc = ruleDesc;
  else delete origin.groups[0].desc;

  if(category) origin.groups[0].name = `${category}-${origin.groups[0].name}`;

  if(isLimit){
    origin.groups[0].actionMaximum = 1;
    origin.groups[0].resetMatch = 'app';
    origin.groups[0].matchTime = 10000;
  }

  if(isNoExample){
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    delete rule.exampleUrls;
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

  if(category == '开屏广告'){
    const rule = iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0];
    delete rule.activityIds;
    origin.groups[0].rules = [rule];
  }

  const stringify = json5.stringify(origin, null, 2);
  if(mode == 'ts'){
    const text = `import { defineGkdApp } from '@gkd-kit/define';\r\rexport default defineGkdApp(${stringify});\r`;
    window.returnResult = text;
  }
  else if(mode == 'app') window.returnResult = stringify;
  else if(mode == 'groups') window.returnResult = json5.stringify(origin.groups[0], null, 2);
  else if(mode == 'rules') window.returnResult = json5.stringify(iArrayToArray(origin.groups[0].rules as IArray<RawAppRule>)[0], null, 2);

  (document.querySelector('#page') as Dialog).open = false;

  send('modifyEnd');
};
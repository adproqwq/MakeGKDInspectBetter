<script lang="ts">
import { defineComponent } from 'vue';
import json5 from 'json5';
import { RawApp } from '@gkd-kit/api';
import { Dialog, RadioGroup } from 'mdui';
import finish from '../utils/finish';
import key from '../utils/key';
import generateCategories from '../utils/generateCategories';
import { receive } from '../utils/communicate';

export default defineComponent({
  methods: {
    finish(){
      finish();
    },
    key(){
      key();
    },
  },
  data(){
    return {
      originRule: json5.parse(window.originRule) as RawApp,
    };
  },
  mounted(){
    window.currentCategory = '';

    generateCategories();

    (document.querySelector('#category') as RadioGroup).addEventListener('change', (e) => {
      window.currentCategory = (e.target as RadioGroup).value;
    });

    (document.querySelector('#page') as Dialog).open = true;

    receive('MainOpen', () => {
      (document.querySelector('#page') as Dialog).open = true;
    });
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="配置" close-on-overlay-click close-on-esc>
    <div>
      <span>选择模式：</span>
      <mdui-radio-group id="mode" value="app">
        <mdui-radio value="ts">ts模式</mdui-radio>
        <mdui-radio value="app">app模式</mdui-radio>
        <mdui-radio value="groups">groups模式</mdui-radio>
        <mdui-radio value="rules">rules模式</mdui-radio>
      </mdui-radio-group>
    </div>
    <div>
      <span>选择分类：</span>
      <mdui-radio-group id="category"></mdui-radio-group>
    </div>
    <div>
      <span>插入限制字段：</span>
      <mdui-switch id="limit"></mdui-switch>
    </div>
    <div>
      <span>修改key值为：</span>
      <mdui-text-field id="key" variant="filled" type="number" label="key" placeholder="填写一个数字"
        helper="必须在其他修改前修改！rules模式修改ruleKey，其余修改groupKey。记得点勾！">
        <mdui-button-icon slot="end-icon" icon="check" @click="key"></mdui-button-icon>
      </mdui-text-field>
    </div>
    <div>
      <span>坐标：</span>
      <mdui-text-field variant="filled" id="position" label="坐标" placeholder="填入[top,left,right,bottom]的合法坐标，空出无用项"></mdui-text-field>
    </div>
    <div>
      <span>规则组名称：</span>
      <mdui-text-field id="ruleName" variant="filled" label="名称" :placeholder="originRule.groups[0].name"></mdui-text-field>
    </div>
    <div>
      <span>规则组描述：</span>
      <mdui-text-field id="ruleDesc" variant="filled" label="描述" placeholder="没有描述不填"></mdui-text-field>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="finish">确定</mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}
</style>

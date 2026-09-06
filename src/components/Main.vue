<script lang="ts">
import { defineComponent } from 'vue';
import json5 from 'json5';
import type { RawApp, RawCategory } from '@gkd-kit/api';
import { type Button, type Dialog, type RadioGroup, type TextField } from 'mdui';
import finish from '../Main/finish';
import key from '../Main/key';
import { send } from '../utils/event';
import { getHanashiroSettings } from '../utils/indexedDB';

export default defineComponent({
  methods: {
    async finish(event: Event) {
      await finish(event.target as Button);
    },
    key() {
      key();
    },
    currentCategoryChange(event: Event) {
      window.Hanashiro.currentCategory = (event.target as RadioGroup).value;
    },
    closeDialog() {
      send('closePage');
    },
  },
  data() {
    return {
      originRule: <RawApp>json5.parse(window.Hanashiro.originRule),
      copyDepth: 'app',
      categories: [] as RawCategory[],
    };
  },
  async mounted() {
    window.Hanashiro.currentCategory = '';

    this.categories = (await getHanashiroSettings<RawCategory[]>('categories'))!;

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="配置" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <span>选择分类：</span>
      <mdui-radio-group id="category" @change="currentCategoryChange($event)">
        <mdui-radio v-for="category in categories" :value="category.name">
          {{ category.name }}
        </mdui-radio>
      </mdui-radio-group>
    </div>
    <div>
      <span>去除exampleUrls：</span>
      <mdui-switch id="noExample" checked></mdui-switch>
    </div>
    <div>
      <span>修改key值为：</span>
      <mdui-text-field
        id="key"
        variant="filled"
        type="number"
        label="key"
        placeholder="填写一个数字"
        helper="仅支持修改 ruleKey，其余 key 值修改请使用编排规则功能。失焦保存！"
        @change="key"
      >
      </mdui-text-field>
    </div>
    <div>
      <span>规则组名称：</span>
      <mdui-text-field
        id="ruleName"
        variant="filled"
        label="名称"
        :placeholder="originRule.groups[0].name"
      ></mdui-text-field>
    </div>
    <div>
      <span>规则组描述：</span>
      <mdui-text-field
        id="ruleDesc"
        variant="filled"
        label="描述"
        placeholder="没有描述不填"
      ></mdui-text-field>
    </div>
    <div>
      <mdui-button slot="action" id="ok" variant="filled" @click="finish($event)">确定</mdui-button>
      <mdui-button slot="action" id="ok_open" variant="tonal" @click="finish($event)"
        >确定并打开 VSCode</mdui-button
      >
      <mdui-button
        slot="action"
        id="ok_open_append"
        v-if="copyDepth === 'app'"
        variant="tonal"
        @click="finish($event)"
      >
        确定并在 VSCode 中追加规则组
      </mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}

.position {
  width: 15%;
  height: var(--mdui-typescale-title-large-line-height);
}
</style>

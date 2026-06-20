<script lang="ts">
import { defineComponent } from 'vue';
import json5 from 'json5';
import type { RawApp, Position } from '@gkd-kit/api';
import { type Button, type Dialog, type RadioGroup, type TextField, prompt, snackbar } from 'mdui';
import finish from '../Main/finish';
import key from '../Main/key';
import { onChange } from '../Main/position';
import renderedCategories from '../Main/renderedCategories';
import { send } from '../utils/event';
import { PositionZod } from '../types/positionZod';

export default defineComponent({
  methods: {
    async finish(event: Event) {
      await finish(event.target as Button);
    },
    key() {
      key();
    },
    onPositionChange(event: Event) {
      onChange(event.target as TextField);
    },
    readPosition() {
      prompt({
        headline: '坐标快捷填入',
        description: '请输入从生成坐标处获得的坐标',
        closeOnEsc: true,
        closeOnOverlayClick: true,
        validator: (value): boolean => {
          try {
            PositionZod.parse(json5.parse<{ position: Position }>(value).position);
          } catch {
            snackbar({
              message: '格式错误，请检查格式！',
              placement: 'top',
            });
            return false;
          }

          return true;
        },
        textFieldOptions: {
          label: 'position对象',
          placeholder: '请填入{ position }对象',
          rows: 8,
        },
        onConfirm: (value) => {
          const position = json5.parse<{ position: Position }>(value).position;

          if (position.left) {
            (document.querySelector('#left') as TextField).value = String(position.left);
            onChange(document.querySelector('#left') as TextField);
          } else if (position.right) {
            (document.querySelector('#right') as TextField).value = String(position.right);
            onChange(document.querySelector('#right') as TextField);
          }
          if (position.top) {
            (document.querySelector('#top') as TextField).value = String(position.top);
            onChange(document.querySelector('#top') as TextField);
          } else if (position.bottom) {
            (document.querySelector('#bottom') as TextField).value = String(position.bottom);
            onChange(document.querySelector('#bottom') as TextField);
          }
        },
      });
    },
    closeDialog() {
      send('closePage');
    },
  },
  data() {
    return {
      originRule: <RawApp>json5.parse(window.Hanashiro.originRule),
      copyDepth: 'app',
    };
  },
  async mounted() {
    window.Hanashiro.currentCategory = '';

    await renderedCategories();

    (document.querySelector('#category') as RadioGroup).addEventListener('change', (e) => {
      window.Hanashiro.currentCategory = (e.target as RadioGroup).value;
    });

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="配置" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <span>选择复制深度：</span>
      <mdui-radio-group id="copyDepth" value="app" @change="this.copyDepth = $event.target.value">
        <mdui-radio value="ts">ts层</mdui-radio>
        <mdui-radio value="app">app层</mdui-radio>
        <mdui-radio value="groups">groups层</mdui-radio>
        <mdui-radio value="rules">rules层</mdui-radio>
      </mdui-radio-group>
    </div>
    <div>
      <span>选择分类：</span>
      <mdui-radio-group id="category"></mdui-radio-group>
    </div>
    <div>
      <span>插入action类型：</span>
      <mdui-radio-group id="action">
        <mdui-radio value="clickCenter">clickCenter</mdui-radio>
        <mdui-radio value="back">back</mdui-radio>
        <mdui-radio value="longClick">longClick</mdui-radio>
      </mdui-radio-group>
    </div>
    <div>
      <span>插入限制字段：</span>
      <mdui-switch id="limit"></mdui-switch>
      <span class="introduction">插入matchTime、resetMatch和actionMaximum</span>
    </div>
    <div>
      <span>插入matchRoot：</span>
      <mdui-switch id="matchRoot"></mdui-switch>
      <span class="introduction">插入matchRoot</span>
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
        helper="rules模式修改ruleKey，其余修改groupKey。请提前选好模式，失焦保存！"
        @change="key"
      >
      </mdui-text-field>
    </div>
    <div>
      <span>修改preKeys值为：</span>
      <mdui-text-field
        id="preKeys"
        variant="filled"
        label="preKeys"
        placeholder="填写多个以英文逗号分隔的数字"
        helper="失焦保存"
      ></mdui-text-field>
    </div>
    <div>
      <span>坐标：</span>
      <mdui-chip variant="input">左</mdui-chip>
      <mdui-text-field
        variant="filled"
        class="position"
        id="left"
        @change="onPositionChange"
      ></mdui-text-field>
      <mdui-chip variant="input">右</mdui-chip>
      <mdui-text-field
        variant="filled"
        class="position"
        id="right"
        @change="onPositionChange"
      ></mdui-text-field>
      <mdui-chip variant="input">上</mdui-chip>
      <mdui-text-field
        variant="filled"
        class="position"
        id="top"
        @change="onPositionChange"
      ></mdui-text-field>
      <mdui-chip variant="input">下</mdui-chip>
      <mdui-text-field
        variant="filled"
        class="position"
        id="bottom"
        @change="onPositionChange"
      ></mdui-text-field>
      <mdui-button variant="tonal" class="position" @click="readPosition">快捷填入</mdui-button>
      <span class="introduction">快捷填入可将从获取坐标功能中获取的position字段一键填入</span>
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
        v-if="this.copyDepth === 'app'"
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

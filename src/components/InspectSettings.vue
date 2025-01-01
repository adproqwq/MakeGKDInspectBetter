<script lang="ts">
import { defineComponent } from 'vue';
import type { Dialog, Switch } from 'mdui';
import inspect from '../Settings/inspect';
import { send } from '../utils/event';
import { getInspectSettings } from '../utils/indexedDB';

export default defineComponent({
  methods: {
    async inspect(){
      await inspect();
    },
    closeDialog(){
      send('closePage');
    },
  },
  async mounted(){
    const currentInspectSettings = (await getInspectSettings())!;
    if(currentInspectSettings.ignoreUploadWarn) (document.querySelector('#uploadWarn') as Switch).checked = false;
    if(currentInspectSettings.ignoreWasmWarn) (document.querySelector('#wasmWarn') as Switch).checked = false;
    if(currentInspectSettings.autoUploadImport) (document.querySelector('#autoUploadImport') as Switch).checked = true;

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="网页审查工具设置" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <span>生成分享链接弹窗提醒：</span>
      <mdui-switch id="uploadWarn" checked></mdui-switch>
      <span class="introduction">默认开启。关闭则不会提醒</span>
    </div>
    <div>
      <span>浏览器版本正则表达式WASM(GC)提醒：</span>
      <mdui-switch id="wasmWarn" checked></mdui-switch>
      <span class="introduction">默认开启。关闭则不会提醒</span>
    </div>
    <div>
      <span>打开快照页面自动生成分享链接：</span>
      <mdui-switch id="autoUploadImport"></mdui-switch>
      <span class="introduction">请确保不含隐私！</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="inspect">确定</mdui-button>
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

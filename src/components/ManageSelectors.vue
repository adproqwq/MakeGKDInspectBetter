<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { generateSelectors, editSelector } from '../selectors/manage';
import _import from '../selectors/import';
import _export from '../selectors/export';
import { send } from '../utils/communicate';

export default defineComponent({
  methods: {
    async editSelector(){
      await editSelector();
    },
    close(){
      send('closePage');
    },
    async exportSelectors(){
      await _export();
    },
    importSelectors(){
      _import();
    },
  },
  async mounted(){
    await generateSelectors();

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="管理选择器" close-on-overlay-click close-on-esc @closed="close">
    <div>
      <mdui-button variant="tonal" @click="exportSelectors">导出</mdui-button>
      <mdui-button variant="tonal" @click="importSelectors">导入</mdui-button>
    </div>
    <div>
      <span>选择选择器：</span>
      <mdui-radio-group id="selectors"></mdui-radio-group>
    </div>
    <div>
      <span>备注：</span>
      <mdui-text-field variant="filled" id="name" label="备注" @change="editSelector"></mdui-text-field>
      <span class="introduction">失焦保存</span>
    </div>
    <div>
      <span>选择器：</span>
      <mdui-text-field variant="filled" id="selector" label="选择器" @change="editSelector"></mdui-text-field>
      <span class="introduction">留空删除。失焦保存</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="close">关闭</mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}
</style>

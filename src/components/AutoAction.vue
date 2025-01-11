<script lang="ts">
import { defineComponent } from 'vue';
import type { Dialog } from 'mdui';
import { showAutoAction, manage } from '../AutoAction/manage';
import { send } from '../utils/event';

export default defineComponent({
  methods: {
    async manage(){
      await manage();
    },
    closeDialog(){
      send('closePage');
    },
  },
  async mounted(){
    await showAutoAction();

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="自动动作配置" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <span>自动搜索选择器：</span>
      <mdui-text-field variant="filled" id="autoSearchSelector" label="自动搜索选择器" @change="manage"></mdui-text-field>
      <span class="introduction">在当前网址存在gkd参数时不进行自动搜索。失焦保存</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="closeDialog">确定</mdui-button>
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

<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { generateSelectors, search } from '../selectors/use';
import { send } from '../utils/communicate';

export default defineComponent({
  methods: {
    async search(){
      await search();
    },
    closeDialog(){
      send('closePage');
    },
  },
  async mounted(){
    await generateSelectors();

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="使用选择器" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <span>选择选择器：</span>
      <mdui-radio-group id="selectors"></mdui-radio-group>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="search">搜索</mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}
</style>

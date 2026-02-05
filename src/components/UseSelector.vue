<script lang="ts">
import { defineComponent } from 'vue';
import type { Dialog, Tabs } from 'mdui';
import { generateSelectors, search } from '../selectors/use';
import { send } from '../utils/event';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors } from '../types/selectors';

export default defineComponent({
  methods: {
    async search() {
      await search();
    },
    async generateSelectors() {
      await generateSelectors();
    },
    closeDialog() {
      send('closePage');
    },
  },
  async mounted() {
    const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
    const selectorTabs = document.querySelector('#selectorTabs') as Tabs;
    Object.keys(selectors).forEach(category => {
      const tab = document.createElement('mdui-tab');
      tab.value = category;
      tab.textContent = category;

      const panel = document.createElement('mdui-tab-panel');
      panel.slot = 'panel';
      panel.value = category;

      selectorTabs.append(tab, panel);
    });
    selectorTabs.value = '本地';

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog
    id="page"
    headline="使用选择器"
    close-on-overlay-click
    close-on-esc
    @closed="closeDialog"
  >
    <div>
      <span>选择选择器：</span>
      <mdui-tabs
        id="selectorTabs"
        variant="secondary"
        @change.self="generateSelectors"
        full-width
      ></mdui-tabs>
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

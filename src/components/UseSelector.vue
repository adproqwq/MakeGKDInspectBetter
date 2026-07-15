<script lang="ts">
import { defineComponent } from 'vue';
import { encodeURI, decode } from 'js-base64';
import type { Dialog, Tabs, Radio } from 'mdui';
import { updateSelectors, search } from '../selectors/use';
import { send } from '../utils/event';
import { getHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors, ISelector } from '../types/selectors';

export default defineComponent({
  methods: {
    async search() {
      await search();
    },
    async updateSelectors() {
      this.selectors = await updateSelectors();
    },
    radioClick(e: Event) {
      window.Hanashiro.currentSelector = {
        index: Number((e.target as Radio).getAttribute('data-index')!),
        name: (e.target as Radio).innerText,
        description: (e.target as Radio).getAttribute('data-description')!,
        selector: decode((e.target as Radio).value),
        order: Number((e.target as Radio).getAttribute('data-order')!),
      };
    },
    encode(src: string) {
      return encodeURI(src);
    },
    closeDialog() {
      send('closePage');
    },
  },
  data() {
    return {
      selectors: [] as ISelector[],
    };
  },
  async mounted() {
    const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
    const selectorTabs = document.querySelector('#selectorTabs') as Tabs;
    Object.keys(selectors).forEach((category) => {
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
        @change.self="updateSelectors"
        full-width
      ></mdui-tabs>
      <mdui-radio-group id="selectors">
        <mdui-radio
          v-for="(selector, key) in selectors"
          id="selectorRadio"
          :value="encode(selector.selector)"
          :data-index="key"
          :data-description="selector.description ?? ''"
          :data-order="selector.order ?? 1"
          @click="radioClick($event)">
          {{ selector.name }}
        </mdui-radio>
      </mdui-radio-group>
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

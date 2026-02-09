<script lang="ts">
import { defineComponent } from 'vue';
import { type Dialog, type Tabs, snackbar } from 'mdui';
import { generateSelectors, editSelector } from '../selectors/manage';
import _import, { getLocalSelectors } from '../selectors/import';
import _export from '../selectors/export';
import subscribe from '../selectors/subscribe';
import fetchSubscription from '../utils/fetchSubscription';
import { send } from '../utils/event';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import type { ISelectors, ISubscriptionMeta } from '../types/selectors';

export default defineComponent({
  methods: {
    async editSelector() {
      await editSelector();
    },
    async close() {
      const selectors = (await getHanashiroSettings<ISelectors>('selectors'))!;
      Object.entries(selectors).forEach(([category, specificSelectors]) => {
        selectors[category as keyof typeof selectors] = specificSelectors.sort((a, b) => {
          if (a.order > b.order) return -1;
          else if (a.order == b.order) return 0;
          else return 1;
        });
      });
      await setHanashiroSettings('selectors', selectors);

      send('closePage');
    },
    async exportSelectors() {
      await _export();
    },
    importSelectors() {
      _import();
    },
    subscribeSelectors() {
      subscribe();
    },
    async getLocalSelectorsFile() {
      await getLocalSelectors();
    },
    async generateSelectors() {
      await generateSelectors();
    },
    async updateSubscription() {
      const metas = (await getHanashiroSettings<ISubscriptionMeta[]>('subscriptions'))!;

      metas.forEach((meta) =>
        fetchSubscription(meta)
          .then(() => {
            snackbar({
              message: `订阅【${meta.name}】已更新`,
              placement: 'top',
            });
          })
          .catch(() => {
            snackbar({
              message: `订阅【${meta.name}】更新失败`,
              placement: 'top',
            });
          })
          .finally(async () => {
            await setHanashiroSettings('subscriptionsLastUpdateTime', Date.now());
          }),
      );
    },
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
  <mdui-dialog id="page" headline="管理选择器" close-on-overlay-click close-on-esc @closed="close">
    <div>
      <mdui-button variant="tonal" @click="exportSelectors">导出</mdui-button>
      <mdui-button variant="tonal" @click="importSelectors">导入</mdui-button>
      <mdui-button variant="tonal" @click="subscribeSelectors">订阅</mdui-button>
      <mdui-button variant="tonal" @click="updateSubscription">更新</mdui-button>
    </div>
    <div>
      <span>选择选择器：</span>
      <mdui-tabs
        id="selectorTabs"
        variant="secondary"
        @change.self="generateSelectors"
        full-width
      ></mdui-tabs>
    </div>
    <div>
      <span>名称：</span>
      <mdui-text-field
        variant="filled"
        id="name"
        label="名称"
        @change="editSelector"
      ></mdui-text-field>
      <span class="introduction">失焦保存</span>
    </div>
    <div>
      <span>描述：</span>
      <mdui-text-field
        variant="filled"
        id="description"
        label="描述"
        rows="6"
        @change="editSelector"
      ></mdui-text-field>
      <span class="introduction">失焦保存</span>
    </div>
    <div>
      <span>选择器：</span>
      <mdui-text-field
        variant="filled"
        id="selector"
        label="选择器"
        @change="editSelector"
      ></mdui-text-field>
      <span class="introduction">留空删除。失焦保存</span>
    </div>
    <div>
      <span>排序优先值：</span>
      <mdui-text-field
        variant="filled"
        id="order"
        label="排序优先值"
        type="number"
        @change="editSelector"
      ></mdui-text-field>
      <span class="introduction">数字越大，排序越前。失焦保存</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="close">关闭</mdui-button>
    </div>
  </mdui-dialog>
  <input type="file" id="localImport" accept=".json,.json5" @change="getLocalSelectorsFile" />
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}

input#localImport {
  display: none;
}
</style>

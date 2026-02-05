<script lang="ts">
import { defineComponent } from 'vue';
import { snackbar, TextField, Dialog } from 'mdui';
import { encodeURI } from 'js-base64';
import { send } from '../utils/event';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

export default defineComponent({
  methods: {
    async add() {
      const name = (document.querySelector('#name') as TextField).value;
      const description = (document.querySelector('#description') as TextField).value;
      const selector = (document.querySelector('#selector') as TextField).value;

      if (!name || !selector) {
        snackbar({
          message: '请不要填写名称或选择器！',
          placement: 'top',
        });

        return;
      }

      const savedSelectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;

      savedSelectors.push({
        name: name,
        description: description,
        base64: encodeURI(selector),
        order: 1,
      });

      savedSelectors.sort((a, b) => {
        if (a.order > b.order) return -1;
        else if (a.order == b.order) return 0;
        else return 1;
      });

      await setHanashiroSettings('selectors', savedSelectors);

      send('closePage');
    },
    closeDialog() {
      send('closePage');
    },
  },
  mounted() {
    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog
    id="page"
    headline="添加选择器"
    close-on-overlay-click
    close-on-esc
    @closed="closeDialog"
  >
    <div>
      <span>选择器名称：</span>
      <mdui-text-field
        id="name"
        variant="filled"
        label="名称"
        placeholder="给你的选择器添加一个名称"
      >
      </mdui-text-field>
    </div>
    <div>
      <span>选择器描述：</span>
      <mdui-text-field
        id="description"
        variant="filled"
        label="描述"
        placeholder="选择器描述"
        rows="6"
      ></mdui-text-field>
    </div>
    <div>
      <span>选择器：</span>
      <mdui-text-field
        id="selector"
        variant="filled"
        label="选择器"
        placeholder="请输入选择器"
      ></mdui-text-field>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="add">确定</mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}
</style>

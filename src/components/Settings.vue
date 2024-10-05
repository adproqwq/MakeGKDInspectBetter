<script lang="ts">
import { defineComponent } from 'vue';
import { TextField, Switch, Dialog } from 'mdui';
import { RawCategory } from '@gkd-kit/api';
import json5 from 'json5';
import settings from '../Settings/settings';
import _import from '../Settings/import';
import _export from '../Settings/export';
import { send } from '../utils/communicate';
import { getHanashiroSettings } from '../utils/indexedDB';

export default defineComponent({
  methods: {
    settings(){
      settings();
    },
    async exportSettings(){
      await _export();
    },
    importSettings(){
      _import();
    },
    closeDialog(){
      send('close');
    },
  },
  async mounted(){
    if(await getHanashiroSettings('categories')){
      (document.querySelector('#categories') as TextField).value = json5.stringify((await getHanashiroSettings<RawCategory[]>('categories'))!);
    }
    if(await getHanashiroSettings<boolean>('hideLoadSnackbar') == true) (document.querySelector('#hideLoadSnackbar') as Switch).checked = true;
    if(await getHanashiroSettings<boolean>('simplyName') == true) (document.querySelector('#simplyName') as Switch).checked = true;
    if(await getHanashiroSettings<boolean>('activityIdsSimply') == true) (document.querySelector('#activityIdsSimply') as Switch).checked = true;

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="设置" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <mdui-button variant="tonal" @click="exportSettings">导出</mdui-button>
      <mdui-button variant="tonal" @click="importSettings">导入</mdui-button>
    </div>
    <div>
      <span>分类设置：</span>
      <mdui-text-field variant="filled" id="categories" label="分类" placeholder="填入合法的分类" rows="10"></mdui-text-field>
    </div>
    <div>
      <span>隐藏加载成功提示：</span>
      <mdui-switch id="hideLoadSnackbar"></mdui-switch>
      <span class="introduction">每次脚本加载时会弹出一句诗句，此选项可选择是否弹出</span>
    </div>
    <div>
      <span>name属性复制优化：</span>
      <mdui-switch id="simplyName"></mdui-switch>
      <span class="introduction">在复制name属性时，会自动优化复制的内容。如复制 android.widget.TextView 时会优化为 TextView</span>
    </div>
    <div>
      <span>选择器分享自动添加快捷搜索：</span>
      <mdui-switch id="autoAddSelector"></mdui-switch>
      <span class="introduction">在分享选择器时，自动添加到快捷搜索列表中</span>
    </div>
    <div>
      <span>activityIds规则复制优化：</span>
      <mdui-switch id="activityIdsSimply"></mdui-switch>
      <span class="introduction">在复制规则代码时，若activityIds满足简写条件时，使用简写</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="settings">确定</mdui-button>
    </div>
  </mdui-dialog>
</template>

<style>
mdui-dialog > * > span {
  display: flex;
  font-size: var(--mdui-typescale-body-large-size);
}

#categories {
  width: 500px;
}
</style>

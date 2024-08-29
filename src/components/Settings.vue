<script lang="ts">
import { defineComponent } from 'vue';
import { TextField, Switch, Dialog } from 'mdui';
import settings from '../Settings/settings';
import { receive } from '../utils/communicate';

export default defineComponent({
  methods: {
    settings(){
      settings();
    },
  },
  mounted(){
    if(window.localStorage.getItem('categories')){
      (document.querySelector('#categories') as TextField).value = window.localStorage.getItem('categories')!;
    }
    if(window.localStorage.getItem('simplyName') == 'true') (document.querySelector('#simplyName') as Switch).checked = true;

    (document.querySelector('#page') as Dialog).open = true;

    receive('SettingsOpen', () => {
      (document.querySelector('#page') as Dialog).open = true;
    });
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="设置" close-on-overlay-click close-on-esc>
    <div>
      <span>分类设置：</span>
      <mdui-text-field variant="filled" id="categories" label="分类" placeholder="填入合法的分类" rows="10"></mdui-text-field>
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

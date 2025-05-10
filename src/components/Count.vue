<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { send } from '../utils/event';
import { getHanashiroSettings } from '../utils/indexedDB';
import { ICount } from '../types/count';

export default defineComponent({
  methods: {
    closeDialog(){
      send('closePage');
    },
  },
  async mounted(){
    const count = await getHanashiroSettings<ICount>('count');

    (document.querySelector('#rejectRules') as HTMLSlotElement).textContent = String(count?.rejectRules);
    (document.querySelector('#loaded') as HTMLSlotElement).textContent = String(count?.loaded);

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="统计" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <h2>本功能完全在本地进行，所有数据在本地储存！</h2>
    </div>
    <div>
      <span>注入规则 <span id="rejectRules"></span> 条</span>
    </div>
    <div>
      <span>脚本加载 <span id="loaded"></span> 次</span>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="closeDialog">关闭</mdui-button>
    </div>
  </mdui-dialog>
</template>

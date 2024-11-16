<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { send } from '../utils/communicate';
import generatePosition from '../utils/generatePosition';

export default defineComponent({
  methods: {
    closeDialog(){
      send('closePage');
    },
  },
  async mounted(){
    await generatePosition();

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="选择点击坐标" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="closeDialog">关闭</mdui-button>
    </div>
  </mdui-dialog>
</template>
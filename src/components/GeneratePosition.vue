<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog, TextField } from 'mdui';
import json5 from 'json5';
import { send } from '../utils/communicate';
import generatePosition, { getInfo, partialView, globalView } from '../utils/generatePosition';

export default defineComponent({
  methods: {
    closeDialog(){
      send('closePage');
    },
    closeResult(){
      const result = document.querySelector('#result')! as Dialog;
      result.open = false;
    },
    async partialView(){
      const [canvas, screenWidth, screenHeight, left, top, width, height, fullImg] = await getInfo();
      fullImg.onload = () => partialView(canvas, screenWidth, screenHeight, left, top, width, height, fullImg);
    },
    async globalView(){
      const [canvas, screenWidth, screenHeight, _left, _top, _width, _height, fullImg] = await getInfo();
      fullImg.onload = () => globalView(canvas, screenWidth, screenHeight, fullImg);
    },
    getNewPosition(){
      const absolute = window.Hanashiro.nodePosition.absolute;
      const relative = window.Hanashiro.nodePosition.relative;

      (document.querySelector('#absolute') as TextField).value = json5.stringify({ position:  absolute}, undefined, 2);
      (document.querySelector('#relative') as TextField).value = json5.stringify({ position:  relative}, undefined, 2);
    },
  },
  async mounted(){
    await generatePosition();

    (document.querySelector('#page') as Dialog).open = true;
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="选择点击坐标" fullscreen close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <mdui-button-icon icon="open_in_full" @click="globalView"></mdui-button-icon>
      <mdui-button-icon icon="close_fullscreen" @click="partialView"></mdui-button-icon>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="closeDialog">关闭</mdui-button>
    </div>
  </mdui-dialog>
  <mdui-dialog id="result" headline="计算结果" close-on-esc close-on-overlay-click @open="getNewPosition">
    <div>
      <span>绝对坐标：</span>
      <mdui-text-field id="absolute" variant="filled" label="绝对坐标" rows="8"></mdui-text-field>
    </div>
    <div>
      <span>相对坐标：</span>
      <mdui-text-field id="relative" variant="filled" label="相对坐标" rows="8"></mdui-text-field>
    </div>
    <div>
      <mdui-button slot="action" variant="tonal" @click="closeResult">关闭</mdui-button>
    </div>
  </mdui-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { receive } from '../utils/communicate';

export default defineComponent({
  mounted(){
    (document.querySelector('#page') as Dialog).open = true;

    receive('HelpOpen', () => {
      (document.querySelector('#page') as Dialog).open = true;
    });
  },
});
</script>

<template>
  <mdui-dialog id="page" headline="帮助" close-on-overlay-click close-on-esc>
    <div>
      <p>
        本脚本已开源至Github，欢迎反馈：<a href="https://github.com/adproqwq/MakeGKDInspectBetter">Github仓库</a><br>
        <br>
        你可以通过以下方式联系我：<br>
        QQ群：494273126<br>
        邮箱：adpro_qwq@qq.com<br>
        Telegram群组：<a href="https://t.me/+P4y5kLo3UrUxMWY1">Telegram群组</a><br>
        Telegram频道：<a href="https://t.me/adproqwq">Telegram频道</a><br>
        <br>
        如果你觉得脚本好用，可以通过赞助支持我：<br>
        <a href="https://afdian.com/a/Adpro">爱发电</a><br>
        <br>
        在这里推荐AIsouler的GKD订阅，特别好用，拥有2k+的star！<a href="https://github.com/AIsouler/GKD_subscription">Github仓库</a>
      </p>
    </div>
  </mdui-dialog>
</template>
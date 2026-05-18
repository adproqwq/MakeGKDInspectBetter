<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'mdui';
import { send } from '../utils/event';

export default defineComponent({
  methods: {
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
  <mdui-dialog id="page" headline="帮助" close-on-overlay-click close-on-esc @closed="closeDialog">
    <div>
      <p>
        本脚本已开源至Github，欢迎反馈：<a href="https://github.com/adproqwq/MikuMagicWand"
          >Github仓库</a
        ><br />
        3.0重构计划缓慢推进中……
        <br />
        你可以通过以下方式联系我：<br />
        邮箱：adpro_qwq@qq.com<br />
        Telegram群组：<a href="https://t.me/+P4y5kLo3UrUxMWY1">Telegram群组</a><br />
        Matrix群组：<a href="https://matrix.to/#/%23adproqwq_group_matrix:matrix.org">Matrix群组</a
        ><br />
        <br />
        在这里推荐 Lin-arm 的GKD订阅，AIsouler 订阅正版续作（欢迎品鉴<a
          href="https://github.com/Lin-arm/GKD_subscription"
          >Github仓库</a
        >
      </p>
    </div>
  </mdui-dialog>
</template>

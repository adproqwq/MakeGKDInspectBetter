<script lang="ts">
import { defineComponent } from 'vue';
import { snackbar } from 'mdui';
import { send } from '../utils/event';
import { replaceScreenshot } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

export default defineComponent({
  methods: {
    async getImg(){
      const inputElement = document.querySelector('#img') as HTMLInputElement;

      const fileList = inputElement.files!;
      const imageArrayBuffer = await fileList[0].arrayBuffer();

      await replaceScreenshot(getSnapshotId(), imageArrayBuffer);

      snackbar({
        message: '更换截图成功！刷新页面即可看见更改',
        placement: 'top',
      });

      send('closePage');
    },
    cancel(){
      send('closePage');
    },
  },
  async mounted(){
    (document.querySelector('#img') as HTMLInputElement).click();
  },
});
</script>

<template>
  <input type="file" id="img" accept=".png" @change="getImg" @cancel="cancel">
</template>

<style>
input#img{
  display: none;
}
</style>

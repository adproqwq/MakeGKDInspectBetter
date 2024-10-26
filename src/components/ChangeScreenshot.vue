<script lang="ts">
import { defineComponent } from 'vue';
import { snackbar } from 'mdui';
import { fileOpen } from 'browser-fs-access';
import { send } from '../utils/communicate';
import { replaceScreenshot } from '../utils/indexedDB';
import getSnapshotId from '../utils/getSnapshotId';

export default defineComponent({
  async mounted(){
    const file = await fileOpen({
      description: '截图',
      extensions: ['.png'],
      excludeAcceptAllOption: true,
    });

    const imageArrayBuffer = await file.arrayBuffer();

    await replaceScreenshot(getSnapshotId(), imageArrayBuffer);

    snackbar({
      message: '更换截图成功！刷新页面即可看见更改',
      placement: 'top',
    });

    send('closePage');
  },
});
</script>

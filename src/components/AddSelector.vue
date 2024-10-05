<script lang="ts">
import { defineComponent } from 'vue';
import { prompt, snackbar } from 'mdui';
import { encodeURI } from 'js-base64';
import { send } from '../utils/communicate';
import { getHanashiroSettings, setHanashiroSettings } from '../utils/indexedDB';
import { ISelectors } from '../types/selectors';

export default defineComponent({
  mounted() {
    prompt({
      headline: '请输入选择器备注',
      description: '对该选择器的备注，方便辨认',
      confirmText: '就决定是你了！',
      cancelText: '算了',
      closeOnEsc: true,
      closeOnOverlayClick: true,
      onConfirm: (name) => {
        if (!name) {
          snackbar({
            message: '请不要留空哦~',
            placement: 'top',
          });
          return false;
        }
        else {
          prompt({
            headline: '请输入选择器',
            description: '输入选择器',
            confirmText: '好了~',
            cancelText: '算了',
            closeOnEsc: true,
            closeOnOverlayClick: true,
            onConfirm: async (selector) => {
              if (!selector) {
                snackbar({
                  message: '请不要留空哦~',
                  placement: 'top',
                });
                return new Promise((_, reject) => reject(false));
              }
              else {
                const savedSelectors = (await getHanashiroSettings<ISelectors[]>('selectors'))!;

                savedSelectors.push({
                  name: name,
                  base64: encodeURI(selector),
                });

                await setHanashiroSettings('selectors', savedSelectors);

                send('close');
              }
            },
            onCancel: () => send('close'),
          }).catch();
        }
      },
      onCancel: () => send('close'),
    }).catch();
  },
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { prompt, snackbar } from 'mdui';
import { encodeURI } from 'js-base64';
import json5 from 'json5';
import { receive } from '../utils/communicate';
import { ISelectors } from '../types/selectors';

export default defineComponent({
  mounted(){
    receive('AddSelectorOpen', () => {
      prompt({
        headline: '请输入选择器备注',
        description: '对该选择器的备注，方便辨认',
        confirmText: '就决定是你了！',
        cancelText: '算了',
        closeOnEsc: true,
        closeOnOverlayClick: true,
        onConfirm: (name) => {
          if(!name){
            snackbar({
              message: '请不要留空哦~',
              placement: 'top',
            });
            return false;
          }
          else{
            prompt({
              headline: '请输入选择器',
              description: '输入选择器',
              confirmText: '好了~',
              cancelText: '算了',
              closeOnEsc: true,
              closeOnOverlayClick: true,
              onConfirm: (selector) => {
                if(!selector){
                  snackbar({
                    message: '请不要留空哦~',
                    placement: 'top',
                  });
                  return false;
                }
                else{
                  const savedSelectors = json5.parse(window.localStorage.getItem('selectors')!) as ISelectors[];

                  savedSelectors.push({
                    name: name,
                    base64: encodeURI(selector),
                  });

                  window.localStorage.setItem('selectors', json5.stringify(savedSelectors));
                }
              },
            }).catch();
          }
        },
      }).catch();
    });
  },
});
</script>

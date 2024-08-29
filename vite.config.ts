import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mdui-'),
        },
      },
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIGQ9Ik02IDExYzAtMi44MjggMC00LjI0My44NzktNS4xMjFDNy43NTcgNSA5LjE3MiA1IDEyIDVoM2MyLjgyOCAwIDQuMjQzIDAgNS4xMjEuODc5QzIxIDYuNzU3IDIxIDguMTcyIDIxIDExdjVjMCAyLjgyOCAwIDQuMjQzLS44NzkgNS4xMjFDMTkuMjQzIDIyIDE3LjgyOCAyMiAxNSAyMmgtM2MtMi44MjggMC00LjI0MyAwLTUuMTIxLS44NzlDNiAyMC4yNDMgNiAxOC44MjggNiAxNnoiLz48cGF0aCBkPSJNNiAxOWEzIDMgMCAwIDEtMy0zdi02YzAtMy43NzEgMC01LjY1NyAxLjE3Mi02LjgyOEM1LjM0MyAyIDcuMjI5IDIgMTEgMmg0YTMgMyAwIDAgMSAzIDMiLz48L2c+PC9zdmc+',
        namespace: 'https://blog.adproqwq.xyz',
        match: ['https://i.gkd.li/*'],
        exclude: ['https://i.gkd.li'],
        name: 'GKD网页审查工具增强',
        author: 'Adpro',
        grant: 'none',
        description: '让GKD网页审查工具再次强大！',
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});

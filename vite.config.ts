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
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGZpbGw9IiNhOGQ5ZTUiIHN0cm9rZT0iI2E4ZDllNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiIGQ9Ik01IDI0TDI0IDZsMTkgMThIMzF2MThIMTdWMjR6Ii8+PC9zdmc+',
        namespace: 'https://blog.adproqwq.xyz',
        match: ['https://i.gkd.li/*'],
        exclude: [
          'https://i.gkd.li/',
          'https://i.gkd.li/device/',
        ],
        name: {
          '': 'GKD网页审查工具增强',
          'en-US': 'Make GKDInspect Better',
        },
        author: 'Adpro',
        grant: 'none',
        description: {
          '': '让GKD网页审查工具再次强大！版本：Neptune',
          'en-US': 'Let GKD Inspect Better Again! Version: Neptune',
        },
        license: 'MIT',
        homepage: 'https://github.com/adproqwq/MakeGKDInspectBetter',
        supportURL: 'https://github.com/adproqwq/MakeGKDInspectBetter/issues',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});

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
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGZpbGw9IiNjYmYyZjMiIHN0cm9rZT0iI2NiZjJmMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjQiIGQ9Ik01IDI0TDI0IDZsMTkgMThIMzF2MThIMTdWMjR6Ii8+PC9zdmc+',
        namespace: 'adproqwq',
        match: ['https://i.gkd.li/*'],
        exclude: ['https://i.gkd.li'],
        name: {
          '': 'GKD网页审查工具增强 - Beta',
          'en-US': 'Make GKDInspect Better - Beta',
        },
        author: 'Adpro',
        grant: 'none',
        description: {
          '': '让GKD网页审查工具再次强大！版本：Uranus',
          'en-US': 'Let GKD Inspect Better Again! Version: Uranus',
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

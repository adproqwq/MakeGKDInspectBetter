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
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjNjI2MjYyIiBkPSJtMjMgNGwtNSAzLjc1djYuNUwxNSAxMmwtNSAzLjc1djYuNUw3IDIwbC01IDMuNzVWMzBoMnYtNS4yNWwzLTIuMjVsMyAyLjI1VjMwaDJWMTYuNzVsMy0yLjI1bDMgMi4yNVYzMGgyVjguNzVsMy0yLjI1bDMgMi4yNVYzMGgyVjcuNzV6Ii8+PC9zdmc+',
        namespace: 'https://blog.adproqwq.xyz',
        match: ['https://i.gkd.li/*'],
        exclude: ['https://i.gkd.li'],
        name: {
          '': 'GKD网页审查工具增强',
          'en-US': 'Make GKDInspect Better',
        },
        author: 'Adpro',
        grant: 'none',
        description: {
          '': '让GKD网页审查工具再次强大！版本：Mercury',
          'en-US': 'Let GKD Inspect Better Again! Version: Mercury',
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

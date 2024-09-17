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
        icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Im0yMyA0bC01IDMuNzV2Ni41TDE1IDEybC01IDMuNzV2Ni41TDcgMjBsLTUgMy43NVYzMGgydi01LjI1bDMtMi4yNWwzIDIuMjVWMzBoMlYxNi43NWwzLTIuMjVsMyAyLjI1VjMwaDJWOC43NWwzLTIuMjVsMyAyLjI1VjMwaDJWNy43NXoiLz48L3N2Zz4=',
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

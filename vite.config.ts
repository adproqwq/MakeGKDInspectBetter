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
        icon: 'data:image/png;base64,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',
        namespace: 'https://blog.adproqwq.top',
        match: ['https://i.gkd.li/*'],
        name: {
          '': '米库的神奇魔法棒',
          'en-US': "Miku's Magic Wand",
          ja: 'ミクの魔法の杖',
        },
        author: 'Adpro',
        grant: 'none',
        description: {
          '': '世界第一公主殿下赠予的魔法棒，给网页审查工具施加神奇魔法！',
          'en-US':
            'A magic wand gifted by Her Royal Highness, the First Princess of the World, to cast a magical spell on the GKD Inspect!',
          ja: '世界で一番お姫様がGKDインスペクトに魔法の呪文をかけるために贈った魔法の杖！',
        },
        license: 'MIT',
        homepage: 'https://github.com/adproqwq/MikuMagicWand',
        supportURL: 'https://github.com/adproqwq/MikuMagicWand/issues',
      },
      build: {
        externalGlobals: {
          vue: cdn.npmmirror('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});

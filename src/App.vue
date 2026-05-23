<script lang="ts">
import '@fontsource/material-icons';
import 'mdui/mdui.css';
import { setColorScheme } from 'mdui';
import { defineComponent } from 'vue';
import './common/hookVue3';
import './common/init';
import './api/api';
import './common/hookCopy';
import './common/insertIcon';
import './common/readClipboard';
import { receive } from './utils/event';
import Main from './components/Main.vue';
import Settings from './components/Settings.vue';
import Help from './components/Help.vue';
import UseSelector from './components/UseSelector.vue';
import AddSelector from './components/AddSelector.vue';
import ManageSelectors from './components/ManageSelectors.vue';
import ChangeScreenshot from './components/ChangeScreenshot.vue';
import GeneratePosition from './components/GeneratePosition.vue';
import Count from './components/Count.vue';

export default defineComponent({
  components: {
    Main,
    Settings,
    Help,
    UseSelector,
    AddSelector,
    ManageSelectors,
    ChangeScreenshot,
    GeneratePosition,
    Count,
  },
  data() {
    return {
      currentComponent: '',
    };
  },
  created() {
    receive('copyEvent', () => {
      this.currentComponent = 'Main';
    });

    receive('openSettings', () => {
      this.currentComponent = 'Settings';
    });

    receive('openHelp', () => {
      this.currentComponent = 'Help';
    });

    receive('openUseSelector', () => {
      this.currentComponent = 'UseSelector';
    });

    receive('openAddSelector', () => {
      this.currentComponent = 'AddSelector';
    });

    receive('openManageSelectors', () => {
      this.currentComponent = 'ManageSelectors';
    });

    receive('openChangeScreenshot', () => {
      this.currentComponent = 'ChangeScreenshot';
    });

    receive('openGeneratePosition', () => {
      this.currentComponent = 'GeneratePosition';
    });

    receive('openCount', () => {
      this.currentComponent = 'Count';
    });

    receive('closePage', () => {
      this.currentComponent = '';
    });
  },
  mounted() {
    setColorScheme('#39C5BB');

    if (window.location.host === 'li.chenge.eu.org')
      document.querySelector('html')!.classList.add('mdui-theme-auto');
  },
});
</script>

<template>
  <component :is="currentComponent"></component>
</template>

<style>
.introduction {
  color: rgb(var(--mdui-color-on-surface-variant));
  display: block;
  opacity: 1;
  word-break: normal;
  white-space: pre-warp;
  word-wrap: break-word;
  transition: opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
  font-size: var(--mdui-typescale-body-small-size);
  font-weight: var(--mdui-typescale-body-small-weight);
  letter-spacing: var(--mdui-typescale-body-small-tracking);
  line-height: var(--mdui-typescale-body-small-line-height);
}
</style>

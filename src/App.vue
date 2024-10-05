<script lang="ts">
import { setColorScheme } from 'mdui';
import 'mdui/mdui.css';
import { defineComponent } from 'vue';
import './common/init';
import './common/autoShowSize';
import './common/hookCopy';
import './common/insertIcon';
import { receive } from './utils/communicate';
import Main from './components/Main.vue';
import Settings from './components/Settings.vue';
import Help from './components/Help.vue';
import UseSelector from './components/UseSelector.vue';
import AddSelector from './components/AddSelector.vue';
import ManageSelectors from './components/ManageSelectors.vue';

export default defineComponent({
  components: {
    Main,
    Settings,
    Help,
    UseSelector,
    AddSelector,
    ManageSelectors,
  },
  data(){
    return {
      currentComponent: '',
    };
  },
  created(){
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

    receive('close', () => {
      this.currentComponent = '';
    });
  },
  mounted(){
    setColorScheme('#984f11');
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
  transition: opacity var(--mdui-motion-duration-short4) var(--mdui-motion-easing-linear);
  font-size: var(--mdui-typescale-body-small-size);
  font-weight: var(--mdui-typescale-body-small-weight);
  letter-spacing: var(--mdui-typescale-body-small-tracking);
  line-height: var(--mdui-typescale-body-small-line-height);
}
</style>

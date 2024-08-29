<script lang="ts">
import 'mdui';
import 'mdui/mdui.css';
import { defineComponent } from 'vue';
import './common/init';
import './common/autoShowSize';
import './common/hookCopy';
import './common/insertIcon';
import { receive, send } from './utils/communicate';
import Main from './components/Main.vue';
import Settings from './components/Settings.vue';
import UseSelector from './components/UseSelector.vue';
import AddSelector from './components/AddSelector.vue';
import ManageSelectors from './components/ManageSelectors.vue';

export default defineComponent({
  components: {
    Main,
    Settings,
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
      if(this.currentComponent != 'Main') this.currentComponent = 'Main';
      else send('MainOpen');
    });

    receive('openSettings', () => {
      if(this.currentComponent != 'Settings') this.currentComponent = 'Settings';
      else send('SettingsOpen');
    });

    receive('openUseSelector', () => {
      if(this.currentComponent != 'UseSelector') this.currentComponent = 'UseSelector';
      else send('UseSelectorOpen');
    });

    receive('openAddSelector', () => {
      if(this.currentComponent != 'AddSelector') this.currentComponent = 'AddSelector';
      else send('AddSelectorOpen');
    });

    receive('openManageSelectors', () => {
      if(this.currentComponent != 'ManageSelectors') this.currentComponent = 'ManageSelectors';
      else send('ManageSelectorsOpen');
    });
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

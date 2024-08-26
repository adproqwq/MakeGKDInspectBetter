<script lang="ts">
import 'mdui';
import 'mdui/mdui.css';
import { defineComponent } from 'vue';
import './utils/hookCopy';
import { receive, send } from './utils/communicate';
import './utils/insertIcon';
import Main from './components/Main.vue';
import Settings from './components/Settings.vue';

export default defineComponent({
  components: {
    Main,
    Settings,
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
  },
});
</script>

<template>
  <component :is="currentComponent"></component>
</template>

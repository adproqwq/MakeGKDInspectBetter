import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount(
  (() => {
    const icon = document.createElement('link');
    icon.rel = 'stylesheet';
    icon.href = 'https://fonts.font.im/icon?family=Material+Icons';
    document.head.append(icon);

    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })(),
);

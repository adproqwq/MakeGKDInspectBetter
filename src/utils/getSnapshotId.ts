import type { RouteLocationNormalized } from 'vue-router';

export default (): string => {
  const app = document.querySelector('.vue-component[data-v-app]') as HTMLDivElement;
  const appConfig = app.__vue_app__?.config;
  const route = appConfig?.globalProperties.$route as RouteLocationNormalized;

  return route.params.snapshotId as string;
};

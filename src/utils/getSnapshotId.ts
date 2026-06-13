import type { RouteLocationNormalized } from 'vue-router';
import { importIdToSnapshotId } from './indexedDB';

export default async (): Promise<string> => {
  const app = document.querySelector('.vue-component[data-v-app]') as HTMLDivElement;
  const appConfig = app.__vue_app__?.config;
  const route = appConfig?.globalProperties.$route as RouteLocationNormalized;
  const params = route.params;

  if (Object.hasOwn(params, 'snapshotId')) return params.snapshotId as string;
  else return String((await importIdToSnapshotId(Number(params.github_asset_id as string)))!);
};

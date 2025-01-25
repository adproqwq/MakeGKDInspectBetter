import type { Switch } from 'mdui';
import { getInspectSettings, setInspectSettings } from '../utils/indexedDB';
import { send } from '../utils/event';

export default async () => {
  const currentInspectSettings = (await getInspectSettings())!;
  const isUploadWarn = (document.querySelector('#uploadWarn') as Switch)
    .checked;
  const isWasmWarn = (document.querySelector('#wasmWarn') as Switch).checked;
  const isAutoUploadImport = (
    document.querySelector('#autoUploadImport') as Switch
  ).checked;

  currentInspectSettings.ignoreUploadWarn = !isUploadWarn;
  currentInspectSettings.ignoreWasmWarn = !isWasmWarn;
  currentInspectSettings.autoUploadImport = isAutoUploadImport;

  await setInspectSettings(currentInspectSettings);

  send('closePage');
};

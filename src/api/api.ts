import { snackbar, confirm, dialog } from 'mdui';
import { send, receive } from '../utils/event';
import { createBarIcon } from '../utils/createIcon';
import observeElement from '../utils/observeElement';
import { getHanashiroSettings, setHanashiroSettings, getInspectSettings, setInspectSettings } from '../utils/indexedDB';
import insertBarIcon from './insertBarIcon';

Object.defineProperty(window, 'HatsuneMiku', {
  value: {
    event: {
      send,
      receive,
    },
    utils: {
      icon: {
        createBarIcon,
        insertBarIcon,
      },
      common: {
        observeElement,
      },
      storage: {
        getHanashiroSettings,
        setHanashiroSettings,
        getInspectSettings,
        setInspectSettings,
      },
      ui: {
        snackbar,
        confirm,
        dialog,
      },
    },
  },
  writable: true,
});
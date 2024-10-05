import { send } from '../utils/communicate';

const HanashiroProxy = new Proxy(window.Hanashiro, {
  set: (target, prop, value) => {
    send(`${String(prop)}Change`);

    return Reflect.set(target, prop, value);
  },
});
window.Hanashiro = HanashiroProxy;
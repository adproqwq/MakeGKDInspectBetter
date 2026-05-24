import type { ComponentInternalInstance, RendererNode } from 'vue';

const recordComponent = (component: ComponentInternalInstance) => {
  let element = component.vnode.el;
  while (!(element instanceof HTMLElement)) element = element?.parentElement;

  if (element.__VUE__) element.__VUE__.push(component);
  else element.__VUE__ = [component];
  element.classList.add('vue-component');

  watchComponentUnmount(component as Parameters<typeof watchComponentUnmount>[0]);
  dispatchEvent('vue:component-mount', component);
};

const watchComponentMount = (component: ComponentInternalInstance) => {
  let value: RendererNode | undefined = undefined;
  Object.defineProperty(component.vnode, 'el', {
    get: () => value,
    set: (v) => (value = v) && recordComponent(component),
  });
};

const watchComponentUnmount = (component: ComponentInternalInstance & { bum: unknown[] }) => {
  if (!component.bum) component.bum = [];
  component.bum.push(function beforeUnmount() {
    const element = component.vnode.el;
    if (element)
      if (element.__VUE__?.length == 1) element.__VUE__ = undefined;
      else element.__VUE__?.splice(element.__VUE__.indexOf(component), 1);
    component.bum.splice(component.bum.indexOf(beforeUnmount), 1);
    dispatchEvent('vue:component-unmount', component);
  });
};

window.Proxy = new Proxy(Proxy, {
  construct(target, argArray, newTarget) {
    const component: ComponentInternalInstance = argArray[0]?._;
    const element = component?.vnode?.el;
    if (component?.uid >= 0)
      if (element) recordComponent(component);
      else watchComponentMount(component);
    return Reflect.construct(target, argArray, newTarget);
  },
});

const dispatchEvent = <K extends keyof WindowEventMap>(
  type: K,
  detail: WindowEventMap[K] extends CustomEvent<infer D> ? D : never,
) => {
  const event = new CustomEvent(type, { detail });
  return window.dispatchEvent(event);
};

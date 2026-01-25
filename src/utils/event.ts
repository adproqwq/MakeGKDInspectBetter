export const send = (eventName: string) => {
  const event = new Event(eventName);
  window.dispatchEvent(event);
};

export const receive = (eventName: string, callback: () => void, once?: boolean) => {
  window.addEventListener(eventName, callback, { once: once });
};

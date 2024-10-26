export const send = (channal: string) => {
  const event = new Event(channal);
  window.dispatchEvent(event);
};

export const receive = (channal: string, callback: () => void, once?: boolean) => {
  window.addEventListener(channal, callback, { once: once });
};
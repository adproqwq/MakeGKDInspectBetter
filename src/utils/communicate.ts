export const send = (channal: string) => {
  const event = new Event(channal);
  window.dispatchEvent(event);
};

export const receive = (channal: string, callback: () => void) => {
  window.addEventListener(channal, callback);
};
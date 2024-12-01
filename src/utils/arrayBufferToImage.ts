export default (arrayBuffer: ArrayBuffer): HTMLImageElement => {
  const arrayBufferView = new Uint8Array(arrayBuffer);
  const blob = new Blob([arrayBufferView], { type: 'image/png' });
  const src = (window.URL || window.webkitURL).createObjectURL(blob);
  const img = document.createElement('img');
  img.src = src;

  return img;
};
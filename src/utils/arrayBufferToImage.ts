import { detectImageMime } from './imageDetect';

export default (arrayBuffer: ArrayBuffer): HTMLImageElement => {
  const arrayBufferView = new Uint8Array(arrayBuffer);
  const mime = detectImageMime(arrayBuffer) ?? 'image/png';
  const blob = new Blob([arrayBufferView], { type: mime });
  const src = (window.URL || window.webkitURL).createObjectURL(blob);
  const img = document.createElement('img');
  img.src = src;

  return img;
};

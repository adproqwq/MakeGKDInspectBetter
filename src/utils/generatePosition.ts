import type { Position } from '@gkd-kit/api';
import { Dialog } from 'mdui';
import { getScreenshot, getNodeAttr, getScreenInfo } from './indexedDB';
import getSnapshotId from './getSnapshotId';
import getCurrentNodeId from './getCurrentNodeId';

const arrayBufferToImage = (arrayBuffer: ArrayBuffer): HTMLImageElement => {
  const arrayBufferView = new Uint8Array(arrayBuffer);
  const blob = new Blob([arrayBufferView], { type: 'image/png' });
  const src = (window.URL || window.webkitURL).createObjectURL(blob);
  const img = document.createElement('img');
  img.src = src;

  return img;
};

export default async () => {
  const canvas = document.querySelector('#canvas')! as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;

  const snapshotId = getSnapshotId();
  const screenshot = await getScreenshot(snapshotId);
  const nodeId = getCurrentNodeId() == -1 ? 0 : getCurrentNodeId();

  const screenWidth = (await getScreenInfo(getSnapshotId())).width;
  const screenHeight = (await getScreenInfo(getSnapshotId())).height;
  const left = await getNodeAttr(snapshotId, nodeId, 'left')! as number;
  const top = await getNodeAttr(snapshotId, nodeId, 'top')! as number;
  const width = await getNodeAttr(snapshotId, nodeId, 'width')! as number;
  const height = await getNodeAttr(snapshotId, nodeId, 'height')! as number;

  canvas.width = width;
  canvas.height = height;

  const fullImg = arrayBufferToImage(screenshot);

  fullImg.onload = () => {
    const tampCanvas = document.createElement('canvas');
    const tampCtx = tampCanvas.getContext('2d')!;

    tampCanvas.width = screenWidth;
    tampCanvas.height = screenHeight;

    tampCtx.drawImage(fullImg, 0, 0, screenWidth, screenHeight);
    const imgData = tampCtx.getImageData(left, top, width, height);

    ctx.putImageData(imgData, 0, 0);
  };

  canvas.onclick = (e) => {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    const absolutePosition: Position = {
      left: left + x,
      top: top + y,
    };
    const relativePosition: Position = {
      left: `width * ${String((x / width).toFixed(4))}`,
      top: `width * ${String((y / width).toFixed(4))}`,
    };

    window.Hanashiro.nodePosition = {
      absolute: absolutePosition,
      relative: relativePosition,
    };

    const result = document.querySelector('#result')! as Dialog;
    result.open = true;
  };
};
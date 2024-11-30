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

export const getInfo = async (): Promise<[
  HTMLCanvasElement,
  number,
  number,
  number,
  number,
  number,
  number,
  HTMLImageElement,
]> => {
  const canvas = document.querySelector('#canvas')! as HTMLCanvasElement;

  const snapshotId = getSnapshotId();
  const screenshot = await getScreenshot(snapshotId);
  const nodeId = getCurrentNodeId();

  const screenWidth = (await getScreenInfo(getSnapshotId())).width;
  const screenHeight = (await getScreenInfo(getSnapshotId())).height;
  const left = await getNodeAttr(snapshotId, nodeId, 'left')! as number;
  const top = await getNodeAttr(snapshotId, nodeId, 'top')! as number;
  const width = await getNodeAttr(snapshotId, nodeId, 'width')! as number;
  const height = await getNodeAttr(snapshotId, nodeId, 'height')! as number;

  const fullImg = arrayBufferToImage(screenshot);

  return [canvas, screenWidth, screenHeight, left, top, width, height, fullImg];
};

export const partialView = (
  canvas: HTMLCanvasElement,
  screenWidth: number,
  screenHeight: number,
  left: number,
  top: number,
  width: number,
  height: number,
  fullImg: HTMLImageElement,
) => {
  window.Hanashiro.currentPositionView = 'partial';

  const ctx = canvas.getContext('2d')!;

  const tampCanvas = document.createElement('canvas');
  const tampCtx = tampCanvas.getContext('2d')!;

  canvas.width = width;
  canvas.height = height;

  tampCanvas.width = screenWidth;
  tampCanvas.height = screenHeight;

  tampCtx.drawImage(fullImg, 0, 0, screenWidth, screenHeight);
  const imgData = tampCtx.getImageData(left, top, width, height);

  ctx.putImageData(imgData, 0, 0);
};

export const globalView = (
  canvas: HTMLCanvasElement,
  screenWidth: number,
  screenHeight: number,
  fullImg: HTMLImageElement,
) => {
  window.Hanashiro.currentPositionView = 'global';

  const ctx = canvas.getContext('2d')!;

  canvas.width = screenWidth;
  canvas.height = screenHeight;

  ctx.drawImage(fullImg, 0, 0, screenWidth, screenHeight);
};

export default async () => {
  const [canvas, screenWidth, screenHeight, left, top, width, height, fullImg] = await getInfo();

  fullImg.onload = () => partialView(canvas, screenWidth, screenHeight, left, top, width, height, fullImg);

  canvas.onclick = (e) => {
    let x = e.offsetX, y = e.offsetY;

    if(window.Hanashiro.currentPositionView == 'global'){
      x -= left;
      y -= top;
    }

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
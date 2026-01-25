import type { TextField } from 'mdui';

export const onChange = (element: TextField) => {
  if (element.id == 'left') {
    if (element.value != '') document.querySelector<TextField>('.position#right')!.disabled = true;
    else document.querySelector<TextField>('.position#right')!.disabled = false;
  }

  if (element.id == 'right') {
    if (element.value != '') document.querySelector<TextField>('.position#left')!.disabled = true;
    else document.querySelector<TextField>('.position#left')!.disabled = false;
  }

  if (element.id == 'top') {
    if (element.value != '') document.querySelector<TextField>('.position#bottom')!.disabled = true;
    else document.querySelector<TextField>('.position#bottom')!.disabled = false;
  }

  if (element.id == 'bottom') {
    if (element.value != '') document.querySelector<TextField>('.position#top')!.disabled = true;
    else document.querySelector<TextField>('.position#top')!.disabled = false;
  }
};

export const constructPositionArray = (): string[] => {
  const left = document.querySelector<TextField>('.position#left')!.value;
  const right = document.querySelector<TextField>('.position#right')!.value;
  const top = document.querySelector<TextField>('.position#top')!.value;
  const bottom = document.querySelector<TextField>('.position#bottom')!.value;

  if (!left && !right && !top && !bottom) return [];
  else return [top, left, right, bottom];
};

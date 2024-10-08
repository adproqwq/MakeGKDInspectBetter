export type PrimitiveType = boolean | string | number | null | undefined;

export interface Device {
  device: string;
  model: string;
  manufacturer: string;
  brand: string;
  sdkInt: number;
  release: string;
}

export interface RawNode {
  id: number;
  pid: number;
  idQf?: boolean;
  textQf?: boolean;
  attr: RawAttr;
}

export interface RawAttr {
  id?: string;
  vid?: string;
  name: string;
  text?: string;
  desc?: string;
  clickable: boolean;
  checkable: boolean;
  checked: boolean;
  editable: boolean;
  focusable: boolean;
  longClickable: boolean;
  visibleToUser: boolean;
  width: number;
  height: number;
  childCount: number;
  index: number;
  depth: number;

  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Overview {
  id: number;

  appId: string;
  activityId: string;

  screenWidth: number;
  screenHeight: number;
  isLandscape: boolean;

  appInfo: AppInfo;
  gkdAppInfo: AppInfo;
}

export interface Snapshot extends Overview {
  device: Device;
  nodes: RawNode[];
}

export interface AppInfo {
  id: string;
  name: string;
  versionCode: number;
  versionName?: string;
  isSystem: boolean;
  mtime: number;
  hidden: boolean;
}

export interface RectX {
  bottom: number;
  left: number;
  right: number;
  top: number;
}

export interface SizeExt {
  height: number;
  width: number;
}

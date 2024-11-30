/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />

declare interface ISelectorsExtend {
  index: number,
  name: string,
  base64: string,
}

declare interface IPosition {
  left?: number | string,
  top?: number | string,
};

declare interface Window {
  Hanashiro: {
    originRule: string;
    returnResult: string;
    currentCategory: string;
    currentSelector: ISelectorsExtend;
    currentUseSelectorIndex: number;
    currentPositionView: 'partial' | 'global';
    nodePosition: {
      absolute: IPosition,
      relative: IPosition,
    };
  },
}

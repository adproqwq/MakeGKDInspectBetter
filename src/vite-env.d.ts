/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />

declare interface SnackbarOptions {
  /**
   * Snackbar 中的消息文本内容
   */
  message: string;
  /**
   * Snackbar 出现的位置。默认为 `bottom`。可选值为：
   * * `top`：位于顶部，居中对齐
   * * `top-start`：位于顶部，左对齐
   * * `top-end`：位于顶部，右对齐
   * * `bottom`：位于底部，居中对齐
   * * `bottom-start`：位于底部，左对齐
   * * `bottom-end`：位于底部，右对齐
   */
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
  /**
   * 操作按钮的文本
   */
  action?: string;
  /**
   * 是否在右侧显示关闭按钮
   */
  closeable?: boolean;
  /**
   * 消息文本最多显示几行。默认不限制行数。可选值为
   * * `1`：消息文本最多显示一行
   * * `2`：消息文本最多显示两行
   */
  messageLine?: 1 | 2;
  /**
   * 在多长时间后自动关闭（单位为毫秒）。设置为 0 时，不自动关闭。默认为 5 秒后自动关闭。
   */
  autoCloseDelay?: number;
  /**
   * 点击或触摸 Snackbar 以外的区域时是否关闭 Snackbar
   */
  closeOnOutsideClick?: boolean;
  /**
   * 队列名称。
   * 默认不启用队列，在多次调用该函数时，将同时显示多个 snackbar。
   * 可在该参数中传入一个队列名称，具有相同队列名称的 snackbar 函数，将在上一个 snackbar 关闭后才打开下一个 snackbar。
   */
  queue?: string;
  /**
   * 点击 Snackbar 时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * @param snackbar
   */
  onClick?: (snackbar: import('mdui').Snackbar) => void;
  /**
   * 点击操作按钮时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * 默认点击后会关闭 snackbar；若返回值为 false，则不关闭 snackbar；若返回值为 promise，则将在 promise 被 resolve 后，关闭 snackbar。
   * @param snackbar
   */
  onActionClick?: (snackbar: import('mdui').Snackbar) => void | boolean | Promise<void>;
  /**
   * Snackbar 开始显示时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * @param snackbar
   */
  onOpen?: (snackbar: import('mdui').Snackbar) => void;
  /**
   * Snackbar 显示动画完成时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * @param snackbar
   */
  onOpened?: (snackbar: import('mdui').Snackbar) => void;
  /**
   * Snackbar 开始隐藏时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * @param snackbar
   */
  onClose?: (snackbar: import('mdui').Snackbar) => void;
  /**
   * Snackbar 隐藏动画完成时的回调函数。
   * 函数参数为 snackbar 实例，`this` 也指向 snackbar 实例。
   * @param snackbar
   */
  onClosed?: (snackbar: import('mdui').Snackbar) => void;
}

declare interface ConfirmOptions {
  /**
   * confirm 的标题
   */
  headline?: string;
  /**
   * confirm 的描述文本
   */
  description?: string;
  /**
   * confirm 顶部的 Material Icons 图标名
   */
  icon?: string;
  /**
   * 是否在按下 ESC 键时，关闭 confirm
   */
  closeOnEsc?: boolean;
  /**
   * 是否在点击遮罩层时，关闭 confirm
   */
  closeOnOverlayClick?: boolean;
  /**
   * 确认按钮的文本
   */
  confirmText?: string;
  /**
   * 取消按钮的文本
   */
  cancelText?: string;
  /**
   * 是否垂直排列底部操作按钮
   */
  stackedActions?: boolean;
  /**
   * 队列名称。
   * 默认不启用队列，在多次调用该函数时，将同时显示多个 confirm。
   * 可在该参数中传入一个队列名称，具有相同队列名称的 confirm 函数，将在上一个 confirm 关闭后才打开下一个 confirm。
   * `dialog()`、`alert()`、`confirm()`、`prompt()` 这四个函数的队列名称若相同，则也将互相共用同一个队列。
   */
  queue?: string;
  /**
   * 点击确认按钮时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * 默认点击确认按钮后会关闭 confirm；若返回值为 `false`，则不关闭 confirm；若返回值为 promise，则将在 promise 被 resolve 后，关闭 confirm。
   * @param dialog
   */
  onConfirm?: (dialog: import('mdui').Dialog) => void | boolean | Promise<void>;
  /**
   * 点击取消按钮时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * 默认点击确认按钮后会关闭 confirm；若返回值为 `false`，则不关闭 confirm；若返回值为 promise，则将在 promise 被 resolve 后，关闭 confirm。
   * @param dialog
   */
  onCancel?: (dialog: import('mdui').Dialog) => void | boolean | Promise<void>;
  /**
   * confirm 开始打开时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpen?: (dialog: import('mdui').Dialog) => void;
  /**
   * confirm 打开动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpened?: (dialog: import('mdui').Dialog) => void;
  /**
   * confirm 开始关闭时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClose?: (dialog: import('mdui').Dialog) => void;
  /**
   * confirm 关闭动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClosed?: (dialog: import('mdui').Dialog) => void;
  /**
   * 点击遮罩层时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOverlayClick?: (dialog: import('mdui').Dialog) => void;
}

declare interface Action {
  /**
   * 按钮文本
   */
  text: string;
  /**
   * 点击按钮时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * 默认点击按钮后会关闭 dialog；若返回值为 false，则不关闭 dialog；若返回值为 promise，则将在 promise 被 resolve 后，关闭 dialog。
   * @param dialog
   */
  onClick?: (dialog: import('mdui').Dialog) => void | boolean | Promise<void>;
}
declare interface DialogOptions {
  /**
   * dialog 的标题
   */
  headline?: string;
  /**
   * dialog 的描述文本
   */
  description?: string;
  /**
   * dialog 中的 body 内容，可以是 HTML 字符串、DOM 元素、或 JQ 对象
   */
  body?: string | HTMLElement | import('mdui').JQ<HTMLElement>;
  /**
   * dialog 顶部的 Material Icons 图标名
   */
  icon?: string;
  /**
   * 是否在按下 ESC 键时，关闭 dialog
   */
  closeOnEsc?: boolean;
  /**
   * 是否在点击遮罩层时，关闭 dialog
   */
  closeOnOverlayClick?: boolean;
  /**
   * 底部操作按钮数组
   */
  actions?: Action[];
  /**
   * 是否垂直排列底部操作按钮
   */
  stackedActions?: boolean;
  /**
   * 队列名称。
   * 默认不启用队列，在多次调用该函数时，将同时显示多个 dialog。
   * 可在该参数中传入一个队列名称，具有相同队列名称的 dialog 函数，将在上一个 dialog 关闭后才打开下一个 dialog。
   * `dialog()`、`alert()`、`confirm()`、`prompt()` 这四个函数的队列名称若相同，则也将互相共用同一个队列。
   */
  queue?: string;
  /**
   * dialog 开始打开时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpen?: (dialog: import('mdui').Dialog) => void;
  /**
   * dialog 打开动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOpened?: (dialog: import('mdui').Dialog) => void;
  /**
   * dialog 开始关闭时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClose?: (dialog: import('mdui').Dialog) => void;
  /**
   * dialog 关闭动画完成时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onClosed?: (dialog: import('mdui').Dialog) => void;
  /**
   * 点击遮罩层时的回调函数。
   * 函数参数为 dialog 实例，`this` 也指向 dialog 实例。
   * @param dialog
   */
  onOverlayClick?: (dialog: import('mdui').Dialog) => void;
}

declare type ISelectorsExtend = import('./types/selectors').ISelector & {
  index: number;
};

declare interface IPosition {
  left?: number | string;
  top?: number | string;
}

declare interface Window {
  Hanashiro: {
    originRule: string;
    returnResult: string;
    currentCategory: string;
    currentSelector: ISelectorsExtend;
    currentPositionView: 'partial' | 'global';
    defaultRulesKeySortOrder: string[];
    nodePosition: {
      absolute: IPosition;
      relative: IPosition;
    };
  };
  HatsuneMiku: {
    event: {
      send: (eventName: string) => void;
      receive: (eventName: string, callback: () => void, once?: boolean) => void;
    };
    utils: {
      icon: {
        createBarIcon: (
          icon: string,
          tooltip: string,
          onclick: () => void,
        ) => import('mdui').Tooltip;
        insertBarIcon: (icon: import('mdui').Tooltip) => void;
      };
      common: {
        observeElement: (selector: string, callback: () => void, continuous = false) => void;
      };
      storage: {
        getHanashiroSettings: <T>(item: string) => Promise<T | null>;
        setHanashiroSettings: <T>(item: string, value: T) => Promise<void>;
        getInspectSettings: () => Promise<
          import('./types/inspectSettings').IInspectSettings | null
        >;
        setInspectSettings: (
          newSettings: import('./types/inspectSettings').IInspectSettings,
        ) => void;
      };
      ui: {
        snackbar: (options: SnackbarOptions) => import('mdui').Snackbar;
        confirm: (options: ConfirmOptions) => Promise<void>;
        dialog: (options: DialogOptions) => import('mdui').Dialog;
      };
    };
  };
}

declare interface HTMLElement {
  __VUE__?: import('vue').ComponentInternalInstance[];
	__vue_app__?: import('vue').App;
}

declare interface WindowEventMap {
  'vue:component-mount': CustomEvent<ComponentInternalInstance>;
  'vue:component-unmount': CustomEvent<ComponentInternalInstance>;
}

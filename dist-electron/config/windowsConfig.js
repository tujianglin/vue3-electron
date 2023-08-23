"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _const = require("./const.js");
const mainWindowConfig = {
  height: 800,
  useContentSize: true,
  width: 1700,
  minWidth: 1366,
  show: false,
  frame: _const.IsUseSysTitle,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    webSecurity: false,
    // 如果是开发模式可以使用devTools
    devTools: process.env.NODE_ENV === "development",
    // 在macos中启用橡皮动画
    scrollBounce: process.platform === "darwin"
  }
};
const otherWindowConfig = {
  height: 595,
  useContentSize: true,
  width: 1140,
  autoHideMenuBar: true,
  minWidth: 842,
  frame: _const.IsUseSysTitle,
  show: false,
  webPreferences: {
    contextIsolation: false,
    nodeIntegration: true,
    webSecurity: false,
    // 如果是开发模式可以使用devTools
    devTools: process.env.NODE_ENV === "development",
    // 在macos中启用橡皮动画
    scrollBounce: process.platform === "darwin"
  }
};
exports.mainWindowConfig = mainWindowConfig;
exports.otherWindowConfig = otherWindowConfig;

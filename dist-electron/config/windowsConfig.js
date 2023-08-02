'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const e = require('./const.js'),
  o = {
    height: 800,
    useContentSize: !0,
    width: 1700,
    minWidth: 1366,
    show: !1,
    frame: e.IsUseSysTitle,
    webPreferences: { contextIsolation: !1, nodeIntegration: !0, webSecurity: !1, devTools: process.env.NODE_ENV === 'development', scrollBounce: process.platform === 'darwin' },
  },
  t = {
    height: 595,
    useContentSize: !0,
    width: 1140,
    autoHideMenuBar: !0,
    minWidth: 842,
    frame: e.IsUseSysTitle,
    show: !1,
    webPreferences: { contextIsolation: !1, nodeIntegration: !0, webSecurity: !1, devTools: process.env.NODE_ENV === 'development', scrollBounce: process.platform === 'darwin' },
  };
exports.mainWindowConfig = o;
exports.otherWindowConfig = t;

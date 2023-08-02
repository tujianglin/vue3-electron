'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const t = require('electron');
var s = ((n) => ((n.OpenMessagebox = 'open-messagebox'), n))(s || {});
const o = { [s.OpenMessagebox]: async (n, e) => t.dialog.showMessageBox({ type: e.type || 'info', title: e.title || '', buttons: e.buttons || [], message: e.message || '', noLink: e.noLink || !0 }) };
function i() {
  Object.entries(o).forEach(([n, e]) => {
    t.ipcMain.handle(n, e);
  });
}
exports.installIpcMain = i;

'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const o = require('electron');
var n = ((e) => ((e.OpenMessagebox = 'open-messagebox'), (e.ReadLocalfile = 'read-localfile'), e))(n || {});
const i = {
  [n.OpenMessagebox]: async (e, a) => o.dialog.showMessageBox(a),
  [n.ReadLocalfile]: async (e, a) => o.dialog.showOpenDialog({ title: '选择文件', properties: ['openFile', 'openDirectory'], ...a }),
};
function l() {
  Object.entries(i).forEach(([e, a]) => {
    o.ipcMain.handle(e, a);
  });
}
exports.installIpcMain = l;

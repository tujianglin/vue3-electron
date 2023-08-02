'use strict';
Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const electron = require('electron');
var IpcChannel = /* @__PURE__ */ ((IpcChannel2) => {
  IpcChannel2['OpenMessagebox'] = 'open-messagebox';
  return IpcChannel2;
})(IpcChannel || {});
const ipcMainHandle = {
  [IpcChannel.OpenMessagebox]: async (_, arg) => {
    return electron.dialog.showMessageBox({
      type: arg.type || 'info',
      title: arg.title || '',
      buttons: arg.buttons || [],
      message: arg.message || '',
      noLink: arg.noLink || true,
    });
  },
};
function installIpcMain() {
  Object.entries(ipcMainHandle).forEach(([ipcChannelName, ipcListener]) => {
    electron.ipcMain.handle(ipcChannelName, ipcListener);
  });
}
exports.installIpcMain = installIpcMain;

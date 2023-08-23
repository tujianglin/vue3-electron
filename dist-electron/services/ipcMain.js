"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const electron = require("electron");
var IpcChannel = /* @__PURE__ */ ((IpcChannel2) => {
  IpcChannel2["OpenMessagebox"] = "open-messagebox";
  IpcChannel2["ReadLocalfile"] = "read-localfile";
  return IpcChannel2;
})(IpcChannel || {});
const ipcMainHandle = {
  [IpcChannel.OpenMessagebox]: async (_, arg) => {
    return electron.dialog.showMessageBox(arg);
  },
  [IpcChannel.ReadLocalfile]: async (_, arg) => {
    return electron.dialog.showOpenDialog({
      title: "选择文件",
      properties: ["openFile", "openDirectory"],
      ...arg
    });
  }
};
function installIpcMain() {
  Object.entries(ipcMainHandle).forEach(([ipcChannelName, ipcListener]) => {
    electron.ipcMain.handle(ipcChannelName, ipcListener);
  });
}
exports.installIpcMain = installIpcMain;

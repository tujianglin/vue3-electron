import { dialog, ipcMain } from 'electron';
import { IpcChannel } from '../config/ipc';

const ipcMainHandle = {
  [IpcChannel.OpenMessagebox]: async (_, arg) => {
    return dialog.showMessageBox(arg);
  },
  [IpcChannel.ReadLocalfile]: async (_, arg) => {
    return dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile', 'openDirectory'],
      ...arg,
    });
  },
};

export function installIpcMain() {
  Object.entries(ipcMainHandle).forEach(([ipcChannelName, ipcListener]) => {
    ipcMain.handle(ipcChannelName, ipcListener);
  });
}

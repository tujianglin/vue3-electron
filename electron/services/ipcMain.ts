import { dialog, ipcMain } from 'electron';
import { IpcChannel } from '../config/ipc';

const ipcMainHandle = {
  [IpcChannel.OpenMessagebox]: async (_, arg) => {
    return dialog.showMessageBox({
      type: arg.type || 'info',
      title: arg.title || '',
      buttons: arg.buttons || [],
      message: arg.message || '',
      noLink: arg.noLink || true,
    });
  },
};

export function installIpcMain() {
  Object.entries(ipcMainHandle).forEach(([ipcChannelName, ipcListener]) => {
    ipcMain.handle(ipcChannelName, ipcListener);
  });
}

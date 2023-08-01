import { app, BrowserWindow, session } from 'electron';
import { join } from 'path';
import os from 'os';

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 2056,
    height: 1329,
    title: 'Main window',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (process.env.NODE_ENV === 'development') {
    const vueDevToolsPath = join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_1');
    session.defaultSession.loadExtension(vueDevToolsPath);
    win.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile('dist/index.html');
  }
});

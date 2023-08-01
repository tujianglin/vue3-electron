import { app, BrowserWindow } from 'electron';

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
  // if (process.env.VITE_DEV_SERVER_URL) {
  //   win.loadURL(process.env.VITE_DEV_SERVER_URL)
  // } else {
  //   win.loadFile('dist/index.html')
  // }
  win.loadURL('http://192.168.3.114');
});

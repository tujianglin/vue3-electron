"use strict";
const electron = require("electron");
const path = require("path");
const os = require("os");
electron.app.whenReady().then(() => {
  const win = new electron.BrowserWindow({
    width: 2056,
    height: 1329,
    title: "Main window",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (process.env.NODE_ENV === "development") {
    const vueDevToolsPath = path.join(os.homedir(), "/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_1");
    electron.session.defaultSession.loadExtension(vueDevToolsPath);
    win.webContents.openDevTools();
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile("dist/index.html");
  }
});

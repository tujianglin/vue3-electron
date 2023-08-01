import { BrowserWindow, Menu, session } from 'electron';
import menuconfig from '../config/menu';
import { join } from 'path';
import { homedir } from 'os';

export class MainInit {
  constructor() {
    if (import.meta.env.DEV) {
      menuconfig.push({
        label: '开发者设置',
        submenu: [
          {
            label: '切换到开发者模式',
            accelerator: 'CmdOrCtrl+I',
            role: 'toggledevtools',
          },
        ],
      });
    }
  }
  /* 创建窗口函数 */
  createMainWindow() {
    const menu = Menu.buildFromTemplate(menuconfig as any);
    // 加载模板
    Menu.setApplicationMenu(menu);
  }
  /* 加载窗口 */
  loadingWindow() {
    const win = new BrowserWindow({
      width: 2056,
      height: 1329,
      title: 'Main window',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    // 开发环境安装vueTool插件
    if (import.meta.env.DEV) {
      // mac 环境
      const vueDevToolsPath = join(homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_1');
      session.defaultSession.loadExtension(vueDevToolsPath);
      win.webContents.openDevTools();
    }
    if (process.env.VITE_DEV_SERVER_URL) {
      win.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
      win.loadFile('dist/index.html');
    }
    setTimeout(() => {
      this.createMainWindow();
    }, 1500);
  }
  /* 初始化窗口 */
  initWindow() {
    this.loadingWindow();
  }
}

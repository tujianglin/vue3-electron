import { BrowserWindow, Menu, app, dialog, session } from 'electron';
import { join } from 'path';
import { homedir } from 'os';
import menuconfig from '../config/menu';
import { installIpcMain } from './ipcMain';

export class MainInit {
  public loadWindow: BrowserWindow = null;
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
    // 启动协议
    installIpcMain();
  }
  /* 创建窗口函数 */
  createMainWindow() {
    const menu = Menu.buildFromTemplate(menuconfig as any);
    // 加载模板
    Menu.setApplicationMenu(menu);
    app.on('render-process-gone', (_, _1, details) => {
      const message = {
        title: '',
        buttons: [],
        message: '',
      };
      switch (details.reason) {
        case 'crashed':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '图形化进程崩溃，是否进行软重启操作？';
          break;
        case 'killed':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '由于未知原因导致图形化进程被终止，是否进行软重启操作？';
          break;
        case 'oom':
          message.title = '警告';
          message.buttons = ['确定', '退出'];
          message.message = '内存不足，是否软重启释放内存？';
          break;
        default:
          break;
      }
      dialog
        .showMessageBox(this.loadWindow, {
          type: 'warning',
          noLink: true,
          ...message,
        })
        .then((res) => {
          if (res.response === 0) this.loadWindow.reload();
          else this.loadWindow.close();
        });
    });
  }
  /* 加载窗口 */
  loadingWindow() {
    this.loadWindow = new BrowserWindow({
      width: 3456,
      height: 2234,
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
      this.loadWindow.webContents.toggleDevTools();
    }
    if (process.env.VITE_DEV_SERVER_URL) {
      this.loadWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
      this.loadWindow.loadFile('dist/index.html');
    }
    setTimeout(() => {
      this.createMainWindow();
    }, 100);
  }
  /* 初始化窗口 */
  initWindow() {
    this.loadingWindow();
  }
}

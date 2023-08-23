'use strict';
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => (key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : (obj[key] = value));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
  return value;
};
const electron = require('electron');
const path = require('path');
const os = require('os');
const name = 'my-vue-app';
const version = '0.0.0';
const main = 'dist-electron/main.js';
const scripts = {
  dev: 'vite',
  build: 'vue-tsc && vite build',
  'build:mac': 'vue-tsc && vite build && electron-builder --mac',
  'build:win': 'vue-tsc && vite build && electron-builder --win --x64',
  preview: 'vite preview',
  'lint:eslint': 'eslint --cache --max-warnings 0  "{src,mock}/**/*.{vue,ts,tsx}" --fix',
  'lint:prettier': 'prettier --write  "src/**/*.{js,json,tsx,css,less,scss,vue,html,md}"',
  'lint:stylelint': 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
  prepare: 'husky install',
  'lint:lint-staged': 'lint-staged',
  log: 'conventional-changelog -p angular -i CHANGELOG.md -s',
};
const dependencies = {
  '@ant-design/icons-vue': '^6.1.0',
  '@ckpack/vue-color': '^1.5.0',
  '@types/three': '^0.155.1',
  'ant-design-vue': '^4.0.1',
  dayjs: '^1.11.9',
  pinia: '^2.1.6',
  three: '^0.155.0',
  vue: '^3.2.47',
  'vue-i18n': '^9.2.2',
  'vue-router': '^4.2.4',
};
const devDependencies = {
  '@babel/plugin-syntax-dynamic-import': '^7.8.3',
  '@commitlint/cli': '^17.6.7',
  '@commitlint/config-conventional': '^17.6.7',
  '@types/node': '^20.4.5',
  '@typescript-eslint/eslint-plugin': '^6.2.0',
  '@typescript-eslint/parser': '^6.2.0',
  '@vitejs/plugin-vue': '^4.1.0',
  '@vitejs/plugin-vue-jsx': '^3.0.1',
  'conventional-changelog-cli': '^3.0.0',
  'cz-conventional-changelog-zh': '^0.0.2',
  electron: '^25.3.2',
  'electron-builder': '^24.4.0',
  eslint: '^8.45.0',
  'eslint-config-prettier': '^8.8.0',
  'eslint-plugin-prettier': '^5.0.0',
  'eslint-plugin-vue': '^9.15.1',
  husky: '^8.0.3',
  less: '^4.2.0',
  'lint-staged': '^13.2.3',
  postcss: '^8.4.27',
  'postcss-html': '^1.5.0',
  prettier: '^3.0.0',
  sass: '^1.64.1',
  stylelint: '^15.10.2',
  'stylelint-config-html': '^1.1.0',
  'stylelint-config-recommended': '^13.0.0',
  'stylelint-config-recommended-scss': '^12.0.0',
  'stylelint-config-recommended-vue': '^1.5.0',
  'stylelint-config-standard': '^34.0.0',
  'stylelint-config-standard-scss': '^10.0.0',
  'stylelint-order': '^6.0.3',
  typescript: '^5.0.2',
  unocss: '^0.55.2',
  vite: '^4.3.9',
  'vite-plugin-electron': '^0.12.0',
  'vite-plugin-electron-renderer': '^0.14.5',
  'vite-plugin-html': '^3.2.0',
  'vite-plugin-vue-setup-extend': '^0.4.0',
  'vue-eslint-parser': '^9.3.1',
  'vue-tsc': '^1.4.2',
};
const config = {
  commitizen: {
    path: './node_modules/cz-conventional-changelog-zh',
  },
};
const build = {
  appId: 'your.app.id',
  productName: 'Your App Name',
  directories: {
    output: 'release',
  },
  mac: {
    category: 'your.app.category',
  },
  win: {
    target: 'nsis',
  },
  nsis: {
    oneClick: false,
    perMachine: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Your App Name',
  },
};
const pkg = {
  name,
  private: true,
  version,
  main,
  scripts,
  dependencies,
  devDependencies,
  config,
  'lint-staged': {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
    'package.json': ['prettier --write'],
    '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
    '*.{scss,less,styl}': ['stylelint --fix', 'prettier --write'],
    '*.md': ['prettier --write'],
  },
  build,
};
const menu = [
  {
    label: '设置',
    submenu: [
      {
        label: '快速重启',
        accelerator: 'CmdOrCtrl+R',
        role: 'reload',
      },
      {
        label: '退出',
        accelerator: 'CmdOrCtrl+F4',
        role: 'close',
      },
    ],
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
      },
      {
        label: '黏贴',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:',
      },
    ],
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        click: () => {
          info();
        },
      },
    ],
  },
];
function info() {
  electron.dialog.showMessageBox({
    title: '关于',
    type: 'info',
    message: 'electron-Vue框架',
    detail: `版本信息：${pkg.version}
引擎版本：${process.versions.v8}
当前系统：${os.type()} ${os.arch()} ${os.release()}`,
    noLink: true,
    buttons: ['查看github', '确定'],
  });
}
var IpcChannel = /* @__PURE__ */ ((IpcChannel2) => {
  IpcChannel2['OpenMessagebox'] = 'open-messagebox';
  IpcChannel2['ReadLocalfile'] = 'read-localfile';
  return IpcChannel2;
})(IpcChannel || {});
const ipcMainHandle = {
  [IpcChannel.OpenMessagebox]: async (_, arg) => {
    return electron.dialog.showMessageBox(arg);
  },
  [IpcChannel.ReadLocalfile]: async (_, arg) => {
    return electron.dialog.showOpenDialog({
      title: '选择文件',
      properties: ['openFile', 'openDirectory'],
      ...arg,
    });
  },
};
function installIpcMain() {
  Object.entries(ipcMainHandle).forEach(([ipcChannelName, ipcListener]) => {
    electron.ipcMain.handle(ipcChannelName, ipcListener);
  });
}
class MainInit {
  constructor() {
    __publicField(this, 'loadWindow', null);
    {
      menu.push({
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
    installIpcMain();
  }
  /* 创建窗口函数 */
  createMainWindow() {
    const menu$1 = electron.Menu.buildFromTemplate(menu);
    electron.Menu.setApplicationMenu(menu$1);
    electron.app.on('render-process-gone', (_, _1, details) => {
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
      }
      electron.dialog
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
    this.loadWindow = new electron.BrowserWindow({
      width: 3456,
      height: 2234,
      title: 'Main window',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    {
      const vueDevToolsPath = path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/6.5.0_1');
      electron.session.defaultSession.loadExtension(vueDevToolsPath);
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
electron.app.whenReady().then(() => {
  new MainInit().initWindow();
});

'use strict';
var u = Object.defineProperty;
var d = (t, e, s) => (e in t ? u(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (t[e] = s));
var l = (t, e, s) => (d(t, typeof e != 'symbol' ? e + '' : e, s), s);
const i = require('electron');
require('path');
const o = require('os'),
  p = 'my-vue-app',
  g = '0.0.0',
  m = 'dist-electron/main.js',
  v = {
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
  },
  h = { dayjs: '^1.11.9', 'element-plus': '^2.3.8', vue: '^3.2.47', 'vue-i18n': '^9.2.2', 'vue-router': '^4.2.4' },
  w = {
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
    vite: '^4.3.9',
    'vite-plugin-electron': '^0.12.0',
    'vite-plugin-electron-renderer': '^0.14.5',
    'vite-plugin-html': '^3.2.0',
    'vite-plugin-vue-setup-extend': '^0.4.0',
    'vue-eslint-parser': '^9.3.1',
    'vue-tsc': '^1.4.2',
  },
  b = { commitizen: { path: './node_modules/cz-conventional-changelog-zh' } },
  y = {
    appId: 'your.app.id',
    productName: 'Your App Name',
    directories: { output: 'release' },
    mac: { category: 'your.app.category' },
    win: { target: 'nsis' },
    nsis: { oneClick: !1, perMachine: !0, allowElevation: !0, allowToChangeInstallationDirectory: !0, createDesktopShortcut: !0, createStartMenuShortcut: !0, shortcutName: 'Your App Name' },
  },
  f = {
    name: p,
    private: !0,
    version: g,
    main: m,
    scripts: v,
    dependencies: h,
    devDependencies: w,
    config: b,
    'lint-staged': {
      '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
      '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
      'package.json': ['prettier --write'],
      '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
      '*.{scss,less,styl}': ['stylelint --fix', 'prettier --write'],
      '*.md': ['prettier --write'],
    },
    build: y,
  },
  x = [
    {
      label: '设置',
      submenu: [
        { label: '快速重启', accelerator: 'F5', role: 'reload' },
        { label: '退出', accelerator: 'CmdOrCtrl+F4', role: 'close' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            k();
          },
        },
      ],
    },
  ];
function k() {
  i.dialog.showMessageBox({
    title: '关于',
    type: 'info',
    message: 'electron-Vue框架',
    detail: `版本信息：${f.version}
引擎版本：${process.versions.v8}
当前系统：${o.type()} ${o.arch()} ${o.release()}`,
    noLink: !0,
    buttons: ['查看github', '确定'],
  });
}
var r = ((t) => ((t.OpenMessagebox = 'open-messagebox'), t))(r || {});
const M = { [r.OpenMessagebox]: async (t, e) => i.dialog.showMessageBox({ type: e.type || 'info', title: e.title || '', buttons: e.buttons || [], message: e.message || '', noLink: e.noLink || !0 }) };
function W() {
  Object.entries(M).forEach(([t, e]) => {
    i.ipcMain.handle(t, e);
  });
}
class j {
  constructor() {
    l(this, 'loadWindow', null);
    W();
  }
  createMainWindow() {
    const e = i.Menu.buildFromTemplate(x);
    i.Menu.setApplicationMenu(e),
      i.app.on('render-process-gone', (s, E, a) => {
        const n = { title: '', buttons: [], message: '' };
        switch (a.reason) {
          case 'crashed':
            (n.title = '警告'), (n.buttons = ['确定', '退出']), (n.message = '图形化进程崩溃，是否进行软重启操作？');
            break;
          case 'killed':
            (n.title = '警告'), (n.buttons = ['确定', '退出']), (n.message = '由于未知原因导致图形化进程被终止，是否进行软重启操作？');
            break;
          case 'oom':
            (n.title = '警告'), (n.buttons = ['确定', '退出']), (n.message = '内存不足，是否软重启释放内存？');
            break;
        }
        i.dialog.showMessageBox(this.loadWindow, { type: 'warning', noLink: !0, ...n }).then((c) => {
          c.response === 0 ? this.loadWindow.reload() : this.loadWindow.close();
        });
      });
  }
  loadingWindow() {
    (this.loadWindow = new i.BrowserWindow({ width: 1920, height: 1080, title: 'Main window', webPreferences: { nodeIntegration: !0, contextIsolation: !1 } })),
      process.env.VITE_DEV_SERVER_URL ? this.loadWindow.loadURL(process.env.VITE_DEV_SERVER_URL) : this.loadWindow.loadFile('dist/index.html'),
      setTimeout(() => {
        this.createMainWindow();
      }, 100);
  }
  initWindow() {
    this.loadingWindow();
  }
}
i.app.whenReady().then(() => {
  new j().initWindow();
});

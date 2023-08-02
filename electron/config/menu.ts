import { dialog } from 'electron';
import { type, arch, release } from 'os';
import pkg from '../../package.json';

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
  dialog.showMessageBox({
    title: '关于',
    type: 'info',
    message: 'electron-Vue框架',
    detail: `版本信息：${pkg.version}\n引擎版本：${process.versions.v8}\n当前系统：${type()} ${arch()} ${release()}`,
    noLink: true,
    buttons: ['查看github', '确定'],
  });
}

export default menu;

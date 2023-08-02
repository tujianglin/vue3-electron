import { readdirSync } from 'fs';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';

export function configElectronPlugin() {
  return [
    electron([
      {
        entry: 'electron/main.ts',
        vite: {
          build: {
            outDir: 'dist-electron',
          },
        },
      },
      {
        entry: readdirSync('./electron/config').map((i) => `electron/config/${i}`),
        vite: {
          build: {
            outDir: 'dist-electron/config',
          },
        },
      },
      {
        entry: readdirSync('./electron/services').map((i) => `electron/services/${i}`),
        vite: {
          build: {
            outDir: 'dist-electron/services',
          },
        },
      },
      {
        entry: readdirSync('./electron/utils').map((i) => `electron/utils/${i}`),
        vite: {
          build: {
            outDir: 'dist-electron/utils',
          },
        },
      },
    ]),
    renderer(),
  ];
}

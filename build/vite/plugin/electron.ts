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
        entry: ['electron/config/menu.ts'],
        vite: {
          build: {
            outDir: 'dist-electron/config',
          },
        },
      },
      {
        entry: ['electron/services/windowManager.ts'],
        vite: {
          build: {
            outDir: 'dist-electron/services',
          },
        },
      },
    ]),
    renderer(),
  ];
}

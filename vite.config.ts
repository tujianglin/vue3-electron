import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
export default defineConfig(({}) => {
  return {
    server: {
      port: 3400,
      host: true,
    },
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    build: {
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      electron({
        entry: 'electron/main.ts',
        vite: {
          build: {
            rollupOptions: {
              external: ['serialport', 'sqlite3'],
            },
          },
        },
      }),
      renderer(),
    ],
  };
});

import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import UnoCSS from 'unocss/vite';
import { configHtmlPlugin } from './plugin/html';
import { configElectronPlugin } from './plugin/electron';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx(), UnoCSS(), vueSetupExtend(), ...configElectronPlugin()];

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}

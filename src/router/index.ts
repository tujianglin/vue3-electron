import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import type { App } from 'vue';
import routeModuleList from './routes';

/**
 * 创建路由
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeModuleList as unknown as RouteRecordRaw[],
});

/**
 * 挂载路由
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}

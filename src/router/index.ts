import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import type { App } from 'vue';
import routeModuleList from './routes';

/**
 * 创建路由
 */
export const router = createRouter({
  history: createWebHistory(),
  routes: routeModuleList as unknown as RouteRecordRaw[],
});

/**
 * 挂载路由
 * @param app
 */
export function setupRouter(app: App<Element>) {
  app.use(router);
}

import type { Router } from 'vue-router';

/**
 * 路由 导航守卫方法
 * @param router
 */
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
}

/**
 * 处理页状态钩子
 * @param router
 * @returns
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();
  // 全局前置守卫
  router.beforeEach(async (to) => {
    // 页面已经加载，重新打开会更快，您不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    return true;
  });
  // 全局后置守卫
  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

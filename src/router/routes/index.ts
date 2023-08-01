import type { AppRouteModule } from '/@/router/types';

/**
 * 获取到模块里的参数
 */
const modules = import.meta.glob('./modules/*.ts', { eager: true });
const routeModuleList: AppRouteModule[] = [];
/**
 * 获取到每个模块的路径
 */
Object.keys(modules).forEach((key) => {
  const mod = (modules as Recordable)[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
export default routeModuleList;

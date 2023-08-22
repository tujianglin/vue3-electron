import type { AppRouteModule } from '/@/router/types';
const LAYOUT = () => import('/@/App.vue');
const Home: AppRouteModule[] = [
  {
    path: '/',
    name: '主程序模块功能',
    component: LAYOUT,
    redirect: '/home',
    meta: {
      title: '主程序模块功能',
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '首页',
        },
        component: () => import('/@/views/demo/index.vue'),
      },
      {
        path: 'editor',
        name: 'Editor',
        meta: {
          title: '首页',
        },
        component: () => import('/@/views/editor/index.vue'),
      },
    ],
  },
];

export default Home;

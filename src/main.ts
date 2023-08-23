import { createApp } from 'vue';
import App from './App.vue';
import '/@/design/index.scss';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupStore } from '/@/store';

import 'virtual:uno.css';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);
  setupRouterGuard(router);
  app.mount('#app');
}

bootstrap();

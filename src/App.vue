<script lang="tsx">
  import { ElConfigProvider } from 'element-plus';
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import 'dayjs/locale/zh-cn';
  export default defineComponent({
    setup() {
      return () => (
        <ElConfigProvider locale={zhCn}>
          <RouterView></RouterView>
        </ElConfigProvider>
      );
    },
  });
</script>
<style lang="scss">
  #app {
    overflow-y: auto;
    width: 100%;
    height: 100%;
  }
</style>

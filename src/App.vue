<script lang="tsx">
  import { ConfigProvider } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import 'dayjs/locale/zh-cn';
  export default defineComponent({
    setup() {
      return () => (
        <ConfigProvider locale={zhCN}>
          <RouterView></RouterView>
        </ConfigProvider>
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

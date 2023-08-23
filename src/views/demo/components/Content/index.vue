<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import renderModel from '../../renderModel';
  import { useModelStore } from '/@/store/modules/model';
  export default defineComponent({
    setup() {
      const modelStore = useModelStore();
      const model = ref<HTMLDivElement>();
      onMounted(async () => {
        const modelApi = new renderModel('#model');
        modelStore.modelApi = modelApi;
        await modelApi.init();
      });
      return () => (
        <Layout.Content>
          <div id="model" ref={model}></div>
        </Layout.Content>
      );
    },
  });
</script>
<style lang="less" scoped>
  #model {
    width: 100%;
    height: 100%;
  }
</style>

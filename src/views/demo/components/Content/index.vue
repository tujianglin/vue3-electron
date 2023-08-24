<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { Transform } from '../../utils/Transform';
  import { useModelStore } from '/@/store/modules/model';
  export default defineComponent({
    setup() {
      const modelStore = useModelStore();
      const model = ref<HTMLDivElement>();
      onMounted(async () => {
        const modelApi = new Transform();
        modelStore.modelApi = modelApi;
      });
      return () => (
        <Layout.Content>
          <div id="editor" ref={model}></div>
        </Layout.Content>
      );
    },
  });
</script>
<style lang="less" scoped>
  #editor {
    width: 100%;
    height: 100%;
  }
</style>

<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Layout, Upload, Button, UploadProps } from 'ant-design-vue';
  import ConfigPanel from './components/ConfigPanel/index.vue';
  import Content from './components/Content/index.vue';
  import { useModelStore } from '/@/store/modules/model';
  export default defineComponent({
    setup() {
      const modelStore = useModelStore();
      const customRequest: UploadProps['customRequest'] = async ({ file }) => {
        const filePath = URL.createObjectURL(file as Blob);
        const model = {
          filePath,
          fileType: 'glb',
        };
        try {
          const {} = await modelStore.modelApi.onSwitchModel(model);
          URL.revokeObjectURL(filePath);
        } catch {}
      };
      return () => (
        <Layout class="h-full">
          <Layout.Header class="!h-12"></Layout.Header>
          <Layout>
            <Layout.Sider width="300">
              <Upload customRequest={customRequest}>
                <Button>上传</Button>
              </Upload>
            </Layout.Sider>
            <Content></Content>
            <ConfigPanel></ConfigPanel>
          </Layout>
        </Layout>
      );
    },
  });
</script>
<style lang="less" scoped></style>

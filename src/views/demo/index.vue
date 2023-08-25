<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Layout, Upload, UploadProps, Button } from 'ant-design-vue';
  import ConfigPanel from './components/ConfigPanel/index.vue';
  import Content from './components/Content/index.vue';
  import { useEditorStore } from '/@/store/modules/editor';
  // import { LoadMolel } from './renderModel';
  export default defineComponent({
    setup() {
      const modelStore = useEditorStore();
      const customRequest: UploadProps['customRequest'] = async ({ file }) => {
        modelStore.loadApi.loadFile(file as Blob);
      };
      return () => (
        <Layout class="h-full">
          <Layout.Header class="!h-12"></Layout.Header>
          <Layout>
            <Layout.Sider width="300">
              <Upload
                customRequest={customRequest}
                v-slots={{
                  itemRender: () => <div></div>,
                }}
              >
                <Button>上传</Button>
              </Upload>
              <Button
                type={'primary'}
                onClick={() => {
                  modelStore.addModelApi.addBox();
                }}
              >
                正方体
              </Button>
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

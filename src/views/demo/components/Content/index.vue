<script lang="tsx">
  import { defineComponent, onMounted } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { Loader } from '../../utils/Loader';
  import { signleEditor } from '../../utils/Editor';
  import { EditorControls } from '../../utils/EditorControls';
  import { AddModel } from '../../utils/AddModel';
  import { AddLight } from '../../utils/AddLight';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      onMounted(() => {
        // 编辑器
        new signleEditor();
        // 控制器
        new EditorControls();
        // 加载
        const loadApi = new Loader();
        const modelApi = new AddModel();
        const lightApi = new AddLight();
        editorStore.loadApi = loadApi;
        editorStore.modelApi = modelApi;
        editorStore.lightApi = lightApi;
      });
      return () => (
        <Layout.Content>
          <div id="editor"></div>
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

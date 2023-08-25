<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { Loader } from '../../utils/Loader';
  import { Editor } from '../../utils/Editor';
  import { EditorControls } from '../../utils/EditorControls';
  import { AddModel } from '../../utils/AddModel';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const model = ref<HTMLDivElement>();
      onMounted(async () => {
        // 编辑器
        const editor = new Editor();
        // 控制器
        new EditorControls(editor);
        // 加载
        const loadApi = new Loader(editor);

        const addModelApi = new AddModel(editor);
        editorStore.loadApi = loadApi;
        editorStore.addModelApi = addModelApi;
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

<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { Loader } from '../../utils/Loader';
  import { Editor } from '../../utils/Editor';
  import { Viewport } from '../../utils/Viewport';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const model = ref<HTMLDivElement>();
      onMounted(async () => {
        // 编辑器
        const editor = new Editor();
        // 视图
        new Viewport(editor);
        // 加载
        const loadApi = new Loader(editor);
        editorStore.loadApi = loadApi;
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
../../utils/Viewport ../../../../store/modules/editor

<script lang="tsx">
  import { defineComponent } from 'vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { Button } from 'ant-design-vue';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const models = [{ label: '平行光', value: () => editorStore.lightApi.addDirectionalLight() }];
      return () => (
        <>
          {models.map((i) => (
            <Button onClick={i.value}> {i.label}</Button>
          ))}
        </>
      );
    },
  });
</script>
<style lang="less" scoped></style>

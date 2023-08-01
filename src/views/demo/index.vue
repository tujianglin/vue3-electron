<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElButton } from 'element-plus';
  export default defineComponent({
    setup() {
      return () => (
        <ElButton type={'danger'} onClick={() => process.crash()}>
          模拟崩溃
        </ElButton>
      );
    },
  });
</script>
<style lang="less" scoped></style>

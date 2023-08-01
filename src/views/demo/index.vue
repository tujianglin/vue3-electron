<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElButton } from 'element-plus';
  export default defineComponent({
    setup() {
      return () => <ElButton type={'danger'}>111</ElButton>;
    },
  });
</script>
<style lang="less" scoped></style>

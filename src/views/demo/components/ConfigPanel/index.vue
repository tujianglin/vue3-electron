<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  export default defineComponent({
    setup() {
      return () => <Layout.Sider width="380"></Layout.Sider>;
    },
  });
</script>
<style lang="less" scoped></style>

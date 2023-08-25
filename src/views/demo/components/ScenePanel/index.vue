<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import Model from './components/Model.vue';
  import Light from './components/Light.vue';
  export default defineComponent({
    setup() {
      return () => (
        <Tabs centered>
          <TabPane key="model" tab="模型">
            <Model></Model>
          </TabPane>
          <TabPane key="light" tab="灯光">
            <Light></Light>
          </TabPane>
          <TabPane key="camera" tab="相机">
            相机
          </TabPane>
        </Tabs>
      );
    },
  });
</script>
<style lang="less" scoped></style>

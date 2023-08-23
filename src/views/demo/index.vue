<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { ColorPicker } from '/@/components';
  export default defineComponent({
    setup() {
      const color = ref('#000000');
      return () => (
        <div>
          <ColorPicker v-model:value={color.value}></ColorPicker>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>

<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue';
  import { Popover, Button } from 'ant-design-vue';
  import { Chrome } from '@ckpack/vue-color';

  export default defineComponent({
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const color = ref(props.value);
      const colorValue = ref(props.value);
      watch(color, (val: any) => {
        try {
          colorValue.value = `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a})`;
        } catch {}
      });
      return () => (
        <Popover overlayClassName="color-picker" trigger={'click'} placement="bottomLeft" v-slots={{ content: () => <Chrome v-model={color.value}></Chrome> }}>
          <Button style={{ backgroundColor: colorValue.value }} class="w-20"></Button>
        </Popover>
      );
    },
  });
</script>
<style lang="less">
  .color-picker {
    padding-top: 0;
    .ant-popover-inner {
      padding: 0;
    }
    .ant-popover-arrow {
      display: none;
    }
  }
</style>

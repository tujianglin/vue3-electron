<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElButton } from 'element-plus';
  import { invoke } from '/~/utils/ipcRenderer';
  import { IpcChannel } from '/~/config/ipc';
  export default defineComponent({
    setup() {
      const rendLocalFile = async () => {
        invoke(IpcChannel.OpenMessagebox, {
          type: 'info',
          buttons: [],
          message: '111',
        });
      };
      return () => (
        <div>
          <ElButton type={'danger'} onClick={() => process.crash()}>
            模拟崩溃
          </ElButton>
          <ElButton type={'danger'} onClick={rendLocalFile}>
            读取本地文件
          </ElButton>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
../../../electron/utils/ipcRenderer

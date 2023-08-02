<script lang="tsx">
  import { defineComponent, reactive } from 'vue';
  import { ElButton } from 'element-plus';
  import { invoke } from '/~/utils/ipcRenderer';
  import { IpcChannel } from '/~/config/ipc';
  import { readFile } from 'fs';
  export default defineComponent({
    setup() {
      const fileState = reactive({
        suffix: '',
        value: '',
      });
      const image = ['jpg', 'png', 'gif', 'svg', 'jpeg'];
      const video = ['mp4'];
      const openMainMessage = async () => {
        invoke(IpcChannel.OpenMessagebox, {
          type: 'info',
          buttons: [],
          message: '111',
        });
      };
      const readFiles = async () => {
        const files = await invoke(IpcChannel.ReadLocalfile, {});
        if (files.canceled) return;
        const path = files.filePaths[0];
        readFile(path, (err, file) => {
          if (err) return;
          fileState.suffix = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
          // 图片和视频生成地址
          if (image.includes(fileState.suffix) || video.includes(fileState.suffix)) {
            fileState.value = URL.createObjectURL(new Blob([file]));
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              fileState.value = reader.result as string;
            };
            reader.readAsText(new Blob([file], { type: 'text/utf-8' }));
          }
        });
      };
      const previewFile = () => {
        if (image.includes(fileState.suffix)) return <img src={fileState.value} alt="" />;
        if (video.includes(fileState.suffix))
          return (
            <video controls autoplay>
              <source src={fileState.value} />
            </video>
          );
        else return <pre>{fileState.value}</pre>;
      };
      return () => (
        <div>
          <ElButton onClick={() => process.crash()}>模拟崩溃</ElButton>
          <ElButton onClick={openMainMessage}>系统提示框</ElButton>
          <ElButton onClick={readFiles}>选择文件</ElButton>
          <div class="preview">{previewFile()}</div>
        </div>
      );
    },
  });
</script>
<style lang="scss" scoped>
  .preview {
    overflow: auto;
    width: 400px;
    height: 400px;

    img,
    video {
      width: 100%;
      height: 100%;
    }
  }
</style>

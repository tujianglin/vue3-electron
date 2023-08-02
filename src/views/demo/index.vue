<script lang="tsx">
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue';
  import { ElButton } from 'element-plus';
  // import { invoke } from '/~/utils/ipcRenderer';
  // import { IpcChannel } from '/~/config/ipc';
  import { readFile, readdir } from 'fs';
  import { join } from 'path';
  import { homedir } from 'os';
  export default defineComponent({
    setup() {
      const fileState = reactive({
        suffix: '',
        value: '',
      });
      const rootdir = ref(['/Desktop']);
      const filterFiles = ref();
      const image = ['jpg', 'png', 'gif', 'svg', 'jpeg'];
      const video = ['mp4'];
      // const openMainMessage = async () => {
      //   invoke(IpcChannel.OpenMessagebox, {
      //     type: 'info',
      //     buttons: [],
      //     message: '111',
      //   });
      // };
      // const readFiles = async () => {
      //   const files = await invoke(IpcChannel.ReadLocalfile, {});
      //   if (files.canceled) return;
      //   const path = files.filePaths[0];
      //   readFile(path, (err, file) => {
      //     if (err) return;
      //     fileState.suffix = path.slice(path.lastIndexOf('.') + 1).toLowerCase();
      //     // 图片和视频生成地址
      //     if (image.includes(fileState.suffix) || video.includes(fileState.suffix)) {
      //       fileState.value = URL.createObjectURL(new Blob([file]));
      //     } else {
      //       const reader = new FileReader();
      //       reader.onload = () => {
      //         fileState.value = reader.result as string;
      //       };
      //       reader.readAsText(new Blob([file], { type: 'text/utf-8' }));
      //     }
      //   });
      // };
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
      onMounted(() => {
        nextFolder();
      });
      const nextFolder = () => {
        const path = join(homedir(), rootdir.value.join(''));
        readdir(path, { withFileTypes: true }, (err, files) => {
          if (err) return;
          filterFiles.value = files.filter((file) => !file.name.startsWith('.'));
        });
      };
      watch(
        () => rootdir.value,
        (val) => {
          console.log(val);
        },
        {
          deep: true,
        },
      );
      const handleDblclick = (i) => {
        if (i.isFile()) {
          const path = join(homedir(), `${rootdir.value.join('')}/${i.name}`);
          console.log(path);
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
          previewFile();
        } else {
          rootdir.value.push(`/${i.name}`);
          nextFolder();
        }
      };
      const prevFolder = () => {
        rootdir.value.pop();
        nextFolder();
      };
      return () => (
        <div>
          {/* <ElButton onClick={() => process.crash()}>模拟崩溃</ElButton>
          <ElButton onClick={openMainMessage}>系统提示框</ElButton>
          <ElButton onClick={readFiles}>选择文件</ElButton> */}
          <ElButton disabled={rootdir.value.length <= 1} type={'primary'} onClick={prevFolder}>
            上一级
          </ElButton>
          <div class="preview-box">
            <div class="left">
              {filterFiles.value?.map((i) => (
                <div class="folder" onDblclick={() => handleDblclick(i)}>
                  <span class="label">{i.isFile() ? '文件' : '文件夹'}</span>
                  {i.name}
                </div>
              ))}
            </div>
            <div class="preview">{previewFile()}</div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="scss" scoped>
  .preview-box {
    display: flex;

    .left {
      margin-right: 8px;
    }
  }

  .folder {
    margin-bottom: 8px;
    padding: 4px;
    width: 300px;
    border: 1px solid blue;
    cursor: pointer;

    .label {
      margin-right: 8px;
    }
  }

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

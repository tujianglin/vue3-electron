import { defineStore } from 'pinia';
import { Loader } from '/@/views/demo/utils/Loader';

interface EditorState {
  loadApi: Loader;
}

export const useEditorStore = defineStore('editor', {
  state: () =>
    <EditorState>{
      loadApi: {},
    },
});

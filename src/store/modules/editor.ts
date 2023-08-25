import { defineStore } from 'pinia';
import { Loader } from '/@/views/demo/utils/Loader';
import { AddModel } from '/@/views/demo/utils/AddModel';

interface EditorState {
  loadApi: Loader;
  addModelApi: AddModel;
}

export const useEditorStore = defineStore('editor', {
  state: () =>
    <EditorState>{
      loadApi: {},
      addModelApi: {},
    },
});

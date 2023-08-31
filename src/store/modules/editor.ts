import { defineStore } from 'pinia';
import { Loader } from '/@/views/demo/utils/Loader';
import { AddModel } from '/@/views/demo/utils/AddModel';
import { AddLight } from '/@/views/demo/utils/AddLight';

interface EditorState {
  loadApi: Loader;
  modelApi: AddModel;
  lightApi: AddLight;
}

export const useEditorStore = defineStore('editor', {
  state: () => <EditorState>{},
});

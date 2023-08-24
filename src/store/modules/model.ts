import { defineStore } from 'pinia';
import { Editor } from '../../views/demo/utils/Editor';

interface UseModelStore {
  modelApi: Editor;
}

export const useModelStore = defineStore('model', {
  state: () =>
    <UseModelStore>{
      modelApi: {},
    },
});

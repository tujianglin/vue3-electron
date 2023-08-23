import { defineStore } from 'pinia';
import renderModel from '/@/views/demo/renderModel';

interface UseModelStore {
  modelApi: renderModel;
}

export const useModelStore = defineStore('model', {
  state: () =>
    <UseModelStore>{
      modelApi: {},
    },
});

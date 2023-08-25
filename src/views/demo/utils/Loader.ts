import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Editor } from './Editor';

// 文件支持上传类型
export type FileLoadType = 'glb' | 'gltf' | 'fbx' | 'obj';

export type FileLoadMap = {
  glb: GLTFLoader;
  gltf: GLTFLoader;
  fbx: FBXLoader;
  obj: OBJLoader;
};

class Loader {
  editor: Editor;
  // 支持文件加载类型
  fileLoaderMap: FileLoadMap = {
    glb: new GLTFLoader(),
    gltf: new GLTFLoader(),
    fbx: new FBXLoader(),
    obj: new OBJLoader(),
  };
  constructor(editor) {
    this.editor = editor;
  }
  loadFile(file: Blob) {
    let object: THREE.Object3D;
    const filename = file.name;
    const fileType = filename.split('.').pop().toLowerCase() as FileLoadType;
    const filePath = URL.createObjectURL(file);
    const loader = this.fileLoaderMap[fileType];
    loader.load(filePath, (res) => {
      switch (fileType) {
        case 'glb':
          object = res.scene;
          break;
        default:
          break;
      }
      this.setModelPositionSize(object);
      this.editor.scene.add(object);
    });
  }
  setModelPositionSize(object: THREE.Object3D) {
    object.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // 计算缩放比例
    const maxSize = Math.max(size.x, size.y, size.z);
    const targetSize = 2.5; // 目标大小
    const scale = targetSize / (maxSize > 1 ? maxSize : 0.5);
    object.scale.set(scale, scale, scale);
    this.editor.camera.position.set(0, 2, 6);
    this.editor.camera.lookAt(center);
    this.editor.camera.updateProjectionMatrix();
  }
}

export { Loader };

import * as THREE from 'three';
import { Editor } from './Editor';

class AddModel {
  editor: Editor;
  constructor(editor) {
    this.editor = editor;
  }
  addBox() {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = '正方体';
    this.addObject(mesh);
  }
  addObject(object: THREE.Object3D) {
    object.traverse((child) => {
      console.log(child);
    });
    this.editor.scene.add(object);
  }
}
export { AddModel };

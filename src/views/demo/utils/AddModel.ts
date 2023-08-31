import * as THREE from 'three';
import { signleEditor } from './Editor';

class AddModel extends signleEditor {
  constructor() {
    super();
  }
  addBox = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = '正方体';
    this.addObject(mesh);
  };
}
export { AddModel };

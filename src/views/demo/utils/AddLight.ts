import * as THREE from 'three';
import { signleEditor } from './Editor';

class AddLight extends signleEditor {
  constructor() {
    super();
  }
  addDirectionalLight = () => {
    const light = new THREE.DirectionalLight(0xff0000, 1);
    light.name = '平行光';
    light.position.set(1, 3, 0);
    this.addObject(light);
  };
}
export { AddLight };

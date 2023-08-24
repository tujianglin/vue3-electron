import * as THREE from 'three';
import { ViewHelper } from 'three/examples/jsm/helpers/ViewHelper';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Editor } from './Editor';

class Viewport extends Editor {
  renderer: THREE.WebGLRenderer;
  viewHelper: ViewHelper;
  controls: OrbitControls;
  transformControls: TransformControls;
  constructor() {
    super();
    // this.viewHelper = new ViewHelper(this.camera, this.container);
    const grid = new THREE.Group();
    const grid1 = new THREE.GridHelper(30, 30, 0x888888);
    grid1.material.color.setHex(0x888888);
    grid1.material.vertexColors = false;
    grid1.rotateZ(0.5);
    grid.add(grid1);
    this.scene.add(grid);
    this.initRender();
    this.initOrbitControls();
    this.render();
  }
  /**
   * 初始化渲染器
   */
  initRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 抗锯齿
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 渲染尺寸大小
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight);
    this.container.appendChild(this.renderer.domElement);
  }
  /**
   * 初始化变换控制器
   */
  initTransformControls() {
    this.transformControls = new TransformControls(this.camera, this.container);
    // this.sceneHelpers.add(this.transformControls);
  }
  /**
   * 初始化轨道控制器
   */
  initOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
  }
  render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.renderer.autoClear = false;
    // this.renderer.render(this.sceneHelpers, this.camera);
    this.renderer.autoClear = true;
  };
}

export { Viewport };

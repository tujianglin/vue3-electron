import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { signleton } from '/@/utils/singleton';

class Editor {
  // 容器
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  // 相机
  camera: THREE.PerspectiveCamera;
  cameras: {};
  // 场景
  scene = new THREE.Scene();
  // 辅助场景
  sceneHelpers = new THREE.Scene();
  helpers = {};
  // 控制器
  controls: OrbitControls;
  transformControls: TransformControls;
  splineHelperObjects = [];
  constructor() {
    this.container = document.querySelector('#editor');
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initLight();
    this.initGridHelper();
    this.initControls();
    this.render();
    // 自适应屏幕
    this.onWindowResize();
    this.onKeyDown();
    console.log(this);
  }
  /**
   * 渲染器
   */
  initRenderer() {
    const { clientWidth, clientHeight } = this.container;
    // 抗锯齿
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染尺寸
    this.renderer.setSize(clientWidth, clientHeight);
    this.container.appendChild(this.renderer.domElement);
  }
  /**
   * 场景
   */
  initScene() {
    // this.scene.background = new THREE.Color(0x000000);
  }
  /**
   * 相机
   */
  initCamera() {
    const { clientWidth, clientHeight } = this.container;
    this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.01, 1000);
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(new THREE.Vector3());
  }
  /**
   * 灯光
   */
  initLight() {
    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
    // 平行光
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(1, 1, 1);
    this.scene.add(light);
  }
  /**
   * 控制器
   */
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.controls.addEventListener('change', this.render);
  }
  /**
   * 辅助网格
   */
  initGridHelper() {
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    this.sceneHelpers.add(gridHelper);
  }
  /**
   * 键盘事件
   */
  onKeyDown() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.keyCode) {
        case 81: // Q
          this.transformControls.setSpace(this.transformControls.space === 'local' ? 'world' : 'local');
          break;
        case 87: // W
          this.transformControls.setMode('translate');
          break;
        case 69: // E
          this.transformControls.setMode('rotate');
          break;
        case 82: // R
          this.transformControls.setMode('scale');
          break;
        default:
          break;
      }
    });
  }
  /**
   * 屏幕缩放事件
   */
  onWindowResize() {
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = this.container;
      this.camera.aspect = clientWidth / clientHeight;
      // 相机更新矩阵，将3d内容投射到2d面上转换
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(clientWidth, clientHeight);
      this.render();
    });
  }
  addObject = (object: THREE.Object3D) => {
    object.traverse((child) => {
      this.addHelper(child);
    });
    this.scene.add(object);
  };
  addHelper = (object, helper?) => {
    const geometry = new THREE.SphereGeometry(2, 4, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false });
    if (!helper) {
      if ((object as THREE.DirectionalLight).isDirectionalLight) {
        helper = new THREE.DirectionalLightHelper(object, 1);
      }
      const picker = new THREE.Mesh(geometry, material);
      picker.name = 'picker';
      picker.userData.object = object;
      console.log(helper);
      helper?.add(picker);
    }
    this.sceneHelpers.add(helper);
    this.helpers[object.id] = helper;
    // console.log(camera);
    // this.editor.cameras[camera.uuid] = camera;
  };
  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    this.renderer.autoClear = false;
    this.renderer.render(this.sceneHelpers, this.camera);
    this.renderer.autoClear = true;
  };
}

const signleEditor = signleton<Editor>(Editor);

export { Editor, signleEditor };

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class Editor {
  // 容器
  container: HTMLElement;
  renderer: THREE.WebGLRenderer;
  // 相机
  camera: THREE.PerspectiveCamera;
  // 场景
  scene = new THREE.Scene();
  // 辅助场景
  sceneHelpers = new THREE.Scene();
  // 控制器
  controls: OrbitControls;
  transformControls: TransformControls;
  cube: THREE.Object3D;
  splineHelperObjects = [];
  constructor() {
    this.container = document.querySelector('#editor');
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initLight();
    this.initGridHelper();
    this.initModel();
    this.initControls();
    // this.initTransformControls();
    this.render();

    // 自适应屏幕
    this.onWindowResize();
    this.onKeyDown();
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
    this.scene.background = new THREE.Color(0x000000);
  }
  /**
   * 相机
   */
  initCamera() {
    const { clientWidth, clientHeight } = this.container;
    this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.25, 100);
    this.camera.position.set(0, 5, 10);
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
   * 变换控制器
   */
  initTransformControls() {
    // 创建控制器
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    // 控制器变换
    this.transformControls.addEventListener('change', this.render);
    // 控制器拖拽事件
    this.transformControls.addEventListener('dragging-changed', (e) => {
      this.controls.enabled = !e.value;
    });
    // 将控制器加到模型上
    this.transformControls.attach(this.cube);
    // 将控制器放到场景中
    this.scene.add(this.transformControls);
  }
  /**
   * 辅助网格
   */
  initGridHelper() {
    const gridHelper = new THREE.GridHelper(10, 10, 0x888888, 0x444444);
    this.scene.add(gridHelper);
  }
  /**
   * 模型
   */
  initModel() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.castShadow = true;
    this.scene.add(this.cube);
    this.splineHelperObjects.push(this.cube);
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
  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };
}

export { Editor };

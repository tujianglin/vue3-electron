import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

interface LoadMolel {
  filePath?: string;
  fileType?: string;
  scale?: any;
  position?: any;
}

class renderModel {
  // 容器
  container: HTMLElement;
  // 渲染器
  renderer: THREE.WebGLRenderer;
  // 相机
  camera: THREE.PerspectiveCamera;
  // 场景
  scene: THREE.Scene;
  // 控制器
  controls: OrbitControls;
  // 模型
  model: any;
  // 支持文件加载类型
  fileLoaderMap = {
    glb: new GLTFLoader(),
    gltf: new GLTFLoader(),
    fbx: new FBXLoader(),
    obj: new OBJLoader(),
  };
  // 环境光
  ambientLight: THREE.AmbientLight;
  // 平行光
  directionalLight: THREE.DirectionalLight;
  // 平行光辅助线
  directionalLightHelper: THREE.DirectionalLightHelper;
  // 点光源
  pointLight: THREE.PointLight;
  // 点光源辅助线
  pointLightHelper: THREE.PointLightHelper;
  // 聚光灯
  spotLight: THREE.SpotLight;
  // 聚光灯辅助线
  spotLightHelper: THREE.SpotLightHelper;

  constructor(selector) {
    this.container = document.querySelector(selector);
  }
  init() {
    return new Promise(async (resolve) => {
      // 初始化渲染器
      this.initRender();
      // 初始化相机
      this.initCamera();
      // 初始化场景
      this.initScene();
      // 初始化控制器
      this.initControls();
      // 创建灯光
      this.createLight();
      // 监听场景大小
      this.onWindowResize();
      // 场景渲染
      this.sceneAnimation();
      resolve(true);
    });
  }
  /**
   * 初始化渲染器
   * @url https://threejs.org/docs/index.html?q=Render#api/zh/renderers/WebGLRenderer
   */
  initRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // 抗锯齿
    // 设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // 渲染尺寸大小
    const { clientWidth, clientHeight } = this.container;
    this.renderer.setSize(clientWidth, clientHeight);
    // 色调映射
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    // 曝光级别
    this.renderer.toneMappingExposure = 3;
    // 阴影贴图是否开启
    this.renderer.shadowMap.enabled = true;
    // 阴影贴图类型
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);
  }
  /**
   * 初始化相机
   * @url https://threejs.org/docs/index.html?q=PerspectiveCamera#api/zh/cameras/PerspectiveCamera
   */
  initCamera() {
    const { clientWidth, clientHeight } = this.container;
    this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.25, 100);
  }
  /**
   * 初始化场景
   * @url https://threejs.org/docs/index.html?q=Scene#api/zh/scenes/Scene
   */
  initScene() {
    this.scene = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.scene.environment = pmremGenerator.fromScene(room, 0.04).texture;
    this.scene.background = new THREE.Color(0xffffff);
  }
  /**
   * 初始化控制器
   * @url https://threejs.org/docs/index.html?q=OrbitControls#examples/en/controls/OrbitControls
   */
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enablePan = false;
  }
  /**
   * 创建灯光
   */
  createLight() {
    // 创建环境光
    this.ambientLight = new THREE.AmbientLight('#fff', 0.8);
    this.scene.add(this.ambientLight);
  }
  /**
   * 监听浏览器尺寸变化
   */
  onWindowResize() {
    window.addEventListener('resize', () => {
      const { clientWidth, clientHeight } = this.container;
      // 摄像机宽高比例
      this.camera.aspect = clientWidth / clientHeight;
      // 相机更新矩阵，将3d内容投射到2d面上转换
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(clientWidth, clientHeight);
    });
  }
  /**
   * 选择模型
   * @param model
   * @returns
   */
  onSwitchModel(model: LoadMolel) {
    return new Promise(async (resolve, reject) => {
      try {
        const load = await this.setModel(model);
        this.renderer.toneMappingExposure = 3;
        resolve({ load, filePath: model.filePath });
      } catch {
        reject();
      }
    });
  }
  /**
   * 加载模型
   * @param {Object}
   */
  setModel = ({ filePath, fileType, scale, position }: LoadMolel) => {
    return new Promise((resolve, reject) => {
      const loader = this.fileLoaderMap[fileType] as GLTFLoader;
      loader.load(
        filePath,
        (result) => {
          switch (fileType) {
            case 'glb':
              this.model = result.scene;
              break;
            default:
              break;
          }
          this.setModelPositionSize();
          //	设置模型大小
          if (scale) {
            this.model.scale.set(scale, scale, scale);
          }
          // 设置模型位置
          if (position) {
            const { x, y, z } = position;
            this.model.position.set(x, y, z);
          }
          this.scene.add(this.model);
          resolve(true);
        },
        () => {},
        () => {
          reject();
        },
      );
    });
  };
  /**
   * 设置模型位置大小
   */
  setModelPositionSize() {
    this.model.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(this.model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // 计算缩放比例
    const maxSize = Math.max(size.x, size.y, size.z);
    const targetSize = 2.5; // 目标大小
    const scale = targetSize / (maxSize > 1 ? maxSize : 0.5);
    this.model.scale.set(scale, scale, scale);
    this.camera.position.set(0, 2, 6);
    this.camera.lookAt(center);
    this.camera.updateProjectionMatrix();
  }
  /**
   * 场景渲染
   */
  sceneAnimation = () => {
    requestAnimationFrame(this.sceneAnimation);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}

export default renderModel;

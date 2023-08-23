import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

import { getAssetsFile } from '/@/utils';
import { fragmentShader, vertexShader } from '/@/config/constants';

type FileType = 'glb' | 'gltf' | 'fbx' | 'obj';

export interface LoadMolel {
  filePath?: string;
  fileType?: FileType;
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
  // 效果合成器
  effectComposer: EffectComposer;
  outlinePass: OutlinePass;
  // 辉光渲染器
  unrealBloomPass: UnrealBloomPass;
  glowComposer: EffectComposer;

  // 鼠标位置
  mouse = new THREE.Vector2();
  // 碰撞检测
  raycaster = new THREE.Raycaster();

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
      const load = await this.setModel({ filePath: getAssetsFile('7.glb'), fileType: 'glb' });
      // 创建效果合成器
      this.createEffectComposer();
      // 监听场景大小
      this.onWindowResize();
      // 场景渲染
      this.sceneAnimation();
      // 鼠标事件
      this.addEvenListMouseLiatener();
      resolve(load);
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
    // this.scene.add(this.ambientLight);
  }
  /**
   * 创建效果合成器
   * @url https://threejs.org/docs/index.html?q=EffectComposer#examples/zh/postprocessing/EffectComposer
   */
  createEffectComposer() {
    const { clientWidth, clientHeight } = this.container;
    this.effectComposer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(renderPass);
    this.outlinePass = new OutlinePass(new THREE.Vector2(clientWidth, clientHeight), this.scene, this.camera);
    this.outlinePass.visibleEdgeColor = new THREE.Color('#FF8C00'); // 可见边缘的颜色
    this.outlinePass.hiddenEdgeColor = new THREE.Color('#8a90f3'); // 不可见边缘的颜色
    this.outlinePass.edgeGlow = 2.0; // 发光强度
    this.outlinePass.edgeThickness = 1; // 边缘浓度
    this.outlinePass.edgeStrength = 4; // 边缘的强度，值越高边框范围越大
    this.outlinePass.pulsePeriod = 100; // 闪烁频率，值越大频率越低
    this.effectComposer.addPass(this.outlinePass);

    const effectFXAA = new ShaderPass(FXAAShader);
    const pixelRatio = this.renderer.getPixelRatio();
    effectFXAA.uniforms.resolution.value.set(1 / (clientWidth * pixelRatio), 1 / (clientHeight * pixelRatio));
    effectFXAA.renderToScreen = true;
    effectFXAA.needsSwap = true;
    this.effectComposer.addPass(effectFXAA);

    //创建辉光效果
    this.unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(clientWidth, clientHeight), 0, 0, 0);
    this.unrealBloomPass.threshold = 0;
    this.unrealBloomPass.strength = 0;
    this.unrealBloomPass.radius = 0;
    this.unrealBloomPass.renderToScreen = false;

    // 辉光合成器
    this.glowComposer = new EffectComposer(this.renderer);
    this.glowComposer.renderToScreen = false;
    this.glowComposer.addPass(new RenderPass(this.scene, this.camera));
    this.glowComposer.addPass(this.unrealBloomPass);

    // 着色器
    const shaderPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.glowComposer.renderTarget2.texture },
          tDiffuse: {
            value: null,
          },
        },
        vertexShader,
        fragmentShader,
        defines: {},
      }),
      'baseTexture',
    );
    shaderPass.renderToScreen = true;
    shaderPass.needsSwap = true;
    this.effectComposer.addPass(shaderPass);
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
    return new Promise<{ load: boolean; filePath: string }>(async (resolve, reject) => {
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
   * 鼠标点击模型
   */
  onMouseClickModel(e: MouseEvent) {
    const { clientHeight, clientWidth, offsetLeft, offsetTop } = this.container;
    console.log(e);
    this.mouse.x = ((e.clientX - offsetLeft) / clientWidth) * 2 - 1;
    this.mouse.y = -((e.clientY - offsetTop) / clientHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children).filter((item: any) => item.object.isMesh);
    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      this.outlinePass.selectedObjects = [intersectedObject];
    } else {
      this.outlinePass.selectedObjects = [];
    }
  }
  /**
   * 加载模型
   * @param {Object}
   */
  setModel = ({ filePath, fileType, scale, position }: LoadMolel) => {
    return new Promise<boolean>((resolve, reject) => {
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
    this.glowComposer.render();
    this.effectComposer.render();
  };
  /**
   * 鼠标事件
   */
  addEvenListMouseLiatener() {
    this.container.addEventListener('click', (e) => this.onMouseClickModel(e));
  }
}

export default renderModel;

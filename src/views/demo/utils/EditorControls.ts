import * as THREE from 'three';
import { signleEditor } from './Editor';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class EditorControls extends signleEditor {
  // 鼠标位置
  mouse = new THREE.Vector2();
  // 抬起位置
  onUpPosition = new THREE.Vector2();
  // 按下位置
  onDownPosition = new THREE.Vector2();
  // 碰撞检测
  raycaster = new THREE.Raycaster();
  box = new THREE.Box3();
  selectionBox = new THREE.Box3Helper(this.box);
  selected: THREE.Object3D;
  constructor() {
    super();
    this.selectionBox.visible = false;
    this.sceneHelpers.add(this.selectionBox);
    this.initTransformControls();
  }
  initTransformControls = () => {
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener('change', () => {
      const object = this.transformControls.object;
      if (object) {
        this.box.setFromObject(object, true);
        const helper = this.helpers[object.id];
        console.log(this.helpers, object.id);
        if (helper && !helper.isSkeletonHelper) {
          helper.update();
        }
      }
      this.render();
    });
    this.transformControls.addEventListener('dragging-changed', (e) => {
      this.controls.enabled = !e.value;
    });
    this.sceneHelpers.add(this.transformControls);
    // 鼠标点击事件
    this.container.addEventListener('mousedown', this.onMousedown);
  };
  /**
   * 鼠标按下
   * @param e
   * @returns
   */
  onMousedown = (e: MouseEvent) => {
    if (e.target !== this.renderer.domElement) return;
    const array = this.getMousePosition(e.clientX, e.clientY);
    this.onDownPosition.fromArray(array);
    document.addEventListener('mouseup', this.onMouseup);
  };
  /**
   * 鼠标抬起
   * @param e
   */
  onMouseup = (e: MouseEvent) => {
    const array = this.getMousePosition(e.clientX, e.clientY);
    this.onUpPosition.fromArray(array);
    this.handleClick();
    document.addEventListener('mouseup', this.onMouseup);
  };
  /**
   * 点击事件
   */
  handleClick = () => {
    if (this.onDownPosition.distanceTo(this.onUpPosition) === 0) {
      const intersects = this.getIntersects(this.onUpPosition);
      if (intersects.length) {
        const object = intersects[0].object;
        this.select(object);
      } else {
        this.select(null);
      }
      this.render();
    }
  };
  /**
   * 选中模型
   * @param object
   * @returns
   */
  select = (object: THREE.Object3D) => {
    if (this.selected === object) return;
    this.selected = object;
    this.selectionBox.visible = false;
    this.transformControls.detach();
    if (object && object !== this.scene && object !== this.camera) {
      this.box.setFromObject(object, true);
      if (!this.box.isEmpty()) {
        this.selectionBox.visible = true;
      }
      this.transformControls.attach(object);
    }
    this.render();
  };
  /**
   * 满足碰撞检测的模型
   * @param point
   * @returns
   */
  getIntersects = (point: THREE.Vector2) => {
    this.mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const objects = [];
    this.scene.traverseVisible((child) => {
      objects.push(child);
    });
    this.sceneHelpers.traverseVisible((child) => {
      if (child.name === 'picker') objects.push(child);
    });
    return this.raycaster.intersectObjects(objects, false);
  };
  /**
   * 获取鼠标位置
   */
  getMousePosition = (x, y) => {
    const rect = this.container.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  };
}

export { EditorControls };

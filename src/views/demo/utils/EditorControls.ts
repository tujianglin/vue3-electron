import * as THREE from 'three';
import { Editor } from './Editor';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class EditorControls {
  editor: Editor;
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
  constructor(eidtor) {
    this.editor = eidtor;
    this.selectionBox.visible = false;
    this.editor.sceneHelpers.add(this.selectionBox);
    this.initTransformControls();
  }
  initTransformControls() {
    this.editor.transformControls = new TransformControls(this.editor.camera, this.editor.renderer.domElement);
    this.editor.transformControls.addEventListener('change', () => {
      const object = this.editor.transformControls.object;
      if (object) {
        this.box.setFromObject(object, true);
      }
      this.editor.render();
    });
    this.editor.transformControls.addEventListener('dragging-changed', (e) => {
      this.editor.controls.enabled = !e.value;
    });
    this.editor.sceneHelpers.add(this.editor.transformControls);
    // 鼠标点击事件
    this.editor.container.addEventListener('mousedown', this.onMousedown);
  }
  /**
   * 鼠标按下
   * @param e
   * @returns
   */
  onMousedown = (e: MouseEvent) => {
    if (e.target !== this.editor.renderer.domElement) return;
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
  handleClick() {
    if (this.onDownPosition.distanceTo(this.onUpPosition) === 0) {
      const intersects = this.getIntersects(this.onUpPosition);
      if (intersects.length) {
        const object = intersects[0].object;
        this.select(object);
      } else {
        this.select(null);
      }
      this.editor.render();
    }
  }
  /**
   * 选中模型
   * @param object
   * @returns
   */
  select(object: THREE.Object3D) {
    if (this.selected === object) return;
    this.selected = object;
    this.selectionBox.visible = false;
    this.editor.transformControls.detach();
    if (object && object !== this.editor.scene && object !== this.editor.camera) {
      this.box.setFromObject(object, true);
      if (!this.box.isEmpty()) {
        this.selectionBox.visible = true;
      }
      this.editor.transformControls.attach(object);
    }
    this.editor.render();
  }
  /**
   * 满足碰撞检测的模型
   * @param point
   * @returns
   */
  getIntersects(point: THREE.Vector2) {
    this.mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
    this.raycaster.setFromCamera(this.mouse, this.editor.camera);
    const objects = [];
    this.editor.scene.traverseVisible((child) => {
      objects.push(child);
    });
    return this.raycaster.intersectObjects(objects, false);
  }
  /**
   * 获取鼠标位置
   */
  getMousePosition(x, y) {
    const rect = this.editor.container.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  }
}

export { EditorControls };

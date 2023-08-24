import * as THREE from 'three';
import { Editor } from './Editor';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

class Transform extends Editor {
  pointer = new THREE.Vector2();
  mouse = new THREE.Vector2();
  onUpPosition = new THREE.Vector2();
  onDownPosition = new THREE.Vector2();
  // 碰撞检测
  raycaster = new THREE.Raycaster();
  box = new THREE.Box3();
  selectionBox = new THREE.Box3Helper(this.box);
  constructor() {
    super();
    this.selectionBox.visible = false;
    this.scene.add(this.selectionBox);
    this.initTransformControls();
  }
  initTransformControls() {
    this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
    this.transformControls.addEventListener('change', () => {
      const object = this.transformControls.object;
      if (object) {
        this.box.setFromObject(object, true);
      }
      this.render();
    });
    this.transformControls.addEventListener('dragging-changed', (e) => {
      this.controls.enabled = !e.value;
    });
    // this.transformControls.attach(this.cube);
    this.scene.add(this.transformControls);
    // 鼠标移动事件
    // document.addEventListener('pointerdown', this.onPointerDown);
    // document.addEventListener('pointerup', this.onPointerUp);
    // document.addEventListener('pointermove', this.onPointerMove);
    // 鼠标点击事件
    this.container.addEventListener('mousedown', this.onMousedown, { passive: false });
    this.container.addEventListener('mouseup', this.onMouseup);
  }
  /**
   * 鼠标点击
   * @param e
   */
  onPointerDown = (e: PointerEvent) => {
    this.onDownPosition.set(e.clientX, e.clientY);
    console.log(this.onDownPosition);
  };
  /**
   * 鼠标抬起
   * @param e
   */
  onPointerUp = (e: PointerEvent) => {
    this.onUpPosition.set(e.clientX, e.clientY);
    if (this.onDownPosition.distanceTo(this.onUpPosition) === 0) {
      this.transformControls.detach();
      this.render();
    }
  };
  /**
   * 鼠标移动
   * @param e
   */
  onPointerMove = (e: PointerEvent) => {
    this.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.raycaster.intersectObjects(this.splineHelperObjects, false);
    if (intersects.length) {
      const object = intersects[0].object;
      if (object !== this.transformControls.object) {
        this.transformControls.attach(object);
      }
    } else {
      this.transformControls.detach();
    }
  };
  onMousedown = (e: MouseEvent) => {
    const array = this.getMousePosition(e.clientX, e.clientY);
    this.onDownPosition.fromArray(array);
    this.mouse.set(this.onDownPosition.x * 2 - 1, -(this.onDownPosition.y * 2) + 1);
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.splineHelperObjects, false);
    if (intersects.length) {
      const object = intersects[0].object;
      if (object !== this.transformControls.object) {
        this.box.setFromObject(object, true);
        if (this.box.isEmpty() === false) {
          this.selectionBox.visible = true;
        }
        this.transformControls.attach(object);
      }
    }
  };
  onMouseup = (e: MouseEvent) => {
    console.log(e);
  };
  /**
   * 获取
   */
  getMousePosition(x, y) {
    const rect = this.container.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  }
}

export { Transform };

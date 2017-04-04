'use strict';

import Base from 'core/base';
import {attr, calculate} from 'util';
import Vector from 'util/vector';
export default class Entity extends Base {
  beforeInit(width, height) {
    let dm = this._dom;
    this.dragPoint = null;
    this.mouseEntered = false;
    let x = calculate(attr(dm, 'x'), width);
    let y = calculate(attr(dm, 'y'), height);
    this.position = new Vector(x, y);
    let speed = parseFloat(attr(dm, 'speed') || 0);
    let deg = parseFloat(attr(dm, 'angle') || 0);
    this.angle = Math.PI * deg / 180;
    this.speed = Vector.fromLenAndAngle(speed, this.angle);
    let dragable = attr(dm, 'dragable') || false;
    if (dragable) {
      this.onDragging = (point) => {
        this.position.add(point);
      };
    }
  }
  getR() {
    return 0;
  }
  // drawPath(){} // 用来判断实体的边界
  // update(){} //继承类要实现的方法
  // move(){} //继承类要实现的方法
  move(tm) {
    // console.log('tm :', tm);
    if (!this.speed) return;
    this.position.add(this.speed.clone().multiplyScalar(tm));
    // this.x += this.speed.x * tm;
    // this.y += this.speed.y * tm;
    // console.log('x :', this.x);
    // console.log('y :', this.y);
  }
  moveEntity(tm, context, canvas) {
    this.move(tm);
  }
  updateEntity(tm, context, canvas) {
    this.update(context, tm, canvas);
  }
}
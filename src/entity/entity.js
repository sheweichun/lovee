'use strict';

import Base from 'core/base';
import {attr, calculate} from 'util';
import Vector from 'util/vector';
export default class Entity extends Base {
  beforeInit(width, height) {
    let dm = this._dom;
    this.dragPoint = null;
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.mouseEntered = false;
    let x = calculate(attr(dm, 'x'), width);
    let y = calculate(attr(dm, 'y'), height);
    this.pined = attr(dm, 'pined') || false;
    this.position = new Vector(x, y);
    // this.prevPostion = this.position;
    this.prevPostion = new Vector(-1000, -1000);
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
  // 重力影响
  gravity(value) {
    if (this.pined) return;
    this.speed.y += value;
  }
  // drawPath(){} // 用来判断实体的边界
  // update(){} //继承类要实现的方法
  // move(){} //继承类要实现的方法
  move(tm) {
    if (!this.speed) return;
    // console.log('prePosition :', this.prevPostion.y, 'position :', this.position.y, 'speed', this.speed.y, 'this.canvasHeight', this.canvasHeight);
    this.prevPostion = this.position.clone();
    this.position.add(this.speed.clone().multiplyScalar(tm));
  }
  moveEntity(tm, context, canvas) {
    this.move(tm);
  }
  updateEntity(tm, context, canvas) {
    this.update(context, tm, canvas);
  }
}
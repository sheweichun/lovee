'use strict';



'use strict';


import Entity from '../entity';
import {attr, isEqual} from 'util';

const ratio = 0.9;

export default class CircleEntity extends Entity {

  init(dom) {
    this.r = parseFloat(attr(dom, 'r') || 0);
    this.borderWidth = parseFloat(attr(dom, 'borderWidth') || 1); 
  }
  drawPath(context) {
    const {x, y} = this.position;
    context.arc(x, y, this.r, 0, Math.PI * 2, false); 
  }
  update(ctx) {
    const {x, y} = this.position;
    // 开始一个新的绘制路径
    ctx.beginPath();
    // 设置弧线的颜色为蓝色
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = this.borderWidth;
    // 沿着坐标点(x,y)为圆心的圆的顺时针方向绘制弧线
    ctx.arc(x, y, this.r - this.borderWidth / 2, 0, Math.PI * 2, false);    
    // 按照指定的路径绘制弧线
    ctx.stroke();
    ctx.closePath();
    // console.log('update');
  }
  
  getR() {
    return this.r;
  }
  checkOutOfBadge(tm, context, canvas) {
    const {position, r} = this;
    const {x, y} = position;
    const {originWidth, originHeight} = canvas;
    let pretm;
    if (y + r >= originHeight) {
      // let preY = this.speed.y;
      if (this.speed.y > 0) {
        this.speed.y *= -ratio;
      }
      this.position.y = originHeight - r;
      // this.position.y = originHeight - r + (tm - (originHeight - y - r) / preY) * this.speed.y;
      // console.log('this.position.y  :', this.position.y - r);
    }
    if (x + r >= originWidth) {
      this.speed.x > 0 && (this.speed.x *= -ratio);
      this.position.x = originWidth - r;
    }
    // if (y <= r) {
    //   this.speed.y < 0 && (this.speed.y *= -1);
    //   this.position.y = r;
    // }
    if ( x <= r) {
      this.speed.x < 0 && (this.speed.x *= -ratio);
      this.position.x = r;
    }
    // console.log('prePosition :', this.prevPostion.y, 'position :', this.position.y, 'this.positiony + r', this.position.y + r, 'speed', this.speed.y, 'this.canvasHeight', originHeight);
    // console.log(this.prevPostion.y === this.position.y, this.position.y + r === originHeight);
    if (isEqual(this.prevPostion.y, this.position.y) && isEqual(this.position.y + r, originHeight)) {
      this.speed.y = 0;
      return true;
    }
  }
  collided(angle, speed) {
    // console.log('angle :', distanceVec.angleDeg() - this.speed.angleDeg());
    // debugger;
    // console.log('speed :', speed);
    // this.speed.add(speed);
    // console.log('this.speed :', this.speed);
    // debugger;
    this.speed.rotate(angle * 2);
    // this.speed.rotate(Math.PI);
  }
  // move(tm) {
  //   this.x += this.speed * tm;
  //   this.y += this.speed * tm;
  // }
  onClick(point) {
    console.log('circle clicked' + Date.now());
  }
  // onMouseEnter() {
  //   console.log('mouse enter');
  // }
  // onMouseLeave() {
  //   console.log('mouse leave');
  // }
}
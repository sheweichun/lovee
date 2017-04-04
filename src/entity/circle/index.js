'use strict';



'use strict';


import Entity from '../entity';
import {attr} from 'util';


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
  checkOutOfBadge(tm, context, canvas) {
    const {position, r} = this;
    const {x, y} = position;
    const {originWidth, originHeight} = canvas;
    if (y + r >= originHeight) {
      this.speed.y > 0 && (this.speed.y *= -1);
    } else if (x + r >= originWidth) {
      this.speed.x > 0 && (this.speed.x *= -1);
    } else if (y <= r) {
      this.speed.y < 0 && (this.speed.y *= -1);
    } else if ( x <= r) {
      this.speed.x < 0 && (this.speed.x *= -1);
    }
  }
  getR() {
    return this.r;
  }
  collided(angle, speed) {
    // console.log('angle :', distanceVec.angleDeg() - this.speed.angleDeg());
    // debugger;
    // console.log('speed :', speed);
    // this.speed.add(speed);
    // console.log('this.speed :', this.speed);
    // debugger;
    this.speed.rotate(angle);
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
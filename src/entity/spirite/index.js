'use strict';



'use strict';


import Entity from '../entity';
import {attr, calculate} from 'util';


export default class SpiritEntity extends Entity {

  init(dom, width, height) {
    this.width = calculate(attr(dom, 'width'), width);
    this.height = calculate(attr(dom, 'height'), height);
    let src = attr(dom, 'src');
    let image = new Image();
    image.onload = () => {
      this.image = image;
    };
    image.src = src;
  }
  drawPath(context) {
    const {x, y} = this.position;
    context.rect(x, y, this.width, this.height); 
  }
  update(ctx) {
    // 开始一个新的绘制路径
    if (!this.image) return;
    // console.log('width :', this.width);
    // console.log('height :', this.height);
    const {x, y} = this.position;
    ctx.drawImage(this.image, x, y, this.width, this.height);
    // console.log('update');
  }
  // move(tm) {
  //   this.x += this.speed * tm;
  //   this.y += this.speed * tm;
  // }
  // onClick(point) {
  //   console.log('circle clicked' + Date.now());
  // }
  // onMouseEnter() {
  //   console.log('mouse enter');
  // }
  // onMouseLeave() {
  //   console.log('mouse leave');
  // }
}
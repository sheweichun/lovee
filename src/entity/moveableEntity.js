'use strict';

import Base from 'core/base';
import {attr, calculate} from 'util';

export default class MoveableEntity extends Base {
  beforeInit(width, height) {
    let dm = this._dom;
    this.dragPoint = null;
    this.mouseEntered = false;
    this.x = calculate(attr(dm, 'x'), width);
    this.y = calculate(attr(dm, 'y'), height);
  }
  // drawPath(){} // 用来判断实体的边界
  // update(){} //继承类要实现的方法
  // move(){} //继承类要实现的方法
  updateEntity(tm, context, canvas) {
    this.update(context, tm, canvas);
    this.move && this.move(tm);
  }
  onDragging(point) {
    this.x += point.x;
    this.y += point.y;
  }
}

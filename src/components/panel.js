'use strict';

import Entity from '../entity/entity';
import {attr, calculate} from 'util';

export default class RenderPanel extends Entity {
  init(dm, width, height) {
    this.width = calculate(attr(dm, 'width'), width) || 100;
    this.height = calculate(attr(dm, 'height'), height) || 100;
    this.pined = true;
  }
  update(context, tm) {
    const {x, y} = this.position;
    context.globalAlpha = '0.3';
    // context.globalCompositionOperation = ''
    context.textAlign = 'center';
    
    // console.log('y :', this.y);
    context.fillRect(x, y, this.width, this.height);
    context.fillStyle = '#fff';
    // console.log('fps :', (1000 / tm).toFixed(2));
    context.fillText('fps:' + (1000 / tm).toFixed(2), x + this.width / 2, y + this.height / 2);
  }
  drawPath(context) {
    const {x, y} = this.position;
    context.rect(x, y, this.width, this.height);
  }
}

'use strict';
import {toArray} from '../util';
import BaseRender from './base';

const prefixes = ['webkit', 'moz', 'o'];
module.exports = class CanvasRender extends BaseRender {
  constructor(image, options) {
    super(image);
    this.ratio = this.getAttribute('ratio') || options.ratio || 2;
  }
  parse(target, cb) {
    // let dom = document.createElement('div');
    // dom.innerHTML =
    target.style.cssText = `    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;`;
    target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" style="position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${this.ratio * 100}%;
    height: ${this.ratio * 100}%;">
      <defs>
        <filter id="blur"><feGaussianBlur stdDeviation="50"></feGaussianBlur></filter>
      </defs>
      <image style="width:100%;height:100%;"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xlink:href="${this.image.src}"
        filter="url(#blur)"></image>
    </svg>`;
    // return this.type === 0 ? this.getBackGroundColor(colors) : this.getCSSGradientProperty(colors);
  }
};

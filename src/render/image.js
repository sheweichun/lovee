
'use strict';
import {toArray} from '../util';
import BaseRender from './base';

const prefixes = ['webkit', 'moz', 'o'];
module.exports = class CanvasRender extends BaseRender {
  constructor(image, options) {
    super(image);
    this.limit = this.getAttribute('limit') || options.limit || 10;
    this.type = this.getAttribute('type') || options.type || '0';
  }
  adjustRatio(canvas, context) {
    let devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio ||
                             context.mozBackingStorePixelRatio ||
                             context.msBackingStorePixelRatio ||
                             context.oBackingStorePixelRatio ||
                             context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    const unit = 'px';
     // ensure we have a value set for auto.
     // If auto is set to false then we
     // will simply not upscale the canvas
     // and the default behaviour will be maintained
    let oldWidth = canvas.width,
      oldHeight = canvas.height;
     // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      canvas.style.width = oldWidth + unit;
      canvas.style.height = oldHeight + unit;
      context.scale(ratio, ratio);
    }
  }
  initCanvas() {
    const {image, ratio} = this;
    const unit = 'px';
    const width = 1,
      height = image.height;
    this.canvas = document.createElement('canvas');
    let canvas = this.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.dimensions = {width, height};
    this.canvas.width = width;
    this.canvas.height = height;
    // canvas.width = width;
    // canvas.height = height;
    // canvas.style.width = image.width + unit;
    // canvas.style.height = height + unit;
    // this.ctx.scale(image.width, 1);
    try {
      if (this.type === '0') {
        this.ctx.drawImage(this.image, this.image.width - 1, 0, 1, this.image.height, 0, 0, 1, this.canvas.height);
      } else {
        this.ctx.drawImage(this.image, 0, 0);
      }
    } catch (e) {
      return false;
    }

    // this.imageData = this.ctx.getImageData(
    //     0, 0, width, height
    // ).data;
    this.imageData = this.canvas.toDataURL('image/png');
    return true;
  }
  getImageStatus(cb) {
    if (this.image.complete) {
      if (this.initCanvas()) {
        cb();
      }
      return;
    }
    this.image.onload = () => {
      if (this.initCanvas()) {
        cb();
      }
    };
  }
  parse(target, cb) {
    this.getImageStatus(() => {
      cb && cb(this.imageData);
      target.style.backgroundImage = `url(${this.imageData})`;
    });
    // return this.type === 0 ? this.getBackGroundColor(colors) : this.getCSSGradientProperty(colors);
  }
};

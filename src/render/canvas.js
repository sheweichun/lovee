
'use strict';
import {toArray} from '../util';
import BaseRender from './base';

const prefixes = ['webkit', 'moz', 'o'];
module.exports = class CanvasRender extends BaseRender {
  constructor(image, options) {
    super(image);
    this.ratio = this.getAttribute('ratio') || options.ratio || 0.1;
    this.limit = this.getAttribute('limit') || options.limit || 10;
    this.type = this.getAttribute('type') || options.type || '1';
    this.angle = this.getAttribute('angle') || options.angle || '135deg';
    this.reverse = this.getAttribute('reverse') || options.reverse || false;
    this.setText = this.getAttribute('setText') || options.setText || false;
  }
  initCanvas() {
    const {image, ratio} = this;
    const width = image.width * ratio,
      height = image.height * ratio;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dimensions = {width, height};
    this.canvas.width = width;
    this.canvas.height = height;
    try {
      this.ctx.drawImage(this.image, 0, 0, width, height);
    } catch (e) {
      return false;
    }
    let imageData = this.ctx.getImageData(
        0, 0, width, height
    ).data;
    this.imageData = toArray(imageData);
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
  map() {
    const unit = 4;
    let chunkColors = this.imageData.reduce((colors, cur, i) => {
      const ci = Math.floor(i / unit);
      colors[ci] = colors[ci] || [];
      colors[ci].push(cur);
      return colors;
    }, []);
    return chunkColors.filter(rgba => {
      return rgba.slice(0, 2).every(val => val < 250) && rgba.slice(0, 2).every(val => val > 0);
    });
  }
  reduce(source) {
    let result = source.reduce((rtt, rgba) => {
      let key = rgba.join('|');
      if (!rtt[key]) {
        rtt[key] = {
          count: 0,
          rgba: rgba,
          brightness: ((rgba[0] * 299) + (rgba[1] * 587) + (rgba[2] * 114)) / 1000
        };
      }
      rtt[key].count = (rtt[key].count + 1);
      return rtt;
    }, {});
    let rets = Object.keys(result).map((item) => result[item])
    .sort((prev, cur) => cur.count - prev.count)
    .slice(0, this.limit);
    return this.reverse ? rets.sort((prev, cur) => prev.brightness - cur.brightness) : rets.sort((prev, cur) => cur.brightness - prev.brightness);

  }
  getMiddleRGB(start, end) {
    let w = 0.5 * 2 - 1;
    let w1 = (w + 1) / 2.0;
    let w2 = 1 - w1;
    let rgb = [parseInt(start[0] * w1 + end[0] * w2), parseInt(start[1] * w1 + end[1] * w2), parseInt(start[2] * w1 + end[2] * w2)];
    return rgb;
  }
  getTextColor(colors) {
    let rgb = this.getMiddleRGB(colors[0].rgba.slice(0, 3), colors[colors.length - 1].rgba.slice(0, 3));
    let o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
    if (o > 125) {
      return 'color: #000;';
    } else {
      return 'color: #fff;';
    }
  }
  getCSSGradientProperty(colors) {
    let _this = this;
    let useColors = [colors[0], colors[colors.length - 1]];
    const val = useColors.map((color, index) => {
      return `rgb(${color.rgba.slice(0, 3).join(',')}) ${index == 0 ? '0%' : '75%'}`;
    }).join(',');
    return prefixes.map(prefix => {
      return `background-image: -${prefix}-linear-gradient(
                      ${_this.angle},
                      ${val}
                  )`;
    }).concat([`background-image: linear-gradient(
                  ${_this.angle},
                  ${val}
              )`]).join(';') + (this.setText ? this.getTextColor(colors) : '');
  }
  getBackGroundColor(colors) {
    return `background-color :rgb(${colors[colors.length - 1].rgba.slice(0, 3).join(',')});` + (this.setText ? this.getTextColor(colors) : '');
  }
  parse(target, cb) {
    let _this = this;
    this.getImageStatus(() => {
      let colors = _this.reduce(_this.map());
      cb && cb(colors);
      target.style.cssText += (_this.type === '0' ? _this.getBackGroundColor(colors) : _this.getCSSGradientProperty(colors));
    });

  }
};

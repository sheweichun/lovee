'use strict';

import Scene from './scene';
import {$$, $} from 'util';
import Timing from 'util/time';
import EventUtil from './event';


const SCENE_TAG = 'Scene';
const arrayMap = Array.prototype.map;
export default class Gscene {
  constructor(option = {}) {
    const {callback = {}, debug} = option;

    this.debug = debug;
    Timing.init(debug);
    this.destroyed = false;
    // 回调
    this.tm = 0;
    this.activeScene = 0;
    this.willParse = callback.beforeParse; // 解析前
    this.didParsed = callback.didParsed; // 解析完成
    this.willLoad = callback.willLoad;   // 加载资源前
    this.didLoaded = callback.didLoaded; // 加载资源完成

    this.update = this.update.bind(this);
  }
  adjustRatio(canvas, context, rootDom) {
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
    let oldWidth = rootDom.offsetWidth,
      oldHeight = rootDom.offsetHeight;
    canvas.originWidth = oldWidth;
    canvas.originHeight = oldHeight;
     // upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {

      canvas.width = oldWidth * ratio;
      canvas.height = oldHeight * ratio;
      // canvas.style.width = oldWidth + unit;
      // canvas.style.height = oldHeight + unit;
      context.scale(ratio, ratio);
    }
  }
  parse(dom = 'gscene') {
    Timing.start();
    this._dom = $(dom);
    this.canvas = document.createElement('canvas');
    this.cacheCanvas = document.createElement('canvas');
    this.canvas.style.cssText = 'width:100%;height:100%;';
    let rootDom = this._dom.parentNode;
    rootDom.appendChild(this.canvas);
    this.eventUtil = new EventUtil(this.canvas, this); // 事件处理
    this.canvasContext = this.canvas.getContext('2d');
    this.adjustRatio(this.canvas, this.canvasContext, rootDom);
    this.cacheCanvas.width = this.canvas.originWidth;
    this.cacheCanvas.height = this.canvas.originHeight;
    this.cacheCanvasContext = this.cacheCanvas.getContext('2d');
    this.willParse && this.willParse();
    let domScenes = $$(Scene.TAG_NAME, this._dom);
    this._scenes = arrayMap.call(domScenes, (sceneDom) => {
      return new Scene(this, sceneDom); // 游戏场景
    });
    this.didParsed && this.didParsed();
    Timing.end('IN PARSE');
    return this;
  }
  getCurScene() {
    return this._scenes[this.activeScene];
  }
  load(cb) {
    Timing.start();
    Timing.end('IN LOAD');
    return this;
  }
  run() {
    window.requestAnimationFrame(this.update);
    return this;
  }
  update(tm) {
    if (this.destroyed) return;
    let diff = tm - this.tm;
    if (diff >= 33.33) {   // 当窗口出于非激活状态，会导致diff特别大
      this.tm = tm;
      window.requestAnimationFrame(this.update);
      return;
    }
    this.tm = tm;
    const {width, height} = this.canvas;
    this.canvasContext.clearRect(0, 0, width, height);
    window.requestAnimationFrame(this.update);
    this._scenes[this.activeScene].update(diff, this.canvasContext, this.canvas);
  }
  destroy() {
    this.eventUtil && this.eventUtil.destroy();
    this.destroyed = true;
    window.cancelAnimationFrame(this.update);
  }
}
'use strict';
import {$} from 'util';
import Base from 'core/base';
import World from 'element/world';
import Camera from 'element/camera';



export default class Scene extends Base {
  static TAG_NAME = 'scene';
  init(dom) {
    if (!dom) return;
    const gscene = this._context;
    if (this._camera) {
      this._camera.init($(Camera.TAG_NAME, dom));
    } else {
      this._camera = new Camera(gscene, $(Camera.TAG_NAME, dom)); // 摄像机
    }
    if (this._world) {
      this._world.init($(World.TAG_NAME, dom));
    } else {
      this._world = new World(gscene, $(World.TAG_NAME, dom)); // 游戏世界
    }
  }
  checkPointInPath(entity, point = {}) {
    const context = this._context.cacheCanvasContext;
    if (!context || !entity || !entity.drawPath) return false;
    // context.save();
    context.beginPath();
    // context.globalAlpha = 0;
    entity.drawPath(context);
    context.closePath();
    let isInPath = context.isPointInPath(point.x, point.y);
    // context.restore();
    return isInPath;
  }
  getEntities() {
    return this._world._entityFactory.entities;
  }
  update(tm, context, canvas) {
    this._camera && this._camera.update(tm, context, canvas);
    this._world && this._world.update(tm, context, canvas);
  }
}
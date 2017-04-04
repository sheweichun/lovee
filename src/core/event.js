'use strict';

const CLICK = 'click';
const MOUSEMOVE = 'mousemove';
const MOUSEENTER = 'mouseenter';
const MOUSELEAVE = 'mouseleave'; 
const MOUSEDOWN = 'mousedown';
const MOUSEUP = 'mouseup';

export default class EventHanlde {
  constructor(canvas, gscene) {
    this.canvas = canvas;
    this.gscene = gscene;
    this.handlerClick = this.handlerClick.bind(this);
    this.handlerMouseMove = this.handlerMouseMove.bind(this);
    this.handlerMouseUp = this.handlerMouseUp.bind(this);
    this.handlerMouseDown = this.handlerMouseDown.bind(this);
    this.canvas.addEventListener(CLICK, this.handlerClick);
    this.canvas.addEventListener(MOUSEMOVE, this.handlerMouseMove);
    this.canvas.addEventListener(MOUSEDOWN, this.handlerMouseDown);
    this.canvas.addEventListener(MOUSEUP, this.handlerMouseUp);
  }
  getPoint(e) {
    const {clientX, clientY} = e;
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }
  trigger(name, e, success, fail) {
    const point = this.getPoint(e);
    const scene = this.gscene.getCurScene();
    const entities = scene.getEntities();
    if (!scene || !entities) return;
    let changed = false;
    let nameIsFun = typeof name === 'function';
    let func;
    if (nameIsFun) {
      func = name;
      name = null;
    }
    entities.forEach((entity) => {
      if (name && !entity[name]) return;
      if ((func && func(entity)) || scene.checkPointInPath(entity, point)) {
        changed = true;
        success && success(entity, point);
      } else {
        fail && fail(entity, point);
      }
    });
    return changed;
  }
  handlerMouseMove(e) {
    this.trigger((entity) => {
      return entity.dragPoint; 
    }, e, (entity, point) => {
      if (entity.dragPoint) {
        const {data} = entity.dragPoint;
        let difx = point.x - data.x,
          dify = point.y - data.y;
        entity.dragPoint.data = point;
        entity.dragPoint.flag = true;
        entity.onDragging({
          x: difx,
          y: dify
        });
      } else if (!entity.mouseEntered) {
        entity.mouseEntered = true;
        entity.onMouseEnter && entity.onMouseEnter();
      }
      
    }, (entity) => {
      // entity.dragPoint = null;
      if (entity.mouseEntered) {
        entity.mouseEntered = false;
        entity.onMouseLeave && entity.onMouseLeave();
      }
      
    });

  }
  handlerClick(e) {
    this.trigger('onClick', e, (entity, point) => {
      if (entity.dragPoint) {
        let flag = entity.dragPoint.flag;
        entity.dragPoint = null;
        if (flag) {
          return;
        }
      }
      entity.onClick(point);
    });
  }
  handlerMouseDown(e) {
    this.trigger('onDragging', e, (entity, point) => {
      entity.dragPoint = {
        data: point,
        flag: false 
      };
      entity.onDragStart && entity.onDragStart(point);
    });
  }
  handlerMouseUp(e) {
    this.trigger('onDragging', e, (entity, point) => {
      if (!entity.onClick) {
        entity.dragPoint = null;
      }
      entity.onDragEnd && entity.onDragEnd(point);
    });
  }
  destroy() {
    this.canvas.removeEventListener(CLICK, this.handlerClick);
    this.canvas.removeEventListener(MOUSEMOVE, this.handlerMouseMove);
    this.canvas.removeEventListener(MOUSEDOWN, this.handlerMouseDown);
    this.canvas.removeEventListener(MOUSEUP, this.handlerMouseUp);
  }
}
'use strict';


import Base from 'core/base';
import {attr} from 'util';
const arrayMap = Array.prototype.map;
import Circle from './circle';
import Spirit from './spirite';
import Panel from '../components/panel';

import invariant from 'invariant';
export default class EntityFactory extends Base {
  beforeInit() {
    this.entityMap = {
      circle: Circle,
      panel: Panel,
      sprit: Spirit
    };
  }
  init(dom) {
    if (!dom) return;
    const gscene = this._context;
    this.entities = arrayMap.call(dom, (dm) => {
      let typeAttr = attr(dm, 'type');
      invariant(this.entityMap[typeAttr], 'unkonw entity type');
      return new this.entityMap[typeAttr](gscene, dm);
    });
  }
  update(tm, context, canvas) {
    // this.entities.forEach((entity) => {
    //   entity.updateEntity(tm, context, canvas);
    // });
    this.entities.forEach((entity) => {
      context.save();
      entity.updateEntity(tm, context, canvas);
      context.restore();
    });
  }
  move(tm, context, canvas) {
    this.entities.forEach((entity) => {
      entity.moveEntity(tm, context, canvas);
    });
  }
  static TAG_NAME = 'entity';
}
'use strict';


import Base from 'core/base';
import EntityFactory from 'entity';
import {attr, calculate, $$, getSquareDistance} from 'util';

import Vector from 'util/vector';
export default class World extends Base {
  init(dom) {
    if (!dom) return;
    this.collideMode = attr(dom, 'collide') || 'distance';
    const gscene = this._context;
    if (this._entityFactory) {
      this._entityFactory.init($$(EntityFactory.TAG_NAME, this._dom));
    } else {
      this._entityFactory = new EntityFactory(gscene, $$(EntityFactory.TAG_NAME, this._dom)); // 世界中的实体
    }
  }
  checkBadge(tm, context, canvas) {
    let entities = this._entityFactory.entities;
    entities.map((item) => {
      item.checkOutOfBadge && item.checkOutOfBadge(tm, context, canvas);
    });
  }
  checkCollideBydistance(tm, context, canvas) {
    let entities = this._entityFactory.entities;
    let len = entities.length, distance, compareDistance, baseEntity, checkEntity;
    for (let i = 0; i < len; i++) {
      baseEntity = entities[i];
      if (!baseEntity.collided) continue;
      for (let j = i + 1; j < len; j++) {
        checkEntity = entities[j];
        if (!checkEntity.collided) continue;
        // distance = getSquareDistance(baseEntity.position.x, baseEntity.position.y, checkEntity.position.x, checkEntity.position.y);
        distance = baseEntity.position.distanceSq(checkEntity.position);
        compareDistance = Math.pow((baseEntity.getR() + checkEntity.getR()), 2);
        if (distance <= compareDistance) {
          let distanceVec = baseEntity.position.clone().subtract(checkEntity.position).rotate(Math.PI / 2);
          let baseSpeed = baseEntity.speed.clone(),
            checkSpeed = checkEntity.speed.clone();
          let baseAngle = distanceVec.angleDeg() - baseEntity.speed.angleDeg(),
            checkAngle = checkEntity.speed.angleDeg() - distanceVec.angleDeg();
          // let baseAngle = baseEntity.speed.angleDeg() - distanceVec.angleDeg(),
          //   checkAngle = distanceVec.angleDeg() - checkEntity.speed.angleDeg();
          // 还原现场
          // let diffDistance = Math.sqrt(compareDistance - distance);
          // baseEntity.position.x - checkEntity.position.x - (baseEntity.speed.x - checkEntity.speed.x) * tm
          // baseEntity.position.y - checkEntity.position.y - (baseEntity.speed.y - checkEntity.speed.y) * tm
          baseEntity.collided(baseAngle, baseSpeed, checkEntity);
          checkEntity.collided(checkAngle, checkSpeed, baseEntity);
        }
      }
    }
  }
  checkCollide(tm, context, canvas) {
    let methodName = 'checkCollideBy' + this.collideMode;
    this[methodName] && this[methodName](tm, context, canvas);
  }
  update(tm, context, canvas) {
    this._entityFactory && this._entityFactory.move(tm / 20, context, canvas);
    this.checkBadge(tm, context, canvas);
    this.checkCollide(tm, context, canvas);
    this._entityFactory && this._entityFactory.update(tm, context, canvas);
  }
  static TAG_NAME = 'world';
}
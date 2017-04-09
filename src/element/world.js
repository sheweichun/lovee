'use strict';


import Base from 'core/base';
import EntityFactory from 'entity';
import {attr, calculate, $$, backToCollipse} from 'util';

import Vector from 'util/vector';


// function calculateAngle(src,dec){
//   let tmp = dec -  src;
//   if(tmp < )
// }

export default class World extends Base {
  init(dom) {
    if (!dom) return;
    this.collideMode = attr(dom, 'collide') || 'distance';
    this.gravity = parseFloat(attr(dom, 'gravity')) || 0;
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
      if (item.checkOutOfBadge) {
        if (!item.checkOutOfBadge(tm, context, canvas)) {
          this.gravity > 0 && item.gravity(this.gravity * tm);
        }
      }
      // item.checkOutOfBadge && item.checkOutOfBadge(tm, context, canvas);
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
          if (distance < compareDistance) {
            // 还原碰撞时刻,非常重要
            const overTime = backToCollipse(baseEntity, checkEntity, compareDistance - distance);
            baseEntity.move(-overTime);
            checkEntity.move(-overTime);
          }
          let distanceVec = baseEntity.position.clone().subtract(checkEntity.position).rotate(Math.PI / 2);
          let baseSpeed = baseEntity.speed.clone(),
            checkSpeed = checkEntity.speed.clone();
          let baseAngle = distanceVec.angleDeg() - baseEntity.speed.angleDeg(),
            checkAngle = checkEntity.speed.angleDeg() - distanceVec.angleDeg();
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
    const realTm = tm / 20;
    this._entityFactory && this._entityFactory.move(realTm, context, canvas);
    this.checkCollide(realTm, context, canvas);
    this.checkBadge(realTm, context, canvas);
    this._entityFactory && this._entityFactory.update(realTm, context, canvas);
  }
  static TAG_NAME = 'world';
}
'use strict';




export const $ = (dom, parentDom = document) => {
  return dom instanceof HTMLElement ? dom : parentDom.querySelector(dom);
};

export const $$ = (dom, parentDom = document) => {
  return dom instanceof HTMLElement ? dom : parentDom.querySelectorAll(dom);
};

function normalAttributeName(name) {
  return name.replace(/[A-Z]/g, (s) => {
    return '-' + s.toLowerCase();
  });
}

export const attr = (dom, name) => {
  return dom.dataset ? dom.dataset[name] : dom.getAttribute('data-' + normalAttributeName(name));
};


export const calculate = (value, base) => {
  if (!value) return 0;
  if (value.indexOf('%') >= 0) {
    let ret = parseInt(value.substring(0, value.length - 1)) * base / 100;
    return ret;
  } else if (value < 0) {
    return base + parseInt(value);
  }
  return parseInt(value);
};


export const getSquareDistance = (x1, y1, x2, y2) => {
  return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
};


export const backToCollipse = (src, dest, diff) => {
  const x1 = src.position.x, x2 = dest.position.x,
    vx1 = -src.speed.x, vx2 = -dest.speed.x,
    y1 = src.position.y, y2 = dest.position.y,
    vy1 = -src.speed.y, vy2 = -dest.speed.y;
  // 求解二元一次方程
  const a = Math.pow(vx2 - vx1, 2) + Math.pow(vy2 - vy1, 2), b = 2 * ((x2 - x1) * (vx2 - vx1) + (y2 - y1) * (vy2 - vy1)), c = -diff;
  const sqrtNum = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
  let t1 = (-b + sqrtNum ) / (2 * a);
  // debugger;
  return t1 > 0 ? t1 : (-b - sqrtNum ) / (2 * a);
};


export const isEqual = (src, dest) => {
  let cmp = dest - src;
  return cmp < 0.0000000001 && cmp > -0.0000000001;
};
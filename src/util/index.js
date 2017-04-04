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
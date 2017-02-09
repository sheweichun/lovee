'use strict';
// var invariant = require('invariant');
function normalAttributeName(name) {
  return name.replace(/[A-Z]/g, (s) => {
    return '-' + s.toLowerCase();
  });
}
export default class BaseRender {
  constructor(image) {
    this.image = image;
  }
  toObject() {

  }
  getAttribute(name) {
    let dom = this.image;
    return dom.dataset ? dom.dataset[name] : dom.getAttribute('data-' + normalAttributeName(name));
  }

}

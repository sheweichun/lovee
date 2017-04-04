'use strict';


import invariant from 'invariant';

export default class Base {
  constructor(gscene, dom) {
    invariant(!!gscene, 'gscene can\'t be undefined');
    this._context = gscene;
    this._dom = dom;
    // this.update = this.update.bind(this);
    const {originWidth, originHeight} = gscene.canvas;
    this.beforeInit && this.beforeInit(originWidth, originHeight);
    this.init(dom, originWidth, originHeight);
  }
  init(dom) {

  }
  load() {
    
  }
  update() {
    
  }
}
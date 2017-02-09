'use strict';
var invariant = require('invariant');

export default class Lovee {
  constructor(container, image, options) {
    this.container = container;
    this.image = image;
    this.options = options;
    this.target = options.target ? (options.target instanceof HTMLElement ? options.target : container.querySelector(options.target)) : container;
  }
  parse(render) {
    new render(this.image, this.options).parse(this.target);
  }

}

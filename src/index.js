'use strict';
// var invariant = require('invariant');
import {getHtmlElement, getAttribute} from './util';
import Lovee from './lovee';
const merge = (...objarr) => {
    return objarr.reduceRight((ret, obj) => {
      for (let attr in obj) {
        ret[attr] = obj[attr];
      }
    }, {});
  },
  forEach = Array.prototype.forEach,
  sel = getHtmlElement,
  defaultOptions = {
    image: 'img',
    type: 'canvas'
  };

module.exports = (container, render, options, cb) => {
  // invariant(container, 'container is undefined');
  // invariant(render, 'render is undefined');
  let $containers = sel(container), results = [];
  options = merge({}, defaultOptions, options);
  const {image} = options;
  if ($containers instanceof HTMLElement) {
    let $image = image instanceof HTMLElement ? image : $containers.querySelector(image);
    if (!$image) return;
    new Lovee($containers, $image, options)
    .parse(render, (colors) => {
      cb($containers, colors);
    });
  } else {
    forEach.call($containers, ($container) => {
      let $image = image instanceof HTMLElement ? image : $container.querySelector(image);
      if (!$image) return;
      new Lovee($container, $image, options)
      .parse(render, (colors) => {
        cb($container, colors);
      });
      // results.push(
      //
      // );
    });
  }

  return results;
};

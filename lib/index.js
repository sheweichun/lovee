'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _lovee = require('./lovee');

var _lovee2 = _interopRequireDefault(_lovee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invariant = require('invariant');

var merge = Object.assign,
    forEach = Array.prototype.forEach,
    sel = _util.getHtmlElement,
    defaultOptions = {
  image: 'img',
  type: 'canvas'
};

exports.default = function (container, render, options) {
  invariant(container, 'container is undefined');
  invariant(render, 'render is undefined');
  var $containers = sel(container),
      results = [];
  options = merge({}, defaultOptions, options);
  var _options = options,
      image = _options.image;

  if ($containers instanceof HTMLElement) {
    var $image = image instanceof HTMLElement ? image : $containers.querySelector(image);
    if (!$image) return;
    new _lovee2.default($containers, $image, options).parse(render);
  } else {
    forEach.call($containers, function ($container) {
      var $image = image instanceof HTMLElement ? image : $container.querySelector(image);
      if (!$image) return;
      new _lovee2.default($container, $image, options).parse(render);
      // results.push(
      //
      // );
    });
  }

  return results;
};
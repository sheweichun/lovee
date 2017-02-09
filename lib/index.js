'use strict';
// var invariant = require('invariant');

var _util = require('./util');

var _lovee = require('./lovee');

var _lovee2 = _interopRequireDefault(_lovee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = function merge() {
  for (var _len = arguments.length, objarr = Array(_len), _key = 0; _key < _len; _key++) {
    objarr[_key] = arguments[_key];
  }

  return objarr.reduceRight(function (ret, obj) {
    for (var attr in obj) {
      ret[attr] = obj[attr];
    }
  }, {});
},
    forEach = Array.prototype.forEach,
    sel = _util.getHtmlElement,
    defaultOptions = {
  image: 'img',
  type: 'canvas'
};

module.exports = function (container, render, options, cb) {
  // invariant(container, 'container is undefined');
  // invariant(render, 'render is undefined');
  var $containers = sel(container),
      results = [];
  options = merge({}, defaultOptions, options);
  var _options = options,
      image = _options.image;

  if ($containers instanceof HTMLElement) {
    var $image = image instanceof HTMLElement ? image : $containers.querySelector(image);
    if (!$image) return;
    new _lovee2.default($containers, $image, options).parse(render, function (colors) {
      cb($containers, colors);
    });
  } else {
    forEach.call($containers, function ($container) {
      var $image = image instanceof HTMLElement ? image : $container.querySelector(image);
      if (!$image) return;
      new _lovee2.default($container, $image, options).parse(render, function (colors) {
        cb($container, colors);
      });
      // results.push(
      //
      // );
    });
  }

  return results;
};
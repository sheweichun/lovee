
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefixes = ['webkit', 'moz', 'o'];

var CanvasRender = function (_BaseRender) {
  _inherits(CanvasRender, _BaseRender);

  function CanvasRender(image, options) {
    _classCallCheck(this, CanvasRender);

    var _this = _possibleConstructorReturn(this, (CanvasRender.__proto__ || Object.getPrototypeOf(CanvasRender)).call(this, image));

    _this.ratio = options.ratio || 0.1;
    _this.limit = options.limit || 10;
    _this.type = options.type || 0;
    _this.setText = options.setText || false;
    return _this;
  }

  _createClass(CanvasRender, [{
    key: 'initCanvas',
    value: function initCanvas() {
      var image = this.image,
          ratio = this.ratio;

      var width = image.width * ratio,
          height = image.height * ratio;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.dimensions = { width: width, height: height };
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx.drawImage(this.image, 0, 0, width, height);
      var imageData = this.ctx.getImageData(0, 0, width, height).data;
      this.imageData = (0, _util.toArray)(imageData);
    }
  }, {
    key: 'getImageStatus',
    value: function getImageStatus(cb) {
      var _this2 = this;

      if (this.image.complete) {
        this.initCanvas();
        return cb();
      }
      this.image.onload = function () {
        _this2.initCanvas();
        cb();
      };
    }
  }, {
    key: 'map',
    value: function map() {
      var unit = 4;
      var chunkColors = this.imageData.reduce(function (colors, cur, i) {
        var ci = Math.floor(i / unit);
        colors[ci] = colors[ci] || [];
        colors[ci].push(cur);
        return colors;
      }, []);
      return chunkColors.filter(function (rgba) {
        return rgba.slice(0, 2).every(function (val) {
          return val < 250;
        }) && rgba.slice(0, 2).every(function (val) {
          return val > 0;
        });
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(source) {
      var result = source.reduce(function (rtt, rgba) {
        var key = rgba.join('|');
        if (!rtt[key]) {
          rtt[key] = {
            count: 1,
            rgba: rgba,
            brightness: (rgba[0] * 299 + rgba[1] * 587 + rgba[2] * 114) / 1000
          };
          return rtt;
        }
        rtt[key].count = rtt[key].count + 1;
        return rtt;
      }, {});
      return Object.keys(result).map(function (item) {
        return result[item];
      }).sort(function (prev, cur) {
        return cur.count - prev.count;
      }).slice(0, this.limit).sort(function (prev, cur) {
        return cur.brightness - prev.brightness;
      });
    }
  }, {
    key: 'getMiddleRGB',
    value: function getMiddleRGB(start, end) {
      var w = 0.5 * 2 - 1;
      var w1 = (w + 1) / 2.0;
      var w2 = 1 - w1;
      var rgb = [parseInt(start[0] * w1 + end[0] * w2), parseInt(start[1] * w1 + end[1] * w2), parseInt(start[2] * w1 + end[2] * w2)];
      return rgb;
    }
  }, {
    key: 'getTextColor',
    value: function getTextColor(colors) {
      var rgb = this.getMiddleRGB(colors[0].rgba.slice(0, 3), colors[colors.length - 1].rgba.slice(0, 3));
      var o = Math.round((parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000);
      if (o > 125) {
        return 'color: #000;';
      } else {
        return 'color: #fff;';
      }
    }
  }, {
    key: 'getCSSGradientProperty',
    value: function getCSSGradientProperty(colors) {
      var useColors = [colors[0], colors[colors.length - 1]];
      var val = useColors.map(function (color, index) {
        return 'rgb(' + color.rgba.slice(0, 3).join(',') + ') ' + (index == 0 ? '0%' : '75%');
      }).join(',');
      return prefixes.map(function (prefix) {
        return 'background-image: -' + prefix + '-linear-gradient(\n                      135deg,\n                      ' + val + '\n                  )';
      }).concat(['background-image: linear-gradient(\n                  135deg,\n                  ' + val + '\n              )']).join(';') + (this.setText ? this.getTextColor(colors) : '');
    }
  }, {
    key: 'getBackGroundColor',
    value: function getBackGroundColor(colors) {
      return 'background-color :rgb(' + colors[colors.length - 1].rgba.slice(0, 3).join(',') + ')';
    }
  }, {
    key: 'parse',
    value: function parse(target) {
      var _this3 = this;

      this.getImageStatus(function () {
        var colors = _this3.reduce(_this3.map());
        target.style.cssText += _this3.type === 0 ? _this3.getBackGroundColor(colors) : _this3.getCSSGradientProperty(colors);
      });
    }
  }]);

  return CanvasRender;
}(_base2.default);

exports.default = CanvasRender;
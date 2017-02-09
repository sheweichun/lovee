
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

    _this.limit = options.limit || 10;
    _this.type = options.type || 0;
    _this.initCanvas();
    return _this;
  }

  _createClass(CanvasRender, [{
    key: 'adjustRatio',
    value: function adjustRatio(canvas, context) {
      var devicePixelRatio = window.devicePixelRatio || 1,
          backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
          ratio = devicePixelRatio / backingStoreRatio;
      var unit = 'px';
      // ensure we have a value set for auto.
      // If auto is set to false then we
      // will simply not upscale the canvas
      // and the default behaviour will be maintained
      var oldWidth = canvas.width,
          oldHeight = canvas.height;
      // upscale the canvas if the two ratios don't match
      if (devicePixelRatio !== backingStoreRatio) {

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;
        canvas.style.width = oldWidth + unit;
        canvas.style.height = oldHeight + unit;
        context.scale(ratio, ratio);
      }
    }
  }, {
    key: 'initCanvas',
    value: function initCanvas() {
      var image = this.image,
          ratio = this.ratio;

      var unit = 'px';
      var width = 1,
          height = image.height;
      this.canvas = document.createElement('canvas');
      var canvas = this.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.dimensions = { width: width, height: height };
      this.canvas.width = width;
      this.canvas.height = height;
      // canvas.width = width;
      // canvas.height = height;
      // canvas.style.width = image.width + unit;
      // canvas.style.height = height + unit;
      // this.ctx.scale(image.width, 1);
      if (this.type === 0) {
        this.ctx.drawImage(this.image, this.image.width - 1, 0, 1, this.image.height, 0, 0, 1, this.canvas.height);
      } else {
        this.ctx.drawImage(this.image, 0, 0);
      }
      // this.imageData = this.ctx.getImageData(
      //     0, 0, width, height
      // ).data;
      this.imageData = this.canvas.toDataURL('image/png');
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
    key: 'parse',
    value: function parse(target) {
      var _this3 = this;

      this.getImageStatus(function () {
        target.style.backgroundImage = 'url(' + _this3.imageData + ')';
      });
      // return this.type === 0 ? this.getBackGroundColor(colors) : this.getCSSGradientProperty(colors);
    }
  }]);

  return CanvasRender;
}(_base2.default);

exports.default = CanvasRender;

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../util');

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prefixes = ['webkit', 'moz', 'o'];
module.exports = function (_BaseRender) {
  _inherits(CanvasRender, _BaseRender);

  function CanvasRender(image, options) {
    _classCallCheck(this, CanvasRender);

    var _this = _possibleConstructorReturn(this, (CanvasRender.__proto__ || Object.getPrototypeOf(CanvasRender)).call(this, image));

    _this.ratio = _this.getAttribute('ratio') || options.ratio || 2;
    return _this;
  }

  _createClass(CanvasRender, [{
    key: 'parse',
    value: function parse(target, cb) {
      // let dom = document.createElement('div');
      // dom.innerHTML =
      target.style.cssText = '    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    overflow: hidden;';
      target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" style="position: relative;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: ' + this.ratio * 100 + '%;\n    height: ' + this.ratio * 100 + '%;">\n      <defs>\n        <filter id="blur"><feGaussianBlur stdDeviation="50"></feGaussianBlur></filter>\n      </defs>\n      <image style="width:100%;height:100%;"\n        xmlns:xlink="http://www.w3.org/1999/xlink"\n        xlink:href="' + this.image.src + '"\n        filter="url(#blur)"></image>\n    </svg>';
      // return this.type === 0 ? this.getBackGroundColor(colors) : this.getCSSGradientProperty(colors);
    }
  }]);

  return CanvasRender;
}(_base2.default);
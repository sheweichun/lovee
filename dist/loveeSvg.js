(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LoveeSvg"] = factory();
	else
		root["LoveeSvg"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHtmlElement = getHtmlElement;
exports.getImageByUrl = getImageByUrl;
exports.supportCORS = supportCORS;


// const isArray = (arr) => {
//   return Object.prototype.toString.call(arr) === '[object Array]';
// };

function getHtmlElement(obj) {
  return obj instanceof NodeList || obj instanceof HTMLElement ? obj : document.querySelectorAll(obj);
}

function getImageByUrl(url) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
      return resolve(img);
    }
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (e) {
      reject(e);
    };
  });
}

var toArray = exports.toArray = Array.from || function () {
  var toStr = Object.prototype.toString;
  var isCallable = function isCallable(fn) {
    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
  };
  var toInteger = function toInteger(value) {
    var number = Number(value);
    if (isNaN(number)) {
      return 0;
    }
    if (number === 0 || !isFinite(number)) {
      return number;
    }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function toLength(value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };

  // The length property of the from method is 1.
  return function from(arrayLike /* , mapFn, thisArg */) {
    // 1. Let C be the this value.
    var C = this;

    // 2. Let items be ToObject(arrayLike).
    var items = Object(arrayLike);

    // 3. ReturnIfAbrupt(items).
    if (arrayLike == null) {
      throw new TypeError('Array.from requires an array-like object - not null or undefined');
    }

    // 4. If mapfn is undefined, then let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== 'undefined') {
      // 5. else
      // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError('Array.from: when provided, the second argument must be a function');
      }

      // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
    }

    // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len = toLength(items.length);

    // 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).
    var A = isCallable(C) ? Object(new C(len)) : new Array(len);

    // 16. Let k be 0.
    var k = 0;
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }
    // 18. Let putStatus be Put(A, "length", len, true).
    A.length = len;
    // 20. Return A.
    return A;
  };
}();

// function normalAttributeName(name) {
//   return name.replace(/[A-Z]/g, (s) => {
//     return '-' + s.toLowerCase();
//   });
// }
// export function getAttribute(dom, name) {
//   return dom.dataset ? dom.dataset[name] : dom.getAttribute('data-' + normalAttributeName(name));
// }

function supportCORS() {
  var img = new Image();
  return img.crossOrigin !== undefined;
}

/***/ },

/***/ 1:
/***/ function(module, exports) {

"use strict";
'use strict';
// var invariant = require('invariant');

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function normalAttributeName(name) {
  return name.replace(/[A-Z]/g, function (s) {
    return '-' + s.toLowerCase();
  });
}

var BaseRender = function () {
  function BaseRender(image) {
    _classCallCheck(this, BaseRender);

    this.image = image;
  }

  _createClass(BaseRender, [{
    key: 'toObject',
    value: function toObject() {}
  }, {
    key: 'getAttribute',
    value: function getAttribute(name) {
      var dom = this.image;
      return dom.dataset ? dom.dataset[name] : dom.getAttribute('data-' + normalAttributeName(name));
    }
  }]);

  return BaseRender;
}();

exports.default = BaseRender;

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

"use strict";

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

var _base = __webpack_require__(1);

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

/***/ }

/******/ });
});
//# sourceMappingURL=LoveeSvg.js.map
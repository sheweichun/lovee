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
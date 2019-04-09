(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-crop-simple"] = factory();
	else
		root["vue-crop-simple"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'VueCrop',

  props: {
    initRect: {
      type: Object,
      default: function _default() {
        return {
          x1: -1,
          y1: -1,
          x2: -1,
          y2: -1
        };
      }
    },

    showRect: {
      type: Boolean,
      default: true
    },

    resizeAble: {
      type: Boolean,
      default: true
    },

    aspectRatio: {
      type: Number,
      default: undefined
    },

    allowStartNewCrop: {
      type: Boolean,
      default: true
    },

    minWidth: {
      type: Number,
      default: undefined
    },

    maxWidth: {
      type: Number,
      default: undefined
    },

    minHeight: {
      type: Number,
      default: undefined
    },

    maxHeight: {
      type: Number,
      default: undefined
    }
  },

  // horizontal 简写h 代表横向， vertical 简写v 代表纵向
  // 分成两路，一路先横着走，然后竖着走，另外一路先竖着走，再横着走，
  // 最后都从start到达end
  // x1,y1  hv1    hv2
  // 口-----口-----口
  // |start        |
  // |             |
  // 口vh1         口 hv3
  // |             |
  // |             |
  // 口-----口-----口 end
  // vh2    vh3    x2,y2

  data: function data() {
    return {
      x1: this.initRect.x1,
      y1: this.initRect.y1,
      x2: this.initRect.x2,
      y2: this.initRect.y2,
      directionMark: 1,
      modifyCoordinates: []
    };
  },


  computed: {
    start: function start() {
      return { x: this.x1, y: this.y1 };
    },
    end: function end() {
      return { x: this.x2, y: this.y2 };
    },
    hv1: function hv1() {
      var point = {
        x: (this.x1 + this.x2) / 2,
        y: this.y1
      };
      return point;
    },
    hv2: function hv2() {
      var point = {
        x: this.x2,
        y: this.y1
      };
      return point;
    },
    hv3: function hv3() {
      var point = {
        x: this.x2,
        y: (this.y1 + this.y2) / 2
      };
      return point;
    },
    vh1: function vh1() {
      var point = {
        x: this.x1,
        y: (this.y1 + this.y2) / 2
      };
      return point;
    },
    vh2: function vh2() {
      var point = {
        x: this.x1,
        y: this.y2
      };
      return point;
    },
    vh3: function vh3() {
      var point = {
        x: (this.x1 + this.x2) / 2,
        y: this.y2
      };
      return point;
    },
    width: function width() {
      return Math.abs(this.x2 - this.x1);
    },
    height: function height() {
      return Math.abs(this.y2 - this.y1);
    },
    leftTopCorner: function leftTopCorner() {
      var leftTopCornerX = this.x1 > this.x2 ? this.x2 : this.x1;
      var leftTopCornerY = this.y1 > this.y2 ? this.y2 : this.y1;
      return { x: leftTopCornerX, y: leftTopCornerY };
    },
    rightBottomCorner: function rightBottomCorner() {
      var rightBottomCornerX = this.x1 > this.x2 ? this.x1 : this.x2;
      var rightBottomCornerY = this.y1 > this.y2 ? this.y1 : this.y2;
      return { x: rightBottomCornerX, y: rightBottomCornerY };
    },
    leftBottomCorner: function leftBottomCorner() {
      var leftBottomCornerX = this.x1 > this.x2 ? this.x2 : this.x1;
      var leftBottomCornerY = this.y1 > this.y2 ? this.y1 : this.y2;
      return { x: leftBottomCornerX, y: leftBottomCornerY };
    },
    rightTopCorner: function rightTopCorner() {
      var rightTopCornerX = this.x1 > this.x2 ? this.x1 : this.x2;
      var rightTopCornerY = this.y1 > this.y2 ? this.y2 : this.y1;
      return { x: rightTopCornerX, y: rightTopCornerY };
    },
    cursorMode: function cursorMode() {
      if ((this.x2 - this.x1) * (this.y2 - this.y1) > 0) {
        return 'mode1';
      } else {
        return 'mode2';
      }
    },
    show: function show() {
      return this.showRect && this.x1 >= 0 && this.y1 >= 0 && this.x2 >= 0 && this.y2 >= 0;
    },
    rectStyle: function rectStyle() {
      var style = {
        left: this.leftTopCorner.x + 'px',
        top: this.leftTopCorner.y + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        cursor: 'move'
      };
      return style;
    },
    startStyle: function startStyle() {
      var style = {
        left: this.start.x + 'px',
        top: this.start.y + 'px',
        cursor: this.cursorMode === 'mode1' ? 'nw-resize' : 'ne-resize'
      };
      return style;
    },
    hv1Style: function hv1Style() {
      var style = {
        left: this.hv1.x + 'px',
        top: this.hv1.y + 'px',
        cursor: 'n-resize'
      };
      return style;
    },
    hv2Style: function hv2Style() {
      var style = {
        left: this.hv2.x + 'px',
        top: this.hv2.y + 'px',
        cursor: this.cursorMode === 'mode1' ? 'ne-resize' : 'nw-resize'
      };
      return style;
    },
    hv3Style: function hv3Style() {
      var style = {
        left: this.hv3.x + 'px',
        top: this.hv3.y + 'px',
        cursor: 'e-resize'
      };
      return style;
    },
    vh1Style: function vh1Style() {
      var style = {
        left: this.vh1.x + 'px',
        top: this.vh1.y + 'px',
        cursor: 'e-resize'
      };
      return style;
    },
    vh2Style: function vh2Style() {
      var style = {
        left: this.vh2.x + 'px',
        top: this.vh2.y + 'px',
        cursor: this.cursorMode === 'mode1' ? 'ne-resize' : 'nw-resize'
      };
      return style;
    },
    vh3Style: function vh3Style() {
      var style = {
        left: this.vh3.x + 'px',
        top: this.vh3.y + 'px',
        cursor: 'n-resize'
      };
      return style;
    },
    endStyle: function endStyle() {
      var style = {
        left: this.end.x + 'px',
        top: this.end.y + 'px',
        cursor: this.cursorMode === 'mode1' ? 'nw-resize' : 'ne-resize'
      };
      return style;
    },
    bgLeftStyle: function bgLeftStyle() {
      var style = {
        left: '0',
        top: '0',
        bottom: '0',
        width: this.outX1 + 'px'
      };
      return style;
    },
    bgRightStyle: function bgRightStyle() {
      var style = {
        right: '0',
        top: '0',
        bottom: '0',
        left: this.outX2 + 'px'
      };
      return style;
    },
    bgTopStyle: function bgTopStyle() {
      var style = {
        width: this.width + 'px',
        top: '0',
        height: this.outY1 + 'px',
        left: this.outX1 + 'px'
      };
      return style;
    },
    bgBottomStyle: function bgBottomStyle() {
      var style = {
        width: this.width + 'px',
        top: this.outY2 + 'px',
        left: this.outX1 + 'px',
        bottom: 0
      };
      return style;
    },
    isChanging: function isChanging() {
      return this.modifyCoordinates.length > 0;
    },
    outX1: function outX1() {
      return this.x1 > this.x2 ? this.x2 : this.x1;
    },
    outX2: function outX2() {
      return this.x1 > this.x2 ? this.x1 : this.x2;
    },
    outY1: function outY1() {
      return this.y1 > this.y2 ? this.y2 : this.y1;
    },
    outY2: function outY2() {
      return this.y1 > this.y2 ? this.y1 : this.y2;
    },
    rightXName: function rightXName() {
      return this.x1 > this.x2 ? 'x1' : 'x2';
    },
    bottomYName: function bottomYName() {
      return this.y1 > this.y2 ? 'y1' : 'y2';
    },
    innerMinHeight: function innerMinHeight() {
      if (this.minHeight) {
        return Math.max(this.minHeight, 0);
      }
      return 0;
    },
    innerMaxHeight: function innerMaxHeight() {
      if (this.maxHeight) {
        return Math.min(this.maxHeight, this.$refs.drawPanel.offsetHeight);
      }
      return this.$refs.drawPanel.offsetHeight;
    },
    innerMinWidth: function innerMinWidth() {
      if (this.minWidth) {
        return Math.max(this.minWidth, 0);
      } else {
        return 0;
      }
    },
    innerMaxWidth: function innerMaxWidth() {
      if (this.maxWidth) {
        return Math.min(this.maxWidth, this.$refs.drawPanel.offsetWidth);
      }
      return this.$refs.drawPanel.offsetWidth;
    }
  },

  watch: {
    initRect: {
      handler: function handler(value) {
        this.x1 = value.x1;
        this.y1 = value.y1;
        this.x2 = value.x2;
        this.y2 = value.y2;
      },

      deep: true
    },

    showRect: function showRect(value) {
      if (value === false) {
        this.x1 = -1;
        this.x2 = -1;
        this.y1 = -1;
        this.y2 = -1;
      } else {
        this.x1 = this.initRect.x1;
        this.y1 = this.initRect.y1;
        this.x2 = this.initRect.x2;
        this.y2 = this.initRect.y2;
      }
    }
  },

  mounted: function mounted() {
    var _this = this;

    var leaveOrUp = function leaveOrUp() {
      if (_this.modifyCoordinates.length > 0) {
        _this.$emit('changed', _this.getResult());
      }
      _this.modifyCoordinates = [];
      window.document.removeEventListener('mousemove', _this.doDrag);
    };
    window.document.addEventListener('mouseup', leaveOrUp);
    window.document.addEventListener('mouseleave', leaveOrUp);
    this.$emit('created', this.getResult());
  },


  methods: {
    readyForDrag: function readyForDrag(coordinates) {
      this.firstDrag = true;
      var newCoordinate = this.reSort(coordinates);
      this.modifyCoordinates = newCoordinate;
      window.document.addEventListener('mousemove', this.doDrag);
      this.$emit('beforeChange', this.getResult());
    },
    doDrag: function doDrag(e) {
      if (e.movementX === 0 && e.movementY === 0) {
        return;
      }
      if (this.firstDrag) {
        this.directionMark = 1;
        if (this.x1 === this.x2 && this.y1 === this.y2) {
          var defaultX = 1;
          var defaultY = 1;
          var x = e.movementX || defaultX;
          var y = e.movementY || defaultY;
          if (x * y < 0) {
            this.directionMark = -1;
          }
        } else {
          if (this.x2 === this.rightTopCorner.x && this.y2 === this.rightTopCorner.y || this.x2 === this.leftBottomCorner.x && this.y2 === this.leftBottomCorner.y) {
            this.directionMark = -1;
          }
        }
      }
      this.firstDrag = false;
      var targetCoordinates = this.getTargetCoordinates({ movementX: e.movementX, movementY: e.movementY });
      this.x1 = targetCoordinates.x1;
      this.x2 = targetCoordinates.x2;
      this.y1 = targetCoordinates.y1;
      this.y2 = targetCoordinates.y2;
    },
    getTargetCoordinates: function getTargetCoordinates(movement) {
      var _this2 = this;

      var modifyCoordinates = this.modifyCoordinates;
      var targetCoordinates = {};
      var targetWidth = void 0,
          targetHeight = void 0;
      var mainDirection = void 0;
      if (modifyCoordinates.length === 1) {
        mainDirection = modifyCoordinates[0];
        if (this.aspectRatio) {
          var subDirection = mainDirection === 'x2' ? 'y2' : 'x2';
          modifyCoordinates.push(subDirection);
        }
      } else {
        mainDirection = Math.abs(movement.movementX) < Math.abs(movement.movementY) ? 'y2' : 'x2';
      }
      this.modifyAspectRation(mainDirection, movement);

      var setTargetInfo = function setTargetInfo() {
        targetCoordinates = { x1: _this2.x1, x2: _this2.x2, y1: _this2.y1, y2: _this2.y2 };
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = modifyCoordinates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var coordinate = _step.value;

            targetCoordinates[coordinate] = _this2[coordinate] + movement['movement' + coordinate[0].toUpperCase()];
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        targetWidth = Math.abs(targetCoordinates.x2 - targetCoordinates.x1);
        targetHeight = Math.abs(targetCoordinates.y2 - targetCoordinates.y1);
      };

      setTargetInfo();

      var modifyMovementByDiff = function modifyMovementByDiff(movement, moveDirction, diff) {
        var movementDirection = 'movement' + moveDirction.toUpperCase();
        movement[movementDirection] = movement[movementDirection] > 0 ? movement[movementDirection] - diff : movement[movementDirection] + diff;
        _this2.modifyAspectRation(moveDirction + '2', movement);
        setTargetInfo();
      };

      var validateMax = function validateMax(target, max, direction) {
        if (target > max) {
          var diff = target - max;
          modifyMovementByDiff(movement, direction, diff);
        }
      };

      var validateMin = function validateMin(target, min, direction) {
        if (target < min) {
          var diff = min - target;
          modifyMovementByDiff(movement, direction, diff);
        }
      };

      validateMax(targetWidth, this.innerMaxWidth, 'x');
      validateMin(targetWidth, this.innerMinWidth, 'x');
      validateMax(targetHeight, this.innerMaxHeight, 'y');
      validateMin(targetHeight, this.innerMinHeight, 'y');

      var maxX = this.$refs.drawPanel.offsetWidth;
      var minX = 0;
      var maxY = this.$refs.drawPanel.offsetHeight;
      var minY = 0;

      validateMax(targetCoordinates.x2, maxX, 'x');
      validateMin(targetCoordinates.x2, minX, 'x');
      validateMax(targetCoordinates.y2, maxY, 'y');
      validateMin(targetCoordinates.y2, minY, 'y');

      if (modifyCoordinates.length === 4) {
        validateMax(targetCoordinates.x1, maxX, 'x');
        validateMin(targetCoordinates.x1, minX, 'x');
        validateMax(targetCoordinates.y1, maxY, 'y');
        validateMin(targetCoordinates.y1, minY, 'y');
      }

      return targetCoordinates;
    },
    modifyAspectRation: function modifyAspectRation(mainDirection, movement) {
      if (this.modifyCoordinates.length !== 4) {
        var subDirection = mainDirection === 'x2' ? 'y2' : 'x2';
        var mainMovementName = 'movement' + mainDirection[0].toUpperCase();
        var subMovementName = 'movement' + subDirection[0].toUpperCase();
        if (this.aspectRatio) {
          if (mainDirection[0] === 'x') {
            movement[subMovementName] = movement[mainMovementName] / this.aspectRatio * this.directionMark;
          } else {
            movement[subMovementName] = movement[mainMovementName] * this.aspectRatio * this.directionMark;
          }
        }
      }
    },
    reSort: function reSort(coordinates) {
      var originCoordinate = {
        x1: this.x1,
        x2: this.x2,
        y1: this.y1,
        y2: this.y2
      };
      var direction = void 0,
          endPointPartner = void 0;
      var newCoordinate = [];
      if (coordinates.length === 1) {
        direction = coordinates[0][0];
        endPointPartner = direction === 'x' ? this.bottomYName : this.rightXName;
        newCoordinate = [direction + '2'];
      }

      if (coordinates.length === 2) {
        direction = coordinates[0][0];
        endPointPartner = coordinates[1];
        newCoordinate = [coordinates[0][0] + '2', coordinates[1][0] + '2'];
      }

      if (coordinates.length === 4) {
        newCoordinate = coordinates;
      }

      if (coordinates.length !== 4) {
        this[direction + '2'] = originCoordinate[coordinates[0]];
        this[endPointPartner[0] + '2'] = originCoordinate[endPointPartner];
        this[direction + '1'] = originCoordinate[this.getAgainstCoordinateName(coordinates[0])];
        this[endPointPartner[0] + '1'] = originCoordinate[this.getAgainstCoordinateName(endPointPartner)];
      }

      return newCoordinate;
    },
    getAgainstCoordinateName: function getAgainstCoordinateName(coordinateName) {
      return coordinateName[1] === '1' ? coordinateName[0] + '2' : coordinateName[0] + '1';
    },
    startDrawNewCrop: function startDrawNewCrop(e) {
      if (!this.allowStartNewCrop) {
        return;
      }

      var rect = this.$refs.drawPanel.getBoundingClientRect();
      var targetRect = e.target.getBoundingClientRect();
      var pointX = e.offsetX - rect.left + targetRect.left;
      var pointY = e.offsetY - rect.top + targetRect.top;
      this.x1 = pointX;
      this.y1 = pointY;
      this.x2 = pointX;
      this.y2 = pointY;
      this.modifyCoordinates = ['x2', 'y2'];
      this.firstDrag = true;
      window.document.addEventListener('mousemove', this.doDrag);
    },
    getResult: function getResult() {
      var maxX = this.$refs.drawPanel.offsetWidth;
      var maxY = this.$refs.drawPanel.offsetHeight;
      var x = this.outX1 * 1000 / maxX;
      var y = this.outY1 * 1000 / maxY;
      var result = {
        x1: x,
        y1: y,
        x: x,
        y: y,
        x2: this.outX2 * 1000 / maxX,
        y2: this.outY2 * 1000 / maxY,
        w: this.width * 1000 / maxX,
        h: this.height * 1000 / maxY,
        xpx: this.outX1,
        ypx: this.outY1,
        wpx: this.width,
        hpx: this.height,
        x1px: this.outX1,
        y1px: this.outY1,
        x2px: this.outX2,
        y2px: this.outY2,
        croperWidth: maxX,
        croperHeight: maxY
      };
      return result;
    }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueCrop = __webpack_require__(2);

var _vueCrop2 = _interopRequireDefault(_vueCrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vueCrop2.default.install = function (Vue) {
  Vue.component('vue-crop', _vueCrop2.default);
};

exports.default = _vueCrop2.default;


if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(_vueCrop2.default);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60b53eb4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_crop_vue__ = __webpack_require__(5);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(3)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60b53eb4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_crop_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60b53eb4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_crop_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/vue-crop.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60b53eb4", Component.options)
  } else {
    hotAPI.reload("data-v-60b53eb4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "drawPanel",
      staticClass: "draw-panel unselect",
      on: { mousedown: _vm.startDrawNewCrop }
    },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.show,
              expression: "show"
            }
          ],
          class: {
            "crop-container": true,
            unselect: true,
            "cursor-crosshair": !_vm.isChanging
          }
        },
        [
          _c("div", {
            staticClass: "unselect bg-rect",
            style: _vm.bgLeftStyle
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "unselect bg-rect",
            style: _vm.bgRightStyle
          }),
          _vm._v(" "),
          _c("div", { staticClass: "unselect bg-rect", style: _vm.bgTopStyle }),
          _vm._v(" "),
          _c("div", {
            staticClass: "unselect bg-rect",
            style: _vm.bgBottomStyle
          }),
          _vm._v(" "),
          _c("div", {
            staticClass: "rect unselect",
            style: _vm.rectStyle,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x1", "y1", "x2", "y2"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-start",
            style: _vm.startStyle,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x1", "y1"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-hv1",
            style: _vm.hv1Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["y1"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-hv2",
            style: _vm.hv2Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["y1", "x2"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-hv3",
            style: _vm.hv3Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x2"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-vh1",
            style: _vm.vh1Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x1"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-vh2",
            style: _vm.vh2Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x1", "y2"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-vh3",
            style: _vm.vh3Style,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["y2"])
              }
            }
          }),
          _vm._v(" "),
          _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.resizeAble,
                expression: "resizeAble"
              }
            ],
            staticClass: "anchor unselect anchor-end",
            style: _vm.endStyle,
            on: {
              mousedown: function($event) {
                $event.stopPropagation()
                return _vm.readyForDrag(["x2", "y2"])
              }
            }
          })
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-60b53eb4", esExports)
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-crop-simple.umd.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _formatter = /*#__PURE__*/ _interop_require_default(require("./formatter.js"));
var _utils = /*#__PURE__*/ _interop_require_wildcard(require("./utils.js"));
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var extractErrorDetails = function(obj) {
    if (_instanceof(obj, Error)) {
        var deets = {
            error_message: obj.message,
            error_name: obj.name
        };
        if ("stack" in obj) {
            deets.error_stack = obj.stack;
        }
        return deets;
    } else if (typeof obj === "string") {
        return {
            message: obj
        };
    } else {
        return obj;
    }
};
var loggerArgs = function(level, message) {
    for(var _len = arguments.length, metas = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
        metas[_key - 2] = arguments[_key];
    }
    var args = [
        level
    ];
    // if not a string, assume it's a meta object
    if (typeof message === "string") {
        args.push(message);
    } else {
        metas.unshift(message);
    }
    if (metas.length) {
        args.push(metas.reduceRight(function(currentFormattedMetas, meta) {
            return Object.assign({}, currentFormattedMetas, extractErrorDetails(meta));
        }, {}));
    }
    return args;
};
var Logger = /*#__PURE__*/ function() {
    "use strict";
    function Logger() {
        var deps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var _this = this;
        _class_call_check(this, Logger);
        this.deps = Object.assign({
            formatter: _formatter.default
        }, deps);
        this.context = {};
        // create logging methods
        [
            "data",
            "debug",
            "error",
            "info",
            "silly",
            "verbose",
            "warn"
        ].forEach(function(level) {
            return _this[level] = function() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                return _this.log.apply(_this, [
                    level
                ].concat(_to_consumable_array(args)));
            };
        });
    }
    _create_class(Logger, [
        {
            key: "log",
            value: function log(level, message) {
                for(var _len = arguments.length, metas = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
                    metas[_key - 2] = arguments[_key];
                }
                var args = loggerArgs.apply(void 0, [
                    level,
                    message
                ].concat(_to_consumable_array(metas), [
                    this.context
                ])).filter(_utils.identity);
                this.doLog.apply(this, args);
            }
        },
        {
            key: "doLog",
            value: function doLog() {
            // to be implemented by subclasses
            }
        },
        {
            key: "addContext",
            value: function addContext() {
                var meta = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                this.context = Object.assign({}, this.context, meta);
            }
        }
    ]);
    return Logger;
}();
var _default = Logger;

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
var _winston = /*#__PURE__*/ _interopRequireDefault(require("winston"));
var _logger = /*#__PURE__*/ _interopRequireDefault(require("./logger"));
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
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
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
var _typeof = function(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true;
    } catch (e) {
        return false;
    }
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}
var AppLogger = /*#__PURE__*/ function(Logger) {
    "use strict";
    _inherits(AppLogger, Logger);
    var _super = _createSuper(AppLogger);
    function AppLogger() {
        var deps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, AppLogger);
        var _this;
        _this = _super.call(this, deps);
        Object.assign(_this.deps, {
            winston: _winston.default
        }, deps);
        _this.logger = _winston.default.createLogger({
            transports: [
                new _this.deps.winston.transports.Console({
                    colorize: _this.deps.colorize,
                    level: _this.deps.level,
                    json: _this.deps.json,
                    stringify: true
                })
            ]
        });
        return _this;
    }
    _createClass(AppLogger, [
        {
            key: "doLog",
            value: function doLog() {
                for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                    args[_key] = arguments[_key];
                }
                this.logger.log.apply(this.logger, args);
            }
        },
        {
            key: "addConsole",
            value: function addConsole() {
                var level = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "info", colorize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true, opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                if (this.logger.transports.console) {
                    return;
                }
                this.logger.add(this.deps.winston.transports.Console, Object.assign({
                    level: level,
                    formatter: this.deps.formatter,
                    colorize: colorize
                }, opts));
            }
        },
        {
            key: "addLogger",
            value: function addLogger(incomingLogger) {
                var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "info", opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                this.logger.add(incomingLogger, Object.assign({
                    level: level
                }, opts));
            }
        },
        {
            key: "removeConsole",
            value: function removeConsole() {
                if (!this.logger.transports.console) {
                    return;
                }
                this.logger.remove("console");
            }
        },
        {
            key: "clearLoggers",
            value: function clearLoggers() {
                var _this = this;
                Object.keys(this.logger.transports).forEach(function(logger) {
                    return _this.logger.remove(logger);
                });
            }
        }
    ]);
    return AppLogger;
}(_logger.default);
var _default = AppLogger;

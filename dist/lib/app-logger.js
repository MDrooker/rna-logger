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
var _winston = /*#__PURE__*/ _interop_require_default(require("winston"));
var _logger = /*#__PURE__*/ _interop_require_default(require("./logger.js"));
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
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
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
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
function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
        var Super = _get_prototype_of(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _get_prototype_of(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possible_constructor_return(this, result);
    };
}
var AppLogger = /*#__PURE__*/ function(Logger) {
    "use strict";
    _inherits(AppLogger, Logger);
    var _super = _create_super(AppLogger);
    function AppLogger() {
        var deps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _class_call_check(this, AppLogger);
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
    _create_class(AppLogger, [
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

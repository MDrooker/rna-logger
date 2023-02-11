"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    debugModule: function() {
        return _debug.default;
    },
    logger: function() {
        return logger;
    }
});
var _functionLogger = /*#__PURE__*/ _interopRequireDefault(require("./lib/function-logger"));
var _appLogger = /*#__PURE__*/ _interopRequireDefault(require("./lib/app-logger"));
var _debug = /*#__PURE__*/ _interopRequireDefault(require("debug"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var getLogger = function() {
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.FUNCTION_NAME) {
        // Lambda environment - don't use Winston
        // GCP Function environment - don't use Winston
        return new _functionLogger.default();
    } else {
        // app environment - use Winston
        var consoleLogLevel = process.env.CONSOLE_LOG_LEVEL || "silly";
        var logger = new _appLogger.default({
            level: consoleLogLevel,
            colorize: process.env.CONSOLE_LOG_UNCOLORIZED !== "true",
            json: true
        });
        return logger;
    }
};
var logger = getLogger();
var _default = logger;

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
var _functionlogger = /*#__PURE__*/ _interop_require_default(require("./lib/function-logger.js"));
var _applogger = /*#__PURE__*/ _interop_require_default(require("./lib/app-logger.js"));
var _debug = /*#__PURE__*/ _interop_require_default(require("debug"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var getLogger = function() {
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.FUNCTION_NAME) {
        // Lambda environment - don't use Winston
        // GCP Function environment - don't use Winston
        return new _functionlogger.default();
    } else {
        // app environment - use Winston
        var consoleLogLevel = process.env.CONSOLE_LOG_LEVEL || "silly";
        var logger = new _applogger.default({
            level: consoleLogLevel,
            colorize: process.env.CONSOLE_LOG_UNCOLORIZED !== "true",
            json: true
        });
        return logger;
    }
};
var logger = getLogger();
var _default = logger;

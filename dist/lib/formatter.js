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
    fields: function() {
        return formatFields;
    }
});
var _utils = /*#__PURE__*/ _interopRequireWildcard(require("./utils"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
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
function _objectDestructuringEmpty(o) {
    if (o === null || o === void 0) throw new TypeError("Cannot destructure " + o);
    return o;
}
var sanitise = function(value) {
    return typeof value === "string" ? value.replace(/"/g, "'").replace(/\n/g, "	") : value;
};
var formatMessage = function(message) {
    return sanitise(message);
};
var formatFields = function() {
    var fields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _objectDestructuringEmpty({});
    var formattedFields = Object.keys(fields).map(function(fieldName) {
        var fieldValue = fields[fieldName];
        return "".concat(fieldName, "=").concat(fieldValue);
    });
    return formattedFields.join(" ");
};
var formatter = function() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, level = _ref.level, _ref_message = _ref.message, message = _ref_message === void 0 ? "" : _ref_message, _ref_meta = _ref.meta, meta = _ref_meta === void 0 ? {} : _ref_meta;
    if (level) {
        meta.level = level;
    }
    var formattedMessage = formatMessage(message);
    return [
        formattedMessage,
        formatFields(meta)
    ].filter(_utils.identity).join(" ");
};
var _default = formatter;

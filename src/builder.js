"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.builder = void 0;
// A generic builder that works for *ALL* object types
function builder(options) {
    return {
        "with": _with,
        build: function () { return (__assign({}, options.defaultValues)); }
    };
    function _with(t1) {
        return {
            "with": function (t2) { return _with(__assign(__assign({}, t1), t2)); },
            build: function () { return (__assign(__assign({}, options.defaultValues), t1)); }
        };
    }
}
exports.builder = builder;

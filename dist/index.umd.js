(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}));
}(this, (function (exports) { 'use strict';

    function sayHello() {
        return "Hi ya all!";
    }

    exports.sayHello = sayHello;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

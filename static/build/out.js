(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS((exports, module) => {
    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i3 = 0; i3 < 10; i3++) {
          test2["_" + String.fromCharCode(i3)] = i3;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n3) {
          return test2[n3];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s3 = 1; s3 < arguments.length; s3++) {
        from = Object(arguments[s3]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i3 = 0; i3 < symbols.length; i3++) {
            if (propIsEnumerable.call(from, symbols[i3])) {
              to[symbols[i3]] = from[symbols[i3]];
            }
          }
        }
      }
      return to;
    };
  });

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS((exports) => {
    /** @license React v17.0.2
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var l3 = require_object_assign();
    var n3 = 60103;
    var p3 = 60106;
    exports.Fragment = 60107;
    exports.StrictMode = 60108;
    exports.Profiler = 60114;
    var q2 = 60109;
    var r3 = 60110;
    var t3 = 60112;
    exports.Suspense = 60113;
    var u3 = 60115;
    var v2 = 60116;
    if (typeof Symbol === "function" && Symbol.for) {
      w3 = Symbol.for;
      n3 = w3("react.element");
      p3 = w3("react.portal");
      exports.Fragment = w3("react.fragment");
      exports.StrictMode = w3("react.strict_mode");
      exports.Profiler = w3("react.profiler");
      q2 = w3("react.provider");
      r3 = w3("react.context");
      t3 = w3("react.forward_ref");
      exports.Suspense = w3("react.suspense");
      u3 = w3("react.memo");
      v2 = w3("react.lazy");
    }
    var w3;
    var x2 = typeof Symbol === "function" && Symbol.iterator;
    function y3(a3) {
      if (a3 === null || typeof a3 !== "object")
        return null;
      a3 = x2 && a3[x2] || a3["@@iterator"];
      return typeof a3 === "function" ? a3 : null;
    }
    function z3(a3) {
      for (var b3 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a3, c3 = 1; c3 < arguments.length; c3++)
        b3 += "&args[]=" + encodeURIComponent(arguments[c3]);
      return "Minified React error #" + a3 + "; visit " + b3 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    var A2 = {isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    }};
    var B2 = {};
    function C2(a3, b3, c3) {
      this.props = a3;
      this.context = b3;
      this.refs = B2;
      this.updater = c3 || A2;
    }
    C2.prototype.isReactComponent = {};
    C2.prototype.setState = function(a3, b3) {
      if (typeof a3 !== "object" && typeof a3 !== "function" && a3 != null)
        throw Error(z3(85));
      this.updater.enqueueSetState(this, a3, b3, "setState");
    };
    C2.prototype.forceUpdate = function(a3) {
      this.updater.enqueueForceUpdate(this, a3, "forceUpdate");
    };
    function D2() {
    }
    D2.prototype = C2.prototype;
    function E2(a3, b3, c3) {
      this.props = a3;
      this.context = b3;
      this.refs = B2;
      this.updater = c3 || A2;
    }
    var F2 = E2.prototype = new D2();
    F2.constructor = E2;
    l3(F2, C2.prototype);
    F2.isPureReactComponent = true;
    var G2 = {current: null};
    var H2 = Object.prototype.hasOwnProperty;
    var I2 = {key: true, ref: true, __self: true, __source: true};
    function J(a3, b3, c3) {
      var e3, d3 = {}, k2 = null, h3 = null;
      if (b3 != null)
        for (e3 in b3.ref !== void 0 && (h3 = b3.ref), b3.key !== void 0 && (k2 = "" + b3.key), b3)
          H2.call(b3, e3) && !I2.hasOwnProperty(e3) && (d3[e3] = b3[e3]);
      var g3 = arguments.length - 2;
      if (g3 === 1)
        d3.children = c3;
      else if (1 < g3) {
        for (var f3 = Array(g3), m2 = 0; m2 < g3; m2++)
          f3[m2] = arguments[m2 + 2];
        d3.children = f3;
      }
      if (a3 && a3.defaultProps)
        for (e3 in g3 = a3.defaultProps, g3)
          d3[e3] === void 0 && (d3[e3] = g3[e3]);
      return {$$typeof: n3, type: a3, key: k2, ref: h3, props: d3, _owner: G2.current};
    }
    function K(a3, b3) {
      return {$$typeof: n3, type: a3.type, key: b3, ref: a3.ref, props: a3.props, _owner: a3._owner};
    }
    function L2(a3) {
      return typeof a3 === "object" && a3 !== null && a3.$$typeof === n3;
    }
    function escape(a3) {
      var b3 = {"=": "=0", ":": "=2"};
      return "$" + a3.replace(/[=:]/g, function(a4) {
        return b3[a4];
      });
    }
    var M2 = /\/+/g;
    function N2(a3, b3) {
      return typeof a3 === "object" && a3 !== null && a3.key != null ? escape("" + a3.key) : b3.toString(36);
    }
    function O2(a3, b3, c3, e3, d3) {
      var k2 = typeof a3;
      if (k2 === "undefined" || k2 === "boolean")
        a3 = null;
      var h3 = false;
      if (a3 === null)
        h3 = true;
      else
        switch (k2) {
          case "string":
          case "number":
            h3 = true;
            break;
          case "object":
            switch (a3.$$typeof) {
              case n3:
              case p3:
                h3 = true;
            }
        }
      if (h3)
        return h3 = a3, d3 = d3(h3), a3 = e3 === "" ? "." + N2(h3, 0) : e3, Array.isArray(d3) ? (c3 = "", a3 != null && (c3 = a3.replace(M2, "$&/") + "/"), O2(d3, b3, c3, "", function(a4) {
          return a4;
        })) : d3 != null && (L2(d3) && (d3 = K(d3, c3 + (!d3.key || h3 && h3.key === d3.key ? "" : ("" + d3.key).replace(M2, "$&/") + "/") + a3)), b3.push(d3)), 1;
      h3 = 0;
      e3 = e3 === "" ? "." : e3 + ":";
      if (Array.isArray(a3))
        for (var g3 = 0; g3 < a3.length; g3++) {
          k2 = a3[g3];
          var f3 = e3 + N2(k2, g3);
          h3 += O2(k2, b3, c3, f3, d3);
        }
      else if (f3 = y3(a3), typeof f3 === "function")
        for (a3 = f3.call(a3), g3 = 0; !(k2 = a3.next()).done; )
          k2 = k2.value, f3 = e3 + N2(k2, g3++), h3 += O2(k2, b3, c3, f3, d3);
      else if (k2 === "object")
        throw b3 = "" + a3, Error(z3(31, b3 === "[object Object]" ? "object with keys {" + Object.keys(a3).join(", ") + "}" : b3));
      return h3;
    }
    function P2(a3, b3, c3) {
      if (a3 == null)
        return a3;
      var e3 = [], d3 = 0;
      O2(a3, e3, "", "", function(a4) {
        return b3.call(c3, a4, d3++);
      });
      return e3;
    }
    function Q2(a3) {
      if (a3._status === -1) {
        var b3 = a3._result;
        b3 = b3();
        a3._status = 0;
        a3._result = b3;
        b3.then(function(b4) {
          a3._status === 0 && (b4 = b4.default, a3._status = 1, a3._result = b4);
        }, function(b4) {
          a3._status === 0 && (a3._status = 2, a3._result = b4);
        });
      }
      if (a3._status === 1)
        return a3._result;
      throw a3._result;
    }
    var R7 = {current: null};
    function S2() {
      var a3 = R7.current;
      if (a3 === null)
        throw Error(z3(321));
      return a3;
    }
    var T = {ReactCurrentDispatcher: R7, ReactCurrentBatchConfig: {transition: 0}, ReactCurrentOwner: G2, IsSomeRendererActing: {current: false}, assign: l3};
    exports.Children = {map: P2, forEach: function(a3, b3, c3) {
      P2(a3, function() {
        b3.apply(this, arguments);
      }, c3);
    }, count: function(a3) {
      var b3 = 0;
      P2(a3, function() {
        b3++;
      });
      return b3;
    }, toArray: function(a3) {
      return P2(a3, function(a4) {
        return a4;
      }) || [];
    }, only: function(a3) {
      if (!L2(a3))
        throw Error(z3(143));
      return a3;
    }};
    exports.Component = C2;
    exports.PureComponent = E2;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;
    exports.cloneElement = function(a3, b3, c3) {
      if (a3 === null || a3 === void 0)
        throw Error(z3(267, a3));
      var e3 = l3({}, a3.props), d3 = a3.key, k2 = a3.ref, h3 = a3._owner;
      if (b3 != null) {
        b3.ref !== void 0 && (k2 = b3.ref, h3 = G2.current);
        b3.key !== void 0 && (d3 = "" + b3.key);
        if (a3.type && a3.type.defaultProps)
          var g3 = a3.type.defaultProps;
        for (f3 in b3)
          H2.call(b3, f3) && !I2.hasOwnProperty(f3) && (e3[f3] = b3[f3] === void 0 && g3 !== void 0 ? g3[f3] : b3[f3]);
      }
      var f3 = arguments.length - 2;
      if (f3 === 1)
        e3.children = c3;
      else if (1 < f3) {
        g3 = Array(f3);
        for (var m2 = 0; m2 < f3; m2++)
          g3[m2] = arguments[m2 + 2];
        e3.children = g3;
      }
      return {
        $$typeof: n3,
        type: a3.type,
        key: d3,
        ref: k2,
        props: e3,
        _owner: h3
      };
    };
    exports.createContext = function(a3, b3) {
      b3 === void 0 && (b3 = null);
      a3 = {$$typeof: r3, _calculateChangedBits: b3, _currentValue: a3, _currentValue2: a3, _threadCount: 0, Provider: null, Consumer: null};
      a3.Provider = {$$typeof: q2, _context: a3};
      return a3.Consumer = a3;
    };
    exports.createElement = J;
    exports.createFactory = function(a3) {
      var b3 = J.bind(null, a3);
      b3.type = a3;
      return b3;
    };
    exports.createRef = function() {
      return {current: null};
    };
    exports.forwardRef = function(a3) {
      return {$$typeof: t3, render: a3};
    };
    exports.isValidElement = L2;
    exports.lazy = function(a3) {
      return {$$typeof: v2, _payload: {_status: -1, _result: a3}, _init: Q2};
    };
    exports.memo = function(a3, b3) {
      return {$$typeof: u3, type: a3, compare: b3 === void 0 ? null : b3};
    };
    exports.useCallback = function(a3, b3) {
      return S2().useCallback(a3, b3);
    };
    exports.useContext = function(a3, b3) {
      return S2().useContext(a3, b3);
    };
    exports.useDebugValue = function() {
    };
    exports.useEffect = function(a3, b3) {
      return S2().useEffect(a3, b3);
    };
    exports.useImperativeHandle = function(a3, b3, c3) {
      return S2().useImperativeHandle(a3, b3, c3);
    };
    exports.useLayoutEffect = function(a3, b3) {
      return S2().useLayoutEffect(a3, b3);
    };
    exports.useMemo = function(a3, b3) {
      return S2().useMemo(a3, b3);
    };
    exports.useReducer = function(a3, b3, c3) {
      return S2().useReducer(a3, b3, c3);
    };
    exports.useRef = function(a3) {
      return S2().useRef(a3);
    };
    exports.useState = function(a3) {
      return S2().useState(a3);
    };
    exports.version = "17.0.2";
  });

  // node_modules/react/index.js
  var require_react = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS((exports) => {
    /** @license React v0.20.2
     * scheduler.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var f3;
    var g3;
    var h3;
    var k2;
    if (typeof performance === "object" && typeof performance.now === "function") {
      l3 = performance;
      exports.unstable_now = function() {
        return l3.now();
      };
    } else {
      p3 = Date, q2 = p3.now();
      exports.unstable_now = function() {
        return p3.now() - q2;
      };
    }
    var l3;
    var p3;
    var q2;
    if (typeof window === "undefined" || typeof MessageChannel !== "function") {
      t3 = null, u3 = null, w3 = function() {
        if (t3 !== null)
          try {
            var a3 = exports.unstable_now();
            t3(true, a3);
            t3 = null;
          } catch (b3) {
            throw setTimeout(w3, 0), b3;
          }
      };
      f3 = function(a3) {
        t3 !== null ? setTimeout(f3, 0, a3) : (t3 = a3, setTimeout(w3, 0));
      };
      g3 = function(a3, b3) {
        u3 = setTimeout(a3, b3);
      };
      h3 = function() {
        clearTimeout(u3);
      };
      exports.unstable_shouldYield = function() {
        return false;
      };
      k2 = exports.unstable_forceFrameRate = function() {
      };
    } else {
      x2 = window.setTimeout, y3 = window.clearTimeout;
      if (typeof console !== "undefined") {
        z3 = window.cancelAnimationFrame;
        typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
        typeof z3 !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      }
      A2 = false, B2 = null, C2 = -1, D2 = 5, E2 = 0;
      exports.unstable_shouldYield = function() {
        return exports.unstable_now() >= E2;
      };
      k2 = function() {
      };
      exports.unstable_forceFrameRate = function(a3) {
        0 > a3 || 125 < a3 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D2 = 0 < a3 ? Math.floor(1e3 / a3) : 5;
      };
      F2 = new MessageChannel(), G2 = F2.port2;
      F2.port1.onmessage = function() {
        if (B2 !== null) {
          var a3 = exports.unstable_now();
          E2 = a3 + D2;
          try {
            B2(true, a3) ? G2.postMessage(null) : (A2 = false, B2 = null);
          } catch (b3) {
            throw G2.postMessage(null), b3;
          }
        } else
          A2 = false;
      };
      f3 = function(a3) {
        B2 = a3;
        A2 || (A2 = true, G2.postMessage(null));
      };
      g3 = function(a3, b3) {
        C2 = x2(function() {
          a3(exports.unstable_now());
        }, b3);
      };
      h3 = function() {
        y3(C2);
        C2 = -1;
      };
    }
    var t3;
    var u3;
    var w3;
    var x2;
    var y3;
    var z3;
    var A2;
    var B2;
    var C2;
    var D2;
    var E2;
    var F2;
    var G2;
    function H2(a3, b3) {
      var c3 = a3.length;
      a3.push(b3);
      a:
        for (; ; ) {
          var d3 = c3 - 1 >>> 1, e3 = a3[d3];
          if (e3 !== void 0 && 0 < I2(e3, b3))
            a3[d3] = b3, a3[c3] = e3, c3 = d3;
          else
            break a;
        }
    }
    function J(a3) {
      a3 = a3[0];
      return a3 === void 0 ? null : a3;
    }
    function K(a3) {
      var b3 = a3[0];
      if (b3 !== void 0) {
        var c3 = a3.pop();
        if (c3 !== b3) {
          a3[0] = c3;
          a:
            for (var d3 = 0, e3 = a3.length; d3 < e3; ) {
              var m2 = 2 * (d3 + 1) - 1, n3 = a3[m2], v2 = m2 + 1, r3 = a3[v2];
              if (n3 !== void 0 && 0 > I2(n3, c3))
                r3 !== void 0 && 0 > I2(r3, n3) ? (a3[d3] = r3, a3[v2] = c3, d3 = v2) : (a3[d3] = n3, a3[m2] = c3, d3 = m2);
              else if (r3 !== void 0 && 0 > I2(r3, c3))
                a3[d3] = r3, a3[v2] = c3, d3 = v2;
              else
                break a;
            }
        }
        return b3;
      }
      return null;
    }
    function I2(a3, b3) {
      var c3 = a3.sortIndex - b3.sortIndex;
      return c3 !== 0 ? c3 : a3.id - b3.id;
    }
    var L2 = [];
    var M2 = [];
    var N2 = 1;
    var O2 = null;
    var P2 = 3;
    var Q2 = false;
    var R7 = false;
    var S2 = false;
    function T(a3) {
      for (var b3 = J(M2); b3 !== null; ) {
        if (b3.callback === null)
          K(M2);
        else if (b3.startTime <= a3)
          K(M2), b3.sortIndex = b3.expirationTime, H2(L2, b3);
        else
          break;
        b3 = J(M2);
      }
    }
    function U2(a3) {
      S2 = false;
      T(a3);
      if (!R7)
        if (J(L2) !== null)
          R7 = true, f3(V2);
        else {
          var b3 = J(M2);
          b3 !== null && g3(U2, b3.startTime - a3);
        }
    }
    function V2(a3, b3) {
      R7 = false;
      S2 && (S2 = false, h3());
      Q2 = true;
      var c3 = P2;
      try {
        T(b3);
        for (O2 = J(L2); O2 !== null && (!(O2.expirationTime > b3) || a3 && !exports.unstable_shouldYield()); ) {
          var d3 = O2.callback;
          if (typeof d3 === "function") {
            O2.callback = null;
            P2 = O2.priorityLevel;
            var e3 = d3(O2.expirationTime <= b3);
            b3 = exports.unstable_now();
            typeof e3 === "function" ? O2.callback = e3 : O2 === J(L2) && K(L2);
            T(b3);
          } else
            K(L2);
          O2 = J(L2);
        }
        if (O2 !== null)
          var m2 = true;
        else {
          var n3 = J(M2);
          n3 !== null && g3(U2, n3.startTime - b3);
          m2 = false;
        }
        return m2;
      } finally {
        O2 = null, P2 = c3, Q2 = false;
      }
    }
    var W2 = k2;
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(a3) {
      a3.callback = null;
    };
    exports.unstable_continueExecution = function() {
      R7 || Q2 || (R7 = true, f3(V2));
    };
    exports.unstable_getCurrentPriorityLevel = function() {
      return P2;
    };
    exports.unstable_getFirstCallbackNode = function() {
      return J(L2);
    };
    exports.unstable_next = function(a3) {
      switch (P2) {
        case 1:
        case 2:
        case 3:
          var b3 = 3;
          break;
        default:
          b3 = P2;
      }
      var c3 = P2;
      P2 = b3;
      try {
        return a3();
      } finally {
        P2 = c3;
      }
    };
    exports.unstable_pauseExecution = function() {
    };
    exports.unstable_requestPaint = W2;
    exports.unstable_runWithPriority = function(a3, b3) {
      switch (a3) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          a3 = 3;
      }
      var c3 = P2;
      P2 = a3;
      try {
        return b3();
      } finally {
        P2 = c3;
      }
    };
    exports.unstable_scheduleCallback = function(a3, b3, c3) {
      var d3 = exports.unstable_now();
      typeof c3 === "object" && c3 !== null ? (c3 = c3.delay, c3 = typeof c3 === "number" && 0 < c3 ? d3 + c3 : d3) : c3 = d3;
      switch (a3) {
        case 1:
          var e3 = -1;
          break;
        case 2:
          e3 = 250;
          break;
        case 5:
          e3 = 1073741823;
          break;
        case 4:
          e3 = 1e4;
          break;
        default:
          e3 = 5e3;
      }
      e3 = c3 + e3;
      a3 = {id: N2++, callback: b3, priorityLevel: a3, startTime: c3, expirationTime: e3, sortIndex: -1};
      c3 > d3 ? (a3.sortIndex = c3, H2(M2, a3), J(L2) === null && a3 === J(M2) && (S2 ? h3() : S2 = true, g3(U2, c3 - d3))) : (a3.sortIndex = e3, H2(L2, a3), R7 || Q2 || (R7 = true, f3(V2)));
      return a3;
    };
    exports.unstable_wrapCallback = function(a3) {
      var b3 = P2;
      return function() {
        var c3 = P2;
        P2 = b3;
        try {
          return a3.apply(this, arguments);
        } finally {
          P2 = c3;
        }
      };
    };
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_scheduler_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS((exports) => {
    /** @license React v17.0.2
     * react-dom.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var aa = require_react();
    var m2 = require_object_assign();
    var r3 = require_scheduler();
    function y3(a3) {
      for (var b3 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a3, c3 = 1; c3 < arguments.length; c3++)
        b3 += "&args[]=" + encodeURIComponent(arguments[c3]);
      return "Minified React error #" + a3 + "; visit " + b3 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    if (!aa)
      throw Error(y3(227));
    var ba = new Set();
    var ca = {};
    function da(a3, b3) {
      ea(a3, b3);
      ea(a3 + "Capture", b3);
    }
    function ea(a3, b3) {
      ca[a3] = b3;
      for (a3 = 0; a3 < b3.length; a3++)
        ba.add(b3[a3]);
    }
    var fa = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
    var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var ia = Object.prototype.hasOwnProperty;
    var ja = {};
    var ka = {};
    function la(a3) {
      if (ia.call(ka, a3))
        return true;
      if (ia.call(ja, a3))
        return false;
      if (ha.test(a3))
        return ka[a3] = true;
      ja[a3] = true;
      return false;
    }
    function ma(a3, b3, c3, d3) {
      if (c3 !== null && c3.type === 0)
        return false;
      switch (typeof b3) {
        case "function":
        case "symbol":
          return true;
        case "boolean":
          if (d3)
            return false;
          if (c3 !== null)
            return !c3.acceptsBooleans;
          a3 = a3.toLowerCase().slice(0, 5);
          return a3 !== "data-" && a3 !== "aria-";
        default:
          return false;
      }
    }
    function na(a3, b3, c3, d3) {
      if (b3 === null || typeof b3 === "undefined" || ma(a3, b3, c3, d3))
        return true;
      if (d3)
        return false;
      if (c3 !== null)
        switch (c3.type) {
          case 3:
            return !b3;
          case 4:
            return b3 === false;
          case 5:
            return isNaN(b3);
          case 6:
            return isNaN(b3) || 1 > b3;
        }
      return false;
    }
    function B2(a3, b3, c3, d3, e3, f3, g3) {
      this.acceptsBooleans = b3 === 2 || b3 === 3 || b3 === 4;
      this.attributeName = d3;
      this.attributeNamespace = e3;
      this.mustUseProperty = c3;
      this.propertyName = a3;
      this.type = b3;
      this.sanitizeURL = f3;
      this.removeEmptyString = g3;
    }
    var D2 = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a3) {
      D2[a3] = new B2(a3, 0, false, a3, null, false, false);
    });
    [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a3) {
      var b3 = a3[0];
      D2[b3] = new B2(b3, 1, false, a3[1], null, false, false);
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a3) {
      D2[a3] = new B2(a3, 2, false, a3.toLowerCase(), null, false, false);
    });
    ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a3) {
      D2[a3] = new B2(a3, 2, false, a3, null, false, false);
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a3) {
      D2[a3] = new B2(a3, 3, false, a3.toLowerCase(), null, false, false);
    });
    ["checked", "multiple", "muted", "selected"].forEach(function(a3) {
      D2[a3] = new B2(a3, 3, true, a3, null, false, false);
    });
    ["capture", "download"].forEach(function(a3) {
      D2[a3] = new B2(a3, 4, false, a3, null, false, false);
    });
    ["cols", "rows", "size", "span"].forEach(function(a3) {
      D2[a3] = new B2(a3, 6, false, a3, null, false, false);
    });
    ["rowSpan", "start"].forEach(function(a3) {
      D2[a3] = new B2(a3, 5, false, a3.toLowerCase(), null, false, false);
    });
    var oa = /[\-:]([a-z])/g;
    function pa(a3) {
      return a3[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a3) {
      var b3 = a3.replace(oa, pa);
      D2[b3] = new B2(b3, 1, false, a3, null, false, false);
    });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a3) {
      var b3 = a3.replace(oa, pa);
      D2[b3] = new B2(b3, 1, false, a3, "http://www.w3.org/1999/xlink", false, false);
    });
    ["xml:base", "xml:lang", "xml:space"].forEach(function(a3) {
      var b3 = a3.replace(oa, pa);
      D2[b3] = new B2(b3, 1, false, a3, "http://www.w3.org/XML/1998/namespace", false, false);
    });
    ["tabIndex", "crossOrigin"].forEach(function(a3) {
      D2[a3] = new B2(a3, 1, false, a3.toLowerCase(), null, false, false);
    });
    D2.xlinkHref = new B2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
    ["src", "href", "action", "formAction"].forEach(function(a3) {
      D2[a3] = new B2(a3, 1, false, a3.toLowerCase(), null, true, true);
    });
    function qa(a3, b3, c3, d3) {
      var e3 = D2.hasOwnProperty(b3) ? D2[b3] : null;
      var f3 = e3 !== null ? e3.type === 0 : d3 ? false : !(2 < b3.length) || b3[0] !== "o" && b3[0] !== "O" || b3[1] !== "n" && b3[1] !== "N" ? false : true;
      f3 || (na(b3, c3, e3, d3) && (c3 = null), d3 || e3 === null ? la(b3) && (c3 === null ? a3.removeAttribute(b3) : a3.setAttribute(b3, "" + c3)) : e3.mustUseProperty ? a3[e3.propertyName] = c3 === null ? e3.type === 3 ? false : "" : c3 : (b3 = e3.attributeName, d3 = e3.attributeNamespace, c3 === null ? a3.removeAttribute(b3) : (e3 = e3.type, c3 = e3 === 3 || e3 === 4 && c3 === true ? "" : "" + c3, d3 ? a3.setAttributeNS(d3, b3, c3) : a3.setAttribute(b3, c3))));
    }
    var ra = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    var sa = 60103;
    var ta = 60106;
    var ua = 60107;
    var wa = 60108;
    var xa = 60114;
    var ya = 60109;
    var za = 60110;
    var Aa = 60112;
    var Ba = 60113;
    var Ca = 60120;
    var Da = 60115;
    var Ea = 60116;
    var Fa = 60121;
    var Ga = 60128;
    var Ha = 60129;
    var Ia = 60130;
    var Ja = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      E2 = Symbol.for;
      sa = E2("react.element");
      ta = E2("react.portal");
      ua = E2("react.fragment");
      wa = E2("react.strict_mode");
      xa = E2("react.profiler");
      ya = E2("react.provider");
      za = E2("react.context");
      Aa = E2("react.forward_ref");
      Ba = E2("react.suspense");
      Ca = E2("react.suspense_list");
      Da = E2("react.memo");
      Ea = E2("react.lazy");
      Fa = E2("react.block");
      E2("react.scope");
      Ga = E2("react.opaque.id");
      Ha = E2("react.debug_trace_mode");
      Ia = E2("react.offscreen");
      Ja = E2("react.legacy_hidden");
    }
    var E2;
    var Ka = typeof Symbol === "function" && Symbol.iterator;
    function La(a3) {
      if (a3 === null || typeof a3 !== "object")
        return null;
      a3 = Ka && a3[Ka] || a3["@@iterator"];
      return typeof a3 === "function" ? a3 : null;
    }
    var Ma;
    function Na(a3) {
      if (Ma === void 0)
        try {
          throw Error();
        } catch (c3) {
          var b3 = c3.stack.trim().match(/\n( *(at )?)/);
          Ma = b3 && b3[1] || "";
        }
      return "\n" + Ma + a3;
    }
    var Oa = false;
    function Pa(a3, b3) {
      if (!a3 || Oa)
        return "";
      Oa = true;
      var c3 = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (b3)
          if (b3 = function() {
            throw Error();
          }, Object.defineProperty(b3.prototype, "props", {set: function() {
            throw Error();
          }}), typeof Reflect === "object" && Reflect.construct) {
            try {
              Reflect.construct(b3, []);
            } catch (k2) {
              var d3 = k2;
            }
            Reflect.construct(a3, [], b3);
          } else {
            try {
              b3.call();
            } catch (k2) {
              d3 = k2;
            }
            a3.call(b3.prototype);
          }
        else {
          try {
            throw Error();
          } catch (k2) {
            d3 = k2;
          }
          a3();
        }
      } catch (k2) {
        if (k2 && d3 && typeof k2.stack === "string") {
          for (var e3 = k2.stack.split("\n"), f3 = d3.stack.split("\n"), g3 = e3.length - 1, h3 = f3.length - 1; 1 <= g3 && 0 <= h3 && e3[g3] !== f3[h3]; )
            h3--;
          for (; 1 <= g3 && 0 <= h3; g3--, h3--)
            if (e3[g3] !== f3[h3]) {
              if (g3 !== 1 || h3 !== 1) {
                do
                  if (g3--, h3--, 0 > h3 || e3[g3] !== f3[h3])
                    return "\n" + e3[g3].replace(" at new ", " at ");
                while (1 <= g3 && 0 <= h3);
              }
              break;
            }
        }
      } finally {
        Oa = false, Error.prepareStackTrace = c3;
      }
      return (a3 = a3 ? a3.displayName || a3.name : "") ? Na(a3) : "";
    }
    function Qa(a3) {
      switch (a3.tag) {
        case 5:
          return Na(a3.type);
        case 16:
          return Na("Lazy");
        case 13:
          return Na("Suspense");
        case 19:
          return Na("SuspenseList");
        case 0:
        case 2:
        case 15:
          return a3 = Pa(a3.type, false), a3;
        case 11:
          return a3 = Pa(a3.type.render, false), a3;
        case 22:
          return a3 = Pa(a3.type._render, false), a3;
        case 1:
          return a3 = Pa(a3.type, true), a3;
        default:
          return "";
      }
    }
    function Ra(a3) {
      if (a3 == null)
        return null;
      if (typeof a3 === "function")
        return a3.displayName || a3.name || null;
      if (typeof a3 === "string")
        return a3;
      switch (a3) {
        case ua:
          return "Fragment";
        case ta:
          return "Portal";
        case xa:
          return "Profiler";
        case wa:
          return "StrictMode";
        case Ba:
          return "Suspense";
        case Ca:
          return "SuspenseList";
      }
      if (typeof a3 === "object")
        switch (a3.$$typeof) {
          case za:
            return (a3.displayName || "Context") + ".Consumer";
          case ya:
            return (a3._context.displayName || "Context") + ".Provider";
          case Aa:
            var b3 = a3.render;
            b3 = b3.displayName || b3.name || "";
            return a3.displayName || (b3 !== "" ? "ForwardRef(" + b3 + ")" : "ForwardRef");
          case Da:
            return Ra(a3.type);
          case Fa:
            return Ra(a3._render);
          case Ea:
            b3 = a3._payload;
            a3 = a3._init;
            try {
              return Ra(a3(b3));
            } catch (c3) {
            }
        }
      return null;
    }
    function Sa(a3) {
      switch (typeof a3) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return a3;
        default:
          return "";
      }
    }
    function Ta(a3) {
      var b3 = a3.type;
      return (a3 = a3.nodeName) && a3.toLowerCase() === "input" && (b3 === "checkbox" || b3 === "radio");
    }
    function Ua(a3) {
      var b3 = Ta(a3) ? "checked" : "value", c3 = Object.getOwnPropertyDescriptor(a3.constructor.prototype, b3), d3 = "" + a3[b3];
      if (!a3.hasOwnProperty(b3) && typeof c3 !== "undefined" && typeof c3.get === "function" && typeof c3.set === "function") {
        var e3 = c3.get, f3 = c3.set;
        Object.defineProperty(a3, b3, {configurable: true, get: function() {
          return e3.call(this);
        }, set: function(a4) {
          d3 = "" + a4;
          f3.call(this, a4);
        }});
        Object.defineProperty(a3, b3, {enumerable: c3.enumerable});
        return {getValue: function() {
          return d3;
        }, setValue: function(a4) {
          d3 = "" + a4;
        }, stopTracking: function() {
          a3._valueTracker = null;
          delete a3[b3];
        }};
      }
    }
    function Va(a3) {
      a3._valueTracker || (a3._valueTracker = Ua(a3));
    }
    function Wa(a3) {
      if (!a3)
        return false;
      var b3 = a3._valueTracker;
      if (!b3)
        return true;
      var c3 = b3.getValue();
      var d3 = "";
      a3 && (d3 = Ta(a3) ? a3.checked ? "true" : "false" : a3.value);
      a3 = d3;
      return a3 !== c3 ? (b3.setValue(a3), true) : false;
    }
    function Xa(a3) {
      a3 = a3 || (typeof document !== "undefined" ? document : void 0);
      if (typeof a3 === "undefined")
        return null;
      try {
        return a3.activeElement || a3.body;
      } catch (b3) {
        return a3.body;
      }
    }
    function Ya(a3, b3) {
      var c3 = b3.checked;
      return m2({}, b3, {defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c3 != null ? c3 : a3._wrapperState.initialChecked});
    }
    function Za(a3, b3) {
      var c3 = b3.defaultValue == null ? "" : b3.defaultValue, d3 = b3.checked != null ? b3.checked : b3.defaultChecked;
      c3 = Sa(b3.value != null ? b3.value : c3);
      a3._wrapperState = {initialChecked: d3, initialValue: c3, controlled: b3.type === "checkbox" || b3.type === "radio" ? b3.checked != null : b3.value != null};
    }
    function $a(a3, b3) {
      b3 = b3.checked;
      b3 != null && qa(a3, "checked", b3, false);
    }
    function ab(a3, b3) {
      $a(a3, b3);
      var c3 = Sa(b3.value), d3 = b3.type;
      if (c3 != null)
        if (d3 === "number") {
          if (c3 === 0 && a3.value === "" || a3.value != c3)
            a3.value = "" + c3;
        } else
          a3.value !== "" + c3 && (a3.value = "" + c3);
      else if (d3 === "submit" || d3 === "reset") {
        a3.removeAttribute("value");
        return;
      }
      b3.hasOwnProperty("value") ? bb(a3, b3.type, c3) : b3.hasOwnProperty("defaultValue") && bb(a3, b3.type, Sa(b3.defaultValue));
      b3.checked == null && b3.defaultChecked != null && (a3.defaultChecked = !!b3.defaultChecked);
    }
    function cb(a3, b3, c3) {
      if (b3.hasOwnProperty("value") || b3.hasOwnProperty("defaultValue")) {
        var d3 = b3.type;
        if (!(d3 !== "submit" && d3 !== "reset" || b3.value !== void 0 && b3.value !== null))
          return;
        b3 = "" + a3._wrapperState.initialValue;
        c3 || b3 === a3.value || (a3.value = b3);
        a3.defaultValue = b3;
      }
      c3 = a3.name;
      c3 !== "" && (a3.name = "");
      a3.defaultChecked = !!a3._wrapperState.initialChecked;
      c3 !== "" && (a3.name = c3);
    }
    function bb(a3, b3, c3) {
      if (b3 !== "number" || Xa(a3.ownerDocument) !== a3)
        c3 == null ? a3.defaultValue = "" + a3._wrapperState.initialValue : a3.defaultValue !== "" + c3 && (a3.defaultValue = "" + c3);
    }
    function db(a3) {
      var b3 = "";
      aa.Children.forEach(a3, function(a4) {
        a4 != null && (b3 += a4);
      });
      return b3;
    }
    function eb(a3, b3) {
      a3 = m2({children: void 0}, b3);
      if (b3 = db(b3.children))
        a3.children = b3;
      return a3;
    }
    function fb(a3, b3, c3, d3) {
      a3 = a3.options;
      if (b3) {
        b3 = {};
        for (var e3 = 0; e3 < c3.length; e3++)
          b3["$" + c3[e3]] = true;
        for (c3 = 0; c3 < a3.length; c3++)
          e3 = b3.hasOwnProperty("$" + a3[c3].value), a3[c3].selected !== e3 && (a3[c3].selected = e3), e3 && d3 && (a3[c3].defaultSelected = true);
      } else {
        c3 = "" + Sa(c3);
        b3 = null;
        for (e3 = 0; e3 < a3.length; e3++) {
          if (a3[e3].value === c3) {
            a3[e3].selected = true;
            d3 && (a3[e3].defaultSelected = true);
            return;
          }
          b3 !== null || a3[e3].disabled || (b3 = a3[e3]);
        }
        b3 !== null && (b3.selected = true);
      }
    }
    function gb(a3, b3) {
      if (b3.dangerouslySetInnerHTML != null)
        throw Error(y3(91));
      return m2({}, b3, {value: void 0, defaultValue: void 0, children: "" + a3._wrapperState.initialValue});
    }
    function hb(a3, b3) {
      var c3 = b3.value;
      if (c3 == null) {
        c3 = b3.children;
        b3 = b3.defaultValue;
        if (c3 != null) {
          if (b3 != null)
            throw Error(y3(92));
          if (Array.isArray(c3)) {
            if (!(1 >= c3.length))
              throw Error(y3(93));
            c3 = c3[0];
          }
          b3 = c3;
        }
        b3 == null && (b3 = "");
        c3 = b3;
      }
      a3._wrapperState = {initialValue: Sa(c3)};
    }
    function ib(a3, b3) {
      var c3 = Sa(b3.value), d3 = Sa(b3.defaultValue);
      c3 != null && (c3 = "" + c3, c3 !== a3.value && (a3.value = c3), b3.defaultValue == null && a3.defaultValue !== c3 && (a3.defaultValue = c3));
      d3 != null && (a3.defaultValue = "" + d3);
    }
    function jb(a3) {
      var b3 = a3.textContent;
      b3 === a3._wrapperState.initialValue && b3 !== "" && b3 !== null && (a3.value = b3);
    }
    var kb = {html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg"};
    function lb(a3) {
      switch (a3) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function mb(a3, b3) {
      return a3 == null || a3 === "http://www.w3.org/1999/xhtml" ? lb(b3) : a3 === "http://www.w3.org/2000/svg" && b3 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a3;
    }
    var nb;
    var ob = function(a3) {
      return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b3, c3, d3, e3) {
        MSApp.execUnsafeLocalFunction(function() {
          return a3(b3, c3, d3, e3);
        });
      } : a3;
    }(function(a3, b3) {
      if (a3.namespaceURI !== kb.svg || "innerHTML" in a3)
        a3.innerHTML = b3;
      else {
        nb = nb || document.createElement("div");
        nb.innerHTML = "<svg>" + b3.valueOf().toString() + "</svg>";
        for (b3 = nb.firstChild; a3.firstChild; )
          a3.removeChild(a3.firstChild);
        for (; b3.firstChild; )
          a3.appendChild(b3.firstChild);
      }
    });
    function pb(a3, b3) {
      if (b3) {
        var c3 = a3.firstChild;
        if (c3 && c3 === a3.lastChild && c3.nodeType === 3) {
          c3.nodeValue = b3;
          return;
        }
      }
      a3.textContent = b3;
    }
    var qb = {
      animationIterationCount: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    var rb = ["Webkit", "ms", "Moz", "O"];
    Object.keys(qb).forEach(function(a3) {
      rb.forEach(function(b3) {
        b3 = b3 + a3.charAt(0).toUpperCase() + a3.substring(1);
        qb[b3] = qb[a3];
      });
    });
    function sb(a3, b3, c3) {
      return b3 == null || typeof b3 === "boolean" || b3 === "" ? "" : c3 || typeof b3 !== "number" || b3 === 0 || qb.hasOwnProperty(a3) && qb[a3] ? ("" + b3).trim() : b3 + "px";
    }
    function tb(a3, b3) {
      a3 = a3.style;
      for (var c3 in b3)
        if (b3.hasOwnProperty(c3)) {
          var d3 = c3.indexOf("--") === 0, e3 = sb(c3, b3[c3], d3);
          c3 === "float" && (c3 = "cssFloat");
          d3 ? a3.setProperty(c3, e3) : a3[c3] = e3;
        }
    }
    var ub = m2({menuitem: true}, {area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true});
    function vb(a3, b3) {
      if (b3) {
        if (ub[a3] && (b3.children != null || b3.dangerouslySetInnerHTML != null))
          throw Error(y3(137, a3));
        if (b3.dangerouslySetInnerHTML != null) {
          if (b3.children != null)
            throw Error(y3(60));
          if (!(typeof b3.dangerouslySetInnerHTML === "object" && "__html" in b3.dangerouslySetInnerHTML))
            throw Error(y3(61));
        }
        if (b3.style != null && typeof b3.style !== "object")
          throw Error(y3(62));
      }
    }
    function wb(a3, b3) {
      if (a3.indexOf("-") === -1)
        return typeof b3.is === "string";
      switch (a3) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return false;
        default:
          return true;
      }
    }
    function xb(a3) {
      a3 = a3.target || a3.srcElement || window;
      a3.correspondingUseElement && (a3 = a3.correspondingUseElement);
      return a3.nodeType === 3 ? a3.parentNode : a3;
    }
    var yb = null;
    var zb = null;
    var Ab = null;
    function Bb(a3) {
      if (a3 = Cb(a3)) {
        if (typeof yb !== "function")
          throw Error(y3(280));
        var b3 = a3.stateNode;
        b3 && (b3 = Db(b3), yb(a3.stateNode, a3.type, b3));
      }
    }
    function Eb(a3) {
      zb ? Ab ? Ab.push(a3) : Ab = [a3] : zb = a3;
    }
    function Fb() {
      if (zb) {
        var a3 = zb, b3 = Ab;
        Ab = zb = null;
        Bb(a3);
        if (b3)
          for (a3 = 0; a3 < b3.length; a3++)
            Bb(b3[a3]);
      }
    }
    function Gb(a3, b3) {
      return a3(b3);
    }
    function Hb(a3, b3, c3, d3, e3) {
      return a3(b3, c3, d3, e3);
    }
    function Ib() {
    }
    var Jb = Gb;
    var Kb = false;
    var Lb = false;
    function Mb() {
      if (zb !== null || Ab !== null)
        Ib(), Fb();
    }
    function Nb(a3, b3, c3) {
      if (Lb)
        return a3(b3, c3);
      Lb = true;
      try {
        return Jb(a3, b3, c3);
      } finally {
        Lb = false, Mb();
      }
    }
    function Ob(a3, b3) {
      var c3 = a3.stateNode;
      if (c3 === null)
        return null;
      var d3 = Db(c3);
      if (d3 === null)
        return null;
      c3 = d3[b3];
      a:
        switch (b3) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d3 = !d3.disabled) || (a3 = a3.type, d3 = !(a3 === "button" || a3 === "input" || a3 === "select" || a3 === "textarea"));
            a3 = !d3;
            break a;
          default:
            a3 = false;
        }
      if (a3)
        return null;
      if (c3 && typeof c3 !== "function")
        throw Error(y3(231, b3, typeof c3));
      return c3;
    }
    var Pb = false;
    if (fa)
      try {
        Qb = {};
        Object.defineProperty(Qb, "passive", {get: function() {
          Pb = true;
        }});
        window.addEventListener("test", Qb, Qb);
        window.removeEventListener("test", Qb, Qb);
      } catch (a3) {
        Pb = false;
      }
    var Qb;
    function Rb(a3, b3, c3, d3, e3, f3, g3, h3, k2) {
      var l3 = Array.prototype.slice.call(arguments, 3);
      try {
        b3.apply(c3, l3);
      } catch (n3) {
        this.onError(n3);
      }
    }
    var Sb = false;
    var Tb = null;
    var Ub = false;
    var Vb = null;
    var Wb = {onError: function(a3) {
      Sb = true;
      Tb = a3;
    }};
    function Xb(a3, b3, c3, d3, e3, f3, g3, h3, k2) {
      Sb = false;
      Tb = null;
      Rb.apply(Wb, arguments);
    }
    function Yb(a3, b3, c3, d3, e3, f3, g3, h3, k2) {
      Xb.apply(this, arguments);
      if (Sb) {
        if (Sb) {
          var l3 = Tb;
          Sb = false;
          Tb = null;
        } else
          throw Error(y3(198));
        Ub || (Ub = true, Vb = l3);
      }
    }
    function Zb(a3) {
      var b3 = a3, c3 = a3;
      if (a3.alternate)
        for (; b3.return; )
          b3 = b3.return;
      else {
        a3 = b3;
        do
          b3 = a3, (b3.flags & 1026) !== 0 && (c3 = b3.return), a3 = b3.return;
        while (a3);
      }
      return b3.tag === 3 ? c3 : null;
    }
    function $b(a3) {
      if (a3.tag === 13) {
        var b3 = a3.memoizedState;
        b3 === null && (a3 = a3.alternate, a3 !== null && (b3 = a3.memoizedState));
        if (b3 !== null)
          return b3.dehydrated;
      }
      return null;
    }
    function ac(a3) {
      if (Zb(a3) !== a3)
        throw Error(y3(188));
    }
    function bc(a3) {
      var b3 = a3.alternate;
      if (!b3) {
        b3 = Zb(a3);
        if (b3 === null)
          throw Error(y3(188));
        return b3 !== a3 ? null : a3;
      }
      for (var c3 = a3, d3 = b3; ; ) {
        var e3 = c3.return;
        if (e3 === null)
          break;
        var f3 = e3.alternate;
        if (f3 === null) {
          d3 = e3.return;
          if (d3 !== null) {
            c3 = d3;
            continue;
          }
          break;
        }
        if (e3.child === f3.child) {
          for (f3 = e3.child; f3; ) {
            if (f3 === c3)
              return ac(e3), a3;
            if (f3 === d3)
              return ac(e3), b3;
            f3 = f3.sibling;
          }
          throw Error(y3(188));
        }
        if (c3.return !== d3.return)
          c3 = e3, d3 = f3;
        else {
          for (var g3 = false, h3 = e3.child; h3; ) {
            if (h3 === c3) {
              g3 = true;
              c3 = e3;
              d3 = f3;
              break;
            }
            if (h3 === d3) {
              g3 = true;
              d3 = e3;
              c3 = f3;
              break;
            }
            h3 = h3.sibling;
          }
          if (!g3) {
            for (h3 = f3.child; h3; ) {
              if (h3 === c3) {
                g3 = true;
                c3 = f3;
                d3 = e3;
                break;
              }
              if (h3 === d3) {
                g3 = true;
                d3 = f3;
                c3 = e3;
                break;
              }
              h3 = h3.sibling;
            }
            if (!g3)
              throw Error(y3(189));
          }
        }
        if (c3.alternate !== d3)
          throw Error(y3(190));
      }
      if (c3.tag !== 3)
        throw Error(y3(188));
      return c3.stateNode.current === c3 ? a3 : b3;
    }
    function cc(a3) {
      a3 = bc(a3);
      if (!a3)
        return null;
      for (var b3 = a3; ; ) {
        if (b3.tag === 5 || b3.tag === 6)
          return b3;
        if (b3.child)
          b3.child.return = b3, b3 = b3.child;
        else {
          if (b3 === a3)
            break;
          for (; !b3.sibling; ) {
            if (!b3.return || b3.return === a3)
              return null;
            b3 = b3.return;
          }
          b3.sibling.return = b3.return;
          b3 = b3.sibling;
        }
      }
      return null;
    }
    function dc(a3, b3) {
      for (var c3 = a3.alternate; b3 !== null; ) {
        if (b3 === a3 || b3 === c3)
          return true;
        b3 = b3.return;
      }
      return false;
    }
    var ec;
    var fc;
    var gc;
    var hc;
    var ic = false;
    var jc = [];
    var kc = null;
    var lc = null;
    var mc = null;
    var nc = new Map();
    var oc = new Map();
    var pc = [];
    var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
    function rc(a3, b3, c3, d3, e3) {
      return {blockedOn: a3, domEventName: b3, eventSystemFlags: c3 | 16, nativeEvent: e3, targetContainers: [d3]};
    }
    function sc(a3, b3) {
      switch (a3) {
        case "focusin":
        case "focusout":
          kc = null;
          break;
        case "dragenter":
        case "dragleave":
          lc = null;
          break;
        case "mouseover":
        case "mouseout":
          mc = null;
          break;
        case "pointerover":
        case "pointerout":
          nc.delete(b3.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          oc.delete(b3.pointerId);
      }
    }
    function tc(a3, b3, c3, d3, e3, f3) {
      if (a3 === null || a3.nativeEvent !== f3)
        return a3 = rc(b3, c3, d3, e3, f3), b3 !== null && (b3 = Cb(b3), b3 !== null && fc(b3)), a3;
      a3.eventSystemFlags |= d3;
      b3 = a3.targetContainers;
      e3 !== null && b3.indexOf(e3) === -1 && b3.push(e3);
      return a3;
    }
    function uc(a3, b3, c3, d3, e3) {
      switch (b3) {
        case "focusin":
          return kc = tc(kc, a3, b3, c3, d3, e3), true;
        case "dragenter":
          return lc = tc(lc, a3, b3, c3, d3, e3), true;
        case "mouseover":
          return mc = tc(mc, a3, b3, c3, d3, e3), true;
        case "pointerover":
          var f3 = e3.pointerId;
          nc.set(f3, tc(nc.get(f3) || null, a3, b3, c3, d3, e3));
          return true;
        case "gotpointercapture":
          return f3 = e3.pointerId, oc.set(f3, tc(oc.get(f3) || null, a3, b3, c3, d3, e3)), true;
      }
      return false;
    }
    function vc(a3) {
      var b3 = wc(a3.target);
      if (b3 !== null) {
        var c3 = Zb(b3);
        if (c3 !== null) {
          if (b3 = c3.tag, b3 === 13) {
            if (b3 = $b(c3), b3 !== null) {
              a3.blockedOn = b3;
              hc(a3.lanePriority, function() {
                r3.unstable_runWithPriority(a3.priority, function() {
                  gc(c3);
                });
              });
              return;
            }
          } else if (b3 === 3 && c3.stateNode.hydrate) {
            a3.blockedOn = c3.tag === 3 ? c3.stateNode.containerInfo : null;
            return;
          }
        }
      }
      a3.blockedOn = null;
    }
    function xc(a3) {
      if (a3.blockedOn !== null)
        return false;
      for (var b3 = a3.targetContainers; 0 < b3.length; ) {
        var c3 = yc(a3.domEventName, a3.eventSystemFlags, b3[0], a3.nativeEvent);
        if (c3 !== null)
          return b3 = Cb(c3), b3 !== null && fc(b3), a3.blockedOn = c3, false;
        b3.shift();
      }
      return true;
    }
    function zc(a3, b3, c3) {
      xc(a3) && c3.delete(b3);
    }
    function Ac() {
      for (ic = false; 0 < jc.length; ) {
        var a3 = jc[0];
        if (a3.blockedOn !== null) {
          a3 = Cb(a3.blockedOn);
          a3 !== null && ec(a3);
          break;
        }
        for (var b3 = a3.targetContainers; 0 < b3.length; ) {
          var c3 = yc(a3.domEventName, a3.eventSystemFlags, b3[0], a3.nativeEvent);
          if (c3 !== null) {
            a3.blockedOn = c3;
            break;
          }
          b3.shift();
        }
        a3.blockedOn === null && jc.shift();
      }
      kc !== null && xc(kc) && (kc = null);
      lc !== null && xc(lc) && (lc = null);
      mc !== null && xc(mc) && (mc = null);
      nc.forEach(zc);
      oc.forEach(zc);
    }
    function Bc(a3, b3) {
      a3.blockedOn === b3 && (a3.blockedOn = null, ic || (ic = true, r3.unstable_scheduleCallback(r3.unstable_NormalPriority, Ac)));
    }
    function Cc(a3) {
      function b3(b4) {
        return Bc(b4, a3);
      }
      if (0 < jc.length) {
        Bc(jc[0], a3);
        for (var c3 = 1; c3 < jc.length; c3++) {
          var d3 = jc[c3];
          d3.blockedOn === a3 && (d3.blockedOn = null);
        }
      }
      kc !== null && Bc(kc, a3);
      lc !== null && Bc(lc, a3);
      mc !== null && Bc(mc, a3);
      nc.forEach(b3);
      oc.forEach(b3);
      for (c3 = 0; c3 < pc.length; c3++)
        d3 = pc[c3], d3.blockedOn === a3 && (d3.blockedOn = null);
      for (; 0 < pc.length && (c3 = pc[0], c3.blockedOn === null); )
        vc(c3), c3.blockedOn === null && pc.shift();
    }
    function Dc(a3, b3) {
      var c3 = {};
      c3[a3.toLowerCase()] = b3.toLowerCase();
      c3["Webkit" + a3] = "webkit" + b3;
      c3["Moz" + a3] = "moz" + b3;
      return c3;
    }
    var Ec = {animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd")};
    var Fc = {};
    var Gc = {};
    fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
    function Hc(a3) {
      if (Fc[a3])
        return Fc[a3];
      if (!Ec[a3])
        return a3;
      var b3 = Ec[a3], c3;
      for (c3 in b3)
        if (b3.hasOwnProperty(c3) && c3 in Gc)
          return Fc[a3] = b3[c3];
      return a3;
    }
    var Ic = Hc("animationend");
    var Jc = Hc("animationiteration");
    var Kc = Hc("animationstart");
    var Lc = Hc("transitionend");
    var Mc = new Map();
    var Nc = new Map();
    var Oc = [
      "abort",
      "abort",
      Ic,
      "animationEnd",
      Jc,
      "animationIteration",
      Kc,
      "animationStart",
      "canplay",
      "canPlay",
      "canplaythrough",
      "canPlayThrough",
      "durationchange",
      "durationChange",
      "emptied",
      "emptied",
      "encrypted",
      "encrypted",
      "ended",
      "ended",
      "error",
      "error",
      "gotpointercapture",
      "gotPointerCapture",
      "load",
      "load",
      "loadeddata",
      "loadedData",
      "loadedmetadata",
      "loadedMetadata",
      "loadstart",
      "loadStart",
      "lostpointercapture",
      "lostPointerCapture",
      "playing",
      "playing",
      "progress",
      "progress",
      "seeking",
      "seeking",
      "stalled",
      "stalled",
      "suspend",
      "suspend",
      "timeupdate",
      "timeUpdate",
      Lc,
      "transitionEnd",
      "waiting",
      "waiting"
    ];
    function Pc(a3, b3) {
      for (var c3 = 0; c3 < a3.length; c3 += 2) {
        var d3 = a3[c3], e3 = a3[c3 + 1];
        e3 = "on" + (e3[0].toUpperCase() + e3.slice(1));
        Nc.set(d3, b3);
        Mc.set(d3, e3);
        da(e3, [d3]);
      }
    }
    var Qc = r3.unstable_now;
    Qc();
    var F2 = 8;
    function Rc(a3) {
      if ((1 & a3) !== 0)
        return F2 = 15, 1;
      if ((2 & a3) !== 0)
        return F2 = 14, 2;
      if ((4 & a3) !== 0)
        return F2 = 13, 4;
      var b3 = 24 & a3;
      if (b3 !== 0)
        return F2 = 12, b3;
      if ((a3 & 32) !== 0)
        return F2 = 11, 32;
      b3 = 192 & a3;
      if (b3 !== 0)
        return F2 = 10, b3;
      if ((a3 & 256) !== 0)
        return F2 = 9, 256;
      b3 = 3584 & a3;
      if (b3 !== 0)
        return F2 = 8, b3;
      if ((a3 & 4096) !== 0)
        return F2 = 7, 4096;
      b3 = 4186112 & a3;
      if (b3 !== 0)
        return F2 = 6, b3;
      b3 = 62914560 & a3;
      if (b3 !== 0)
        return F2 = 5, b3;
      if (a3 & 67108864)
        return F2 = 4, 67108864;
      if ((a3 & 134217728) !== 0)
        return F2 = 3, 134217728;
      b3 = 805306368 & a3;
      if (b3 !== 0)
        return F2 = 2, b3;
      if ((1073741824 & a3) !== 0)
        return F2 = 1, 1073741824;
      F2 = 8;
      return a3;
    }
    function Sc(a3) {
      switch (a3) {
        case 99:
          return 15;
        case 98:
          return 10;
        case 97:
        case 96:
          return 8;
        case 95:
          return 2;
        default:
          return 0;
      }
    }
    function Tc(a3) {
      switch (a3) {
        case 15:
        case 14:
          return 99;
        case 13:
        case 12:
        case 11:
        case 10:
          return 98;
        case 9:
        case 8:
        case 7:
        case 6:
        case 4:
        case 5:
          return 97;
        case 3:
        case 2:
        case 1:
          return 95;
        case 0:
          return 90;
        default:
          throw Error(y3(358, a3));
      }
    }
    function Uc(a3, b3) {
      var c3 = a3.pendingLanes;
      if (c3 === 0)
        return F2 = 0;
      var d3 = 0, e3 = 0, f3 = a3.expiredLanes, g3 = a3.suspendedLanes, h3 = a3.pingedLanes;
      if (f3 !== 0)
        d3 = f3, e3 = F2 = 15;
      else if (f3 = c3 & 134217727, f3 !== 0) {
        var k2 = f3 & ~g3;
        k2 !== 0 ? (d3 = Rc(k2), e3 = F2) : (h3 &= f3, h3 !== 0 && (d3 = Rc(h3), e3 = F2));
      } else
        f3 = c3 & ~g3, f3 !== 0 ? (d3 = Rc(f3), e3 = F2) : h3 !== 0 && (d3 = Rc(h3), e3 = F2);
      if (d3 === 0)
        return 0;
      d3 = 31 - Vc(d3);
      d3 = c3 & ((0 > d3 ? 0 : 1 << d3) << 1) - 1;
      if (b3 !== 0 && b3 !== d3 && (b3 & g3) === 0) {
        Rc(b3);
        if (e3 <= F2)
          return b3;
        F2 = e3;
      }
      b3 = a3.entangledLanes;
      if (b3 !== 0)
        for (a3 = a3.entanglements, b3 &= d3; 0 < b3; )
          c3 = 31 - Vc(b3), e3 = 1 << c3, d3 |= a3[c3], b3 &= ~e3;
      return d3;
    }
    function Wc(a3) {
      a3 = a3.pendingLanes & -1073741825;
      return a3 !== 0 ? a3 : a3 & 1073741824 ? 1073741824 : 0;
    }
    function Xc(a3, b3) {
      switch (a3) {
        case 15:
          return 1;
        case 14:
          return 2;
        case 12:
          return a3 = Yc(24 & ~b3), a3 === 0 ? Xc(10, b3) : a3;
        case 10:
          return a3 = Yc(192 & ~b3), a3 === 0 ? Xc(8, b3) : a3;
        case 8:
          return a3 = Yc(3584 & ~b3), a3 === 0 && (a3 = Yc(4186112 & ~b3), a3 === 0 && (a3 = 512)), a3;
        case 2:
          return b3 = Yc(805306368 & ~b3), b3 === 0 && (b3 = 268435456), b3;
      }
      throw Error(y3(358, a3));
    }
    function Yc(a3) {
      return a3 & -a3;
    }
    function Zc(a3) {
      for (var b3 = [], c3 = 0; 31 > c3; c3++)
        b3.push(a3);
      return b3;
    }
    function $c(a3, b3, c3) {
      a3.pendingLanes |= b3;
      var d3 = b3 - 1;
      a3.suspendedLanes &= d3;
      a3.pingedLanes &= d3;
      a3 = a3.eventTimes;
      b3 = 31 - Vc(b3);
      a3[b3] = c3;
    }
    var Vc = Math.clz32 ? Math.clz32 : ad;
    var bd = Math.log;
    var cd = Math.LN2;
    function ad(a3) {
      return a3 === 0 ? 32 : 31 - (bd(a3) / cd | 0) | 0;
    }
    var dd = r3.unstable_UserBlockingPriority;
    var ed = r3.unstable_runWithPriority;
    var fd = true;
    function gd(a3, b3, c3, d3) {
      Kb || Ib();
      var e3 = hd, f3 = Kb;
      Kb = true;
      try {
        Hb(e3, a3, b3, c3, d3);
      } finally {
        (Kb = f3) || Mb();
      }
    }
    function id(a3, b3, c3, d3) {
      ed(dd, hd.bind(null, a3, b3, c3, d3));
    }
    function hd(a3, b3, c3, d3) {
      if (fd) {
        var e3;
        if ((e3 = (b3 & 4) === 0) && 0 < jc.length && -1 < qc.indexOf(a3))
          a3 = rc(null, a3, b3, c3, d3), jc.push(a3);
        else {
          var f3 = yc(a3, b3, c3, d3);
          if (f3 === null)
            e3 && sc(a3, d3);
          else {
            if (e3) {
              if (-1 < qc.indexOf(a3)) {
                a3 = rc(f3, a3, b3, c3, d3);
                jc.push(a3);
                return;
              }
              if (uc(f3, a3, b3, c3, d3))
                return;
              sc(a3, d3);
            }
            jd(a3, b3, d3, null, c3);
          }
        }
      }
    }
    function yc(a3, b3, c3, d3) {
      var e3 = xb(d3);
      e3 = wc(e3);
      if (e3 !== null) {
        var f3 = Zb(e3);
        if (f3 === null)
          e3 = null;
        else {
          var g3 = f3.tag;
          if (g3 === 13) {
            e3 = $b(f3);
            if (e3 !== null)
              return e3;
            e3 = null;
          } else if (g3 === 3) {
            if (f3.stateNode.hydrate)
              return f3.tag === 3 ? f3.stateNode.containerInfo : null;
            e3 = null;
          } else
            f3 !== e3 && (e3 = null);
        }
      }
      jd(a3, b3, d3, e3, c3);
      return null;
    }
    var kd = null;
    var ld = null;
    var md = null;
    function nd() {
      if (md)
        return md;
      var a3, b3 = ld, c3 = b3.length, d3, e3 = "value" in kd ? kd.value : kd.textContent, f3 = e3.length;
      for (a3 = 0; a3 < c3 && b3[a3] === e3[a3]; a3++)
        ;
      var g3 = c3 - a3;
      for (d3 = 1; d3 <= g3 && b3[c3 - d3] === e3[f3 - d3]; d3++)
        ;
      return md = e3.slice(a3, 1 < d3 ? 1 - d3 : void 0);
    }
    function od(a3) {
      var b3 = a3.keyCode;
      "charCode" in a3 ? (a3 = a3.charCode, a3 === 0 && b3 === 13 && (a3 = 13)) : a3 = b3;
      a3 === 10 && (a3 = 13);
      return 32 <= a3 || a3 === 13 ? a3 : 0;
    }
    function pd() {
      return true;
    }
    function qd() {
      return false;
    }
    function rd(a3) {
      function b3(b4, d3, e3, f3, g3) {
        this._reactName = b4;
        this._targetInst = e3;
        this.type = d3;
        this.nativeEvent = f3;
        this.target = g3;
        this.currentTarget = null;
        for (var c3 in a3)
          a3.hasOwnProperty(c3) && (b4 = a3[c3], this[c3] = b4 ? b4(f3) : f3[c3]);
        this.isDefaultPrevented = (f3.defaultPrevented != null ? f3.defaultPrevented : f3.returnValue === false) ? pd : qd;
        this.isPropagationStopped = qd;
        return this;
      }
      m2(b3.prototype, {preventDefault: function() {
        this.defaultPrevented = true;
        var a4 = this.nativeEvent;
        a4 && (a4.preventDefault ? a4.preventDefault() : typeof a4.returnValue !== "unknown" && (a4.returnValue = false), this.isDefaultPrevented = pd);
      }, stopPropagation: function() {
        var a4 = this.nativeEvent;
        a4 && (a4.stopPropagation ? a4.stopPropagation() : typeof a4.cancelBubble !== "unknown" && (a4.cancelBubble = true), this.isPropagationStopped = pd);
      }, persist: function() {
      }, isPersistent: pd});
      return b3;
    }
    var sd = {eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a3) {
      return a3.timeStamp || Date.now();
    }, defaultPrevented: 0, isTrusted: 0};
    var td = rd(sd);
    var ud = m2({}, sd, {view: 0, detail: 0});
    var vd = rd(ud);
    var wd;
    var xd;
    var yd;
    var Ad = m2({}, ud, {screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a3) {
      return a3.relatedTarget === void 0 ? a3.fromElement === a3.srcElement ? a3.toElement : a3.fromElement : a3.relatedTarget;
    }, movementX: function(a3) {
      if ("movementX" in a3)
        return a3.movementX;
      a3 !== yd && (yd && a3.type === "mousemove" ? (wd = a3.screenX - yd.screenX, xd = a3.screenY - yd.screenY) : xd = wd = 0, yd = a3);
      return wd;
    }, movementY: function(a3) {
      return "movementY" in a3 ? a3.movementY : xd;
    }});
    var Bd = rd(Ad);
    var Cd = m2({}, Ad, {dataTransfer: 0});
    var Dd = rd(Cd);
    var Ed = m2({}, ud, {relatedTarget: 0});
    var Fd = rd(Ed);
    var Gd = m2({}, sd, {animationName: 0, elapsedTime: 0, pseudoElement: 0});
    var Hd = rd(Gd);
    var Id = m2({}, sd, {clipboardData: function(a3) {
      return "clipboardData" in a3 ? a3.clipboardData : window.clipboardData;
    }});
    var Jd = rd(Id);
    var Kd = m2({}, sd, {data: 0});
    var Ld = rd(Kd);
    var Md = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    };
    var Nd = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    var Od = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};
    function Pd(a3) {
      var b3 = this.nativeEvent;
      return b3.getModifierState ? b3.getModifierState(a3) : (a3 = Od[a3]) ? !!b3[a3] : false;
    }
    function zd() {
      return Pd;
    }
    var Qd = m2({}, ud, {key: function(a3) {
      if (a3.key) {
        var b3 = Md[a3.key] || a3.key;
        if (b3 !== "Unidentified")
          return b3;
      }
      return a3.type === "keypress" ? (a3 = od(a3), a3 === 13 ? "Enter" : String.fromCharCode(a3)) : a3.type === "keydown" || a3.type === "keyup" ? Nd[a3.keyCode] || "Unidentified" : "";
    }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a3) {
      return a3.type === "keypress" ? od(a3) : 0;
    }, keyCode: function(a3) {
      return a3.type === "keydown" || a3.type === "keyup" ? a3.keyCode : 0;
    }, which: function(a3) {
      return a3.type === "keypress" ? od(a3) : a3.type === "keydown" || a3.type === "keyup" ? a3.keyCode : 0;
    }});
    var Rd = rd(Qd);
    var Sd = m2({}, Ad, {pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0});
    var Td = rd(Sd);
    var Ud = m2({}, ud, {touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd});
    var Vd = rd(Ud);
    var Wd = m2({}, sd, {propertyName: 0, elapsedTime: 0, pseudoElement: 0});
    var Xd = rd(Wd);
    var Yd = m2({}, Ad, {
      deltaX: function(a3) {
        return "deltaX" in a3 ? a3.deltaX : "wheelDeltaX" in a3 ? -a3.wheelDeltaX : 0;
      },
      deltaY: function(a3) {
        return "deltaY" in a3 ? a3.deltaY : "wheelDeltaY" in a3 ? -a3.wheelDeltaY : "wheelDelta" in a3 ? -a3.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    });
    var Zd = rd(Yd);
    var $d = [9, 13, 27, 32];
    var ae = fa && "CompositionEvent" in window;
    var be = null;
    fa && "documentMode" in document && (be = document.documentMode);
    var ce = fa && "TextEvent" in window && !be;
    var de = fa && (!ae || be && 8 < be && 11 >= be);
    var ee = String.fromCharCode(32);
    var fe = false;
    function ge(a3, b3) {
      switch (a3) {
        case "keyup":
          return $d.indexOf(b3.keyCode) !== -1;
        case "keydown":
          return b3.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return true;
        default:
          return false;
      }
    }
    function he(a3) {
      a3 = a3.detail;
      return typeof a3 === "object" && "data" in a3 ? a3.data : null;
    }
    var ie = false;
    function je(a3, b3) {
      switch (a3) {
        case "compositionend":
          return he(b3);
        case "keypress":
          if (b3.which !== 32)
            return null;
          fe = true;
          return ee;
        case "textInput":
          return a3 = b3.data, a3 === ee && fe ? null : a3;
        default:
          return null;
      }
    }
    function ke(a3, b3) {
      if (ie)
        return a3 === "compositionend" || !ae && ge(a3, b3) ? (a3 = nd(), md = ld = kd = null, ie = false, a3) : null;
      switch (a3) {
        case "paste":
          return null;
        case "keypress":
          if (!(b3.ctrlKey || b3.altKey || b3.metaKey) || b3.ctrlKey && b3.altKey) {
            if (b3.char && 1 < b3.char.length)
              return b3.char;
            if (b3.which)
              return String.fromCharCode(b3.which);
          }
          return null;
        case "compositionend":
          return de && b3.locale !== "ko" ? null : b3.data;
        default:
          return null;
      }
    }
    var le = {color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true};
    function me(a3) {
      var b3 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
      return b3 === "input" ? !!le[a3.type] : b3 === "textarea" ? true : false;
    }
    function ne(a3, b3, c3, d3) {
      Eb(d3);
      b3 = oe(b3, "onChange");
      0 < b3.length && (c3 = new td("onChange", "change", null, c3, d3), a3.push({event: c3, listeners: b3}));
    }
    var pe = null;
    var qe = null;
    function re(a3) {
      se(a3, 0);
    }
    function te(a3) {
      var b3 = ue(a3);
      if (Wa(b3))
        return a3;
    }
    function ve(a3, b3) {
      if (a3 === "change")
        return b3;
    }
    var we = false;
    if (fa) {
      if (fa) {
        ye = "oninput" in document;
        if (!ye) {
          ze = document.createElement("div");
          ze.setAttribute("oninput", "return;");
          ye = typeof ze.oninput === "function";
        }
        xe = ye;
      } else
        xe = false;
      we = xe && (!document.documentMode || 9 < document.documentMode);
    }
    var xe;
    var ye;
    var ze;
    function Ae() {
      pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
    }
    function Be(a3) {
      if (a3.propertyName === "value" && te(qe)) {
        var b3 = [];
        ne(b3, qe, a3, xb(a3));
        a3 = re;
        if (Kb)
          a3(b3);
        else {
          Kb = true;
          try {
            Gb(a3, b3);
          } finally {
            Kb = false, Mb();
          }
        }
      }
    }
    function Ce(a3, b3, c3) {
      a3 === "focusin" ? (Ae(), pe = b3, qe = c3, pe.attachEvent("onpropertychange", Be)) : a3 === "focusout" && Ae();
    }
    function De(a3) {
      if (a3 === "selectionchange" || a3 === "keyup" || a3 === "keydown")
        return te(qe);
    }
    function Ee(a3, b3) {
      if (a3 === "click")
        return te(b3);
    }
    function Fe(a3, b3) {
      if (a3 === "input" || a3 === "change")
        return te(b3);
    }
    function Ge(a3, b3) {
      return a3 === b3 && (a3 !== 0 || 1 / a3 === 1 / b3) || a3 !== a3 && b3 !== b3;
    }
    var He = typeof Object.is === "function" ? Object.is : Ge;
    var Ie = Object.prototype.hasOwnProperty;
    function Je(a3, b3) {
      if (He(a3, b3))
        return true;
      if (typeof a3 !== "object" || a3 === null || typeof b3 !== "object" || b3 === null)
        return false;
      var c3 = Object.keys(a3), d3 = Object.keys(b3);
      if (c3.length !== d3.length)
        return false;
      for (d3 = 0; d3 < c3.length; d3++)
        if (!Ie.call(b3, c3[d3]) || !He(a3[c3[d3]], b3[c3[d3]]))
          return false;
      return true;
    }
    function Ke(a3) {
      for (; a3 && a3.firstChild; )
        a3 = a3.firstChild;
      return a3;
    }
    function Le(a3, b3) {
      var c3 = Ke(a3);
      a3 = 0;
      for (var d3; c3; ) {
        if (c3.nodeType === 3) {
          d3 = a3 + c3.textContent.length;
          if (a3 <= b3 && d3 >= b3)
            return {node: c3, offset: b3 - a3};
          a3 = d3;
        }
        a: {
          for (; c3; ) {
            if (c3.nextSibling) {
              c3 = c3.nextSibling;
              break a;
            }
            c3 = c3.parentNode;
          }
          c3 = void 0;
        }
        c3 = Ke(c3);
      }
    }
    function Me(a3, b3) {
      return a3 && b3 ? a3 === b3 ? true : a3 && a3.nodeType === 3 ? false : b3 && b3.nodeType === 3 ? Me(a3, b3.parentNode) : "contains" in a3 ? a3.contains(b3) : a3.compareDocumentPosition ? !!(a3.compareDocumentPosition(b3) & 16) : false : false;
    }
    function Ne() {
      for (var a3 = window, b3 = Xa(); b3 instanceof a3.HTMLIFrameElement; ) {
        try {
          var c3 = typeof b3.contentWindow.location.href === "string";
        } catch (d3) {
          c3 = false;
        }
        if (c3)
          a3 = b3.contentWindow;
        else
          break;
        b3 = Xa(a3.document);
      }
      return b3;
    }
    function Oe(a3) {
      var b3 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
      return b3 && (b3 === "input" && (a3.type === "text" || a3.type === "search" || a3.type === "tel" || a3.type === "url" || a3.type === "password") || b3 === "textarea" || a3.contentEditable === "true");
    }
    var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
    var Qe = null;
    var Re = null;
    var Se = null;
    var Te = false;
    function Ue(a3, b3, c3) {
      var d3 = c3.window === c3 ? c3.document : c3.nodeType === 9 ? c3 : c3.ownerDocument;
      Te || Qe == null || Qe !== Xa(d3) || (d3 = Qe, "selectionStart" in d3 && Oe(d3) ? d3 = {start: d3.selectionStart, end: d3.selectionEnd} : (d3 = (d3.ownerDocument && d3.ownerDocument.defaultView || window).getSelection(), d3 = {anchorNode: d3.anchorNode, anchorOffset: d3.anchorOffset, focusNode: d3.focusNode, focusOffset: d3.focusOffset}), Se && Je(Se, d3) || (Se = d3, d3 = oe(Re, "onSelect"), 0 < d3.length && (b3 = new td("onSelect", "select", null, b3, c3), a3.push({event: b3, listeners: d3}), b3.target = Qe)));
    }
    Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
    Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
    Pc(Oc, 2);
    for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
      Nc.set(Ve[We], 0);
    ea("onMouseEnter", ["mouseout", "mouseover"]);
    ea("onMouseLeave", ["mouseout", "mouseover"]);
    ea("onPointerEnter", ["pointerout", "pointerover"]);
    ea("onPointerLeave", ["pointerout", "pointerover"]);
    da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
    da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
    da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
    da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
    da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
    var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
    function Ze(a3, b3, c3) {
      var d3 = a3.type || "unknown-event";
      a3.currentTarget = c3;
      Yb(d3, b3, void 0, a3);
      a3.currentTarget = null;
    }
    function se(a3, b3) {
      b3 = (b3 & 4) !== 0;
      for (var c3 = 0; c3 < a3.length; c3++) {
        var d3 = a3[c3], e3 = d3.event;
        d3 = d3.listeners;
        a: {
          var f3 = void 0;
          if (b3)
            for (var g3 = d3.length - 1; 0 <= g3; g3--) {
              var h3 = d3[g3], k2 = h3.instance, l3 = h3.currentTarget;
              h3 = h3.listener;
              if (k2 !== f3 && e3.isPropagationStopped())
                break a;
              Ze(e3, h3, l3);
              f3 = k2;
            }
          else
            for (g3 = 0; g3 < d3.length; g3++) {
              h3 = d3[g3];
              k2 = h3.instance;
              l3 = h3.currentTarget;
              h3 = h3.listener;
              if (k2 !== f3 && e3.isPropagationStopped())
                break a;
              Ze(e3, h3, l3);
              f3 = k2;
            }
        }
      }
      if (Ub)
        throw a3 = Vb, Ub = false, Vb = null, a3;
    }
    function G2(a3, b3) {
      var c3 = $e(b3), d3 = a3 + "__bubble";
      c3.has(d3) || (af(b3, a3, 2, false), c3.add(d3));
    }
    var bf = "_reactListening" + Math.random().toString(36).slice(2);
    function cf(a3) {
      a3[bf] || (a3[bf] = true, ba.forEach(function(b3) {
        Ye.has(b3) || df(b3, false, a3, null);
        df(b3, true, a3, null);
      }));
    }
    function df(a3, b3, c3, d3) {
      var e3 = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f3 = c3;
      a3 === "selectionchange" && c3.nodeType !== 9 && (f3 = c3.ownerDocument);
      if (d3 !== null && !b3 && Ye.has(a3)) {
        if (a3 !== "scroll")
          return;
        e3 |= 2;
        f3 = d3;
      }
      var g3 = $e(f3), h3 = a3 + "__" + (b3 ? "capture" : "bubble");
      g3.has(h3) || (b3 && (e3 |= 4), af(f3, a3, e3, b3), g3.add(h3));
    }
    function af(a3, b3, c3, d3) {
      var e3 = Nc.get(b3);
      switch (e3 === void 0 ? 2 : e3) {
        case 0:
          e3 = gd;
          break;
        case 1:
          e3 = id;
          break;
        default:
          e3 = hd;
      }
      c3 = e3.bind(null, b3, c3, a3);
      e3 = void 0;
      !Pb || b3 !== "touchstart" && b3 !== "touchmove" && b3 !== "wheel" || (e3 = true);
      d3 ? e3 !== void 0 ? a3.addEventListener(b3, c3, {capture: true, passive: e3}) : a3.addEventListener(b3, c3, true) : e3 !== void 0 ? a3.addEventListener(b3, c3, {passive: e3}) : a3.addEventListener(b3, c3, false);
    }
    function jd(a3, b3, c3, d3, e3) {
      var f3 = d3;
      if ((b3 & 1) === 0 && (b3 & 2) === 0 && d3 !== null)
        a:
          for (; ; ) {
            if (d3 === null)
              return;
            var g3 = d3.tag;
            if (g3 === 3 || g3 === 4) {
              var h3 = d3.stateNode.containerInfo;
              if (h3 === e3 || h3.nodeType === 8 && h3.parentNode === e3)
                break;
              if (g3 === 4)
                for (g3 = d3.return; g3 !== null; ) {
                  var k2 = g3.tag;
                  if (k2 === 3 || k2 === 4) {
                    if (k2 = g3.stateNode.containerInfo, k2 === e3 || k2.nodeType === 8 && k2.parentNode === e3)
                      return;
                  }
                  g3 = g3.return;
                }
              for (; h3 !== null; ) {
                g3 = wc(h3);
                if (g3 === null)
                  return;
                k2 = g3.tag;
                if (k2 === 5 || k2 === 6) {
                  d3 = f3 = g3;
                  continue a;
                }
                h3 = h3.parentNode;
              }
            }
            d3 = d3.return;
          }
      Nb(function() {
        var d4 = f3, e4 = xb(c3), g4 = [];
        a: {
          var h4 = Mc.get(a3);
          if (h4 !== void 0) {
            var k3 = td, x2 = a3;
            switch (a3) {
              case "keypress":
                if (od(c3) === 0)
                  break a;
              case "keydown":
              case "keyup":
                k3 = Rd;
                break;
              case "focusin":
                x2 = "focus";
                k3 = Fd;
                break;
              case "focusout":
                x2 = "blur";
                k3 = Fd;
                break;
              case "beforeblur":
              case "afterblur":
                k3 = Fd;
                break;
              case "click":
                if (c3.button === 2)
                  break a;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                k3 = Bd;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                k3 = Dd;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                k3 = Vd;
                break;
              case Ic:
              case Jc:
              case Kc:
                k3 = Hd;
                break;
              case Lc:
                k3 = Xd;
                break;
              case "scroll":
                k3 = vd;
                break;
              case "wheel":
                k3 = Zd;
                break;
              case "copy":
              case "cut":
              case "paste":
                k3 = Jd;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                k3 = Td;
            }
            var w3 = (b3 & 4) !== 0, z3 = !w3 && a3 === "scroll", u3 = w3 ? h4 !== null ? h4 + "Capture" : null : h4;
            w3 = [];
            for (var t3 = d4, q2; t3 !== null; ) {
              q2 = t3;
              var v2 = q2.stateNode;
              q2.tag === 5 && v2 !== null && (q2 = v2, u3 !== null && (v2 = Ob(t3, u3), v2 != null && w3.push(ef(t3, v2, q2))));
              if (z3)
                break;
              t3 = t3.return;
            }
            0 < w3.length && (h4 = new k3(h4, x2, null, c3, e4), g4.push({event: h4, listeners: w3}));
          }
        }
        if ((b3 & 7) === 0) {
          a: {
            h4 = a3 === "mouseover" || a3 === "pointerover";
            k3 = a3 === "mouseout" || a3 === "pointerout";
            if (h4 && (b3 & 16) === 0 && (x2 = c3.relatedTarget || c3.fromElement) && (wc(x2) || x2[ff]))
              break a;
            if (k3 || h4) {
              h4 = e4.window === e4 ? e4 : (h4 = e4.ownerDocument) ? h4.defaultView || h4.parentWindow : window;
              if (k3) {
                if (x2 = c3.relatedTarget || c3.toElement, k3 = d4, x2 = x2 ? wc(x2) : null, x2 !== null && (z3 = Zb(x2), x2 !== z3 || x2.tag !== 5 && x2.tag !== 6))
                  x2 = null;
              } else
                k3 = null, x2 = d4;
              if (k3 !== x2) {
                w3 = Bd;
                v2 = "onMouseLeave";
                u3 = "onMouseEnter";
                t3 = "mouse";
                if (a3 === "pointerout" || a3 === "pointerover")
                  w3 = Td, v2 = "onPointerLeave", u3 = "onPointerEnter", t3 = "pointer";
                z3 = k3 == null ? h4 : ue(k3);
                q2 = x2 == null ? h4 : ue(x2);
                h4 = new w3(v2, t3 + "leave", k3, c3, e4);
                h4.target = z3;
                h4.relatedTarget = q2;
                v2 = null;
                wc(e4) === d4 && (w3 = new w3(u3, t3 + "enter", x2, c3, e4), w3.target = q2, w3.relatedTarget = z3, v2 = w3);
                z3 = v2;
                if (k3 && x2)
                  b: {
                    w3 = k3;
                    u3 = x2;
                    t3 = 0;
                    for (q2 = w3; q2; q2 = gf(q2))
                      t3++;
                    q2 = 0;
                    for (v2 = u3; v2; v2 = gf(v2))
                      q2++;
                    for (; 0 < t3 - q2; )
                      w3 = gf(w3), t3--;
                    for (; 0 < q2 - t3; )
                      u3 = gf(u3), q2--;
                    for (; t3--; ) {
                      if (w3 === u3 || u3 !== null && w3 === u3.alternate)
                        break b;
                      w3 = gf(w3);
                      u3 = gf(u3);
                    }
                    w3 = null;
                  }
                else
                  w3 = null;
                k3 !== null && hf(g4, h4, k3, w3, false);
                x2 !== null && z3 !== null && hf(g4, z3, x2, w3, true);
              }
            }
          }
          a: {
            h4 = d4 ? ue(d4) : window;
            k3 = h4.nodeName && h4.nodeName.toLowerCase();
            if (k3 === "select" || k3 === "input" && h4.type === "file")
              var J = ve;
            else if (me(h4))
              if (we)
                J = Fe;
              else {
                J = De;
                var K = Ce;
              }
            else
              (k3 = h4.nodeName) && k3.toLowerCase() === "input" && (h4.type === "checkbox" || h4.type === "radio") && (J = Ee);
            if (J && (J = J(a3, d4))) {
              ne(g4, J, c3, e4);
              break a;
            }
            K && K(a3, h4, d4);
            a3 === "focusout" && (K = h4._wrapperState) && K.controlled && h4.type === "number" && bb(h4, "number", h4.value);
          }
          K = d4 ? ue(d4) : window;
          switch (a3) {
            case "focusin":
              if (me(K) || K.contentEditable === "true")
                Qe = K, Re = d4, Se = null;
              break;
            case "focusout":
              Se = Re = Qe = null;
              break;
            case "mousedown":
              Te = true;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Te = false;
              Ue(g4, c3, e4);
              break;
            case "selectionchange":
              if (Pe)
                break;
            case "keydown":
            case "keyup":
              Ue(g4, c3, e4);
          }
          var Q2;
          if (ae)
            b: {
              switch (a3) {
                case "compositionstart":
                  var L2 = "onCompositionStart";
                  break b;
                case "compositionend":
                  L2 = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  L2 = "onCompositionUpdate";
                  break b;
              }
              L2 = void 0;
            }
          else
            ie ? ge(a3, c3) && (L2 = "onCompositionEnd") : a3 === "keydown" && c3.keyCode === 229 && (L2 = "onCompositionStart");
          L2 && (de && c3.locale !== "ko" && (ie || L2 !== "onCompositionStart" ? L2 === "onCompositionEnd" && ie && (Q2 = nd()) : (kd = e4, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K = oe(d4, L2), 0 < K.length && (L2 = new Ld(L2, a3, null, c3, e4), g4.push({event: L2, listeners: K}), Q2 ? L2.data = Q2 : (Q2 = he(c3), Q2 !== null && (L2.data = Q2))));
          if (Q2 = ce ? je(a3, c3) : ke(a3, c3))
            d4 = oe(d4, "onBeforeInput"), 0 < d4.length && (e4 = new Ld("onBeforeInput", "beforeinput", null, c3, e4), g4.push({event: e4, listeners: d4}), e4.data = Q2);
        }
        se(g4, b3);
      });
    }
    function ef(a3, b3, c3) {
      return {instance: a3, listener: b3, currentTarget: c3};
    }
    function oe(a3, b3) {
      for (var c3 = b3 + "Capture", d3 = []; a3 !== null; ) {
        var e3 = a3, f3 = e3.stateNode;
        e3.tag === 5 && f3 !== null && (e3 = f3, f3 = Ob(a3, c3), f3 != null && d3.unshift(ef(a3, f3, e3)), f3 = Ob(a3, b3), f3 != null && d3.push(ef(a3, f3, e3)));
        a3 = a3.return;
      }
      return d3;
    }
    function gf(a3) {
      if (a3 === null)
        return null;
      do
        a3 = a3.return;
      while (a3 && a3.tag !== 5);
      return a3 ? a3 : null;
    }
    function hf(a3, b3, c3, d3, e3) {
      for (var f3 = b3._reactName, g3 = []; c3 !== null && c3 !== d3; ) {
        var h3 = c3, k2 = h3.alternate, l3 = h3.stateNode;
        if (k2 !== null && k2 === d3)
          break;
        h3.tag === 5 && l3 !== null && (h3 = l3, e3 ? (k2 = Ob(c3, f3), k2 != null && g3.unshift(ef(c3, k2, h3))) : e3 || (k2 = Ob(c3, f3), k2 != null && g3.push(ef(c3, k2, h3))));
        c3 = c3.return;
      }
      g3.length !== 0 && a3.push({event: b3, listeners: g3});
    }
    function jf() {
    }
    var kf = null;
    var lf = null;
    function mf(a3, b3) {
      switch (a3) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!b3.autoFocus;
      }
      return false;
    }
    function nf(a3, b3) {
      return a3 === "textarea" || a3 === "option" || a3 === "noscript" || typeof b3.children === "string" || typeof b3.children === "number" || typeof b3.dangerouslySetInnerHTML === "object" && b3.dangerouslySetInnerHTML !== null && b3.dangerouslySetInnerHTML.__html != null;
    }
    var of = typeof setTimeout === "function" ? setTimeout : void 0;
    var pf = typeof clearTimeout === "function" ? clearTimeout : void 0;
    function qf(a3) {
      a3.nodeType === 1 ? a3.textContent = "" : a3.nodeType === 9 && (a3 = a3.body, a3 != null && (a3.textContent = ""));
    }
    function rf(a3) {
      for (; a3 != null; a3 = a3.nextSibling) {
        var b3 = a3.nodeType;
        if (b3 === 1 || b3 === 3)
          break;
      }
      return a3;
    }
    function sf(a3) {
      a3 = a3.previousSibling;
      for (var b3 = 0; a3; ) {
        if (a3.nodeType === 8) {
          var c3 = a3.data;
          if (c3 === "$" || c3 === "$!" || c3 === "$?") {
            if (b3 === 0)
              return a3;
            b3--;
          } else
            c3 === "/$" && b3++;
        }
        a3 = a3.previousSibling;
      }
      return null;
    }
    var tf = 0;
    function uf(a3) {
      return {$$typeof: Ga, toString: a3, valueOf: a3};
    }
    var vf = Math.random().toString(36).slice(2);
    var wf = "__reactFiber$" + vf;
    var xf = "__reactProps$" + vf;
    var ff = "__reactContainer$" + vf;
    var yf = "__reactEvents$" + vf;
    function wc(a3) {
      var b3 = a3[wf];
      if (b3)
        return b3;
      for (var c3 = a3.parentNode; c3; ) {
        if (b3 = c3[ff] || c3[wf]) {
          c3 = b3.alternate;
          if (b3.child !== null || c3 !== null && c3.child !== null)
            for (a3 = sf(a3); a3 !== null; ) {
              if (c3 = a3[wf])
                return c3;
              a3 = sf(a3);
            }
          return b3;
        }
        a3 = c3;
        c3 = a3.parentNode;
      }
      return null;
    }
    function Cb(a3) {
      a3 = a3[wf] || a3[ff];
      return !a3 || a3.tag !== 5 && a3.tag !== 6 && a3.tag !== 13 && a3.tag !== 3 ? null : a3;
    }
    function ue(a3) {
      if (a3.tag === 5 || a3.tag === 6)
        return a3.stateNode;
      throw Error(y3(33));
    }
    function Db(a3) {
      return a3[xf] || null;
    }
    function $e(a3) {
      var b3 = a3[yf];
      b3 === void 0 && (b3 = a3[yf] = new Set());
      return b3;
    }
    var zf = [];
    var Af = -1;
    function Bf(a3) {
      return {current: a3};
    }
    function H2(a3) {
      0 > Af || (a3.current = zf[Af], zf[Af] = null, Af--);
    }
    function I2(a3, b3) {
      Af++;
      zf[Af] = a3.current;
      a3.current = b3;
    }
    var Cf = {};
    var M2 = Bf(Cf);
    var N2 = Bf(false);
    var Df = Cf;
    function Ef(a3, b3) {
      var c3 = a3.type.contextTypes;
      if (!c3)
        return Cf;
      var d3 = a3.stateNode;
      if (d3 && d3.__reactInternalMemoizedUnmaskedChildContext === b3)
        return d3.__reactInternalMemoizedMaskedChildContext;
      var e3 = {}, f3;
      for (f3 in c3)
        e3[f3] = b3[f3];
      d3 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = b3, a3.__reactInternalMemoizedMaskedChildContext = e3);
      return e3;
    }
    function Ff(a3) {
      a3 = a3.childContextTypes;
      return a3 !== null && a3 !== void 0;
    }
    function Gf() {
      H2(N2);
      H2(M2);
    }
    function Hf(a3, b3, c3) {
      if (M2.current !== Cf)
        throw Error(y3(168));
      I2(M2, b3);
      I2(N2, c3);
    }
    function If(a3, b3, c3) {
      var d3 = a3.stateNode;
      a3 = b3.childContextTypes;
      if (typeof d3.getChildContext !== "function")
        return c3;
      d3 = d3.getChildContext();
      for (var e3 in d3)
        if (!(e3 in a3))
          throw Error(y3(108, Ra(b3) || "Unknown", e3));
      return m2({}, c3, d3);
    }
    function Jf(a3) {
      a3 = (a3 = a3.stateNode) && a3.__reactInternalMemoizedMergedChildContext || Cf;
      Df = M2.current;
      I2(M2, a3);
      I2(N2, N2.current);
      return true;
    }
    function Kf(a3, b3, c3) {
      var d3 = a3.stateNode;
      if (!d3)
        throw Error(y3(169));
      c3 ? (a3 = If(a3, b3, Df), d3.__reactInternalMemoizedMergedChildContext = a3, H2(N2), H2(M2), I2(M2, a3)) : H2(N2);
      I2(N2, c3);
    }
    var Lf = null;
    var Mf = null;
    var Nf = r3.unstable_runWithPriority;
    var Of = r3.unstable_scheduleCallback;
    var Pf = r3.unstable_cancelCallback;
    var Qf = r3.unstable_shouldYield;
    var Rf = r3.unstable_requestPaint;
    var Sf = r3.unstable_now;
    var Tf = r3.unstable_getCurrentPriorityLevel;
    var Uf = r3.unstable_ImmediatePriority;
    var Vf = r3.unstable_UserBlockingPriority;
    var Wf = r3.unstable_NormalPriority;
    var Xf = r3.unstable_LowPriority;
    var Yf = r3.unstable_IdlePriority;
    var Zf = {};
    var $f = Rf !== void 0 ? Rf : function() {
    };
    var ag = null;
    var bg = null;
    var cg = false;
    var dg = Sf();
    var O2 = 1e4 > dg ? Sf : function() {
      return Sf() - dg;
    };
    function eg() {
      switch (Tf()) {
        case Uf:
          return 99;
        case Vf:
          return 98;
        case Wf:
          return 97;
        case Xf:
          return 96;
        case Yf:
          return 95;
        default:
          throw Error(y3(332));
      }
    }
    function fg(a3) {
      switch (a3) {
        case 99:
          return Uf;
        case 98:
          return Vf;
        case 97:
          return Wf;
        case 96:
          return Xf;
        case 95:
          return Yf;
        default:
          throw Error(y3(332));
      }
    }
    function gg(a3, b3) {
      a3 = fg(a3);
      return Nf(a3, b3);
    }
    function hg(a3, b3, c3) {
      a3 = fg(a3);
      return Of(a3, b3, c3);
    }
    function ig() {
      if (bg !== null) {
        var a3 = bg;
        bg = null;
        Pf(a3);
      }
      jg();
    }
    function jg() {
      if (!cg && ag !== null) {
        cg = true;
        var a3 = 0;
        try {
          var b3 = ag;
          gg(99, function() {
            for (; a3 < b3.length; a3++) {
              var c3 = b3[a3];
              do
                c3 = c3(true);
              while (c3 !== null);
            }
          });
          ag = null;
        } catch (c3) {
          throw ag !== null && (ag = ag.slice(a3 + 1)), Of(Uf, ig), c3;
        } finally {
          cg = false;
        }
      }
    }
    var kg = ra.ReactCurrentBatchConfig;
    function lg(a3, b3) {
      if (a3 && a3.defaultProps) {
        b3 = m2({}, b3);
        a3 = a3.defaultProps;
        for (var c3 in a3)
          b3[c3] === void 0 && (b3[c3] = a3[c3]);
        return b3;
      }
      return b3;
    }
    var mg = Bf(null);
    var ng = null;
    var og = null;
    var pg = null;
    function qg() {
      pg = og = ng = null;
    }
    function rg(a3) {
      var b3 = mg.current;
      H2(mg);
      a3.type._context._currentValue = b3;
    }
    function sg(a3, b3) {
      for (; a3 !== null; ) {
        var c3 = a3.alternate;
        if ((a3.childLanes & b3) === b3)
          if (c3 === null || (c3.childLanes & b3) === b3)
            break;
          else
            c3.childLanes |= b3;
        else
          a3.childLanes |= b3, c3 !== null && (c3.childLanes |= b3);
        a3 = a3.return;
      }
    }
    function tg(a3, b3) {
      ng = a3;
      pg = og = null;
      a3 = a3.dependencies;
      a3 !== null && a3.firstContext !== null && ((a3.lanes & b3) !== 0 && (ug = true), a3.firstContext = null);
    }
    function vg(a3, b3) {
      if (pg !== a3 && b3 !== false && b3 !== 0) {
        if (typeof b3 !== "number" || b3 === 1073741823)
          pg = a3, b3 = 1073741823;
        b3 = {context: a3, observedBits: b3, next: null};
        if (og === null) {
          if (ng === null)
            throw Error(y3(308));
          og = b3;
          ng.dependencies = {lanes: 0, firstContext: b3, responders: null};
        } else
          og = og.next = b3;
      }
      return a3._currentValue;
    }
    var wg = false;
    function xg(a3) {
      a3.updateQueue = {baseState: a3.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: {pending: null}, effects: null};
    }
    function yg(a3, b3) {
      a3 = a3.updateQueue;
      b3.updateQueue === a3 && (b3.updateQueue = {baseState: a3.baseState, firstBaseUpdate: a3.firstBaseUpdate, lastBaseUpdate: a3.lastBaseUpdate, shared: a3.shared, effects: a3.effects});
    }
    function zg(a3, b3) {
      return {eventTime: a3, lane: b3, tag: 0, payload: null, callback: null, next: null};
    }
    function Ag(a3, b3) {
      a3 = a3.updateQueue;
      if (a3 !== null) {
        a3 = a3.shared;
        var c3 = a3.pending;
        c3 === null ? b3.next = b3 : (b3.next = c3.next, c3.next = b3);
        a3.pending = b3;
      }
    }
    function Bg(a3, b3) {
      var c3 = a3.updateQueue, d3 = a3.alternate;
      if (d3 !== null && (d3 = d3.updateQueue, c3 === d3)) {
        var e3 = null, f3 = null;
        c3 = c3.firstBaseUpdate;
        if (c3 !== null) {
          do {
            var g3 = {eventTime: c3.eventTime, lane: c3.lane, tag: c3.tag, payload: c3.payload, callback: c3.callback, next: null};
            f3 === null ? e3 = f3 = g3 : f3 = f3.next = g3;
            c3 = c3.next;
          } while (c3 !== null);
          f3 === null ? e3 = f3 = b3 : f3 = f3.next = b3;
        } else
          e3 = f3 = b3;
        c3 = {baseState: d3.baseState, firstBaseUpdate: e3, lastBaseUpdate: f3, shared: d3.shared, effects: d3.effects};
        a3.updateQueue = c3;
        return;
      }
      a3 = c3.lastBaseUpdate;
      a3 === null ? c3.firstBaseUpdate = b3 : a3.next = b3;
      c3.lastBaseUpdate = b3;
    }
    function Cg(a3, b3, c3, d3) {
      var e3 = a3.updateQueue;
      wg = false;
      var f3 = e3.firstBaseUpdate, g3 = e3.lastBaseUpdate, h3 = e3.shared.pending;
      if (h3 !== null) {
        e3.shared.pending = null;
        var k2 = h3, l3 = k2.next;
        k2.next = null;
        g3 === null ? f3 = l3 : g3.next = l3;
        g3 = k2;
        var n3 = a3.alternate;
        if (n3 !== null) {
          n3 = n3.updateQueue;
          var A2 = n3.lastBaseUpdate;
          A2 !== g3 && (A2 === null ? n3.firstBaseUpdate = l3 : A2.next = l3, n3.lastBaseUpdate = k2);
        }
      }
      if (f3 !== null) {
        A2 = e3.baseState;
        g3 = 0;
        n3 = l3 = k2 = null;
        do {
          h3 = f3.lane;
          var p3 = f3.eventTime;
          if ((d3 & h3) === h3) {
            n3 !== null && (n3 = n3.next = {
              eventTime: p3,
              lane: 0,
              tag: f3.tag,
              payload: f3.payload,
              callback: f3.callback,
              next: null
            });
            a: {
              var C2 = a3, x2 = f3;
              h3 = b3;
              p3 = c3;
              switch (x2.tag) {
                case 1:
                  C2 = x2.payload;
                  if (typeof C2 === "function") {
                    A2 = C2.call(p3, A2, h3);
                    break a;
                  }
                  A2 = C2;
                  break a;
                case 3:
                  C2.flags = C2.flags & -4097 | 64;
                case 0:
                  C2 = x2.payload;
                  h3 = typeof C2 === "function" ? C2.call(p3, A2, h3) : C2;
                  if (h3 === null || h3 === void 0)
                    break a;
                  A2 = m2({}, A2, h3);
                  break a;
                case 2:
                  wg = true;
              }
            }
            f3.callback !== null && (a3.flags |= 32, h3 = e3.effects, h3 === null ? e3.effects = [f3] : h3.push(f3));
          } else
            p3 = {eventTime: p3, lane: h3, tag: f3.tag, payload: f3.payload, callback: f3.callback, next: null}, n3 === null ? (l3 = n3 = p3, k2 = A2) : n3 = n3.next = p3, g3 |= h3;
          f3 = f3.next;
          if (f3 === null)
            if (h3 = e3.shared.pending, h3 === null)
              break;
            else
              f3 = h3.next, h3.next = null, e3.lastBaseUpdate = h3, e3.shared.pending = null;
        } while (1);
        n3 === null && (k2 = A2);
        e3.baseState = k2;
        e3.firstBaseUpdate = l3;
        e3.lastBaseUpdate = n3;
        Dg |= g3;
        a3.lanes = g3;
        a3.memoizedState = A2;
      }
    }
    function Eg(a3, b3, c3) {
      a3 = b3.effects;
      b3.effects = null;
      if (a3 !== null)
        for (b3 = 0; b3 < a3.length; b3++) {
          var d3 = a3[b3], e3 = d3.callback;
          if (e3 !== null) {
            d3.callback = null;
            d3 = c3;
            if (typeof e3 !== "function")
              throw Error(y3(191, e3));
            e3.call(d3);
          }
        }
    }
    var Fg = new aa.Component().refs;
    function Gg(a3, b3, c3, d3) {
      b3 = a3.memoizedState;
      c3 = c3(d3, b3);
      c3 = c3 === null || c3 === void 0 ? b3 : m2({}, b3, c3);
      a3.memoizedState = c3;
      a3.lanes === 0 && (a3.updateQueue.baseState = c3);
    }
    var Kg = {isMounted: function(a3) {
      return (a3 = a3._reactInternals) ? Zb(a3) === a3 : false;
    }, enqueueSetState: function(a3, b3, c3) {
      a3 = a3._reactInternals;
      var d3 = Hg(), e3 = Ig(a3), f3 = zg(d3, e3);
      f3.payload = b3;
      c3 !== void 0 && c3 !== null && (f3.callback = c3);
      Ag(a3, f3);
      Jg(a3, e3, d3);
    }, enqueueReplaceState: function(a3, b3, c3) {
      a3 = a3._reactInternals;
      var d3 = Hg(), e3 = Ig(a3), f3 = zg(d3, e3);
      f3.tag = 1;
      f3.payload = b3;
      c3 !== void 0 && c3 !== null && (f3.callback = c3);
      Ag(a3, f3);
      Jg(a3, e3, d3);
    }, enqueueForceUpdate: function(a3, b3) {
      a3 = a3._reactInternals;
      var c3 = Hg(), d3 = Ig(a3), e3 = zg(c3, d3);
      e3.tag = 2;
      b3 !== void 0 && b3 !== null && (e3.callback = b3);
      Ag(a3, e3);
      Jg(a3, d3, c3);
    }};
    function Lg(a3, b3, c3, d3, e3, f3, g3) {
      a3 = a3.stateNode;
      return typeof a3.shouldComponentUpdate === "function" ? a3.shouldComponentUpdate(d3, f3, g3) : b3.prototype && b3.prototype.isPureReactComponent ? !Je(c3, d3) || !Je(e3, f3) : true;
    }
    function Mg(a3, b3, c3) {
      var d3 = false, e3 = Cf;
      var f3 = b3.contextType;
      typeof f3 === "object" && f3 !== null ? f3 = vg(f3) : (e3 = Ff(b3) ? Df : M2.current, d3 = b3.contextTypes, f3 = (d3 = d3 !== null && d3 !== void 0) ? Ef(a3, e3) : Cf);
      b3 = new b3(c3, f3);
      a3.memoizedState = b3.state !== null && b3.state !== void 0 ? b3.state : null;
      b3.updater = Kg;
      a3.stateNode = b3;
      b3._reactInternals = a3;
      d3 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = e3, a3.__reactInternalMemoizedMaskedChildContext = f3);
      return b3;
    }
    function Ng(a3, b3, c3, d3) {
      a3 = b3.state;
      typeof b3.componentWillReceiveProps === "function" && b3.componentWillReceiveProps(c3, d3);
      typeof b3.UNSAFE_componentWillReceiveProps === "function" && b3.UNSAFE_componentWillReceiveProps(c3, d3);
      b3.state !== a3 && Kg.enqueueReplaceState(b3, b3.state, null);
    }
    function Og(a3, b3, c3, d3) {
      var e3 = a3.stateNode;
      e3.props = c3;
      e3.state = a3.memoizedState;
      e3.refs = Fg;
      xg(a3);
      var f3 = b3.contextType;
      typeof f3 === "object" && f3 !== null ? e3.context = vg(f3) : (f3 = Ff(b3) ? Df : M2.current, e3.context = Ef(a3, f3));
      Cg(a3, c3, e3, d3);
      e3.state = a3.memoizedState;
      f3 = b3.getDerivedStateFromProps;
      typeof f3 === "function" && (Gg(a3, b3, f3, c3), e3.state = a3.memoizedState);
      typeof b3.getDerivedStateFromProps === "function" || typeof e3.getSnapshotBeforeUpdate === "function" || typeof e3.UNSAFE_componentWillMount !== "function" && typeof e3.componentWillMount !== "function" || (b3 = e3.state, typeof e3.componentWillMount === "function" && e3.componentWillMount(), typeof e3.UNSAFE_componentWillMount === "function" && e3.UNSAFE_componentWillMount(), b3 !== e3.state && Kg.enqueueReplaceState(e3, e3.state, null), Cg(a3, c3, e3, d3), e3.state = a3.memoizedState);
      typeof e3.componentDidMount === "function" && (a3.flags |= 4);
    }
    var Pg = Array.isArray;
    function Qg(a3, b3, c3) {
      a3 = c3.ref;
      if (a3 !== null && typeof a3 !== "function" && typeof a3 !== "object") {
        if (c3._owner) {
          c3 = c3._owner;
          if (c3) {
            if (c3.tag !== 1)
              throw Error(y3(309));
            var d3 = c3.stateNode;
          }
          if (!d3)
            throw Error(y3(147, a3));
          var e3 = "" + a3;
          if (b3 !== null && b3.ref !== null && typeof b3.ref === "function" && b3.ref._stringRef === e3)
            return b3.ref;
          b3 = function(a4) {
            var b4 = d3.refs;
            b4 === Fg && (b4 = d3.refs = {});
            a4 === null ? delete b4[e3] : b4[e3] = a4;
          };
          b3._stringRef = e3;
          return b3;
        }
        if (typeof a3 !== "string")
          throw Error(y3(284));
        if (!c3._owner)
          throw Error(y3(290, a3));
      }
      return a3;
    }
    function Rg(a3, b3) {
      if (a3.type !== "textarea")
        throw Error(y3(31, Object.prototype.toString.call(b3) === "[object Object]" ? "object with keys {" + Object.keys(b3).join(", ") + "}" : b3));
    }
    function Sg(a3) {
      function b3(b4, c4) {
        if (a3) {
          var d4 = b4.lastEffect;
          d4 !== null ? (d4.nextEffect = c4, b4.lastEffect = c4) : b4.firstEffect = b4.lastEffect = c4;
          c4.nextEffect = null;
          c4.flags = 8;
        }
      }
      function c3(c4, d4) {
        if (!a3)
          return null;
        for (; d4 !== null; )
          b3(c4, d4), d4 = d4.sibling;
        return null;
      }
      function d3(a4, b4) {
        for (a4 = new Map(); b4 !== null; )
          b4.key !== null ? a4.set(b4.key, b4) : a4.set(b4.index, b4), b4 = b4.sibling;
        return a4;
      }
      function e3(a4, b4) {
        a4 = Tg(a4, b4);
        a4.index = 0;
        a4.sibling = null;
        return a4;
      }
      function f3(b4, c4, d4) {
        b4.index = d4;
        if (!a3)
          return c4;
        d4 = b4.alternate;
        if (d4 !== null)
          return d4 = d4.index, d4 < c4 ? (b4.flags = 2, c4) : d4;
        b4.flags = 2;
        return c4;
      }
      function g3(b4) {
        a3 && b4.alternate === null && (b4.flags = 2);
        return b4;
      }
      function h3(a4, b4, c4, d4) {
        if (b4 === null || b4.tag !== 6)
          return b4 = Ug(c4, a4.mode, d4), b4.return = a4, b4;
        b4 = e3(b4, c4);
        b4.return = a4;
        return b4;
      }
      function k2(a4, b4, c4, d4) {
        if (b4 !== null && b4.elementType === c4.type)
          return d4 = e3(b4, c4.props), d4.ref = Qg(a4, b4, c4), d4.return = a4, d4;
        d4 = Vg(c4.type, c4.key, c4.props, null, a4.mode, d4);
        d4.ref = Qg(a4, b4, c4);
        d4.return = a4;
        return d4;
      }
      function l3(a4, b4, c4, d4) {
        if (b4 === null || b4.tag !== 4 || b4.stateNode.containerInfo !== c4.containerInfo || b4.stateNode.implementation !== c4.implementation)
          return b4 = Wg(c4, a4.mode, d4), b4.return = a4, b4;
        b4 = e3(b4, c4.children || []);
        b4.return = a4;
        return b4;
      }
      function n3(a4, b4, c4, d4, f4) {
        if (b4 === null || b4.tag !== 7)
          return b4 = Xg(c4, a4.mode, d4, f4), b4.return = a4, b4;
        b4 = e3(b4, c4);
        b4.return = a4;
        return b4;
      }
      function A2(a4, b4, c4) {
        if (typeof b4 === "string" || typeof b4 === "number")
          return b4 = Ug("" + b4, a4.mode, c4), b4.return = a4, b4;
        if (typeof b4 === "object" && b4 !== null) {
          switch (b4.$$typeof) {
            case sa:
              return c4 = Vg(b4.type, b4.key, b4.props, null, a4.mode, c4), c4.ref = Qg(a4, null, b4), c4.return = a4, c4;
            case ta:
              return b4 = Wg(b4, a4.mode, c4), b4.return = a4, b4;
          }
          if (Pg(b4) || La(b4))
            return b4 = Xg(b4, a4.mode, c4, null), b4.return = a4, b4;
          Rg(a4, b4);
        }
        return null;
      }
      function p3(a4, b4, c4, d4) {
        var e4 = b4 !== null ? b4.key : null;
        if (typeof c4 === "string" || typeof c4 === "number")
          return e4 !== null ? null : h3(a4, b4, "" + c4, d4);
        if (typeof c4 === "object" && c4 !== null) {
          switch (c4.$$typeof) {
            case sa:
              return c4.key === e4 ? c4.type === ua ? n3(a4, b4, c4.props.children, d4, e4) : k2(a4, b4, c4, d4) : null;
            case ta:
              return c4.key === e4 ? l3(a4, b4, c4, d4) : null;
          }
          if (Pg(c4) || La(c4))
            return e4 !== null ? null : n3(a4, b4, c4, d4, null);
          Rg(a4, c4);
        }
        return null;
      }
      function C2(a4, b4, c4, d4, e4) {
        if (typeof d4 === "string" || typeof d4 === "number")
          return a4 = a4.get(c4) || null, h3(b4, a4, "" + d4, e4);
        if (typeof d4 === "object" && d4 !== null) {
          switch (d4.$$typeof) {
            case sa:
              return a4 = a4.get(d4.key === null ? c4 : d4.key) || null, d4.type === ua ? n3(b4, a4, d4.props.children, e4, d4.key) : k2(b4, a4, d4, e4);
            case ta:
              return a4 = a4.get(d4.key === null ? c4 : d4.key) || null, l3(b4, a4, d4, e4);
          }
          if (Pg(d4) || La(d4))
            return a4 = a4.get(c4) || null, n3(b4, a4, d4, e4, null);
          Rg(b4, d4);
        }
        return null;
      }
      function x2(e4, g4, h4, k3) {
        for (var l4 = null, t3 = null, u3 = g4, z3 = g4 = 0, q2 = null; u3 !== null && z3 < h4.length; z3++) {
          u3.index > z3 ? (q2 = u3, u3 = null) : q2 = u3.sibling;
          var n4 = p3(e4, u3, h4[z3], k3);
          if (n4 === null) {
            u3 === null && (u3 = q2);
            break;
          }
          a3 && u3 && n4.alternate === null && b3(e4, u3);
          g4 = f3(n4, g4, z3);
          t3 === null ? l4 = n4 : t3.sibling = n4;
          t3 = n4;
          u3 = q2;
        }
        if (z3 === h4.length)
          return c3(e4, u3), l4;
        if (u3 === null) {
          for (; z3 < h4.length; z3++)
            u3 = A2(e4, h4[z3], k3), u3 !== null && (g4 = f3(u3, g4, z3), t3 === null ? l4 = u3 : t3.sibling = u3, t3 = u3);
          return l4;
        }
        for (u3 = d3(e4, u3); z3 < h4.length; z3++)
          q2 = C2(u3, e4, z3, h4[z3], k3), q2 !== null && (a3 && q2.alternate !== null && u3.delete(q2.key === null ? z3 : q2.key), g4 = f3(q2, g4, z3), t3 === null ? l4 = q2 : t3.sibling = q2, t3 = q2);
        a3 && u3.forEach(function(a4) {
          return b3(e4, a4);
        });
        return l4;
      }
      function w3(e4, g4, h4, k3) {
        var l4 = La(h4);
        if (typeof l4 !== "function")
          throw Error(y3(150));
        h4 = l4.call(h4);
        if (h4 == null)
          throw Error(y3(151));
        for (var t3 = l4 = null, u3 = g4, z3 = g4 = 0, q2 = null, n4 = h4.next(); u3 !== null && !n4.done; z3++, n4 = h4.next()) {
          u3.index > z3 ? (q2 = u3, u3 = null) : q2 = u3.sibling;
          var w4 = p3(e4, u3, n4.value, k3);
          if (w4 === null) {
            u3 === null && (u3 = q2);
            break;
          }
          a3 && u3 && w4.alternate === null && b3(e4, u3);
          g4 = f3(w4, g4, z3);
          t3 === null ? l4 = w4 : t3.sibling = w4;
          t3 = w4;
          u3 = q2;
        }
        if (n4.done)
          return c3(e4, u3), l4;
        if (u3 === null) {
          for (; !n4.done; z3++, n4 = h4.next())
            n4 = A2(e4, n4.value, k3), n4 !== null && (g4 = f3(n4, g4, z3), t3 === null ? l4 = n4 : t3.sibling = n4, t3 = n4);
          return l4;
        }
        for (u3 = d3(e4, u3); !n4.done; z3++, n4 = h4.next())
          n4 = C2(u3, e4, z3, n4.value, k3), n4 !== null && (a3 && n4.alternate !== null && u3.delete(n4.key === null ? z3 : n4.key), g4 = f3(n4, g4, z3), t3 === null ? l4 = n4 : t3.sibling = n4, t3 = n4);
        a3 && u3.forEach(function(a4) {
          return b3(e4, a4);
        });
        return l4;
      }
      return function(a4, d4, f4, h4) {
        var k3 = typeof f4 === "object" && f4 !== null && f4.type === ua && f4.key === null;
        k3 && (f4 = f4.props.children);
        var l4 = typeof f4 === "object" && f4 !== null;
        if (l4)
          switch (f4.$$typeof) {
            case sa:
              a: {
                l4 = f4.key;
                for (k3 = d4; k3 !== null; ) {
                  if (k3.key === l4) {
                    switch (k3.tag) {
                      case 7:
                        if (f4.type === ua) {
                          c3(a4, k3.sibling);
                          d4 = e3(k3, f4.props.children);
                          d4.return = a4;
                          a4 = d4;
                          break a;
                        }
                        break;
                      default:
                        if (k3.elementType === f4.type) {
                          c3(a4, k3.sibling);
                          d4 = e3(k3, f4.props);
                          d4.ref = Qg(a4, k3, f4);
                          d4.return = a4;
                          a4 = d4;
                          break a;
                        }
                    }
                    c3(a4, k3);
                    break;
                  } else
                    b3(a4, k3);
                  k3 = k3.sibling;
                }
                f4.type === ua ? (d4 = Xg(f4.props.children, a4.mode, h4, f4.key), d4.return = a4, a4 = d4) : (h4 = Vg(f4.type, f4.key, f4.props, null, a4.mode, h4), h4.ref = Qg(a4, d4, f4), h4.return = a4, a4 = h4);
              }
              return g3(a4);
            case ta:
              a: {
                for (k3 = f4.key; d4 !== null; ) {
                  if (d4.key === k3)
                    if (d4.tag === 4 && d4.stateNode.containerInfo === f4.containerInfo && d4.stateNode.implementation === f4.implementation) {
                      c3(a4, d4.sibling);
                      d4 = e3(d4, f4.children || []);
                      d4.return = a4;
                      a4 = d4;
                      break a;
                    } else {
                      c3(a4, d4);
                      break;
                    }
                  else
                    b3(a4, d4);
                  d4 = d4.sibling;
                }
                d4 = Wg(f4, a4.mode, h4);
                d4.return = a4;
                a4 = d4;
              }
              return g3(a4);
          }
        if (typeof f4 === "string" || typeof f4 === "number")
          return f4 = "" + f4, d4 !== null && d4.tag === 6 ? (c3(a4, d4.sibling), d4 = e3(d4, f4), d4.return = a4, a4 = d4) : (c3(a4, d4), d4 = Ug(f4, a4.mode, h4), d4.return = a4, a4 = d4), g3(a4);
        if (Pg(f4))
          return x2(a4, d4, f4, h4);
        if (La(f4))
          return w3(a4, d4, f4, h4);
        l4 && Rg(a4, f4);
        if (typeof f4 === "undefined" && !k3)
          switch (a4.tag) {
            case 1:
            case 22:
            case 0:
            case 11:
            case 15:
              throw Error(y3(152, Ra(a4.type) || "Component"));
          }
        return c3(a4, d4);
      };
    }
    var Yg = Sg(true);
    var Zg = Sg(false);
    var $g = {};
    var ah = Bf($g);
    var bh = Bf($g);
    var ch = Bf($g);
    function dh(a3) {
      if (a3 === $g)
        throw Error(y3(174));
      return a3;
    }
    function eh(a3, b3) {
      I2(ch, b3);
      I2(bh, a3);
      I2(ah, $g);
      a3 = b3.nodeType;
      switch (a3) {
        case 9:
        case 11:
          b3 = (b3 = b3.documentElement) ? b3.namespaceURI : mb(null, "");
          break;
        default:
          a3 = a3 === 8 ? b3.parentNode : b3, b3 = a3.namespaceURI || null, a3 = a3.tagName, b3 = mb(b3, a3);
      }
      H2(ah);
      I2(ah, b3);
    }
    function fh() {
      H2(ah);
      H2(bh);
      H2(ch);
    }
    function gh(a3) {
      dh(ch.current);
      var b3 = dh(ah.current);
      var c3 = mb(b3, a3.type);
      b3 !== c3 && (I2(bh, a3), I2(ah, c3));
    }
    function hh(a3) {
      bh.current === a3 && (H2(ah), H2(bh));
    }
    var P2 = Bf(0);
    function ih(a3) {
      for (var b3 = a3; b3 !== null; ) {
        if (b3.tag === 13) {
          var c3 = b3.memoizedState;
          if (c3 !== null && (c3 = c3.dehydrated, c3 === null || c3.data === "$?" || c3.data === "$!"))
            return b3;
        } else if (b3.tag === 19 && b3.memoizedProps.revealOrder !== void 0) {
          if ((b3.flags & 64) !== 0)
            return b3;
        } else if (b3.child !== null) {
          b3.child.return = b3;
          b3 = b3.child;
          continue;
        }
        if (b3 === a3)
          break;
        for (; b3.sibling === null; ) {
          if (b3.return === null || b3.return === a3)
            return null;
          b3 = b3.return;
        }
        b3.sibling.return = b3.return;
        b3 = b3.sibling;
      }
      return null;
    }
    var jh = null;
    var kh = null;
    var lh = false;
    function mh(a3, b3) {
      var c3 = nh(5, null, null, 0);
      c3.elementType = "DELETED";
      c3.type = "DELETED";
      c3.stateNode = b3;
      c3.return = a3;
      c3.flags = 8;
      a3.lastEffect !== null ? (a3.lastEffect.nextEffect = c3, a3.lastEffect = c3) : a3.firstEffect = a3.lastEffect = c3;
    }
    function oh(a3, b3) {
      switch (a3.tag) {
        case 5:
          var c3 = a3.type;
          b3 = b3.nodeType !== 1 || c3.toLowerCase() !== b3.nodeName.toLowerCase() ? null : b3;
          return b3 !== null ? (a3.stateNode = b3, true) : false;
        case 6:
          return b3 = a3.pendingProps === "" || b3.nodeType !== 3 ? null : b3, b3 !== null ? (a3.stateNode = b3, true) : false;
        case 13:
          return false;
        default:
          return false;
      }
    }
    function ph(a3) {
      if (lh) {
        var b3 = kh;
        if (b3) {
          var c3 = b3;
          if (!oh(a3, b3)) {
            b3 = rf(c3.nextSibling);
            if (!b3 || !oh(a3, b3)) {
              a3.flags = a3.flags & -1025 | 2;
              lh = false;
              jh = a3;
              return;
            }
            mh(jh, c3);
          }
          jh = a3;
          kh = rf(b3.firstChild);
        } else
          a3.flags = a3.flags & -1025 | 2, lh = false, jh = a3;
      }
    }
    function qh(a3) {
      for (a3 = a3.return; a3 !== null && a3.tag !== 5 && a3.tag !== 3 && a3.tag !== 13; )
        a3 = a3.return;
      jh = a3;
    }
    function rh(a3) {
      if (a3 !== jh)
        return false;
      if (!lh)
        return qh(a3), lh = true, false;
      var b3 = a3.type;
      if (a3.tag !== 5 || b3 !== "head" && b3 !== "body" && !nf(b3, a3.memoizedProps))
        for (b3 = kh; b3; )
          mh(a3, b3), b3 = rf(b3.nextSibling);
      qh(a3);
      if (a3.tag === 13) {
        a3 = a3.memoizedState;
        a3 = a3 !== null ? a3.dehydrated : null;
        if (!a3)
          throw Error(y3(317));
        a: {
          a3 = a3.nextSibling;
          for (b3 = 0; a3; ) {
            if (a3.nodeType === 8) {
              var c3 = a3.data;
              if (c3 === "/$") {
                if (b3 === 0) {
                  kh = rf(a3.nextSibling);
                  break a;
                }
                b3--;
              } else
                c3 !== "$" && c3 !== "$!" && c3 !== "$?" || b3++;
            }
            a3 = a3.nextSibling;
          }
          kh = null;
        }
      } else
        kh = jh ? rf(a3.stateNode.nextSibling) : null;
      return true;
    }
    function sh() {
      kh = jh = null;
      lh = false;
    }
    var th = [];
    function uh() {
      for (var a3 = 0; a3 < th.length; a3++)
        th[a3]._workInProgressVersionPrimary = null;
      th.length = 0;
    }
    var vh = ra.ReactCurrentDispatcher;
    var wh = ra.ReactCurrentBatchConfig;
    var xh = 0;
    var R7 = null;
    var S2 = null;
    var T = null;
    var yh = false;
    var zh = false;
    function Ah() {
      throw Error(y3(321));
    }
    function Bh(a3, b3) {
      if (b3 === null)
        return false;
      for (var c3 = 0; c3 < b3.length && c3 < a3.length; c3++)
        if (!He(a3[c3], b3[c3]))
          return false;
      return true;
    }
    function Ch(a3, b3, c3, d3, e3, f3) {
      xh = f3;
      R7 = b3;
      b3.memoizedState = null;
      b3.updateQueue = null;
      b3.lanes = 0;
      vh.current = a3 === null || a3.memoizedState === null ? Dh : Eh;
      a3 = c3(d3, e3);
      if (zh) {
        f3 = 0;
        do {
          zh = false;
          if (!(25 > f3))
            throw Error(y3(301));
          f3 += 1;
          T = S2 = null;
          b3.updateQueue = null;
          vh.current = Fh;
          a3 = c3(d3, e3);
        } while (zh);
      }
      vh.current = Gh;
      b3 = S2 !== null && S2.next !== null;
      xh = 0;
      T = S2 = R7 = null;
      yh = false;
      if (b3)
        throw Error(y3(300));
      return a3;
    }
    function Hh() {
      var a3 = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
      T === null ? R7.memoizedState = T = a3 : T = T.next = a3;
      return T;
    }
    function Ih() {
      if (S2 === null) {
        var a3 = R7.alternate;
        a3 = a3 !== null ? a3.memoizedState : null;
      } else
        a3 = S2.next;
      var b3 = T === null ? R7.memoizedState : T.next;
      if (b3 !== null)
        T = b3, S2 = a3;
      else {
        if (a3 === null)
          throw Error(y3(310));
        S2 = a3;
        a3 = {memoizedState: S2.memoizedState, baseState: S2.baseState, baseQueue: S2.baseQueue, queue: S2.queue, next: null};
        T === null ? R7.memoizedState = T = a3 : T = T.next = a3;
      }
      return T;
    }
    function Jh(a3, b3) {
      return typeof b3 === "function" ? b3(a3) : b3;
    }
    function Kh(a3) {
      var b3 = Ih(), c3 = b3.queue;
      if (c3 === null)
        throw Error(y3(311));
      c3.lastRenderedReducer = a3;
      var d3 = S2, e3 = d3.baseQueue, f3 = c3.pending;
      if (f3 !== null) {
        if (e3 !== null) {
          var g3 = e3.next;
          e3.next = f3.next;
          f3.next = g3;
        }
        d3.baseQueue = e3 = f3;
        c3.pending = null;
      }
      if (e3 !== null) {
        e3 = e3.next;
        d3 = d3.baseState;
        var h3 = g3 = f3 = null, k2 = e3;
        do {
          var l3 = k2.lane;
          if ((xh & l3) === l3)
            h3 !== null && (h3 = h3.next = {lane: 0, action: k2.action, eagerReducer: k2.eagerReducer, eagerState: k2.eagerState, next: null}), d3 = k2.eagerReducer === a3 ? k2.eagerState : a3(d3, k2.action);
          else {
            var n3 = {
              lane: l3,
              action: k2.action,
              eagerReducer: k2.eagerReducer,
              eagerState: k2.eagerState,
              next: null
            };
            h3 === null ? (g3 = h3 = n3, f3 = d3) : h3 = h3.next = n3;
            R7.lanes |= l3;
            Dg |= l3;
          }
          k2 = k2.next;
        } while (k2 !== null && k2 !== e3);
        h3 === null ? f3 = d3 : h3.next = g3;
        He(d3, b3.memoizedState) || (ug = true);
        b3.memoizedState = d3;
        b3.baseState = f3;
        b3.baseQueue = h3;
        c3.lastRenderedState = d3;
      }
      return [b3.memoizedState, c3.dispatch];
    }
    function Lh(a3) {
      var b3 = Ih(), c3 = b3.queue;
      if (c3 === null)
        throw Error(y3(311));
      c3.lastRenderedReducer = a3;
      var d3 = c3.dispatch, e3 = c3.pending, f3 = b3.memoizedState;
      if (e3 !== null) {
        c3.pending = null;
        var g3 = e3 = e3.next;
        do
          f3 = a3(f3, g3.action), g3 = g3.next;
        while (g3 !== e3);
        He(f3, b3.memoizedState) || (ug = true);
        b3.memoizedState = f3;
        b3.baseQueue === null && (b3.baseState = f3);
        c3.lastRenderedState = f3;
      }
      return [f3, d3];
    }
    function Mh(a3, b3, c3) {
      var d3 = b3._getVersion;
      d3 = d3(b3._source);
      var e3 = b3._workInProgressVersionPrimary;
      if (e3 !== null)
        a3 = e3 === d3;
      else if (a3 = a3.mutableReadLanes, a3 = (xh & a3) === a3)
        b3._workInProgressVersionPrimary = d3, th.push(b3);
      if (a3)
        return c3(b3._source);
      th.push(b3);
      throw Error(y3(350));
    }
    function Nh(a3, b3, c3, d3) {
      var e3 = U2;
      if (e3 === null)
        throw Error(y3(349));
      var f3 = b3._getVersion, g3 = f3(b3._source), h3 = vh.current, k2 = h3.useState(function() {
        return Mh(e3, b3, c3);
      }), l3 = k2[1], n3 = k2[0];
      k2 = T;
      var A2 = a3.memoizedState, p3 = A2.refs, C2 = p3.getSnapshot, x2 = A2.source;
      A2 = A2.subscribe;
      var w3 = R7;
      a3.memoizedState = {refs: p3, source: b3, subscribe: d3};
      h3.useEffect(function() {
        p3.getSnapshot = c3;
        p3.setSnapshot = l3;
        var a4 = f3(b3._source);
        if (!He(g3, a4)) {
          a4 = c3(b3._source);
          He(n3, a4) || (l3(a4), a4 = Ig(w3), e3.mutableReadLanes |= a4 & e3.pendingLanes);
          a4 = e3.mutableReadLanes;
          e3.entangledLanes |= a4;
          for (var d4 = e3.entanglements, h4 = a4; 0 < h4; ) {
            var k3 = 31 - Vc(h4), v2 = 1 << k3;
            d4[k3] |= a4;
            h4 &= ~v2;
          }
        }
      }, [c3, b3, d3]);
      h3.useEffect(function() {
        return d3(b3._source, function() {
          var a4 = p3.getSnapshot, c4 = p3.setSnapshot;
          try {
            c4(a4(b3._source));
            var d4 = Ig(w3);
            e3.mutableReadLanes |= d4 & e3.pendingLanes;
          } catch (q2) {
            c4(function() {
              throw q2;
            });
          }
        });
      }, [b3, d3]);
      He(C2, c3) && He(x2, b3) && He(A2, d3) || (a3 = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n3}, a3.dispatch = l3 = Oh.bind(null, R7, a3), k2.queue = a3, k2.baseQueue = null, n3 = Mh(e3, b3, c3), k2.memoizedState = k2.baseState = n3);
      return n3;
    }
    function Ph(a3, b3, c3) {
      var d3 = Ih();
      return Nh(d3, a3, b3, c3);
    }
    function Qh(a3) {
      var b3 = Hh();
      typeof a3 === "function" && (a3 = a3());
      b3.memoizedState = b3.baseState = a3;
      a3 = b3.queue = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a3};
      a3 = a3.dispatch = Oh.bind(null, R7, a3);
      return [b3.memoizedState, a3];
    }
    function Rh(a3, b3, c3, d3) {
      a3 = {tag: a3, create: b3, destroy: c3, deps: d3, next: null};
      b3 = R7.updateQueue;
      b3 === null ? (b3 = {lastEffect: null}, R7.updateQueue = b3, b3.lastEffect = a3.next = a3) : (c3 = b3.lastEffect, c3 === null ? b3.lastEffect = a3.next = a3 : (d3 = c3.next, c3.next = a3, a3.next = d3, b3.lastEffect = a3));
      return a3;
    }
    function Sh(a3) {
      var b3 = Hh();
      a3 = {current: a3};
      return b3.memoizedState = a3;
    }
    function Th() {
      return Ih().memoizedState;
    }
    function Uh(a3, b3, c3, d3) {
      var e3 = Hh();
      R7.flags |= a3;
      e3.memoizedState = Rh(1 | b3, c3, void 0, d3 === void 0 ? null : d3);
    }
    function Vh(a3, b3, c3, d3) {
      var e3 = Ih();
      d3 = d3 === void 0 ? null : d3;
      var f3 = void 0;
      if (S2 !== null) {
        var g3 = S2.memoizedState;
        f3 = g3.destroy;
        if (d3 !== null && Bh(d3, g3.deps)) {
          Rh(b3, c3, f3, d3);
          return;
        }
      }
      R7.flags |= a3;
      e3.memoizedState = Rh(1 | b3, c3, f3, d3);
    }
    function Wh(a3, b3) {
      return Uh(516, 4, a3, b3);
    }
    function Xh(a3, b3) {
      return Vh(516, 4, a3, b3);
    }
    function Yh(a3, b3) {
      return Vh(4, 2, a3, b3);
    }
    function Zh(a3, b3) {
      if (typeof b3 === "function")
        return a3 = a3(), b3(a3), function() {
          b3(null);
        };
      if (b3 !== null && b3 !== void 0)
        return a3 = a3(), b3.current = a3, function() {
          b3.current = null;
        };
    }
    function $h(a3, b3, c3) {
      c3 = c3 !== null && c3 !== void 0 ? c3.concat([a3]) : null;
      return Vh(4, 2, Zh.bind(null, b3, a3), c3);
    }
    function ai() {
    }
    function bi(a3, b3) {
      var c3 = Ih();
      b3 = b3 === void 0 ? null : b3;
      var d3 = c3.memoizedState;
      if (d3 !== null && b3 !== null && Bh(b3, d3[1]))
        return d3[0];
      c3.memoizedState = [a3, b3];
      return a3;
    }
    function ci(a3, b3) {
      var c3 = Ih();
      b3 = b3 === void 0 ? null : b3;
      var d3 = c3.memoizedState;
      if (d3 !== null && b3 !== null && Bh(b3, d3[1]))
        return d3[0];
      a3 = a3();
      c3.memoizedState = [a3, b3];
      return a3;
    }
    function di(a3, b3) {
      var c3 = eg();
      gg(98 > c3 ? 98 : c3, function() {
        a3(true);
      });
      gg(97 < c3 ? 97 : c3, function() {
        var c4 = wh.transition;
        wh.transition = 1;
        try {
          a3(false), b3();
        } finally {
          wh.transition = c4;
        }
      });
    }
    function Oh(a3, b3, c3) {
      var d3 = Hg(), e3 = Ig(a3), f3 = {lane: e3, action: c3, eagerReducer: null, eagerState: null, next: null}, g3 = b3.pending;
      g3 === null ? f3.next = f3 : (f3.next = g3.next, g3.next = f3);
      b3.pending = f3;
      g3 = a3.alternate;
      if (a3 === R7 || g3 !== null && g3 === R7)
        zh = yh = true;
      else {
        if (a3.lanes === 0 && (g3 === null || g3.lanes === 0) && (g3 = b3.lastRenderedReducer, g3 !== null))
          try {
            var h3 = b3.lastRenderedState, k2 = g3(h3, c3);
            f3.eagerReducer = g3;
            f3.eagerState = k2;
            if (He(k2, h3))
              return;
          } catch (l3) {
          } finally {
          }
        Jg(a3, e3, d3);
      }
    }
    var Gh = {readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false};
    var Dh = {readContext: vg, useCallback: function(a3, b3) {
      Hh().memoizedState = [a3, b3 === void 0 ? null : b3];
      return a3;
    }, useContext: vg, useEffect: Wh, useImperativeHandle: function(a3, b3, c3) {
      c3 = c3 !== null && c3 !== void 0 ? c3.concat([a3]) : null;
      return Uh(4, 2, Zh.bind(null, b3, a3), c3);
    }, useLayoutEffect: function(a3, b3) {
      return Uh(4, 2, a3, b3);
    }, useMemo: function(a3, b3) {
      var c3 = Hh();
      b3 = b3 === void 0 ? null : b3;
      a3 = a3();
      c3.memoizedState = [a3, b3];
      return a3;
    }, useReducer: function(a3, b3, c3) {
      var d3 = Hh();
      b3 = c3 !== void 0 ? c3(b3) : b3;
      d3.memoizedState = d3.baseState = b3;
      a3 = d3.queue = {pending: null, dispatch: null, lastRenderedReducer: a3, lastRenderedState: b3};
      a3 = a3.dispatch = Oh.bind(null, R7, a3);
      return [d3.memoizedState, a3];
    }, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a3) {
      var b3 = Qh(a3), c3 = b3[0], d3 = b3[1];
      Wh(function() {
        var b4 = wh.transition;
        wh.transition = 1;
        try {
          d3(a3);
        } finally {
          wh.transition = b4;
        }
      }, [a3]);
      return c3;
    }, useTransition: function() {
      var a3 = Qh(false), b3 = a3[0];
      a3 = di.bind(null, a3[1]);
      Sh(a3);
      return [a3, b3];
    }, useMutableSource: function(a3, b3, c3) {
      var d3 = Hh();
      d3.memoizedState = {refs: {getSnapshot: b3, setSnapshot: null}, source: a3, subscribe: c3};
      return Nh(d3, a3, b3, c3);
    }, useOpaqueIdentifier: function() {
      if (lh) {
        var a3 = false, b3 = uf(function() {
          a3 || (a3 = true, c3("r:" + (tf++).toString(36)));
          throw Error(y3(355));
        }), c3 = Qh(b3)[1];
        (R7.mode & 2) === 0 && (R7.flags |= 516, Rh(5, function() {
          c3("r:" + (tf++).toString(36));
        }, void 0, null));
        return b3;
      }
      b3 = "r:" + (tf++).toString(36);
      Qh(b3);
      return b3;
    }, unstable_isNewReconciler: false};
    var Eh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
      return Kh(Jh);
    }, useDebugValue: ai, useDeferredValue: function(a3) {
      var b3 = Kh(Jh), c3 = b3[0], d3 = b3[1];
      Xh(function() {
        var b4 = wh.transition;
        wh.transition = 1;
        try {
          d3(a3);
        } finally {
          wh.transition = b4;
        }
      }, [a3]);
      return c3;
    }, useTransition: function() {
      var a3 = Kh(Jh)[0];
      return [
        Th().current,
        a3
      ];
    }, useMutableSource: Ph, useOpaqueIdentifier: function() {
      return Kh(Jh)[0];
    }, unstable_isNewReconciler: false};
    var Fh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
      return Lh(Jh);
    }, useDebugValue: ai, useDeferredValue: function(a3) {
      var b3 = Lh(Jh), c3 = b3[0], d3 = b3[1];
      Xh(function() {
        var b4 = wh.transition;
        wh.transition = 1;
        try {
          d3(a3);
        } finally {
          wh.transition = b4;
        }
      }, [a3]);
      return c3;
    }, useTransition: function() {
      var a3 = Lh(Jh)[0];
      return [
        Th().current,
        a3
      ];
    }, useMutableSource: Ph, useOpaqueIdentifier: function() {
      return Lh(Jh)[0];
    }, unstable_isNewReconciler: false};
    var ei = ra.ReactCurrentOwner;
    var ug = false;
    function fi(a3, b3, c3, d3) {
      b3.child = a3 === null ? Zg(b3, null, c3, d3) : Yg(b3, a3.child, c3, d3);
    }
    function gi(a3, b3, c3, d3, e3) {
      c3 = c3.render;
      var f3 = b3.ref;
      tg(b3, e3);
      d3 = Ch(a3, b3, c3, d3, f3, e3);
      if (a3 !== null && !ug)
        return b3.updateQueue = a3.updateQueue, b3.flags &= -517, a3.lanes &= ~e3, hi(a3, b3, e3);
      b3.flags |= 1;
      fi(a3, b3, d3, e3);
      return b3.child;
    }
    function ii(a3, b3, c3, d3, e3, f3) {
      if (a3 === null) {
        var g3 = c3.type;
        if (typeof g3 === "function" && !ji(g3) && g3.defaultProps === void 0 && c3.compare === null && c3.defaultProps === void 0)
          return b3.tag = 15, b3.type = g3, ki(a3, b3, g3, d3, e3, f3);
        a3 = Vg(c3.type, null, d3, b3, b3.mode, f3);
        a3.ref = b3.ref;
        a3.return = b3;
        return b3.child = a3;
      }
      g3 = a3.child;
      if ((e3 & f3) === 0 && (e3 = g3.memoizedProps, c3 = c3.compare, c3 = c3 !== null ? c3 : Je, c3(e3, d3) && a3.ref === b3.ref))
        return hi(a3, b3, f3);
      b3.flags |= 1;
      a3 = Tg(g3, d3);
      a3.ref = b3.ref;
      a3.return = b3;
      return b3.child = a3;
    }
    function ki(a3, b3, c3, d3, e3, f3) {
      if (a3 !== null && Je(a3.memoizedProps, d3) && a3.ref === b3.ref)
        if (ug = false, (f3 & e3) !== 0)
          (a3.flags & 16384) !== 0 && (ug = true);
        else
          return b3.lanes = a3.lanes, hi(a3, b3, f3);
      return li(a3, b3, c3, d3, f3);
    }
    function mi(a3, b3, c3) {
      var d3 = b3.pendingProps, e3 = d3.children, f3 = a3 !== null ? a3.memoizedState : null;
      if (d3.mode === "hidden" || d3.mode === "unstable-defer-without-hiding")
        if ((b3.mode & 4) === 0)
          b3.memoizedState = {baseLanes: 0}, ni(b3, c3);
        else if ((c3 & 1073741824) !== 0)
          b3.memoizedState = {baseLanes: 0}, ni(b3, f3 !== null ? f3.baseLanes : c3);
        else
          return a3 = f3 !== null ? f3.baseLanes | c3 : c3, b3.lanes = b3.childLanes = 1073741824, b3.memoizedState = {baseLanes: a3}, ni(b3, a3), null;
      else
        f3 !== null ? (d3 = f3.baseLanes | c3, b3.memoizedState = null) : d3 = c3, ni(b3, d3);
      fi(a3, b3, e3, c3);
      return b3.child;
    }
    function oi(a3, b3) {
      var c3 = b3.ref;
      if (a3 === null && c3 !== null || a3 !== null && a3.ref !== c3)
        b3.flags |= 128;
    }
    function li(a3, b3, c3, d3, e3) {
      var f3 = Ff(c3) ? Df : M2.current;
      f3 = Ef(b3, f3);
      tg(b3, e3);
      c3 = Ch(a3, b3, c3, d3, f3, e3);
      if (a3 !== null && !ug)
        return b3.updateQueue = a3.updateQueue, b3.flags &= -517, a3.lanes &= ~e3, hi(a3, b3, e3);
      b3.flags |= 1;
      fi(a3, b3, c3, e3);
      return b3.child;
    }
    function pi(a3, b3, c3, d3, e3) {
      if (Ff(c3)) {
        var f3 = true;
        Jf(b3);
      } else
        f3 = false;
      tg(b3, e3);
      if (b3.stateNode === null)
        a3 !== null && (a3.alternate = null, b3.alternate = null, b3.flags |= 2), Mg(b3, c3, d3), Og(b3, c3, d3, e3), d3 = true;
      else if (a3 === null) {
        var g3 = b3.stateNode, h3 = b3.memoizedProps;
        g3.props = h3;
        var k2 = g3.context, l3 = c3.contextType;
        typeof l3 === "object" && l3 !== null ? l3 = vg(l3) : (l3 = Ff(c3) ? Df : M2.current, l3 = Ef(b3, l3));
        var n3 = c3.getDerivedStateFromProps, A2 = typeof n3 === "function" || typeof g3.getSnapshotBeforeUpdate === "function";
        A2 || typeof g3.UNSAFE_componentWillReceiveProps !== "function" && typeof g3.componentWillReceiveProps !== "function" || (h3 !== d3 || k2 !== l3) && Ng(b3, g3, d3, l3);
        wg = false;
        var p3 = b3.memoizedState;
        g3.state = p3;
        Cg(b3, d3, g3, e3);
        k2 = b3.memoizedState;
        h3 !== d3 || p3 !== k2 || N2.current || wg ? (typeof n3 === "function" && (Gg(b3, c3, n3, d3), k2 = b3.memoizedState), (h3 = wg || Lg(b3, c3, h3, d3, p3, k2, l3)) ? (A2 || typeof g3.UNSAFE_componentWillMount !== "function" && typeof g3.componentWillMount !== "function" || (typeof g3.componentWillMount === "function" && g3.componentWillMount(), typeof g3.UNSAFE_componentWillMount === "function" && g3.UNSAFE_componentWillMount()), typeof g3.componentDidMount === "function" && (b3.flags |= 4)) : (typeof g3.componentDidMount === "function" && (b3.flags |= 4), b3.memoizedProps = d3, b3.memoizedState = k2), g3.props = d3, g3.state = k2, g3.context = l3, d3 = h3) : (typeof g3.componentDidMount === "function" && (b3.flags |= 4), d3 = false);
      } else {
        g3 = b3.stateNode;
        yg(a3, b3);
        h3 = b3.memoizedProps;
        l3 = b3.type === b3.elementType ? h3 : lg(b3.type, h3);
        g3.props = l3;
        A2 = b3.pendingProps;
        p3 = g3.context;
        k2 = c3.contextType;
        typeof k2 === "object" && k2 !== null ? k2 = vg(k2) : (k2 = Ff(c3) ? Df : M2.current, k2 = Ef(b3, k2));
        var C2 = c3.getDerivedStateFromProps;
        (n3 = typeof C2 === "function" || typeof g3.getSnapshotBeforeUpdate === "function") || typeof g3.UNSAFE_componentWillReceiveProps !== "function" && typeof g3.componentWillReceiveProps !== "function" || (h3 !== A2 || p3 !== k2) && Ng(b3, g3, d3, k2);
        wg = false;
        p3 = b3.memoizedState;
        g3.state = p3;
        Cg(b3, d3, g3, e3);
        var x2 = b3.memoizedState;
        h3 !== A2 || p3 !== x2 || N2.current || wg ? (typeof C2 === "function" && (Gg(b3, c3, C2, d3), x2 = b3.memoizedState), (l3 = wg || Lg(b3, c3, l3, d3, p3, x2, k2)) ? (n3 || typeof g3.UNSAFE_componentWillUpdate !== "function" && typeof g3.componentWillUpdate !== "function" || (typeof g3.componentWillUpdate === "function" && g3.componentWillUpdate(d3, x2, k2), typeof g3.UNSAFE_componentWillUpdate === "function" && g3.UNSAFE_componentWillUpdate(d3, x2, k2)), typeof g3.componentDidUpdate === "function" && (b3.flags |= 4), typeof g3.getSnapshotBeforeUpdate === "function" && (b3.flags |= 256)) : (typeof g3.componentDidUpdate !== "function" || h3 === a3.memoizedProps && p3 === a3.memoizedState || (b3.flags |= 4), typeof g3.getSnapshotBeforeUpdate !== "function" || h3 === a3.memoizedProps && p3 === a3.memoizedState || (b3.flags |= 256), b3.memoizedProps = d3, b3.memoizedState = x2), g3.props = d3, g3.state = x2, g3.context = k2, d3 = l3) : (typeof g3.componentDidUpdate !== "function" || h3 === a3.memoizedProps && p3 === a3.memoizedState || (b3.flags |= 4), typeof g3.getSnapshotBeforeUpdate !== "function" || h3 === a3.memoizedProps && p3 === a3.memoizedState || (b3.flags |= 256), d3 = false);
      }
      return qi(a3, b3, c3, d3, f3, e3);
    }
    function qi(a3, b3, c3, d3, e3, f3) {
      oi(a3, b3);
      var g3 = (b3.flags & 64) !== 0;
      if (!d3 && !g3)
        return e3 && Kf(b3, c3, false), hi(a3, b3, f3);
      d3 = b3.stateNode;
      ei.current = b3;
      var h3 = g3 && typeof c3.getDerivedStateFromError !== "function" ? null : d3.render();
      b3.flags |= 1;
      a3 !== null && g3 ? (b3.child = Yg(b3, a3.child, null, f3), b3.child = Yg(b3, null, h3, f3)) : fi(a3, b3, h3, f3);
      b3.memoizedState = d3.state;
      e3 && Kf(b3, c3, true);
      return b3.child;
    }
    function ri(a3) {
      var b3 = a3.stateNode;
      b3.pendingContext ? Hf(a3, b3.pendingContext, b3.pendingContext !== b3.context) : b3.context && Hf(a3, b3.context, false);
      eh(a3, b3.containerInfo);
    }
    var si = {dehydrated: null, retryLane: 0};
    function ti(a3, b3, c3) {
      var d3 = b3.pendingProps, e3 = P2.current, f3 = false, g3;
      (g3 = (b3.flags & 64) !== 0) || (g3 = a3 !== null && a3.memoizedState === null ? false : (e3 & 2) !== 0);
      g3 ? (f3 = true, b3.flags &= -65) : a3 !== null && a3.memoizedState === null || d3.fallback === void 0 || d3.unstable_avoidThisFallback === true || (e3 |= 1);
      I2(P2, e3 & 1);
      if (a3 === null) {
        d3.fallback !== void 0 && ph(b3);
        a3 = d3.children;
        e3 = d3.fallback;
        if (f3)
          return a3 = ui(b3, a3, e3, c3), b3.child.memoizedState = {baseLanes: c3}, b3.memoizedState = si, a3;
        if (typeof d3.unstable_expectedLoadTime === "number")
          return a3 = ui(b3, a3, e3, c3), b3.child.memoizedState = {baseLanes: c3}, b3.memoizedState = si, b3.lanes = 33554432, a3;
        c3 = vi({mode: "visible", children: a3}, b3.mode, c3, null);
        c3.return = b3;
        return b3.child = c3;
      }
      if (a3.memoizedState !== null) {
        if (f3)
          return d3 = wi(a3, b3, d3.children, d3.fallback, c3), f3 = b3.child, e3 = a3.child.memoizedState, f3.memoizedState = e3 === null ? {baseLanes: c3} : {baseLanes: e3.baseLanes | c3}, f3.childLanes = a3.childLanes & ~c3, b3.memoizedState = si, d3;
        c3 = xi(a3, b3, d3.children, c3);
        b3.memoizedState = null;
        return c3;
      }
      if (f3)
        return d3 = wi(a3, b3, d3.children, d3.fallback, c3), f3 = b3.child, e3 = a3.child.memoizedState, f3.memoizedState = e3 === null ? {baseLanes: c3} : {baseLanes: e3.baseLanes | c3}, f3.childLanes = a3.childLanes & ~c3, b3.memoizedState = si, d3;
      c3 = xi(a3, b3, d3.children, c3);
      b3.memoizedState = null;
      return c3;
    }
    function ui(a3, b3, c3, d3) {
      var e3 = a3.mode, f3 = a3.child;
      b3 = {mode: "hidden", children: b3};
      (e3 & 2) === 0 && f3 !== null ? (f3.childLanes = 0, f3.pendingProps = b3) : f3 = vi(b3, e3, 0, null);
      c3 = Xg(c3, e3, d3, null);
      f3.return = a3;
      c3.return = a3;
      f3.sibling = c3;
      a3.child = f3;
      return c3;
    }
    function xi(a3, b3, c3, d3) {
      var e3 = a3.child;
      a3 = e3.sibling;
      c3 = Tg(e3, {mode: "visible", children: c3});
      (b3.mode & 2) === 0 && (c3.lanes = d3);
      c3.return = b3;
      c3.sibling = null;
      a3 !== null && (a3.nextEffect = null, a3.flags = 8, b3.firstEffect = b3.lastEffect = a3);
      return b3.child = c3;
    }
    function wi(a3, b3, c3, d3, e3) {
      var f3 = b3.mode, g3 = a3.child;
      a3 = g3.sibling;
      var h3 = {mode: "hidden", children: c3};
      (f3 & 2) === 0 && b3.child !== g3 ? (c3 = b3.child, c3.childLanes = 0, c3.pendingProps = h3, g3 = c3.lastEffect, g3 !== null ? (b3.firstEffect = c3.firstEffect, b3.lastEffect = g3, g3.nextEffect = null) : b3.firstEffect = b3.lastEffect = null) : c3 = Tg(g3, h3);
      a3 !== null ? d3 = Tg(a3, d3) : (d3 = Xg(d3, f3, e3, null), d3.flags |= 2);
      d3.return = b3;
      c3.return = b3;
      c3.sibling = d3;
      b3.child = c3;
      return d3;
    }
    function yi(a3, b3) {
      a3.lanes |= b3;
      var c3 = a3.alternate;
      c3 !== null && (c3.lanes |= b3);
      sg(a3.return, b3);
    }
    function zi(a3, b3, c3, d3, e3, f3) {
      var g3 = a3.memoizedState;
      g3 === null ? a3.memoizedState = {isBackwards: b3, rendering: null, renderingStartTime: 0, last: d3, tail: c3, tailMode: e3, lastEffect: f3} : (g3.isBackwards = b3, g3.rendering = null, g3.renderingStartTime = 0, g3.last = d3, g3.tail = c3, g3.tailMode = e3, g3.lastEffect = f3);
    }
    function Ai(a3, b3, c3) {
      var d3 = b3.pendingProps, e3 = d3.revealOrder, f3 = d3.tail;
      fi(a3, b3, d3.children, c3);
      d3 = P2.current;
      if ((d3 & 2) !== 0)
        d3 = d3 & 1 | 2, b3.flags |= 64;
      else {
        if (a3 !== null && (a3.flags & 64) !== 0)
          a:
            for (a3 = b3.child; a3 !== null; ) {
              if (a3.tag === 13)
                a3.memoizedState !== null && yi(a3, c3);
              else if (a3.tag === 19)
                yi(a3, c3);
              else if (a3.child !== null) {
                a3.child.return = a3;
                a3 = a3.child;
                continue;
              }
              if (a3 === b3)
                break a;
              for (; a3.sibling === null; ) {
                if (a3.return === null || a3.return === b3)
                  break a;
                a3 = a3.return;
              }
              a3.sibling.return = a3.return;
              a3 = a3.sibling;
            }
        d3 &= 1;
      }
      I2(P2, d3);
      if ((b3.mode & 2) === 0)
        b3.memoizedState = null;
      else
        switch (e3) {
          case "forwards":
            c3 = b3.child;
            for (e3 = null; c3 !== null; )
              a3 = c3.alternate, a3 !== null && ih(a3) === null && (e3 = c3), c3 = c3.sibling;
            c3 = e3;
            c3 === null ? (e3 = b3.child, b3.child = null) : (e3 = c3.sibling, c3.sibling = null);
            zi(b3, false, e3, c3, f3, b3.lastEffect);
            break;
          case "backwards":
            c3 = null;
            e3 = b3.child;
            for (b3.child = null; e3 !== null; ) {
              a3 = e3.alternate;
              if (a3 !== null && ih(a3) === null) {
                b3.child = e3;
                break;
              }
              a3 = e3.sibling;
              e3.sibling = c3;
              c3 = e3;
              e3 = a3;
            }
            zi(b3, true, c3, null, f3, b3.lastEffect);
            break;
          case "together":
            zi(b3, false, null, null, void 0, b3.lastEffect);
            break;
          default:
            b3.memoizedState = null;
        }
      return b3.child;
    }
    function hi(a3, b3, c3) {
      a3 !== null && (b3.dependencies = a3.dependencies);
      Dg |= b3.lanes;
      if ((c3 & b3.childLanes) !== 0) {
        if (a3 !== null && b3.child !== a3.child)
          throw Error(y3(153));
        if (b3.child !== null) {
          a3 = b3.child;
          c3 = Tg(a3, a3.pendingProps);
          b3.child = c3;
          for (c3.return = b3; a3.sibling !== null; )
            a3 = a3.sibling, c3 = c3.sibling = Tg(a3, a3.pendingProps), c3.return = b3;
          c3.sibling = null;
        }
        return b3.child;
      }
      return null;
    }
    var Bi;
    var Ci;
    var Di;
    var Ei;
    Bi = function(a3, b3) {
      for (var c3 = b3.child; c3 !== null; ) {
        if (c3.tag === 5 || c3.tag === 6)
          a3.appendChild(c3.stateNode);
        else if (c3.tag !== 4 && c3.child !== null) {
          c3.child.return = c3;
          c3 = c3.child;
          continue;
        }
        if (c3 === b3)
          break;
        for (; c3.sibling === null; ) {
          if (c3.return === null || c3.return === b3)
            return;
          c3 = c3.return;
        }
        c3.sibling.return = c3.return;
        c3 = c3.sibling;
      }
    };
    Ci = function() {
    };
    Di = function(a3, b3, c3, d3) {
      var e3 = a3.memoizedProps;
      if (e3 !== d3) {
        a3 = b3.stateNode;
        dh(ah.current);
        var f3 = null;
        switch (c3) {
          case "input":
            e3 = Ya(a3, e3);
            d3 = Ya(a3, d3);
            f3 = [];
            break;
          case "option":
            e3 = eb(a3, e3);
            d3 = eb(a3, d3);
            f3 = [];
            break;
          case "select":
            e3 = m2({}, e3, {value: void 0});
            d3 = m2({}, d3, {value: void 0});
            f3 = [];
            break;
          case "textarea":
            e3 = gb(a3, e3);
            d3 = gb(a3, d3);
            f3 = [];
            break;
          default:
            typeof e3.onClick !== "function" && typeof d3.onClick === "function" && (a3.onclick = jf);
        }
        vb(c3, d3);
        var g3;
        c3 = null;
        for (l3 in e3)
          if (!d3.hasOwnProperty(l3) && e3.hasOwnProperty(l3) && e3[l3] != null)
            if (l3 === "style") {
              var h3 = e3[l3];
              for (g3 in h3)
                h3.hasOwnProperty(g3) && (c3 || (c3 = {}), c3[g3] = "");
            } else
              l3 !== "dangerouslySetInnerHTML" && l3 !== "children" && l3 !== "suppressContentEditableWarning" && l3 !== "suppressHydrationWarning" && l3 !== "autoFocus" && (ca.hasOwnProperty(l3) ? f3 || (f3 = []) : (f3 = f3 || []).push(l3, null));
        for (l3 in d3) {
          var k2 = d3[l3];
          h3 = e3 != null ? e3[l3] : void 0;
          if (d3.hasOwnProperty(l3) && k2 !== h3 && (k2 != null || h3 != null))
            if (l3 === "style")
              if (h3) {
                for (g3 in h3)
                  !h3.hasOwnProperty(g3) || k2 && k2.hasOwnProperty(g3) || (c3 || (c3 = {}), c3[g3] = "");
                for (g3 in k2)
                  k2.hasOwnProperty(g3) && h3[g3] !== k2[g3] && (c3 || (c3 = {}), c3[g3] = k2[g3]);
              } else
                c3 || (f3 || (f3 = []), f3.push(l3, c3)), c3 = k2;
            else
              l3 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, h3 = h3 ? h3.__html : void 0, k2 != null && h3 !== k2 && (f3 = f3 || []).push(l3, k2)) : l3 === "children" ? typeof k2 !== "string" && typeof k2 !== "number" || (f3 = f3 || []).push(l3, "" + k2) : l3 !== "suppressContentEditableWarning" && l3 !== "suppressHydrationWarning" && (ca.hasOwnProperty(l3) ? (k2 != null && l3 === "onScroll" && G2("scroll", a3), f3 || h3 === k2 || (f3 = [])) : typeof k2 === "object" && k2 !== null && k2.$$typeof === Ga ? k2.toString() : (f3 = f3 || []).push(l3, k2));
        }
        c3 && (f3 = f3 || []).push("style", c3);
        var l3 = f3;
        if (b3.updateQueue = l3)
          b3.flags |= 4;
      }
    };
    Ei = function(a3, b3, c3, d3) {
      c3 !== d3 && (b3.flags |= 4);
    };
    function Fi(a3, b3) {
      if (!lh)
        switch (a3.tailMode) {
          case "hidden":
            b3 = a3.tail;
            for (var c3 = null; b3 !== null; )
              b3.alternate !== null && (c3 = b3), b3 = b3.sibling;
            c3 === null ? a3.tail = null : c3.sibling = null;
            break;
          case "collapsed":
            c3 = a3.tail;
            for (var d3 = null; c3 !== null; )
              c3.alternate !== null && (d3 = c3), c3 = c3.sibling;
            d3 === null ? b3 || a3.tail === null ? a3.tail = null : a3.tail.sibling = null : d3.sibling = null;
        }
    }
    function Gi(a3, b3, c3) {
      var d3 = b3.pendingProps;
      switch (b3.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return null;
        case 1:
          return Ff(b3.type) && Gf(), null;
        case 3:
          fh();
          H2(N2);
          H2(M2);
          uh();
          d3 = b3.stateNode;
          d3.pendingContext && (d3.context = d3.pendingContext, d3.pendingContext = null);
          if (a3 === null || a3.child === null)
            rh(b3) ? b3.flags |= 4 : d3.hydrate || (b3.flags |= 256);
          Ci(b3);
          return null;
        case 5:
          hh(b3);
          var e3 = dh(ch.current);
          c3 = b3.type;
          if (a3 !== null && b3.stateNode != null)
            Di(a3, b3, c3, d3, e3), a3.ref !== b3.ref && (b3.flags |= 128);
          else {
            if (!d3) {
              if (b3.stateNode === null)
                throw Error(y3(166));
              return null;
            }
            a3 = dh(ah.current);
            if (rh(b3)) {
              d3 = b3.stateNode;
              c3 = b3.type;
              var f3 = b3.memoizedProps;
              d3[wf] = b3;
              d3[xf] = f3;
              switch (c3) {
                case "dialog":
                  G2("cancel", d3);
                  G2("close", d3);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  G2("load", d3);
                  break;
                case "video":
                case "audio":
                  for (a3 = 0; a3 < Xe.length; a3++)
                    G2(Xe[a3], d3);
                  break;
                case "source":
                  G2("error", d3);
                  break;
                case "img":
                case "image":
                case "link":
                  G2("error", d3);
                  G2("load", d3);
                  break;
                case "details":
                  G2("toggle", d3);
                  break;
                case "input":
                  Za(d3, f3);
                  G2("invalid", d3);
                  break;
                case "select":
                  d3._wrapperState = {wasMultiple: !!f3.multiple};
                  G2("invalid", d3);
                  break;
                case "textarea":
                  hb(d3, f3), G2("invalid", d3);
              }
              vb(c3, f3);
              a3 = null;
              for (var g3 in f3)
                f3.hasOwnProperty(g3) && (e3 = f3[g3], g3 === "children" ? typeof e3 === "string" ? d3.textContent !== e3 && (a3 = ["children", e3]) : typeof e3 === "number" && d3.textContent !== "" + e3 && (a3 = ["children", "" + e3]) : ca.hasOwnProperty(g3) && e3 != null && g3 === "onScroll" && G2("scroll", d3));
              switch (c3) {
                case "input":
                  Va(d3);
                  cb(d3, f3, true);
                  break;
                case "textarea":
                  Va(d3);
                  jb(d3);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof f3.onClick === "function" && (d3.onclick = jf);
              }
              d3 = a3;
              b3.updateQueue = d3;
              d3 !== null && (b3.flags |= 4);
            } else {
              g3 = e3.nodeType === 9 ? e3 : e3.ownerDocument;
              a3 === kb.html && (a3 = lb(c3));
              a3 === kb.html ? c3 === "script" ? (a3 = g3.createElement("div"), a3.innerHTML = "<script></script>", a3 = a3.removeChild(a3.firstChild)) : typeof d3.is === "string" ? a3 = g3.createElement(c3, {is: d3.is}) : (a3 = g3.createElement(c3), c3 === "select" && (g3 = a3, d3.multiple ? g3.multiple = true : d3.size && (g3.size = d3.size))) : a3 = g3.createElementNS(a3, c3);
              a3[wf] = b3;
              a3[xf] = d3;
              Bi(a3, b3, false, false);
              b3.stateNode = a3;
              g3 = wb(c3, d3);
              switch (c3) {
                case "dialog":
                  G2("cancel", a3);
                  G2("close", a3);
                  e3 = d3;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  G2("load", a3);
                  e3 = d3;
                  break;
                case "video":
                case "audio":
                  for (e3 = 0; e3 < Xe.length; e3++)
                    G2(Xe[e3], a3);
                  e3 = d3;
                  break;
                case "source":
                  G2("error", a3);
                  e3 = d3;
                  break;
                case "img":
                case "image":
                case "link":
                  G2("error", a3);
                  G2("load", a3);
                  e3 = d3;
                  break;
                case "details":
                  G2("toggle", a3);
                  e3 = d3;
                  break;
                case "input":
                  Za(a3, d3);
                  e3 = Ya(a3, d3);
                  G2("invalid", a3);
                  break;
                case "option":
                  e3 = eb(a3, d3);
                  break;
                case "select":
                  a3._wrapperState = {wasMultiple: !!d3.multiple};
                  e3 = m2({}, d3, {value: void 0});
                  G2("invalid", a3);
                  break;
                case "textarea":
                  hb(a3, d3);
                  e3 = gb(a3, d3);
                  G2("invalid", a3);
                  break;
                default:
                  e3 = d3;
              }
              vb(c3, e3);
              var h3 = e3;
              for (f3 in h3)
                if (h3.hasOwnProperty(f3)) {
                  var k2 = h3[f3];
                  f3 === "style" ? tb(a3, k2) : f3 === "dangerouslySetInnerHTML" ? (k2 = k2 ? k2.__html : void 0, k2 != null && ob(a3, k2)) : f3 === "children" ? typeof k2 === "string" ? (c3 !== "textarea" || k2 !== "") && pb(a3, k2) : typeof k2 === "number" && pb(a3, "" + k2) : f3 !== "suppressContentEditableWarning" && f3 !== "suppressHydrationWarning" && f3 !== "autoFocus" && (ca.hasOwnProperty(f3) ? k2 != null && f3 === "onScroll" && G2("scroll", a3) : k2 != null && qa(a3, f3, k2, g3));
                }
              switch (c3) {
                case "input":
                  Va(a3);
                  cb(a3, d3, false);
                  break;
                case "textarea":
                  Va(a3);
                  jb(a3);
                  break;
                case "option":
                  d3.value != null && a3.setAttribute("value", "" + Sa(d3.value));
                  break;
                case "select":
                  a3.multiple = !!d3.multiple;
                  f3 = d3.value;
                  f3 != null ? fb(a3, !!d3.multiple, f3, false) : d3.defaultValue != null && fb(a3, !!d3.multiple, d3.defaultValue, true);
                  break;
                default:
                  typeof e3.onClick === "function" && (a3.onclick = jf);
              }
              mf(c3, d3) && (b3.flags |= 4);
            }
            b3.ref !== null && (b3.flags |= 128);
          }
          return null;
        case 6:
          if (a3 && b3.stateNode != null)
            Ei(a3, b3, a3.memoizedProps, d3);
          else {
            if (typeof d3 !== "string" && b3.stateNode === null)
              throw Error(y3(166));
            c3 = dh(ch.current);
            dh(ah.current);
            rh(b3) ? (d3 = b3.stateNode, c3 = b3.memoizedProps, d3[wf] = b3, d3.nodeValue !== c3 && (b3.flags |= 4)) : (d3 = (c3.nodeType === 9 ? c3 : c3.ownerDocument).createTextNode(d3), d3[wf] = b3, b3.stateNode = d3);
          }
          return null;
        case 13:
          H2(P2);
          d3 = b3.memoizedState;
          if ((b3.flags & 64) !== 0)
            return b3.lanes = c3, b3;
          d3 = d3 !== null;
          c3 = false;
          a3 === null ? b3.memoizedProps.fallback !== void 0 && rh(b3) : c3 = a3.memoizedState !== null;
          if (d3 && !c3 && (b3.mode & 2) !== 0)
            if (a3 === null && b3.memoizedProps.unstable_avoidThisFallback !== true || (P2.current & 1) !== 0)
              V2 === 0 && (V2 = 3);
            else {
              if (V2 === 0 || V2 === 3)
                V2 = 4;
              U2 === null || (Dg & 134217727) === 0 && (Hi & 134217727) === 0 || Ii(U2, W2);
            }
          if (d3 || c3)
            b3.flags |= 4;
          return null;
        case 4:
          return fh(), Ci(b3), a3 === null && cf(b3.stateNode.containerInfo), null;
        case 10:
          return rg(b3), null;
        case 17:
          return Ff(b3.type) && Gf(), null;
        case 19:
          H2(P2);
          d3 = b3.memoizedState;
          if (d3 === null)
            return null;
          f3 = (b3.flags & 64) !== 0;
          g3 = d3.rendering;
          if (g3 === null)
            if (f3)
              Fi(d3, false);
            else {
              if (V2 !== 0 || a3 !== null && (a3.flags & 64) !== 0)
                for (a3 = b3.child; a3 !== null; ) {
                  g3 = ih(a3);
                  if (g3 !== null) {
                    b3.flags |= 64;
                    Fi(d3, false);
                    f3 = g3.updateQueue;
                    f3 !== null && (b3.updateQueue = f3, b3.flags |= 4);
                    d3.lastEffect === null && (b3.firstEffect = null);
                    b3.lastEffect = d3.lastEffect;
                    d3 = c3;
                    for (c3 = b3.child; c3 !== null; )
                      f3 = c3, a3 = d3, f3.flags &= 2, f3.nextEffect = null, f3.firstEffect = null, f3.lastEffect = null, g3 = f3.alternate, g3 === null ? (f3.childLanes = 0, f3.lanes = a3, f3.child = null, f3.memoizedProps = null, f3.memoizedState = null, f3.updateQueue = null, f3.dependencies = null, f3.stateNode = null) : (f3.childLanes = g3.childLanes, f3.lanes = g3.lanes, f3.child = g3.child, f3.memoizedProps = g3.memoizedProps, f3.memoizedState = g3.memoizedState, f3.updateQueue = g3.updateQueue, f3.type = g3.type, a3 = g3.dependencies, f3.dependencies = a3 === null ? null : {lanes: a3.lanes, firstContext: a3.firstContext}), c3 = c3.sibling;
                    I2(P2, P2.current & 1 | 2);
                    return b3.child;
                  }
                  a3 = a3.sibling;
                }
              d3.tail !== null && O2() > Ji && (b3.flags |= 64, f3 = true, Fi(d3, false), b3.lanes = 33554432);
            }
          else {
            if (!f3)
              if (a3 = ih(g3), a3 !== null) {
                if (b3.flags |= 64, f3 = true, c3 = a3.updateQueue, c3 !== null && (b3.updateQueue = c3, b3.flags |= 4), Fi(d3, true), d3.tail === null && d3.tailMode === "hidden" && !g3.alternate && !lh)
                  return b3 = b3.lastEffect = d3.lastEffect, b3 !== null && (b3.nextEffect = null), null;
              } else
                2 * O2() - d3.renderingStartTime > Ji && c3 !== 1073741824 && (b3.flags |= 64, f3 = true, Fi(d3, false), b3.lanes = 33554432);
            d3.isBackwards ? (g3.sibling = b3.child, b3.child = g3) : (c3 = d3.last, c3 !== null ? c3.sibling = g3 : b3.child = g3, d3.last = g3);
          }
          return d3.tail !== null ? (c3 = d3.tail, d3.rendering = c3, d3.tail = c3.sibling, d3.lastEffect = b3.lastEffect, d3.renderingStartTime = O2(), c3.sibling = null, b3 = P2.current, I2(P2, f3 ? b3 & 1 | 2 : b3 & 1), c3) : null;
        case 23:
        case 24:
          return Ki(), a3 !== null && a3.memoizedState !== null !== (b3.memoizedState !== null) && d3.mode !== "unstable-defer-without-hiding" && (b3.flags |= 4), null;
      }
      throw Error(y3(156, b3.tag));
    }
    function Li(a3) {
      switch (a3.tag) {
        case 1:
          Ff(a3.type) && Gf();
          var b3 = a3.flags;
          return b3 & 4096 ? (a3.flags = b3 & -4097 | 64, a3) : null;
        case 3:
          fh();
          H2(N2);
          H2(M2);
          uh();
          b3 = a3.flags;
          if ((b3 & 64) !== 0)
            throw Error(y3(285));
          a3.flags = b3 & -4097 | 64;
          return a3;
        case 5:
          return hh(a3), null;
        case 13:
          return H2(P2), b3 = a3.flags, b3 & 4096 ? (a3.flags = b3 & -4097 | 64, a3) : null;
        case 19:
          return H2(P2), null;
        case 4:
          return fh(), null;
        case 10:
          return rg(a3), null;
        case 23:
        case 24:
          return Ki(), null;
        default:
          return null;
      }
    }
    function Mi(a3, b3) {
      try {
        var c3 = "", d3 = b3;
        do
          c3 += Qa(d3), d3 = d3.return;
        while (d3);
        var e3 = c3;
      } catch (f3) {
        e3 = "\nError generating stack: " + f3.message + "\n" + f3.stack;
      }
      return {value: a3, source: b3, stack: e3};
    }
    function Ni(a3, b3) {
      try {
        console.error(b3.value);
      } catch (c3) {
        setTimeout(function() {
          throw c3;
        });
      }
    }
    var Oi = typeof WeakMap === "function" ? WeakMap : Map;
    function Pi(a3, b3, c3) {
      c3 = zg(-1, c3);
      c3.tag = 3;
      c3.payload = {element: null};
      var d3 = b3.value;
      c3.callback = function() {
        Qi || (Qi = true, Ri = d3);
        Ni(a3, b3);
      };
      return c3;
    }
    function Si(a3, b3, c3) {
      c3 = zg(-1, c3);
      c3.tag = 3;
      var d3 = a3.type.getDerivedStateFromError;
      if (typeof d3 === "function") {
        var e3 = b3.value;
        c3.payload = function() {
          Ni(a3, b3);
          return d3(e3);
        };
      }
      var f3 = a3.stateNode;
      f3 !== null && typeof f3.componentDidCatch === "function" && (c3.callback = function() {
        typeof d3 !== "function" && (Ti === null ? Ti = new Set([this]) : Ti.add(this), Ni(a3, b3));
        var c4 = b3.stack;
        this.componentDidCatch(b3.value, {componentStack: c4 !== null ? c4 : ""});
      });
      return c3;
    }
    var Ui = typeof WeakSet === "function" ? WeakSet : Set;
    function Vi(a3) {
      var b3 = a3.ref;
      if (b3 !== null)
        if (typeof b3 === "function")
          try {
            b3(null);
          } catch (c3) {
            Wi(a3, c3);
          }
        else
          b3.current = null;
    }
    function Xi(a3, b3) {
      switch (b3.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          return;
        case 1:
          if (b3.flags & 256 && a3 !== null) {
            var c3 = a3.memoizedProps, d3 = a3.memoizedState;
            a3 = b3.stateNode;
            b3 = a3.getSnapshotBeforeUpdate(b3.elementType === b3.type ? c3 : lg(b3.type, c3), d3);
            a3.__reactInternalSnapshotBeforeUpdate = b3;
          }
          return;
        case 3:
          b3.flags & 256 && qf(b3.stateNode.containerInfo);
          return;
        case 5:
        case 6:
        case 4:
        case 17:
          return;
      }
      throw Error(y3(163));
    }
    function Yi(a3, b3, c3) {
      switch (c3.tag) {
        case 0:
        case 11:
        case 15:
        case 22:
          b3 = c3.updateQueue;
          b3 = b3 !== null ? b3.lastEffect : null;
          if (b3 !== null) {
            a3 = b3 = b3.next;
            do {
              if ((a3.tag & 3) === 3) {
                var d3 = a3.create;
                a3.destroy = d3();
              }
              a3 = a3.next;
            } while (a3 !== b3);
          }
          b3 = c3.updateQueue;
          b3 = b3 !== null ? b3.lastEffect : null;
          if (b3 !== null) {
            a3 = b3 = b3.next;
            do {
              var e3 = a3;
              d3 = e3.next;
              e3 = e3.tag;
              (e3 & 4) !== 0 && (e3 & 1) !== 0 && (Zi(c3, a3), $i(c3, a3));
              a3 = d3;
            } while (a3 !== b3);
          }
          return;
        case 1:
          a3 = c3.stateNode;
          c3.flags & 4 && (b3 === null ? a3.componentDidMount() : (d3 = c3.elementType === c3.type ? b3.memoizedProps : lg(c3.type, b3.memoizedProps), a3.componentDidUpdate(d3, b3.memoizedState, a3.__reactInternalSnapshotBeforeUpdate)));
          b3 = c3.updateQueue;
          b3 !== null && Eg(c3, b3, a3);
          return;
        case 3:
          b3 = c3.updateQueue;
          if (b3 !== null) {
            a3 = null;
            if (c3.child !== null)
              switch (c3.child.tag) {
                case 5:
                  a3 = c3.child.stateNode;
                  break;
                case 1:
                  a3 = c3.child.stateNode;
              }
            Eg(c3, b3, a3);
          }
          return;
        case 5:
          a3 = c3.stateNode;
          b3 === null && c3.flags & 4 && mf(c3.type, c3.memoizedProps) && a3.focus();
          return;
        case 6:
          return;
        case 4:
          return;
        case 12:
          return;
        case 13:
          c3.memoizedState === null && (c3 = c3.alternate, c3 !== null && (c3 = c3.memoizedState, c3 !== null && (c3 = c3.dehydrated, c3 !== null && Cc(c3))));
          return;
        case 19:
        case 17:
        case 20:
        case 21:
        case 23:
        case 24:
          return;
      }
      throw Error(y3(163));
    }
    function aj(a3, b3) {
      for (var c3 = a3; ; ) {
        if (c3.tag === 5) {
          var d3 = c3.stateNode;
          if (b3)
            d3 = d3.style, typeof d3.setProperty === "function" ? d3.setProperty("display", "none", "important") : d3.display = "none";
          else {
            d3 = c3.stateNode;
            var e3 = c3.memoizedProps.style;
            e3 = e3 !== void 0 && e3 !== null && e3.hasOwnProperty("display") ? e3.display : null;
            d3.style.display = sb("display", e3);
          }
        } else if (c3.tag === 6)
          c3.stateNode.nodeValue = b3 ? "" : c3.memoizedProps;
        else if ((c3.tag !== 23 && c3.tag !== 24 || c3.memoizedState === null || c3 === a3) && c3.child !== null) {
          c3.child.return = c3;
          c3 = c3.child;
          continue;
        }
        if (c3 === a3)
          break;
        for (; c3.sibling === null; ) {
          if (c3.return === null || c3.return === a3)
            return;
          c3 = c3.return;
        }
        c3.sibling.return = c3.return;
        c3 = c3.sibling;
      }
    }
    function bj(a3, b3) {
      if (Mf && typeof Mf.onCommitFiberUnmount === "function")
        try {
          Mf.onCommitFiberUnmount(Lf, b3);
        } catch (f3) {
        }
      switch (b3.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          a3 = b3.updateQueue;
          if (a3 !== null && (a3 = a3.lastEffect, a3 !== null)) {
            var c3 = a3 = a3.next;
            do {
              var d3 = c3, e3 = d3.destroy;
              d3 = d3.tag;
              if (e3 !== void 0)
                if ((d3 & 4) !== 0)
                  Zi(b3, c3);
                else {
                  d3 = b3;
                  try {
                    e3();
                  } catch (f3) {
                    Wi(d3, f3);
                  }
                }
              c3 = c3.next;
            } while (c3 !== a3);
          }
          break;
        case 1:
          Vi(b3);
          a3 = b3.stateNode;
          if (typeof a3.componentWillUnmount === "function")
            try {
              a3.props = b3.memoizedProps, a3.state = b3.memoizedState, a3.componentWillUnmount();
            } catch (f3) {
              Wi(b3, f3);
            }
          break;
        case 5:
          Vi(b3);
          break;
        case 4:
          cj(a3, b3);
      }
    }
    function dj(a3) {
      a3.alternate = null;
      a3.child = null;
      a3.dependencies = null;
      a3.firstEffect = null;
      a3.lastEffect = null;
      a3.memoizedProps = null;
      a3.memoizedState = null;
      a3.pendingProps = null;
      a3.return = null;
      a3.updateQueue = null;
    }
    function ej(a3) {
      return a3.tag === 5 || a3.tag === 3 || a3.tag === 4;
    }
    function fj(a3) {
      a: {
        for (var b3 = a3.return; b3 !== null; ) {
          if (ej(b3))
            break a;
          b3 = b3.return;
        }
        throw Error(y3(160));
      }
      var c3 = b3;
      b3 = c3.stateNode;
      switch (c3.tag) {
        case 5:
          var d3 = false;
          break;
        case 3:
          b3 = b3.containerInfo;
          d3 = true;
          break;
        case 4:
          b3 = b3.containerInfo;
          d3 = true;
          break;
        default:
          throw Error(y3(161));
      }
      c3.flags & 16 && (pb(b3, ""), c3.flags &= -17);
      a:
        b:
          for (c3 = a3; ; ) {
            for (; c3.sibling === null; ) {
              if (c3.return === null || ej(c3.return)) {
                c3 = null;
                break a;
              }
              c3 = c3.return;
            }
            c3.sibling.return = c3.return;
            for (c3 = c3.sibling; c3.tag !== 5 && c3.tag !== 6 && c3.tag !== 18; ) {
              if (c3.flags & 2)
                continue b;
              if (c3.child === null || c3.tag === 4)
                continue b;
              else
                c3.child.return = c3, c3 = c3.child;
            }
            if (!(c3.flags & 2)) {
              c3 = c3.stateNode;
              break a;
            }
          }
      d3 ? gj(a3, c3, b3) : hj(a3, c3, b3);
    }
    function gj(a3, b3, c3) {
      var d3 = a3.tag, e3 = d3 === 5 || d3 === 6;
      if (e3)
        a3 = e3 ? a3.stateNode : a3.stateNode.instance, b3 ? c3.nodeType === 8 ? c3.parentNode.insertBefore(a3, b3) : c3.insertBefore(a3, b3) : (c3.nodeType === 8 ? (b3 = c3.parentNode, b3.insertBefore(a3, c3)) : (b3 = c3, b3.appendChild(a3)), c3 = c3._reactRootContainer, c3 !== null && c3 !== void 0 || b3.onclick !== null || (b3.onclick = jf));
      else if (d3 !== 4 && (a3 = a3.child, a3 !== null))
        for (gj(a3, b3, c3), a3 = a3.sibling; a3 !== null; )
          gj(a3, b3, c3), a3 = a3.sibling;
    }
    function hj(a3, b3, c3) {
      var d3 = a3.tag, e3 = d3 === 5 || d3 === 6;
      if (e3)
        a3 = e3 ? a3.stateNode : a3.stateNode.instance, b3 ? c3.insertBefore(a3, b3) : c3.appendChild(a3);
      else if (d3 !== 4 && (a3 = a3.child, a3 !== null))
        for (hj(a3, b3, c3), a3 = a3.sibling; a3 !== null; )
          hj(a3, b3, c3), a3 = a3.sibling;
    }
    function cj(a3, b3) {
      for (var c3 = b3, d3 = false, e3, f3; ; ) {
        if (!d3) {
          d3 = c3.return;
          a:
            for (; ; ) {
              if (d3 === null)
                throw Error(y3(160));
              e3 = d3.stateNode;
              switch (d3.tag) {
                case 5:
                  f3 = false;
                  break a;
                case 3:
                  e3 = e3.containerInfo;
                  f3 = true;
                  break a;
                case 4:
                  e3 = e3.containerInfo;
                  f3 = true;
                  break a;
              }
              d3 = d3.return;
            }
          d3 = true;
        }
        if (c3.tag === 5 || c3.tag === 6) {
          a:
            for (var g3 = a3, h3 = c3, k2 = h3; ; )
              if (bj(g3, k2), k2.child !== null && k2.tag !== 4)
                k2.child.return = k2, k2 = k2.child;
              else {
                if (k2 === h3)
                  break a;
                for (; k2.sibling === null; ) {
                  if (k2.return === null || k2.return === h3)
                    break a;
                  k2 = k2.return;
                }
                k2.sibling.return = k2.return;
                k2 = k2.sibling;
              }
          f3 ? (g3 = e3, h3 = c3.stateNode, g3.nodeType === 8 ? g3.parentNode.removeChild(h3) : g3.removeChild(h3)) : e3.removeChild(c3.stateNode);
        } else if (c3.tag === 4) {
          if (c3.child !== null) {
            e3 = c3.stateNode.containerInfo;
            f3 = true;
            c3.child.return = c3;
            c3 = c3.child;
            continue;
          }
        } else if (bj(a3, c3), c3.child !== null) {
          c3.child.return = c3;
          c3 = c3.child;
          continue;
        }
        if (c3 === b3)
          break;
        for (; c3.sibling === null; ) {
          if (c3.return === null || c3.return === b3)
            return;
          c3 = c3.return;
          c3.tag === 4 && (d3 = false);
        }
        c3.sibling.return = c3.return;
        c3 = c3.sibling;
      }
    }
    function ij(a3, b3) {
      switch (b3.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
        case 22:
          var c3 = b3.updateQueue;
          c3 = c3 !== null ? c3.lastEffect : null;
          if (c3 !== null) {
            var d3 = c3 = c3.next;
            do
              (d3.tag & 3) === 3 && (a3 = d3.destroy, d3.destroy = void 0, a3 !== void 0 && a3()), d3 = d3.next;
            while (d3 !== c3);
          }
          return;
        case 1:
          return;
        case 5:
          c3 = b3.stateNode;
          if (c3 != null) {
            d3 = b3.memoizedProps;
            var e3 = a3 !== null ? a3.memoizedProps : d3;
            a3 = b3.type;
            var f3 = b3.updateQueue;
            b3.updateQueue = null;
            if (f3 !== null) {
              c3[xf] = d3;
              a3 === "input" && d3.type === "radio" && d3.name != null && $a(c3, d3);
              wb(a3, e3);
              b3 = wb(a3, d3);
              for (e3 = 0; e3 < f3.length; e3 += 2) {
                var g3 = f3[e3], h3 = f3[e3 + 1];
                g3 === "style" ? tb(c3, h3) : g3 === "dangerouslySetInnerHTML" ? ob(c3, h3) : g3 === "children" ? pb(c3, h3) : qa(c3, g3, h3, b3);
              }
              switch (a3) {
                case "input":
                  ab(c3, d3);
                  break;
                case "textarea":
                  ib(c3, d3);
                  break;
                case "select":
                  a3 = c3._wrapperState.wasMultiple, c3._wrapperState.wasMultiple = !!d3.multiple, f3 = d3.value, f3 != null ? fb(c3, !!d3.multiple, f3, false) : a3 !== !!d3.multiple && (d3.defaultValue != null ? fb(c3, !!d3.multiple, d3.defaultValue, true) : fb(c3, !!d3.multiple, d3.multiple ? [] : "", false));
              }
            }
          }
          return;
        case 6:
          if (b3.stateNode === null)
            throw Error(y3(162));
          b3.stateNode.nodeValue = b3.memoizedProps;
          return;
        case 3:
          c3 = b3.stateNode;
          c3.hydrate && (c3.hydrate = false, Cc(c3.containerInfo));
          return;
        case 12:
          return;
        case 13:
          b3.memoizedState !== null && (jj = O2(), aj(b3.child, true));
          kj(b3);
          return;
        case 19:
          kj(b3);
          return;
        case 17:
          return;
        case 23:
        case 24:
          aj(b3, b3.memoizedState !== null);
          return;
      }
      throw Error(y3(163));
    }
    function kj(a3) {
      var b3 = a3.updateQueue;
      if (b3 !== null) {
        a3.updateQueue = null;
        var c3 = a3.stateNode;
        c3 === null && (c3 = a3.stateNode = new Ui());
        b3.forEach(function(b4) {
          var d3 = lj.bind(null, a3, b4);
          c3.has(b4) || (c3.add(b4), b4.then(d3, d3));
        });
      }
    }
    function mj(a3, b3) {
      return a3 !== null && (a3 = a3.memoizedState, a3 === null || a3.dehydrated !== null) ? (b3 = b3.memoizedState, b3 !== null && b3.dehydrated === null) : false;
    }
    var nj = Math.ceil;
    var oj = ra.ReactCurrentDispatcher;
    var pj = ra.ReactCurrentOwner;
    var X2 = 0;
    var U2 = null;
    var Y = null;
    var W2 = 0;
    var qj = 0;
    var rj = Bf(0);
    var V2 = 0;
    var sj = null;
    var tj = 0;
    var Dg = 0;
    var Hi = 0;
    var uj = 0;
    var vj = null;
    var jj = 0;
    var Ji = Infinity;
    function wj() {
      Ji = O2() + 500;
    }
    var Z2 = null;
    var Qi = false;
    var Ri = null;
    var Ti = null;
    var xj = false;
    var yj = null;
    var zj = 90;
    var Aj = [];
    var Bj = [];
    var Cj = null;
    var Dj = 0;
    var Ej = null;
    var Fj = -1;
    var Gj = 0;
    var Hj = 0;
    var Ij = null;
    var Jj = false;
    function Hg() {
      return (X2 & 48) !== 0 ? O2() : Fj !== -1 ? Fj : Fj = O2();
    }
    function Ig(a3) {
      a3 = a3.mode;
      if ((a3 & 2) === 0)
        return 1;
      if ((a3 & 4) === 0)
        return eg() === 99 ? 1 : 2;
      Gj === 0 && (Gj = tj);
      if (kg.transition !== 0) {
        Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0);
        a3 = Gj;
        var b3 = 4186112 & ~Hj;
        b3 &= -b3;
        b3 === 0 && (a3 = 4186112 & ~a3, b3 = a3 & -a3, b3 === 0 && (b3 = 8192));
        return b3;
      }
      a3 = eg();
      (X2 & 4) !== 0 && a3 === 98 ? a3 = Xc(12, Gj) : (a3 = Sc(a3), a3 = Xc(a3, Gj));
      return a3;
    }
    function Jg(a3, b3, c3) {
      if (50 < Dj)
        throw Dj = 0, Ej = null, Error(y3(185));
      a3 = Kj(a3, b3);
      if (a3 === null)
        return null;
      $c(a3, b3, c3);
      a3 === U2 && (Hi |= b3, V2 === 4 && Ii(a3, W2));
      var d3 = eg();
      b3 === 1 ? (X2 & 8) !== 0 && (X2 & 48) === 0 ? Lj(a3) : (Mj(a3, c3), X2 === 0 && (wj(), ig())) : ((X2 & 4) === 0 || d3 !== 98 && d3 !== 99 || (Cj === null ? Cj = new Set([a3]) : Cj.add(a3)), Mj(a3, c3));
      vj = a3;
    }
    function Kj(a3, b3) {
      a3.lanes |= b3;
      var c3 = a3.alternate;
      c3 !== null && (c3.lanes |= b3);
      c3 = a3;
      for (a3 = a3.return; a3 !== null; )
        a3.childLanes |= b3, c3 = a3.alternate, c3 !== null && (c3.childLanes |= b3), c3 = a3, a3 = a3.return;
      return c3.tag === 3 ? c3.stateNode : null;
    }
    function Mj(a3, b3) {
      for (var c3 = a3.callbackNode, d3 = a3.suspendedLanes, e3 = a3.pingedLanes, f3 = a3.expirationTimes, g3 = a3.pendingLanes; 0 < g3; ) {
        var h3 = 31 - Vc(g3), k2 = 1 << h3, l3 = f3[h3];
        if (l3 === -1) {
          if ((k2 & d3) === 0 || (k2 & e3) !== 0) {
            l3 = b3;
            Rc(k2);
            var n3 = F2;
            f3[h3] = 10 <= n3 ? l3 + 250 : 6 <= n3 ? l3 + 5e3 : -1;
          }
        } else
          l3 <= b3 && (a3.expiredLanes |= k2);
        g3 &= ~k2;
      }
      d3 = Uc(a3, a3 === U2 ? W2 : 0);
      b3 = F2;
      if (d3 === 0)
        c3 !== null && (c3 !== Zf && Pf(c3), a3.callbackNode = null, a3.callbackPriority = 0);
      else {
        if (c3 !== null) {
          if (a3.callbackPriority === b3)
            return;
          c3 !== Zf && Pf(c3);
        }
        b3 === 15 ? (c3 = Lj.bind(null, a3), ag === null ? (ag = [c3], bg = Of(Uf, jg)) : ag.push(c3), c3 = Zf) : b3 === 14 ? c3 = hg(99, Lj.bind(null, a3)) : (c3 = Tc(b3), c3 = hg(c3, Nj.bind(null, a3)));
        a3.callbackPriority = b3;
        a3.callbackNode = c3;
      }
    }
    function Nj(a3) {
      Fj = -1;
      Hj = Gj = 0;
      if ((X2 & 48) !== 0)
        throw Error(y3(327));
      var b3 = a3.callbackNode;
      if (Oj() && a3.callbackNode !== b3)
        return null;
      var c3 = Uc(a3, a3 === U2 ? W2 : 0);
      if (c3 === 0)
        return null;
      var d3 = c3;
      var e3 = X2;
      X2 |= 16;
      var f3 = Pj();
      if (U2 !== a3 || W2 !== d3)
        wj(), Qj(a3, d3);
      do
        try {
          Rj();
          break;
        } catch (h3) {
          Sj(a3, h3);
        }
      while (1);
      qg();
      oj.current = f3;
      X2 = e3;
      Y !== null ? d3 = 0 : (U2 = null, W2 = 0, d3 = V2);
      if ((tj & Hi) !== 0)
        Qj(a3, 0);
      else if (d3 !== 0) {
        d3 === 2 && (X2 |= 64, a3.hydrate && (a3.hydrate = false, qf(a3.containerInfo)), c3 = Wc(a3), c3 !== 0 && (d3 = Tj(a3, c3)));
        if (d3 === 1)
          throw b3 = sj, Qj(a3, 0), Ii(a3, c3), Mj(a3, O2()), b3;
        a3.finishedWork = a3.current.alternate;
        a3.finishedLanes = c3;
        switch (d3) {
          case 0:
          case 1:
            throw Error(y3(345));
          case 2:
            Uj(a3);
            break;
          case 3:
            Ii(a3, c3);
            if ((c3 & 62914560) === c3 && (d3 = jj + 500 - O2(), 10 < d3)) {
              if (Uc(a3, 0) !== 0)
                break;
              e3 = a3.suspendedLanes;
              if ((e3 & c3) !== c3) {
                Hg();
                a3.pingedLanes |= a3.suspendedLanes & e3;
                break;
              }
              a3.timeoutHandle = of(Uj.bind(null, a3), d3);
              break;
            }
            Uj(a3);
            break;
          case 4:
            Ii(a3, c3);
            if ((c3 & 4186112) === c3)
              break;
            d3 = a3.eventTimes;
            for (e3 = -1; 0 < c3; ) {
              var g3 = 31 - Vc(c3);
              f3 = 1 << g3;
              g3 = d3[g3];
              g3 > e3 && (e3 = g3);
              c3 &= ~f3;
            }
            c3 = e3;
            c3 = O2() - c3;
            c3 = (120 > c3 ? 120 : 480 > c3 ? 480 : 1080 > c3 ? 1080 : 1920 > c3 ? 1920 : 3e3 > c3 ? 3e3 : 4320 > c3 ? 4320 : 1960 * nj(c3 / 1960)) - c3;
            if (10 < c3) {
              a3.timeoutHandle = of(Uj.bind(null, a3), c3);
              break;
            }
            Uj(a3);
            break;
          case 5:
            Uj(a3);
            break;
          default:
            throw Error(y3(329));
        }
      }
      Mj(a3, O2());
      return a3.callbackNode === b3 ? Nj.bind(null, a3) : null;
    }
    function Ii(a3, b3) {
      b3 &= ~uj;
      b3 &= ~Hi;
      a3.suspendedLanes |= b3;
      a3.pingedLanes &= ~b3;
      for (a3 = a3.expirationTimes; 0 < b3; ) {
        var c3 = 31 - Vc(b3), d3 = 1 << c3;
        a3[c3] = -1;
        b3 &= ~d3;
      }
    }
    function Lj(a3) {
      if ((X2 & 48) !== 0)
        throw Error(y3(327));
      Oj();
      if (a3 === U2 && (a3.expiredLanes & W2) !== 0) {
        var b3 = W2;
        var c3 = Tj(a3, b3);
        (tj & Hi) !== 0 && (b3 = Uc(a3, b3), c3 = Tj(a3, b3));
      } else
        b3 = Uc(a3, 0), c3 = Tj(a3, b3);
      a3.tag !== 0 && c3 === 2 && (X2 |= 64, a3.hydrate && (a3.hydrate = false, qf(a3.containerInfo)), b3 = Wc(a3), b3 !== 0 && (c3 = Tj(a3, b3)));
      if (c3 === 1)
        throw c3 = sj, Qj(a3, 0), Ii(a3, b3), Mj(a3, O2()), c3;
      a3.finishedWork = a3.current.alternate;
      a3.finishedLanes = b3;
      Uj(a3);
      Mj(a3, O2());
      return null;
    }
    function Vj() {
      if (Cj !== null) {
        var a3 = Cj;
        Cj = null;
        a3.forEach(function(a4) {
          a4.expiredLanes |= 24 & a4.pendingLanes;
          Mj(a4, O2());
        });
      }
      ig();
    }
    function Wj(a3, b3) {
      var c3 = X2;
      X2 |= 1;
      try {
        return a3(b3);
      } finally {
        X2 = c3, X2 === 0 && (wj(), ig());
      }
    }
    function Xj(a3, b3) {
      var c3 = X2;
      X2 &= -2;
      X2 |= 8;
      try {
        return a3(b3);
      } finally {
        X2 = c3, X2 === 0 && (wj(), ig());
      }
    }
    function ni(a3, b3) {
      I2(rj, qj);
      qj |= b3;
      tj |= b3;
    }
    function Ki() {
      qj = rj.current;
      H2(rj);
    }
    function Qj(a3, b3) {
      a3.finishedWork = null;
      a3.finishedLanes = 0;
      var c3 = a3.timeoutHandle;
      c3 !== -1 && (a3.timeoutHandle = -1, pf(c3));
      if (Y !== null)
        for (c3 = Y.return; c3 !== null; ) {
          var d3 = c3;
          switch (d3.tag) {
            case 1:
              d3 = d3.type.childContextTypes;
              d3 !== null && d3 !== void 0 && Gf();
              break;
            case 3:
              fh();
              H2(N2);
              H2(M2);
              uh();
              break;
            case 5:
              hh(d3);
              break;
            case 4:
              fh();
              break;
            case 13:
              H2(P2);
              break;
            case 19:
              H2(P2);
              break;
            case 10:
              rg(d3);
              break;
            case 23:
            case 24:
              Ki();
          }
          c3 = c3.return;
        }
      U2 = a3;
      Y = Tg(a3.current, null);
      W2 = qj = tj = b3;
      V2 = 0;
      sj = null;
      uj = Hi = Dg = 0;
    }
    function Sj(a3, b3) {
      do {
        var c3 = Y;
        try {
          qg();
          vh.current = Gh;
          if (yh) {
            for (var d3 = R7.memoizedState; d3 !== null; ) {
              var e3 = d3.queue;
              e3 !== null && (e3.pending = null);
              d3 = d3.next;
            }
            yh = false;
          }
          xh = 0;
          T = S2 = R7 = null;
          zh = false;
          pj.current = null;
          if (c3 === null || c3.return === null) {
            V2 = 1;
            sj = b3;
            Y = null;
            break;
          }
          a: {
            var f3 = a3, g3 = c3.return, h3 = c3, k2 = b3;
            b3 = W2;
            h3.flags |= 2048;
            h3.firstEffect = h3.lastEffect = null;
            if (k2 !== null && typeof k2 === "object" && typeof k2.then === "function") {
              var l3 = k2;
              if ((h3.mode & 2) === 0) {
                var n3 = h3.alternate;
                n3 ? (h3.updateQueue = n3.updateQueue, h3.memoizedState = n3.memoizedState, h3.lanes = n3.lanes) : (h3.updateQueue = null, h3.memoizedState = null);
              }
              var A2 = (P2.current & 1) !== 0, p3 = g3;
              do {
                var C2;
                if (C2 = p3.tag === 13) {
                  var x2 = p3.memoizedState;
                  if (x2 !== null)
                    C2 = x2.dehydrated !== null ? true : false;
                  else {
                    var w3 = p3.memoizedProps;
                    C2 = w3.fallback === void 0 ? false : w3.unstable_avoidThisFallback !== true ? true : A2 ? false : true;
                  }
                }
                if (C2) {
                  var z3 = p3.updateQueue;
                  if (z3 === null) {
                    var u3 = new Set();
                    u3.add(l3);
                    p3.updateQueue = u3;
                  } else
                    z3.add(l3);
                  if ((p3.mode & 2) === 0) {
                    p3.flags |= 64;
                    h3.flags |= 16384;
                    h3.flags &= -2981;
                    if (h3.tag === 1)
                      if (h3.alternate === null)
                        h3.tag = 17;
                      else {
                        var t3 = zg(-1, 1);
                        t3.tag = 2;
                        Ag(h3, t3);
                      }
                    h3.lanes |= 1;
                    break a;
                  }
                  k2 = void 0;
                  h3 = b3;
                  var q2 = f3.pingCache;
                  q2 === null ? (q2 = f3.pingCache = new Oi(), k2 = new Set(), q2.set(l3, k2)) : (k2 = q2.get(l3), k2 === void 0 && (k2 = new Set(), q2.set(l3, k2)));
                  if (!k2.has(h3)) {
                    k2.add(h3);
                    var v2 = Yj.bind(null, f3, l3, h3);
                    l3.then(v2, v2);
                  }
                  p3.flags |= 4096;
                  p3.lanes = b3;
                  break a;
                }
                p3 = p3.return;
              } while (p3 !== null);
              k2 = Error((Ra(h3.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
            }
            V2 !== 5 && (V2 = 2);
            k2 = Mi(k2, h3);
            p3 = g3;
            do {
              switch (p3.tag) {
                case 3:
                  f3 = k2;
                  p3.flags |= 4096;
                  b3 &= -b3;
                  p3.lanes |= b3;
                  var J = Pi(p3, f3, b3);
                  Bg(p3, J);
                  break a;
                case 1:
                  f3 = k2;
                  var K = p3.type, Q2 = p3.stateNode;
                  if ((p3.flags & 64) === 0 && (typeof K.getDerivedStateFromError === "function" || Q2 !== null && typeof Q2.componentDidCatch === "function" && (Ti === null || !Ti.has(Q2)))) {
                    p3.flags |= 4096;
                    b3 &= -b3;
                    p3.lanes |= b3;
                    var L2 = Si(p3, f3, b3);
                    Bg(p3, L2);
                    break a;
                  }
              }
              p3 = p3.return;
            } while (p3 !== null);
          }
          Zj(c3);
        } catch (va) {
          b3 = va;
          Y === c3 && c3 !== null && (Y = c3 = c3.return);
          continue;
        }
        break;
      } while (1);
    }
    function Pj() {
      var a3 = oj.current;
      oj.current = Gh;
      return a3 === null ? Gh : a3;
    }
    function Tj(a3, b3) {
      var c3 = X2;
      X2 |= 16;
      var d3 = Pj();
      U2 === a3 && W2 === b3 || Qj(a3, b3);
      do
        try {
          ak();
          break;
        } catch (e3) {
          Sj(a3, e3);
        }
      while (1);
      qg();
      X2 = c3;
      oj.current = d3;
      if (Y !== null)
        throw Error(y3(261));
      U2 = null;
      W2 = 0;
      return V2;
    }
    function ak() {
      for (; Y !== null; )
        bk(Y);
    }
    function Rj() {
      for (; Y !== null && !Qf(); )
        bk(Y);
    }
    function bk(a3) {
      var b3 = ck(a3.alternate, a3, qj);
      a3.memoizedProps = a3.pendingProps;
      b3 === null ? Zj(a3) : Y = b3;
      pj.current = null;
    }
    function Zj(a3) {
      var b3 = a3;
      do {
        var c3 = b3.alternate;
        a3 = b3.return;
        if ((b3.flags & 2048) === 0) {
          c3 = Gi(c3, b3, qj);
          if (c3 !== null) {
            Y = c3;
            return;
          }
          c3 = b3;
          if (c3.tag !== 24 && c3.tag !== 23 || c3.memoizedState === null || (qj & 1073741824) !== 0 || (c3.mode & 4) === 0) {
            for (var d3 = 0, e3 = c3.child; e3 !== null; )
              d3 |= e3.lanes | e3.childLanes, e3 = e3.sibling;
            c3.childLanes = d3;
          }
          a3 !== null && (a3.flags & 2048) === 0 && (a3.firstEffect === null && (a3.firstEffect = b3.firstEffect), b3.lastEffect !== null && (a3.lastEffect !== null && (a3.lastEffect.nextEffect = b3.firstEffect), a3.lastEffect = b3.lastEffect), 1 < b3.flags && (a3.lastEffect !== null ? a3.lastEffect.nextEffect = b3 : a3.firstEffect = b3, a3.lastEffect = b3));
        } else {
          c3 = Li(b3);
          if (c3 !== null) {
            c3.flags &= 2047;
            Y = c3;
            return;
          }
          a3 !== null && (a3.firstEffect = a3.lastEffect = null, a3.flags |= 2048);
        }
        b3 = b3.sibling;
        if (b3 !== null) {
          Y = b3;
          return;
        }
        Y = b3 = a3;
      } while (b3 !== null);
      V2 === 0 && (V2 = 5);
    }
    function Uj(a3) {
      var b3 = eg();
      gg(99, dk.bind(null, a3, b3));
      return null;
    }
    function dk(a3, b3) {
      do
        Oj();
      while (yj !== null);
      if ((X2 & 48) !== 0)
        throw Error(y3(327));
      var c3 = a3.finishedWork;
      if (c3 === null)
        return null;
      a3.finishedWork = null;
      a3.finishedLanes = 0;
      if (c3 === a3.current)
        throw Error(y3(177));
      a3.callbackNode = null;
      var d3 = c3.lanes | c3.childLanes, e3 = d3, f3 = a3.pendingLanes & ~e3;
      a3.pendingLanes = e3;
      a3.suspendedLanes = 0;
      a3.pingedLanes = 0;
      a3.expiredLanes &= e3;
      a3.mutableReadLanes &= e3;
      a3.entangledLanes &= e3;
      e3 = a3.entanglements;
      for (var g3 = a3.eventTimes, h3 = a3.expirationTimes; 0 < f3; ) {
        var k2 = 31 - Vc(f3), l3 = 1 << k2;
        e3[k2] = 0;
        g3[k2] = -1;
        h3[k2] = -1;
        f3 &= ~l3;
      }
      Cj !== null && (d3 & 24) === 0 && Cj.has(a3) && Cj.delete(a3);
      a3 === U2 && (Y = U2 = null, W2 = 0);
      1 < c3.flags ? c3.lastEffect !== null ? (c3.lastEffect.nextEffect = c3, d3 = c3.firstEffect) : d3 = c3 : d3 = c3.firstEffect;
      if (d3 !== null) {
        e3 = X2;
        X2 |= 32;
        pj.current = null;
        kf = fd;
        g3 = Ne();
        if (Oe(g3)) {
          if ("selectionStart" in g3)
            h3 = {start: g3.selectionStart, end: g3.selectionEnd};
          else
            a:
              if (h3 = (h3 = g3.ownerDocument) && h3.defaultView || window, (l3 = h3.getSelection && h3.getSelection()) && l3.rangeCount !== 0) {
                h3 = l3.anchorNode;
                f3 = l3.anchorOffset;
                k2 = l3.focusNode;
                l3 = l3.focusOffset;
                try {
                  h3.nodeType, k2.nodeType;
                } catch (va) {
                  h3 = null;
                  break a;
                }
                var n3 = 0, A2 = -1, p3 = -1, C2 = 0, x2 = 0, w3 = g3, z3 = null;
                b:
                  for (; ; ) {
                    for (var u3; ; ) {
                      w3 !== h3 || f3 !== 0 && w3.nodeType !== 3 || (A2 = n3 + f3);
                      w3 !== k2 || l3 !== 0 && w3.nodeType !== 3 || (p3 = n3 + l3);
                      w3.nodeType === 3 && (n3 += w3.nodeValue.length);
                      if ((u3 = w3.firstChild) === null)
                        break;
                      z3 = w3;
                      w3 = u3;
                    }
                    for (; ; ) {
                      if (w3 === g3)
                        break b;
                      z3 === h3 && ++C2 === f3 && (A2 = n3);
                      z3 === k2 && ++x2 === l3 && (p3 = n3);
                      if ((u3 = w3.nextSibling) !== null)
                        break;
                      w3 = z3;
                      z3 = w3.parentNode;
                    }
                    w3 = u3;
                  }
                h3 = A2 === -1 || p3 === -1 ? null : {start: A2, end: p3};
              } else
                h3 = null;
          h3 = h3 || {start: 0, end: 0};
        } else
          h3 = null;
        lf = {focusedElem: g3, selectionRange: h3};
        fd = false;
        Ij = null;
        Jj = false;
        Z2 = d3;
        do
          try {
            ek();
          } catch (va) {
            if (Z2 === null)
              throw Error(y3(330));
            Wi(Z2, va);
            Z2 = Z2.nextEffect;
          }
        while (Z2 !== null);
        Ij = null;
        Z2 = d3;
        do
          try {
            for (g3 = a3; Z2 !== null; ) {
              var t3 = Z2.flags;
              t3 & 16 && pb(Z2.stateNode, "");
              if (t3 & 128) {
                var q2 = Z2.alternate;
                if (q2 !== null) {
                  var v2 = q2.ref;
                  v2 !== null && (typeof v2 === "function" ? v2(null) : v2.current = null);
                }
              }
              switch (t3 & 1038) {
                case 2:
                  fj(Z2);
                  Z2.flags &= -3;
                  break;
                case 6:
                  fj(Z2);
                  Z2.flags &= -3;
                  ij(Z2.alternate, Z2);
                  break;
                case 1024:
                  Z2.flags &= -1025;
                  break;
                case 1028:
                  Z2.flags &= -1025;
                  ij(Z2.alternate, Z2);
                  break;
                case 4:
                  ij(Z2.alternate, Z2);
                  break;
                case 8:
                  h3 = Z2;
                  cj(g3, h3);
                  var J = h3.alternate;
                  dj(h3);
                  J !== null && dj(J);
              }
              Z2 = Z2.nextEffect;
            }
          } catch (va) {
            if (Z2 === null)
              throw Error(y3(330));
            Wi(Z2, va);
            Z2 = Z2.nextEffect;
          }
        while (Z2 !== null);
        v2 = lf;
        q2 = Ne();
        t3 = v2.focusedElem;
        g3 = v2.selectionRange;
        if (q2 !== t3 && t3 && t3.ownerDocument && Me(t3.ownerDocument.documentElement, t3)) {
          g3 !== null && Oe(t3) && (q2 = g3.start, v2 = g3.end, v2 === void 0 && (v2 = q2), "selectionStart" in t3 ? (t3.selectionStart = q2, t3.selectionEnd = Math.min(v2, t3.value.length)) : (v2 = (q2 = t3.ownerDocument || document) && q2.defaultView || window, v2.getSelection && (v2 = v2.getSelection(), h3 = t3.textContent.length, J = Math.min(g3.start, h3), g3 = g3.end === void 0 ? J : Math.min(g3.end, h3), !v2.extend && J > g3 && (h3 = g3, g3 = J, J = h3), h3 = Le(t3, J), f3 = Le(t3, g3), h3 && f3 && (v2.rangeCount !== 1 || v2.anchorNode !== h3.node || v2.anchorOffset !== h3.offset || v2.focusNode !== f3.node || v2.focusOffset !== f3.offset) && (q2 = q2.createRange(), q2.setStart(h3.node, h3.offset), v2.removeAllRanges(), J > g3 ? (v2.addRange(q2), v2.extend(f3.node, f3.offset)) : (q2.setEnd(f3.node, f3.offset), v2.addRange(q2))))));
          q2 = [];
          for (v2 = t3; v2 = v2.parentNode; )
            v2.nodeType === 1 && q2.push({element: v2, left: v2.scrollLeft, top: v2.scrollTop});
          typeof t3.focus === "function" && t3.focus();
          for (t3 = 0; t3 < q2.length; t3++)
            v2 = q2[t3], v2.element.scrollLeft = v2.left, v2.element.scrollTop = v2.top;
        }
        fd = !!kf;
        lf = kf = null;
        a3.current = c3;
        Z2 = d3;
        do
          try {
            for (t3 = a3; Z2 !== null; ) {
              var K = Z2.flags;
              K & 36 && Yi(t3, Z2.alternate, Z2);
              if (K & 128) {
                q2 = void 0;
                var Q2 = Z2.ref;
                if (Q2 !== null) {
                  var L2 = Z2.stateNode;
                  switch (Z2.tag) {
                    case 5:
                      q2 = L2;
                      break;
                    default:
                      q2 = L2;
                  }
                  typeof Q2 === "function" ? Q2(q2) : Q2.current = q2;
                }
              }
              Z2 = Z2.nextEffect;
            }
          } catch (va) {
            if (Z2 === null)
              throw Error(y3(330));
            Wi(Z2, va);
            Z2 = Z2.nextEffect;
          }
        while (Z2 !== null);
        Z2 = null;
        $f();
        X2 = e3;
      } else
        a3.current = c3;
      if (xj)
        xj = false, yj = a3, zj = b3;
      else
        for (Z2 = d3; Z2 !== null; )
          b3 = Z2.nextEffect, Z2.nextEffect = null, Z2.flags & 8 && (K = Z2, K.sibling = null, K.stateNode = null), Z2 = b3;
      d3 = a3.pendingLanes;
      d3 === 0 && (Ti = null);
      d3 === 1 ? a3 === Ej ? Dj++ : (Dj = 0, Ej = a3) : Dj = 0;
      c3 = c3.stateNode;
      if (Mf && typeof Mf.onCommitFiberRoot === "function")
        try {
          Mf.onCommitFiberRoot(Lf, c3, void 0, (c3.current.flags & 64) === 64);
        } catch (va) {
        }
      Mj(a3, O2());
      if (Qi)
        throw Qi = false, a3 = Ri, Ri = null, a3;
      if ((X2 & 8) !== 0)
        return null;
      ig();
      return null;
    }
    function ek() {
      for (; Z2 !== null; ) {
        var a3 = Z2.alternate;
        Jj || Ij === null || ((Z2.flags & 8) !== 0 ? dc(Z2, Ij) && (Jj = true) : Z2.tag === 13 && mj(a3, Z2) && dc(Z2, Ij) && (Jj = true));
        var b3 = Z2.flags;
        (b3 & 256) !== 0 && Xi(a3, Z2);
        (b3 & 512) === 0 || xj || (xj = true, hg(97, function() {
          Oj();
          return null;
        }));
        Z2 = Z2.nextEffect;
      }
    }
    function Oj() {
      if (zj !== 90) {
        var a3 = 97 < zj ? 97 : zj;
        zj = 90;
        return gg(a3, fk);
      }
      return false;
    }
    function $i(a3, b3) {
      Aj.push(b3, a3);
      xj || (xj = true, hg(97, function() {
        Oj();
        return null;
      }));
    }
    function Zi(a3, b3) {
      Bj.push(b3, a3);
      xj || (xj = true, hg(97, function() {
        Oj();
        return null;
      }));
    }
    function fk() {
      if (yj === null)
        return false;
      var a3 = yj;
      yj = null;
      if ((X2 & 48) !== 0)
        throw Error(y3(331));
      var b3 = X2;
      X2 |= 32;
      var c3 = Bj;
      Bj = [];
      for (var d3 = 0; d3 < c3.length; d3 += 2) {
        var e3 = c3[d3], f3 = c3[d3 + 1], g3 = e3.destroy;
        e3.destroy = void 0;
        if (typeof g3 === "function")
          try {
            g3();
          } catch (k2) {
            if (f3 === null)
              throw Error(y3(330));
            Wi(f3, k2);
          }
      }
      c3 = Aj;
      Aj = [];
      for (d3 = 0; d3 < c3.length; d3 += 2) {
        e3 = c3[d3];
        f3 = c3[d3 + 1];
        try {
          var h3 = e3.create;
          e3.destroy = h3();
        } catch (k2) {
          if (f3 === null)
            throw Error(y3(330));
          Wi(f3, k2);
        }
      }
      for (h3 = a3.current.firstEffect; h3 !== null; )
        a3 = h3.nextEffect, h3.nextEffect = null, h3.flags & 8 && (h3.sibling = null, h3.stateNode = null), h3 = a3;
      X2 = b3;
      ig();
      return true;
    }
    function gk(a3, b3, c3) {
      b3 = Mi(c3, b3);
      b3 = Pi(a3, b3, 1);
      Ag(a3, b3);
      b3 = Hg();
      a3 = Kj(a3, 1);
      a3 !== null && ($c(a3, 1, b3), Mj(a3, b3));
    }
    function Wi(a3, b3) {
      if (a3.tag === 3)
        gk(a3, a3, b3);
      else
        for (var c3 = a3.return; c3 !== null; ) {
          if (c3.tag === 3) {
            gk(c3, a3, b3);
            break;
          } else if (c3.tag === 1) {
            var d3 = c3.stateNode;
            if (typeof c3.type.getDerivedStateFromError === "function" || typeof d3.componentDidCatch === "function" && (Ti === null || !Ti.has(d3))) {
              a3 = Mi(b3, a3);
              var e3 = Si(c3, a3, 1);
              Ag(c3, e3);
              e3 = Hg();
              c3 = Kj(c3, 1);
              if (c3 !== null)
                $c(c3, 1, e3), Mj(c3, e3);
              else if (typeof d3.componentDidCatch === "function" && (Ti === null || !Ti.has(d3)))
                try {
                  d3.componentDidCatch(b3, a3);
                } catch (f3) {
                }
              break;
            }
          }
          c3 = c3.return;
        }
    }
    function Yj(a3, b3, c3) {
      var d3 = a3.pingCache;
      d3 !== null && d3.delete(b3);
      b3 = Hg();
      a3.pingedLanes |= a3.suspendedLanes & c3;
      U2 === a3 && (W2 & c3) === c3 && (V2 === 4 || V2 === 3 && (W2 & 62914560) === W2 && 500 > O2() - jj ? Qj(a3, 0) : uj |= c3);
      Mj(a3, b3);
    }
    function lj(a3, b3) {
      var c3 = a3.stateNode;
      c3 !== null && c3.delete(b3);
      b3 = 0;
      b3 === 0 && (b3 = a3.mode, (b3 & 2) === 0 ? b3 = 1 : (b3 & 4) === 0 ? b3 = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b3 = Yc(62914560 & ~Gj), b3 === 0 && (b3 = 4194304)));
      c3 = Hg();
      a3 = Kj(a3, b3);
      a3 !== null && ($c(a3, b3, c3), Mj(a3, c3));
    }
    var ck;
    ck = function(a3, b3, c3) {
      var d3 = b3.lanes;
      if (a3 !== null)
        if (a3.memoizedProps !== b3.pendingProps || N2.current)
          ug = true;
        else if ((c3 & d3) !== 0)
          ug = (a3.flags & 16384) !== 0 ? true : false;
        else {
          ug = false;
          switch (b3.tag) {
            case 3:
              ri(b3);
              sh();
              break;
            case 5:
              gh(b3);
              break;
            case 1:
              Ff(b3.type) && Jf(b3);
              break;
            case 4:
              eh(b3, b3.stateNode.containerInfo);
              break;
            case 10:
              d3 = b3.memoizedProps.value;
              var e3 = b3.type._context;
              I2(mg, e3._currentValue);
              e3._currentValue = d3;
              break;
            case 13:
              if (b3.memoizedState !== null) {
                if ((c3 & b3.child.childLanes) !== 0)
                  return ti(a3, b3, c3);
                I2(P2, P2.current & 1);
                b3 = hi(a3, b3, c3);
                return b3 !== null ? b3.sibling : null;
              }
              I2(P2, P2.current & 1);
              break;
            case 19:
              d3 = (c3 & b3.childLanes) !== 0;
              if ((a3.flags & 64) !== 0) {
                if (d3)
                  return Ai(a3, b3, c3);
                b3.flags |= 64;
              }
              e3 = b3.memoizedState;
              e3 !== null && (e3.rendering = null, e3.tail = null, e3.lastEffect = null);
              I2(P2, P2.current);
              if (d3)
                break;
              else
                return null;
            case 23:
            case 24:
              return b3.lanes = 0, mi(a3, b3, c3);
          }
          return hi(a3, b3, c3);
        }
      else
        ug = false;
      b3.lanes = 0;
      switch (b3.tag) {
        case 2:
          d3 = b3.type;
          a3 !== null && (a3.alternate = null, b3.alternate = null, b3.flags |= 2);
          a3 = b3.pendingProps;
          e3 = Ef(b3, M2.current);
          tg(b3, c3);
          e3 = Ch(null, b3, d3, a3, e3, c3);
          b3.flags |= 1;
          if (typeof e3 === "object" && e3 !== null && typeof e3.render === "function" && e3.$$typeof === void 0) {
            b3.tag = 1;
            b3.memoizedState = null;
            b3.updateQueue = null;
            if (Ff(d3)) {
              var f3 = true;
              Jf(b3);
            } else
              f3 = false;
            b3.memoizedState = e3.state !== null && e3.state !== void 0 ? e3.state : null;
            xg(b3);
            var g3 = d3.getDerivedStateFromProps;
            typeof g3 === "function" && Gg(b3, d3, g3, a3);
            e3.updater = Kg;
            b3.stateNode = e3;
            e3._reactInternals = b3;
            Og(b3, d3, a3, c3);
            b3 = qi(null, b3, d3, true, f3, c3);
          } else
            b3.tag = 0, fi(null, b3, e3, c3), b3 = b3.child;
          return b3;
        case 16:
          e3 = b3.elementType;
          a: {
            a3 !== null && (a3.alternate = null, b3.alternate = null, b3.flags |= 2);
            a3 = b3.pendingProps;
            f3 = e3._init;
            e3 = f3(e3._payload);
            b3.type = e3;
            f3 = b3.tag = hk(e3);
            a3 = lg(e3, a3);
            switch (f3) {
              case 0:
                b3 = li(null, b3, e3, a3, c3);
                break a;
              case 1:
                b3 = pi(null, b3, e3, a3, c3);
                break a;
              case 11:
                b3 = gi(null, b3, e3, a3, c3);
                break a;
              case 14:
                b3 = ii(null, b3, e3, lg(e3.type, a3), d3, c3);
                break a;
            }
            throw Error(y3(306, e3, ""));
          }
          return b3;
        case 0:
          return d3 = b3.type, e3 = b3.pendingProps, e3 = b3.elementType === d3 ? e3 : lg(d3, e3), li(a3, b3, d3, e3, c3);
        case 1:
          return d3 = b3.type, e3 = b3.pendingProps, e3 = b3.elementType === d3 ? e3 : lg(d3, e3), pi(a3, b3, d3, e3, c3);
        case 3:
          ri(b3);
          d3 = b3.updateQueue;
          if (a3 === null || d3 === null)
            throw Error(y3(282));
          d3 = b3.pendingProps;
          e3 = b3.memoizedState;
          e3 = e3 !== null ? e3.element : null;
          yg(a3, b3);
          Cg(b3, d3, null, c3);
          d3 = b3.memoizedState.element;
          if (d3 === e3)
            sh(), b3 = hi(a3, b3, c3);
          else {
            e3 = b3.stateNode;
            if (f3 = e3.hydrate)
              kh = rf(b3.stateNode.containerInfo.firstChild), jh = b3, f3 = lh = true;
            if (f3) {
              a3 = e3.mutableSourceEagerHydrationData;
              if (a3 != null)
                for (e3 = 0; e3 < a3.length; e3 += 2)
                  f3 = a3[e3], f3._workInProgressVersionPrimary = a3[e3 + 1], th.push(f3);
              c3 = Zg(b3, null, d3, c3);
              for (b3.child = c3; c3; )
                c3.flags = c3.flags & -3 | 1024, c3 = c3.sibling;
            } else
              fi(a3, b3, d3, c3), sh();
            b3 = b3.child;
          }
          return b3;
        case 5:
          return gh(b3), a3 === null && ph(b3), d3 = b3.type, e3 = b3.pendingProps, f3 = a3 !== null ? a3.memoizedProps : null, g3 = e3.children, nf(d3, e3) ? g3 = null : f3 !== null && nf(d3, f3) && (b3.flags |= 16), oi(a3, b3), fi(a3, b3, g3, c3), b3.child;
        case 6:
          return a3 === null && ph(b3), null;
        case 13:
          return ti(a3, b3, c3);
        case 4:
          return eh(b3, b3.stateNode.containerInfo), d3 = b3.pendingProps, a3 === null ? b3.child = Yg(b3, null, d3, c3) : fi(a3, b3, d3, c3), b3.child;
        case 11:
          return d3 = b3.type, e3 = b3.pendingProps, e3 = b3.elementType === d3 ? e3 : lg(d3, e3), gi(a3, b3, d3, e3, c3);
        case 7:
          return fi(a3, b3, b3.pendingProps, c3), b3.child;
        case 8:
          return fi(a3, b3, b3.pendingProps.children, c3), b3.child;
        case 12:
          return fi(a3, b3, b3.pendingProps.children, c3), b3.child;
        case 10:
          a: {
            d3 = b3.type._context;
            e3 = b3.pendingProps;
            g3 = b3.memoizedProps;
            f3 = e3.value;
            var h3 = b3.type._context;
            I2(mg, h3._currentValue);
            h3._currentValue = f3;
            if (g3 !== null)
              if (h3 = g3.value, f3 = He(h3, f3) ? 0 : (typeof d3._calculateChangedBits === "function" ? d3._calculateChangedBits(h3, f3) : 1073741823) | 0, f3 === 0) {
                if (g3.children === e3.children && !N2.current) {
                  b3 = hi(a3, b3, c3);
                  break a;
                }
              } else
                for (h3 = b3.child, h3 !== null && (h3.return = b3); h3 !== null; ) {
                  var k2 = h3.dependencies;
                  if (k2 !== null) {
                    g3 = h3.child;
                    for (var l3 = k2.firstContext; l3 !== null; ) {
                      if (l3.context === d3 && (l3.observedBits & f3) !== 0) {
                        h3.tag === 1 && (l3 = zg(-1, c3 & -c3), l3.tag = 2, Ag(h3, l3));
                        h3.lanes |= c3;
                        l3 = h3.alternate;
                        l3 !== null && (l3.lanes |= c3);
                        sg(h3.return, c3);
                        k2.lanes |= c3;
                        break;
                      }
                      l3 = l3.next;
                    }
                  } else
                    g3 = h3.tag === 10 ? h3.type === b3.type ? null : h3.child : h3.child;
                  if (g3 !== null)
                    g3.return = h3;
                  else
                    for (g3 = h3; g3 !== null; ) {
                      if (g3 === b3) {
                        g3 = null;
                        break;
                      }
                      h3 = g3.sibling;
                      if (h3 !== null) {
                        h3.return = g3.return;
                        g3 = h3;
                        break;
                      }
                      g3 = g3.return;
                    }
                  h3 = g3;
                }
            fi(a3, b3, e3.children, c3);
            b3 = b3.child;
          }
          return b3;
        case 9:
          return e3 = b3.type, f3 = b3.pendingProps, d3 = f3.children, tg(b3, c3), e3 = vg(e3, f3.unstable_observedBits), d3 = d3(e3), b3.flags |= 1, fi(a3, b3, d3, c3), b3.child;
        case 14:
          return e3 = b3.type, f3 = lg(e3, b3.pendingProps), f3 = lg(e3.type, f3), ii(a3, b3, e3, f3, d3, c3);
        case 15:
          return ki(a3, b3, b3.type, b3.pendingProps, d3, c3);
        case 17:
          return d3 = b3.type, e3 = b3.pendingProps, e3 = b3.elementType === d3 ? e3 : lg(d3, e3), a3 !== null && (a3.alternate = null, b3.alternate = null, b3.flags |= 2), b3.tag = 1, Ff(d3) ? (a3 = true, Jf(b3)) : a3 = false, tg(b3, c3), Mg(b3, d3, e3), Og(b3, d3, e3, c3), qi(null, b3, d3, true, a3, c3);
        case 19:
          return Ai(a3, b3, c3);
        case 23:
          return mi(a3, b3, c3);
        case 24:
          return mi(a3, b3, c3);
      }
      throw Error(y3(156, b3.tag));
    };
    function ik(a3, b3, c3, d3) {
      this.tag = a3;
      this.key = c3;
      this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
      this.index = 0;
      this.ref = null;
      this.pendingProps = b3;
      this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
      this.mode = d3;
      this.flags = 0;
      this.lastEffect = this.firstEffect = this.nextEffect = null;
      this.childLanes = this.lanes = 0;
      this.alternate = null;
    }
    function nh(a3, b3, c3, d3) {
      return new ik(a3, b3, c3, d3);
    }
    function ji(a3) {
      a3 = a3.prototype;
      return !(!a3 || !a3.isReactComponent);
    }
    function hk(a3) {
      if (typeof a3 === "function")
        return ji(a3) ? 1 : 0;
      if (a3 !== void 0 && a3 !== null) {
        a3 = a3.$$typeof;
        if (a3 === Aa)
          return 11;
        if (a3 === Da)
          return 14;
      }
      return 2;
    }
    function Tg(a3, b3) {
      var c3 = a3.alternate;
      c3 === null ? (c3 = nh(a3.tag, b3, a3.key, a3.mode), c3.elementType = a3.elementType, c3.type = a3.type, c3.stateNode = a3.stateNode, c3.alternate = a3, a3.alternate = c3) : (c3.pendingProps = b3, c3.type = a3.type, c3.flags = 0, c3.nextEffect = null, c3.firstEffect = null, c3.lastEffect = null);
      c3.childLanes = a3.childLanes;
      c3.lanes = a3.lanes;
      c3.child = a3.child;
      c3.memoizedProps = a3.memoizedProps;
      c3.memoizedState = a3.memoizedState;
      c3.updateQueue = a3.updateQueue;
      b3 = a3.dependencies;
      c3.dependencies = b3 === null ? null : {lanes: b3.lanes, firstContext: b3.firstContext};
      c3.sibling = a3.sibling;
      c3.index = a3.index;
      c3.ref = a3.ref;
      return c3;
    }
    function Vg(a3, b3, c3, d3, e3, f3) {
      var g3 = 2;
      d3 = a3;
      if (typeof a3 === "function")
        ji(a3) && (g3 = 1);
      else if (typeof a3 === "string")
        g3 = 5;
      else
        a:
          switch (a3) {
            case ua:
              return Xg(c3.children, e3, f3, b3);
            case Ha:
              g3 = 8;
              e3 |= 16;
              break;
            case wa:
              g3 = 8;
              e3 |= 1;
              break;
            case xa:
              return a3 = nh(12, c3, b3, e3 | 8), a3.elementType = xa, a3.type = xa, a3.lanes = f3, a3;
            case Ba:
              return a3 = nh(13, c3, b3, e3), a3.type = Ba, a3.elementType = Ba, a3.lanes = f3, a3;
            case Ca:
              return a3 = nh(19, c3, b3, e3), a3.elementType = Ca, a3.lanes = f3, a3;
            case Ia:
              return vi(c3, e3, f3, b3);
            case Ja:
              return a3 = nh(24, c3, b3, e3), a3.elementType = Ja, a3.lanes = f3, a3;
            default:
              if (typeof a3 === "object" && a3 !== null)
                switch (a3.$$typeof) {
                  case ya:
                    g3 = 10;
                    break a;
                  case za:
                    g3 = 9;
                    break a;
                  case Aa:
                    g3 = 11;
                    break a;
                  case Da:
                    g3 = 14;
                    break a;
                  case Ea:
                    g3 = 16;
                    d3 = null;
                    break a;
                  case Fa:
                    g3 = 22;
                    break a;
                }
              throw Error(y3(130, a3 == null ? a3 : typeof a3, ""));
          }
      b3 = nh(g3, c3, b3, e3);
      b3.elementType = a3;
      b3.type = d3;
      b3.lanes = f3;
      return b3;
    }
    function Xg(a3, b3, c3, d3) {
      a3 = nh(7, a3, d3, b3);
      a3.lanes = c3;
      return a3;
    }
    function vi(a3, b3, c3, d3) {
      a3 = nh(23, a3, d3, b3);
      a3.elementType = Ia;
      a3.lanes = c3;
      return a3;
    }
    function Ug(a3, b3, c3) {
      a3 = nh(6, a3, null, b3);
      a3.lanes = c3;
      return a3;
    }
    function Wg(a3, b3, c3) {
      b3 = nh(4, a3.children !== null ? a3.children : [], a3.key, b3);
      b3.lanes = c3;
      b3.stateNode = {containerInfo: a3.containerInfo, pendingChildren: null, implementation: a3.implementation};
      return b3;
    }
    function jk(a3, b3, c3) {
      this.tag = b3;
      this.containerInfo = a3;
      this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
      this.timeoutHandle = -1;
      this.pendingContext = this.context = null;
      this.hydrate = c3;
      this.callbackNode = null;
      this.callbackPriority = 0;
      this.eventTimes = Zc(0);
      this.expirationTimes = Zc(-1);
      this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
      this.entanglements = Zc(0);
      this.mutableSourceEagerHydrationData = null;
    }
    function kk(a3, b3, c3) {
      var d3 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {$$typeof: ta, key: d3 == null ? null : "" + d3, children: a3, containerInfo: b3, implementation: c3};
    }
    function lk(a3, b3, c3, d3) {
      var e3 = b3.current, f3 = Hg(), g3 = Ig(e3);
      a:
        if (c3) {
          c3 = c3._reactInternals;
          b: {
            if (Zb(c3) !== c3 || c3.tag !== 1)
              throw Error(y3(170));
            var h3 = c3;
            do {
              switch (h3.tag) {
                case 3:
                  h3 = h3.stateNode.context;
                  break b;
                case 1:
                  if (Ff(h3.type)) {
                    h3 = h3.stateNode.__reactInternalMemoizedMergedChildContext;
                    break b;
                  }
              }
              h3 = h3.return;
            } while (h3 !== null);
            throw Error(y3(171));
          }
          if (c3.tag === 1) {
            var k2 = c3.type;
            if (Ff(k2)) {
              c3 = If(c3, k2, h3);
              break a;
            }
          }
          c3 = h3;
        } else
          c3 = Cf;
      b3.context === null ? b3.context = c3 : b3.pendingContext = c3;
      b3 = zg(f3, g3);
      b3.payload = {element: a3};
      d3 = d3 === void 0 ? null : d3;
      d3 !== null && (b3.callback = d3);
      Ag(e3, b3);
      Jg(e3, g3, f3);
      return g3;
    }
    function mk(a3) {
      a3 = a3.current;
      if (!a3.child)
        return null;
      switch (a3.child.tag) {
        case 5:
          return a3.child.stateNode;
        default:
          return a3.child.stateNode;
      }
    }
    function nk(a3, b3) {
      a3 = a3.memoizedState;
      if (a3 !== null && a3.dehydrated !== null) {
        var c3 = a3.retryLane;
        a3.retryLane = c3 !== 0 && c3 < b3 ? c3 : b3;
      }
    }
    function ok(a3, b3) {
      nk(a3, b3);
      (a3 = a3.alternate) && nk(a3, b3);
    }
    function pk() {
      return null;
    }
    function qk(a3, b3, c3) {
      var d3 = c3 != null && c3.hydrationOptions != null && c3.hydrationOptions.mutableSources || null;
      c3 = new jk(a3, b3, c3 != null && c3.hydrate === true);
      b3 = nh(3, null, null, b3 === 2 ? 7 : b3 === 1 ? 3 : 0);
      c3.current = b3;
      b3.stateNode = c3;
      xg(b3);
      a3[ff] = c3.current;
      cf(a3.nodeType === 8 ? a3.parentNode : a3);
      if (d3)
        for (a3 = 0; a3 < d3.length; a3++) {
          b3 = d3[a3];
          var e3 = b3._getVersion;
          e3 = e3(b3._source);
          c3.mutableSourceEagerHydrationData == null ? c3.mutableSourceEagerHydrationData = [b3, e3] : c3.mutableSourceEagerHydrationData.push(b3, e3);
        }
      this._internalRoot = c3;
    }
    qk.prototype.render = function(a3) {
      lk(a3, this._internalRoot, null, null);
    };
    qk.prototype.unmount = function() {
      var a3 = this._internalRoot, b3 = a3.containerInfo;
      lk(null, a3, null, function() {
        b3[ff] = null;
      });
    };
    function rk(a3) {
      return !(!a3 || a3.nodeType !== 1 && a3.nodeType !== 9 && a3.nodeType !== 11 && (a3.nodeType !== 8 || a3.nodeValue !== " react-mount-point-unstable "));
    }
    function sk(a3, b3) {
      b3 || (b3 = a3 ? a3.nodeType === 9 ? a3.documentElement : a3.firstChild : null, b3 = !(!b3 || b3.nodeType !== 1 || !b3.hasAttribute("data-reactroot")));
      if (!b3)
        for (var c3; c3 = a3.lastChild; )
          a3.removeChild(c3);
      return new qk(a3, 0, b3 ? {hydrate: true} : void 0);
    }
    function tk(a3, b3, c3, d3, e3) {
      var f3 = c3._reactRootContainer;
      if (f3) {
        var g3 = f3._internalRoot;
        if (typeof e3 === "function") {
          var h3 = e3;
          e3 = function() {
            var a4 = mk(g3);
            h3.call(a4);
          };
        }
        lk(b3, g3, a3, e3);
      } else {
        f3 = c3._reactRootContainer = sk(c3, d3);
        g3 = f3._internalRoot;
        if (typeof e3 === "function") {
          var k2 = e3;
          e3 = function() {
            var a4 = mk(g3);
            k2.call(a4);
          };
        }
        Xj(function() {
          lk(b3, g3, a3, e3);
        });
      }
      return mk(g3);
    }
    ec = function(a3) {
      if (a3.tag === 13) {
        var b3 = Hg();
        Jg(a3, 4, b3);
        ok(a3, 4);
      }
    };
    fc = function(a3) {
      if (a3.tag === 13) {
        var b3 = Hg();
        Jg(a3, 67108864, b3);
        ok(a3, 67108864);
      }
    };
    gc = function(a3) {
      if (a3.tag === 13) {
        var b3 = Hg(), c3 = Ig(a3);
        Jg(a3, c3, b3);
        ok(a3, c3);
      }
    };
    hc = function(a3, b3) {
      return b3();
    };
    yb = function(a3, b3, c3) {
      switch (b3) {
        case "input":
          ab(a3, c3);
          b3 = c3.name;
          if (c3.type === "radio" && b3 != null) {
            for (c3 = a3; c3.parentNode; )
              c3 = c3.parentNode;
            c3 = c3.querySelectorAll("input[name=" + JSON.stringify("" + b3) + '][type="radio"]');
            for (b3 = 0; b3 < c3.length; b3++) {
              var d3 = c3[b3];
              if (d3 !== a3 && d3.form === a3.form) {
                var e3 = Db(d3);
                if (!e3)
                  throw Error(y3(90));
                Wa(d3);
                ab(d3, e3);
              }
            }
          }
          break;
        case "textarea":
          ib(a3, c3);
          break;
        case "select":
          b3 = c3.value, b3 != null && fb(a3, !!c3.multiple, b3, false);
      }
    };
    Gb = Wj;
    Hb = function(a3, b3, c3, d3, e3) {
      var f3 = X2;
      X2 |= 4;
      try {
        return gg(98, a3.bind(null, b3, c3, d3, e3));
      } finally {
        X2 = f3, X2 === 0 && (wj(), ig());
      }
    };
    Ib = function() {
      (X2 & 49) === 0 && (Vj(), Oj());
    };
    Jb = function(a3, b3) {
      var c3 = X2;
      X2 |= 2;
      try {
        return a3(b3);
      } finally {
        X2 = c3, X2 === 0 && (wj(), ig());
      }
    };
    function uk(a3, b3) {
      var c3 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!rk(b3))
        throw Error(y3(200));
      return kk(a3, b3, null, c3);
    }
    var vk = {Events: [Cb, ue, Db, Eb, Fb, Oj, {current: false}]};
    var wk = {findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom"};
    var xk = {bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a3) {
      a3 = cc(a3);
      return a3 === null ? null : a3.stateNode;
    }, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null};
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
      yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!yk.isDisabled && yk.supportsFiber)
        try {
          Lf = yk.inject(xk), Mf = yk;
        } catch (a3) {
        }
    }
    var yk;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
    exports.createPortal = uk;
    exports.findDOMNode = function(a3) {
      if (a3 == null)
        return null;
      if (a3.nodeType === 1)
        return a3;
      var b3 = a3._reactInternals;
      if (b3 === void 0) {
        if (typeof a3.render === "function")
          throw Error(y3(188));
        throw Error(y3(268, Object.keys(a3)));
      }
      a3 = cc(b3);
      a3 = a3 === null ? null : a3.stateNode;
      return a3;
    };
    exports.flushSync = function(a3, b3) {
      var c3 = X2;
      if ((c3 & 48) !== 0)
        return a3(b3);
      X2 |= 1;
      try {
        if (a3)
          return gg(99, a3.bind(null, b3));
      } finally {
        X2 = c3, ig();
      }
    };
    exports.hydrate = function(a3, b3, c3) {
      if (!rk(b3))
        throw Error(y3(200));
      return tk(null, a3, b3, true, c3);
    };
    exports.render = function(a3, b3, c3) {
      if (!rk(b3))
        throw Error(y3(200));
      return tk(null, a3, b3, false, c3);
    };
    exports.unmountComponentAtNode = function(a3) {
      if (!rk(a3))
        throw Error(y3(40));
      return a3._reactRootContainer ? (Xj(function() {
        tk(null, null, a3, false, function() {
          a3._reactRootContainer = null;
          a3[ff] = null;
        });
      }), true) : false;
    };
    exports.unstable_batchedUpdates = Wj;
    exports.unstable_createPortal = function(a3, b3) {
      return uk(a3, b3, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
    };
    exports.unstable_renderSubtreeIntoContainer = function(a3, b3, c3, d3) {
      if (!rk(c3))
        throw Error(y3(200));
      if (a3 == null || a3._reactInternals === void 0)
        throw Error(y3(38));
      return tk(a3, b3, c3, false, d3);
    };
    exports.version = "17.0.2";
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS((exports, module) => {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/prop-types/lib/ReactPropTypesSecret.js
  var require_ReactPropTypesSecret = __commonJS((exports, module) => {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  });

  // node_modules/prop-types/factoryWithThrowingShims.js
  var require_factoryWithThrowingShims = __commonJS((exports, module) => {
    "use strict";
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    function emptyFunction() {
    }
    function emptyFunctionWithReset() {
    }
    emptyFunctionWithReset.resetWarningCache = emptyFunction;
    module.exports = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === ReactPropTypesSecret) {
          return;
        }
        var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        err.name = "Invariant Violation";
        throw err;
      }
      ;
      shim.isRequired = shim;
      function getShim() {
        return shim;
      }
      ;
      var ReactPropTypes = {
        array: shim,
        bigint: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,
        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction
      };
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  });

  // node_modules/prop-types/index.js
  var require_prop_types = __commonJS((exports, module) => {
    if (false) {
      ReactIs = null;
      throwOnDirectAccess = true;
      module.exports = null(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = require_factoryWithThrowingShims()();
    }
    var ReactIs;
    var throwOnDirectAccess;
  });

  // node_modules/react-is/cjs/react-is.production.min.js
  var require_react_is_production_min = __commonJS((exports) => {
    /** @license React v16.13.1
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var b3 = typeof Symbol === "function" && Symbol.for;
    var c3 = b3 ? Symbol.for("react.element") : 60103;
    var d3 = b3 ? Symbol.for("react.portal") : 60106;
    var e3 = b3 ? Symbol.for("react.fragment") : 60107;
    var f3 = b3 ? Symbol.for("react.strict_mode") : 60108;
    var g3 = b3 ? Symbol.for("react.profiler") : 60114;
    var h3 = b3 ? Symbol.for("react.provider") : 60109;
    var k2 = b3 ? Symbol.for("react.context") : 60110;
    var l3 = b3 ? Symbol.for("react.async_mode") : 60111;
    var m2 = b3 ? Symbol.for("react.concurrent_mode") : 60111;
    var n3 = b3 ? Symbol.for("react.forward_ref") : 60112;
    var p3 = b3 ? Symbol.for("react.suspense") : 60113;
    var q2 = b3 ? Symbol.for("react.suspense_list") : 60120;
    var r3 = b3 ? Symbol.for("react.memo") : 60115;
    var t3 = b3 ? Symbol.for("react.lazy") : 60116;
    var v2 = b3 ? Symbol.for("react.block") : 60121;
    var w3 = b3 ? Symbol.for("react.fundamental") : 60117;
    var x2 = b3 ? Symbol.for("react.responder") : 60118;
    var y3 = b3 ? Symbol.for("react.scope") : 60119;
    function z3(a3) {
      if (typeof a3 === "object" && a3 !== null) {
        var u3 = a3.$$typeof;
        switch (u3) {
          case c3:
            switch (a3 = a3.type, a3) {
              case l3:
              case m2:
              case e3:
              case g3:
              case f3:
              case p3:
                return a3;
              default:
                switch (a3 = a3 && a3.$$typeof, a3) {
                  case k2:
                  case n3:
                  case t3:
                  case r3:
                  case h3:
                    return a3;
                  default:
                    return u3;
                }
            }
          case d3:
            return u3;
        }
      }
    }
    function A2(a3) {
      return z3(a3) === m2;
    }
    exports.AsyncMode = l3;
    exports.ConcurrentMode = m2;
    exports.ContextConsumer = k2;
    exports.ContextProvider = h3;
    exports.Element = c3;
    exports.ForwardRef = n3;
    exports.Fragment = e3;
    exports.Lazy = t3;
    exports.Memo = r3;
    exports.Portal = d3;
    exports.Profiler = g3;
    exports.StrictMode = f3;
    exports.Suspense = p3;
    exports.isAsyncMode = function(a3) {
      return A2(a3) || z3(a3) === l3;
    };
    exports.isConcurrentMode = A2;
    exports.isContextConsumer = function(a3) {
      return z3(a3) === k2;
    };
    exports.isContextProvider = function(a3) {
      return z3(a3) === h3;
    };
    exports.isElement = function(a3) {
      return typeof a3 === "object" && a3 !== null && a3.$$typeof === c3;
    };
    exports.isForwardRef = function(a3) {
      return z3(a3) === n3;
    };
    exports.isFragment = function(a3) {
      return z3(a3) === e3;
    };
    exports.isLazy = function(a3) {
      return z3(a3) === t3;
    };
    exports.isMemo = function(a3) {
      return z3(a3) === r3;
    };
    exports.isPortal = function(a3) {
      return z3(a3) === d3;
    };
    exports.isProfiler = function(a3) {
      return z3(a3) === g3;
    };
    exports.isStrictMode = function(a3) {
      return z3(a3) === f3;
    };
    exports.isSuspense = function(a3) {
      return z3(a3) === p3;
    };
    exports.isValidElementType = function(a3) {
      return typeof a3 === "string" || typeof a3 === "function" || a3 === e3 || a3 === m2 || a3 === g3 || a3 === f3 || a3 === p3 || a3 === q2 || typeof a3 === "object" && a3 !== null && (a3.$$typeof === t3 || a3.$$typeof === r3 || a3.$$typeof === h3 || a3.$$typeof === k2 || a3.$$typeof === n3 || a3.$$typeof === w3 || a3.$$typeof === x2 || a3.$$typeof === y3 || a3.$$typeof === v2);
    };
    exports.typeOf = z3;
  });

  // node_modules/react-is/index.js
  var require_react_is = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
  var require_hoist_non_react_statics_cjs = __commonJS((exports, module) => {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      $$typeof: true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      $$typeof: true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys4 = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys4 = keys4.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i3 = 0; i3 < keys4.length; ++i3) {
          var key = keys4[i3];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e3) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS((exports) => {
    /** @license React v17.0.2
     * react-jsx-runtime.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    require_object_assign();
    var f3 = require_react();
    var g3 = 60103;
    exports.Fragment = 60107;
    if (typeof Symbol === "function" && Symbol.for) {
      h3 = Symbol.for;
      g3 = h3("react.element");
      exports.Fragment = h3("react.fragment");
    }
    var h3;
    var m2 = f3.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var n3 = Object.prototype.hasOwnProperty;
    var p3 = {key: true, ref: true, __self: true, __source: true};
    function q2(c3, a3, k2) {
      var b3, d3 = {}, e3 = null, l3 = null;
      k2 !== void 0 && (e3 = "" + k2);
      a3.key !== void 0 && (e3 = "" + a3.key);
      a3.ref !== void 0 && (l3 = a3.ref);
      for (b3 in a3)
        n3.call(a3, b3) && !p3.hasOwnProperty(b3) && (d3[b3] = a3[b3]);
      if (c3 && c3.defaultProps)
        for (b3 in a3 = c3.defaultProps, a3)
          d3[b3] === void 0 && (d3[b3] = a3[b3]);
      return {$$typeof: g3, type: c3, key: e3, ref: l3, props: d3, _owner: m2.current};
    }
    exports.jsx = q2;
    exports.jsxs = q2;
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production_min();
    } else {
      module.exports = null;
    }
  });

  // node_modules/@devbookhq/splitter/node_modules/react-is/cjs/react-is.production.min.js
  var require_react_is_production_min2 = __commonJS((exports) => {
    /** @license React v17.0.2
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    "use strict";
    var b3 = 60103;
    var c3 = 60106;
    var d3 = 60107;
    var e3 = 60108;
    var f3 = 60114;
    var g3 = 60109;
    var h3 = 60110;
    var k2 = 60112;
    var l3 = 60113;
    var m2 = 60120;
    var n3 = 60115;
    var p3 = 60116;
    var q2 = 60121;
    var r3 = 60122;
    var u3 = 60117;
    var v2 = 60129;
    var w3 = 60131;
    if (typeof Symbol === "function" && Symbol.for) {
      x2 = Symbol.for;
      b3 = x2("react.element");
      c3 = x2("react.portal");
      d3 = x2("react.fragment");
      e3 = x2("react.strict_mode");
      f3 = x2("react.profiler");
      g3 = x2("react.provider");
      h3 = x2("react.context");
      k2 = x2("react.forward_ref");
      l3 = x2("react.suspense");
      m2 = x2("react.suspense_list");
      n3 = x2("react.memo");
      p3 = x2("react.lazy");
      q2 = x2("react.block");
      r3 = x2("react.server.block");
      u3 = x2("react.fundamental");
      v2 = x2("react.debug_trace_mode");
      w3 = x2("react.legacy_hidden");
    }
    var x2;
    function y3(a3) {
      if (typeof a3 === "object" && a3 !== null) {
        var t3 = a3.$$typeof;
        switch (t3) {
          case b3:
            switch (a3 = a3.type, a3) {
              case d3:
              case f3:
              case e3:
              case l3:
              case m2:
                return a3;
              default:
                switch (a3 = a3 && a3.$$typeof, a3) {
                  case h3:
                  case k2:
                  case p3:
                  case n3:
                  case g3:
                    return a3;
                  default:
                    return t3;
                }
            }
          case c3:
            return t3;
        }
      }
    }
    var z3 = g3;
    var A2 = b3;
    var B2 = k2;
    var C2 = d3;
    var D2 = p3;
    var E2 = n3;
    var F2 = c3;
    var G2 = f3;
    var H2 = e3;
    var I2 = l3;
    exports.ContextConsumer = h3;
    exports.ContextProvider = z3;
    exports.Element = A2;
    exports.ForwardRef = B2;
    exports.Fragment = C2;
    exports.Lazy = D2;
    exports.Memo = E2;
    exports.Portal = F2;
    exports.Profiler = G2;
    exports.StrictMode = H2;
    exports.Suspense = I2;
    exports.isAsyncMode = function() {
      return false;
    };
    exports.isConcurrentMode = function() {
      return false;
    };
    exports.isContextConsumer = function(a3) {
      return y3(a3) === h3;
    };
    exports.isContextProvider = function(a3) {
      return y3(a3) === g3;
    };
    exports.isElement = function(a3) {
      return typeof a3 === "object" && a3 !== null && a3.$$typeof === b3;
    };
    exports.isForwardRef = function(a3) {
      return y3(a3) === k2;
    };
    exports.isFragment = function(a3) {
      return y3(a3) === d3;
    };
    exports.isLazy = function(a3) {
      return y3(a3) === p3;
    };
    exports.isMemo = function(a3) {
      return y3(a3) === n3;
    };
    exports.isPortal = function(a3) {
      return y3(a3) === c3;
    };
    exports.isProfiler = function(a3) {
      return y3(a3) === f3;
    };
    exports.isStrictMode = function(a3) {
      return y3(a3) === e3;
    };
    exports.isSuspense = function(a3) {
      return y3(a3) === l3;
    };
    exports.isValidElementType = function(a3) {
      return typeof a3 === "string" || typeof a3 === "function" || a3 === d3 || a3 === f3 || a3 === v2 || a3 === e3 || a3 === l3 || a3 === m2 || a3 === w3 || typeof a3 === "object" && a3 !== null && (a3.$$typeof === p3 || a3.$$typeof === n3 || a3.$$typeof === g3 || a3.$$typeof === h3 || a3.$$typeof === k2 || a3.$$typeof === u3 || a3.$$typeof === q2 || a3[0] === r3) ? true : false;
    };
    exports.typeOf = y3;
  });

  // node_modules/@devbookhq/splitter/node_modules/react-is/index.js
  var require_react_is2 = __commonJS((exports, module) => {
    "use strict";
    if (true) {
      module.exports = require_react_is_production_min2();
    } else {
      module.exports = null;
    }
  });

  // node_modules/mixpanel-browser/dist/mixpanel.cjs.js
  var require_mixpanel_cjs = __commonJS((exports, module) => {
    "use strict";
    var Config = {
      DEBUG: false,
      LIB_VERSION: "2.45.0"
    };
    var window$1;
    if (typeof window === "undefined") {
      loc = {
        hostname: ""
      };
      window$1 = {
        navigator: {userAgent: ""},
        document: {
          location: loc,
          referrer: ""
        },
        screen: {width: 0, height: 0},
        location: loc
      };
    } else {
      window$1 = window;
    }
    var loc;
    var ArrayProto = Array.prototype;
    var FuncProto = Function.prototype;
    var ObjProto = Object.prototype;
    var slice3 = ArrayProto.slice;
    var toString4 = ObjProto.toString;
    var hasOwnProperty = ObjProto.hasOwnProperty;
    var windowConsole = window$1.console;
    var navigator2 = window$1.navigator;
    var document$1 = window$1.document;
    var windowOpera = window$1.opera;
    var screen = window$1.screen;
    var userAgent = navigator2.userAgent;
    var nativeBind = FuncProto.bind;
    var nativeForEach = ArrayProto.forEach;
    var nativeIndexOf = ArrayProto.indexOf;
    var nativeMap = ArrayProto.map;
    var nativeIsArray = Array.isArray;
    var breaker = {};
    var _3 = {
      trim: function(str) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      }
    };
    var console2 = {
      log: function() {
        if (Config.DEBUG && !_3.isUndefined(windowConsole) && windowConsole) {
          try {
            windowConsole.log.apply(windowConsole, arguments);
          } catch (err) {
            _3.each(arguments, function(arg) {
              windowConsole.log(arg);
            });
          }
        }
      },
      warn: function() {
        if (Config.DEBUG && !_3.isUndefined(windowConsole) && windowConsole) {
          var args = ["Mixpanel warning:"].concat(_3.toArray(arguments));
          try {
            windowConsole.warn.apply(windowConsole, args);
          } catch (err) {
            _3.each(args, function(arg) {
              windowConsole.warn(arg);
            });
          }
        }
      },
      error: function() {
        if (Config.DEBUG && !_3.isUndefined(windowConsole) && windowConsole) {
          var args = ["Mixpanel error:"].concat(_3.toArray(arguments));
          try {
            windowConsole.error.apply(windowConsole, args);
          } catch (err) {
            _3.each(args, function(arg) {
              windowConsole.error(arg);
            });
          }
        }
      },
      critical: function() {
        if (!_3.isUndefined(windowConsole) && windowConsole) {
          var args = ["Mixpanel error:"].concat(_3.toArray(arguments));
          try {
            windowConsole.error.apply(windowConsole, args);
          } catch (err) {
            _3.each(args, function(arg) {
              windowConsole.error(arg);
            });
          }
        }
      }
    };
    var log_func_with_prefix = function(func, prefix) {
      return function() {
        arguments[0] = "[" + prefix + "] " + arguments[0];
        return func.apply(console2, arguments);
      };
    };
    var console_with_prefix = function(prefix) {
      return {
        log: log_func_with_prefix(console2.log, prefix),
        error: log_func_with_prefix(console2.error, prefix),
        critical: log_func_with_prefix(console2.critical, prefix)
      };
    };
    _3.bind = function(func, context) {
      var args, bound;
      if (nativeBind && func.bind === nativeBind) {
        return nativeBind.apply(func, slice3.call(arguments, 1));
      }
      if (!_3.isFunction(func)) {
        throw new TypeError();
      }
      args = slice3.call(arguments, 2);
      bound = function() {
        if (!(this instanceof bound)) {
          return func.apply(context, args.concat(slice3.call(arguments)));
        }
        var ctor = {};
        ctor.prototype = func.prototype;
        var self = new ctor();
        ctor.prototype = null;
        var result = func.apply(self, args.concat(slice3.call(arguments)));
        if (Object(result) === result) {
          return result;
        }
        return self;
      };
      return bound;
    };
    _3.each = function(obj, iterator, context) {
      if (obj === null || obj === void 0) {
        return;
      }
      if (nativeForEach && obj.forEach === nativeForEach) {
        obj.forEach(iterator, context);
      } else if (obj.length === +obj.length) {
        for (var i3 = 0, l3 = obj.length; i3 < l3; i3++) {
          if (i3 in obj && iterator.call(context, obj[i3], i3, obj) === breaker) {
            return;
          }
        }
      } else {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            if (iterator.call(context, obj[key], key, obj) === breaker) {
              return;
            }
          }
        }
      }
    };
    _3.extend = function(obj) {
      _3.each(slice3.call(arguments, 1), function(source) {
        for (var prop3 in source) {
          if (source[prop3] !== void 0) {
            obj[prop3] = source[prop3];
          }
        }
      });
      return obj;
    };
    _3.isArray = nativeIsArray || function(obj) {
      return toString4.call(obj) === "[object Array]";
    };
    _3.isFunction = function(f3) {
      try {
        return /^\s*\bfunction\b/.test(f3);
      } catch (x2) {
        return false;
      }
    };
    _3.isArguments = function(obj) {
      return !!(obj && hasOwnProperty.call(obj, "callee"));
    };
    _3.toArray = function(iterable) {
      if (!iterable) {
        return [];
      }
      if (iterable.toArray) {
        return iterable.toArray();
      }
      if (_3.isArray(iterable)) {
        return slice3.call(iterable);
      }
      if (_3.isArguments(iterable)) {
        return slice3.call(iterable);
      }
      return _3.values(iterable);
    };
    _3.map = function(arr, callback, context) {
      if (nativeMap && arr.map === nativeMap) {
        return arr.map(callback, context);
      } else {
        var results = [];
        _3.each(arr, function(item) {
          results.push(callback.call(context, item));
        });
        return results;
      }
    };
    _3.keys = function(obj) {
      var results = [];
      if (obj === null) {
        return results;
      }
      _3.each(obj, function(value, key) {
        results[results.length] = key;
      });
      return results;
    };
    _3.values = function(obj) {
      var results = [];
      if (obj === null) {
        return results;
      }
      _3.each(obj, function(value) {
        results[results.length] = value;
      });
      return results;
    };
    _3.include = function(obj, target) {
      var found = false;
      if (obj === null) {
        return found;
      }
      if (nativeIndexOf && obj.indexOf === nativeIndexOf) {
        return obj.indexOf(target) != -1;
      }
      _3.each(obj, function(value) {
        if (found || (found = value === target)) {
          return breaker;
        }
      });
      return found;
    };
    _3.includes = function(str, needle) {
      return str.indexOf(needle) !== -1;
    };
    _3.inherit = function(subclass, superclass) {
      subclass.prototype = new superclass();
      subclass.prototype.constructor = subclass;
      subclass.superclass = superclass.prototype;
      return subclass;
    };
    _3.isObject = function(obj) {
      return obj === Object(obj) && !_3.isArray(obj);
    };
    _3.isEmptyObject = function(obj) {
      if (_3.isObject(obj)) {
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            return false;
          }
        }
        return true;
      }
      return false;
    };
    _3.isUndefined = function(obj) {
      return obj === void 0;
    };
    _3.isString = function(obj) {
      return toString4.call(obj) == "[object String]";
    };
    _3.isDate = function(obj) {
      return toString4.call(obj) == "[object Date]";
    };
    _3.isNumber = function(obj) {
      return toString4.call(obj) == "[object Number]";
    };
    _3.isElement = function(obj) {
      return !!(obj && obj.nodeType === 1);
    };
    _3.encodeDates = function(obj) {
      _3.each(obj, function(v2, k2) {
        if (_3.isDate(v2)) {
          obj[k2] = _3.formatDate(v2);
        } else if (_3.isObject(v2)) {
          obj[k2] = _3.encodeDates(v2);
        }
      });
      return obj;
    };
    _3.timestamp = function() {
      Date.now = Date.now || function() {
        return +new Date();
      };
      return Date.now();
    };
    _3.formatDate = function(d3) {
      function pad3(n3) {
        return n3 < 10 ? "0" + n3 : n3;
      }
      return d3.getUTCFullYear() + "-" + pad3(d3.getUTCMonth() + 1) + "-" + pad3(d3.getUTCDate()) + "T" + pad3(d3.getUTCHours()) + ":" + pad3(d3.getUTCMinutes()) + ":" + pad3(d3.getUTCSeconds());
    };
    _3.strip_empty_properties = function(p3) {
      var ret = {};
      _3.each(p3, function(v2, k2) {
        if (_3.isString(v2) && v2.length > 0) {
          ret[k2] = v2;
        }
      });
      return ret;
    };
    _3.truncate = function(obj, length3) {
      var ret;
      if (typeof obj === "string") {
        ret = obj.slice(0, length3);
      } else if (_3.isArray(obj)) {
        ret = [];
        _3.each(obj, function(val) {
          ret.push(_3.truncate(val, length3));
        });
      } else if (_3.isObject(obj)) {
        ret = {};
        _3.each(obj, function(val, key) {
          ret[key] = _3.truncate(val, length3);
        });
      } else {
        ret = obj;
      }
      return ret;
    };
    _3.JSONEncode = function() {
      return function(mixed_val) {
        var value = mixed_val;
        var quote = function(string) {
          var escapable = /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
          var meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
          };
          escapable.lastIndex = 0;
          return escapable.test(string) ? '"' + string.replace(escapable, function(a3) {
            var c3 = meta[a3];
            return typeof c3 === "string" ? c3 : "\\u" + ("0000" + a3.charCodeAt(0).toString(16)).slice(-4);
          }) + '"' : '"' + string + '"';
        };
        var str = function(key, holder) {
          var gap = "";
          var indent = "    ";
          var i3 = 0;
          var k2 = "";
          var v2 = "";
          var length3 = 0;
          var mind = gap;
          var partial = [];
          var value2 = holder[key];
          if (value2 && typeof value2 === "object" && typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key);
          }
          switch (typeof value2) {
            case "string":
              return quote(value2);
            case "number":
              return isFinite(value2) ? String(value2) : "null";
            case "boolean":
            case "null":
              return String(value2);
            case "object":
              if (!value2) {
                return "null";
              }
              gap += indent;
              partial = [];
              if (toString4.apply(value2) === "[object Array]") {
                length3 = value2.length;
                for (i3 = 0; i3 < length3; i3 += 1) {
                  partial[i3] = str(i3, value2) || "null";
                }
                v2 = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v2;
              }
              for (k2 in value2) {
                if (hasOwnProperty.call(value2, k2)) {
                  v2 = str(k2, value2);
                  if (v2) {
                    partial.push(quote(k2) + (gap ? ": " : ":") + v2);
                  }
                }
              }
              v2 = partial.length === 0 ? "{}" : gap ? "{" + partial.join(",") + "" + mind + "}" : "{" + partial.join(",") + "}";
              gap = mind;
              return v2;
          }
        };
        return str("", {
          "": value
        });
      };
    }();
    _3.JSONDecode = function() {
      var at, ch, escapee = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "	"
      }, text, error = function(m2) {
        var e3 = new SyntaxError(m2);
        e3.at = at;
        e3.text = text;
        throw e3;
      }, next = function(c3) {
        if (c3 && c3 !== ch) {
          error("Expected '" + c3 + "' instead of '" + ch + "'");
        }
        ch = text.charAt(at);
        at += 1;
        return ch;
      }, number = function() {
        var number2, string2 = "";
        if (ch === "-") {
          string2 = "-";
          next("-");
        }
        while (ch >= "0" && ch <= "9") {
          string2 += ch;
          next();
        }
        if (ch === ".") {
          string2 += ".";
          while (next() && ch >= "0" && ch <= "9") {
            string2 += ch;
          }
        }
        if (ch === "e" || ch === "E") {
          string2 += ch;
          next();
          if (ch === "-" || ch === "+") {
            string2 += ch;
            next();
          }
          while (ch >= "0" && ch <= "9") {
            string2 += ch;
            next();
          }
        }
        number2 = +string2;
        if (!isFinite(number2)) {
          error("Bad number");
        } else {
          return number2;
        }
      }, string = function() {
        var hex, i3, string2 = "", uffff;
        if (ch === '"') {
          while (next()) {
            if (ch === '"') {
              next();
              return string2;
            }
            if (ch === "\\") {
              next();
              if (ch === "u") {
                uffff = 0;
                for (i3 = 0; i3 < 4; i3 += 1) {
                  hex = parseInt(next(), 16);
                  if (!isFinite(hex)) {
                    break;
                  }
                  uffff = uffff * 16 + hex;
                }
                string2 += String.fromCharCode(uffff);
              } else if (typeof escapee[ch] === "string") {
                string2 += escapee[ch];
              } else {
                break;
              }
            } else {
              string2 += ch;
            }
          }
        }
        error("Bad string");
      }, white = function() {
        while (ch && ch <= " ") {
          next();
        }
      }, word = function() {
        switch (ch) {
          case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
          case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
          case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
        }
        error('Unexpected "' + ch + '"');
      }, value, array = function() {
        var array2 = [];
        if (ch === "[") {
          next("[");
          white();
          if (ch === "]") {
            next("]");
            return array2;
          }
          while (ch) {
            array2.push(value());
            white();
            if (ch === "]") {
              next("]");
              return array2;
            }
            next(",");
            white();
          }
        }
        error("Bad array");
      }, object = function() {
        var key, object2 = {};
        if (ch === "{") {
          next("{");
          white();
          if (ch === "}") {
            next("}");
            return object2;
          }
          while (ch) {
            key = string();
            white();
            next(":");
            if (Object.hasOwnProperty.call(object2, key)) {
              error('Duplicate key "' + key + '"');
            }
            object2[key] = value();
            white();
            if (ch === "}") {
              next("}");
              return object2;
            }
            next(",");
            white();
          }
        }
        error("Bad object");
      };
      value = function() {
        white();
        switch (ch) {
          case "{":
            return object();
          case "[":
            return array();
          case '"':
            return string();
          case "-":
            return number();
          default:
            return ch >= "0" && ch <= "9" ? number() : word();
        }
      };
      return function(source) {
        var result;
        text = source;
        at = 0;
        ch = " ";
        result = value();
        white();
        if (ch) {
          error("Syntax error");
        }
        return result;
      };
    }();
    _3.base64Encode = function(data) {
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var o1, o22, o3, h1, h22, h3, h4, bits, i3 = 0, ac = 0, enc = "", tmp_arr = [];
      if (!data) {
        return data;
      }
      data = _3.utf8Encode(data);
      do {
        o1 = data.charCodeAt(i3++);
        o22 = data.charCodeAt(i3++);
        o3 = data.charCodeAt(i3++);
        bits = o1 << 16 | o22 << 8 | o3;
        h1 = bits >> 18 & 63;
        h22 = bits >> 12 & 63;
        h3 = bits >> 6 & 63;
        h4 = bits & 63;
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h22) + b64.charAt(h3) + b64.charAt(h4);
      } while (i3 < data.length);
      enc = tmp_arr.join("");
      switch (data.length % 3) {
        case 1:
          enc = enc.slice(0, -2) + "==";
          break;
        case 2:
          enc = enc.slice(0, -1) + "=";
          break;
      }
      return enc;
    };
    _3.utf8Encode = function(string) {
      string = (string + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      var utftext = "", start, end;
      var stringl = 0, n3;
      start = end = 0;
      stringl = string.length;
      for (n3 = 0; n3 < stringl; n3++) {
        var c1 = string.charCodeAt(n3);
        var enc = null;
        if (c1 < 128) {
          end++;
        } else if (c1 > 127 && c1 < 2048) {
          enc = String.fromCharCode(c1 >> 6 | 192, c1 & 63 | 128);
        } else {
          enc = String.fromCharCode(c1 >> 12 | 224, c1 >> 6 & 63 | 128, c1 & 63 | 128);
        }
        if (enc !== null) {
          if (end > start) {
            utftext += string.substring(start, end);
          }
          utftext += enc;
          start = end = n3 + 1;
        }
      }
      if (end > start) {
        utftext += string.substring(start, string.length);
      }
      return utftext;
    };
    _3.UUID = function() {
      var T = function() {
        var d3 = 1 * new Date(), i3 = 0;
        while (d3 == 1 * new Date()) {
          i3++;
        }
        return d3.toString(16) + i3.toString(16);
      };
      var R7 = function() {
        return Math.random().toString(16).replace(".", "");
      };
      var UA = function() {
        var ua = userAgent, i3, ch, buffer = [], ret = 0;
        function xor(result, byte_array) {
          var j2, tmp = 0;
          for (j2 = 0; j2 < byte_array.length; j2++) {
            tmp |= buffer[j2] << j2 * 8;
          }
          return result ^ tmp;
        }
        for (i3 = 0; i3 < ua.length; i3++) {
          ch = ua.charCodeAt(i3);
          buffer.unshift(ch & 255);
          if (buffer.length >= 4) {
            ret = xor(ret, buffer);
            buffer = [];
          }
        }
        if (buffer.length > 0) {
          ret = xor(ret, buffer);
        }
        return ret.toString(16);
      };
      return function() {
        var se = (screen.height * screen.width).toString(16);
        return T() + "-" + R7() + "-" + UA() + "-" + se + "-" + T();
      };
    }();
    var BLOCKED_UA_STRS = [
      "ahrefsbot",
      "baiduspider",
      "bingbot",
      "bingpreview",
      "facebookexternal",
      "petalbot",
      "pinterest",
      "screaming frog",
      "yahoo! slurp",
      "yandexbot",
      "adsbot-google",
      "apis-google",
      "duplexweb-google",
      "feedfetcher-google",
      "google favicon",
      "google web preview",
      "google-read-aloud",
      "googlebot",
      "googleweblight",
      "mediapartners-google",
      "storebot-google"
    ];
    _3.isBlockedUA = function(ua) {
      var i3;
      ua = ua.toLowerCase();
      for (i3 = 0; i3 < BLOCKED_UA_STRS.length; i3++) {
        if (ua.indexOf(BLOCKED_UA_STRS[i3]) !== -1) {
          return true;
        }
      }
      return false;
    };
    _3.HTTPBuildQuery = function(formdata, arg_separator) {
      var use_val, use_key, tmp_arr = [];
      if (_3.isUndefined(arg_separator)) {
        arg_separator = "&";
      }
      _3.each(formdata, function(val, key) {
        use_val = encodeURIComponent(val.toString());
        use_key = encodeURIComponent(key);
        tmp_arr[tmp_arr.length] = use_key + "=" + use_val;
      });
      return tmp_arr.join(arg_separator);
    };
    _3.getQueryParam = function(url, param) {
      param = param.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      var regexS = "[\\?&]" + param + "=([^&#]*)", regex = new RegExp(regexS), results = regex.exec(url);
      if (results === null || results && typeof results[1] !== "string" && results[1].length) {
        return "";
      } else {
        var result = results[1];
        try {
          result = decodeURIComponent(result);
        } catch (err) {
          console2.error("Skipping decoding for malformed query param: " + result);
        }
        return result.replace(/\+/g, " ");
      }
    };
    _3.cookie = {
      get: function(name) {
        var nameEQ = name + "=";
        var ca = document$1.cookie.split(";");
        for (var i3 = 0; i3 < ca.length; i3++) {
          var c3 = ca[i3];
          while (c3.charAt(0) == " ") {
            c3 = c3.substring(1, c3.length);
          }
          if (c3.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c3.substring(nameEQ.length, c3.length));
          }
        }
        return null;
      },
      parse: function(name) {
        var cookie;
        try {
          cookie = _3.JSONDecode(_3.cookie.get(name)) || {};
        } catch (err) {
        }
        return cookie;
      },
      set_seconds: function(name, value, seconds, is_cross_subdomain, is_secure, is_cross_site, domain_override) {
        var cdomain = "", expires = "", secure = "";
        if (domain_override) {
          cdomain = "; domain=" + domain_override;
        } else if (is_cross_subdomain) {
          var domain = extract_domain(document$1.location.hostname);
          cdomain = domain ? "; domain=." + domain : "";
        }
        if (seconds) {
          var date = new Date();
          date.setTime(date.getTime() + seconds * 1e3);
          expires = "; expires=" + date.toGMTString();
        }
        if (is_cross_site) {
          is_secure = true;
          secure = "; SameSite=None";
        }
        if (is_secure) {
          secure += "; secure";
        }
        document$1.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure;
      },
      set: function(name, value, days, is_cross_subdomain, is_secure, is_cross_site, domain_override) {
        var cdomain = "", expires = "", secure = "";
        if (domain_override) {
          cdomain = "; domain=" + domain_override;
        } else if (is_cross_subdomain) {
          var domain = extract_domain(document$1.location.hostname);
          cdomain = domain ? "; domain=." + domain : "";
        }
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
          expires = "; expires=" + date.toGMTString();
        }
        if (is_cross_site) {
          is_secure = true;
          secure = "; SameSite=None";
        }
        if (is_secure) {
          secure += "; secure";
        }
        var new_cookie_val = name + "=" + encodeURIComponent(value) + expires + "; path=/" + cdomain + secure;
        document$1.cookie = new_cookie_val;
        return new_cookie_val;
      },
      remove: function(name, is_cross_subdomain, domain_override) {
        _3.cookie.set(name, "", -1, is_cross_subdomain, false, false, domain_override);
      }
    };
    var _localStorageSupported = null;
    var localStorageSupported = function(storage, forceCheck) {
      if (_localStorageSupported !== null && !forceCheck) {
        return _localStorageSupported;
      }
      var supported = true;
      try {
        storage = storage || window.localStorage;
        var key = "__mplss_" + cheap_guid(8), val = "xyz";
        storage.setItem(key, val);
        if (storage.getItem(key) !== val) {
          supported = false;
        }
        storage.removeItem(key);
      } catch (err) {
        supported = false;
      }
      _localStorageSupported = supported;
      return supported;
    };
    _3.localStorage = {
      is_supported: function(force_check) {
        var supported = localStorageSupported(null, force_check);
        if (!supported) {
          console2.error("localStorage unsupported; falling back to cookie store");
        }
        return supported;
      },
      error: function(msg) {
        console2.error("localStorage error: " + msg);
      },
      get: function(name) {
        try {
          return window.localStorage.getItem(name);
        } catch (err) {
          _3.localStorage.error(err);
        }
        return null;
      },
      parse: function(name) {
        try {
          return _3.JSONDecode(_3.localStorage.get(name)) || {};
        } catch (err) {
        }
        return null;
      },
      set: function(name, value) {
        try {
          window.localStorage.setItem(name, value);
        } catch (err) {
          _3.localStorage.error(err);
        }
      },
      remove: function(name) {
        try {
          window.localStorage.removeItem(name);
        } catch (err) {
          _3.localStorage.error(err);
        }
      }
    };
    _3.register_event = function() {
      var register_event = function(element, type3, handler, oldSchool, useCapture) {
        if (!element) {
          console2.error("No valid element provided to register_event");
          return;
        }
        if (element.addEventListener && !oldSchool) {
          element.addEventListener(type3, handler, !!useCapture);
        } else {
          var ontype = "on" + type3;
          var old_handler = element[ontype];
          element[ontype] = makeHandler(element, handler, old_handler);
        }
      };
      function makeHandler(element, new_handler, old_handlers) {
        var handler = function(event) {
          event = event || fixEvent(window.event);
          if (!event) {
            return void 0;
          }
          var ret = true;
          var old_result, new_result;
          if (_3.isFunction(old_handlers)) {
            old_result = old_handlers(event);
          }
          new_result = new_handler.call(element, event);
          if (old_result === false || new_result === false) {
            ret = false;
          }
          return ret;
        };
        return handler;
      }
      function fixEvent(event) {
        if (event) {
          event.preventDefault = fixEvent.preventDefault;
          event.stopPropagation = fixEvent.stopPropagation;
        }
        return event;
      }
      fixEvent.preventDefault = function() {
        this.returnValue = false;
      };
      fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
      };
      return register_event;
    }();
    var TOKEN_MATCH_REGEX = new RegExp('^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$');
    _3.dom_query = function() {
      function getAllChildren(e3) {
        return e3.all ? e3.all : e3.getElementsByTagName("*");
      }
      var bad_whitespace = /[\t\r\n]/g;
      function hasClass(elem, selector) {
        var className = " " + selector + " ";
        return (" " + elem.className + " ").replace(bad_whitespace, " ").indexOf(className) >= 0;
      }
      function getElementsBySelector(selector) {
        if (!document$1.getElementsByTagName) {
          return [];
        }
        var tokens = selector.split(" ");
        var token, bits, tagName, found, foundCount, i3, j2, k2, elements, currentContextIndex;
        var currentContext = [document$1];
        for (i3 = 0; i3 < tokens.length; i3++) {
          token = tokens[i3].replace(/^\s+/, "").replace(/\s+$/, "");
          if (token.indexOf("#") > -1) {
            bits = token.split("#");
            tagName = bits[0];
            var id = bits[1];
            var element = document$1.getElementById(id);
            if (!element || tagName && element.nodeName.toLowerCase() != tagName) {
              return [];
            }
            currentContext = [element];
            continue;
          }
          if (token.indexOf(".") > -1) {
            bits = token.split(".");
            tagName = bits[0];
            var className = bits[1];
            if (!tagName) {
              tagName = "*";
            }
            found = [];
            foundCount = 0;
            for (j2 = 0; j2 < currentContext.length; j2++) {
              if (tagName == "*") {
                elements = getAllChildren(currentContext[j2]);
              } else {
                elements = currentContext[j2].getElementsByTagName(tagName);
              }
              for (k2 = 0; k2 < elements.length; k2++) {
                found[foundCount++] = elements[k2];
              }
            }
            currentContext = [];
            currentContextIndex = 0;
            for (j2 = 0; j2 < found.length; j2++) {
              if (found[j2].className && _3.isString(found[j2].className) && hasClass(found[j2], className)) {
                currentContext[currentContextIndex++] = found[j2];
              }
            }
            continue;
          }
          var token_match = token.match(TOKEN_MATCH_REGEX);
          if (token_match) {
            tagName = token_match[1];
            var attrName = token_match[2];
            var attrOperator = token_match[3];
            var attrValue = token_match[4];
            if (!tagName) {
              tagName = "*";
            }
            found = [];
            foundCount = 0;
            for (j2 = 0; j2 < currentContext.length; j2++) {
              if (tagName == "*") {
                elements = getAllChildren(currentContext[j2]);
              } else {
                elements = currentContext[j2].getElementsByTagName(tagName);
              }
              for (k2 = 0; k2 < elements.length; k2++) {
                found[foundCount++] = elements[k2];
              }
            }
            currentContext = [];
            currentContextIndex = 0;
            var checkFunction;
            switch (attrOperator) {
              case "=":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName) == attrValue;
                };
                break;
              case "~":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName).match(new RegExp("\\b" + attrValue + "\\b"));
                };
                break;
              case "|":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName).match(new RegExp("^" + attrValue + "-?"));
                };
                break;
              case "^":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName).indexOf(attrValue) === 0;
                };
                break;
              case "$":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName).lastIndexOf(attrValue) == e3.getAttribute(attrName).length - attrValue.length;
                };
                break;
              case "*":
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName).indexOf(attrValue) > -1;
                };
                break;
              default:
                checkFunction = function(e3) {
                  return e3.getAttribute(attrName);
                };
            }
            currentContext = [];
            currentContextIndex = 0;
            for (j2 = 0; j2 < found.length; j2++) {
              if (checkFunction(found[j2])) {
                currentContext[currentContextIndex++] = found[j2];
              }
            }
            continue;
          }
          tagName = token;
          found = [];
          foundCount = 0;
          for (j2 = 0; j2 < currentContext.length; j2++) {
            elements = currentContext[j2].getElementsByTagName(tagName);
            for (k2 = 0; k2 < elements.length; k2++) {
              found[foundCount++] = elements[k2];
            }
          }
          currentContext = found;
        }
        return currentContext;
      }
      return function(query) {
        if (_3.isElement(query)) {
          return [query];
        } else if (_3.isObject(query) && !_3.isUndefined(query.length)) {
          return query;
        } else {
          return getElementsBySelector.call(this, query);
        }
      };
    }();
    _3.info = {
      campaignParams: function() {
        var campaign_keywords = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "), kw = "", params = {};
        _3.each(campaign_keywords, function(kwkey) {
          kw = _3.getQueryParam(document$1.URL, kwkey);
          if (kw.length) {
            params[kwkey] = kw;
          }
        });
        return params;
      },
      searchEngine: function(referrer) {
        if (referrer.search("https?://(.*)google.([^/?]*)") === 0) {
          return "google";
        } else if (referrer.search("https?://(.*)bing.com") === 0) {
          return "bing";
        } else if (referrer.search("https?://(.*)yahoo.com") === 0) {
          return "yahoo";
        } else if (referrer.search("https?://(.*)duckduckgo.com") === 0) {
          return "duckduckgo";
        } else {
          return null;
        }
      },
      searchInfo: function(referrer) {
        var search = _3.info.searchEngine(referrer), param = search != "yahoo" ? "q" : "p", ret = {};
        if (search !== null) {
          ret["$search_engine"] = search;
          var keyword = _3.getQueryParam(referrer, param);
          if (keyword.length) {
            ret["mp_keyword"] = keyword;
          }
        }
        return ret;
      },
      browser: function(user_agent, vendor, opera) {
        vendor = vendor || "";
        if (opera || _3.includes(user_agent, " OPR/")) {
          if (_3.includes(user_agent, "Mini")) {
            return "Opera Mini";
          }
          return "Opera";
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
          return "BlackBerry";
        } else if (_3.includes(user_agent, "IEMobile") || _3.includes(user_agent, "WPDesktop")) {
          return "Internet Explorer Mobile";
        } else if (_3.includes(user_agent, "SamsungBrowser/")) {
          return "Samsung Internet";
        } else if (_3.includes(user_agent, "Edge") || _3.includes(user_agent, "Edg/")) {
          return "Microsoft Edge";
        } else if (_3.includes(user_agent, "FBIOS")) {
          return "Facebook Mobile";
        } else if (_3.includes(user_agent, "Chrome")) {
          return "Chrome";
        } else if (_3.includes(user_agent, "CriOS")) {
          return "Chrome iOS";
        } else if (_3.includes(user_agent, "UCWEB") || _3.includes(user_agent, "UCBrowser")) {
          return "UC Browser";
        } else if (_3.includes(user_agent, "FxiOS")) {
          return "Firefox iOS";
        } else if (_3.includes(vendor, "Apple")) {
          if (_3.includes(user_agent, "Mobile")) {
            return "Mobile Safari";
          }
          return "Safari";
        } else if (_3.includes(user_agent, "Android")) {
          return "Android Mobile";
        } else if (_3.includes(user_agent, "Konqueror")) {
          return "Konqueror";
        } else if (_3.includes(user_agent, "Firefox")) {
          return "Firefox";
        } else if (_3.includes(user_agent, "MSIE") || _3.includes(user_agent, "Trident/")) {
          return "Internet Explorer";
        } else if (_3.includes(user_agent, "Gecko")) {
          return "Mozilla";
        } else {
          return "";
        }
      },
      browserVersion: function(userAgent2, vendor, opera) {
        var browser = _3.info.browser(userAgent2, vendor, opera);
        var versionRegexs = {
          "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
          "Microsoft Edge": /Edge?\/(\d+(\.\d+)?)/,
          Chrome: /Chrome\/(\d+(\.\d+)?)/,
          "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
          "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
          Safari: /Version\/(\d+(\.\d+)?)/,
          "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
          Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
          Firefox: /Firefox\/(\d+(\.\d+)?)/,
          "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
          Konqueror: /Konqueror:(\d+(\.\d+)?)/,
          BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
          "Android Mobile": /android\s(\d+(\.\d+)?)/,
          "Samsung Internet": /SamsungBrowser\/(\d+(\.\d+)?)/,
          "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
          Mozilla: /rv:(\d+(\.\d+)?)/
        };
        var regex = versionRegexs[browser];
        if (regex === void 0) {
          return null;
        }
        var matches = userAgent2.match(regex);
        if (!matches) {
          return null;
        }
        return parseFloat(matches[matches.length - 2]);
      },
      os: function() {
        var a3 = userAgent;
        if (/Windows/i.test(a3)) {
          if (/Phone/.test(a3) || /WPDesktop/.test(a3)) {
            return "Windows Phone";
          }
          return "Windows";
        } else if (/(iPhone|iPad|iPod)/.test(a3)) {
          return "iOS";
        } else if (/Android/.test(a3)) {
          return "Android";
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(a3)) {
          return "BlackBerry";
        } else if (/Mac/i.test(a3)) {
          return "Mac OS X";
        } else if (/Linux/.test(a3)) {
          return "Linux";
        } else if (/CrOS/.test(a3)) {
          return "Chrome OS";
        } else {
          return "";
        }
      },
      device: function(user_agent) {
        if (/Windows Phone/i.test(user_agent) || /WPDesktop/.test(user_agent)) {
          return "Windows Phone";
        } else if (/iPad/.test(user_agent)) {
          return "iPad";
        } else if (/iPod/.test(user_agent)) {
          return "iPod Touch";
        } else if (/iPhone/.test(user_agent)) {
          return "iPhone";
        } else if (/(BlackBerry|PlayBook|BB10)/i.test(user_agent)) {
          return "BlackBerry";
        } else if (/Android/.test(user_agent)) {
          return "Android";
        } else {
          return "";
        }
      },
      referringDomain: function(referrer) {
        var split2 = referrer.split("/");
        if (split2.length >= 3) {
          return split2[2];
        }
        return "";
      },
      properties: function() {
        return _3.extend(_3.strip_empty_properties({
          $os: _3.info.os(),
          $browser: _3.info.browser(userAgent, navigator2.vendor, windowOpera),
          $referrer: document$1.referrer,
          $referring_domain: _3.info.referringDomain(document$1.referrer),
          $device: _3.info.device(userAgent)
        }), {
          $current_url: window$1.location.href,
          $browser_version: _3.info.browserVersion(userAgent, navigator2.vendor, windowOpera),
          $screen_height: screen.height,
          $screen_width: screen.width,
          mp_lib: "web",
          $lib_version: Config.LIB_VERSION,
          $insert_id: cheap_guid(),
          time: _3.timestamp() / 1e3
        });
      },
      people_properties: function() {
        return _3.extend(_3.strip_empty_properties({
          $os: _3.info.os(),
          $browser: _3.info.browser(userAgent, navigator2.vendor, windowOpera)
        }), {
          $browser_version: _3.info.browserVersion(userAgent, navigator2.vendor, windowOpera)
        });
      },
      pageviewInfo: function(page) {
        return _3.strip_empty_properties({
          mp_page: page,
          mp_referrer: document$1.referrer,
          mp_browser: _3.info.browser(userAgent, navigator2.vendor, windowOpera),
          mp_platform: _3.info.os()
        });
      }
    };
    var cheap_guid = function(maxlen) {
      var guid = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
      return maxlen ? guid.substring(0, maxlen) : guid;
    };
    var SIMPLE_DOMAIN_MATCH_REGEX = /[a-z0-9][a-z0-9-]*\.[a-z]+$/i;
    var DOMAIN_MATCH_REGEX = /[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i;
    var extract_domain = function(hostname) {
      var domain_regex = DOMAIN_MATCH_REGEX;
      var parts = hostname.split(".");
      var tld = parts[parts.length - 1];
      if (tld.length > 4 || tld === "com" || tld === "org") {
        domain_regex = SIMPLE_DOMAIN_MATCH_REGEX;
      }
      var matches = hostname.match(domain_regex);
      return matches ? matches[0] : "";
    };
    var JSONStringify = null;
    var JSONParse = null;
    if (typeof JSON !== "undefined") {
      JSONStringify = JSON.stringify;
      JSONParse = JSON.parse;
    }
    JSONStringify = JSONStringify || _3.JSONEncode;
    JSONParse = JSONParse || _3.JSONDecode;
    _3["toArray"] = _3.toArray;
    _3["isObject"] = _3.isObject;
    _3["JSONEncode"] = _3.JSONEncode;
    _3["JSONDecode"] = _3.JSONDecode;
    _3["isBlockedUA"] = _3.isBlockedUA;
    _3["isEmptyObject"] = _3.isEmptyObject;
    _3["info"] = _3.info;
    _3["info"]["device"] = _3.info.device;
    _3["info"]["browser"] = _3.info.browser;
    _3["info"]["browserVersion"] = _3.info.browserVersion;
    _3["info"]["properties"] = _3.info.properties;
    var DomTracker = function() {
    };
    DomTracker.prototype.create_properties = function() {
    };
    DomTracker.prototype.event_handler = function() {
    };
    DomTracker.prototype.after_track_handler = function() {
    };
    DomTracker.prototype.init = function(mixpanel_instance) {
      this.mp = mixpanel_instance;
      return this;
    };
    DomTracker.prototype.track = function(query, event_name, properties, user_callback) {
      var that = this;
      var elements = _3.dom_query(query);
      if (elements.length === 0) {
        console2.error("The DOM query (" + query + ") returned 0 elements");
        return;
      }
      _3.each(elements, function(element) {
        _3.register_event(element, this.override_event, function(e3) {
          var options = {};
          var props = that.create_properties(properties, this);
          var timeout = that.mp.get_config("track_links_timeout");
          that.event_handler(e3, this, options);
          window.setTimeout(that.track_callback(user_callback, props, options, true), timeout);
          that.mp.track(event_name, props, that.track_callback(user_callback, props, options));
        });
      }, this);
      return true;
    };
    DomTracker.prototype.track_callback = function(user_callback, props, options, timeout_occured) {
      timeout_occured = timeout_occured || false;
      var that = this;
      return function() {
        if (options.callback_fired) {
          return;
        }
        options.callback_fired = true;
        if (user_callback && user_callback(timeout_occured, props) === false) {
          return;
        }
        that.after_track_handler(props, options, timeout_occured);
      };
    };
    DomTracker.prototype.create_properties = function(properties, element) {
      var props;
      if (typeof properties === "function") {
        props = properties(element);
      } else {
        props = _3.extend({}, properties);
      }
      return props;
    };
    var LinkTracker = function() {
      this.override_event = "click";
    };
    _3.inherit(LinkTracker, DomTracker);
    LinkTracker.prototype.create_properties = function(properties, element) {
      var props = LinkTracker.superclass.create_properties.apply(this, arguments);
      if (element.href) {
        props["url"] = element.href;
      }
      return props;
    };
    LinkTracker.prototype.event_handler = function(evt, element, options) {
      options.new_tab = evt.which === 2 || evt.metaKey || evt.ctrlKey || element.target === "_blank";
      options.href = element.href;
      if (!options.new_tab) {
        evt.preventDefault();
      }
    };
    LinkTracker.prototype.after_track_handler = function(props, options) {
      if (options.new_tab) {
        return;
      }
      setTimeout(function() {
        window.location = options.href;
      }, 0);
    };
    var FormTracker = function() {
      this.override_event = "submit";
    };
    _3.inherit(FormTracker, DomTracker);
    FormTracker.prototype.event_handler = function(evt, element, options) {
      options.element = element;
      evt.preventDefault();
    };
    FormTracker.prototype.after_track_handler = function(props, options) {
      setTimeout(function() {
        options.element.submit();
      }, 0);
    };
    var logger$2 = console_with_prefix("lock");
    var SharedLock = function(key, options) {
      options = options || {};
      this.storageKey = key;
      this.storage = options.storage || window.localStorage;
      this.pollIntervalMS = options.pollIntervalMS || 100;
      this.timeoutMS = options.timeoutMS || 2e3;
    };
    SharedLock.prototype.withLock = function(lockedCB, errorCB, pid) {
      if (!pid && typeof errorCB !== "function") {
        pid = errorCB;
        errorCB = null;
      }
      var i3 = pid || new Date().getTime() + "|" + Math.random();
      var startTime = new Date().getTime();
      var key = this.storageKey;
      var pollIntervalMS = this.pollIntervalMS;
      var timeoutMS = this.timeoutMS;
      var storage = this.storage;
      var keyX = key + ":X";
      var keyY = key + ":Y";
      var keyZ = key + ":Z";
      var reportError = function(err) {
        errorCB && errorCB(err);
      };
      var delay = function(cb) {
        if (new Date().getTime() - startTime > timeoutMS) {
          logger$2.error("Timeout waiting for mutex on " + key + "; clearing lock. [" + i3 + "]");
          storage.removeItem(keyZ);
          storage.removeItem(keyY);
          loop();
          return;
        }
        setTimeout(function() {
          try {
            cb();
          } catch (err) {
            reportError(err);
          }
        }, pollIntervalMS * (Math.random() + 0.1));
      };
      var waitFor = function(predicate, cb) {
        if (predicate()) {
          cb();
        } else {
          delay(function() {
            waitFor(predicate, cb);
          });
        }
      };
      var getSetY = function() {
        var valY = storage.getItem(keyY);
        if (valY && valY !== i3) {
          return false;
        } else {
          storage.setItem(keyY, i3);
          if (storage.getItem(keyY) === i3) {
            return true;
          } else {
            if (!localStorageSupported(storage, true)) {
              throw new Error("localStorage support dropped while acquiring lock");
            }
            return false;
          }
        }
      };
      var loop = function() {
        storage.setItem(keyX, i3);
        waitFor(getSetY, function() {
          if (storage.getItem(keyX) === i3) {
            criticalSection();
            return;
          }
          delay(function() {
            if (storage.getItem(keyY) !== i3) {
              loop();
              return;
            }
            waitFor(function() {
              return !storage.getItem(keyZ);
            }, criticalSection);
          });
        });
      };
      var criticalSection = function() {
        storage.setItem(keyZ, "1");
        try {
          lockedCB();
        } finally {
          storage.removeItem(keyZ);
          if (storage.getItem(keyY) === i3) {
            storage.removeItem(keyY);
          }
          if (storage.getItem(keyX) === i3) {
            storage.removeItem(keyX);
          }
        }
      };
      try {
        if (localStorageSupported(storage, true)) {
          loop();
        } else {
          throw new Error("localStorage support check failed");
        }
      } catch (err) {
        reportError(err);
      }
    };
    var logger$1 = console_with_prefix("batch");
    var RequestQueue = function(storageKey, options) {
      options = options || {};
      this.storageKey = storageKey;
      this.storage = options.storage || window.localStorage;
      this.reportError = options.errorReporter || _3.bind(logger$1.error, logger$1);
      this.lock = new SharedLock(storageKey, {storage: this.storage});
      this.pid = options.pid || null;
      this.memQueue = [];
    };
    RequestQueue.prototype.enqueue = function(item, flushInterval, cb) {
      var queueEntry = {
        id: cheap_guid(),
        flushAfter: new Date().getTime() + flushInterval * 2,
        payload: item
      };
      this.lock.withLock(_3.bind(function lockAcquired() {
        var succeeded;
        try {
          var storedQueue = this.readFromStorage();
          storedQueue.push(queueEntry);
          succeeded = this.saveToStorage(storedQueue);
          if (succeeded) {
            this.memQueue.push(queueEntry);
          }
        } catch (err) {
          this.reportError("Error enqueueing item", item);
          succeeded = false;
        }
        if (cb) {
          cb(succeeded);
        }
      }, this), _3.bind(function lockFailure(err) {
        this.reportError("Error acquiring storage lock", err);
        if (cb) {
          cb(false);
        }
      }, this), this.pid);
    };
    RequestQueue.prototype.fillBatch = function(batchSize) {
      var batch2 = this.memQueue.slice(0, batchSize);
      if (batch2.length < batchSize) {
        var storedQueue = this.readFromStorage();
        if (storedQueue.length) {
          var idsInBatch = {};
          _3.each(batch2, function(item2) {
            idsInBatch[item2["id"]] = true;
          });
          for (var i3 = 0; i3 < storedQueue.length; i3++) {
            var item = storedQueue[i3];
            if (new Date().getTime() > item["flushAfter"] && !idsInBatch[item["id"]]) {
              item.orphaned = true;
              batch2.push(item);
              if (batch2.length >= batchSize) {
                break;
              }
            }
          }
        }
      }
      return batch2;
    };
    var filterOutIDsAndInvalid = function(items, idSet) {
      var filteredItems = [];
      _3.each(items, function(item) {
        if (item["id"] && !idSet[item["id"]]) {
          filteredItems.push(item);
        }
      });
      return filteredItems;
    };
    RequestQueue.prototype.removeItemsByID = function(ids, cb) {
      var idSet = {};
      _3.each(ids, function(id) {
        idSet[id] = true;
      });
      this.memQueue = filterOutIDsAndInvalid(this.memQueue, idSet);
      var removeFromStorage = _3.bind(function() {
        var succeeded;
        try {
          var storedQueue = this.readFromStorage();
          storedQueue = filterOutIDsAndInvalid(storedQueue, idSet);
          succeeded = this.saveToStorage(storedQueue);
          if (succeeded) {
            storedQueue = this.readFromStorage();
            for (var i3 = 0; i3 < storedQueue.length; i3++) {
              var item = storedQueue[i3];
              if (item["id"] && !!idSet[item["id"]]) {
                this.reportError("Item not removed from storage");
                return false;
              }
            }
          }
        } catch (err) {
          this.reportError("Error removing items", ids);
          succeeded = false;
        }
        return succeeded;
      }, this);
      this.lock.withLock(function lockAcquired() {
        var succeeded = removeFromStorage();
        if (cb) {
          cb(succeeded);
        }
      }, _3.bind(function lockFailure(err) {
        var succeeded = false;
        this.reportError("Error acquiring storage lock", err);
        if (!localStorageSupported(this.storage, true)) {
          succeeded = removeFromStorage();
          if (!succeeded) {
            try {
              this.storage.removeItem(this.storageKey);
            } catch (err2) {
              this.reportError("Error clearing queue", err2);
            }
          }
        }
        if (cb) {
          cb(succeeded);
        }
      }, this), this.pid);
    };
    var updatePayloads = function(existingItems, itemsToUpdate) {
      var newItems = [];
      _3.each(existingItems, function(item) {
        var id = item["id"];
        if (id in itemsToUpdate) {
          var newPayload = itemsToUpdate[id];
          if (newPayload !== null) {
            item["payload"] = newPayload;
            newItems.push(item);
          }
        } else {
          newItems.push(item);
        }
      });
      return newItems;
    };
    RequestQueue.prototype.updatePayloads = function(itemsToUpdate, cb) {
      this.memQueue = updatePayloads(this.memQueue, itemsToUpdate);
      this.lock.withLock(_3.bind(function lockAcquired() {
        var succeeded;
        try {
          var storedQueue = this.readFromStorage();
          storedQueue = updatePayloads(storedQueue, itemsToUpdate);
          succeeded = this.saveToStorage(storedQueue);
        } catch (err) {
          this.reportError("Error updating items", itemsToUpdate);
          succeeded = false;
        }
        if (cb) {
          cb(succeeded);
        }
      }, this), _3.bind(function lockFailure(err) {
        this.reportError("Error acquiring storage lock", err);
        if (cb) {
          cb(false);
        }
      }, this), this.pid);
    };
    RequestQueue.prototype.readFromStorage = function() {
      var storageEntry;
      try {
        storageEntry = this.storage.getItem(this.storageKey);
        if (storageEntry) {
          storageEntry = JSONParse(storageEntry);
          if (!_3.isArray(storageEntry)) {
            this.reportError("Invalid storage entry:", storageEntry);
            storageEntry = null;
          }
        }
      } catch (err) {
        this.reportError("Error retrieving queue", err);
        storageEntry = null;
      }
      return storageEntry || [];
    };
    RequestQueue.prototype.saveToStorage = function(queue) {
      try {
        this.storage.setItem(this.storageKey, JSONStringify(queue));
        return true;
      } catch (err) {
        this.reportError("Error saving queue", err);
        return false;
      }
    };
    RequestQueue.prototype.clear = function() {
      this.memQueue = [];
      this.storage.removeItem(this.storageKey);
    };
    var MAX_RETRY_INTERVAL_MS = 10 * 60 * 1e3;
    var logger = console_with_prefix("batch");
    var RequestBatcher = function(storageKey, options) {
      this.errorReporter = options.errorReporter;
      this.queue = new RequestQueue(storageKey, {
        errorReporter: _3.bind(this.reportError, this),
        storage: options.storage
      });
      this.libConfig = options.libConfig;
      this.sendRequest = options.sendRequestFunc;
      this.beforeSendHook = options.beforeSendHook;
      this.stopAllBatching = options.stopAllBatchingFunc;
      this.batchSize = this.libConfig["batch_size"];
      this.flushInterval = this.libConfig["batch_flush_interval_ms"];
      this.stopped = !this.libConfig["batch_autostart"];
      this.consecutiveRemovalFailures = 0;
    };
    RequestBatcher.prototype.enqueue = function(item, cb) {
      this.queue.enqueue(item, this.flushInterval, cb);
    };
    RequestBatcher.prototype.start = function() {
      this.stopped = false;
      this.consecutiveRemovalFailures = 0;
      this.flush();
    };
    RequestBatcher.prototype.stop = function() {
      this.stopped = true;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
      }
    };
    RequestBatcher.prototype.clear = function() {
      this.queue.clear();
    };
    RequestBatcher.prototype.resetBatchSize = function() {
      this.batchSize = this.libConfig["batch_size"];
    };
    RequestBatcher.prototype.resetFlush = function() {
      this.scheduleFlush(this.libConfig["batch_flush_interval_ms"]);
    };
    RequestBatcher.prototype.scheduleFlush = function(flushMS) {
      this.flushInterval = flushMS;
      if (!this.stopped) {
        this.timeoutID = setTimeout(_3.bind(this.flush, this), this.flushInterval);
      }
    };
    RequestBatcher.prototype.flush = function(options) {
      try {
        if (this.requestInProgress) {
          logger.log("Flush: Request already in progress");
          return;
        }
        options = options || {};
        var timeoutMS = this.libConfig["batch_request_timeout_ms"];
        var startTime = new Date().getTime();
        var currentBatchSize = this.batchSize;
        var batch2 = this.queue.fillBatch(currentBatchSize);
        var dataForRequest = [];
        var transformedItems = {};
        _3.each(batch2, function(item) {
          var payload = item["payload"];
          if (this.beforeSendHook && !item.orphaned) {
            payload = this.beforeSendHook(payload);
          }
          if (payload) {
            dataForRequest.push(payload);
          }
          transformedItems[item["id"]] = payload;
        }, this);
        if (dataForRequest.length < 1) {
          this.resetFlush();
          return;
        }
        this.requestInProgress = true;
        var batchSendCallback = _3.bind(function(res) {
          this.requestInProgress = false;
          try {
            var removeItemsFromQueue = false;
            if (options.unloading) {
              this.queue.updatePayloads(transformedItems);
            } else if (_3.isObject(res) && res.error === "timeout" && new Date().getTime() - startTime >= timeoutMS) {
              this.reportError("Network timeout; retrying");
              this.flush();
            } else if (_3.isObject(res) && res.xhr_req && (res.xhr_req["status"] >= 500 || res.xhr_req["status"] === 429 || res.error === "timeout")) {
              var retryMS = this.flushInterval * 2;
              var headers = res.xhr_req["responseHeaders"];
              if (headers) {
                var retryAfter = headers["Retry-After"];
                if (retryAfter) {
                  retryMS = parseInt(retryAfter, 10) * 1e3 || retryMS;
                }
              }
              retryMS = Math.min(MAX_RETRY_INTERVAL_MS, retryMS);
              this.reportError("Error; retry in " + retryMS + " ms");
              this.scheduleFlush(retryMS);
            } else if (_3.isObject(res) && res.xhr_req && res.xhr_req["status"] === 413) {
              if (batch2.length > 1) {
                var halvedBatchSize = Math.max(1, Math.floor(currentBatchSize / 2));
                this.batchSize = Math.min(this.batchSize, halvedBatchSize, batch2.length - 1);
                this.reportError("413 response; reducing batch size to " + this.batchSize);
                this.resetFlush();
              } else {
                this.reportError("Single-event request too large; dropping", batch2);
                this.resetBatchSize();
                removeItemsFromQueue = true;
              }
            } else {
              removeItemsFromQueue = true;
            }
            if (removeItemsFromQueue) {
              this.queue.removeItemsByID(_3.map(batch2, function(item) {
                return item["id"];
              }), _3.bind(function(succeeded) {
                if (succeeded) {
                  this.consecutiveRemovalFailures = 0;
                  this.flush();
                } else {
                  this.reportError("Failed to remove items from queue");
                  if (++this.consecutiveRemovalFailures > 5) {
                    this.reportError("Too many queue failures; disabling batching system.");
                    this.stopAllBatching();
                  } else {
                    this.resetFlush();
                  }
                }
              }, this));
            }
          } catch (err) {
            this.reportError("Error handling API response", err);
            this.resetFlush();
          }
        }, this);
        var requestOptions = {
          method: "POST",
          verbose: true,
          ignore_json_errors: true,
          timeout_ms: timeoutMS
        };
        if (options.unloading) {
          requestOptions.transport = "sendBeacon";
        }
        logger.log("MIXPANEL REQUEST:", dataForRequest);
        this.sendRequest(dataForRequest, requestOptions, batchSendCallback);
      } catch (err) {
        this.reportError("Error flushing request queue", err);
        this.resetFlush();
      }
    };
    RequestBatcher.prototype.reportError = function(msg, err) {
      logger.error.apply(logger.error, arguments);
      if (this.errorReporter) {
        try {
          if (!(err instanceof Error)) {
            err = new Error(msg);
          }
          this.errorReporter(msg, err);
        } catch (err2) {
          logger.error(err2);
        }
      }
    };
    var GDPR_DEFAULT_PERSISTENCE_PREFIX = "__mp_opt_in_out_";
    function optIn(token, options) {
      _optInOut(true, token, options);
    }
    function optOut(token, options) {
      _optInOut(false, token, options);
    }
    function hasOptedIn(token, options) {
      return _getStorageValue(token, options) === "1";
    }
    function hasOptedOut(token, options) {
      if (_hasDoNotTrackFlagOn(options)) {
        console2.warn('This browser has "Do Not Track" enabled. This will prevent the Mixpanel SDK from sending any data. To ignore the "Do Not Track" browser setting, initialize the Mixpanel instance with the config "ignore_dnt: true"');
        return true;
      }
      var optedOut = _getStorageValue(token, options) === "0";
      if (optedOut) {
        console2.warn("You are opted out of Mixpanel tracking. This will prevent the Mixpanel SDK from sending any data.");
      }
      return optedOut;
    }
    function addOptOutCheckMixpanelLib(method) {
      return _addOptOutCheck(method, function(name) {
        return this.get_config(name);
      });
    }
    function addOptOutCheckMixpanelPeople(method) {
      return _addOptOutCheck(method, function(name) {
        return this._get_config(name);
      });
    }
    function addOptOutCheckMixpanelGroup(method) {
      return _addOptOutCheck(method, function(name) {
        return this._get_config(name);
      });
    }
    function clearOptInOut(token, options) {
      options = options || {};
      _getStorage(options).remove(_getStorageKey(token, options), !!options.crossSubdomainCookie, options.cookieDomain);
    }
    function _getStorage(options) {
      options = options || {};
      return options.persistenceType === "localStorage" ? _3.localStorage : _3.cookie;
    }
    function _getStorageKey(token, options) {
      options = options || {};
      return (options.persistencePrefix || GDPR_DEFAULT_PERSISTENCE_PREFIX) + token;
    }
    function _getStorageValue(token, options) {
      return _getStorage(options).get(_getStorageKey(token, options));
    }
    function _hasDoNotTrackFlagOn(options) {
      if (options && options.ignoreDnt) {
        return false;
      }
      var win = options && options.window || window$1;
      var nav = win["navigator"] || {};
      var hasDntOn = false;
      _3.each([
        nav["doNotTrack"],
        nav["msDoNotTrack"],
        win["doNotTrack"]
      ], function(dntValue) {
        if (_3.includes([true, 1, "1", "yes"], dntValue)) {
          hasDntOn = true;
        }
      });
      return hasDntOn;
    }
    function _optInOut(optValue, token, options) {
      if (!_3.isString(token) || !token.length) {
        console2.error("gdpr." + (optValue ? "optIn" : "optOut") + " called with an invalid token");
        return;
      }
      options = options || {};
      _getStorage(options).set(_getStorageKey(token, options), optValue ? 1 : 0, _3.isNumber(options.cookieExpiration) ? options.cookieExpiration : null, !!options.crossSubdomainCookie, !!options.secureCookie, !!options.crossSiteCookie, options.cookieDomain);
      if (options.track && optValue) {
        options.track(options.trackEventName || "$opt_in", options.trackProperties, {
          send_immediately: true
        });
      }
    }
    function _addOptOutCheck(method, getConfigValue) {
      return function() {
        var optedOut = false;
        try {
          var token = getConfigValue.call(this, "token");
          var ignoreDnt = getConfigValue.call(this, "ignore_dnt");
          var persistenceType = getConfigValue.call(this, "opt_out_tracking_persistence_type");
          var persistencePrefix = getConfigValue.call(this, "opt_out_tracking_cookie_prefix");
          var win = getConfigValue.call(this, "window");
          if (token) {
            optedOut = hasOptedOut(token, {
              ignoreDnt,
              persistenceType,
              persistencePrefix,
              window: win
            });
          }
        } catch (err) {
          console2.error("Unexpected error when checking tracking opt-out status: " + err);
        }
        if (!optedOut) {
          return method.apply(this, arguments);
        }
        var callback = arguments[arguments.length - 1];
        if (typeof callback === "function") {
          callback(0);
        }
        return;
      };
    }
    var SET_ACTION = "$set";
    var SET_ONCE_ACTION = "$set_once";
    var UNSET_ACTION = "$unset";
    var ADD_ACTION = "$add";
    var APPEND_ACTION = "$append";
    var UNION_ACTION = "$union";
    var REMOVE_ACTION = "$remove";
    var DELETE_ACTION = "$delete";
    var apiActions = {
      set_action: function(prop3, to) {
        var data = {};
        var $set = {};
        if (_3.isObject(prop3)) {
          _3.each(prop3, function(v2, k2) {
            if (!this._is_reserved_property(k2)) {
              $set[k2] = v2;
            }
          }, this);
        } else {
          $set[prop3] = to;
        }
        data[SET_ACTION] = $set;
        return data;
      },
      unset_action: function(prop3) {
        var data = {};
        var $unset = [];
        if (!_3.isArray(prop3)) {
          prop3 = [prop3];
        }
        _3.each(prop3, function(k2) {
          if (!this._is_reserved_property(k2)) {
            $unset.push(k2);
          }
        }, this);
        data[UNSET_ACTION] = $unset;
        return data;
      },
      set_once_action: function(prop3, to) {
        var data = {};
        var $set_once = {};
        if (_3.isObject(prop3)) {
          _3.each(prop3, function(v2, k2) {
            if (!this._is_reserved_property(k2)) {
              $set_once[k2] = v2;
            }
          }, this);
        } else {
          $set_once[prop3] = to;
        }
        data[SET_ONCE_ACTION] = $set_once;
        return data;
      },
      union_action: function(list_name, values) {
        var data = {};
        var $union = {};
        if (_3.isObject(list_name)) {
          _3.each(list_name, function(v2, k2) {
            if (!this._is_reserved_property(k2)) {
              $union[k2] = _3.isArray(v2) ? v2 : [v2];
            }
          }, this);
        } else {
          $union[list_name] = _3.isArray(values) ? values : [values];
        }
        data[UNION_ACTION] = $union;
        return data;
      },
      append_action: function(list_name, value) {
        var data = {};
        var $append = {};
        if (_3.isObject(list_name)) {
          _3.each(list_name, function(v2, k2) {
            if (!this._is_reserved_property(k2)) {
              $append[k2] = v2;
            }
          }, this);
        } else {
          $append[list_name] = value;
        }
        data[APPEND_ACTION] = $append;
        return data;
      },
      remove_action: function(list_name, value) {
        var data = {};
        var $remove = {};
        if (_3.isObject(list_name)) {
          _3.each(list_name, function(v2, k2) {
            if (!this._is_reserved_property(k2)) {
              $remove[k2] = v2;
            }
          }, this);
        } else {
          $remove[list_name] = value;
        }
        data[REMOVE_ACTION] = $remove;
        return data;
      },
      delete_action: function() {
        var data = {};
        data[DELETE_ACTION] = "";
        return data;
      }
    };
    var MixpanelGroup = function() {
    };
    _3.extend(MixpanelGroup.prototype, apiActions);
    MixpanelGroup.prototype._init = function(mixpanel_instance, group_key, group_id) {
      this._mixpanel = mixpanel_instance;
      this._group_key = group_key;
      this._group_id = group_id;
    };
    MixpanelGroup.prototype.set = addOptOutCheckMixpanelGroup(function(prop3, to, callback) {
      var data = this.set_action(prop3, to);
      if (_3.isObject(prop3)) {
        callback = to;
      }
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype.set_once = addOptOutCheckMixpanelGroup(function(prop3, to, callback) {
      var data = this.set_once_action(prop3, to);
      if (_3.isObject(prop3)) {
        callback = to;
      }
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype.unset = addOptOutCheckMixpanelGroup(function(prop3, callback) {
      var data = this.unset_action(prop3);
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype.union = addOptOutCheckMixpanelGroup(function(list_name, values, callback) {
      if (_3.isObject(list_name)) {
        callback = values;
      }
      var data = this.union_action(list_name, values);
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype["delete"] = addOptOutCheckMixpanelGroup(function(callback) {
      var data = this.delete_action();
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype.remove = addOptOutCheckMixpanelGroup(function(list_name, value, callback) {
      var data = this.remove_action(list_name, value);
      return this._send_request(data, callback);
    });
    MixpanelGroup.prototype._send_request = function(data, callback) {
      data["$group_key"] = this._group_key;
      data["$group_id"] = this._group_id;
      data["$token"] = this._get_config("token");
      var date_encoded_data = _3.encodeDates(data);
      return this._mixpanel._track_or_batch({
        type: "groups",
        data: date_encoded_data,
        endpoint: this._get_config("api_host") + "/groups/",
        batcher: this._mixpanel.request_batchers.groups
      }, callback);
    };
    MixpanelGroup.prototype._is_reserved_property = function(prop3) {
      return prop3 === "$group_key" || prop3 === "$group_id";
    };
    MixpanelGroup.prototype._get_config = function(conf) {
      return this._mixpanel.get_config(conf);
    };
    MixpanelGroup.prototype.toString = function() {
      return this._mixpanel.toString() + ".group." + this._group_key + "." + this._group_id;
    };
    MixpanelGroup.prototype["remove"] = MixpanelGroup.prototype.remove;
    MixpanelGroup.prototype["set"] = MixpanelGroup.prototype.set;
    MixpanelGroup.prototype["set_once"] = MixpanelGroup.prototype.set_once;
    MixpanelGroup.prototype["union"] = MixpanelGroup.prototype.union;
    MixpanelGroup.prototype["unset"] = MixpanelGroup.prototype.unset;
    MixpanelGroup.prototype["toString"] = MixpanelGroup.prototype.toString;
    var MixpanelPeople = function() {
    };
    _3.extend(MixpanelPeople.prototype, apiActions);
    MixpanelPeople.prototype._init = function(mixpanel_instance) {
      this._mixpanel = mixpanel_instance;
    };
    MixpanelPeople.prototype.set = addOptOutCheckMixpanelPeople(function(prop3, to, callback) {
      var data = this.set_action(prop3, to);
      if (_3.isObject(prop3)) {
        callback = to;
      }
      if (this._get_config("save_referrer")) {
        this._mixpanel["persistence"].update_referrer_info(document.referrer);
      }
      data[SET_ACTION] = _3.extend({}, _3.info.people_properties(), this._mixpanel["persistence"].get_referrer_info(), data[SET_ACTION]);
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.set_once = addOptOutCheckMixpanelPeople(function(prop3, to, callback) {
      var data = this.set_once_action(prop3, to);
      if (_3.isObject(prop3)) {
        callback = to;
      }
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.unset = addOptOutCheckMixpanelPeople(function(prop3, callback) {
      var data = this.unset_action(prop3);
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.increment = addOptOutCheckMixpanelPeople(function(prop3, by, callback) {
      var data = {};
      var $add = {};
      if (_3.isObject(prop3)) {
        _3.each(prop3, function(v2, k2) {
          if (!this._is_reserved_property(k2)) {
            if (isNaN(parseFloat(v2))) {
              console2.error("Invalid increment value passed to mixpanel.people.increment - must be a number");
              return;
            } else {
              $add[k2] = v2;
            }
          }
        }, this);
        callback = by;
      } else {
        if (_3.isUndefined(by)) {
          by = 1;
        }
        $add[prop3] = by;
      }
      data[ADD_ACTION] = $add;
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.append = addOptOutCheckMixpanelPeople(function(list_name, value, callback) {
      if (_3.isObject(list_name)) {
        callback = value;
      }
      var data = this.append_action(list_name, value);
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.remove = addOptOutCheckMixpanelPeople(function(list_name, value, callback) {
      if (_3.isObject(list_name)) {
        callback = value;
      }
      var data = this.remove_action(list_name, value);
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.union = addOptOutCheckMixpanelPeople(function(list_name, values, callback) {
      if (_3.isObject(list_name)) {
        callback = values;
      }
      var data = this.union_action(list_name, values);
      return this._send_request(data, callback);
    });
    MixpanelPeople.prototype.track_charge = addOptOutCheckMixpanelPeople(function(amount, properties, callback) {
      if (!_3.isNumber(amount)) {
        amount = parseFloat(amount);
        if (isNaN(amount)) {
          console2.error("Invalid value passed to mixpanel.people.track_charge - must be a number");
          return;
        }
      }
      return this.append("$transactions", _3.extend({
        $amount: amount
      }, properties), callback);
    });
    MixpanelPeople.prototype.clear_charges = function(callback) {
      return this.set("$transactions", [], callback);
    };
    MixpanelPeople.prototype.delete_user = function() {
      if (!this._identify_called()) {
        console2.error("mixpanel.people.delete_user() requires you to call identify() first");
        return;
      }
      var data = {$delete: this._mixpanel.get_distinct_id()};
      return this._send_request(data);
    };
    MixpanelPeople.prototype.toString = function() {
      return this._mixpanel.toString() + ".people";
    };
    MixpanelPeople.prototype._send_request = function(data, callback) {
      data["$token"] = this._get_config("token");
      data["$distinct_id"] = this._mixpanel.get_distinct_id();
      var device_id = this._mixpanel.get_property("$device_id");
      var user_id = this._mixpanel.get_property("$user_id");
      var had_persisted_distinct_id = this._mixpanel.get_property("$had_persisted_distinct_id");
      if (device_id) {
        data["$device_id"] = device_id;
      }
      if (user_id) {
        data["$user_id"] = user_id;
      }
      if (had_persisted_distinct_id) {
        data["$had_persisted_distinct_id"] = had_persisted_distinct_id;
      }
      var date_encoded_data = _3.encodeDates(data);
      if (!this._identify_called()) {
        this._enqueue(data);
        if (!_3.isUndefined(callback)) {
          if (this._get_config("verbose")) {
            callback({status: -1, error: null});
          } else {
            callback(-1);
          }
        }
        return _3.truncate(date_encoded_data, 255);
      }
      return this._mixpanel._track_or_batch({
        type: "people",
        data: date_encoded_data,
        endpoint: this._get_config("api_host") + "/engage/",
        batcher: this._mixpanel.request_batchers.people
      }, callback);
    };
    MixpanelPeople.prototype._get_config = function(conf_var) {
      return this._mixpanel.get_config(conf_var);
    };
    MixpanelPeople.prototype._identify_called = function() {
      return this._mixpanel._flags.identify_called === true;
    };
    MixpanelPeople.prototype._enqueue = function(data) {
      if (SET_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(SET_ACTION, data);
      } else if (SET_ONCE_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(SET_ONCE_ACTION, data);
      } else if (UNSET_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(UNSET_ACTION, data);
      } else if (ADD_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(ADD_ACTION, data);
      } else if (APPEND_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(APPEND_ACTION, data);
      } else if (REMOVE_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(REMOVE_ACTION, data);
      } else if (UNION_ACTION in data) {
        this._mixpanel["persistence"]._add_to_people_queue(UNION_ACTION, data);
      } else {
        console2.error("Invalid call to _enqueue():", data);
      }
    };
    MixpanelPeople.prototype._flush_one_queue = function(action, action_method, callback, queue_to_params_fn) {
      var _this = this;
      var queued_data = _3.extend({}, this._mixpanel["persistence"]._get_queue(action));
      var action_params = queued_data;
      if (!_3.isUndefined(queued_data) && _3.isObject(queued_data) && !_3.isEmptyObject(queued_data)) {
        _this._mixpanel["persistence"]._pop_from_people_queue(action, queued_data);
        if (queue_to_params_fn) {
          action_params = queue_to_params_fn(queued_data);
        }
        action_method.call(_this, action_params, function(response, data) {
          if (response === 0) {
            _this._mixpanel["persistence"]._add_to_people_queue(action, queued_data);
          }
          if (!_3.isUndefined(callback)) {
            callback(response, data);
          }
        });
      }
    };
    MixpanelPeople.prototype._flush = function(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback) {
      var _this = this;
      var $append_queue = this._mixpanel["persistence"]._get_queue(APPEND_ACTION);
      var $remove_queue = this._mixpanel["persistence"]._get_queue(REMOVE_ACTION);
      this._flush_one_queue(SET_ACTION, this.set, _set_callback);
      this._flush_one_queue(SET_ONCE_ACTION, this.set_once, _set_once_callback);
      this._flush_one_queue(UNSET_ACTION, this.unset, _unset_callback, function(queue) {
        return _3.keys(queue);
      });
      this._flush_one_queue(ADD_ACTION, this.increment, _add_callback);
      this._flush_one_queue(UNION_ACTION, this.union, _union_callback);
      if (!_3.isUndefined($append_queue) && _3.isArray($append_queue) && $append_queue.length) {
        var $append_item;
        var append_callback = function(response, data) {
          if (response === 0) {
            _this._mixpanel["persistence"]._add_to_people_queue(APPEND_ACTION, $append_item);
          }
          if (!_3.isUndefined(_append_callback)) {
            _append_callback(response, data);
          }
        };
        for (var i3 = $append_queue.length - 1; i3 >= 0; i3--) {
          $append_item = $append_queue.pop();
          if (!_3.isEmptyObject($append_item)) {
            _this.append($append_item, append_callback);
          }
        }
        _this._mixpanel["persistence"].save();
      }
      if (!_3.isUndefined($remove_queue) && _3.isArray($remove_queue) && $remove_queue.length) {
        var $remove_item;
        var remove_callback = function(response, data) {
          if (response === 0) {
            _this._mixpanel["persistence"]._add_to_people_queue(REMOVE_ACTION, $remove_item);
          }
          if (!_3.isUndefined(_remove_callback)) {
            _remove_callback(response, data);
          }
        };
        for (var j2 = $remove_queue.length - 1; j2 >= 0; j2--) {
          $remove_item = $remove_queue.pop();
          if (!_3.isEmptyObject($remove_item)) {
            _this.remove($remove_item, remove_callback);
          }
        }
        _this._mixpanel["persistence"].save();
      }
    };
    MixpanelPeople.prototype._is_reserved_property = function(prop3) {
      return prop3 === "$distinct_id" || prop3 === "$token" || prop3 === "$device_id" || prop3 === "$user_id" || prop3 === "$had_persisted_distinct_id";
    };
    MixpanelPeople.prototype["set"] = MixpanelPeople.prototype.set;
    MixpanelPeople.prototype["set_once"] = MixpanelPeople.prototype.set_once;
    MixpanelPeople.prototype["unset"] = MixpanelPeople.prototype.unset;
    MixpanelPeople.prototype["increment"] = MixpanelPeople.prototype.increment;
    MixpanelPeople.prototype["append"] = MixpanelPeople.prototype.append;
    MixpanelPeople.prototype["remove"] = MixpanelPeople.prototype.remove;
    MixpanelPeople.prototype["union"] = MixpanelPeople.prototype.union;
    MixpanelPeople.prototype["track_charge"] = MixpanelPeople.prototype.track_charge;
    MixpanelPeople.prototype["clear_charges"] = MixpanelPeople.prototype.clear_charges;
    MixpanelPeople.prototype["delete_user"] = MixpanelPeople.prototype.delete_user;
    MixpanelPeople.prototype["toString"] = MixpanelPeople.prototype.toString;
    var SET_QUEUE_KEY = "__mps";
    var SET_ONCE_QUEUE_KEY = "__mpso";
    var UNSET_QUEUE_KEY = "__mpus";
    var ADD_QUEUE_KEY = "__mpa";
    var APPEND_QUEUE_KEY = "__mpap";
    var REMOVE_QUEUE_KEY = "__mpr";
    var UNION_QUEUE_KEY = "__mpu";
    var PEOPLE_DISTINCT_ID_KEY = "$people_distinct_id";
    var ALIAS_ID_KEY = "__alias";
    var EVENT_TIMERS_KEY = "__timers";
    var RESERVED_PROPERTIES = [
      SET_QUEUE_KEY,
      SET_ONCE_QUEUE_KEY,
      UNSET_QUEUE_KEY,
      ADD_QUEUE_KEY,
      APPEND_QUEUE_KEY,
      REMOVE_QUEUE_KEY,
      UNION_QUEUE_KEY,
      PEOPLE_DISTINCT_ID_KEY,
      ALIAS_ID_KEY,
      EVENT_TIMERS_KEY
    ];
    var MixpanelPersistence = function(config) {
      this["props"] = {};
      this.campaign_params_saved = false;
      if (config["persistence_name"]) {
        this.name = "mp_" + config["persistence_name"];
      } else {
        this.name = "mp_" + config["token"] + "_mixpanel";
      }
      var storage_type = config["persistence"];
      if (storage_type !== "cookie" && storage_type !== "localStorage") {
        console2.critical("Unknown persistence type " + storage_type + "; falling back to cookie");
        storage_type = config["persistence"] = "cookie";
      }
      if (storage_type === "localStorage" && _3.localStorage.is_supported()) {
        this.storage = _3.localStorage;
      } else {
        this.storage = _3.cookie;
      }
      this.load();
      this.update_config(config);
      this.upgrade(config);
      this.save();
    };
    MixpanelPersistence.prototype.properties = function() {
      var p3 = {};
      _3.each(this["props"], function(v2, k2) {
        if (!_3.include(RESERVED_PROPERTIES, k2)) {
          p3[k2] = v2;
        }
      });
      return p3;
    };
    MixpanelPersistence.prototype.load = function() {
      if (this.disabled) {
        return;
      }
      var entry = this.storage.parse(this.name);
      if (entry) {
        this["props"] = _3.extend({}, entry);
      }
    };
    MixpanelPersistence.prototype.upgrade = function(config) {
      var upgrade_from_old_lib = config["upgrade"], old_cookie_name, old_cookie;
      if (upgrade_from_old_lib) {
        old_cookie_name = "mp_super_properties";
        if (typeof upgrade_from_old_lib === "string") {
          old_cookie_name = upgrade_from_old_lib;
        }
        old_cookie = this.storage.parse(old_cookie_name);
        this.storage.remove(old_cookie_name);
        this.storage.remove(old_cookie_name, true);
        if (old_cookie) {
          this["props"] = _3.extend(this["props"], old_cookie["all"], old_cookie["events"]);
        }
      }
      if (!config["cookie_name"] && config["name"] !== "mixpanel") {
        old_cookie_name = "mp_" + config["token"] + "_" + config["name"];
        old_cookie = this.storage.parse(old_cookie_name);
        if (old_cookie) {
          this.storage.remove(old_cookie_name);
          this.storage.remove(old_cookie_name, true);
          this.register_once(old_cookie);
        }
      }
      if (this.storage === _3.localStorage) {
        old_cookie = _3.cookie.parse(this.name);
        _3.cookie.remove(this.name);
        _3.cookie.remove(this.name, true);
        if (old_cookie) {
          this.register_once(old_cookie);
        }
      }
    };
    MixpanelPersistence.prototype.save = function() {
      if (this.disabled) {
        return;
      }
      this.storage.set(this.name, _3.JSONEncode(this["props"]), this.expire_days, this.cross_subdomain, this.secure, this.cross_site, this.cookie_domain);
    };
    MixpanelPersistence.prototype.remove = function() {
      this.storage.remove(this.name, false, this.cookie_domain);
      this.storage.remove(this.name, true, this.cookie_domain);
    };
    MixpanelPersistence.prototype.clear = function() {
      this.remove();
      this["props"] = {};
    };
    MixpanelPersistence.prototype.register_once = function(props, default_value, days) {
      if (_3.isObject(props)) {
        if (typeof default_value === "undefined") {
          default_value = "None";
        }
        this.expire_days = typeof days === "undefined" ? this.default_expiry : days;
        _3.each(props, function(val, prop3) {
          if (!this["props"].hasOwnProperty(prop3) || this["props"][prop3] === default_value) {
            this["props"][prop3] = val;
          }
        }, this);
        this.save();
        return true;
      }
      return false;
    };
    MixpanelPersistence.prototype.register = function(props, days) {
      if (_3.isObject(props)) {
        this.expire_days = typeof days === "undefined" ? this.default_expiry : days;
        _3.extend(this["props"], props);
        this.save();
        return true;
      }
      return false;
    };
    MixpanelPersistence.prototype.unregister = function(prop3) {
      if (prop3 in this["props"]) {
        delete this["props"][prop3];
        this.save();
      }
    };
    MixpanelPersistence.prototype.update_campaign_params = function() {
      if (!this.campaign_params_saved) {
        this.register_once(_3.info.campaignParams());
        this.campaign_params_saved = true;
      }
    };
    MixpanelPersistence.prototype.update_search_keyword = function(referrer) {
      this.register(_3.info.searchInfo(referrer));
    };
    MixpanelPersistence.prototype.update_referrer_info = function(referrer) {
      this.register_once({
        $initial_referrer: referrer || "$direct",
        $initial_referring_domain: _3.info.referringDomain(referrer) || "$direct"
      }, "");
    };
    MixpanelPersistence.prototype.get_referrer_info = function() {
      return _3.strip_empty_properties({
        $initial_referrer: this["props"]["$initial_referrer"],
        $initial_referring_domain: this["props"]["$initial_referring_domain"]
      });
    };
    MixpanelPersistence.prototype.safe_merge = function(props) {
      _3.each(this["props"], function(val, prop3) {
        if (!(prop3 in props)) {
          props[prop3] = val;
        }
      });
      return props;
    };
    MixpanelPersistence.prototype.update_config = function(config) {
      this.default_expiry = this.expire_days = config["cookie_expiration"];
      this.set_disabled(config["disable_persistence"]);
      this.set_cookie_domain(config["cookie_domain"]);
      this.set_cross_site(config["cross_site_cookie"]);
      this.set_cross_subdomain(config["cross_subdomain_cookie"]);
      this.set_secure(config["secure_cookie"]);
    };
    MixpanelPersistence.prototype.set_disabled = function(disabled) {
      this.disabled = disabled;
      if (this.disabled) {
        this.remove();
      } else {
        this.save();
      }
    };
    MixpanelPersistence.prototype.set_cookie_domain = function(cookie_domain) {
      if (cookie_domain !== this.cookie_domain) {
        this.remove();
        this.cookie_domain = cookie_domain;
        this.save();
      }
    };
    MixpanelPersistence.prototype.set_cross_site = function(cross_site) {
      if (cross_site !== this.cross_site) {
        this.cross_site = cross_site;
        this.remove();
        this.save();
      }
    };
    MixpanelPersistence.prototype.set_cross_subdomain = function(cross_subdomain) {
      if (cross_subdomain !== this.cross_subdomain) {
        this.cross_subdomain = cross_subdomain;
        this.remove();
        this.save();
      }
    };
    MixpanelPersistence.prototype.get_cross_subdomain = function() {
      return this.cross_subdomain;
    };
    MixpanelPersistence.prototype.set_secure = function(secure) {
      if (secure !== this.secure) {
        this.secure = secure ? true : false;
        this.remove();
        this.save();
      }
    };
    MixpanelPersistence.prototype._add_to_people_queue = function(queue, data) {
      var q_key = this._get_queue_key(queue), q_data = data[queue], set_q = this._get_or_create_queue(SET_ACTION), set_once_q = this._get_or_create_queue(SET_ONCE_ACTION), unset_q = this._get_or_create_queue(UNSET_ACTION), add_q = this._get_or_create_queue(ADD_ACTION), union_q = this._get_or_create_queue(UNION_ACTION), remove_q = this._get_or_create_queue(REMOVE_ACTION, []), append_q = this._get_or_create_queue(APPEND_ACTION, []);
      if (q_key === SET_QUEUE_KEY) {
        _3.extend(set_q, q_data);
        this._pop_from_people_queue(ADD_ACTION, q_data);
        this._pop_from_people_queue(UNION_ACTION, q_data);
        this._pop_from_people_queue(UNSET_ACTION, q_data);
      } else if (q_key === SET_ONCE_QUEUE_KEY) {
        _3.each(q_data, function(v2, k2) {
          if (!(k2 in set_once_q)) {
            set_once_q[k2] = v2;
          }
        });
        this._pop_from_people_queue(UNSET_ACTION, q_data);
      } else if (q_key === UNSET_QUEUE_KEY) {
        _3.each(q_data, function(prop3) {
          _3.each([set_q, set_once_q, add_q, union_q], function(enqueued_obj) {
            if (prop3 in enqueued_obj) {
              delete enqueued_obj[prop3];
            }
          });
          _3.each(append_q, function(append_obj) {
            if (prop3 in append_obj) {
              delete append_obj[prop3];
            }
          });
          unset_q[prop3] = true;
        });
      } else if (q_key === ADD_QUEUE_KEY) {
        _3.each(q_data, function(v2, k2) {
          if (k2 in set_q) {
            set_q[k2] += v2;
          } else {
            if (!(k2 in add_q)) {
              add_q[k2] = 0;
            }
            add_q[k2] += v2;
          }
        }, this);
        this._pop_from_people_queue(UNSET_ACTION, q_data);
      } else if (q_key === UNION_QUEUE_KEY) {
        _3.each(q_data, function(v2, k2) {
          if (_3.isArray(v2)) {
            if (!(k2 in union_q)) {
              union_q[k2] = [];
            }
            union_q[k2] = union_q[k2].concat(v2);
          }
        });
        this._pop_from_people_queue(UNSET_ACTION, q_data);
      } else if (q_key === REMOVE_QUEUE_KEY) {
        remove_q.push(q_data);
        this._pop_from_people_queue(APPEND_ACTION, q_data);
      } else if (q_key === APPEND_QUEUE_KEY) {
        append_q.push(q_data);
        this._pop_from_people_queue(UNSET_ACTION, q_data);
      }
      console2.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):");
      console2.log(data);
      this.save();
    };
    MixpanelPersistence.prototype._pop_from_people_queue = function(queue, data) {
      var q2 = this._get_queue(queue);
      if (!_3.isUndefined(q2)) {
        _3.each(data, function(v2, k2) {
          if (queue === APPEND_ACTION || queue === REMOVE_ACTION) {
            _3.each(q2, function(queued_action) {
              if (queued_action[k2] === v2) {
                delete queued_action[k2];
              }
            });
          } else {
            delete q2[k2];
          }
        }, this);
        this.save();
      }
    };
    MixpanelPersistence.prototype._get_queue_key = function(queue) {
      if (queue === SET_ACTION) {
        return SET_QUEUE_KEY;
      } else if (queue === SET_ONCE_ACTION) {
        return SET_ONCE_QUEUE_KEY;
      } else if (queue === UNSET_ACTION) {
        return UNSET_QUEUE_KEY;
      } else if (queue === ADD_ACTION) {
        return ADD_QUEUE_KEY;
      } else if (queue === APPEND_ACTION) {
        return APPEND_QUEUE_KEY;
      } else if (queue === REMOVE_ACTION) {
        return REMOVE_QUEUE_KEY;
      } else if (queue === UNION_ACTION) {
        return UNION_QUEUE_KEY;
      } else {
        console2.error("Invalid queue:", queue);
      }
    };
    MixpanelPersistence.prototype._get_queue = function(queue) {
      return this["props"][this._get_queue_key(queue)];
    };
    MixpanelPersistence.prototype._get_or_create_queue = function(queue, default_val) {
      var key = this._get_queue_key(queue);
      default_val = _3.isUndefined(default_val) ? {} : default_val;
      return this["props"][key] || (this["props"][key] = default_val);
    };
    MixpanelPersistence.prototype.set_event_timer = function(event_name, timestamp) {
      var timers = this["props"][EVENT_TIMERS_KEY] || {};
      timers[event_name] = timestamp;
      this["props"][EVENT_TIMERS_KEY] = timers;
      this.save();
    };
    MixpanelPersistence.prototype.remove_event_timer = function(event_name) {
      var timers = this["props"][EVENT_TIMERS_KEY] || {};
      var timestamp = timers[event_name];
      if (!_3.isUndefined(timestamp)) {
        delete this["props"][EVENT_TIMERS_KEY][event_name];
        this.save();
      }
      return timestamp;
    };
    var init_type;
    var mixpanel_master;
    var INIT_MODULE = 0;
    var INIT_SNIPPET = 1;
    var IDENTITY_FUNC = function(x2) {
      return x2;
    };
    var NOOP_FUNC = function() {
    };
    var PRIMARY_INSTANCE_NAME = "mixpanel";
    var PAYLOAD_TYPE_BASE64 = "base64";
    var PAYLOAD_TYPE_JSON = "json";
    var USE_XHR = window$1.XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
    var ENQUEUE_REQUESTS = !USE_XHR && userAgent.indexOf("MSIE") === -1 && userAgent.indexOf("Mozilla") === -1;
    var sendBeacon = null;
    if (navigator2["sendBeacon"]) {
      sendBeacon = function() {
        return navigator2["sendBeacon"].apply(navigator2, arguments);
      };
    }
    var DEFAULT_CONFIG = {
      api_host: "https://api-js.mixpanel.com",
      api_method: "POST",
      api_transport: "XHR",
      api_payload_format: PAYLOAD_TYPE_BASE64,
      app_host: "https://mixpanel.com",
      cdn: "https://cdn.mxpnl.com",
      cross_site_cookie: false,
      cross_subdomain_cookie: true,
      error_reporter: NOOP_FUNC,
      persistence: "cookie",
      persistence_name: "",
      cookie_domain: "",
      cookie_name: "",
      loaded: NOOP_FUNC,
      store_google: true,
      save_referrer: true,
      test: false,
      verbose: false,
      img: false,
      debug: false,
      track_links_timeout: 300,
      cookie_expiration: 365,
      upgrade: false,
      disable_persistence: false,
      disable_cookie: false,
      secure_cookie: false,
      ip: true,
      opt_out_tracking_by_default: false,
      opt_out_persistence_by_default: false,
      opt_out_tracking_persistence_type: "localStorage",
      opt_out_tracking_cookie_prefix: null,
      property_blacklist: [],
      xhr_headers: {},
      ignore_dnt: false,
      batch_requests: true,
      batch_size: 50,
      batch_flush_interval_ms: 5e3,
      batch_request_timeout_ms: 9e4,
      batch_autostart: true,
      hooks: {}
    };
    var DOM_LOADED = false;
    var MixpanelLib = function() {
    };
    var create_mplib = function(token, config, name) {
      var instance, target = name === PRIMARY_INSTANCE_NAME ? mixpanel_master : mixpanel_master[name];
      if (target && init_type === INIT_MODULE) {
        instance = target;
      } else {
        if (target && !_3.isArray(target)) {
          console2.error("You have already initialized " + name);
          return;
        }
        instance = new MixpanelLib();
      }
      instance._cached_groups = {};
      instance._init(token, config, name);
      instance["people"] = new MixpanelPeople();
      instance["people"]._init(instance);
      Config.DEBUG = Config.DEBUG || instance.get_config("debug");
      if (!_3.isUndefined(target) && _3.isArray(target)) {
        instance._execute_array.call(instance["people"], target["people"]);
        instance._execute_array(target);
      }
      return instance;
    };
    MixpanelLib.prototype.init = function(token, config, name) {
      if (_3.isUndefined(name)) {
        this.report_error("You must name your new library: init(token, config, name)");
        return;
      }
      if (name === PRIMARY_INSTANCE_NAME) {
        this.report_error("You must initialize the main mixpanel object right after you include the Mixpanel js snippet");
        return;
      }
      var instance = create_mplib(token, config, name);
      mixpanel_master[name] = instance;
      instance._loaded();
      return instance;
    };
    MixpanelLib.prototype._init = function(token, config, name) {
      config = config || {};
      this["__loaded"] = true;
      this["config"] = {};
      var variable_features = {};
      if (!("api_payload_format" in config)) {
        var api_host = config["api_host"] || DEFAULT_CONFIG["api_host"];
        if (api_host.match(/\.mixpanel\.com$/)) {
          variable_features["api_payload_format"] = PAYLOAD_TYPE_JSON;
        }
      }
      this.set_config(_3.extend({}, DEFAULT_CONFIG, variable_features, config, {
        name,
        token,
        callback_fn: (name === PRIMARY_INSTANCE_NAME ? name : PRIMARY_INSTANCE_NAME + "." + name) + "._jsc"
      }));
      this["_jsc"] = NOOP_FUNC;
      this.__dom_loaded_queue = [];
      this.__request_queue = [];
      this.__disabled_events = [];
      this._flags = {
        disable_all_events: false,
        identify_called: false
      };
      this.request_batchers = {};
      this._batch_requests = this.get_config("batch_requests");
      if (this._batch_requests) {
        if (!_3.localStorage.is_supported(true) || !USE_XHR) {
          this._batch_requests = false;
          console2.log("Turning off Mixpanel request-queueing; needs XHR and localStorage support");
        } else {
          this.init_batchers();
          if (sendBeacon && window$1.addEventListener) {
            var flush_on_unload = _3.bind(function() {
              if (!this.request_batchers.events.stopped) {
                this.request_batchers.events.flush({unloading: true});
              }
            }, this);
            window$1.addEventListener("pagehide", function(ev) {
              if (ev["persisted"]) {
                flush_on_unload();
              }
            });
            window$1.addEventListener("visibilitychange", function() {
              if (document$1["visibilityState"] === "hidden") {
                flush_on_unload();
              }
            });
          }
        }
      }
      this["persistence"] = this["cookie"] = new MixpanelPersistence(this["config"]);
      this.unpersisted_superprops = {};
      this._gdpr_init();
      var uuid = _3.UUID();
      if (!this.get_distinct_id()) {
        this.register_once({
          distinct_id: uuid,
          $device_id: uuid
        }, "");
      }
    };
    MixpanelLib.prototype._loaded = function() {
      this.get_config("loaded")(this);
      this._set_default_superprops();
    };
    MixpanelLib.prototype._set_default_superprops = function() {
      this["persistence"].update_search_keyword(document$1.referrer);
      if (this.get_config("store_google")) {
        this["persistence"].update_campaign_params();
      }
      if (this.get_config("save_referrer")) {
        this["persistence"].update_referrer_info(document$1.referrer);
      }
    };
    MixpanelLib.prototype._dom_loaded = function() {
      _3.each(this.__dom_loaded_queue, function(item) {
        this._track_dom.apply(this, item);
      }, this);
      if (!this.has_opted_out_tracking()) {
        _3.each(this.__request_queue, function(item) {
          this._send_request.apply(this, item);
        }, this);
      }
      delete this.__dom_loaded_queue;
      delete this.__request_queue;
    };
    MixpanelLib.prototype._track_dom = function(DomClass, args) {
      if (this.get_config("img")) {
        this.report_error("You can't use DOM tracking functions with img = true.");
        return false;
      }
      if (!DOM_LOADED) {
        this.__dom_loaded_queue.push([DomClass, args]);
        return false;
      }
      var dt = new DomClass().init(this);
      return dt.track.apply(dt, args);
    };
    MixpanelLib.prototype._prepare_callback = function(callback, data) {
      if (_3.isUndefined(callback)) {
        return null;
      }
      if (USE_XHR) {
        var callback_function = function(response) {
          callback(response, data);
        };
        return callback_function;
      } else {
        var jsc = this["_jsc"];
        var randomized_cb = "" + Math.floor(Math.random() * 1e8);
        var callback_string = this.get_config("callback_fn") + "[" + randomized_cb + "]";
        jsc[randomized_cb] = function(response) {
          delete jsc[randomized_cb];
          callback(response, data);
        };
        return callback_string;
      }
    };
    MixpanelLib.prototype._send_request = function(url, data, options, callback) {
      var succeeded = true;
      if (ENQUEUE_REQUESTS) {
        this.__request_queue.push(arguments);
        return succeeded;
      }
      var DEFAULT_OPTIONS = {
        method: this.get_config("api_method"),
        transport: this.get_config("api_transport"),
        verbose: this.get_config("verbose")
      };
      var body_data = null;
      if (!callback && (_3.isFunction(options) || typeof options === "string")) {
        callback = options;
        options = null;
      }
      options = _3.extend(DEFAULT_OPTIONS, options || {});
      if (!USE_XHR) {
        options.method = "GET";
      }
      var use_post = options.method === "POST";
      var use_sendBeacon = sendBeacon && use_post && options.transport.toLowerCase() === "sendbeacon";
      var verbose_mode = options.verbose;
      if (data["verbose"]) {
        verbose_mode = true;
      }
      if (this.get_config("test")) {
        data["test"] = 1;
      }
      if (verbose_mode) {
        data["verbose"] = 1;
      }
      if (this.get_config("img")) {
        data["img"] = 1;
      }
      if (!USE_XHR) {
        if (callback) {
          data["callback"] = callback;
        } else if (verbose_mode || this.get_config("test")) {
          data["callback"] = "(function(){})";
        }
      }
      data["ip"] = this.get_config("ip") ? 1 : 0;
      data["_"] = new Date().getTime().toString();
      if (use_post) {
        body_data = "data=" + encodeURIComponent(data["data"]);
        delete data["data"];
      }
      url += "?" + _3.HTTPBuildQuery(data);
      var lib = this;
      if ("img" in data) {
        var img = document$1.createElement("img");
        img.src = url;
        document$1.body.appendChild(img);
      } else if (use_sendBeacon) {
        try {
          succeeded = sendBeacon(url, body_data);
        } catch (e3) {
          lib.report_error(e3);
          succeeded = false;
        }
        try {
          if (callback) {
            callback(succeeded ? 1 : 0);
          }
        } catch (e3) {
          lib.report_error(e3);
        }
      } else if (USE_XHR) {
        try {
          var req = new XMLHttpRequest();
          req.open(options.method, url, true);
          var headers = this.get_config("xhr_headers");
          if (use_post) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          _3.each(headers, function(headerValue, headerName) {
            req.setRequestHeader(headerName, headerValue);
          });
          if (options.timeout_ms && typeof req.timeout !== "undefined") {
            req.timeout = options.timeout_ms;
            var start_time = new Date().getTime();
          }
          req.withCredentials = true;
          req.onreadystatechange = function() {
            if (req.readyState === 4) {
              if (req.status === 200) {
                if (callback) {
                  if (verbose_mode) {
                    var response;
                    try {
                      response = _3.JSONDecode(req.responseText);
                    } catch (e3) {
                      lib.report_error(e3);
                      if (options.ignore_json_errors) {
                        response = req.responseText;
                      } else {
                        return;
                      }
                    }
                    callback(response);
                  } else {
                    callback(Number(req.responseText));
                  }
                }
              } else {
                var error;
                if (req.timeout && !req.status && new Date().getTime() - start_time >= req.timeout) {
                  error = "timeout";
                } else {
                  error = "Bad HTTP status: " + req.status + " " + req.statusText;
                }
                lib.report_error(error);
                if (callback) {
                  if (verbose_mode) {
                    callback({status: 0, error, xhr_req: req});
                  } else {
                    callback(0);
                  }
                }
              }
            }
          };
          req.send(body_data);
        } catch (e3) {
          lib.report_error(e3);
          succeeded = false;
        }
      } else {
        var script = document$1.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = url;
        var s3 = document$1.getElementsByTagName("script")[0];
        s3.parentNode.insertBefore(script, s3);
      }
      return succeeded;
    };
    MixpanelLib.prototype._execute_array = function(array) {
      var fn_name, alias_calls = [], other_calls = [], tracking_calls = [];
      _3.each(array, function(item) {
        if (item) {
          fn_name = item[0];
          if (_3.isArray(fn_name)) {
            tracking_calls.push(item);
          } else if (typeof item === "function") {
            item.call(this);
          } else if (_3.isArray(item) && fn_name === "alias") {
            alias_calls.push(item);
          } else if (_3.isArray(item) && fn_name.indexOf("track") !== -1 && typeof this[fn_name] === "function") {
            tracking_calls.push(item);
          } else {
            other_calls.push(item);
          }
        }
      }, this);
      var execute = function(calls, context) {
        _3.each(calls, function(item) {
          if (_3.isArray(item[0])) {
            var caller = context;
            _3.each(item, function(call) {
              caller = caller[call[0]].apply(caller, call.slice(1));
            });
          } else {
            this[item[0]].apply(this, item.slice(1));
          }
        }, context);
      };
      execute(alias_calls, this);
      execute(other_calls, this);
      execute(tracking_calls, this);
    };
    MixpanelLib.prototype.are_batchers_initialized = function() {
      return !!this.request_batchers.events;
    };
    MixpanelLib.prototype.init_batchers = function() {
      var token = this.get_config("token");
      if (!this.are_batchers_initialized()) {
        var batcher_for = _3.bind(function(attrs) {
          return new RequestBatcher("__mpq_" + token + attrs.queue_suffix, {
            libConfig: this["config"],
            sendRequestFunc: _3.bind(function(data, options, cb) {
              this._send_request(this.get_config("api_host") + attrs.endpoint, this._encode_data_for_request(data), options, this._prepare_callback(cb, data));
            }, this),
            beforeSendHook: _3.bind(function(item) {
              return this._run_hook("before_send_" + attrs.type, item);
            }, this),
            errorReporter: this.get_config("error_reporter"),
            stopAllBatchingFunc: _3.bind(this.stop_batch_senders, this)
          });
        }, this);
        this.request_batchers = {
          events: batcher_for({type: "events", endpoint: "/track/", queue_suffix: "_ev"}),
          people: batcher_for({type: "people", endpoint: "/engage/", queue_suffix: "_pp"}),
          groups: batcher_for({type: "groups", endpoint: "/groups/", queue_suffix: "_gr"})
        };
      }
      if (this.get_config("batch_autostart")) {
        this.start_batch_senders();
      }
    };
    MixpanelLib.prototype.start_batch_senders = function() {
      if (this.are_batchers_initialized()) {
        this._batch_requests = true;
        _3.each(this.request_batchers, function(batcher) {
          batcher.start();
        });
      }
    };
    MixpanelLib.prototype.stop_batch_senders = function() {
      this._batch_requests = false;
      _3.each(this.request_batchers, function(batcher) {
        batcher.stop();
        batcher.clear();
      });
    };
    MixpanelLib.prototype.push = function(item) {
      this._execute_array([item]);
    };
    MixpanelLib.prototype.disable = function(events) {
      if (typeof events === "undefined") {
        this._flags.disable_all_events = true;
      } else {
        this.__disabled_events = this.__disabled_events.concat(events);
      }
    };
    MixpanelLib.prototype._encode_data_for_request = function(data) {
      var encoded_data = _3.JSONEncode(data);
      if (this.get_config("api_payload_format") === PAYLOAD_TYPE_BASE64) {
        encoded_data = _3.base64Encode(encoded_data);
      }
      return {data: encoded_data};
    };
    MixpanelLib.prototype._track_or_batch = function(options, callback) {
      var truncated_data = _3.truncate(options.data, 255);
      var endpoint = options.endpoint;
      var batcher = options.batcher;
      var should_send_immediately = options.should_send_immediately;
      var send_request_options = options.send_request_options || {};
      callback = callback || NOOP_FUNC;
      var request_enqueued_or_initiated = true;
      var send_request_immediately = _3.bind(function() {
        if (!send_request_options.skip_hooks) {
          truncated_data = this._run_hook("before_send_" + options.type, truncated_data);
        }
        if (truncated_data) {
          console2.log("MIXPANEL REQUEST:");
          console2.log(truncated_data);
          return this._send_request(endpoint, this._encode_data_for_request(truncated_data), send_request_options, this._prepare_callback(callback, truncated_data));
        } else {
          return null;
        }
      }, this);
      if (this._batch_requests && !should_send_immediately) {
        batcher.enqueue(truncated_data, function(succeeded) {
          if (succeeded) {
            callback(1, truncated_data);
          } else {
            send_request_immediately();
          }
        });
      } else {
        request_enqueued_or_initiated = send_request_immediately();
      }
      return request_enqueued_or_initiated && truncated_data;
    };
    MixpanelLib.prototype.track = addOptOutCheckMixpanelLib(function(event_name, properties, options, callback) {
      if (!callback && typeof options === "function") {
        callback = options;
        options = null;
      }
      options = options || {};
      var transport = options["transport"];
      if (transport) {
        options.transport = transport;
      }
      var should_send_immediately = options["send_immediately"];
      if (typeof callback !== "function") {
        callback = NOOP_FUNC;
      }
      if (_3.isUndefined(event_name)) {
        this.report_error("No event name provided to mixpanel.track");
        return;
      }
      if (this._event_is_disabled(event_name)) {
        callback(0);
        return;
      }
      properties = properties || {};
      properties["token"] = this.get_config("token");
      var start_timestamp = this["persistence"].remove_event_timer(event_name);
      if (!_3.isUndefined(start_timestamp)) {
        var duration_in_ms = new Date().getTime() - start_timestamp;
        properties["$duration"] = parseFloat((duration_in_ms / 1e3).toFixed(3));
      }
      this._set_default_superprops();
      properties = _3.extend({}, _3.info.properties(), this["persistence"].properties(), this.unpersisted_superprops, properties);
      var property_blacklist = this.get_config("property_blacklist");
      if (_3.isArray(property_blacklist)) {
        _3.each(property_blacklist, function(blacklisted_prop) {
          delete properties[blacklisted_prop];
        });
      } else {
        this.report_error("Invalid value for property_blacklist config: " + property_blacklist);
      }
      var data = {
        event: event_name,
        properties
      };
      var ret = this._track_or_batch({
        type: "events",
        data,
        endpoint: this.get_config("api_host") + "/track/",
        batcher: this.request_batchers.events,
        should_send_immediately,
        send_request_options: options
      }, callback);
      return ret;
    });
    MixpanelLib.prototype.set_group = addOptOutCheckMixpanelLib(function(group_key, group_ids, callback) {
      if (!_3.isArray(group_ids)) {
        group_ids = [group_ids];
      }
      var prop3 = {};
      prop3[group_key] = group_ids;
      this.register(prop3);
      return this["people"].set(group_key, group_ids, callback);
    });
    MixpanelLib.prototype.add_group = addOptOutCheckMixpanelLib(function(group_key, group_id, callback) {
      var old_values = this.get_property(group_key);
      if (old_values === void 0) {
        var prop3 = {};
        prop3[group_key] = [group_id];
        this.register(prop3);
      } else {
        if (old_values.indexOf(group_id) === -1) {
          old_values.push(group_id);
          this.register(prop3);
        }
      }
      return this["people"].union(group_key, group_id, callback);
    });
    MixpanelLib.prototype.remove_group = addOptOutCheckMixpanelLib(function(group_key, group_id, callback) {
      var old_value = this.get_property(group_key);
      if (old_value !== void 0) {
        var idx = old_value.indexOf(group_id);
        if (idx > -1) {
          old_value.splice(idx, 1);
          this.register({group_key: old_value});
        }
        if (old_value.length === 0) {
          this.unregister(group_key);
        }
      }
      return this["people"].remove(group_key, group_id, callback);
    });
    MixpanelLib.prototype.track_with_groups = addOptOutCheckMixpanelLib(function(event_name, properties, groups, callback) {
      var tracking_props = _3.extend({}, properties || {});
      _3.each(groups, function(v2, k2) {
        if (v2 !== null && v2 !== void 0) {
          tracking_props[k2] = v2;
        }
      });
      return this.track(event_name, tracking_props, callback);
    });
    MixpanelLib.prototype._create_map_key = function(group_key, group_id) {
      return group_key + "_" + JSON.stringify(group_id);
    };
    MixpanelLib.prototype._remove_group_from_cache = function(group_key, group_id) {
      delete this._cached_groups[this._create_map_key(group_key, group_id)];
    };
    MixpanelLib.prototype.get_group = function(group_key, group_id) {
      var map_key = this._create_map_key(group_key, group_id);
      var group = this._cached_groups[map_key];
      if (group === void 0 || group._group_key !== group_key || group._group_id !== group_id) {
        group = new MixpanelGroup();
        group._init(this, group_key, group_id);
        this._cached_groups[map_key] = group;
      }
      return group;
    };
    MixpanelLib.prototype.track_pageview = function(page) {
      if (_3.isUndefined(page)) {
        page = document$1.location.href;
      }
      this.track("mp_page_view", _3.info.pageviewInfo(page));
    };
    MixpanelLib.prototype.track_links = function() {
      return this._track_dom.call(this, LinkTracker, arguments);
    };
    MixpanelLib.prototype.track_forms = function() {
      return this._track_dom.call(this, FormTracker, arguments);
    };
    MixpanelLib.prototype.time_event = function(event_name) {
      if (_3.isUndefined(event_name)) {
        this.report_error("No event name provided to mixpanel.time_event");
        return;
      }
      if (this._event_is_disabled(event_name)) {
        return;
      }
      this["persistence"].set_event_timer(event_name, new Date().getTime());
    };
    var REGISTER_DEFAULTS = {
      persistent: true
    };
    var options_for_register = function(days_or_options) {
      var options;
      if (_3.isObject(days_or_options)) {
        options = days_or_options;
      } else if (!_3.isUndefined(days_or_options)) {
        options = {days: days_or_options};
      } else {
        options = {};
      }
      return _3.extend({}, REGISTER_DEFAULTS, options);
    };
    MixpanelLib.prototype.register = function(props, days_or_options) {
      var options = options_for_register(days_or_options);
      if (options["persistent"]) {
        this["persistence"].register(props, options["days"]);
      } else {
        _3.extend(this.unpersisted_superprops, props);
      }
    };
    MixpanelLib.prototype.register_once = function(props, default_value, days_or_options) {
      var options = options_for_register(days_or_options);
      if (options["persistent"]) {
        this["persistence"].register_once(props, default_value, options["days"]);
      } else {
        if (typeof default_value === "undefined") {
          default_value = "None";
        }
        _3.each(props, function(val, prop3) {
          if (!this.unpersisted_superprops.hasOwnProperty(prop3) || this.unpersisted_superprops[prop3] === default_value) {
            this.unpersisted_superprops[prop3] = val;
          }
        }, this);
      }
    };
    MixpanelLib.prototype.unregister = function(property, options) {
      options = options_for_register(options);
      if (options["persistent"]) {
        this["persistence"].unregister(property);
      } else {
        delete this.unpersisted_superprops[property];
      }
    };
    MixpanelLib.prototype._register_single = function(prop3, value) {
      var props = {};
      props[prop3] = value;
      this.register(props);
    };
    MixpanelLib.prototype.identify = function(new_distinct_id, _set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback) {
      var previous_distinct_id = this.get_distinct_id();
      this.register({$user_id: new_distinct_id});
      if (!this.get_property("$device_id")) {
        var device_id = previous_distinct_id;
        this.register_once({
          $had_persisted_distinct_id: true,
          $device_id: device_id
        }, "");
      }
      if (new_distinct_id !== previous_distinct_id && new_distinct_id !== this.get_property(ALIAS_ID_KEY)) {
        this.unregister(ALIAS_ID_KEY);
        this.register({distinct_id: new_distinct_id});
      }
      this._flags.identify_called = true;
      this["people"]._flush(_set_callback, _add_callback, _append_callback, _set_once_callback, _union_callback, _unset_callback, _remove_callback);
      if (new_distinct_id !== previous_distinct_id) {
        this.track("$identify", {
          distinct_id: new_distinct_id,
          $anon_distinct_id: previous_distinct_id
        }, {skip_hooks: true});
      }
    };
    MixpanelLib.prototype.reset = function() {
      this["persistence"].clear();
      this._flags.identify_called = false;
      var uuid = _3.UUID();
      this.register_once({
        distinct_id: uuid,
        $device_id: uuid
      }, "");
    };
    MixpanelLib.prototype.get_distinct_id = function() {
      return this.get_property("distinct_id");
    };
    MixpanelLib.prototype.alias = function(alias, original) {
      if (alias === this.get_property(PEOPLE_DISTINCT_ID_KEY)) {
        this.report_error("Attempting to create alias for existing People user - aborting.");
        return -2;
      }
      var _this = this;
      if (_3.isUndefined(original)) {
        original = this.get_distinct_id();
      }
      if (alias !== original) {
        this._register_single(ALIAS_ID_KEY, alias);
        return this.track("$create_alias", {
          alias,
          distinct_id: original
        }, {
          skip_hooks: true
        }, function() {
          _this.identify(alias);
        });
      } else {
        this.report_error("alias matches current distinct_id - skipping api call.");
        this.identify(alias);
        return -1;
      }
    };
    MixpanelLib.prototype.name_tag = function(name_tag) {
      this._register_single("mp_name_tag", name_tag);
    };
    MixpanelLib.prototype.set_config = function(config) {
      if (_3.isObject(config)) {
        _3.extend(this["config"], config);
        var new_batch_size = config["batch_size"];
        if (new_batch_size) {
          _3.each(this.request_batchers, function(batcher) {
            batcher.resetBatchSize();
          });
        }
        if (!this.get_config("persistence_name")) {
          this["config"]["persistence_name"] = this["config"]["cookie_name"];
        }
        if (!this.get_config("disable_persistence")) {
          this["config"]["disable_persistence"] = this["config"]["disable_cookie"];
        }
        if (this["persistence"]) {
          this["persistence"].update_config(this["config"]);
        }
        Config.DEBUG = Config.DEBUG || this.get_config("debug");
      }
    };
    MixpanelLib.prototype.get_config = function(prop_name) {
      return this["config"][prop_name];
    };
    MixpanelLib.prototype._run_hook = function(hook_name) {
      var ret = (this["config"]["hooks"][hook_name] || IDENTITY_FUNC).apply(this, slice3.call(arguments, 1));
      if (typeof ret === "undefined") {
        this.report_error(hook_name + " hook did not return a value");
        ret = null;
      }
      return ret;
    };
    MixpanelLib.prototype.get_property = function(property_name) {
      return this["persistence"]["props"][property_name];
    };
    MixpanelLib.prototype.toString = function() {
      var name = this.get_config("name");
      if (name !== PRIMARY_INSTANCE_NAME) {
        name = PRIMARY_INSTANCE_NAME + "." + name;
      }
      return name;
    };
    MixpanelLib.prototype._event_is_disabled = function(event_name) {
      return _3.isBlockedUA(userAgent) || this._flags.disable_all_events || _3.include(this.__disabled_events, event_name);
    };
    MixpanelLib.prototype._gdpr_init = function() {
      var is_localStorage_requested = this.get_config("opt_out_tracking_persistence_type") === "localStorage";
      if (is_localStorage_requested && _3.localStorage.is_supported()) {
        if (!this.has_opted_in_tracking() && this.has_opted_in_tracking({persistence_type: "cookie"})) {
          this.opt_in_tracking({enable_persistence: false});
        }
        if (!this.has_opted_out_tracking() && this.has_opted_out_tracking({persistence_type: "cookie"})) {
          this.opt_out_tracking({clear_persistence: false});
        }
        this.clear_opt_in_out_tracking({
          persistence_type: "cookie",
          enable_persistence: false
        });
      }
      if (this.has_opted_out_tracking()) {
        this._gdpr_update_persistence({clear_persistence: true});
      } else if (!this.has_opted_in_tracking() && (this.get_config("opt_out_tracking_by_default") || _3.cookie.get("mp_optout"))) {
        _3.cookie.remove("mp_optout");
        this.opt_out_tracking({
          clear_persistence: this.get_config("opt_out_persistence_by_default")
        });
      }
    };
    MixpanelLib.prototype._gdpr_update_persistence = function(options) {
      var disabled;
      if (options && options["clear_persistence"]) {
        disabled = true;
      } else if (options && options["enable_persistence"]) {
        disabled = false;
      } else {
        return;
      }
      if (!this.get_config("disable_persistence") && this["persistence"].disabled !== disabled) {
        this["persistence"].set_disabled(disabled);
      }
      if (disabled) {
        _3.each(this.request_batchers, function(batcher) {
          batcher.clear();
        });
      }
    };
    MixpanelLib.prototype._gdpr_call_func = function(func, options) {
      options = _3.extend({
        track: _3.bind(this.track, this),
        persistence_type: this.get_config("opt_out_tracking_persistence_type"),
        cookie_prefix: this.get_config("opt_out_tracking_cookie_prefix"),
        cookie_expiration: this.get_config("cookie_expiration"),
        cross_site_cookie: this.get_config("cross_site_cookie"),
        cross_subdomain_cookie: this.get_config("cross_subdomain_cookie"),
        cookie_domain: this.get_config("cookie_domain"),
        secure_cookie: this.get_config("secure_cookie"),
        ignore_dnt: this.get_config("ignore_dnt")
      }, options);
      if (!_3.localStorage.is_supported()) {
        options["persistence_type"] = "cookie";
      }
      return func(this.get_config("token"), {
        track: options["track"],
        trackEventName: options["track_event_name"],
        trackProperties: options["track_properties"],
        persistenceType: options["persistence_type"],
        persistencePrefix: options["cookie_prefix"],
        cookieDomain: options["cookie_domain"],
        cookieExpiration: options["cookie_expiration"],
        crossSiteCookie: options["cross_site_cookie"],
        crossSubdomainCookie: options["cross_subdomain_cookie"],
        secureCookie: options["secure_cookie"],
        ignoreDnt: options["ignore_dnt"]
      });
    };
    MixpanelLib.prototype.opt_in_tracking = function(options) {
      options = _3.extend({
        enable_persistence: true
      }, options);
      this._gdpr_call_func(optIn, options);
      this._gdpr_update_persistence(options);
    };
    MixpanelLib.prototype.opt_out_tracking = function(options) {
      options = _3.extend({
        clear_persistence: true,
        delete_user: true
      }, options);
      if (options["delete_user"] && this["people"] && this["people"]._identify_called()) {
        this["people"].delete_user();
        this["people"].clear_charges();
      }
      this._gdpr_call_func(optOut, options);
      this._gdpr_update_persistence(options);
    };
    MixpanelLib.prototype.has_opted_in_tracking = function(options) {
      return this._gdpr_call_func(hasOptedIn, options);
    };
    MixpanelLib.prototype.has_opted_out_tracking = function(options) {
      return this._gdpr_call_func(hasOptedOut, options);
    };
    MixpanelLib.prototype.clear_opt_in_out_tracking = function(options) {
      options = _3.extend({
        enable_persistence: true
      }, options);
      this._gdpr_call_func(clearOptInOut, options);
      this._gdpr_update_persistence(options);
    };
    MixpanelLib.prototype.report_error = function(msg, err) {
      console2.error.apply(console2.error, arguments);
      try {
        if (!err && !(msg instanceof Error)) {
          msg = new Error(msg);
        }
        this.get_config("error_reporter")(msg, err);
      } catch (err2) {
        console2.error(err2);
      }
    };
    MixpanelLib.prototype["init"] = MixpanelLib.prototype.init;
    MixpanelLib.prototype["reset"] = MixpanelLib.prototype.reset;
    MixpanelLib.prototype["disable"] = MixpanelLib.prototype.disable;
    MixpanelLib.prototype["time_event"] = MixpanelLib.prototype.time_event;
    MixpanelLib.prototype["track"] = MixpanelLib.prototype.track;
    MixpanelLib.prototype["track_links"] = MixpanelLib.prototype.track_links;
    MixpanelLib.prototype["track_forms"] = MixpanelLib.prototype.track_forms;
    MixpanelLib.prototype["track_pageview"] = MixpanelLib.prototype.track_pageview;
    MixpanelLib.prototype["register"] = MixpanelLib.prototype.register;
    MixpanelLib.prototype["register_once"] = MixpanelLib.prototype.register_once;
    MixpanelLib.prototype["unregister"] = MixpanelLib.prototype.unregister;
    MixpanelLib.prototype["identify"] = MixpanelLib.prototype.identify;
    MixpanelLib.prototype["alias"] = MixpanelLib.prototype.alias;
    MixpanelLib.prototype["name_tag"] = MixpanelLib.prototype.name_tag;
    MixpanelLib.prototype["set_config"] = MixpanelLib.prototype.set_config;
    MixpanelLib.prototype["get_config"] = MixpanelLib.prototype.get_config;
    MixpanelLib.prototype["get_property"] = MixpanelLib.prototype.get_property;
    MixpanelLib.prototype["get_distinct_id"] = MixpanelLib.prototype.get_distinct_id;
    MixpanelLib.prototype["toString"] = MixpanelLib.prototype.toString;
    MixpanelLib.prototype["opt_out_tracking"] = MixpanelLib.prototype.opt_out_tracking;
    MixpanelLib.prototype["opt_in_tracking"] = MixpanelLib.prototype.opt_in_tracking;
    MixpanelLib.prototype["has_opted_out_tracking"] = MixpanelLib.prototype.has_opted_out_tracking;
    MixpanelLib.prototype["has_opted_in_tracking"] = MixpanelLib.prototype.has_opted_in_tracking;
    MixpanelLib.prototype["clear_opt_in_out_tracking"] = MixpanelLib.prototype.clear_opt_in_out_tracking;
    MixpanelLib.prototype["get_group"] = MixpanelLib.prototype.get_group;
    MixpanelLib.prototype["set_group"] = MixpanelLib.prototype.set_group;
    MixpanelLib.prototype["add_group"] = MixpanelLib.prototype.add_group;
    MixpanelLib.prototype["remove_group"] = MixpanelLib.prototype.remove_group;
    MixpanelLib.prototype["track_with_groups"] = MixpanelLib.prototype.track_with_groups;
    MixpanelLib.prototype["start_batch_senders"] = MixpanelLib.prototype.start_batch_senders;
    MixpanelLib.prototype["stop_batch_senders"] = MixpanelLib.prototype.stop_batch_senders;
    MixpanelPersistence.prototype["properties"] = MixpanelPersistence.prototype.properties;
    MixpanelPersistence.prototype["update_search_keyword"] = MixpanelPersistence.prototype.update_search_keyword;
    MixpanelPersistence.prototype["update_referrer_info"] = MixpanelPersistence.prototype.update_referrer_info;
    MixpanelPersistence.prototype["get_cross_subdomain"] = MixpanelPersistence.prototype.get_cross_subdomain;
    MixpanelPersistence.prototype["clear"] = MixpanelPersistence.prototype.clear;
    var instances = {};
    var extend_mp = function() {
      _3.each(instances, function(instance, name) {
        if (name !== PRIMARY_INSTANCE_NAME) {
          mixpanel_master[name] = instance;
        }
      });
      mixpanel_master["_"] = _3;
    };
    var override_mp_init_func = function() {
      mixpanel_master["init"] = function(token, config, name) {
        if (name) {
          if (!mixpanel_master[name]) {
            mixpanel_master[name] = instances[name] = create_mplib(token, config, name);
            mixpanel_master[name]._loaded();
          }
          return mixpanel_master[name];
        } else {
          var instance = mixpanel_master;
          if (instances[PRIMARY_INSTANCE_NAME]) {
            instance = instances[PRIMARY_INSTANCE_NAME];
          } else if (token) {
            instance = create_mplib(token, config, PRIMARY_INSTANCE_NAME);
            instance._loaded();
            instances[PRIMARY_INSTANCE_NAME] = instance;
          }
          mixpanel_master = instance;
          if (init_type === INIT_SNIPPET) {
            window$1[PRIMARY_INSTANCE_NAME] = mixpanel_master;
          }
          extend_mp();
        }
      };
    };
    var add_dom_loaded_handler = function() {
      function dom_loaded_handler() {
        if (dom_loaded_handler.done) {
          return;
        }
        dom_loaded_handler.done = true;
        DOM_LOADED = true;
        ENQUEUE_REQUESTS = false;
        _3.each(instances, function(inst) {
          inst._dom_loaded();
        });
      }
      function do_scroll_check() {
        try {
          document$1.documentElement.doScroll("left");
        } catch (e3) {
          setTimeout(do_scroll_check, 1);
          return;
        }
        dom_loaded_handler();
      }
      if (document$1.addEventListener) {
        if (document$1.readyState === "complete") {
          dom_loaded_handler();
        } else {
          document$1.addEventListener("DOMContentLoaded", dom_loaded_handler, false);
        }
      } else if (document$1.attachEvent) {
        document$1.attachEvent("onreadystatechange", dom_loaded_handler);
        var toplevel = false;
        try {
          toplevel = window$1.frameElement === null;
        } catch (e3) {
        }
        if (document$1.documentElement.doScroll && toplevel) {
          do_scroll_check();
        }
      }
      _3.register_event(window$1, "load", dom_loaded_handler, true);
    };
    function init_as_module() {
      init_type = INIT_MODULE;
      mixpanel_master = new MixpanelLib();
      override_mp_init_func();
      mixpanel_master["init"]();
      add_dom_loaded_handler();
      return mixpanel_master;
    }
    var mixpanel3 = init_as_module();
    module.exports = mixpanel3;
  });

  // node_modules/react-modal/lib/helpers/tabbable.js
  var require_tabbable = __commonJS((exports, module) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = findTabbableDescendants;
    /*!
     * Adapted from jQuery UI core
     *
     * http://jqueryui.com
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/category/ui-core/
     */
    var tabbableNode = /input|select|textarea|button|object/;
    function hidesContents(element) {
      var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;
      if (zeroSize && !element.innerHTML)
        return true;
      try {
        var style = window.getComputedStyle(element);
        return zeroSize ? style.getPropertyValue("overflow") !== "visible" || element.scrollWidth <= 0 && element.scrollHeight <= 0 : style.getPropertyValue("display") == "none";
      } catch (exception) {
        console.warn("Failed to inspect element style");
        return false;
      }
    }
    function visible(element) {
      var parentElement = element;
      var rootNode = element.getRootNode && element.getRootNode();
      while (parentElement) {
        if (parentElement === document.body)
          break;
        if (rootNode && parentElement === rootNode)
          parentElement = rootNode.host.parentNode;
        if (hidesContents(parentElement))
          return false;
        parentElement = parentElement.parentNode;
      }
      return true;
    }
    function focusable(element, isTabIndexNotNaN) {
      var nodeName = element.nodeName.toLowerCase();
      var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
      return res && visible(element);
    }
    function tabbable(element) {
      var tabIndex = element.getAttribute("tabindex");
      if (tabIndex === null)
        tabIndex = void 0;
      var isTabIndexNaN = isNaN(tabIndex);
      return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
    }
    function findTabbableDescendants(element) {
      var descendants = [].slice.call(element.querySelectorAll("*"), 0).reduce(function(finished, el) {
        return finished.concat(!el.shadowRoot ? [el] : findTabbableDescendants(el.shadowRoot));
      }, []);
      return descendants.filter(tabbable);
    }
    module.exports = exports["default"];
  });

  // node_modules/react-modal/lib/helpers/focusManager.js
  var require_focusManager = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resetState = resetState;
    exports.log = log;
    exports.handleBlur = handleBlur;
    exports.handleFocus = handleFocus;
    exports.markForFocusLater = markForFocusLater;
    exports.returnFocus = returnFocus;
    exports.popWithoutFocus = popWithoutFocus;
    exports.setupScopedFocus = setupScopedFocus;
    exports.teardownScopedFocus = teardownScopedFocus;
    var _tabbable = require_tabbable();
    var _tabbable2 = _interopRequireDefault(_tabbable);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var focusLaterElements = [];
    var modalElement = null;
    var needToFocus = false;
    function resetState() {
      focusLaterElements = [];
    }
    function log() {
      if (false) {
        console.log("focusManager ----------");
        focusLaterElements.forEach(function(f3) {
          var check = f3 || {};
          console.log(check.nodeName, check.className, check.id);
        });
        console.log("end focusManager ----------");
      }
    }
    function handleBlur() {
      needToFocus = true;
    }
    function handleFocus() {
      if (needToFocus) {
        needToFocus = false;
        if (!modalElement) {
          return;
        }
        setTimeout(function() {
          if (modalElement.contains(document.activeElement)) {
            return;
          }
          var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
          el.focus();
        }, 0);
      }
    }
    function markForFocusLater() {
      focusLaterElements.push(document.activeElement);
    }
    function returnFocus() {
      var preventScroll = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var toFocus = null;
      try {
        if (focusLaterElements.length !== 0) {
          toFocus = focusLaterElements.pop();
          toFocus.focus({preventScroll});
        }
        return;
      } catch (e3) {
        console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
      }
    }
    function popWithoutFocus() {
      focusLaterElements.length > 0 && focusLaterElements.pop();
    }
    function setupScopedFocus(element) {
      modalElement = element;
      if (window.addEventListener) {
        window.addEventListener("blur", handleBlur, false);
        document.addEventListener("focus", handleFocus, true);
      } else {
        window.attachEvent("onBlur", handleBlur);
        document.attachEvent("onFocus", handleFocus);
      }
    }
    function teardownScopedFocus() {
      modalElement = null;
      if (window.addEventListener) {
        window.removeEventListener("blur", handleBlur);
        document.removeEventListener("focus", handleFocus);
      } else {
        window.detachEvent("onBlur", handleBlur);
        document.detachEvent("onFocus", handleFocus);
      }
    }
  });

  // node_modules/react-modal/lib/helpers/scopeTab.js
  var require_scopeTab = __commonJS((exports, module) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = scopeTab;
    var _tabbable = require_tabbable();
    var _tabbable2 = _interopRequireDefault(_tabbable);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function getActiveElement() {
      var el = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
      return el.activeElement.shadowRoot ? getActiveElement(el.activeElement.shadowRoot) : el.activeElement;
    }
    function scopeTab(node, event) {
      var tabbable = (0, _tabbable2.default)(node);
      if (!tabbable.length) {
        event.preventDefault();
        return;
      }
      var target = void 0;
      var shiftKey = event.shiftKey;
      var head2 = tabbable[0];
      var tail2 = tabbable[tabbable.length - 1];
      var activeElement = getActiveElement();
      if (node === activeElement) {
        if (!shiftKey)
          return;
        target = tail2;
      }
      if (tail2 === activeElement && !shiftKey) {
        target = head2;
      }
      if (head2 === activeElement && shiftKey) {
        target = tail2;
      }
      if (target) {
        event.preventDefault();
        target.focus();
        return;
      }
      var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
      var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;
      if (!isSafariDesktop)
        return;
      var x2 = tabbable.indexOf(activeElement);
      if (x2 > -1) {
        x2 += shiftKey ? -1 : 1;
      }
      target = tabbable[x2];
      if (typeof target === "undefined") {
        event.preventDefault();
        target = shiftKey ? tail2 : head2;
        target.focus();
        return;
      }
      event.preventDefault();
      target.focus();
    }
    module.exports = exports["default"];
  });

  // node_modules/warning/warning.js
  var require_warning = __commonJS((exports, module) => {
    "use strict";
    var __DEV__ = false;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x2) {
        }
      };
      warning2 = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === void 0) {
          throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
        }
        if (!condition) {
          printWarning.apply(null, [format].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning2;
  });

  // node_modules/exenv/index.js
  var require_exenv = __commonJS((exports, module) => {
    /*!
      Copyright (c) 2015 Jed Watson.
      Based on code that is Copyright 2013-2015, Facebook, Inc.
      All rights reserved.
    */
    (function() {
      "use strict";
      var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
      var ExecutionEnvironment = {
        canUseDOM,
        canUseWorkers: typeof Worker !== "undefined",
        canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
        canUseViewport: canUseDOM && !!window.screen
      };
      if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define(function() {
          return ExecutionEnvironment;
        });
      } else if (typeof module !== "undefined" && module.exports) {
        module.exports = ExecutionEnvironment;
      } else {
        window.ExecutionEnvironment = ExecutionEnvironment;
      }
    })();
  });

  // node_modules/react-modal/lib/helpers/safeHTMLElement.js
  var require_safeHTMLElement = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.canUseDOM = exports.SafeNodeList = exports.SafeHTMLCollection = void 0;
    var _exenv = require_exenv();
    var _exenv2 = _interopRequireDefault(_exenv);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var EE = _exenv2.default;
    var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};
    var SafeHTMLCollection = exports.SafeHTMLCollection = EE.canUseDOM ? window.HTMLCollection : {};
    var SafeNodeList = exports.SafeNodeList = EE.canUseDOM ? window.NodeList : {};
    var canUseDOM = exports.canUseDOM = EE.canUseDOM;
    exports.default = SafeHTMLElement;
  });

  // node_modules/react-modal/lib/helpers/ariaAppHider.js
  var require_ariaAppHider = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resetState = resetState;
    exports.log = log;
    exports.assertNodeList = assertNodeList;
    exports.setElement = setElement;
    exports.validateElement = validateElement;
    exports.hide = hide;
    exports.show = show;
    exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
    var _warning = require_warning();
    var _warning2 = _interopRequireDefault(_warning);
    var _safeHTMLElement = require_safeHTMLElement();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var globalElement = null;
    function resetState() {
      if (globalElement) {
        if (globalElement.removeAttribute) {
          globalElement.removeAttribute("aria-hidden");
        } else if (globalElement.length != null) {
          globalElement.forEach(function(element) {
            return element.removeAttribute("aria-hidden");
          });
        } else {
          document.querySelectorAll(globalElement).forEach(function(element) {
            return element.removeAttribute("aria-hidden");
          });
        }
      }
      globalElement = null;
    }
    function log() {
      if (false) {
        var check = globalElement || {};
        console.log("ariaAppHider ----------");
        console.log(check.nodeName, check.className, check.id);
        console.log("end ariaAppHider ----------");
      }
    }
    function assertNodeList(nodeList, selector) {
      if (!nodeList || !nodeList.length) {
        throw new Error("react-modal: No elements were found for selector " + selector + ".");
      }
    }
    function setElement(element) {
      var useElement = element;
      if (typeof useElement === "string" && _safeHTMLElement.canUseDOM) {
        var el = document.querySelectorAll(useElement);
        assertNodeList(el, useElement);
        useElement = el;
      }
      globalElement = useElement || globalElement;
      return globalElement;
    }
    function validateElement(appElement) {
      var el = appElement || globalElement;
      if (el) {
        return Array.isArray(el) || el instanceof HTMLCollection || el instanceof NodeList ? el : [el];
      } else {
        (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));
        return [];
      }
    }
    function hide(appElement) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = validateElement(appElement)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;
          el.setAttribute("aria-hidden", "true");
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
    }
    function show(appElement) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = void 0;
      try {
        for (var _iterator2 = validateElement(appElement)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var el = _step2.value;
          el.removeAttribute("aria-hidden");
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
    function documentNotReadyOrSSRTesting() {
      globalElement = null;
    }
  });

  // node_modules/react-modal/lib/helpers/classList.js
  var require_classList = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resetState = resetState;
    exports.log = log;
    var htmlClassList = {};
    var docBodyClassList = {};
    function removeClass(at, cls) {
      at.classList.remove(cls);
    }
    function resetState() {
      var htmlElement = document.getElementsByTagName("html")[0];
      for (var cls in htmlClassList) {
        removeClass(htmlElement, htmlClassList[cls]);
      }
      var body = document.body;
      for (var _cls in docBodyClassList) {
        removeClass(body, docBodyClassList[_cls]);
      }
      htmlClassList = {};
      docBodyClassList = {};
    }
    function log() {
      if (false) {
        var classes = document.getElementsByTagName("html")[0].className;
        var buffer = "Show tracked classes:\n\n";
        buffer += "<html /> (" + classes + "):\n  ";
        for (var x2 in htmlClassList) {
          buffer += "  " + x2 + " " + htmlClassList[x2] + "\n  ";
        }
        classes = document.body.className;
        buffer += "\n\ndoc.body (" + classes + "):\n  ";
        for (var _x in docBodyClassList) {
          buffer += "  " + _x + " " + docBodyClassList[_x] + "\n  ";
        }
        buffer += "\n";
        console.log(buffer);
      }
    }
    var incrementReference = function incrementReference2(poll, className) {
      if (!poll[className]) {
        poll[className] = 0;
      }
      poll[className] += 1;
      return className;
    };
    var decrementReference = function decrementReference2(poll, className) {
      if (poll[className]) {
        poll[className] -= 1;
      }
      return className;
    };
    var trackClass = function trackClass2(classListRef, poll, classes) {
      classes.forEach(function(className) {
        incrementReference(poll, className);
        classListRef.add(className);
      });
    };
    var untrackClass = function untrackClass2(classListRef, poll, classes) {
      classes.forEach(function(className) {
        decrementReference(poll, className);
        poll[className] === 0 && classListRef.remove(className);
      });
    };
    var add = exports.add = function add2(element, classString) {
      return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
    };
    var remove = exports.remove = function remove2(element, classString) {
      return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
    };
  });

  // node_modules/react-modal/lib/helpers/portalOpenInstances.js
  var require_portalOpenInstances = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.log = log;
    exports.resetState = resetState;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var PortalOpenInstances = function PortalOpenInstances2() {
      var _this = this;
      _classCallCheck(this, PortalOpenInstances2);
      this.register = function(openInstance) {
        if (_this.openInstances.indexOf(openInstance) !== -1) {
          if (false) {
            console.warn("React-Modal: Cannot register modal instance that's already open");
          }
          return;
        }
        _this.openInstances.push(openInstance);
        _this.emit("register");
      };
      this.deregister = function(openInstance) {
        var index = _this.openInstances.indexOf(openInstance);
        if (index === -1) {
          if (false) {
            console.warn("React-Modal: Unable to deregister " + openInstance + " as it was never registered");
          }
          return;
        }
        _this.openInstances.splice(index, 1);
        _this.emit("deregister");
      };
      this.subscribe = function(callback) {
        _this.subscribers.push(callback);
      };
      this.emit = function(eventType) {
        _this.subscribers.forEach(function(subscriber) {
          return subscriber(eventType, _this.openInstances.slice());
        });
      };
      this.openInstances = [];
      this.subscribers = [];
    };
    var portalOpenInstances = new PortalOpenInstances();
    function log() {
      console.log("portalOpenInstances ----------");
      console.log(portalOpenInstances.openInstances.length);
      portalOpenInstances.openInstances.forEach(function(p3) {
        return console.log(p3);
      });
      console.log("end portalOpenInstances ----------");
    }
    function resetState() {
      portalOpenInstances = new PortalOpenInstances();
    }
    exports.default = portalOpenInstances;
  });

  // node_modules/react-modal/lib/helpers/bodyTrap.js
  var require_bodyTrap = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.resetState = resetState;
    exports.log = log;
    var _portalOpenInstances = require_portalOpenInstances();
    var _portalOpenInstances2 = _interopRequireDefault(_portalOpenInstances);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var before = void 0;
    var after = void 0;
    var instances = [];
    function resetState() {
      var _arr = [before, after];
      for (var _i = 0; _i < _arr.length; _i++) {
        var item = _arr[_i];
        if (!item)
          continue;
        item.parentNode && item.parentNode.removeChild(item);
      }
      before = after = null;
      instances = [];
    }
    function log() {
      console.log("bodyTrap ----------");
      console.log(instances.length);
      var _arr2 = [before, after];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var item = _arr2[_i2];
        var check = item || {};
        console.log(check.nodeName, check.className, check.id);
      }
      console.log("edn bodyTrap ----------");
    }
    function focusContent() {
      if (instances.length === 0) {
        if (false) {
          console.warn("React-Modal: Open instances > 0 expected");
        }
        return;
      }
      instances[instances.length - 1].focusContent();
    }
    function bodyTrap(eventType, openInstances) {
      if (!before && !after) {
        before = document.createElement("div");
        before.setAttribute("data-react-modal-body-trap", "");
        before.style.position = "absolute";
        before.style.opacity = "0";
        before.setAttribute("tabindex", "0");
        before.addEventListener("focus", focusContent);
        after = before.cloneNode();
        after.addEventListener("focus", focusContent);
      }
      instances = openInstances;
      if (instances.length > 0) {
        if (document.body.firstChild !== before) {
          document.body.insertBefore(before, document.body.firstChild);
        }
        if (document.body.lastChild !== after) {
          document.body.appendChild(after);
        }
      } else {
        if (before.parentElement) {
          before.parentElement.removeChild(before);
        }
        if (after.parentElement) {
          after.parentElement.removeChild(after);
        }
      }
    }
    _portalOpenInstances2.default.subscribe(bodyTrap);
  });

  // node_modules/react-modal/lib/components/ModalPortal.js
  var require_ModalPortal = __commonJS((exports, module) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends2 = Object.assign || function(target) {
      for (var i3 = 1; i3 < arguments.length; i3++) {
        var source = arguments[i3];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _focusManager = require_focusManager();
    var focusManager = _interopRequireWildcard(_focusManager);
    var _scopeTab = require_scopeTab();
    var _scopeTab2 = _interopRequireDefault(_scopeTab);
    var _ariaAppHider = require_ariaAppHider();
    var ariaAppHider = _interopRequireWildcard(_ariaAppHider);
    var _classList = require_classList();
    var classList = _interopRequireWildcard(_classList);
    var _safeHTMLElement = require_safeHTMLElement();
    var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);
    var _portalOpenInstances = require_portalOpenInstances();
    var _portalOpenInstances2 = _interopRequireDefault(_portalOpenInstances);
    require_bodyTrap();
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var CLASS_NAMES = {
      overlay: "ReactModal__Overlay",
      content: "ReactModal__Content"
    };
    var TAB_KEY = 9;
    var ESC_KEY = 27;
    var ariaHiddenInstances = 0;
    var ModalPortal = function(_Component) {
      _inherits(ModalPortal2, _Component);
      function ModalPortal2(props) {
        _classCallCheck(this, ModalPortal2);
        var _this = _possibleConstructorReturn(this, (ModalPortal2.__proto__ || Object.getPrototypeOf(ModalPortal2)).call(this, props));
        _this.setOverlayRef = function(overlay) {
          _this.overlay = overlay;
          _this.props.overlayRef && _this.props.overlayRef(overlay);
        };
        _this.setContentRef = function(content) {
          _this.content = content;
          _this.props.contentRef && _this.props.contentRef(content);
        };
        _this.afterClose = function() {
          var _this$props = _this.props, appElement = _this$props.appElement, ariaHideApp = _this$props.ariaHideApp, htmlOpenClassName = _this$props.htmlOpenClassName, bodyOpenClassName = _this$props.bodyOpenClassName;
          bodyOpenClassName && classList.remove(document.body, bodyOpenClassName);
          htmlOpenClassName && classList.remove(document.getElementsByTagName("html")[0], htmlOpenClassName);
          if (ariaHideApp && ariaHiddenInstances > 0) {
            ariaHiddenInstances -= 1;
            if (ariaHiddenInstances === 0) {
              ariaAppHider.show(appElement);
            }
          }
          if (_this.props.shouldFocusAfterRender) {
            if (_this.props.shouldReturnFocusAfterClose) {
              focusManager.returnFocus(_this.props.preventScroll);
              focusManager.teardownScopedFocus();
            } else {
              focusManager.popWithoutFocus();
            }
          }
          if (_this.props.onAfterClose) {
            _this.props.onAfterClose();
          }
          _portalOpenInstances2.default.deregister(_this);
        };
        _this.open = function() {
          _this.beforeOpen();
          if (_this.state.afterOpen && _this.state.beforeClose) {
            clearTimeout(_this.closeTimer);
            _this.setState({beforeClose: false});
          } else {
            if (_this.props.shouldFocusAfterRender) {
              focusManager.setupScopedFocus(_this.node);
              focusManager.markForFocusLater();
            }
            _this.setState({isOpen: true}, function() {
              _this.openAnimationFrame = requestAnimationFrame(function() {
                _this.setState({afterOpen: true});
                if (_this.props.isOpen && _this.props.onAfterOpen) {
                  _this.props.onAfterOpen({
                    overlayEl: _this.overlay,
                    contentEl: _this.content
                  });
                }
              });
            });
          }
        };
        _this.close = function() {
          if (_this.props.closeTimeoutMS > 0) {
            _this.closeWithTimeout();
          } else {
            _this.closeWithoutTimeout();
          }
        };
        _this.focusContent = function() {
          return _this.content && !_this.contentHasFocus() && _this.content.focus({preventScroll: true});
        };
        _this.closeWithTimeout = function() {
          var closesAt = Date.now() + _this.props.closeTimeoutMS;
          _this.setState({beforeClose: true, closesAt}, function() {
            _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
          });
        };
        _this.closeWithoutTimeout = function() {
          _this.setState({
            beforeClose: false,
            isOpen: false,
            afterOpen: false,
            closesAt: null
          }, _this.afterClose);
        };
        _this.handleKeyDown = function(event) {
          if (event.keyCode === TAB_KEY) {
            (0, _scopeTab2.default)(_this.content, event);
          }
          if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
            event.stopPropagation();
            _this.requestClose(event);
          }
        };
        _this.handleOverlayOnClick = function(event) {
          if (_this.shouldClose === null) {
            _this.shouldClose = true;
          }
          if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
            if (_this.ownerHandlesClose()) {
              _this.requestClose(event);
            } else {
              _this.focusContent();
            }
          }
          _this.shouldClose = null;
        };
        _this.handleContentOnMouseUp = function() {
          _this.shouldClose = false;
        };
        _this.handleOverlayOnMouseDown = function(event) {
          if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
            event.preventDefault();
          }
        };
        _this.handleContentOnClick = function() {
          _this.shouldClose = false;
        };
        _this.handleContentOnMouseDown = function() {
          _this.shouldClose = false;
        };
        _this.requestClose = function(event) {
          return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
        };
        _this.ownerHandlesClose = function() {
          return _this.props.onRequestClose;
        };
        _this.shouldBeClosed = function() {
          return !_this.state.isOpen && !_this.state.beforeClose;
        };
        _this.contentHasFocus = function() {
          return document.activeElement === _this.content || _this.content.contains(document.activeElement);
        };
        _this.buildClassName = function(which, additional) {
          var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
            base: CLASS_NAMES[which],
            afterOpen: CLASS_NAMES[which] + "--after-open",
            beforeClose: CLASS_NAMES[which] + "--before-close"
          };
          var className = classNames.base;
          if (_this.state.afterOpen) {
            className = className + " " + classNames.afterOpen;
          }
          if (_this.state.beforeClose) {
            className = className + " " + classNames.beforeClose;
          }
          return typeof additional === "string" && additional ? className + " " + additional : className;
        };
        _this.attributesFromObject = function(prefix, items) {
          return Object.keys(items).reduce(function(acc, name) {
            acc[prefix + "-" + name] = items[name];
            return acc;
          }, {});
        };
        _this.state = {
          afterOpen: false,
          beforeClose: false
        };
        _this.shouldClose = null;
        _this.moveFromContentToOverlay = null;
        return _this;
      }
      _createClass(ModalPortal2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (this.props.isOpen) {
            this.open();
          }
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
          if (false) {
            if (prevProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
              console.warn('React-Modal: "bodyOpenClassName" prop has been modified. This may cause unexpected behavior when multiple modals are open.');
            }
            if (prevProps.htmlOpenClassName !== this.props.htmlOpenClassName) {
              console.warn('React-Modal: "htmlOpenClassName" prop has been modified. This may cause unexpected behavior when multiple modals are open.');
            }
          }
          if (this.props.isOpen && !prevProps.isOpen) {
            this.open();
          } else if (!this.props.isOpen && prevProps.isOpen) {
            this.close();
          }
          if (this.props.shouldFocusAfterRender && this.state.isOpen && !prevState.isOpen) {
            this.focusContent();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.state.isOpen) {
            this.afterClose();
          }
          clearTimeout(this.closeTimer);
          cancelAnimationFrame(this.openAnimationFrame);
        }
      }, {
        key: "beforeOpen",
        value: function beforeOpen() {
          var _props = this.props, appElement = _props.appElement, ariaHideApp = _props.ariaHideApp, htmlOpenClassName = _props.htmlOpenClassName, bodyOpenClassName = _props.bodyOpenClassName;
          bodyOpenClassName && classList.add(document.body, bodyOpenClassName);
          htmlOpenClassName && classList.add(document.getElementsByTagName("html")[0], htmlOpenClassName);
          if (ariaHideApp) {
            ariaHiddenInstances += 1;
            ariaAppHider.hide(appElement);
          }
          _portalOpenInstances2.default.register(this);
        }
      }, {
        key: "render",
        value: function render() {
          var _props2 = this.props, id = _props2.id, className = _props2.className, overlayClassName = _props2.overlayClassName, defaultStyles = _props2.defaultStyles, children = _props2.children;
          var contentStyles = className ? {} : defaultStyles.content;
          var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;
          if (this.shouldBeClosed()) {
            return null;
          }
          var overlayProps = {
            ref: this.setOverlayRef,
            className: this.buildClassName("overlay", overlayClassName),
            style: _extends2({}, overlayStyles, this.props.style.overlay),
            onClick: this.handleOverlayOnClick,
            onMouseDown: this.handleOverlayOnMouseDown
          };
          var contentProps = _extends2({
            id,
            ref: this.setContentRef,
            style: _extends2({}, contentStyles, this.props.style.content),
            className: this.buildClassName("content", className),
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            "aria-label": this.props.contentLabel
          }, this.attributesFromObject("aria", _extends2({modal: true}, this.props.aria)), this.attributesFromObject("data", this.props.data || {}), {
            "data-testid": this.props.testId
          });
          var contentElement = this.props.contentElement(contentProps, children);
          return this.props.overlayElement(overlayProps, contentElement);
        }
      }]);
      return ModalPortal2;
    }(_react.Component);
    ModalPortal.defaultProps = {
      style: {
        overlay: {},
        content: {}
      },
      defaultStyles: {}
    };
    ModalPortal.propTypes = {
      isOpen: _propTypes2.default.bool.isRequired,
      defaultStyles: _propTypes2.default.shape({
        content: _propTypes2.default.object,
        overlay: _propTypes2.default.object
      }),
      style: _propTypes2.default.shape({
        content: _propTypes2.default.object,
        overlay: _propTypes2.default.object
      }),
      className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
      bodyOpenClassName: _propTypes2.default.string,
      htmlOpenClassName: _propTypes2.default.string,
      ariaHideApp: _propTypes2.default.bool,
      appElement: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_safeHTMLElement2.default), _propTypes2.default.instanceOf(_safeHTMLElement.SafeHTMLCollection), _propTypes2.default.instanceOf(_safeHTMLElement.SafeNodeList), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_safeHTMLElement2.default))]),
      onAfterOpen: _propTypes2.default.func,
      onAfterClose: _propTypes2.default.func,
      onRequestClose: _propTypes2.default.func,
      closeTimeoutMS: _propTypes2.default.number,
      shouldFocusAfterRender: _propTypes2.default.bool,
      shouldCloseOnOverlayClick: _propTypes2.default.bool,
      shouldReturnFocusAfterClose: _propTypes2.default.bool,
      preventScroll: _propTypes2.default.bool,
      role: _propTypes2.default.string,
      contentLabel: _propTypes2.default.string,
      aria: _propTypes2.default.object,
      data: _propTypes2.default.object,
      children: _propTypes2.default.node,
      shouldCloseOnEsc: _propTypes2.default.bool,
      overlayRef: _propTypes2.default.func,
      contentRef: _propTypes2.default.func,
      id: _propTypes2.default.string,
      overlayElement: _propTypes2.default.func,
      contentElement: _propTypes2.default.func,
      testId: _propTypes2.default.string
    };
    exports.default = ModalPortal;
    module.exports = exports["default"];
  });

  // node_modules/react-lifecycles-compat/react-lifecycles-compat.cjs.js
  var require_react_lifecycles_compat_cjs = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {value: true});
    function componentWillMount() {
      var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
      if (state !== null && state !== void 0) {
        this.setState(state);
      }
    }
    function componentWillReceiveProps(nextProps) {
      function updater(prevState) {
        var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
        return state !== null && state !== void 0 ? state : null;
      }
      this.setState(updater.bind(this));
    }
    function componentWillUpdate(nextProps, nextState) {
      try {
        var prevProps = this.props;
        var prevState = this.state;
        this.props = nextProps;
        this.state = nextState;
        this.__reactInternalSnapshotFlag = true;
        this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
      } finally {
        this.props = prevProps;
        this.state = prevState;
      }
    }
    componentWillMount.__suppressDeprecationWarning = true;
    componentWillReceiveProps.__suppressDeprecationWarning = true;
    componentWillUpdate.__suppressDeprecationWarning = true;
    function polyfill(Component) {
      var prototype = Component.prototype;
      if (!prototype || !prototype.isReactComponent) {
        throw new Error("Can only polyfill class components");
      }
      if (typeof Component.getDerivedStateFromProps !== "function" && typeof prototype.getSnapshotBeforeUpdate !== "function") {
        return Component;
      }
      var foundWillMountName = null;
      var foundWillReceivePropsName = null;
      var foundWillUpdateName = null;
      if (typeof prototype.componentWillMount === "function") {
        foundWillMountName = "componentWillMount";
      } else if (typeof prototype.UNSAFE_componentWillMount === "function") {
        foundWillMountName = "UNSAFE_componentWillMount";
      }
      if (typeof prototype.componentWillReceiveProps === "function") {
        foundWillReceivePropsName = "componentWillReceiveProps";
      } else if (typeof prototype.UNSAFE_componentWillReceiveProps === "function") {
        foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps";
      }
      if (typeof prototype.componentWillUpdate === "function") {
        foundWillUpdateName = "componentWillUpdate";
      } else if (typeof prototype.UNSAFE_componentWillUpdate === "function") {
        foundWillUpdateName = "UNSAFE_componentWillUpdate";
      }
      if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
        var componentName = Component.displayName || Component.name;
        var newApiName = typeof Component.getDerivedStateFromProps === "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
        throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + newApiName + " but also contains the following legacy lifecycles:" + (foundWillMountName !== null ? "\n  " + foundWillMountName : "") + (foundWillReceivePropsName !== null ? "\n  " + foundWillReceivePropsName : "") + (foundWillUpdateName !== null ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
      }
      if (typeof Component.getDerivedStateFromProps === "function") {
        prototype.componentWillMount = componentWillMount;
        prototype.componentWillReceiveProps = componentWillReceiveProps;
      }
      if (typeof prototype.getSnapshotBeforeUpdate === "function") {
        if (typeof prototype.componentDidUpdate !== "function") {
          throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
        }
        prototype.componentWillUpdate = componentWillUpdate;
        var componentDidUpdate = prototype.componentDidUpdate;
        prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
          var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
          componentDidUpdate.call(this, prevProps, prevState, snapshot);
        };
      }
      return Component;
    }
    exports.polyfill = polyfill;
  });

  // node_modules/react-modal/lib/components/Modal.js
  var require_Modal = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.bodyOpenClassName = exports.portalClassName = void 0;
    var _extends2 = Object.assign || function(target) {
      for (var i3 = 1; i3 < arguments.length; i3++) {
        var source = arguments[i3];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _reactDom = require_react_dom();
    var _reactDom2 = _interopRequireDefault(_reactDom);
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _ModalPortal = require_ModalPortal();
    var _ModalPortal2 = _interopRequireDefault(_ModalPortal);
    var _ariaAppHider = require_ariaAppHider();
    var ariaAppHider = _interopRequireWildcard(_ariaAppHider);
    var _safeHTMLElement = require_safeHTMLElement();
    var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);
    var _reactLifecyclesCompat = require_react_lifecycles_compat_cjs();
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {value: subClass, enumerable: false, writable: true, configurable: true}});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var portalClassName = exports.portalClassName = "ReactModalPortal";
    var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";
    var isReact16 = _safeHTMLElement.canUseDOM && _reactDom2.default.createPortal !== void 0;
    var createHTMLElement = function createHTMLElement2(name) {
      return document.createElement(name);
    };
    var getCreatePortal = function getCreatePortal2() {
      return isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;
    };
    function getParentElement(parentSelector) {
      return parentSelector();
    }
    var Modal2 = function(_Component) {
      _inherits(Modal3, _Component);
      function Modal3() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Modal3);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal3.__proto__ || Object.getPrototypeOf(Modal3)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function() {
          !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
          var parent = getParentElement(_this.props.parentSelector);
          if (parent && parent.contains(_this.node)) {
            parent.removeChild(_this.node);
          } else {
            console.warn('React-Modal: "parentSelector" prop did not returned any DOM element. Make sure that the parent element is unmounted to avoid any memory leaks.');
          }
        }, _this.portalRef = function(ref) {
          _this.portal = ref;
        }, _this.renderPortal = function(props) {
          var createPortal = getCreatePortal();
          var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends2({defaultStyles: Modal3.defaultStyles}, props)), _this.node);
          _this.portalRef(portal);
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(Modal3, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (!_safeHTMLElement.canUseDOM)
            return;
          if (!isReact16) {
            this.node = createHTMLElement("div");
          }
          this.node.className = this.props.portalClassName;
          var parent = getParentElement(this.props.parentSelector);
          parent.appendChild(this.node);
          !isReact16 && this.renderPortal(this.props);
        }
      }, {
        key: "getSnapshotBeforeUpdate",
        value: function getSnapshotBeforeUpdate(prevProps) {
          var prevParent = getParentElement(prevProps.parentSelector);
          var nextParent = getParentElement(this.props.parentSelector);
          return {prevParent, nextParent};
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, _3, snapshot) {
          if (!_safeHTMLElement.canUseDOM)
            return;
          var _props = this.props, isOpen = _props.isOpen, portalClassName2 = _props.portalClassName;
          if (prevProps.portalClassName !== portalClassName2) {
            this.node.className = portalClassName2;
          }
          var prevParent = snapshot.prevParent, nextParent = snapshot.nextParent;
          if (nextParent !== prevParent) {
            prevParent.removeChild(this.node);
            nextParent.appendChild(this.node);
          }
          if (!prevProps.isOpen && !isOpen)
            return;
          !isReact16 && this.renderPortal(this.props);
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal)
            return;
          var state = this.portal.state;
          var now = Date.now();
          var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);
          if (closesAt) {
            if (!state.beforeClose) {
              this.portal.closeWithTimeout();
            }
            setTimeout(this.removePortal, closesAt - now);
          } else {
            this.removePortal();
          }
        }
      }, {
        key: "render",
        value: function render() {
          if (!_safeHTMLElement.canUseDOM || !isReact16) {
            return null;
          }
          if (!this.node && isReact16) {
            this.node = createHTMLElement("div");
          }
          var createPortal = getCreatePortal();
          return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends2({
            ref: this.portalRef,
            defaultStyles: Modal3.defaultStyles
          }, this.props)), this.node);
        }
      }], [{
        key: "setAppElement",
        value: function setAppElement(element) {
          ariaAppHider.setElement(element);
        }
      }]);
      return Modal3;
    }(_react.Component);
    Modal2.propTypes = {
      isOpen: _propTypes2.default.bool.isRequired,
      style: _propTypes2.default.shape({
        content: _propTypes2.default.object,
        overlay: _propTypes2.default.object
      }),
      portalClassName: _propTypes2.default.string,
      bodyOpenClassName: _propTypes2.default.string,
      htmlOpenClassName: _propTypes2.default.string,
      className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
        base: _propTypes2.default.string.isRequired,
        afterOpen: _propTypes2.default.string.isRequired,
        beforeClose: _propTypes2.default.string.isRequired
      })]),
      overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
        base: _propTypes2.default.string.isRequired,
        afterOpen: _propTypes2.default.string.isRequired,
        beforeClose: _propTypes2.default.string.isRequired
      })]),
      appElement: _propTypes2.default.oneOfType([_propTypes2.default.instanceOf(_safeHTMLElement2.default), _propTypes2.default.instanceOf(_safeHTMLElement.SafeHTMLCollection), _propTypes2.default.instanceOf(_safeHTMLElement.SafeNodeList), _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_safeHTMLElement2.default))]),
      onAfterOpen: _propTypes2.default.func,
      onRequestClose: _propTypes2.default.func,
      closeTimeoutMS: _propTypes2.default.number,
      ariaHideApp: _propTypes2.default.bool,
      shouldFocusAfterRender: _propTypes2.default.bool,
      shouldCloseOnOverlayClick: _propTypes2.default.bool,
      shouldReturnFocusAfterClose: _propTypes2.default.bool,
      preventScroll: _propTypes2.default.bool,
      parentSelector: _propTypes2.default.func,
      aria: _propTypes2.default.object,
      data: _propTypes2.default.object,
      role: _propTypes2.default.string,
      contentLabel: _propTypes2.default.string,
      shouldCloseOnEsc: _propTypes2.default.bool,
      overlayRef: _propTypes2.default.func,
      contentRef: _propTypes2.default.func,
      id: _propTypes2.default.string,
      overlayElement: _propTypes2.default.func,
      contentElement: _propTypes2.default.func
    };
    Modal2.defaultProps = {
      isOpen: false,
      portalClassName,
      bodyOpenClassName,
      role: "dialog",
      ariaHideApp: true,
      closeTimeoutMS: 0,
      shouldFocusAfterRender: true,
      shouldCloseOnEsc: true,
      shouldCloseOnOverlayClick: true,
      shouldReturnFocusAfterClose: true,
      preventScroll: false,
      parentSelector: function parentSelector() {
        return document.body;
      },
      overlayElement: function overlayElement(props, contentEl) {
        return _react2.default.createElement("div", props, contentEl);
      },
      contentElement: function contentElement(props, children) {
        return _react2.default.createElement("div", props, children);
      }
    };
    Modal2.defaultStyles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.75)"
      },
      content: {
        position: "absolute",
        top: "40px",
        left: "40px",
        right: "40px",
        bottom: "40px",
        border: "1px solid #ccc",
        background: "#fff",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        borderRadius: "4px",
        outline: "none",
        padding: "20px"
      }
    };
    (0, _reactLifecyclesCompat.polyfill)(Modal2);
    if (false) {
      Modal2.setCreateHTMLElement = function(fn2) {
        return createHTMLElement = fn2;
      };
    }
    exports.default = Modal2;
  });

  // node_modules/react-modal/lib/index.js
  var require_lib = __commonJS((exports, module) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _Modal = require_Modal();
    var _Modal2 = _interopRequireDefault(_Modal);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    exports.default = _Modal2.default;
    module.exports = exports["default"];
  });

  // index.jsx
  var import_react14 = __toModule(require_react());
  var import_react_dom2 = __toModule(require_react_dom());

  // node_modules/react-redux/es/components/Provider.js
  var import_react3 = __toModule(require_react());

  // node_modules/react-redux/es/components/Context.js
  var import_react = __toModule(require_react());
  var ReactReduxContext = /* @__PURE__ */ import_react.default.createContext(null);
  if (false) {
    ReactReduxContext.displayName = "ReactRedux";
  }

  // node_modules/react-redux/es/utils/batch.js
  function defaultNoopBatch(callback) {
    callback();
  }
  var batch = defaultNoopBatch;
  var setBatch = function setBatch2(newBatch) {
    return batch = newBatch;
  };
  var getBatch = function getBatch2() {
    return batch;
  };

  // node_modules/react-redux/es/utils/Subscription.js
  function createListenerCollection() {
    var batch2 = getBatch();
    var first = null;
    var last = null;
    return {
      clear: function clear() {
        first = null;
        last = null;
      },
      notify: function notify2() {
        batch2(function() {
          var listener2 = first;
          while (listener2) {
            listener2.callback();
            listener2 = listener2.next;
          }
        });
      },
      get: function get2() {
        var listeners = [];
        var listener2 = first;
        while (listener2) {
          listeners.push(listener2);
          listener2 = listener2.next;
        }
        return listeners;
      },
      subscribe: function subscribe(callback) {
        var isSubscribed = true;
        var listener2 = last = {
          callback,
          next: null,
          prev: last
        };
        if (listener2.prev) {
          listener2.prev.next = listener2;
        } else {
          first = listener2;
        }
        return function unsubscribe() {
          if (!isSubscribed || first === null)
            return;
          isSubscribed = false;
          if (listener2.next) {
            listener2.next.prev = listener2.prev;
          } else {
            last = listener2.prev;
          }
          if (listener2.prev) {
            listener2.prev.next = listener2.next;
          } else {
            first = listener2.next;
          }
        };
      }
    };
  }
  var nullListeners = {
    notify: function notify() {
    },
    get: function get() {
      return [];
    }
  };
  function createSubscription(store2, parentSub) {
    var unsubscribe;
    var listeners = nullListeners;
    function addNestedSub(listener2) {
      trySubscribe();
      return listeners.subscribe(listener2);
    }
    function notifyNestedSubs() {
      listeners.notify();
    }
    function handleChangeWrapper() {
      if (subscription.onStateChange) {
        subscription.onStateChange();
      }
    }
    function isSubscribed() {
      return Boolean(unsubscribe);
    }
    function trySubscribe() {
      if (!unsubscribe) {
        unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store2.subscribe(handleChangeWrapper);
        listeners = createListenerCollection();
      }
    }
    function tryUnsubscribe() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = void 0;
        listeners.clear();
        listeners = nullListeners;
      }
    }
    var subscription = {
      addNestedSub,
      notifyNestedSubs,
      handleChangeWrapper,
      isSubscribed,
      trySubscribe,
      tryUnsubscribe,
      getListeners: function getListeners() {
        return listeners;
      }
    };
    return subscription;
  }

  // node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
  var import_react2 = __toModule(require_react());
  var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? import_react2.useLayoutEffect : import_react2.useEffect;

  // node_modules/react-redux/es/components/Provider.js
  function Provider(_ref) {
    var store2 = _ref.store, context = _ref.context, children = _ref.children;
    var contextValue = (0, import_react3.useMemo)(function() {
      var subscription = createSubscription(store2);
      subscription.onStateChange = subscription.notifyNestedSubs;
      return {
        store: store2,
        subscription
      };
    }, [store2]);
    var previousState = (0, import_react3.useMemo)(function() {
      return store2.getState();
    }, [store2]);
    useIsomorphicLayoutEffect(function() {
      var subscription = contextValue.subscription;
      subscription.trySubscribe();
      if (previousState !== store2.getState()) {
        subscription.notifyNestedSubs();
      }
      return function() {
        subscription.tryUnsubscribe();
        subscription.onStateChange = null;
      };
    }, [contextValue, previousState]);
    var Context = context || ReactReduxContext;
    return /* @__PURE__ */ import_react3.default.createElement(Context.Provider, {
      value: contextValue
    }, children);
  }
  if (false) {
    Provider.propTypes = {
      store: import_prop_types.default.shape({
        subscribe: import_prop_types.default.func.isRequired,
        dispatch: import_prop_types.default.func.isRequired,
        getState: import_prop_types.default.func.isRequired
      }),
      context: import_prop_types.default.object,
      children: import_prop_types.default.any
    };
  }
  var Provider_default = Provider;

  // node_modules/react-redux/es/components/connectAdvanced.js
  var import_hoist_non_react_statics = __toModule(require_hoist_non_react_statics_cjs());
  var import_react4 = __toModule(require_react());
  var import_react_is = __toModule(require_react_is());

  // node_modules/react-redux/es/hooks/useStore.js
  var import_react6 = __toModule(require_react());

  // node_modules/react-redux/es/hooks/useReduxContext.js
  var import_react5 = __toModule(require_react());
  function useReduxContext() {
    var contextValue = (0, import_react5.useContext)(ReactReduxContext);
    if (false) {
      throw new Error("could not find react-redux context value; please ensure the component is wrapped in a <Provider>");
    }
    return contextValue;
  }

  // node_modules/react-redux/es/hooks/useStore.js
  function createStoreHook(context) {
    if (context === void 0) {
      context = ReactReduxContext;
    }
    var useReduxContext2 = context === ReactReduxContext ? useReduxContext : function() {
      return (0, import_react6.useContext)(context);
    };
    return function useStore2() {
      var _useReduxContext = useReduxContext2(), store2 = _useReduxContext.store;
      return store2;
    };
  }
  var useStore = /* @__PURE__ */ createStoreHook();

  // node_modules/react-redux/es/hooks/useDispatch.js
  function createDispatchHook(context) {
    if (context === void 0) {
      context = ReactReduxContext;
    }
    var useStore2 = context === ReactReduxContext ? useStore : createStoreHook(context);
    return function useDispatch2() {
      var store2 = useStore2();
      return store2.dispatch;
    };
  }
  var useDispatch = /* @__PURE__ */ createDispatchHook();

  // node_modules/react-redux/es/hooks/useSelector.js
  var import_react7 = __toModule(require_react());
  var refEquality = function refEquality2(a3, b3) {
    return a3 === b3;
  };
  function useSelectorWithStoreAndSubscription(selector, equalityFn, store2, contextSub) {
    var _useReducer = (0, import_react7.useReducer)(function(s3) {
      return s3 + 1;
    }, 0), forceRender = _useReducer[1];
    var subscription = (0, import_react7.useMemo)(function() {
      return createSubscription(store2, contextSub);
    }, [store2, contextSub]);
    var latestSubscriptionCallbackError = (0, import_react7.useRef)();
    var latestSelector = (0, import_react7.useRef)();
    var latestStoreState = (0, import_react7.useRef)();
    var latestSelectedState = (0, import_react7.useRef)();
    var storeState = store2.getState();
    var selectedState;
    try {
      if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
        var newSelectedState = selector(storeState);
        if (latestSelectedState.current === void 0 || !equalityFn(newSelectedState, latestSelectedState.current)) {
          selectedState = newSelectedState;
        } else {
          selectedState = latestSelectedState.current;
        }
      } else {
        selectedState = latestSelectedState.current;
      }
    } catch (err) {
      if (latestSubscriptionCallbackError.current) {
        err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
      }
      throw err;
    }
    useIsomorphicLayoutEffect(function() {
      latestSelector.current = selector;
      latestStoreState.current = storeState;
      latestSelectedState.current = selectedState;
      latestSubscriptionCallbackError.current = void 0;
    });
    useIsomorphicLayoutEffect(function() {
      function checkForUpdates() {
        try {
          var newStoreState = store2.getState();
          if (newStoreState === latestStoreState.current) {
            return;
          }
          var _newSelectedState = latestSelector.current(newStoreState);
          if (equalityFn(_newSelectedState, latestSelectedState.current)) {
            return;
          }
          latestSelectedState.current = _newSelectedState;
          latestStoreState.current = newStoreState;
        } catch (err) {
          latestSubscriptionCallbackError.current = err;
        }
        forceRender();
      }
      subscription.onStateChange = checkForUpdates;
      subscription.trySubscribe();
      checkForUpdates();
      return function() {
        return subscription.tryUnsubscribe();
      };
    }, [store2, subscription]);
    return selectedState;
  }
  function createSelectorHook(context) {
    if (context === void 0) {
      context = ReactReduxContext;
    }
    var useReduxContext2 = context === ReactReduxContext ? useReduxContext : function() {
      return (0, import_react7.useContext)(context);
    };
    return function useSelector2(selector, equalityFn) {
      if (equalityFn === void 0) {
        equalityFn = refEquality;
      }
      if (false) {
        if (!selector) {
          throw new Error("You must pass a selector to useSelector");
        }
        if (typeof selector !== "function") {
          throw new Error("You must pass a function as a selector to useSelector");
        }
        if (typeof equalityFn !== "function") {
          throw new Error("You must pass a function as an equality function to useSelector");
        }
      }
      var _useReduxContext = useReduxContext2(), store2 = _useReduxContext.store, contextSub = _useReduxContext.subscription;
      var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store2, contextSub);
      (0, import_react7.useDebugValue)(selectedState);
      return selectedState;
    };
  }
  var useSelector = /* @__PURE__ */ createSelectorHook();

  // node_modules/react-redux/es/utils/reactBatchedUpdates.js
  var import_react_dom = __toModule(require_react_dom());

  // node_modules/react-redux/es/index.js
  setBatch(import_react_dom.unstable_batchedUpdates);

  // node_modules/immer/dist/immer.esm.js
  function n(n3) {
    for (var r3 = arguments.length, t3 = Array(r3 > 1 ? r3 - 1 : 0), e3 = 1; e3 < r3; e3++)
      t3[e3 - 1] = arguments[e3];
    if (false) {
      var i3 = Y[n3], o3 = i3 ? typeof i3 == "function" ? i3.apply(null, t3) : i3 : "unknown error nr: " + n3;
      throw Error("[Immer] " + o3);
    }
    throw Error("[Immer] minified error nr: " + n3 + (t3.length ? " " + t3.map(function(n4) {
      return "'" + n4 + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function r(n3) {
    return !!n3 && !!n3[Q];
  }
  function t(n3) {
    return !!n3 && (function(n4) {
      if (!n4 || typeof n4 != "object")
        return false;
      var r3 = Object.getPrototypeOf(n4);
      if (r3 === null)
        return true;
      var t3 = Object.hasOwnProperty.call(r3, "constructor") && r3.constructor;
      return t3 === Object || typeof t3 == "function" && Function.toString.call(t3) === Z;
    }(n3) || Array.isArray(n3) || !!n3[L] || !!n3.constructor[L] || s(n3) || v(n3));
  }
  function i(n3, r3, t3) {
    t3 === void 0 && (t3 = false), o(n3) === 0 ? (t3 ? Object.keys : nn)(n3).forEach(function(e3) {
      t3 && typeof e3 == "symbol" || r3(e3, n3[e3], n3);
    }) : n3.forEach(function(t4, e3) {
      return r3(e3, t4, n3);
    });
  }
  function o(n3) {
    var r3 = n3[Q];
    return r3 ? r3.i > 3 ? r3.i - 4 : r3.i : Array.isArray(n3) ? 1 : s(n3) ? 2 : v(n3) ? 3 : 0;
  }
  function u(n3, r3) {
    return o(n3) === 2 ? n3.has(r3) : Object.prototype.hasOwnProperty.call(n3, r3);
  }
  function a(n3, r3) {
    return o(n3) === 2 ? n3.get(r3) : n3[r3];
  }
  function f(n3, r3, t3) {
    var e3 = o(n3);
    e3 === 2 ? n3.set(r3, t3) : e3 === 3 ? (n3.delete(r3), n3.add(t3)) : n3[r3] = t3;
  }
  function c(n3, r3) {
    return n3 === r3 ? n3 !== 0 || 1 / n3 == 1 / r3 : n3 != n3 && r3 != r3;
  }
  function s(n3) {
    return X && n3 instanceof Map;
  }
  function v(n3) {
    return q && n3 instanceof Set;
  }
  function p(n3) {
    return n3.o || n3.t;
  }
  function l(n3) {
    if (Array.isArray(n3))
      return Array.prototype.slice.call(n3);
    var r3 = rn(n3);
    delete r3[Q];
    for (var t3 = nn(r3), e3 = 0; e3 < t3.length; e3++) {
      var i3 = t3[e3], o3 = r3[i3];
      o3.writable === false && (o3.writable = true, o3.configurable = true), (o3.get || o3.set) && (r3[i3] = {configurable: true, writable: true, enumerable: o3.enumerable, value: n3[i3]});
    }
    return Object.create(Object.getPrototypeOf(n3), r3);
  }
  function d(n3, e3) {
    return e3 === void 0 && (e3 = false), y(n3) || r(n3) || !t(n3) ? n3 : (o(n3) > 1 && (n3.set = n3.add = n3.clear = n3.delete = h), Object.freeze(n3), e3 && i(n3, function(n4, r3) {
      return d(r3, true);
    }, true), n3);
  }
  function h() {
    n(2);
  }
  function y(n3) {
    return n3 == null || typeof n3 != "object" || Object.isFrozen(n3);
  }
  function b(r3) {
    var t3 = tn[r3];
    return t3 || n(18, r3), t3;
  }
  function m(n3, r3) {
    tn[n3] || (tn[n3] = r3);
  }
  function _() {
    return true, U;
  }
  function j(n3, r3) {
    r3 && (b("Patches"), n3.u = [], n3.s = [], n3.v = r3);
  }
  function O(n3) {
    g(n3), n3.p.forEach(S), n3.p = null;
  }
  function g(n3) {
    n3 === U && (U = n3.l);
  }
  function w(n3) {
    return U = {p: [], l: U, h: n3, m: true, _: 0};
  }
  function S(n3) {
    var r3 = n3[Q];
    r3.i === 0 || r3.i === 1 ? r3.j() : r3.O = true;
  }
  function P(r3, e3) {
    e3._ = e3.p.length;
    var i3 = e3.p[0], o3 = r3 !== void 0 && r3 !== i3;
    return e3.h.g || b("ES5").S(e3, r3, o3), o3 ? (i3[Q].P && (O(e3), n(4)), t(r3) && (r3 = M(e3, r3), e3.l || x(e3, r3)), e3.u && b("Patches").M(i3[Q].t, r3, e3.u, e3.s)) : r3 = M(e3, i3, []), O(e3), e3.u && e3.v(e3.u, e3.s), r3 !== H ? r3 : void 0;
  }
  function M(n3, r3, t3) {
    if (y(r3))
      return r3;
    var e3 = r3[Q];
    if (!e3)
      return i(r3, function(i3, o4) {
        return A(n3, e3, r3, i3, o4, t3);
      }, true), r3;
    if (e3.A !== n3)
      return r3;
    if (!e3.P)
      return x(n3, e3.t, true), e3.t;
    if (!e3.I) {
      e3.I = true, e3.A._--;
      var o3 = e3.i === 4 || e3.i === 5 ? e3.o = l(e3.k) : e3.o;
      i(e3.i === 3 ? new Set(o3) : o3, function(r4, i3) {
        return A(n3, e3, o3, r4, i3, t3);
      }), x(n3, o3, false), t3 && n3.u && b("Patches").R(e3, t3, n3.u, n3.s);
    }
    return e3.o;
  }
  function A(e3, i3, o3, a3, c3, s3) {
    if (false, r(c3)) {
      var v2 = M(e3, c3, s3 && i3 && i3.i !== 3 && !u(i3.D, a3) ? s3.concat(a3) : void 0);
      if (f(o3, a3, v2), !r(v2))
        return;
      e3.m = false;
    }
    if (t(c3) && !y(c3)) {
      if (!e3.h.F && e3._ < 1)
        return;
      M(e3, c3), i3 && i3.A.l || x(e3, c3);
    }
  }
  function x(n3, r3, t3) {
    t3 === void 0 && (t3 = false), n3.h.F && n3.m && d(r3, t3);
  }
  function z(n3, r3) {
    var t3 = n3[Q];
    return (t3 ? p(t3) : n3)[r3];
  }
  function I(n3, r3) {
    if (r3 in n3)
      for (var t3 = Object.getPrototypeOf(n3); t3; ) {
        var e3 = Object.getOwnPropertyDescriptor(t3, r3);
        if (e3)
          return e3;
        t3 = Object.getPrototypeOf(t3);
      }
  }
  function k(n3) {
    n3.P || (n3.P = true, n3.l && k(n3.l));
  }
  function E(n3) {
    n3.o || (n3.o = l(n3.t));
  }
  function R(n3, r3, t3) {
    var e3 = s(r3) ? b("MapSet").N(r3, t3) : v(r3) ? b("MapSet").T(r3, t3) : n3.g ? function(n4, r4) {
      var t4 = Array.isArray(n4), e4 = {i: t4 ? 1 : 0, A: r4 ? r4.A : _(), P: false, I: false, D: {}, l: r4, t: n4, k: null, o: null, j: null, C: false}, i3 = e4, o3 = en;
      t4 && (i3 = [e4], o3 = on);
      var u3 = Proxy.revocable(i3, o3), a3 = u3.revoke, f3 = u3.proxy;
      return e4.k = f3, e4.j = a3, f3;
    }(r3, t3) : b("ES5").J(r3, t3);
    return (t3 ? t3.A : _()).p.push(e3), e3;
  }
  function D(e3) {
    return r(e3) || n(22, e3), function n3(r3) {
      if (!t(r3))
        return r3;
      var e4, u3 = r3[Q], c3 = o(r3);
      if (u3) {
        if (!u3.P && (u3.i < 4 || !b("ES5").K(u3)))
          return u3.t;
        u3.I = true, e4 = F(r3, c3), u3.I = false;
      } else
        e4 = F(r3, c3);
      return i(e4, function(r4, t3) {
        u3 && a(u3.t, r4) === t3 || f(e4, r4, n3(t3));
      }), c3 === 3 ? new Set(e4) : e4;
    }(e3);
  }
  function F(n3, r3) {
    switch (r3) {
      case 2:
        return new Map(n3);
      case 3:
        return Array.from(n3);
    }
    return l(n3);
  }
  function N() {
    function t3(n3, r3) {
      var t4 = s3[n3];
      return t4 ? t4.enumerable = r3 : s3[n3] = t4 = {configurable: true, enumerable: r3, get: function() {
        var r4 = this[Q];
        return false, en.get(r4, n3);
      }, set: function(r4) {
        var t5 = this[Q];
        false, en.set(t5, n3, r4);
      }}, t4;
    }
    function e3(n3) {
      for (var r3 = n3.length - 1; r3 >= 0; r3--) {
        var t4 = n3[r3][Q];
        if (!t4.P)
          switch (t4.i) {
            case 5:
              a3(t4) && k(t4);
              break;
            case 4:
              o3(t4) && k(t4);
          }
      }
    }
    function o3(n3) {
      for (var r3 = n3.t, t4 = n3.k, e4 = nn(t4), i3 = e4.length - 1; i3 >= 0; i3--) {
        var o4 = e4[i3];
        if (o4 !== Q) {
          var a4 = r3[o4];
          if (a4 === void 0 && !u(r3, o4))
            return true;
          var f4 = t4[o4], s4 = f4 && f4[Q];
          if (s4 ? s4.t !== a4 : !c(f4, a4))
            return true;
        }
      }
      var v2 = !!r3[Q];
      return e4.length !== nn(r3).length + (v2 ? 0 : 1);
    }
    function a3(n3) {
      var r3 = n3.k;
      if (r3.length !== n3.t.length)
        return true;
      var t4 = Object.getOwnPropertyDescriptor(r3, r3.length - 1);
      if (t4 && !t4.get)
        return true;
      for (var e4 = 0; e4 < r3.length; e4++)
        if (!r3.hasOwnProperty(e4))
          return true;
      return false;
    }
    function f3(r3) {
      r3.O && n(3, JSON.stringify(p(r3)));
    }
    var s3 = {};
    m("ES5", {J: function(n3, r3) {
      var e4 = Array.isArray(n3), i3 = function(n4, r4) {
        if (n4) {
          for (var e5 = Array(r4.length), i4 = 0; i4 < r4.length; i4++)
            Object.defineProperty(e5, "" + i4, t3(i4, true));
          return e5;
        }
        var o5 = rn(r4);
        delete o5[Q];
        for (var u3 = nn(o5), a4 = 0; a4 < u3.length; a4++) {
          var f4 = u3[a4];
          o5[f4] = t3(f4, n4 || !!o5[f4].enumerable);
        }
        return Object.create(Object.getPrototypeOf(r4), o5);
      }(e4, n3), o4 = {i: e4 ? 5 : 4, A: r3 ? r3.A : _(), P: false, I: false, D: {}, l: r3, t: n3, k: i3, o: null, O: false, C: false};
      return Object.defineProperty(i3, Q, {value: o4, writable: true}), i3;
    }, S: function(n3, t4, o4) {
      o4 ? r(t4) && t4[Q].A === n3 && e3(n3.p) : (n3.u && function n4(r3) {
        if (r3 && typeof r3 == "object") {
          var t5 = r3[Q];
          if (t5) {
            var e4 = t5.t, o5 = t5.k, f4 = t5.D, c3 = t5.i;
            if (c3 === 4)
              i(o5, function(r4) {
                r4 !== Q && (e4[r4] !== void 0 || u(e4, r4) ? f4[r4] || n4(o5[r4]) : (f4[r4] = true, k(t5)));
              }), i(e4, function(n5) {
                o5[n5] !== void 0 || u(o5, n5) || (f4[n5] = false, k(t5));
              });
            else if (c3 === 5) {
              if (a3(t5) && (k(t5), f4.length = true), o5.length < e4.length)
                for (var s4 = o5.length; s4 < e4.length; s4++)
                  f4[s4] = false;
              else
                for (var v2 = e4.length; v2 < o5.length; v2++)
                  f4[v2] = true;
              for (var p3 = Math.min(o5.length, e4.length), l3 = 0; l3 < p3; l3++)
                o5.hasOwnProperty(l3) || (f4[l3] = true), f4[l3] === void 0 && n4(o5[l3]);
            }
          }
        }
      }(n3.p[0]), e3(n3.p));
    }, K: function(n3) {
      return n3.i === 4 ? o3(n3) : a3(n3);
    }});
  }
  var G;
  var U;
  var W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol";
  var X = typeof Map != "undefined";
  var q = typeof Set != "undefined";
  var B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined";
  var H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G);
  var L = W ? Symbol.for("immer-draftable") : "__$immer_draftable";
  var Q = W ? Symbol.for("immer-state") : "__$immer_state";
  var V = typeof Symbol != "undefined" && Symbol.iterator || "@@iterator";
  var Z = "" + Object.prototype.constructor;
  var nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n3) {
    return Object.getOwnPropertyNames(n3).concat(Object.getOwnPropertySymbols(n3));
  } : Object.getOwnPropertyNames;
  var rn = Object.getOwnPropertyDescriptors || function(n3) {
    var r3 = {};
    return nn(n3).forEach(function(t3) {
      r3[t3] = Object.getOwnPropertyDescriptor(n3, t3);
    }), r3;
  };
  var tn = {};
  var en = {get: function(n3, r3) {
    if (r3 === Q)
      return n3;
    var e3 = p(n3);
    if (!u(e3, r3))
      return function(n4, r4, t3) {
        var e4, i4 = I(r4, t3);
        return i4 ? "value" in i4 ? i4.value : (e4 = i4.get) === null || e4 === void 0 ? void 0 : e4.call(n4.k) : void 0;
      }(n3, e3, r3);
    var i3 = e3[r3];
    return n3.I || !t(i3) ? i3 : i3 === z(n3.t, r3) ? (E(n3), n3.o[r3] = R(n3.A.h, i3, n3)) : i3;
  }, has: function(n3, r3) {
    return r3 in p(n3);
  }, ownKeys: function(n3) {
    return Reflect.ownKeys(p(n3));
  }, set: function(n3, r3, t3) {
    var e3 = I(p(n3), r3);
    if (e3 == null ? void 0 : e3.set)
      return e3.set.call(n3.k, t3), true;
    if (!n3.P) {
      var i3 = z(p(n3), r3), o3 = i3 == null ? void 0 : i3[Q];
      if (o3 && o3.t === t3)
        return n3.o[r3] = t3, n3.D[r3] = false, true;
      if (c(t3, i3) && (t3 !== void 0 || u(n3.t, r3)))
        return true;
      E(n3), k(n3);
    }
    return n3.o[r3] === t3 && typeof t3 != "number" && (t3 !== void 0 || r3 in n3.o) || (n3.o[r3] = t3, n3.D[r3] = true, true);
  }, deleteProperty: function(n3, r3) {
    return z(n3.t, r3) !== void 0 || r3 in n3.t ? (n3.D[r3] = false, E(n3), k(n3)) : delete n3.D[r3], n3.o && delete n3.o[r3], true;
  }, getOwnPropertyDescriptor: function(n3, r3) {
    var t3 = p(n3), e3 = Reflect.getOwnPropertyDescriptor(t3, r3);
    return e3 ? {writable: true, configurable: n3.i !== 1 || r3 !== "length", enumerable: e3.enumerable, value: t3[r3]} : e3;
  }, defineProperty: function() {
    n(11);
  }, getPrototypeOf: function(n3) {
    return Object.getPrototypeOf(n3.t);
  }, setPrototypeOf: function() {
    n(12);
  }};
  var on = {};
  i(en, function(n3, r3) {
    on[n3] = function() {
      return arguments[0] = arguments[0][0], r3.apply(this, arguments);
    };
  }), on.deleteProperty = function(r3, t3) {
    return false, on.set.call(this, r3, t3, void 0);
  }, on.set = function(r3, t3, e3) {
    return false, en.set.call(this, r3[0], t3, e3, r3[0]);
  };
  var un = function() {
    function e3(r3) {
      var e4 = this;
      this.g = B, this.F = true, this.produce = function(r4, i4, o3) {
        if (typeof r4 == "function" && typeof i4 != "function") {
          var u3 = i4;
          i4 = r4;
          var a3 = e4;
          return function(n3) {
            var r5 = this;
            n3 === void 0 && (n3 = u3);
            for (var t3 = arguments.length, e5 = Array(t3 > 1 ? t3 - 1 : 0), o4 = 1; o4 < t3; o4++)
              e5[o4 - 1] = arguments[o4];
            return a3.produce(n3, function(n4) {
              var t4;
              return (t4 = i4).call.apply(t4, [r5, n4].concat(e5));
            });
          };
        }
        var f3;
        if (typeof i4 != "function" && n(6), o3 !== void 0 && typeof o3 != "function" && n(7), t(r4)) {
          var c3 = w(e4), s3 = R(e4, r4, void 0), v2 = true;
          try {
            f3 = i4(s3), v2 = false;
          } finally {
            v2 ? O(c3) : g(c3);
          }
          return typeof Promise != "undefined" && f3 instanceof Promise ? f3.then(function(n3) {
            return j(c3, o3), P(n3, c3);
          }, function(n3) {
            throw O(c3), n3;
          }) : (j(c3, o3), P(f3, c3));
        }
        if (!r4 || typeof r4 != "object") {
          if ((f3 = i4(r4)) === void 0 && (f3 = r4), f3 === H && (f3 = void 0), e4.F && d(f3, true), o3) {
            var p3 = [], l3 = [];
            b("Patches").M(r4, f3, p3, l3), o3(p3, l3);
          }
          return f3;
        }
        n(21, r4);
      }, this.produceWithPatches = function(n3, r4) {
        if (typeof n3 == "function")
          return function(r5) {
            for (var t4 = arguments.length, i5 = Array(t4 > 1 ? t4 - 1 : 0), o4 = 1; o4 < t4; o4++)
              i5[o4 - 1] = arguments[o4];
            return e4.produceWithPatches(r5, function(r6) {
              return n3.apply(void 0, [r6].concat(i5));
            });
          };
        var t3, i4, o3 = e4.produce(n3, r4, function(n4, r5) {
          t3 = n4, i4 = r5;
        });
        return typeof Promise != "undefined" && o3 instanceof Promise ? o3.then(function(n4) {
          return [n4, t3, i4];
        }) : [o3, t3, i4];
      }, typeof (r3 == null ? void 0 : r3.useProxies) == "boolean" && this.setUseProxies(r3.useProxies), typeof (r3 == null ? void 0 : r3.autoFreeze) == "boolean" && this.setAutoFreeze(r3.autoFreeze);
    }
    var i3 = e3.prototype;
    return i3.createDraft = function(e4) {
      t(e4) || n(8), r(e4) && (e4 = D(e4));
      var i4 = w(this), o3 = R(this, e4, void 0);
      return o3[Q].C = true, g(i4), o3;
    }, i3.finishDraft = function(r3, t3) {
      var e4 = r3 && r3[Q];
      false;
      var i4 = e4.A;
      return j(i4, t3), P(void 0, i4);
    }, i3.setAutoFreeze = function(n3) {
      this.F = n3;
    }, i3.setUseProxies = function(r3) {
      r3 && !B && n(20), this.g = r3;
    }, i3.applyPatches = function(n3, t3) {
      var e4;
      for (e4 = t3.length - 1; e4 >= 0; e4--) {
        var i4 = t3[e4];
        if (i4.path.length === 0 && i4.op === "replace") {
          n3 = i4.value;
          break;
        }
      }
      e4 > -1 && (t3 = t3.slice(e4 + 1));
      var o3 = b("Patches").$;
      return r(n3) ? o3(n3, t3) : this.produce(n3, function(n4) {
        return o3(n4, t3);
      });
    }, e3;
  }();
  var an = new un();
  var fn = an.produce;
  var cn = an.produceWithPatches.bind(an);
  var sn = an.setAutoFreeze.bind(an);
  var vn = an.setUseProxies.bind(an);
  var pn = an.applyPatches.bind(an);
  var ln = an.createDraft.bind(an);
  var dn = an.finishDraft.bind(an);
  var immer_esm_default = fn;

  // node_modules/@babel/runtime/helpers/esm/defineProperty.js
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  // node_modules/@babel/runtime/helpers/esm/objectSpread2.js
  function ownKeys(object, enumerableOnly) {
    var keys4 = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys4.push.apply(keys4, symbols);
    }
    return keys4;
  }
  function _objectSpread2(target) {
    for (var i3 = 1; i3 < arguments.length; i3++) {
      var source = arguments[i3] != null ? arguments[i3] : {};
      i3 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }

  // node_modules/redux/es/redux.js
  function formatProdErrorMessage(code) {
    return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
  }
  var $$observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  var randomString = function randomString2() {
    return Math.random().toString(36).substring(7).split("").join(".");
  };
  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };
  function isPlainObject2(obj) {
    if (typeof obj !== "object" || obj === null)
      return false;
    var proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
  }
  function createStore(reducer2, preloadedState, enhancer) {
    var _ref2;
    if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
      throw new Error(true ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
    }
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
      enhancer = preloadedState;
      preloadedState = void 0;
    }
    if (typeof enhancer !== "undefined") {
      if (typeof enhancer !== "function") {
        throw new Error(true ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
      }
      return enhancer(createStore)(reducer2, preloadedState);
    }
    if (typeof reducer2 !== "function") {
      throw new Error(true ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer2) + "'");
    }
    var currentReducer = reducer2;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    function getState() {
      if (isDispatching) {
        throw new Error(true ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
      }
      return currentState;
    }
    function subscribe(listener2) {
      if (typeof listener2 !== "function") {
        throw new Error(true ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener2) + "'");
      }
      if (isDispatching) {
        throw new Error(true ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener2);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        if (isDispatching) {
          throw new Error(true ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener2);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    function dispatch(action) {
      if (!isPlainObject2(action)) {
        throw new Error(true ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
      }
      if (typeof action.type === "undefined") {
        throw new Error(true ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
      }
      if (isDispatching) {
        throw new Error(true ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      var listeners = currentListeners = nextListeners;
      for (var i3 = 0; i3 < listeners.length; i3++) {
        var listener2 = listeners[i3];
        listener2();
      }
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== "function") {
        throw new Error(true ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
      }
      currentReducer = nextReducer;
      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    function observable() {
      var _ref;
      var outerSubscribe = subscribe;
      return _ref = {
        subscribe: function subscribe2(observer) {
          if (typeof observer !== "object" || observer === null) {
            throw new Error(true ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
          }
          function observeState() {
            if (observer.next) {
              observer.next(getState());
            }
          }
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe
          };
        }
      }, _ref[$$observable] = function() {
        return this;
      }, _ref;
    }
    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch,
      subscribe,
      getState,
      replaceReducer
    }, _ref2[$$observable] = observable, _ref2;
  }
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(function(key) {
      var reducer2 = reducers[key];
      var initialState2 = reducer2(void 0, {
        type: ActionTypes.INIT
      });
      if (typeof initialState2 === "undefined") {
        throw new Error(true ? formatProdErrorMessage(12) : 'The slice reducer for key "' + key + `" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
      }
      if (typeof reducer2(void 0, {
        type: ActionTypes.PROBE_UNKNOWN_ACTION()
      }) === "undefined") {
        throw new Error(true ? formatProdErrorMessage(13) : 'The slice reducer for key "' + key + '" returned undefined when probed with a random type. ' + ("Don't try to handle '" + ActionTypes.INIT + `' or other actions in "redux/*" `) + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
      }
    });
  }
  function combineReducers(reducers) {
    var reducerKeys = Object.keys(reducers);
    var finalReducers = {};
    for (var i3 = 0; i3 < reducerKeys.length; i3++) {
      var key = reducerKeys[i3];
      if (false) {
        if (typeof reducers[key] === "undefined") {
          warning('No reducer provided for key "' + key + '"');
        }
      }
      if (typeof reducers[key] === "function") {
        finalReducers[key] = reducers[key];
      }
    }
    var finalReducerKeys = Object.keys(finalReducers);
    var unexpectedKeyCache;
    if (false) {
      unexpectedKeyCache = {};
    }
    var shapeAssertionError;
    try {
      assertReducerShape(finalReducers);
    } catch (e3) {
      shapeAssertionError = e3;
    }
    return function combination(state, action) {
      if (state === void 0) {
        state = {};
      }
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
      if (false) {
        var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
        if (warningMessage) {
          warning(warningMessage);
        }
      }
      var hasChanged = false;
      var nextState = {};
      for (var _i = 0; _i < finalReducerKeys.length; _i++) {
        var _key = finalReducerKeys[_i];
        var reducer2 = finalReducers[_key];
        var previousStateForKey = state[_key];
        var nextStateForKey = reducer2(previousStateForKey, action);
        if (typeof nextStateForKey === "undefined") {
          var actionType = action && action.type;
          throw new Error(true ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? '"' + String(actionType) + '"' : "(unknown type)") + ', the slice reducer for key "' + _key + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.');
        }
        nextState[_key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  function compose() {
    for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce(function(a3, b3) {
      return function() {
        return a3(b3.apply(void 0, arguments));
      };
    });
  }
  function applyMiddleware() {
    for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    return function(createStore2) {
      return function() {
        var store2 = createStore2.apply(void 0, arguments);
        var _dispatch = function dispatch() {
          throw new Error(true ? formatProdErrorMessage(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
        };
        var middlewareAPI = {
          getState: store2.getState,
          dispatch: function dispatch() {
            return _dispatch.apply(void 0, arguments);
          }
        };
        var chain = middlewares.map(function(middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = compose.apply(void 0, chain)(store2.dispatch);
        return _objectSpread2(_objectSpread2({}, store2), {}, {
          dispatch: _dispatch
        });
      };
    };
  }
  if (false) {
    warning('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.');
  }

  // node_modules/redux-thunk/es/index.js
  function createThunkMiddleware(extraArgument) {
    var middleware = function middleware2(_ref) {
      var dispatch = _ref.dispatch, getState = _ref.getState;
      return function(next) {
        return function(action) {
          if (typeof action === "function") {
            return action(dispatch, getState, extraArgument);
          }
          return next(action);
        };
      };
    };
    return middleware;
  }
  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;
  var es_default = thunk;

  // node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js
  var __extends = function() {
    var extendStatics = function(d3, b3) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d4, b4) {
        d4.__proto__ = b4;
      } || function(d4, b4) {
        for (var p3 in b4)
          if (Object.prototype.hasOwnProperty.call(b4, p3))
            d4[p3] = b4[p3];
      };
      return extendStatics(d3, b3);
    };
    return function(d3, b3) {
      if (typeof b3 !== "function" && b3 !== null)
        throw new TypeError("Class extends value " + String(b3) + " is not a constructor or null");
      extendStatics(d3, b3);
      function __() {
        this.constructor = d3;
      }
      d3.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
    };
  }();
  var __generator = function(thisArg, body) {
    var _3 = {label: 0, sent: function() {
      if (t3[0] & 1)
        throw t3[1];
      return t3[1];
    }, trys: [], ops: []}, f3, y3, t3, g3;
    return g3 = {next: verb(0), throw: verb(1), return: verb(2)}, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
      return this;
    }), g3;
    function verb(n3) {
      return function(v2) {
        return step([n3, v2]);
      };
    }
    function step(op) {
      if (f3)
        throw new TypeError("Generator is already executing.");
      while (_3)
        try {
          if (f3 = 1, y3 && (t3 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t3 = y3["return"]) && t3.call(y3), 0) : y3.next) && !(t3 = t3.call(y3, op[1])).done)
            return t3;
          if (y3 = 0, t3)
            op = [op[0] & 2, t3.value];
          switch (op[0]) {
            case 0:
            case 1:
              t3 = op;
              break;
            case 4:
              _3.label++;
              return {value: op[1], done: false};
            case 5:
              _3.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _3.ops.pop();
              _3.trys.pop();
              continue;
            default:
              if (!(t3 = _3.trys, t3 = t3.length > 0 && t3[t3.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _3 = 0;
                continue;
              }
              if (op[0] === 3 && (!t3 || op[1] > t3[0] && op[1] < t3[3])) {
                _3.label = op[1];
                break;
              }
              if (op[0] === 6 && _3.label < t3[1]) {
                _3.label = t3[1];
                t3 = op;
                break;
              }
              if (t3 && _3.label < t3[2]) {
                _3.label = t3[2];
                _3.ops.push(op);
                break;
              }
              if (t3[2])
                _3.ops.pop();
              _3.trys.pop();
              continue;
          }
          op = body.call(thisArg, _3);
        } catch (e3) {
          op = [6, e3];
          y3 = 0;
        } finally {
          f3 = t3 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return {value: op[0] ? op[1] : void 0, done: true};
    }
  };
  var __spreadArray = function(to, from) {
    for (var i3 = 0, il = from.length, j2 = to.length; i3 < il; i3++, j2++)
      to[j2] = from[i3];
    return to;
  };
  var __defProp2 = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function(obj, key, value) {
    return key in obj ? __defProp2(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
  };
  var __spreadValues = function(a3, b3) {
    for (var prop3 in b3 || (b3 = {}))
      if (__hasOwnProp2.call(b3, prop3))
        __defNormalProp(a3, prop3, b3[prop3]);
    if (__getOwnPropSymbols)
      for (var _i = 0, _c = __getOwnPropSymbols(b3); _i < _c.length; _i++) {
        var prop3 = _c[_i];
        if (__propIsEnum.call(b3, prop3))
          __defNormalProp(a3, prop3, b3[prop3]);
      }
    return a3;
  };
  var __spreadProps = function(a3, b3) {
    return __defProps(a3, __getOwnPropDescs(b3));
  };
  var __async = function(__this, __arguments, generator) {
    return new Promise(function(resolve, reject3) {
      var fulfilled = function(value) {
        try {
          step(generator.next(value));
        } catch (e3) {
          reject3(e3);
        }
      };
      var rejected = function(value) {
        try {
          step(generator.throw(value));
        } catch (e3) {
          reject3(e3);
        }
      };
      var step = function(x2) {
        return x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      };
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };
  var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0)
      return void 0;
    if (typeof arguments[0] === "object")
      return compose;
    return compose.apply(null, arguments);
  };
  var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
    return function(noop2) {
      return noop2;
    };
  };
  function isPlainObject3(value) {
    if (typeof value !== "object" || value === null)
      return false;
    var proto = Object.getPrototypeOf(value);
    if (proto === null)
      return true;
    var baseProto = proto;
    while (Object.getPrototypeOf(baseProto) !== null) {
      baseProto = Object.getPrototypeOf(baseProto);
    }
    return proto === baseProto;
  }
  var MiddlewareArray = function(_super) {
    __extends(MiddlewareArray2, _super);
    function MiddlewareArray2() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var _this = _super.apply(this, args) || this;
      Object.setPrototypeOf(_this, MiddlewareArray2.prototype);
      return _this;
    }
    Object.defineProperty(MiddlewareArray2, Symbol.species, {
      get: function() {
        return MiddlewareArray2;
      },
      enumerable: false,
      configurable: true
    });
    MiddlewareArray2.prototype.concat = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      return _super.prototype.concat.apply(this, arr);
    };
    MiddlewareArray2.prototype.prepend = function() {
      var arr = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
      }
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr[0].concat(this))))();
      }
      return new (MiddlewareArray2.bind.apply(MiddlewareArray2, __spreadArray([void 0], arr.concat(this))))();
    };
    return MiddlewareArray2;
  }(Array);
  function isBoolean(x2) {
    return typeof x2 === "boolean";
  }
  function curryGetDefaultMiddleware() {
    return function curriedGetDefaultMiddleware(options) {
      return getDefaultMiddleware(options);
    };
  }
  function getDefaultMiddleware(options) {
    if (options === void 0) {
      options = {};
    }
    var _c = options.thunk, thunk2 = _c === void 0 ? true : _c, _d = options.immutableCheck, immutableCheck = _d === void 0 ? true : _d, _e = options.serializableCheck, serializableCheck = _e === void 0 ? true : _e;
    var middlewareArray = new MiddlewareArray();
    if (thunk2) {
      if (isBoolean(thunk2)) {
        middlewareArray.push(es_default);
      } else {
        middlewareArray.push(es_default.withExtraArgument(thunk2.extraArgument));
      }
    }
    if (false) {
      if (immutableCheck) {
        var immutableOptions = {};
        if (!isBoolean(immutableCheck)) {
          immutableOptions = immutableCheck;
        }
        middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
      }
      if (serializableCheck) {
        var serializableOptions = {};
        if (!isBoolean(serializableCheck)) {
          serializableOptions = serializableCheck;
        }
        middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
      }
    }
    return middlewareArray;
  }
  var IS_PRODUCTION = true;
  function configureStore(options) {
    var curriedGetDefaultMiddleware = curryGetDefaultMiddleware();
    var _c = options || {}, _d = _c.reducer, reducer2 = _d === void 0 ? void 0 : _d, _e = _c.middleware, middleware = _e === void 0 ? curriedGetDefaultMiddleware() : _e, _f = _c.devTools, devTools = _f === void 0 ? true : _f, _g = _c.preloadedState, preloadedState = _g === void 0 ? void 0 : _g, _h = _c.enhancers, enhancers = _h === void 0 ? void 0 : _h;
    var rootReducer;
    if (typeof reducer2 === "function") {
      rootReducer = reducer2;
    } else if (isPlainObject3(reducer2)) {
      rootReducer = combineReducers(reducer2);
    } else {
      throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');
    }
    var finalMiddleware = middleware;
    if (typeof finalMiddleware === "function") {
      finalMiddleware = finalMiddleware(curriedGetDefaultMiddleware);
      if (!IS_PRODUCTION && !Array.isArray(finalMiddleware)) {
        throw new Error("when using a middleware builder function, an array of middleware must be returned");
      }
    }
    if (!IS_PRODUCTION && finalMiddleware.some(function(item) {
      return typeof item !== "function";
    })) {
      throw new Error("each middleware provided to configureStore must be a function");
    }
    var middlewareEnhancer = applyMiddleware.apply(void 0, finalMiddleware);
    var finalCompose = compose;
    if (devTools) {
      finalCompose = composeWithDevTools(__spreadValues({
        trace: !IS_PRODUCTION
      }, typeof devTools === "object" && devTools));
    }
    var storeEnhancers = [middlewareEnhancer];
    if (Array.isArray(enhancers)) {
      storeEnhancers = __spreadArray([middlewareEnhancer], enhancers);
    } else if (typeof enhancers === "function") {
      storeEnhancers = enhancers(storeEnhancers);
    }
    var composedEnhancer = finalCompose.apply(void 0, storeEnhancers);
    return createStore(rootReducer, preloadedState, composedEnhancer);
  }
  function createAction(type3, prepareAction) {
    function actionCreator() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (prepareAction) {
        var prepared = prepareAction.apply(void 0, args);
        if (!prepared) {
          throw new Error("prepareAction did not return an object");
        }
        return __spreadValues(__spreadValues({
          type: type3,
          payload: prepared.payload
        }, "meta" in prepared && {meta: prepared.meta}), "error" in prepared && {error: prepared.error});
      }
      return {type: type3, payload: args[0]};
    }
    actionCreator.toString = function() {
      return "" + type3;
    };
    actionCreator.type = type3;
    actionCreator.match = function(action) {
      return action.type === type3;
    };
    return actionCreator;
  }
  function executeReducerBuilderCallback(builderCallback) {
    var actionsMap = {};
    var actionMatchers = [];
    var defaultCaseReducer;
    var builder = {
      addCase: function(typeOrActionCreator, reducer2) {
        if (false) {
          if (actionMatchers.length > 0) {
            throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");
          }
          if (defaultCaseReducer) {
            throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");
          }
        }
        var type3 = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (type3 in actionsMap) {
          throw new Error("addCase cannot be called with two reducers for the same action type");
        }
        actionsMap[type3] = reducer2;
        return builder;
      },
      addMatcher: function(matcher, reducer2) {
        if (false) {
          if (defaultCaseReducer) {
            throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
          }
        }
        actionMatchers.push({matcher, reducer: reducer2});
        return builder;
      },
      addDefaultCase: function(reducer2) {
        if (false) {
          if (defaultCaseReducer) {
            throw new Error("`builder.addDefaultCase` can only be called once");
          }
        }
        defaultCaseReducer = reducer2;
        return builder;
      }
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
  }
  function isStateFunction(x2) {
    return typeof x2 === "function";
  }
  function createReducer(initialState2, mapOrBuilderCallback, actionMatchers, defaultCaseReducer) {
    if (actionMatchers === void 0) {
      actionMatchers = [];
    }
    var _c = typeof mapOrBuilderCallback === "function" ? executeReducerBuilderCallback(mapOrBuilderCallback) : [mapOrBuilderCallback, actionMatchers, defaultCaseReducer], actionsMap = _c[0], finalActionMatchers = _c[1], finalDefaultCaseReducer = _c[2];
    var getInitialState;
    if (isStateFunction(initialState2)) {
      getInitialState = function() {
        return immer_esm_default(initialState2(), function() {
        });
      };
    } else {
      var frozenInitialState_1 = immer_esm_default(initialState2, function() {
      });
      getInitialState = function() {
        return frozenInitialState_1;
      };
    }
    function reducer2(state, action) {
      if (state === void 0) {
        state = getInitialState();
      }
      var caseReducers = __spreadArray([
        actionsMap[action.type]
      ], finalActionMatchers.filter(function(_c2) {
        var matcher = _c2.matcher;
        return matcher(action);
      }).map(function(_c2) {
        var reducer22 = _c2.reducer;
        return reducer22;
      }));
      if (caseReducers.filter(function(cr) {
        return !!cr;
      }).length === 0) {
        caseReducers = [finalDefaultCaseReducer];
      }
      return caseReducers.reduce(function(previousState, caseReducer) {
        if (caseReducer) {
          if (r(previousState)) {
            var draft = previousState;
            var result = caseReducer(draft, action);
            if (typeof result === "undefined") {
              return previousState;
            }
            return result;
          } else if (!t(previousState)) {
            var result = caseReducer(previousState, action);
            if (typeof result === "undefined") {
              if (previousState === null) {
                return previousState;
              }
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return result;
          } else {
            return immer_esm_default(previousState, function(draft2) {
              return caseReducer(draft2, action);
            });
          }
        }
        return previousState;
      }, state);
    }
    reducer2.getInitialState = getInitialState;
    return reducer2;
  }
  function getType2(slice3, actionKey) {
    return slice3 + "/" + actionKey;
  }
  function createSlice(options) {
    var name = options.name;
    if (!name) {
      throw new Error("`name` is a required option for createSlice");
    }
    var initialState2 = typeof options.initialState == "function" ? options.initialState : immer_esm_default(options.initialState, function() {
    });
    var reducers = options.reducers || {};
    var reducerNames = Object.keys(reducers);
    var sliceCaseReducersByName = {};
    var sliceCaseReducersByType = {};
    var actionCreators = {};
    reducerNames.forEach(function(reducerName) {
      var maybeReducerWithPrepare = reducers[reducerName];
      var type3 = getType2(name, reducerName);
      var caseReducer;
      var prepareCallback;
      if ("reducer" in maybeReducerWithPrepare) {
        caseReducer = maybeReducerWithPrepare.reducer;
        prepareCallback = maybeReducerWithPrepare.prepare;
      } else {
        caseReducer = maybeReducerWithPrepare;
      }
      sliceCaseReducersByName[reducerName] = caseReducer;
      sliceCaseReducersByType[type3] = caseReducer;
      actionCreators[reducerName] = prepareCallback ? createAction(type3, prepareCallback) : createAction(type3);
    });
    function buildReducer() {
      var _c = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers], _d = _c[0], extraReducers = _d === void 0 ? {} : _d, _e = _c[1], actionMatchers = _e === void 0 ? [] : _e, _f = _c[2], defaultCaseReducer = _f === void 0 ? void 0 : _f;
      var finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), sliceCaseReducersByType);
      return createReducer(initialState2, finalCaseReducers, actionMatchers, defaultCaseReducer);
    }
    var _reducer;
    return {
      name,
      reducer: function(state, action) {
        if (!_reducer)
          _reducer = buildReducer();
        return _reducer(state, action);
      },
      actions: actionCreators,
      caseReducers: sliceCaseReducersByName,
      getInitialState: function() {
        if (!_reducer)
          _reducer = buildReducer();
        return _reducer.getInitialState();
      }
    };
  }
  var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
  var nanoid = function(size) {
    if (size === void 0) {
      size = 21;
    }
    var id = "";
    var i3 = size;
    while (i3--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  var commonProperties = [
    "name",
    "message",
    "stack",
    "code"
  ];
  var RejectWithValue = function() {
    function RejectWithValue2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return RejectWithValue2;
  }();
  var FulfillWithMeta = function() {
    function FulfillWithMeta2(payload, meta) {
      this.payload = payload;
      this.meta = meta;
    }
    return FulfillWithMeta2;
  }();
  var miniSerializeError = function(value) {
    if (typeof value === "object" && value !== null) {
      var simpleError = {};
      for (var _i = 0, commonProperties_1 = commonProperties; _i < commonProperties_1.length; _i++) {
        var property = commonProperties_1[_i];
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }
      return simpleError;
    }
    return {message: String(value)};
  };
  function createAsyncThunk(typePrefix, payloadCreator, options) {
    var fulfilled = createAction(typePrefix + "/fulfilled", function(payload, requestId, arg, meta) {
      return {
        payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "fulfilled"
        })
      };
    });
    var pending = createAction(typePrefix + "/pending", function(requestId, arg, meta) {
      return {
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "pending"
        })
      };
    });
    var rejected = createAction(typePrefix + "/rejected", function(error, requestId, arg, payload, meta) {
      return {
        payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      };
    });
    var displayedWarning = false;
    var AC = typeof AbortController !== "undefined" ? AbortController : function() {
      function class_1() {
        this.signal = {
          aborted: false,
          addEventListener: function() {
          },
          dispatchEvent: function() {
            return false;
          },
          onabort: function() {
          },
          removeEventListener: function() {
          }
        };
      }
      class_1.prototype.abort = function() {
        if (false) {
          if (!displayedWarning) {
            displayedWarning = true;
            console.info("This platform does not implement AbortController. \nIf you want to use the AbortController to react to `abort` events, please consider importing a polyfill like 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'.");
          }
        }
      };
      return class_1;
    }();
    function actionCreator(arg) {
      return function(dispatch, getState, extra) {
        var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
        var abortController = new AC();
        var abortReason;
        var abortedPromise = new Promise(function(_3, reject3) {
          return abortController.signal.addEventListener("abort", function() {
            return reject3({name: "AbortError", message: abortReason || "Aborted"});
          });
        });
        var started = false;
        function abort(reason) {
          if (started) {
            abortReason = reason;
            abortController.abort();
          }
        }
        var promise = function() {
          return __async(this, null, function() {
            var _a, _b, finalAction, conditionResult, err_1, skipDispatch;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _c.trys.push([0, 4, , 5]);
                  conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, {getState, extra});
                  if (!isThenable(conditionResult))
                    return [3, 2];
                  return [4, conditionResult];
                case 1:
                  conditionResult = _c.sent();
                  _c.label = 2;
                case 2:
                  if (conditionResult === false) {
                    throw {
                      name: "ConditionError",
                      message: "Aborted due to condition callback returning false."
                    };
                  }
                  started = true;
                  dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, {requestId, arg}, {getState, extra})));
                  return [4, Promise.race([
                    abortedPromise,
                    Promise.resolve(payloadCreator(arg, {
                      dispatch,
                      getState,
                      extra,
                      requestId,
                      signal: abortController.signal,
                      rejectWithValue: function(value, meta) {
                        return new RejectWithValue(value, meta);
                      },
                      fulfillWithValue: function(value, meta) {
                        return new FulfillWithMeta(value, meta);
                      }
                    })).then(function(result) {
                      if (result instanceof RejectWithValue) {
                        throw result;
                      }
                      if (result instanceof FulfillWithMeta) {
                        return fulfilled(result.payload, requestId, arg, result.meta);
                      }
                      return fulfilled(result, requestId, arg);
                    })
                  ])];
                case 3:
                  finalAction = _c.sent();
                  return [3, 5];
                case 4:
                  err_1 = _c.sent();
                  finalAction = err_1 instanceof RejectWithValue ? rejected(null, requestId, arg, err_1.payload, err_1.meta) : rejected(err_1, requestId, arg);
                  return [3, 5];
                case 5:
                  skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
                  if (!skipDispatch) {
                    dispatch(finalAction);
                  }
                  return [2, finalAction];
              }
            });
          });
        }();
        return Object.assign(promise, {
          abort,
          requestId,
          arg,
          unwrap: function() {
            return promise.then(unwrapResult);
          }
        });
      };
    }
    return Object.assign(actionCreator, {
      pending,
      rejected,
      fulfilled,
      typePrefix
    });
  }
  function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) {
      throw action.payload;
    }
    if (action.error) {
      throw action.error;
    }
    return action.payload;
  }
  function isThenable(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
  }
  var task = "task";
  var listener = "listener";
  var completed = "completed";
  var cancelled = "cancelled";
  var taskCancelled = "task-" + cancelled;
  var taskCompleted = "task-" + completed;
  var listenerCancelled = listener + "-" + cancelled;
  var listenerCompleted = listener + "-" + completed;
  var TaskAbortError = function() {
    function TaskAbortError2(code) {
      this.code = code;
      this.name = "TaskAbortError";
      this.message = task + " " + cancelled + " (reason: " + code + ")";
    }
    return TaskAbortError2;
  }();
  var alm = "listenerMiddleware";
  var addListener = createAction(alm + "/add");
  var clearAllListeners = createAction(alm + "/removeAll");
  var removeListener = createAction(alm + "/remove");
  N();

  // code.js
  var dropEvery = (n3) => `module Task${n3} where

divides x y = y \`mod\` x == 0


dropEvery [] _ = []
dropEvery (x:xs) n = dropEvery' (x:xs) n 1

dropEvery' :: [Int] -> Int -> Int -> [Int]
dropEvery' [] _ _ = []
dropEvery' (x:xs) n i =
    let current =
            if n \`divides\` i
                then []
                else [x]
    in current : dropEvery' xs n (i+1)
`;
  var rotate = (n3) => `module Task${n3} where
-- Rotate a list N places to the left.

rotate1 :: [a] -> [a]
rotate1 x = tail x ++ [head x]

rotate1Back :: [a] -> [a]
rotate1Back x = last x : init x


rotate :: [a] -> Int -> [a]
rotate [] _ = []
rotate x 0 = x
rotate x y
  | y > 0 = rotate rotate1 (y-1)
  | otherwise = rotate rotate1Back x (y+1)
`;
  var insertAt = (n3) => `module Task${n3} where

-- Insert an element at a given position into a list.

insertAt el lst n =
    let accu (i, acc) x =
            if i == n
                then (acc ++ [el,x],i+1)
                else (acc ++ [x],i+1)
    in fst $ foldl accu ([],1) lst


`;
  var balanceTree = (n3) => `module Task${n3} where

data Tree a = Empty | Branch a (Tree a) (Tree a)
leaf x = Branch x Empty Empty

isBalancedTree Empty = True
isBalancedTree (Branch _ l r) =
    (countBranches l - countBranches r) == 1
    || (countBranches r - countBranches l) == 1
    && isBalancedTree l && isBalancedTree r


countBranches Empty = 0
countBranches (Branch _ l r) = 1 + l + r
`;
  var compress = (n3) => `module Task${n3} where
--  Eliminate consecutive duplicates of list elements.

compress = foldr skipDups

skipDups x [] = [x]
skipDups x acc
   | x == head acc = acc
   | otherwise = x : acc

expect = [3,4,5,6]

actual = compress [3,3,4,5,6,6]

test :: Bool
test =  expect == actual
`;
  var uconandvcon = (n3) => `module Task${n3} where

data U = UCon Bool Int (Int, Int)

u (UCon x y z) =
  if x
    then z
    else fst y + snd y

actual = u (UCon False 0 (15, 10))
expect = 25

test :: Bool
test = actual == expect

`;
  var quicksort = (n3) => `module Task${n3} where

quick :: [Int] -> [Int]
quick []   = []
quick (x:xs)=
 let littlebigs = split xs
 in
   quick (fst littlebigs)
    ++ [x]
    ++  quick (snd littlebigs)

split [] _ result = result
split (x:xs) n (littles, bigs) =
  if x < n
    then split xs n (x:littles, bigs)
    else split xs n (littles, x:bigs)
`;
  var printXML = (n3) => `module Task${n3} where

data XML = XML Position Part
data Position = Top | Bottom | Left | Right

type Name = String

data Part =
     Element Name [Attribute] [XML]
   | Comment String
   | Text String

getPart :: XML -> Part
getPart (XML pos part) = part


printXML (Element name [attributs] xmls) =
  "<" ++ name ++ ">"
  ++ mconcat (map printXML xmls)
  ++ "</" ++ name ++ ">"
printXML (Text text) = text


`;
  var euler1 = (n3) => `module Task${n3} where

-- Add all the natural numbers below 1000
-- that are multiples of 3 or 5.
sum [] = 0
sum [x] = x
sum (x:xs) = x + sum xs

check (x:xs)
  | x \`mod\` 3 == 0 || x \`mod\` 5 == 0 = x + check xs
  | otherwise = check xs

problem_1 = sum (check [1..999])
`;
  var examples = [
    euler1,
    dropEvery,
    rotate,
    insertAt,
    balanceTree,
    compress,
    uconandvcon,
    quicksort,
    printXML
  ].map((ex, n3) => ex(n3 + 1));
  var code_default = examples;

  // node_modules/ramda/es/internal/_isPlaceholder.js
  function _isPlaceholder(a3) {
    return a3 != null && typeof a3 === "object" && a3["@@functional/placeholder"] === true;
  }

  // node_modules/ramda/es/internal/_curry1.js
  function _curry1(fn2) {
    return function f1(a3) {
      if (arguments.length === 0 || _isPlaceholder(a3)) {
        return f1;
      } else {
        return fn2.apply(this, arguments);
      }
    };
  }

  // node_modules/ramda/es/internal/_curry2.js
  function _curry2(fn2) {
    return function f22(a3, b3) {
      switch (arguments.length) {
        case 0:
          return f22;
        case 1:
          return _isPlaceholder(a3) ? f22 : _curry1(function(_b) {
            return fn2(a3, _b);
          });
        default:
          return _isPlaceholder(a3) && _isPlaceholder(b3) ? f22 : _isPlaceholder(a3) ? _curry1(function(_a) {
            return fn2(_a, b3);
          }) : _isPlaceholder(b3) ? _curry1(function(_b) {
            return fn2(a3, _b);
          }) : fn2(a3, b3);
      }
    };
  }

  // node_modules/ramda/es/internal/_arity.js
  function _arity(n3, fn2) {
    switch (n3) {
      case 0:
        return function() {
          return fn2.apply(this, arguments);
        };
      case 1:
        return function(a0) {
          return fn2.apply(this, arguments);
        };
      case 2:
        return function(a0, a1) {
          return fn2.apply(this, arguments);
        };
      case 3:
        return function(a0, a1, a22) {
          return fn2.apply(this, arguments);
        };
      case 4:
        return function(a0, a1, a22, a3) {
          return fn2.apply(this, arguments);
        };
      case 5:
        return function(a0, a1, a22, a3, a4) {
          return fn2.apply(this, arguments);
        };
      case 6:
        return function(a0, a1, a22, a3, a4, a5) {
          return fn2.apply(this, arguments);
        };
      case 7:
        return function(a0, a1, a22, a3, a4, a5, a6) {
          return fn2.apply(this, arguments);
        };
      case 8:
        return function(a0, a1, a22, a3, a4, a5, a6, a7) {
          return fn2.apply(this, arguments);
        };
      case 9:
        return function(a0, a1, a22, a3, a4, a5, a6, a7, a8) {
          return fn2.apply(this, arguments);
        };
      case 10:
        return function(a0, a1, a22, a3, a4, a5, a6, a7, a8, a9) {
          return fn2.apply(this, arguments);
        };
      default:
        throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
    }
  }

  // node_modules/ramda/es/internal/_curryN.js
  function _curryN(length3, received, fn2) {
    return function() {
      var combined = [];
      var argsIdx = 0;
      var left = length3;
      var combinedIdx = 0;
      while (combinedIdx < received.length || argsIdx < arguments.length) {
        var result;
        if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
          result = received[combinedIdx];
        } else {
          result = arguments[argsIdx];
          argsIdx += 1;
        }
        combined[combinedIdx] = result;
        if (!_isPlaceholder(result)) {
          left -= 1;
        }
        combinedIdx += 1;
      }
      return left <= 0 ? fn2.apply(this, combined) : _arity(left, _curryN(length3, combined, fn2));
    };
  }

  // node_modules/ramda/es/curryN.js
  var curryN = /* @__PURE__ */ _curry2(function curryN2(length3, fn2) {
    if (length3 === 1) {
      return _curry1(fn2);
    }
    return _arity(length3, _curryN(length3, [], fn2));
  });
  var curryN_default = curryN;

  // node_modules/ramda/es/internal/_curry3.js
  function _curry3(fn2) {
    return function f3(a3, b3, c3) {
      switch (arguments.length) {
        case 0:
          return f3;
        case 1:
          return _isPlaceholder(a3) ? f3 : _curry2(function(_b, _c) {
            return fn2(a3, _b, _c);
          });
        case 2:
          return _isPlaceholder(a3) && _isPlaceholder(b3) ? f3 : _isPlaceholder(a3) ? _curry2(function(_a, _c) {
            return fn2(_a, b3, _c);
          }) : _isPlaceholder(b3) ? _curry2(function(_b, _c) {
            return fn2(a3, _b, _c);
          }) : _curry1(function(_c) {
            return fn2(a3, b3, _c);
          });
        default:
          return _isPlaceholder(a3) && _isPlaceholder(b3) && _isPlaceholder(c3) ? f3 : _isPlaceholder(a3) && _isPlaceholder(b3) ? _curry2(function(_a, _b) {
            return fn2(_a, _b, c3);
          }) : _isPlaceholder(a3) && _isPlaceholder(c3) ? _curry2(function(_a, _c) {
            return fn2(_a, b3, _c);
          }) : _isPlaceholder(b3) && _isPlaceholder(c3) ? _curry2(function(_b, _c) {
            return fn2(a3, _b, _c);
          }) : _isPlaceholder(a3) ? _curry1(function(_a) {
            return fn2(_a, b3, c3);
          }) : _isPlaceholder(b3) ? _curry1(function(_b) {
            return fn2(a3, _b, c3);
          }) : _isPlaceholder(c3) ? _curry1(function(_c) {
            return fn2(a3, b3, _c);
          }) : fn2(a3, b3, c3);
      }
    };
  }

  // node_modules/ramda/es/internal/_isArray.js
  var isArray_default = Array.isArray || function _isArray(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
  };

  // node_modules/ramda/es/internal/_isTransformer.js
  function _isTransformer(obj) {
    return obj != null && typeof obj["@@transducer/step"] === "function";
  }

  // node_modules/ramda/es/internal/_dispatchable.js
  function _dispatchable(methodNames, transducerCreator, fn2) {
    return function() {
      if (arguments.length === 0) {
        return fn2();
      }
      var obj = arguments[arguments.length - 1];
      if (!isArray_default(obj)) {
        var idx = 0;
        while (idx < methodNames.length) {
          if (typeof obj[methodNames[idx]] === "function") {
            return obj[methodNames[idx]].apply(obj, Array.prototype.slice.call(arguments, 0, -1));
          }
          idx += 1;
        }
        if (_isTransformer(obj)) {
          var transducer = transducerCreator.apply(null, Array.prototype.slice.call(arguments, 0, -1));
          return transducer(obj);
        }
      }
      return fn2.apply(this, arguments);
    };
  }

  // node_modules/ramda/es/internal/_reduced.js
  function _reduced(x2) {
    return x2 && x2["@@transducer/reduced"] ? x2 : {
      "@@transducer/value": x2,
      "@@transducer/reduced": true
    };
  }

  // node_modules/ramda/es/internal/_xfBase.js
  var xfBase_default = {
    init: function() {
      return this.xf["@@transducer/init"]();
    },
    result: function(result) {
      return this.xf["@@transducer/result"](result);
    }
  };

  // node_modules/ramda/es/internal/_map.js
  function _map(fn2, functor) {
    var idx = 0;
    var len = functor.length;
    var result = Array(len);
    while (idx < len) {
      result[idx] = fn2(functor[idx]);
      idx += 1;
    }
    return result;
  }

  // node_modules/ramda/es/internal/_isString.js
  function _isString(x2) {
    return Object.prototype.toString.call(x2) === "[object String]";
  }

  // node_modules/ramda/es/internal/_isArrayLike.js
  var _isArrayLike = /* @__PURE__ */ _curry1(function isArrayLike(x2) {
    if (isArray_default(x2)) {
      return true;
    }
    if (!x2) {
      return false;
    }
    if (typeof x2 !== "object") {
      return false;
    }
    if (_isString(x2)) {
      return false;
    }
    if (x2.length === 0) {
      return true;
    }
    if (x2.length > 0) {
      return x2.hasOwnProperty(0) && x2.hasOwnProperty(x2.length - 1);
    }
    return false;
  });
  var isArrayLike_default = _isArrayLike;

  // node_modules/ramda/es/internal/_xwrap.js
  var XWrap = /* @__PURE__ */ function() {
    function XWrap2(fn2) {
      this.f = fn2;
    }
    XWrap2.prototype["@@transducer/init"] = function() {
      throw new Error("init not implemented on XWrap");
    };
    XWrap2.prototype["@@transducer/result"] = function(acc) {
      return acc;
    };
    XWrap2.prototype["@@transducer/step"] = function(acc, x2) {
      return this.f(acc, x2);
    };
    return XWrap2;
  }();
  function _xwrap(fn2) {
    return new XWrap(fn2);
  }

  // node_modules/ramda/es/bind.js
  var bind = /* @__PURE__ */ _curry2(function bind2(fn2, thisObj) {
    return _arity(fn2.length, function() {
      return fn2.apply(thisObj, arguments);
    });
  });
  var bind_default = bind;

  // node_modules/ramda/es/internal/_reduce.js
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      acc = xf["@@transducer/step"](acc, list[idx]);
      if (acc && acc["@@transducer/reduced"]) {
        acc = acc["@@transducer/value"];
        break;
      }
      idx += 1;
    }
    return xf["@@transducer/result"](acc);
  }
  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();
    while (!step.done) {
      acc = xf["@@transducer/step"](acc, step.value);
      if (acc && acc["@@transducer/reduced"]) {
        acc = acc["@@transducer/value"];
        break;
      }
      step = iter.next();
    }
    return xf["@@transducer/result"](acc);
  }
  function _methodReduce(xf, acc, obj, methodName) {
    return xf["@@transducer/result"](obj[methodName](bind_default(xf["@@transducer/step"], xf), acc));
  }
  var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
  function _reduce(fn2, acc, list) {
    if (typeof fn2 === "function") {
      fn2 = _xwrap(fn2);
    }
    if (isArrayLike_default(list)) {
      return _arrayReduce(fn2, acc, list);
    }
    if (typeof list["fantasy-land/reduce"] === "function") {
      return _methodReduce(fn2, acc, list, "fantasy-land/reduce");
    }
    if (list[symIterator] != null) {
      return _iterableReduce(fn2, acc, list[symIterator]());
    }
    if (typeof list.next === "function") {
      return _iterableReduce(fn2, acc, list);
    }
    if (typeof list.reduce === "function") {
      return _methodReduce(fn2, acc, list, "reduce");
    }
    throw new TypeError("reduce: list must be array or iterable");
  }

  // node_modules/ramda/es/internal/_xmap.js
  var XMap = /* @__PURE__ */ function() {
    function XMap2(f3, xf) {
      this.xf = xf;
      this.f = f3;
    }
    XMap2.prototype["@@transducer/init"] = xfBase_default.init;
    XMap2.prototype["@@transducer/result"] = xfBase_default.result;
    XMap2.prototype["@@transducer/step"] = function(result, input) {
      return this.xf["@@transducer/step"](result, this.f(input));
    };
    return XMap2;
  }();
  var _xmap = /* @__PURE__ */ _curry2(function _xmap2(f3, xf) {
    return new XMap(f3, xf);
  });
  var xmap_default = _xmap;

  // node_modules/ramda/es/internal/_has.js
  function _has(prop3, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop3);
  }

  // node_modules/ramda/es/internal/_isArguments.js
  var toString = Object.prototype.toString;
  var _isArguments = /* @__PURE__ */ function() {
    return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x2) {
      return toString.call(x2) === "[object Arguments]";
    } : function _isArguments2(x2) {
      return _has("callee", x2);
    };
  }();
  var isArguments_default = _isArguments;

  // node_modules/ramda/es/keys.js
  var hasEnumBug = !/* @__PURE__ */ {
    toString: null
  }.propertyIsEnumerable("toString");
  var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  var hasArgsEnumBug = /* @__PURE__ */ function() {
    "use strict";
    return arguments.propertyIsEnumerable("length");
  }();
  var contains = function contains2(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };
  var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) : /* @__PURE__ */ _curry1(function keys3(obj) {
    if (Object(obj) !== obj) {
      return [];
    }
    var prop3, nIdx;
    var ks = [];
    var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
    for (prop3 in obj) {
      if (_has(prop3, obj) && (!checkArgsLength || prop3 !== "length")) {
        ks[ks.length] = prop3;
      }
    }
    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;
      while (nIdx >= 0) {
        prop3 = nonEnumerableProps[nIdx];
        if (_has(prop3, obj) && !contains(ks, prop3)) {
          ks[ks.length] = prop3;
        }
        nIdx -= 1;
      }
    }
    return ks;
  });
  var keys_default = keys;

  // node_modules/ramda/es/map.js
  var map = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["fantasy-land/map", "map"], xmap_default, function map2(fn2, functor) {
    switch (Object.prototype.toString.call(functor)) {
      case "[object Function]":
        return curryN_default(functor.length, function() {
          return fn2.call(this, functor.apply(this, arguments));
        });
      case "[object Object]":
        return _reduce(function(acc, key) {
          acc[key] = fn2(functor[key]);
          return acc;
        }, {}, keys_default(functor));
      default:
        return _map(fn2, functor);
    }
  }));
  var map_default = map;

  // node_modules/ramda/es/internal/_isInteger.js
  var isInteger_default = Number.isInteger || function _isInteger(n3) {
    return n3 << 0 === n3;
  };

  // node_modules/ramda/es/nth.js
  var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });
  var nth_default = nth;

  // node_modules/ramda/es/prop.js
  var prop = /* @__PURE__ */ _curry2(function prop2(p3, obj) {
    if (obj == null) {
      return;
    }
    return isInteger_default(p3) ? nth_default(p3, obj) : obj[p3];
  });
  var prop_default = prop;

  // node_modules/ramda/es/reduce.js
  var reduce = /* @__PURE__ */ _curry3(_reduce);
  var reduce_default = reduce;

  // node_modules/ramda/es/always.js
  var always = /* @__PURE__ */ _curry1(function always2(val) {
    return function() {
      return val;
    };
  });
  var always_default = always;

  // node_modules/ramda/es/internal/_xany.js
  var XAny = /* @__PURE__ */ function() {
    function XAny2(f3, xf) {
      this.xf = xf;
      this.f = f3;
      this.any = false;
    }
    XAny2.prototype["@@transducer/init"] = xfBase_default.init;
    XAny2.prototype["@@transducer/result"] = function(result) {
      if (!this.any) {
        result = this.xf["@@transducer/step"](result, false);
      }
      return this.xf["@@transducer/result"](result);
    };
    XAny2.prototype["@@transducer/step"] = function(result, input) {
      if (this.f(input)) {
        this.any = true;
        result = _reduced(this.xf["@@transducer/step"](result, true));
      }
      return result;
    };
    return XAny2;
  }();
  var _xany = /* @__PURE__ */ _curry2(function _xany2(f3, xf) {
    return new XAny(f3, xf);
  });
  var xany_default = _xany;

  // node_modules/ramda/es/any.js
  var any = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["any"], xany_default, function any2(fn2, list) {
    var idx = 0;
    while (idx < list.length) {
      if (fn2(list[idx])) {
        return true;
      }
      idx += 1;
    }
    return false;
  }));
  var any_default = any;

  // node_modules/ramda/es/internal/_assoc.js
  function _assoc(prop3, val, obj) {
    if (isInteger_default(prop3) && isArray_default(obj)) {
      var arr = [].concat(obj);
      arr[prop3] = val;
      return arr;
    }
    var result = {};
    for (var p3 in obj) {
      result[p3] = obj[p3];
    }
    result[prop3] = val;
    return result;
  }

  // node_modules/ramda/es/isNil.js
  var isNil = /* @__PURE__ */ _curry1(function isNil2(x2) {
    return x2 == null;
  });
  var isNil_default = isNil;

  // node_modules/ramda/es/assocPath.js
  var assocPath = /* @__PURE__ */ _curry3(function assocPath2(path3, val, obj) {
    if (path3.length === 0) {
      return val;
    }
    var idx = path3[0];
    if (path3.length > 1) {
      var nextObj = !isNil_default(obj) && _has(idx, obj) ? obj[idx] : isInteger_default(path3[1]) ? [] : {};
      val = assocPath2(Array.prototype.slice.call(path3, 1), val, nextObj);
    }
    return _assoc(idx, val, obj);
  });
  var assocPath_default = assocPath;

  // node_modules/ramda/es/assoc.js
  var assoc = /* @__PURE__ */ _curry3(function assoc2(prop3, val, obj) {
    return assocPath_default([prop3], val, obj);
  });
  var assoc_default = assoc;

  // node_modules/ramda/es/internal/_isFunction.js
  function _isFunction(x2) {
    var type3 = Object.prototype.toString.call(x2);
    return type3 === "[object Function]" || type3 === "[object AsyncFunction]" || type3 === "[object GeneratorFunction]" || type3 === "[object AsyncGeneratorFunction]";
  }

  // node_modules/ramda/es/internal/_makeFlat.js
  function _makeFlat(recursive) {
    return function flatt(list) {
      var value, jlen, j2;
      var result = [];
      var idx = 0;
      var ilen = list.length;
      while (idx < ilen) {
        if (isArrayLike_default(list[idx])) {
          value = recursive ? flatt(list[idx]) : list[idx];
          j2 = 0;
          jlen = value.length;
          while (j2 < jlen) {
            result[result.length] = value[j2];
            j2 += 1;
          }
        } else {
          result[result.length] = list[idx];
        }
        idx += 1;
      }
      return result;
    };
  }

  // node_modules/ramda/es/type.js
  var type = /* @__PURE__ */ _curry1(function type2(val) {
    return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
  });
  var type_default = type;

  // node_modules/ramda/es/not.js
  var not = /* @__PURE__ */ _curry1(function not2(a3) {
    return !a3;
  });
  var not_default = not;

  // node_modules/ramda/es/internal/_pipe.js
  function _pipe(f3, g3) {
    return function() {
      return g3.call(this, f3.apply(this, arguments));
    };
  }

  // node_modules/ramda/es/internal/_checkForMethod.js
  function _checkForMethod(methodname, fn2) {
    return function() {
      var length3 = arguments.length;
      if (length3 === 0) {
        return fn2();
      }
      var obj = arguments[length3 - 1];
      return isArray_default(obj) || typeof obj[methodname] !== "function" ? fn2.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length3 - 1));
    };
  }

  // node_modules/ramda/es/slice.js
  var slice = /* @__PURE__ */ _curry3(/* @__PURE__ */ _checkForMethod("slice", function slice2(fromIndex, toIndex, list) {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  }));
  var slice_default = slice;

  // node_modules/ramda/es/tail.js
  var tail = /* @__PURE__ */ _curry1(/* @__PURE__ */ _checkForMethod("tail", /* @__PURE__ */ slice_default(1, Infinity)));
  var tail_default = tail;

  // node_modules/ramda/es/pipe.js
  function pipe() {
    if (arguments.length === 0) {
      throw new Error("pipe requires at least one argument");
    }
    return _arity(arguments[0].length, reduce_default(_pipe, arguments[0], tail_default(arguments)));
  }

  // node_modules/ramda/es/reverse.js
  var reverse = /* @__PURE__ */ _curry1(function reverse2(list) {
    return _isString(list) ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
  });
  var reverse_default = reverse;

  // node_modules/ramda/es/head.js
  var head = /* @__PURE__ */ nth_default(0);
  var head_default = head;

  // node_modules/ramda/es/internal/_arrayFromIterator.js
  function _arrayFromIterator(iter) {
    var list = [];
    var next;
    while (!(next = iter.next()).done) {
      list.push(next.value);
    }
    return list;
  }

  // node_modules/ramda/es/internal/_includesWith.js
  function _includesWith(pred, x2, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (pred(x2, list[idx])) {
        return true;
      }
      idx += 1;
    }
    return false;
  }

  // node_modules/ramda/es/internal/_functionName.js
  function _functionName(f3) {
    var match = String(f3).match(/^function (\w*)/);
    return match == null ? "" : match[1];
  }

  // node_modules/ramda/es/internal/_objectIs.js
  function _objectIs(a3, b3) {
    if (a3 === b3) {
      return a3 !== 0 || 1 / a3 === 1 / b3;
    } else {
      return a3 !== a3 && b3 !== b3;
    }
  }
  var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

  // node_modules/ramda/es/internal/_equals.js
  function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
    var a3 = _arrayFromIterator(aIterator);
    var b3 = _arrayFromIterator(bIterator);
    function eq(_a, _b) {
      return _equals(_a, _b, stackA.slice(), stackB.slice());
    }
    return !_includesWith(function(b4, aItem) {
      return !_includesWith(eq, aItem, b4);
    }, b3, a3);
  }
  function _equals(a3, b3, stackA, stackB) {
    if (objectIs_default(a3, b3)) {
      return true;
    }
    var typeA = type_default(a3);
    if (typeA !== type_default(b3)) {
      return false;
    }
    if (typeof a3["fantasy-land/equals"] === "function" || typeof b3["fantasy-land/equals"] === "function") {
      return typeof a3["fantasy-land/equals"] === "function" && a3["fantasy-land/equals"](b3) && typeof b3["fantasy-land/equals"] === "function" && b3["fantasy-land/equals"](a3);
    }
    if (typeof a3.equals === "function" || typeof b3.equals === "function") {
      return typeof a3.equals === "function" && a3.equals(b3) && typeof b3.equals === "function" && b3.equals(a3);
    }
    switch (typeA) {
      case "Arguments":
      case "Array":
      case "Object":
        if (typeof a3.constructor === "function" && _functionName(a3.constructor) === "Promise") {
          return a3 === b3;
        }
        break;
      case "Boolean":
      case "Number":
      case "String":
        if (!(typeof a3 === typeof b3 && objectIs_default(a3.valueOf(), b3.valueOf()))) {
          return false;
        }
        break;
      case "Date":
        if (!objectIs_default(a3.valueOf(), b3.valueOf())) {
          return false;
        }
        break;
      case "Error":
        return a3.name === b3.name && a3.message === b3.message;
      case "RegExp":
        if (!(a3.source === b3.source && a3.global === b3.global && a3.ignoreCase === b3.ignoreCase && a3.multiline === b3.multiline && a3.sticky === b3.sticky && a3.unicode === b3.unicode)) {
          return false;
        }
        break;
    }
    var idx = stackA.length - 1;
    while (idx >= 0) {
      if (stackA[idx] === a3) {
        return stackB[idx] === b3;
      }
      idx -= 1;
    }
    switch (typeA) {
      case "Map":
        if (a3.size !== b3.size) {
          return false;
        }
        return _uniqContentEquals(a3.entries(), b3.entries(), stackA.concat([a3]), stackB.concat([b3]));
      case "Set":
        if (a3.size !== b3.size) {
          return false;
        }
        return _uniqContentEquals(a3.values(), b3.values(), stackA.concat([a3]), stackB.concat([b3]));
      case "Arguments":
      case "Array":
      case "Object":
      case "Boolean":
      case "Number":
      case "String":
      case "Date":
      case "Error":
      case "RegExp":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "ArrayBuffer":
        break;
      default:
        return false;
    }
    var keysA = keys_default(a3);
    if (keysA.length !== keys_default(b3).length) {
      return false;
    }
    var extendedStackA = stackA.concat([a3]);
    var extendedStackB = stackB.concat([b3]);
    idx = keysA.length - 1;
    while (idx >= 0) {
      var key = keysA[idx];
      if (!(_has(key, b3) && _equals(b3[key], a3[key], extendedStackA, extendedStackB))) {
        return false;
      }
      idx -= 1;
    }
    return true;
  }

  // node_modules/ramda/es/equals.js
  var equals = /* @__PURE__ */ _curry2(function equals2(a3, b3) {
    return _equals(a3, b3, [], []);
  });
  var equals_default = equals;

  // node_modules/ramda/es/internal/_indexOf.js
  function _indexOf(list, a3, idx) {
    var inf, item;
    if (typeof list.indexOf === "function") {
      switch (typeof a3) {
        case "number":
          if (a3 === 0) {
            inf = 1 / a3;
            while (idx < list.length) {
              item = list[idx];
              if (item === 0 && 1 / item === inf) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          } else if (a3 !== a3) {
            while (idx < list.length) {
              item = list[idx];
              if (typeof item === "number" && item !== item) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          }
          return list.indexOf(a3, idx);
        case "string":
        case "boolean":
        case "function":
        case "undefined":
          return list.indexOf(a3, idx);
        case "object":
          if (a3 === null) {
            return list.indexOf(a3, idx);
          }
      }
    }
    while (idx < list.length) {
      if (equals_default(list[idx], a3)) {
        return idx;
      }
      idx += 1;
    }
    return -1;
  }

  // node_modules/ramda/es/internal/_includes.js
  function _includes(a3, list) {
    return _indexOf(list, a3, 0) >= 0;
  }

  // node_modules/ramda/es/internal/_quote.js
  function _quote(s3) {
    var escaped = s3.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
    return '"' + escaped.replace(/"/g, '\\"') + '"';
  }

  // node_modules/ramda/es/internal/_toISOString.js
  var pad = function pad2(n3) {
    return (n3 < 10 ? "0" : "") + n3;
  };
  var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d3) {
    return d3.toISOString();
  } : function _toISOString3(d3) {
    return d3.getUTCFullYear() + "-" + pad(d3.getUTCMonth() + 1) + "-" + pad(d3.getUTCDate()) + "T" + pad(d3.getUTCHours()) + ":" + pad(d3.getUTCMinutes()) + ":" + pad(d3.getUTCSeconds()) + "." + (d3.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
  };
  var toISOString_default = _toISOString;

  // node_modules/ramda/es/internal/_complement.js
  function _complement(f3) {
    return function() {
      return !f3.apply(this, arguments);
    };
  }

  // node_modules/ramda/es/internal/_filter.js
  function _filter(fn2, list) {
    var idx = 0;
    var len = list.length;
    var result = [];
    while (idx < len) {
      if (fn2(list[idx])) {
        result[result.length] = list[idx];
      }
      idx += 1;
    }
    return result;
  }

  // node_modules/ramda/es/internal/_isObject.js
  function _isObject(x2) {
    return Object.prototype.toString.call(x2) === "[object Object]";
  }

  // node_modules/ramda/es/internal/_xfilter.js
  var XFilter = /* @__PURE__ */ function() {
    function XFilter2(f3, xf) {
      this.xf = xf;
      this.f = f3;
    }
    XFilter2.prototype["@@transducer/init"] = xfBase_default.init;
    XFilter2.prototype["@@transducer/result"] = xfBase_default.result;
    XFilter2.prototype["@@transducer/step"] = function(result, input) {
      return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
    };
    return XFilter2;
  }();
  var _xfilter = /* @__PURE__ */ _curry2(function _xfilter2(f3, xf) {
    return new XFilter(f3, xf);
  });
  var xfilter_default = _xfilter;

  // node_modules/ramda/es/filter.js
  var filter = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["fantasy-land/filter", "filter"], xfilter_default, function(pred, filterable) {
    return _isObject(filterable) ? _reduce(function(acc, key) {
      if (pred(filterable[key])) {
        acc[key] = filterable[key];
      }
      return acc;
    }, {}, keys_default(filterable)) : _filter(pred, filterable);
  }));
  var filter_default = filter;

  // node_modules/ramda/es/reject.js
  var reject = /* @__PURE__ */ _curry2(function reject2(pred, filterable) {
    return filter_default(_complement(pred), filterable);
  });
  var reject_default = reject;

  // node_modules/ramda/es/internal/_toString.js
  function _toString(x2, seen) {
    var recur = function recur2(y3) {
      var xs = seen.concat([x2]);
      return _includes(y3, xs) ? "<Circular>" : _toString(y3, xs);
    };
    var mapPairs = function(obj, keys4) {
      return _map(function(k2) {
        return _quote(k2) + ": " + recur(obj[k2]);
      }, keys4.slice().sort());
    };
    switch (Object.prototype.toString.call(x2)) {
      case "[object Arguments]":
        return "(function() { return arguments; }(" + _map(recur, x2).join(", ") + "))";
      case "[object Array]":
        return "[" + _map(recur, x2).concat(mapPairs(x2, reject_default(function(k2) {
          return /^\d+$/.test(k2);
        }, keys_default(x2)))).join(", ") + "]";
      case "[object Boolean]":
        return typeof x2 === "object" ? "new Boolean(" + recur(x2.valueOf()) + ")" : x2.toString();
      case "[object Date]":
        return "new Date(" + (isNaN(x2.valueOf()) ? recur(NaN) : _quote(toISOString_default(x2))) + ")";
      case "[object Null]":
        return "null";
      case "[object Number]":
        return typeof x2 === "object" ? "new Number(" + recur(x2.valueOf()) + ")" : 1 / x2 === -Infinity ? "-0" : x2.toString(10);
      case "[object String]":
        return typeof x2 === "object" ? "new String(" + recur(x2.valueOf()) + ")" : _quote(x2);
      case "[object Undefined]":
        return "undefined";
      default:
        if (typeof x2.toString === "function") {
          var repr = x2.toString();
          if (repr !== "[object Object]") {
            return repr;
          }
        }
        return "{" + mapPairs(x2, keys_default(x2)).join(", ") + "}";
    }
  }

  // node_modules/ramda/es/toString.js
  var toString2 = /* @__PURE__ */ _curry1(function toString3(val) {
    return _toString(val, []);
  });
  var toString_default = toString2;

  // node_modules/ramda/es/curry.js
  var curry = /* @__PURE__ */ _curry1(function curry2(fn2) {
    return curryN_default(fn2.length, fn2);
  });
  var curry_default = curry;

  // node_modules/ramda/es/defaultTo.js
  var defaultTo = /* @__PURE__ */ _curry2(function defaultTo2(d3, v2) {
    return v2 == null || v2 !== v2 ? d3 : v2;
  });
  var defaultTo_default = defaultTo;

  // node_modules/ramda/es/internal/_xfind.js
  var XFind = /* @__PURE__ */ function() {
    function XFind2(f3, xf) {
      this.xf = xf;
      this.f = f3;
      this.found = false;
    }
    XFind2.prototype["@@transducer/init"] = xfBase_default.init;
    XFind2.prototype["@@transducer/result"] = function(result) {
      if (!this.found) {
        result = this.xf["@@transducer/step"](result, void 0);
      }
      return this.xf["@@transducer/result"](result);
    };
    XFind2.prototype["@@transducer/step"] = function(result, input) {
      if (this.f(input)) {
        this.found = true;
        result = _reduced(this.xf["@@transducer/step"](result, input));
      }
      return result;
    };
    return XFind2;
  }();
  var _xfind = /* @__PURE__ */ _curry2(function _xfind2(f3, xf) {
    return new XFind(f3, xf);
  });
  var xfind_default = _xfind;

  // node_modules/ramda/es/find.js
  var find = /* @__PURE__ */ _curry2(/* @__PURE__ */ _dispatchable(["find"], xfind_default, function find2(fn2, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (fn2(list[idx])) {
        return list[idx];
      }
      idx += 1;
    }
  }));
  var find_default = find;

  // node_modules/ramda/es/flatten.js
  var flatten = /* @__PURE__ */ _curry1(/* @__PURE__ */ _makeFlat(true));
  var flatten_default = flatten;

  // node_modules/ramda/es/includes.js
  var includes = /* @__PURE__ */ _curry2(_includes);
  var includes_default = includes;

  // node_modules/ramda/es/invoker.js
  var invoker = /* @__PURE__ */ _curry2(function invoker2(arity, method) {
    return curryN_default(arity + 1, function() {
      var target = arguments[arity];
      if (target != null && _isFunction(target[method])) {
        return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
      }
      throw new TypeError(toString_default(target) + ' does not have a method named "' + method + '"');
    });
  });
  var invoker_default = invoker;

  // node_modules/ramda/es/internal/_isNumber.js
  function _isNumber(x2) {
    return Object.prototype.toString.call(x2) === "[object Number]";
  }

  // node_modules/ramda/es/length.js
  var length = /* @__PURE__ */ _curry1(function length2(list) {
    return list != null && _isNumber(list.length) ? list.length : NaN;
  });
  var length_default = length;

  // node_modules/ramda/es/paths.js
  var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
    return pathsArray.map(function(paths3) {
      var val = obj;
      var idx = 0;
      var p3;
      while (idx < paths3.length) {
        if (val == null) {
          return;
        }
        p3 = paths3[idx];
        val = isInteger_default(p3) ? nth_default(p3, val) : val[p3];
        idx += 1;
      }
      return val;
    });
  });
  var paths_default = paths;

  // node_modules/ramda/es/path.js
  var path = /* @__PURE__ */ _curry2(function path2(pathAr, obj) {
    return paths_default([pathAr], obj)[0];
  });
  var path_default = path;

  // node_modules/ramda/es/internal/_modify.js
  function _modify(prop3, fn2, obj) {
    if (isInteger_default(prop3) && isArray_default(obj)) {
      var arr = [].concat(obj);
      arr[prop3] = fn2(arr[prop3]);
      return arr;
    }
    var result = {};
    for (var p3 in obj) {
      result[p3] = obj[p3];
    }
    result[prop3] = fn2(result[prop3]);
    return result;
  }

  // node_modules/ramda/es/modifyPath.js
  var modifyPath = /* @__PURE__ */ _curry3(function modifyPath2(path3, fn2, object) {
    if (!_isObject(object) && !isArray_default(object) || path3.length === 0) {
      return object;
    }
    var idx = path3[0];
    if (!_has(idx, object)) {
      return object;
    }
    if (path3.length === 1) {
      return _modify(idx, fn2, object);
    }
    var val = modifyPath2(Array.prototype.slice.call(path3, 1), fn2, object[idx]);
    if (val === object[idx]) {
      return object;
    }
    return _assoc(idx, val, object);
  });
  var modifyPath_default = modifyPath;

  // node_modules/ramda/es/modify.js
  var modify = /* @__PURE__ */ _curry3(function modify2(prop3, fn2, object) {
    return modifyPath_default([prop3], fn2, object);
  });
  var modify_default = modify;

  // node_modules/ramda/es/times.js
  var times = /* @__PURE__ */ _curry2(function times2(fn2, n3) {
    var len = Number(n3);
    var idx = 0;
    var list;
    if (len < 0 || isNaN(len)) {
      throw new RangeError("n must be a non-negative number");
    }
    list = new Array(len);
    while (idx < len) {
      list[idx] = fn2(idx);
      idx += 1;
    }
    return list;
  });
  var times_default = times;

  // node_modules/ramda/es/repeat.js
  var repeat = /* @__PURE__ */ _curry2(function repeat2(value, n3) {
    return times_default(always_default(value), n3);
  });
  var repeat_default = repeat;

  // node_modules/ramda/es/sort.js
  var sort = /* @__PURE__ */ _curry2(function sort2(comparator, list) {
    return Array.prototype.slice.call(list, 0).sort(comparator);
  });
  var sort_default = sort;

  // node_modules/ramda/es/split.js
  var split = /* @__PURE__ */ invoker_default(1, "split");
  var split_default = split;

  // node_modules/ramda/es/subtract.js
  var subtract = /* @__PURE__ */ _curry2(function subtract2(a3, b3) {
    return Number(a3) - Number(b3);
  });
  var subtract_default = subtract;

  // node_modules/ramda/es/trim.js
  var hasProtoTrim = typeof String.prototype.trim === "function";

  // util.js
  var unAlias = (str) => {
    return str.replaceAll("[Char]", "String");
  };
  var within = (point, {from, to}) => pointAfterInclusive(point, from) && pointBeforeExclusive(point, to);
  function convertLocation({
    srcSpanEndLine,
    srcSpanEndColumn,
    srcSpanStartColumn,
    srcSpanStartLine
  }) {
    return {
      from: {line: srcSpanStartLine - 1, ch: srcSpanStartColumn - 1},
      to: {line: srcSpanEndLine - 1, ch: srcSpanEndColumn - 1}
    };
  }
  var pointBeforeInclusive = (point1, point2) => {
    if (point1.line < point2.line) {
      return true;
    } else if (point1.line === point2.line) {
      return point1.ch <= point2.ch;
    } else {
      return false;
    }
  };
  var pointBeforeExclusive = (point1, point2) => {
    if (point1.line < point2.line) {
      return true;
    } else if (point1.line === point2.line) {
      return point1.ch < point2.ch;
    } else {
      return false;
    }
  };
  var pointAfterInclusive = (point1, point2) => {
    if (point1.line > point2.line) {
      return true;
    } else if (point1.line === point2.line) {
      return point1.ch >= point2.ch;
    } else {
      return false;
    }
  };
  var doesRangeSurround = (rangeA, rangeB) => {
    return pointBeforeInclusive(rangeA.from, rangeB.from) && pointAfterInclusive(rangeA.to, rangeB.to);
  };
  function drawAnnotations(rangeA, rangeB, reason, step, direction, offset) {
    let color = false;
    if (rangeB.from.line < rangeA.from.line) {
      const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles({
        left: rangeB.from.ch,
        top: rangeB.from.line,
        width: rangeB.to.ch - rangeB.from.ch,
        height: 1
      }, {
        left: rangeA.from.ch,
        top: rangeA.from.line,
        width: rangeA.to.ch - rangeA.from.ch,
        height: 1
      }, color, offset);
      return [
        {
          relativeTo: rangeB.from,
          key: "top-line",
          styles: topBox,
          classes: ["absolute", "z-40", "rounded-t-sm", "border-l", "border-t", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeB.from,
          key: "inbetween-line",
          styles: inbetweenBox,
          classes: ["absolute", "z-20", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeA.from,
          key: "bottom-line",
          styles: bottomBox,
          classes: ["absolute", "z-20", "rounded-b-sm", "border-l", "border-b", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeA.from,
          key: "annotation-box",
          styles: annotationBox,
          classes: ["absolute", "text-center", "text-sm", "z-20"],
          content: {type: "annotation", direction, reason, step}
        }
      ];
    } else {
      const [topBox, bottomBox, inbetweenBox, annotationBox] = boxStyles({
        left: rangeA.from.ch,
        top: rangeA.from.line,
        width: rangeA.to.ch - rangeA.from.ch,
        height: 1
      }, {
        left: rangeB.from.ch,
        top: rangeB.from.line,
        width: rangeB.to.ch - rangeB.from.ch,
        height: 1
      }, color, offset);
      return [
        {
          relativeTo: rangeA.from,
          key: "top-line",
          styles: topBox,
          classes: ["absolute", "z-40", "rounded-t-sm", "border-l", "border-t", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeA.from,
          key: "inbetween-line",
          styles: inbetweenBox,
          classes: ["absolute", "z-20", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeB.from,
          key: "bottom-line",
          styles: bottomBox,
          classes: ["absolute", "z-20", "rounded-b-sm", "border-l", "border-b", "border-r"],
          content: {type: "empty"}
        },
        {
          relativeTo: rangeB.from,
          key: "annotation-box",
          styles: annotationBox,
          classes: ["absolute", "text-center", "text-sm", "z-20"],
          content: {type: "annotation", direction, reason, step}
        }
      ];
    }
  }
  function boxStyles(topElem, bottomElem, color, offset) {
    const downwardBarHeight = 0.28;
    const annotationWidth = 18;
    const annotationHeight = 1.25;
    const chWidth = 0.625;
    const chHeight = 1.5;
    const lineColor = "#666666";
    const stepAsideDistance = offset * chWidth + 10;
    const styleTop = {
      background: color ? "var(--color-azure-3)" : "transparent",
      opacity: color ? 0.5 : 1,
      height: `${downwardBarHeight}rem`,
      left: `${topElem.width * chWidth / 2}rem`,
      top: `${-downwardBarHeight}rem`,
      width: `${stepAsideDistance - topElem.left * chWidth - topElem.width * chWidth / 2}rem`,
      borderColor: lineColor
    };
    const styleBottom = {
      background: color ? "var(--color-sky-3)" : "transparent",
      opacity: color ? 0.5 : 1,
      height: `${downwardBarHeight}rem`,
      left: `${bottomElem.width * chWidth / 2}rem`,
      top: `${bottomElem.height * chHeight}rem`,
      width: `${stepAsideDistance - bottomElem.left * chWidth - bottomElem.width * chWidth / 2}rem`,
      borderColor: lineColor
    };
    const styleInbetween = {
      background: color ? "var(--color-violet-3)" : "transparent",
      opacity: color ? 0.5 : 1,
      width: `${stepAsideDistance - topElem.left * chWidth - topElem.width * chWidth / 2}rem`,
      height: `${(bottomElem.top - topElem.top + 1) * chHeight - annotationHeight}rem`,
      top: `${0}rem`,
      left: `${topElem.width * chWidth / 2}rem`,
      borderColor: lineColor
    };
    const styleAnnotation = {
      background: color ? "var(--color-orange-3)" : "transparent",
      opacity: color ? 0.5 : 1,
      width: `${annotationWidth}rem`,
      height: `${annotationHeight}rem`,
      top: `${bottomElem.height * chHeight - annotationHeight}rem`,
      left: `${stepAsideDistance - bottomElem.left * chWidth - annotationWidth / 2}rem`
    };
    return [styleTop, styleBottom, styleInbetween, styleAnnotation];
  }
  var makeParentHighlightB = (range, m2) => {
    return {
      ...range,
      marker: {
        shared: [
          m2,
          "-inset-y-0.5",
          "inset-x-0",
          "border-t",
          "border-b",
          "border-black",
          "z-30"
        ],
        start: ["-left-0.5", "border-l", "rounded-l-sm"],
        end: ["-right-0.5", "border-r", "rounded-r-sm"]
      }
    };
  };
  var makeHighlightB = (range, marker) => {
    return {
      ...range,
      marker: {
        shared: [marker, "inset-0", "border-t", "border-b", "border-black", "z-40"],
        start: ["border-l", "rounded-l-sm"],
        end: ["border-r", "rounded-r-sm"]
      }
    };
  };
  var makeHighlight = (range, marker) => {
    return {
      ...range,
      marker: {
        shared: [marker, "inset-0", "z-0"],
        start: ["rounded-l-sm"],
        end: ["rounded-r-sm"]
      }
    };
  };
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function trackingAttributes(currentMode, taskNum) {
    return {
      stage: "testing",
      currentMode,
      taskNum
    };
  }

  // debuggerSlice.js
  var debuggerOrders = [
    flatten_default(repeat_default(["level1", "level2", "level3"], 3)),
    flatten_default(repeat_default(["level1", "level3", "level2"], 3)),
    flatten_default(repeat_default(["level2", "level1", "level3"], 3)),
    flatten_default(repeat_default(["level2", "level3", "level1"], 3)),
    flatten_default(repeat_default(["level3", "level1", "level2"], 3)),
    flatten_default(repeat_default(["level3", "level2", "level1"], 3))
  ];
  var debuggerOrder = debuggerOrders[getRandomInt(6)];
  var setLevelTo = (x2) => {
    if (x2 === "level1")
      return debuggingLevel1;
    if (x2 === "level2")
      return debuggingLevel2;
    if (x2 === "level3")
      return debuggingLevel3;
  };
  var editorModes = {
    edit: 0,
    normal: 1
  };
  var typeCheckThunk = createAsyncThunk("typeCheck", async (_3, {dispatch, getState}) => {
    dispatch(resetHighlights());
    let state = getState();
    let text = state.debugger.text;
    let currentTaskNum = state.debugger.currentTaskNum;
    dispatch(incrementAttemps(currentTaskNum));
    let response = await fetch("/typecheck", {
      method: "POST",
      body: text
    });
    let data = response.json();
    return data;
  });
  var toggleMultileExpThunk = createAsyncThunk("multipleExpThunk", async (_3, {dispatch, getState}) => {
    let state = getState();
    let newStep = Math.floor(state.debugger.steps.length / 2);
    if (state.debugger.multipleExps) {
      dispatch(setStep(newStep));
    }
    dispatch(toggleMultipleExps());
    return null;
  });
  var switchTaskThunk = createAsyncThunk("switchTask", async (n3, {dispatch}) => {
    let setLevelAction = setLevelTo(debuggerOrder[n3]);
    dispatch(setTask(n3));
    dispatch(typeCheckThunk(null));
    dispatch(setLevelAction());
  });
  var initialState = {
    currentStepNum: null,
    text: "",
    longestLine: 0,
    currentTraverseId: null,
    currentContextItem: null,
    pinnedStep: 0,
    highlightFilter: ["markerDefination"],
    steps: [],
    context: [],
    numOfSteps: 0,
    numOfContextRows: 0,
    prevLocs: [],
    nextLocs: [],
    currentTaskNum: null,
    cursorPosition: 0,
    wellTyped: false,
    loadError: null,
    parseError: null,
    mode: editorModes.normal,
    widgets: [],
    highlights: [],
    debuggingSteps: false,
    multipleExps: false,
    attempts: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
  var {actions, reducer} = createSlice({
    name: "editor",
    initialState,
    reducers: {
      toEditMode: assoc_default("mode", editorModes.edit),
      toNormalMode: assoc_default("mode", editorModes.normal),
      toggleDebuggerStpes: modify_default("debuggingSteps", not_default),
      toggleMultipleExps: modify_default("multipleExps", not_default),
      incrementAttemps(state, action) {
        state.attempts = state.attempts.map((v2, i3) => i3 === action.payload ? v2 + 1 : v2);
      },
      setCursorPosition(state, action) {
        state.cursorPosition = action.payload;
      },
      debuggingLevel1(state) {
        state.debuggingSteps = false;
        state.multipleExps = false;
      },
      debuggingLevel2(state) {
        state.debuggingSteps = false;
        state.multipleExps = true;
      },
      debuggingLevel3(state) {
        state.debuggingSteps = true;
        state.multipleExps = true;
      },
      setText(state, action) {
        state.text = action.payload;
      },
      showOnlyMark1(state) {
        state.highlightFilter = ["marker1", "markerDefination"];
      },
      showOnlyMark2(state) {
        state.highlightFilter = ["marker2", "markerDefination"];
      },
      showBoth(state) {
        state.highlightFilter = ["markerDefination"];
      },
      showDefination(state) {
        state.highlightFilter = ["marker1", "marker2"];
      },
      setTask(state, action) {
        if (action.payload < 0 || action.payload > code_default.length)
          return state;
        state.currentTaskNum = action.payload;
        state.text = code_default[action.payload];
        state.longestLine = pipe(split_default("\n"), map_default(split_default("")), map_default(length_default), sort_default(subtract_default), reverse_default, head_default)(code_default[action.payload]);
      },
      setStep(state, action) {
        if (state.currentStepNum === null)
          return state;
        if (action.payload > state.numOfSteps - 1 || action.payload < 0)
          return state;
        let currentStepNum = action.payload;
        let {highlights, widgets} = convertStep(state.steps[currentStepNum], currentStepNum, state.longestLine);
        let currentTraverseId = state.steps[currentStepNum].stepId;
        let currentContextItem = getCurrentActiveContext(state.context, currentTraverseId);
        state.currentStepNum = currentStepNum;
        state.highlights = [
          ...highlights,
          ...getPrevLocs(state.steps, currentStepNum),
          ...getNextLocs(state.steps, currentStepNum),
          getDefinitionHighlight(currentContextItem)
        ];
        state.widgets = widgets;
        state.currentContextItem = currentContextItem;
        state.currentTraverseId = currentTraverseId;
      },
      lockStep(state, action) {
        if (state.currentStepNum === null)
          return state;
        if (action.payload > state.numOfSteps - 1 || action.payload < 0)
          return state;
        let currentStepNum = action.payload;
        let {highlights, widgets} = convertStep(state.steps[currentStepNum], currentStepNum, state.longestLine);
        let currentTraverseId = state.steps[currentStepNum].stepId;
        let currentContextItem = getCurrentActiveContext(state.context, currentTraverseId);
        state.currentStepNum = currentStepNum;
        state.highlights = [
          ...highlights,
          ...getPrevLocs(state.steps, currentStepNum),
          ...getNextLocs(state.steps, currentStepNum),
          getDefinitionHighlight(currentContextItem)
        ];
        state.widgets = widgets;
        state.currentContextItem = currentContextItem;
        state.currentTraverseId = currentTraverseId;
        state.pinnedStep = action.payload;
      },
      resetHighlights(state) {
        state.highlights = [];
        state.widgets = [];
      },
      prevStep(state) {
        if (state.currentStepNum === null)
          return state;
        if (state.currentStepNum <= 0)
          return state;
        let currentStepNum = state.currentStepNum - 1;
        let {highlights, widgets} = convertStep(state.steps[currentStepNum], currentStepNum, state.longestLine);
        let currentTraverseId = state.steps[currentStepNum].stepId;
        let currentContextItem = getCurrentActiveContext(state.context, currentTraverseId);
        state.pinnedStep = currentStepNum;
        state.currentStepNum = currentStepNum;
        state.highlights = [
          ...highlights,
          ...getPrevLocs(state.steps, currentStepNum),
          ...getNextLocs(state.steps, currentStepNum),
          getDefinitionHighlight(currentContextItem)
        ];
        state.widgets = widgets;
        state.currentContextItem = currentContextItem;
        state.currentTraverseId = currentTraverseId;
      },
      nextStep(state) {
        if (state.currentStepNum === null)
          return state;
        if (state.currentStepNum >= state.numOfSteps - 1)
          return state;
        let currentStepNum = state.currentStepNum + 1;
        let {highlights, widgets} = convertStep(state.steps[currentStepNum], currentStepNum, state.longestLine);
        state.pinnedStep = currentStepNum;
        let currentTraverseId = state.steps[currentStepNum].stepId;
        let currentContextItem = getCurrentActiveContext(state.context, currentTraverseId);
        state.currentStepNum = currentStepNum;
        state.highlights = [
          ...highlights,
          ...getPrevLocs(state.steps, currentStepNum),
          ...getNextLocs(state.steps, currentStepNum),
          getDefinitionHighlight(currentContextItem)
        ];
        state.widgets = widgets;
        state.currentContextItem = currentContextItem;
        state.currentTraverseId = currentTraverseId;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(typeCheckThunk.fulfilled, (state, action) => {
        if (action.payload.tag === "ChTypeError") {
          let steps = action.payload.steps;
          let context = action.payload.contextTable;
          let currentStepNum = Math.floor(steps.length / 2);
          let longestLine = pipe(split_default("\n"), map_default(split_default("")), map_default(length_default), sort_default(subtract_default), reverse_default, head_default)(state.text);
          let {highlights, widgets} = convertStep(steps[currentStepNum], currentStepNum, longestLine);
          let currentTraverseId = steps[currentStepNum].stepId;
          state.context = context;
          state.steps = steps;
          state.currentContextItem = getCurrentActiveContext(context, currentTraverseId);
          state.highlights = [
            ...highlights,
            ...getPrevLocs(steps, currentStepNum),
            ...getNextLocs(steps, currentStepNum),
            getDefinitionHighlight(state.currentContextItem)
          ];
          state.widgets = widgets;
          state.numOfSteps = steps.length;
          state.numOfContextRows = context.length;
          state.currentStepNum = currentStepNum;
          state.pinnedStep = currentStepNum;
          state.currentTraverseId = currentTraverseId;
          state.parseError = null;
          state.loadError = null;
          state.wellTyped = false;
          state.longestLine = longestLine;
        } else if (action.payload.tag === "ChSuccess") {
          return Object.assign({}, {
            ...state,
            wellTyped: true,
            parseError: null,
            loadError: null
          });
        } else if (action.payload.tag === "ChLoadError") {
          let loadError = action.payload.missing;
          return Object.assign({}, {
            ...state,
            loadError,
            parseError: null
          });
        } else if (action.payload.tag === "ChParseError") {
          let parseError = {
            message: action.payload.message,
            loc: action.payload.loc
          };
          return Object.assign({}, {
            ...state,
            parseError,
            loadError: null
          });
        }
      });
    }
  });
  var {
    setStep,
    prevStep,
    nextStep,
    lockStep,
    setTask,
    setText,
    toEditMode,
    toNormalMode,
    resetHighlights,
    toggleDebuggerStpes,
    toggleMultipleExps,
    showOnlyMark1,
    showOnlyMark2,
    showBoth,
    showDefination,
    debuggingLevel1,
    debuggingLevel2,
    debuggingLevel3,
    incrementAttemps,
    setCursorPosition
  } = actions;
  var debuggerSlice_default = reducer;
  function getCurrentActiveContext(contexts, currentTraverseId) {
    let item = contexts.find((c3) => {
      return nth_default(2)(c3.contextSteps.find((x2) => equals_default(nth_default(0, x2), currentTraverseId)));
    });
    return item === void 0 ? null : item;
  }
  function getDefinitionHighlight(ctxItm) {
    let definitionBlock = convertLocation(ctxItm.contextDefinedIn);
    return makeHighlight(definitionBlock, "markerDefination");
  }
  function getPrevLocs(steps, currentNum) {
    if (steps.length === 0)
      return [];
    let {rangeA, rangeB} = convertStep(steps[currentNum], currentNum, 0);
    return steps.filter((_3, i3) => i3 < currentNum).map((step) => convertStep(step, 0, 0)).flatMap((step) => [step.rangeA, step.rangeB]).filter((l3) => !(doesRangeSurround(l3, rangeA) || doesRangeSurround(l3, rangeB))).flatMap((l3) => makeHighlight(l3, "marker1"));
  }
  function getNextLocs(steps, currentNum) {
    if (steps.length === 0)
      return [];
    let {rangeA, rangeB} = convertStep(steps[currentNum], currentNum, 0);
    return steps.filter((_3, i3) => i3 > currentNum).map((step) => convertStep(step, 0, 0)).flatMap((step) => [step.rangeA, step.rangeB]).filter((l3) => !(doesRangeSurround(l3, rangeA) || doesRangeSurround(l3, rangeB))).flatMap((l3) => makeHighlight(l3, "marker2"));
  }
  function convertStep(step, stepNum, offset) {
    let reason = step["explanation"];
    let direction = step["order"];
    let rangeA = convertLocation(step["stepA"]);
    let rangeB = convertLocation(step["stepB"]);
    let highlights;
    if (doesRangeSurround(rangeA, rangeB)) {
      highlights = [
        makeParentHighlightB(rangeA, "marker1"),
        makeHighlightB(rangeB, "marker2")
      ];
    } else if (doesRangeSurround(rangeB, rangeA)) {
      highlights = [
        makeParentHighlightB(rangeB, "marker2"),
        makeHighlightB(rangeA, "marker1")
      ];
    } else {
      highlights = [
        makeHighlightB(rangeB, "marker2"),
        makeHighlightB(rangeA, "marker1")
      ];
    }
    let widgets = drawAnnotations(rangeA, rangeB, reason, stepNum, direction, offset);
    return {highlights, widgets, rangeA, rangeB};
  }

  // store.js
  var store = configureStore({
    reducer: {
      debugger: debuggerSlice_default
    }
  });
  var store_default = store;

  // node_modules/@devbookhq/splitter/lib/mjs/index.js
  var import_jsx_runtime = __toModule(require_jsx_runtime());
  var import_react8 = __toModule(require_react());
  var import_react_is2 = __toModule(require_react_is2());
  function c2(e3, t3) {
    const n3 = getComputedStyle(t3);
    if (!n3)
      return;
    let i3 = e3 === p2.Horizontal ? t3.clientWidth : t3.clientHeight;
    return i3 !== 0 ? (e3 === p2.Horizontal ? i3 -= parseFloat(n3.paddingLeft) + parseFloat(n3.paddingRight) : i3 -= parseFloat(n3.paddingTop) + parseFloat(n3.paddingBottom), i3) : void 0;
  }
  function l2(e3, t3, n3 = []) {
    (0, import_react8.useEffect)(() => (window.addEventListener(e3, t3), () => window.removeEventListener(e3, t3)), [e3, t3, ...n3]);
  }
  !function(e3, t3) {
    t3 === void 0 && (t3 = {});
    var n3 = t3.insertAt;
    if (e3 && typeof document != "undefined") {
      var i3 = document.head || document.getElementsByTagName("head")[0], r3 = document.createElement("style");
      r3.type = "text/css", n3 === "top" && i3.firstChild ? i3.insertBefore(r3, i3.firstChild) : i3.appendChild(r3), r3.styleSheet ? r3.styleSheet.cssText = e3 : r3.appendChild(document.createTextNode(e3));
    }
  }("/* === Main Container === */\n.__dbk__container {\n  height: 100%;\n  width: 100%;\n\n  display: flex;\n  overflow: hidden;\n}\n\n.__dbk__container.Horizontal {\n  flex-direction: row;\n}\n\n.__dbk__container.Vertical {\n  flex-direction: column;\n}\n/* ====== */\n\n/* === Wrapper for each child element === */\n.__dbk__child-wrapper {\n  height: 100%;\n  width: 100%;\n}\n/* ====== */\n\n/* === Gutter === */\n.__dbk__gutter {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n/* .__dbk__gutter > div {\n  background: red;\n} */\n.__dbk__gutter.Horizontal {\n  height: 100%;\n  padding: 0 2px;\n  flex-direction: column;\n}\n.__dbk__gutter.Horizontal:hover {\n  cursor: col-resize;\n}\n\n.__dbk__gutter.Vertical {\n  width: 100%;\n  padding: 2px 0;\n  flex-direction: row;\n}\n.__dbk__gutter.Vertical:hover {\n  cursor: row-resize;\n}\n\n.__dbk__gutter.Light {\n  background: #EDF0EF;\n}\n.__dbk__gutter.Light:hover > .__dbk__dragger {\n  background: #76747B;\n}\n\n.__dbk__gutter.Dark {\n  background: #020203;\n}\n.__dbk__gutter.Dark:hover > .__dbk__dragger {\n  background: #9995A3;\n}\n/* ====== */\n\n/* === Gutter's Dragger === */\n.__dbk__dragger {\n  border-radius: 2px;\n}\n\n.__dbk__dragger.Horizontal {\n  width: 4px;\n  height: 24px;  \n}\n\n.__dbk__dragger.Vertical {\n  width: 24px;\n  height: 4px;  \n}\n\n.__dbk__dragger.Light {\n  background: #A6ACB5;\n}\n\n.__dbk__dragger.Dark {\n  background: #434252;\n}\n/* ====== */");
  var u2 = import_react8.default.forwardRef(({className: t3, theme: n3, draggerClassName: i3, direction: r3 = p2.Vertical, onMouseDown: a3}, o3) => {
    const g3 = `__dbk__gutter ${r3} ${t3 || n3}`, d3 = `__dbk__dragger ${r3} ${i3 || n3}`;
    return (0, import_jsx_runtime.jsx)("div", Object.assign({className: g3, ref: o3, dir: r3, onMouseDown: a3}, {children: (0, import_jsx_runtime.jsx)("div", {className: d3}, void 0)}), void 0);
  });
  var h2;
  var p2;
  var f2;
  function _2(e3, t3, n3) {
    let i3, r3;
    return t3 ? (i3 = e3 / 2, r3 = e3) : n3 ? (i3 = e3, r3 = e3 / 2) : (i3 = e3, r3 = e3), {aGutterSize: i3, bGutterSize: r3};
  }
  function z2(e3, t3) {
    switch (t3.type) {
      case h2.SetIsReadyToCompute:
        return Object.assign(Object.assign({}, e3), {isReady: t3.payload.isReady});
      case h2.CreatePairs: {
        const {direction: n3, children: i3, gutters: r3} = t3.payload, a3 = i3[0].parentNode;
        if (!a3)
          throw new Error("Cannot create pairs - parent is undefined.");
        const o3 = c2(n3, a3);
        if (o3 === void 0)
          throw new Error(`Cannot create pairs - parent has undefined or zero size: ${o3}.`);
        const g3 = [];
        return i3.forEach((e4, t4) => {
          if (t4 > 0) {
            const e5 = i3[t4 - 1], o4 = i3[t4], d3 = r3[t4 - 1], s3 = n3 === p2.Horizontal ? e5.getBoundingClientRect().left : e5.getBoundingClientRect().top, c3 = n3 === p2.Horizontal ? o4.getBoundingClientRect().right : o4.getBoundingClientRect().bottom, l3 = n3 === p2.Horizontal ? e5.getBoundingClientRect().width + d3.getBoundingClientRect().width + o4.getBoundingClientRect().width : e5.getBoundingClientRect().height + d3.getBoundingClientRect().height + o4.getBoundingClientRect().height, u3 = n3 === p2.Horizontal ? d3.getBoundingClientRect().width : d3.getBoundingClientRect().height, h3 = {idx: t4 - 1, a: e5, b: o4, gutter: d3, parent: a3, start: s3, end: c3, size: l3, gutterSize: u3, aSizePct: 100 / i3.length, bSizePct: 100 / i3.length};
            g3.push(h3);
          }
        }), Object.assign(Object.assign({}, e3), {pairs: g3});
      }
      case h2.StartDragging: {
        const {gutterIdx: n3} = t3.payload;
        return Object.assign(Object.assign({}, e3), {isDragging: true, draggingIdx: n3});
      }
      case h2.StopDragging:
        return Object.assign(Object.assign({}, e3), {isDragging: false});
      case h2.CalculateSizes: {
        const {direction: n3, gutterIdx: i3} = t3.payload, r3 = e3.pairs[i3], a3 = c2(n3, r3.parent);
        if (!a3)
          throw new Error("Cannot calculate sizes - 'pair.parent' has undefined or zero size.");
        const o3 = r3.gutter[n3 === p2.Horizontal ? "clientWidth" : "clientHeight"], g3 = i3 === 0, d3 = i3 === e3.pairs.length - 1, {aGutterSize: s3, bGutterSize: l3} = _2(o3, g3, d3);
        let u3, h3, f3, z3, b3;
        return n3 === p2.Horizontal ? (u3 = r3.a.getBoundingClientRect().left, h3 = r3.b.getBoundingClientRect().right, z3 = (r3.a.getBoundingClientRect().width + s3) / a3 * 100, b3 = (r3.b.getBoundingClientRect().width + l3) / a3 * 100, f3 = r3.a.getBoundingClientRect().width + s3 + l3 + r3.b.getBoundingClientRect().width) : (u3 = r3.a.getBoundingClientRect().top, h3 = r3.b.getBoundingClientRect().bottom, z3 = (r3.a.getBoundingClientRect().height + s3) / a3 * 100, b3 = (r3.b.getBoundingClientRect().height + l3) / a3 * 100, f3 = r3.a.getBoundingClientRect().height + s3 + l3 + r3.b.getBoundingClientRect().height), e3.pairs[i3] = Object.assign(Object.assign({}, r3), {start: u3, end: h3, size: f3, aSizePct: z3, bSizePct: b3, gutterSize: o3}), Object.assign({}, e3);
      }
      default:
        return e3;
    }
  }
  function b2(e3, t3 = 0, n3 = []) {
    return import_react8.Children.toArray(e3).reduce((e4, i3, r3) => ((0, import_react_is2.isFragment)(i3) ? e4.push.apply(e4, b2(i3.props.children, t3 + 1, n3.concat(i3.key || r3))) : (0, import_react8.isValidElement)(i3) ? e4.push((0, import_react8.cloneElement)(i3, {key: n3.concat(String(i3.key)).join(".")})) : typeof i3 != "string" && typeof i3 != "number" || e4.push(i3), e4), []);
  }
  !function(e3) {
    e3[e3.SetIsReadyToCompute = 0] = "SetIsReadyToCompute", e3[e3.CreatePairs = 1] = "CreatePairs", e3[e3.CalculateSizes = 2] = "CalculateSizes", e3[e3.StartDragging = 3] = "StartDragging", e3[e3.StopDragging = 4] = "StopDragging";
  }(h2 || (h2 = {})), function(e3) {
    e3.Horizontal = "Horizontal", e3.Vertical = "Vertical";
  }(p2 || (p2 = {})), function(e3) {
    e3.Light = "Light", e3.Dark = "Dark";
  }(f2 || (f2 = {}));
  function C(e3) {
    return e3 === p2.Horizontal ? "col-resize" : "row-resize";
  }
  var w2 = {isReady: false, isDragging: false, pairs: []};
  function y2({direction: r3 = p2.Horizontal, minWidths: a3 = [], minHeights: o3 = [], initialSizes: s3, gutterTheme: y3 = f2.Dark, gutterClassName: S2, draggerClassName: m2, children: k2, onResizeStarted: x2, onResizeFinished: R7, classes: v2 = []}) {
    const B2 = b2(k2), [I2, D2] = (0, import_react8.useReducer)(z2, w2), H2 = (0, import_react8.useRef)(null), E2 = (0, import_react8.useRef)([]), j2 = (0, import_react8.useRef)([]);
    E2.current = [], j2.current = [];
    const O2 = import_react8.default.useCallback((e3) => {
      D2({type: h2.SetIsReadyToCompute, payload: {isReady: e3}});
    }, []), N2 = import_react8.default.useCallback((e3, t3) => {
      D2({type: h2.StartDragging, payload: {gutterIdx: t3}});
      const n3 = I2.pairs[t3];
      x2 == null || x2(n3.idx), n3.a.style.userSelect = "none", n3.b.style.userSelect = "none", n3.gutter.style.cursor = C(e3), n3.parent.style.cursor = C(e3), document.body.style.cursor = C(e3);
    }, [I2.pairs]), $ = import_react8.default.useCallback(() => {
      D2({type: h2.StopDragging});
      const e3 = [];
      for (let t4 = 0; t4 < I2.pairs.length; t4++) {
        const n3 = I2.pairs[t4], i3 = c2(r3, n3.parent);
        if (i3 === void 0)
          throw new Error("Cannot call the 'onResizeFinished' callback - parentSize is undefined");
        if (n3.gutterSize === void 0)
          throw new Error("Cannot call 'onResizeFinished' callback - gutterSize is undefined");
        const a4 = t4 === 0, o4 = t4 === I2.pairs.length - 1, g3 = n3.a.getBoundingClientRect()[r3 === p2.Horizontal ? "width" : "height"], {aGutterSize: d3, bGutterSize: s4} = _2(n3.gutterSize, a4, o4), l3 = (g3 + d3) / i3 * 100;
        if (e3.push(l3), o4) {
          const t5 = (n3.b.getBoundingClientRect()[r3 === p2.Horizontal ? "width" : "height"] + s4) / i3 * 100;
          e3.push(t5);
        }
      }
      if (I2.draggingIdx === void 0)
        throw new Error("Could not reset cursor and user-select because 'state.draggingIdx' is undefined");
      const t3 = I2.pairs[I2.draggingIdx];
      R7 == null || R7(t3.idx, e3), t3.a.style.userSelect = "", t3.b.style.userSelect = "", t3.gutter.style.cursor = "", t3.parent.style.cursor = "", document.body.style.cursor = "";
    }, [I2.draggingIdx, I2.pairs, r3]), F2 = import_react8.default.useCallback((e3, t3) => {
      D2({type: h2.CalculateSizes, payload: {direction: e3, gutterIdx: t3}});
    }, []), G2 = import_react8.default.useCallback((e3, t3, n3) => {
      D2({type: h2.CreatePairs, payload: {direction: e3, children: t3, gutters: n3}});
    }, []), P2 = import_react8.default.useCallback((e3, t3, n3, i3) => {
      const r4 = t3[0].parentNode;
      if (!r4)
        throw new Error("Cannot set initial sizes - parent is undefined");
      if (c2(e3, r4) === void 0)
        throw new Error("Cannot set initial sizes - parent has undefined size");
      t3.forEach((r5, a4) => {
        const o4 = a4 === t3.length - 1;
        let g3;
        if (t3.length > 1) {
          n3[o4 ? a4 - 1 : a4].getBoundingClientRect()[e3 === p2.Horizontal ? "width" : "height"];
        }
        g3 = i3 && a4 < i3.length ? `calc(${i3[a4]}% - 0px)` : `calc(${100 / t3.length}% - 0px)`, e3 === p2.Horizontal ? (r5.style.width = g3, r5.style.height = "100%") : (r5.style.height = g3, r5.style.width = "100%");
      });
    }, []), T = import_react8.default.useCallback((e3, t3) => {
      if (I2.draggingIdx === void 0)
        throw new Error("Cannot adjust size - 'draggingIdx' is undefined");
      const n3 = I2.pairs[I2.draggingIdx];
      if (n3.size === void 0)
        throw new Error("Cannot adjust size - 'pair.size' is undefined");
      if (n3.gutterSize === void 0)
        throw new Error("Cannot adjust size - 'pair.gutterSize' is undefined");
      const i3 = n3.aSizePct + n3.bSizePct, r4 = t3 / n3.size * i3, a4 = i3 - t3 / n3.size * i3, o4 = I2.draggingIdx === 0, g3 = I2.draggingIdx === I2.pairs.length - 1, {aGutterSize: d3, bGutterSize: s4} = _2(n3.gutterSize, o4, g3), c3 = `calc(${r4}% - ${d3}px)`, l3 = `calc(${a4}% - ${s4}px)`;
      e3 === p2.Horizontal ? (n3.a.style.width = c3, n3.b.style.width = l3) : (n3.a.style.height = c3, n3.b.style.height = l3);
    }, [I2.draggingIdx, I2.pairs, r3]), L2 = import_react8.default.useCallback((e3, t3, n3) => {
      if (!I2.isDragging)
        return;
      if (I2.draggingIdx === void 0)
        throw new Error("Cannot drag - 'draggingIdx' is undefined");
      const i3 = I2.pairs[I2.draggingIdx];
      if (i3.start === void 0)
        throw new Error("Cannot drag - 'pair.start' is undefined");
      if (i3.size === void 0)
        throw new Error("Cannot drag - 'pair.size' is undefined");
      if (i3.gutterSize === void 0)
        throw new Error("Cannot drag - 'pair.gutterSize' is undefined");
      let r4 = function(e4, t4) {
        return e4 === p2.Horizontal ? t4.clientX : t4.clientY;
      }(t3, e3) - i3.start, a4 = 16, o4 = 16;
      n3.length > I2.draggingIdx && (a4 = n3[I2.draggingIdx]), n3.length >= I2.draggingIdx + 1 && (o4 = n3[I2.draggingIdx + 1]), r4 < i3.gutterSize + a4 && (r4 = i3.gutterSize + a4), r4 >= i3.size - (i3.gutterSize + o4) && (r4 = i3.size - (i3.gutterSize + o4)), T(t3, r4);
    }, [I2.isDragging, I2.draggingIdx, I2.pairs, T]);
    function V2(e3, t3) {
      if (!e3.current)
        throw new Error("Can't add element to ref object - ref isn't initialized");
      t3 && !e3.current.includes(t3) && e3.current.push(t3);
    }
    return l2("mouseup", () => {
      if (I2.isDragging) {
        if (I2.draggingIdx === void 0)
          throw new Error("Cannot calculate sizes after dragging = 'state.draggingIdx' is undefined");
        F2(r3, I2.draggingIdx), $();
      }
    }, [I2.isDragging, $]), l2("mousemove", (e3) => {
      I2.isDragging && L2(e3, r3, r3 === p2.Horizontal ? a3 : o3);
    }, [r3, I2.isDragging, L2, a3, o3]), (0, import_react8.useEffect)(function() {
      if (!H2.current)
        return;
      const e3 = H2.current.parentElement;
      if (!e3)
        return;
      const t3 = new ResizeObserver(() => {
        const t4 = getComputedStyle(e3), n3 = r3 === p2.Horizontal ? e3.clientWidth : e3.clientHeight;
        O2(!!t4 && !!n3);
      });
      return t3.observe(e3), () => {
        t3.disconnect();
      };
    }, [H2.current, r3]), (0, import_react8.useEffect)(function() {
      if (I2.isReady) {
        if (!E2.current || !j2.current)
          throw new Error("Cannot create pairs - either variable 'childRefs' or 'gutterRefs' is undefined");
        B2.length <= 1 ? P2(r3, E2.current, j2.current, s3) : (P2(r3, E2.current, j2.current, s3), G2(r3, E2.current, j2.current));
      }
    }, [k2, I2.isReady, r3, P2, G2, s3]), (0, import_jsx_runtime.jsx)("div", Object.assign({className: `__dbk__container ${r3}`, ref: H2}, {children: I2.isReady && B2.map((i3, a4) => (0, import_jsx_runtime.jsxs)(import_react8.default.Fragment, {children: [(0, import_jsx_runtime.jsx)("div", Object.assign({ref: (e3) => V2(E2, e3), className: "__dbk__child-wrapper " + (a4 < v2.length ? v2[a4] : "")}, {children: i3}), void 0), a4 < B2.length - 1 && (0, import_jsx_runtime.jsx)(u2, {ref: (e3) => V2(j2, e3), className: S2, theme: y3, draggerClassName: m2, direction: r3, onMouseDown: (e3) => function(e4, t3) {
      t3.preventDefault(), F2(r3, e4), N2(r3, e4);
    }(a4, e3)}, void 0)]}, a4))}), void 0);
  }

  // Editor.jsx
  var import_react9 = __toModule(require_react());
  var App = () => {
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "flex flex-col p-3 overflow-auto",
      style: {height: "calc(100vh - 2.5rem)"}
    }, /* @__PURE__ */ import_react9.default.createElement(Editor, null));
  };
  var Editor = () => {
    const mode = useSelector(path_default(["debugger", "mode"]));
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "code tracking-wider flex-grow p-2 h-full"
    }, (() => {
      if (mode === editorModes.edit) {
        return /* @__PURE__ */ import_react9.default.createElement(EditorEditMode, null);
      } else if (mode === editorModes.normal) {
        return /* @__PURE__ */ import_react9.default.createElement(EditorNormerMode, null);
      }
    })());
  };
  var EditorEditMode = () => {
    const text = useSelector(path_default(["debugger", "text"]));
    const cursorPosition = useSelector(path_default(["debugger", "cursorPosition"]));
    const dispatch = useDispatch();
    const inputEl = (0, import_react9.useRef)(null);
    (0, import_react9.useEffect)(() => {
      inputEl.current.focus();
      inputEl.current.selectionStart = cursorPosition;
      inputEl.current.selectionEnd = cursorPosition;
    }, []);
    return /* @__PURE__ */ import_react9.default.createElement("textarea", {
      ref: inputEl,
      spellCheck: false,
      className: "w-full h-full outline-none my-0.5",
      style: {resize: "none", lineHeight: "1.62rem", fontVariantLigatures: "none"},
      onChange: (e3) => dispatch(setText(e3.target.value)),
      value: text
    });
  };
  var EditorNormerMode = () => {
    const text = useSelector(path_default(["debugger", "text"]));
    const dispatch = useDispatch();
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "",
      onClick: (_3) => dispatch(toEditMode())
    }, text.split("\n").map((t3, line) => /* @__PURE__ */ import_react9.default.createElement(Line, {
      text: t3,
      line,
      key: line
    })));
  };
  var Line = ({text, line}) => {
    const fulltext = useSelector(path_default(["debugger", "text"]));
    const dispatch = useDispatch();
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "h-6 my-0.5 flex"
    }, text.split("").map((t3, ch) => /* @__PURE__ */ import_react9.default.createElement(Cell, {
      text: t3,
      line,
      ch,
      key: ch
    })), /* @__PURE__ */ import_react9.default.createElement("div", {
      onClick: (_3) => {
        let offset = fulltext.split("\n").filter((l3, ln2) => ln2 <= line).map((l3) => l3.length + 1).reduce((x2, y3) => x2 + y3, 0) - 1;
        dispatch(setCursorPosition(offset));
      },
      className: "inline-block h-6 flex-grow cursor-text"
    }));
  };
  var Cell = ({text, line, ch}) => {
    const point = {line, ch};
    const fulltext = useSelector(path_default(["debugger", "text"]));
    const highlights = useSelector(path_default(["debugger", "highlights"]));
    const widgets = useSelector(path_default(["debugger", "widgets"]));
    const deductionStpe = useSelector(path_default(["debugger", "debuggingSteps"]));
    const dispatch = useDispatch();
    const highlighters = highlights.filter(curry_default(within)(point)).map((hl, k2) => /* @__PURE__ */ import_react9.default.createElement(Highlighter, {
      highlight: hl,
      line,
      ch,
      key: "hl" + k2
    }));
    const appliedWidgets = pipe(filter_default(pipe(prop_default("relativeTo"), equals_default(point))), map_default((wgt) => /* @__PURE__ */ import_react9.default.createElement(Widget, {
      styles: wgt.styles,
      classes: wgt.classes,
      content: wgt.content,
      key: wgt.key
    })))(widgets);
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      onClick: (_3) => {
        let offset = fulltext.split("\n").filter((l3, ln2) => ln2 < line).map((l3) => l3.length + 1).reduce((x2, y3) => x2 + y3, 0) + ch;
        console.log(offset);
        dispatch(setCursorPosition(offset));
      },
      className: "inline-block h-6 relative",
      style: {width: "0.6rem"}
    }, highlighters, deductionStpe ? appliedWidgets : null, /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "absolute w-full h-full z-50"
    }, text));
  };
  var Widget = ({styles, classes, content}) => {
    const highlightFilter = useSelector(path_default(["debugger", "highlightFilter"]));
    const numOfSteps = useSelector(path_default(["debugger", "numOfSteps"]));
    const pinnedStep = useSelector(path_default(["debugger", "pinnedStep"]));
    const stepLabelFace = pinnedStep === content.step ? "bg-green-400 text-black border-green-400 border bg-green-400" : "bg-gray-200 border border-dashed border-black";
    if (highlightFilter.includes("marker1") && !highlightFilter.includes("marker2"))
      return null;
    if (highlightFilter.includes("marker2") && !highlightFilter.includes("marker1"))
      return null;
    if (highlightFilter.includes("marker2") && highlightFilter.includes("marker1") && !highlightFilter.includes("markerDefinition"))
      return null;
    if (content.type === "annotation") {
      if (content.direction === "LR") {
        return /* @__PURE__ */ import_react9.default.createElement("div", {
          className: "flex items-center justify-center text-gray-400 " + classes.join(" "),
          style: styles
        }, /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "marker1 border border-black inline-block w-2 h-2 rounded-sm mr-1"
        }), content.reason, /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "marker2 border border-black inline-block w-2 h-2 rounded-sm ml-1"
        }), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "ml-1 text-gray-500"
        }, "(step"), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "text-black inline-block w-4 h-4 text-xs rounded-full " + stepLabelFace
        }, numOfSteps - content.step), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "text-gray-500"
        }, ")"));
      } else {
        return /* @__PURE__ */ import_react9.default.createElement("div", {
          className: "flex items-center justify-center  text-gray-400 " + classes.join(" "),
          style: styles
        }, /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "marker2 border border-black inline-block w-2 h-2 rounded-sm mr-1"
        }), content.reason, /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "marker1 border border-black inline-block w-2 h-2 rounded-sm ml-1"
        }), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "ml-1 text-gray-500"
        }, "(step"), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "text-black inline-block w-4 h-4 text-xs rounded-full " + stepLabelFace
        }, numOfSteps - content.step), /* @__PURE__ */ import_react9.default.createElement("span", {
          className: "text-gray-500"
        }, ")"));
      }
    } else {
      return /* @__PURE__ */ import_react9.default.createElement("div", {
        className: classes.join(" "),
        style: styles
      });
    }
  };
  var Highlighter = ({highlight, line, ch}) => {
    const deductionSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    const highlightFilter = useSelector(path_default(["debugger", "highlightFilter"]));
    const borderResetter = deductionSteps && equals_default(highlightFilter, ["markerDefination"]) ? {} : {borderWidth: 0};
    let classes = highlight.marker.shared;
    if (equals_default(highlight.from, {line, ch})) {
      classes = [...classes, ...highlight.marker.start];
    }
    if (equals_default(highlight.to, {line, ch: ch + 1})) {
      classes = [...classes, ...highlight.marker.end];
    }
    classes = any_default((f3) => includes_default(f3, classes))(highlightFilter) ? [] : classes;
    return /* @__PURE__ */ import_react9.default.createElement("div", {
      className: "absolute " + classes.join(" "),
      style: borderResetter
    });
  };
  var Editor_default = App;

  // Debugger.jsx
  var import_react12 = __toModule(require_react());

  // node_modules/@heroicons/react/solid/esm/BookOpenIcon.js
  var React5 = __toModule(require_react());
  function BookOpenIcon(props, svgRef) {
    return /* @__PURE__ */ React5.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React5.createElement("path", {
      d: "M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
    }));
  }
  var ForwardRef = React5.forwardRef(BookOpenIcon);
  var BookOpenIcon_default = ForwardRef;

  // node_modules/@heroicons/react/solid/esm/ChevronDoubleLeftIcon.js
  var React6 = __toModule(require_react());
  function ChevronDoubleLeftIcon(props, svgRef) {
    return /* @__PURE__ */ React6.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React6.createElement("path", {
      fillRule: "evenodd",
      d: "M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z",
      clipRule: "evenodd"
    }));
  }
  var ForwardRef2 = React6.forwardRef(ChevronDoubleLeftIcon);
  var ChevronDoubleLeftIcon_default = ForwardRef2;

  // node_modules/@heroicons/react/solid/esm/ChevronDoubleRightIcon.js
  var React7 = __toModule(require_react());
  function ChevronDoubleRightIcon(props, svgRef) {
    return /* @__PURE__ */ React7.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React7.createElement("path", {
      fillRule: "evenodd",
      d: "M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
      clipRule: "evenodd"
    }), /* @__PURE__ */ React7.createElement("path", {
      fillRule: "evenodd",
      d: "M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
      clipRule: "evenodd"
    }));
  }
  var ForwardRef3 = React7.forwardRef(ChevronDoubleRightIcon);
  var ChevronDoubleRightIcon_default = ForwardRef3;

  // node_modules/@heroicons/react/solid/esm/EyeIcon.js
  var React8 = __toModule(require_react());
  function EyeIcon(props, svgRef) {
    return /* @__PURE__ */ React8.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 20 20",
      fill: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React8.createElement("path", {
      d: "M10 12a2 2 0 100-4 2 2 0 000 4z"
    }), /* @__PURE__ */ React8.createElement("path", {
      fillRule: "evenodd",
      d: "M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z",
      clipRule: "evenodd"
    }));
  }
  var ForwardRef4 = React8.forwardRef(EyeIcon);
  var EyeIcon_default = ForwardRef4;

  // TabReport.jsx
  var import_react11 = __toModule(require_react());

  // TypeSig.jsx
  var import_react10 = __toModule(require_react());
  var StringTypeSig2 = ({simple, full}) => {
    let unlaliasedFull = unAlias(full);
    if (unlaliasedFull.length > 50) {
      return /* @__PURE__ */ import_react10.default.createElement("span", null, unAlias(simple));
    } else {
      return /* @__PURE__ */ import_react10.default.createElement("span", null, unlaliasedFull);
    }
  };
  var TypeSig_default = StringTypeSig2;

  // node_modules/@heroicons/react/outline/esm/ChevronDoubleLeftIcon.js
  var React10 = __toModule(require_react());
  function ChevronDoubleLeftIcon2(props, svgRef) {
    return /* @__PURE__ */ React10.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React10.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M11 19l-7-7 7-7m8 14l-7-7 7-7"
    }));
  }
  var ForwardRef5 = React10.forwardRef(ChevronDoubleLeftIcon2);
  var ChevronDoubleLeftIcon_default2 = ForwardRef5;

  // node_modules/@heroicons/react/outline/esm/ChevronDoubleRightIcon.js
  var React11 = __toModule(require_react());
  function ChevronDoubleRightIcon2(props, svgRef) {
    return /* @__PURE__ */ React11.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React11.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M13 5l7 7-7 7M5 5l7 7-7 7"
    }));
  }
  var ForwardRef6 = React11.forwardRef(ChevronDoubleRightIcon2);
  var ChevronDoubleRightIcon_default2 = ForwardRef6;

  // node_modules/@heroicons/react/outline/esm/ChevronRightIcon.js
  var React12 = __toModule(require_react());
  function ChevronRightIcon(props, svgRef) {
    return /* @__PURE__ */ React12.createElement("svg", Object.assign({
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 2,
      stroke: "currentColor",
      "aria-hidden": "true",
      ref: svgRef
    }, props), /* @__PURE__ */ React12.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M9 5l7 7-7 7"
    }));
  }
  var ForwardRef7 = React12.forwardRef(ChevronRightIcon);
  var ChevronRightIcon_default = ForwardRef7;

  // TabReport.jsx
  var import_mixpanel_browser = __toModule(require_mixpanel_cjs());
  var TabReport = () => {
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "p-4 bg-gray-200 h-full"
    }, /* @__PURE__ */ import_react11.default.createElement(Summary, null), /* @__PURE__ */ import_react11.default.createElement(Message, null), /* @__PURE__ */ import_react11.default.createElement(ReleventTerms, null));
  };
  var TabList = () => {
    const dispatch = useDispatch();
    let context = useSelector(path_default(["debugger", "context"]));
    let steps = useSelector(path_default(["debugger", "steps"]));
    let pinnedStep = useSelector(path_default(["debugger", "pinnedStep"]));
    let pinnedTraverseId = steps[pinnedStep].stepId;
    const multipleExps = useSelector(path_default(["debugger", "multipleExps"]));
    const deductionSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "h-24 bg-gray-100 flex items-center   " + (multipleExps && !deductionSteps ? "rounded-b-lg" : ""),
      style: {paddingLeft: 40}
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex items-center cursor-pointer flex-row-reverse justify-end "
    }, multipleExps ? context.map((c3, i3) => /* @__PURE__ */ import_react11.default.createElement(Tab, {
      key: i3,
      steps: c3.contextSteps,
      exp: c3.contextExp,
      active: c3.contextSteps.find(pipe(nth_default(0), equals_default(pinnedTraverseId)))[2]
    })) : null));
  };
  var Tab = ({active = false, steps, exp}) => {
    let dispatch = useDispatch();
    const deductionSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    let pinnedStep = useSelector(path_default(["debugger", "pinnedStep"]));
    let traverseId = useSelector(path_default(["debugger", "currentTraverseId"]));
    let tabReleventSteps = steps.map((step, i3) => [...step, i3]).filter(nth_default(2));
    let tabDefaultStep = tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3];
    let hovering = steps.find(pipe(nth_default(0), equals_default(traverseId)))[2];
    let face;
    if (active) {
      face = "bg-gray-900 border-gray-900 border active:bg-gray-600";
    } else if (deductionSteps && !active && hovering) {
      face = "bg-white active:bg-gray-200 border-dashed border border-black";
    } else if (deductionSteps && !active && !hovering) {
      face = "bg-white active:bg-gray-200 border ";
    } else if (!deductionSteps && !active && hovering) {
      face = "bg-white active:bg-gray-200 border-dashed border border-black";
    } else if (!deductionSteps && !active && !hovering) {
      face = "bg-white active:bg-gray-200 border ";
    }
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: face + " flex flex-col w-max m-1 px-2 py-1 rounded-lg",
      style: {minWidth: 80},
      onClick: (_3) => dispatch(lockStep(tabDefaultStep)),
      onMouseEnter: (_3) => active ? null : dispatch(setStep(tabDefaultStep)),
      onMouseLeave: (_3) => dispatch(setStep(pinnedStep))
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: " rounded-t-2xl inline-block w-full h-10 leading-10 text-xl code select-none " + (active ? "text-white" : "text-gray-800")
    }, exp), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: " " + (deductionSteps ? "h-6 w-full" : "h-0 w-0")
    }, /* @__PURE__ */ import_react11.default.createElement(TabSteps, {
      steps: tabReleventSteps,
      active
    })));
  };
  var TabSteps = ({active = false, steps}) => {
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex flex-row-reverse justify-end "
    }, steps.map((step) => /* @__PURE__ */ import_react11.default.createElement(TabStep, {
      active,
      key: step[3],
      traverseId: step[0],
      step: step[3]
    })));
  };
  var TabStep = ({active = false, step, traverseId}) => {
    let dispatch = useDispatch();
    let numOfSteps = useSelector(path_default(["debugger", "numOfSteps"]));
    let currentTraverseId = useSelector(path_default(["debugger", "currentTraverseId"]));
    let deductionSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    let pinnedStep = useSelector(path_default(["debugger", "pinnedStep"]));
    let stepping = equals_default(currentTraverseId, traverseId);
    let pinned = pinnedStep === step;
    let face;
    if (active && pinned) {
      face = "bg-green-400 text-black";
    } else if (stepping && active) {
      face = "bg-gray-600 border-dashed border border-white text-white";
    } else if (stepping && !active) {
      face = "border-dashed bg-gray-200 text-black border-black border";
    } else if (active) {
      face = "bg-gray-400 text-black";
    } else if (!active) {
      face = "bg-gray-700 text-white";
    }
    return /* @__PURE__ */ import_react11.default.createElement("button", {
      onClick: (e3) => {
        e3.stopPropagation();
        dispatch(lockStep(step));
      },
      onMouseEnter: (_3) => {
        dispatch(setStep(step));
      }
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "w-5 h-5 leading-5 flex justify-center  cursor-pointer rounded-full text-md mx-0.5  " + face + (deductionSteps ? " " : " hidden")
    }, numOfSteps - step));
  };
  var Summary = () => {
    let contextItem = useSelector((state) => state.debugger.currentContextItem);
    const multipleExps = useSelector(path_default(["debugger", "multipleExps"]));
    const debuggingSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    const steps = useSelector(path_default(["debugger", "steps"]));
    const pinnedStep = useSelector(path_default(["debugger", "pinnedStep"]));
    const currentTaskNum = useSelector(path_default(["debugger", "currentTaskNum"]));
    const pinned = steps.length === 0 ? true : contextItem.contextSteps.find(pipe(nth_default(0), equals_default(steps[pinnedStep].stepId)))[2];
    const dispatch = useDispatch();
    return contextItem === null ? null : /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "shadow-sm rounded-md"
    }, /* @__PURE__ */ import_react11.default.createElement(Expandable, {
      hint: debuggingSteps ? "Hide other uncertain expressions (Tab key)" : "Expand to see a list of uncertain expressions (Tab key)",
      opened: multipleExps,
      onOpen: (_3) => {
        if (!multipleExps) {
          import_mixpanel_browser.default.track("Enable Multiple Exp", {
            ...trackingAttributes("Basic mode", currentTaskNum),
            "input type": "mouse"
          });
          dispatch(toggleMultipleExps());
        }
      },
      onClose: (_3) => {
        if (multipleExps) {
          dispatch(toggleMultipleExps());
          import_mixpanel_browser.default.track("Disable Multiple Exp", {
            ...trackingAttributes(debuggingSteps ? "Advanced mode" : "Balanced mode", currentTaskNum),
            "input type": "mouse"
          });
        }
        if (debuggingSteps)
          dispatch(toggleDebuggerStpes());
      }
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      style: {paddingLeft: 40},
      className: "bg-white p-3 rounded-t-md " + (multipleExps ? "" : "rounded-b-md")
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "text-md"
    }, "The following expression can have two conflicting types", /* @__PURE__ */ import_react11.default.createElement("span", {
      onMouseEnter: (_3) => dispatch(showDefination()),
      onMouseLeave: (_3) => dispatch(showBoth()),
      className: "code ml-2 px-1 rounded-md  inline-block not-italic cursor-pointer " + (pinned ? "border border-gray-700 bg-gray-700 text-white hover:bg-gray-600" : "border border-black border-dashed hover:bg-gray-100")
    }, contextItem["contextExp"])))), multipleExps ? /* @__PURE__ */ import_react11.default.createElement(Expandable, {
      opened: debuggingSteps,
      left: 5,
      hint: debuggingSteps ? "Hide debugging steps (Tab key)" : "Expand to see debugging steps (Tab key)",
      onOpen: (_3) => {
        if (!debuggingSteps) {
          import_mixpanel_browser.default.track("Eanble deduction step", {
            ...trackingAttributes("Advanced mode", currentTaskNum),
            "input type": "mouse"
          });
          dispatch(toggleDebuggerStpes());
        }
      },
      onClose: (_3) => {
        if (debuggingSteps) {
          import_mixpanel_browser.default.track("Disable deduction step", {
            ...trackingAttributes("Balanced mode", currentTaskNum),
            "input type": "mouse"
          });
          dispatch(toggleDebuggerStpes());
        }
      }
    }, /* @__PURE__ */ import_react11.default.createElement(TabList, null)) : null, debuggingSteps ? /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex justify-start p-1 border-0 rounded-b-md bg-gray-800",
      style: {paddingLeft: 40}
    }, /* @__PURE__ */ import_react11.default.createElement("button", {
      "aria-label": "Previous step (Left / Up / h / k )",
      className: "border bg-gray-800 border-gray-500 text-gray-300 shadow-sm hover:bg-gray-500 hover:text-gray-800 active:bg-gray-700 active:text-white px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom",
      onClick: (_3) => dispatch(nextStep())
    }, /* @__PURE__ */ import_react11.default.createElement(ChevronDoubleLeftIcon_default2, {
      className: "h-4 w-4"
    })), /* @__PURE__ */ import_react11.default.createElement("button", {
      "aria-label": "Next step (Right / Down / l / j)",
      className: "border bg-gray-800 border-gray-500 text-gray-300 shadow-sm hover:bg-gray-500 hover:text-gray-800 active:bg-gray-700 active:text-white px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom",
      onClick: (_3) => dispatch(prevStep())
    }, /* @__PURE__ */ import_react11.default.createElement(ChevronDoubleRightIcon_default2, {
      className: "h-4 w-4"
    }))) : null);
  };
  var Expandable = ({opened, children, onOpen, onClose, hint, left = 5}) => {
    let size = 25;
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "relative"
    }, children, /* @__PURE__ */ import_react11.default.createElement("div", {
      onClick: (_3) => opened ? onClose() : onOpen(),
      className: "cursor-pointer rounded-full z-10 absolute border border-gray-300 hint--bottom",
      "aria-label": hint,
      style: {
        width: size,
        height: size,
        top: `calc(50% - ${size / 2}px)`,
        left
      }
    }, /* @__PURE__ */ import_react11.default.createElement(ChevronRightIcon_default, {
      className: (opened ? "rotate-90" : "") + " transition-transform",
      style: {}
    })));
  };
  var Message = () => {
    let contextItem = useSelector((state) => state.debugger.currentContextItem);
    let dispatch = useDispatch();
    return contextItem === null ? null : /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "font-medium mt-5"
    }, "Conflicting types"), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "mb-5 mt-2  shadow-sm"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "cursor-pointer hover:bg-gray-100 rounded-t-md bg-white p-2 w-full hint--bottom ",
      "aria-label": "Keyboard shortcut: Hold 1",
      onMouseEnter: (_3) => dispatch(showOnlyMark1()),
      onMouseLeave: (_3) => dispatch(showBoth())
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "mb-2 text-sm font-medium"
    }, "Possible type 1"), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "inline-block mr-1 code"
    }, contextItem.contextExp, "::"), /* @__PURE__ */ import_react11.default.createElement("span", {
      className: "code groupMarkerB rounded-sm px-0.5 cursor-pointer"
    }, /* @__PURE__ */ import_react11.default.createElement(TypeSig_default, {
      simple: contextItem.contextType1SimpleString,
      full: contextItem.contextType1String
    })), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "text-xs italic"
    }, "Inferred from the orange highlights on the left side")), /* @__PURE__ */ import_react11.default.createElement("hr", {
      className: ""
    }), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "cursor-pointer hover:bg-gray-100 rounded-b-md bg-white p-2 w-full hint--bottom ",
      "aria-label": "Keyboard shortcut: Hold 2",
      onMouseEnter: (_3) => dispatch(showOnlyMark2()),
      onMouseLeave: (_3) => dispatch(showBoth())
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "mb-2 text-sm font-medium"
    }, "Possible type 2"), /* @__PURE__ */ import_react11.default.createElement("span", {
      className: "inline-block mr-1 code"
    }, contextItem.contextExp, "::"), /* @__PURE__ */ import_react11.default.createElement("span", {
      className: "code groupMarkerA rounded-sm px-0.5 cursor-pointer"
    }, /* @__PURE__ */ import_react11.default.createElement(TypeSig_default, {
      simple: contextItem.contextType2SimpleString,
      full: contextItem.contextType2String
    })), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "text-xs italic"
    }, "Inferred from the blue highlights on the left side"))));
  };
  var ReleventTerms = () => {
    let context = useSelector(path_default(["debugger", "context"]));
    let currentContextItem = useSelector(path_default(["debugger", "currentContextItem"]));
    let releventContext = context.filter((c3) => c3.contextExp !== currentContextItem.contextExp);
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: ""
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "font-medium"
    }, "Relevant type information"), releventContext.reverse().map((c3, i3) => /* @__PURE__ */ import_react11.default.createElement(ReleventItem, {
      item: c3,
      key: i3
    })), defaultTo_default([])(prop_default("contextGlobals", currentContextItem)).map(([exp, type3], i3) => /* @__PURE__ */ import_react11.default.createElement(GlobalTypeHints, {
      exp,
      type: type3,
      key: i3
    })));
  };
  var GlobalTypeHints = ({exp, type: type3}) => {
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex flex-col my-1.5 p-1 bg-gray-100 rounded-md h-16 justify-center shadow-sm"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code"
    }, exp), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code mx-0.5"
    }, "::"), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code px-0.5 rounded-sm"
    }, type3)), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "ml-1 text-sm italic"
    }, " Imported from Prelude"));
  };
  var ReleventItem = ({item}) => {
    let currentTraverseId = useSelector(path_default(["debugger", "currentTraverseId"]));
    const multipleExps = useSelector(path_default(["debugger", "multipleExps"]));
    let dispatch = useDispatch();
    let affinity = pipe(find_default(pipe(nth_default(0), equals_default(currentTraverseId))), nth_default(1))(item.contextSteps);
    let type3 = affinity === "L" ? item.contextType1String : item.contextType2String;
    let origin = affinity === "L" ? "orange highlights" : "blue highlights";
    let tabReleventSteps = item.contextSteps.map((step, i3) => [...step, i3]).filter(nth_default(2));
    let tabDefaultStep = tabReleventSteps[Math.round(tabReleventSteps.length / 2) - 1][3];
    return /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex flex-col my-1.5 bg-white p-2 rounded-md cursor-pointer shadow-sm hover:bg-gray-100",
      onMouseEnter: (_3) => affinity === "L" ? dispatch(showOnlyMark1()) : dispatch(showOnlyMark2()),
      onMouseLeave: (_3) => dispatch(showBoth())
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex justify-between"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code"
    }, item.contextExp), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code mx-0.5"
    }, "::"), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "code px-0.5 rounded-sm " + (affinity === "L" ? "marker2" : "marker1")
    }, type3)), multipleExps ? /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "text-sm text-gray-500"
    }, "Looks wrong? "), /* @__PURE__ */ import_react11.default.createElement("button", {
      onClick: (_3) => dispatch(lockStep(tabDefaultStep)),
      className: "border border-gray-300 rounded-sm px-2 py-1 mr-1 ml-2 bg-white active:bg-gray-200 hover:bg-gray-100 shadow-sm"
    }, "Inspect")) : null), /* @__PURE__ */ import_react11.default.createElement("div", {
      className: "text-xs italic"
    }, " Inferred from ", origin, " "));
  };
  var TabReport_default = TabReport;

  // Debugger.jsx
  var Debugger = () => {
    let wellTyped = useSelector((state) => state.debugger.wellTyped);
    let loadError = useSelector((state) => state.debugger.loadError);
    let parseError = useSelector((state) => state.debugger.parseError);
    return /* @__PURE__ */ import_react12.default.createElement("div", {
      className: "h-full bg-gray-200"
    }, (() => {
      if (wellTyped) {
        return /* @__PURE__ */ import_react12.default.createElement("div", {
          className: "p-4 flex items-center"
        }, /* @__PURE__ */ import_react12.default.createElement("ion-icon", {
          size: "large",
          style: {color: "rgb(74, 222, 128)"},
          name: "checkmark-circle"
        }), /* @__PURE__ */ import_react12.default.createElement("span", {
          className: "p-2"
        }, "Congratulations! Your code is well typed."));
      } else if (parseError !== null) {
        return /* @__PURE__ */ import_react12.default.createElement(ParseErrorReport, null);
      } else if (loadError !== null) {
        return /* @__PURE__ */ import_react12.default.createElement(LoadErrorReport, null);
      } else if (!wellTyped) {
        return /* @__PURE__ */ import_react12.default.createElement(TabReport_default, null);
      }
    })());
  };
  var ParseErrorReport = () => {
    let parseError = useSelector((state) => state.debugger.parseError);
    return /* @__PURE__ */ import_react12.default.createElement("div", {
      class: "p-4"
    }, /* @__PURE__ */ import_react12.default.createElement("p", {
      className: "py-2 px-4"
    }, "A syntax error was found in the code"), /* @__PURE__ */ import_react12.default.createElement("div", {
      className: "bg-gray-100 py-2 px-4 rounded-md"
    }, /* @__PURE__ */ import_react12.default.createElement("p", null, " ", parseError.message, " "), /* @__PURE__ */ import_react12.default.createElement("p", null, "Location: ", parseError.loc.srcLine, ":", parseError.loc.srcColumn)));
  };
  var LoadErrorReport = () => {
    let loadError = useSelector((state) => state.debugger.loadError);
    return /* @__PURE__ */ import_react12.default.createElement("div", {
      class: "p-4"
    }, /* @__PURE__ */ import_react12.default.createElement("p", {
      className: "py-2 px-4"
    }, "A variable is used without being declared."), loadError.map(([v2, loc]) => {
      return /* @__PURE__ */ import_react12.default.createElement("div", {
        className: "bg-gray-100 py-2 px-4 rounded-md"
      }, /* @__PURE__ */ import_react12.default.createElement("p", null, "Variable: ", v2, " "), /* @__PURE__ */ import_react12.default.createElement("p", null, "Location: ", " " + loc.srcSpanStartLine, ":", loc.srcSpanStartColumn, " -", " " + loc.srcSpanEndLine, ":", loc.srcSpanEndColumn));
    }));
  };
  var Debugger_default = Debugger;

  // MenuBar.jsx
  var import_react13 = __toModule(require_react());
  var MenuBar = () => {
    const dispatch = useDispatch();
    const mode = useSelector(path_default(["debugger", "mode"]));
    const deductionSteps = useSelector(path_default(["debugger", "debuggingSteps"]));
    const multipleExps = useSelector(path_default(["debugger", "multipleExps"]));
    const currentTaskNum = useSelector(path_default(["debugger", "currentTaskNum"]));
    const attempts = useSelector(path_default(["debugger", "attempts"]));
    const currentTaskAttemps = attempts[currentTaskNum];
    return /* @__PURE__ */ import_react13.default.createElement("div", {
      className: "w-full bg-gray-100 h-10 flex justify-between"
    }, /* @__PURE__ */ import_react13.default.createElement("div", {
      className: "flex items-center"
    }, /* @__PURE__ */ import_react13.default.createElement("a", {
      href: "/",
      className: "cursor-pointer mr-4 px-4",
      style: {}
    }, /* @__PURE__ */ import_react13.default.createElement("svg", {
      className: "w-10",
      viewBox: "0 0 100 100"
    }, /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M9.061,50.971c-0,3.037 3.464,5.499 7.737,5.499l-0,-5.499l-7.737,0Z",
      style: {fill: "#3eac3a"}
    }), /* @__PURE__ */ import_react13.default.createElement("rect", {
      x: "16.793",
      y: "50.98",
      width: "43.762",
      height: "5.49",
      style: {fill: "#3eac3a"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M50,10.032c-22.61,0 -40.939,18.329 -40.939,40.939l40.939,0l0,-40.939Z",
      style: {fill: "#3c9339"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M46.807,69.476c0,7.182 6.164,13.005 13.769,13.005l-0,-13.005l-13.769,-0Z",
      style: {fill: "#3c9339"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M56.139,60.144c-5.154,-0 -9.332,4.178 -9.332,9.332l9.332,-0l0,-9.332Z",
      style: {fill: "#087604"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M60.555,82.481c12.507,0 22.645,-11.512 22.645,-25.712c0,-14.2 -10.138,-25.712 -22.645,-25.712l0,51.424Z",
      style: {fill: "#21781e"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M56.139,60.144c2.439,-0 4.416,2.089 4.416,4.666c0,2.577 -1.977,4.666 -4.416,4.666l0,-9.332Z",
      style: {fill: "#0d9509"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M56.139,56.472l0,-0.002l4.416,0l0,4.572l0,-0l0,-0.026c0,-2.466 -1.967,-4.475 -4.416,-4.544Z",
      style: {fill: "#3eac3a"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M50,50.985l-0,-0.005l10.555,0l0,10.926l-0,0l0,-0.062c0,-5.892 -4.702,-10.696 -10.555,-10.859Z",
      style: {fill: "#1c7e18"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M53.205,31.056l-0,0.001l-3.205,0l0,-3.317l0,-0l0,0.019c0,1.789 1.428,3.247 3.205,3.297Z",
      style: {fill: "#21781e"}
    }), /* @__PURE__ */ import_react13.default.createElement("rect", {
      x: "50",
      y: "31.057",
      width: "10.555",
      height: "19.923",
      style: {fill: "#21781e"}
    }), /* @__PURE__ */ import_react13.default.createElement("path", {
      d: "M34.015,56.47c0,4.563 3.908,8.262 8.729,8.262c4.821,-0 8.729,-3.699 8.729,-8.262l-17.458,0Z",
      style: {fill: "#486c47"}
    }))), /* @__PURE__ */ import_react13.default.createElement("button", {
      className: "bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center  hint--bottom",
      "aria-label": "Reset the code challenge to its initial state",
      onClick: (_3) => {
        dispatch(switchTaskThunk(currentTaskNum));
        dispatch(toNormalMode());
      }
    }, "Reset problem"), currentTaskAttemps > 5 ? /* @__PURE__ */ import_react13.default.createElement("button", {
      "aria-label": "Skip this code challenge if you get stuck for too long",
      className: "bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center hint--bottom",
      onClick: (_3) => {
        if (currentTaskNum === 8) {
          let participant_id = localStorage.getItem("userId");
          window.location = "https://tally.so/r/nrjAxX?participant_id=" + participant_id;
        } else {
          localStorage.setItem("userProgress", currentTaskNum);
          dispatch(switchTaskThunk(currentTaskNum + 1));
          dispatch(toNormalMode());
        }
      }
    }, "Give up") : null, mode === editorModes.normal ? null : /* @__PURE__ */ import_react13.default.createElement("button", {
      className: "bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center color-change hint--bottom",
      "aria-label": "Type check the code (Esc)",
      onClick: (_3) => {
        dispatch(toNormalMode());
        dispatch(typeCheckThunk());
      }
    }, /* @__PURE__ */ import_react13.default.createElement(EyeIcon_default, {
      className: "h-4 w-4 mr-1"
    }), "Type check"), /* @__PURE__ */ import_react13.default.createElement("a", {
      href: "/tutorial",
      target: "_blank",
      className: "bg-gray-300 px-4 py-1 rounded-md mx-2 flex h-8 justify-center items-center hint--bottom",
      "aria-label": "Open tutorial in a new tab"
    }, /* @__PURE__ */ import_react13.default.createElement(BookOpenIcon_default, {
      className: "h-4 w-4 mr-1"
    }), "Tutorial"), deductionSteps ? /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement("button", {
      "aria-label": "Previous step (Left / Up / h / k )",
      className: "bg-gray-700 hover:bg-gray-800 active:bg-gray-900 px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom",
      onClick: (_3) => dispatch(nextStep())
    }, /* @__PURE__ */ import_react13.default.createElement(ChevronDoubleLeftIcon_default, {
      className: "h-4 w-4 text-white"
    })), /* @__PURE__ */ import_react13.default.createElement("button", {
      "aria-label": "Next step (Right / Down / l / j)",
      className: "bg-gray-700 hover:bg-gray-800 active:bg-gray-900 px-2 py-1 mx-0.5 h-8 rounded-md flex justify-center items-center hint--bottom",
      onClick: (_3) => dispatch(prevStep())
    }, /* @__PURE__ */ import_react13.default.createElement(ChevronDoubleRightIcon_default, {
      className: "h-4 w-4 text-white"
    }))) : null), /* @__PURE__ */ import_react13.default.createElement("div", {
      className: "flex items-center px-2"
    }, /* @__PURE__ */ import_react13.default.createElement("div", null, (() => {
      if (!multipleExps && !deductionSteps)
        return "Basic Mode";
      if (multipleExps && !deductionSteps)
        return "Balanced Mode";
      if (multipleExps && deductionSteps)
        return "Advanced Mode";
    })())));
  };
  var MenuBar_default = MenuBar;

  // index.jsx
  var import_react_modal = __toModule(require_lib());
  var import_mixpanel_browser2 = __toModule(require_mixpanel_cjs());

  // node_modules/nanoid/index.browser.js
  var nanoid2 = (size = 21) => {
    let id = "";
    let bytes = crypto.getRandomValues(new Uint8Array(size));
    while (size--) {
      let byte = bytes[size] & 63;
      if (byte < 36) {
        id += byte.toString(36);
      } else if (byte < 62) {
        id += (byte - 26).toString(36).toUpperCase();
      } else if (byte < 63) {
        id += "_";
      } else {
        id += "-";
      }
    }
    return id;
  };

  // index.jsx
  import_mixpanel_browser2.default.init("6be6077e1d5b8de6978c65490e1666ea", {debug: true, ignore_dnt: true, api_host: "https://data.chameleon.typecheck.me"});
  import_react_modal.default.setAppElement("#react-root");
  var userId;
  var userProgress;
  if (localStorage.getItem("userId") === null) {
    userId = nanoid2();
    userProgress = -1;
    localStorage.setItem("userId", userId);
    localStorage.setItem("userProgress", -1);
    import_mixpanel_browser2.default.identify(userId);
    import_mixpanel_browser2.default.track("Start user study");
  } else {
    userId = localStorage.getItem("userId");
    userProgress = parseInt(localStorage.getItem("userProgress"), 10);
    import_mixpanel_browser2.default.identify(userId);
  }
  store_default.dispatch(switchTaskThunk(userProgress + 1));
  window.addEventListener("keyup", (event) => {
    const keyName = event.key;
    let state = store_default.getState();
    if (state.debugger.mode === editorModes.normal && (keyName === "1" || keyName === "2")) {
      store_default.dispatch(showBoth());
    }
  });
  window.addEventListener("keydown", (event) => {
    let state = store_default.getState();
    const keyName = event.key;
    if (keyName === "Tab") {
      event.preventDefault();
      if (!state.debugger.multipleExps) {
        store_default.dispatch(toggleMultipleExps());
      } else if (state.debugger.multipleExps && !state.debugger.debuggingSteps) {
        store_default.dispatch(toggleDebuggerStpes());
      } else if (state.debugger.multipleExps && state.debugger.debuggingSteps) {
        store_default.dispatch(toggleMultipleExps());
        store_default.dispatch(toggleDebuggerStpes());
      }
    }
    if (state.debugger.mode === editorModes.edit && keyName === "Escape") {
      store_default.dispatch(toNormalMode());
      store_default.dispatch(typeCheckThunk());
    }
    if (state.debugger.mode === editorModes.normal) {
      if (keyName === "1") {
        store_default.dispatch(showOnlyMark1());
      }
      if (keyName === "2") {
        store_default.dispatch(showOnlyMark2());
      }
      if (state.debugger.debuggingSteps) {
        if (keyName === "ArrowDown" || keyName === "ArrowRight" || keyName === "j" || keyName === "l") {
          store_default.dispatch(prevStep());
        }
        if (keyName === "ArrowUp" || keyName === "ArrowLeft" || keyName === "k" || keyName === "h") {
          store_default.dispatch(nextStep());
        }
      }
    }
  });
  var App2 = () => {
    let wellTyped = useSelector((state) => state.debugger.wellTyped);
    return /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement(import_react_modal.default, {
      isOpen: wellTyped,
      className: "max-w-2xl bg-gray-100 h-80 min-w-max left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute p-6 rounded-md"
    }, /* @__PURE__ */ import_react14.default.createElement(ModelContent, null)), /* @__PURE__ */ import_react14.default.createElement("div", {
      className: "w-full h-full flex flex-col"
    }, /* @__PURE__ */ import_react14.default.createElement(MenuBar_default, null), /* @__PURE__ */ import_react14.default.createElement("div", {
      className: "flex-grow"
    }, /* @__PURE__ */ import_react14.default.createElement(y2, {
      initialSizes: [60, 40]
    }, /* @__PURE__ */ import_react14.default.createElement(Editor_default, null), /* @__PURE__ */ import_react14.default.createElement(Debugger_default, null)))));
  };
  var ModelContent = () => {
    let dispatch = useDispatch();
    let currentTaskNum = useSelector((state) => state.debugger.currentTaskNum);
    (0, import_react14.useEffect)(() => {
      localStorage.setItem("userProgress", currentTaskNum);
      if (currentTaskNum === 8) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userProgress");
      }
    }, []);
    return /* @__PURE__ */ import_react14.default.createElement("div", {
      className: "flex flex-col justify-around items-center h-full"
    }, /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("p", {
      className: "text-center"
    }, "Congratulations. You fixed the type error!"), currentTaskNum === 8 ? /* @__PURE__ */ import_react14.default.createElement("p", {
      className: "text-center"
    }, "Click next to leave us some feedback.") : /* @__PURE__ */ import_react14.default.createElement("p", {
      className: "text-center"
    }, "Click next to head over to the next challenge.")), /* @__PURE__ */ import_react14.default.createElement("button", {
      className: "px-5 py-1 bg-green-400 rounded-md",
      onClick: () => {
        if (currentTaskNum === 8) {
          let participant_id = localStorage.getItem("userId");
          window.location = "https://tally.so/r/nrjAxX?participant_id=" + participant_id;
          return;
        } else {
          dispatch(switchTaskThunk(currentTaskNum + 1));
          dispatch(toNormalMode());
        }
      }
    }, "Next"));
  };
  import_react_dom2.default.render(/* @__PURE__ */ import_react14.default.createElement(import_react14.default.StrictMode, null, /* @__PURE__ */ import_react14.default.createElement(Provider_default, {
    store: store_default
  }, /* @__PURE__ */ import_react14.default.createElement(App2, null))), document.getElementById("react-root"));
})();
//# sourceMappingURL=out.js.map

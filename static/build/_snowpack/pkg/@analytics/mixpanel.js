function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function mixpanelPlugin$1() {
  var pluginConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    name: "mixpanel",
    config: pluginConfig,

    /* https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelinit */
    initialize: function initialize(_ref) {
      var config = _ref.config;
      var token = config.token,
          customScriptSrc = config.customScriptSrc,
          _config$options = config.options,
          options = _config$options === void 0 ? {} : _config$options;

      if (!token) {
        throw new Error("No mixpanel token defined");
      } // NoOp if mixpanel already loaded by external source or already loaded


      if (typeof window.mixpanel !== "undefined") {
        return;
      } // Load mixpanel library


      (function (c, a) {
        if (!a.__SV) {
          var b = window;

          try {
            var d,
                m,
                j,
                k = b.location,
                f = k.hash;

            d = function d(a, b) {
              return (m = a.match(RegExp(b + "=([^&]*)"))) ? m[1] : null;
            };

            f && d(f, "state") && (j = JSON.parse(decodeURIComponent(d(f, "state"))), "mpeditor" === j.action && (b.sessionStorage.setItem("_mpcehash", f), history.replaceState(j.desiredHash || "", c.title, k.pathname + k.search)));
          } catch (n) {}

          var l, h;
          window.mixpanel = a;
          a._i = [];

          a.init = function (b, d, g) {
            function c(b, i) {
              var a = i.split(".");
              2 == a.length && (b = b[a[0]], i = a[1]);

              b[i] = function () {
                b.push([i].concat(Array.prototype.slice.call(arguments, 0)));
              };
            }

            var e = a;
            "undefined" !== typeof g ? e = a[g] = [] : g = "mixpanel";
            e.people = e.people || [];

            e.toString = function (b) {
              var a = "mixpanel";
              "mixpanel" !== g && (a += "." + g);
              b || (a += " (stub)");
              return a;
            };

            e.people.toString = function () {
              return e.toString(1) + ".people (stub)";
            };

            l = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");

            for (h = 0; h < l.length; h++) {
              c(e, l[h]);
            }

            var f = "set set_once union unset remove delete".split(" ");

            e.get_group = function () {
              function a(c) {
                b[c] = function () {
                  call2_args = arguments;
                  call2 = [c].concat(Array.prototype.slice.call(call2_args, 0));
                  e.push([d, call2]);
                };
              }

              for (var b = {}, d = ["get_group"].concat(Array.prototype.slice.call(arguments, 0)), c = 0; c < f.length; c++) {
                a(f[c]);
              }

              return b;
            };

            a._i.push([b, d, g]);
          };

          a.__SV = 1.2;
          b = c.createElement("script");
          b.type = "text/javascript";
          b.async = !0;
          b.src = customScriptSrc ? customScriptSrc : "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === c.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
          d = c.getElementsByTagName("script")[0];
          d.parentNode.insertBefore(b, d);
        }
      })(document, window.mixpanel || []);

      mixpanel.init(config.token, _objectSpread2({
        batch_requests: true
      }, options));
    },

    /**
     * Identify a visitor in mixpanel
     * @link https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelidentify
     *
     * Mixpanel doesn't allow to set properties directly in identify, so mixpanel.people.set is
     * also called if properties are passed
     */
    identify: function identify(_ref2) {
      var payload = _ref2.payload;
      var userId = payload.userId,
          traits = payload.traits;

      if (typeof userId === "string") {
        mixpanel.identify(userId);
      }

      if (traits) {
        mixpanel.people.set(traits);
      }
    },

    /**
     * Mixpanel doesn't have a "page" function, so we are using the track method by sending
     * the path as tracked event and search parameters as properties
     */
    page: function page(_ref3) {
      var payload = _ref3.payload;
      mixpanel.track(pluginConfig.pageEvent || payload.properties.path, payload.properties);
    },

    /* https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpaneltrack */
    track: function track(_ref4) {
      var payload = _ref4.payload;
      mixpanel.track(payload.event, payload.properties);
    },
    loaded: function loaded() {
      return !!window.mixpanel;
    },

    /* Clears super properties and generates a new random distinct_id for this instance. Useful for clearing data when a user logs out. */
    reset: function reset() {
      mixpanel.reset();
    },

    /* Custom methods to add .alias call */
    methods: {
      /**
       * The alias method creates an alias which Mixpanel will use to remap one id to another. Multiple aliases can point to the same identifier.
       * @link https://developer.mixpanel.com/docs/javascript-full-api-reference#mixpanelalias
       *
       * @param  {string} [alias] - A unique identifier that you want to use for this user in the future.
       * @param  {string} [original] - The current identifier being used for this user.
       */
      alias: function alias(_alias, original) {
        mixpanel.alias(_alias, original);
      }
    }
  };
}

/* This module will shake out unused code and work in browser and node 🎉 */

var index = mixpanelPlugin$1;

export default index;

function i(t,e,l,n,r){for(e=e.split?e.split("."):e,n=0;n<e.length;n++)t=t?t[e[n]]:r;return t===r?l:t}

/* SNOWPACK PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== 'undefined') {
    globalContext = window;
} else if (typeof self !== 'undefined') {
    globalContext = self;
} else {
    globalContext = {};
}
if (typeof globalContext.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = globalContext.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: {"NODE_ENV":"production"},
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var e="undefined",o="object",g="any",m="*",j="__",F="undefined"!=typeof process?process:{},P=F.env&&F.env.NODE_ENV||"",$="undefined"!=typeof window,_=null!=F.versions&&null!=F.versions.node,k="undefined"!=typeof Deno&&void 0!==Deno.core,G=$&&"nodejs"===window.name||"undefined"!=typeof navigator&&(navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom"));function M(n,t){return t.charAt(0)[n]()+t.slice(1)}var U=M.bind(null,"toUpperCase"),H=M.bind(null,"toLowerCase");function J(n){return Y(n)?U("null"):"object"==typeof n?yn(n):Object.prototype.toString.call(n).slice(8,-1)}function R(n,t){void 0===t&&(t=!0);var e=J(n);return t?H(e):e}function V(n,t){return typeof t===n}var W=V.bind(null,"function"),q=V.bind(null,"string"),I=V.bind(null,"undefined");var Q=V.bind(null,"boolean"),X=V.bind(null,"symbol");function Y(n){return null===n}function nn(n){return "number"===R(n)&&!isNaN(n)}function rn(n){return "array"===R(n)}function on$1(n){if(!un(n))return !1;for(var t=n;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(n)===t}function un(n){return n&&("object"==typeof n||null!==n)}function yn(n){return W(n.constructor)?n.constructor.name:null}function hn(n){return n instanceof Error||q(n.message)&&n.constructor&&nn(n.constructor.stackTraceLimit)}function On(n,t){if("object"!=typeof t||Y(t))return !1;if(t instanceof n)return !0;var e=R(new n(""));if(hn(t))for(;t;){if(R(t)===e)return !0;t=Object.getPrototypeOf(t);}return !1}var Sn=On.bind(null,TypeError),wn=On.bind(null,SyntaxError);function $n(n,t){var e=n instanceof Element||n instanceof HTMLDocument;return e&&t?Tn(n,t):e}function Tn(n,t){return void 0===t&&(t=""),n&&n.nodeName===t.toUpperCase()}function _n(n){var t=[].slice.call(arguments,1);return function(){return n.apply(void 0,[].slice.call(arguments).concat(t))}}var kn=_n($n,"form"),Bn=_n($n,"button"),Gn=_n($n,"input"),Mn=_n($n,"select");

function n(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(e){return null}}function o$1(){if($){var r=navigator,t=r.languages;return r.userLanguage||(t&&t.length?t[0]:r.language)}}function a(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){}}function s(r){return function(e){for(var r,t=Object.create(null),o=/([^&=]+)=?([^&]*)/g;r=o.exec(e);){var a=n(r[1]),i=n(r[2]);"[]"===a.substring(a.length-2)?(t[a=a.substring(0,a.length-2)]||(t[a]=[])).push(i):t[a]=""===i||i;}for(var u in t){var c=u.split("[");c.length>1&&(m$1(t,c.map(function(e){return e.replace(/[?[\]\\ ]/g,"")}),t[u]),delete t[u]);}return t}(function(r){if(r){var t=r.match(/\?(.*)/);return t&&t[1]?t[1].split("#")[0]:""}return $&&window.location.search.substring(1)}(r))}function m$1(e,r,t){for(var n=r.length-1,o=0;o<n;++o){var a=r[o];if("__proto__"===a||"constructor"===a)break;a in e||(e[a]={}),e=e[a];}e[r[n]]=t;}function y(){for(var e="",r=0,t=4294967295*Math.random()|0;r++<36;){var n="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"[r-1],o=15&t;e+="-"==n||"4"==n?n:("x"==n?o:3&o|8).toString(16),t=r%8==0?4294967295*Math.random()|0:t>>4;}return e}

var l="global",o$2=j+"global"+j,n$1=typeof self===o&&self.self===self&&self||typeof global===o&&global.global===global&&global||void 0;function a$1(t){return n$1[o$2][t]}function f(t,e){return n$1[o$2][t]=e}function i$1(t){delete n$1[o$2][t];}function u(t,e,r){var l;try{if(b(t)){var o=window[t];l=o[e].bind(o);}}catch(t){}return l||r}n$1[o$2]||(n$1[o$2]={});var c={};function b(t){if(typeof c[t]!==e)return c[t];try{var e$1=window[t];e$1.setItem(e,e),e$1.removeItem(e);}catch(e){return c[t]=!1}return c[t]=!0}

function v(){return v=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);}return e},v.apply(this,arguments)}var y$1="function",b$1="undefined",I$1="@@redux/"+Math.random().toString(36),w=/* #__PURE__ */function(){return typeof Symbol===y$1&&Symbol.observable||"@@observable"}(),E=" != "+y$1;function P$1(e,n,t){var r;if(typeof n===y$1&&typeof t===b$1&&(t=n,n=void 0),typeof t!==b$1){if(typeof t!==y$1)throw new Error("enhancer"+E);return t(P$1)(e,n)}if(typeof e!==y$1)throw new Error("reducer"+E);var i=e,a=n,o=[],u=o,c=!1;function s(){u===o&&(u=o.slice());}function f(){return a}function d(e){if(typeof e!==y$1)throw new Error("Listener"+E);var n=!0;return s(),u.push(e),function(){if(n){n=!1,s();var t=u.indexOf(e);u.splice(t,1);}}}function p(e){if(!on$1(e))throw new Error("Act != obj");if(typeof e.type===b$1)throw new Error("ActType "+b$1);if(c)throw new Error("Dispatch in reducer");try{c=!0,a=i(a,e);}finally{c=!1;}for(var n=o=u,t=0;t<n.length;t++)(0, n[t])();return e}return p({type:"@@redux/INIT"}),(r={dispatch:p,subscribe:d,getState:f,replaceReducer:function(e){if(typeof e!==y$1)throw new Error("next reducer"+E);i=e,p({type:"@@redux/INIT"});}})[w]=function(){var e,n=d;return (e={subscribe:function(e){if("object"!=typeof e)throw new TypeError("Observer != obj");function t(){e.next&&e.next(f());}return t(),{unsubscribe:n(t)}}})[w]=function(){return this},e},r}function S(e,n){var t=n&&n.type;return "action "+(t&&t.toString()||"?")+"reducer "+e+" returns "+b$1}function N(){var e=[].slice.call(arguments);return 0===e.length?function(e){return e}:1===e.length?e[0]:e.reduce(function(e,n){return function(){return e(n.apply(void 0,[].slice.call(arguments)))}})}function O(){var e=arguments;return function(n){return function(t,r,i){var a,o=n(t,r,i),u=o.dispatch,c={getState:o.getState,dispatch:function(e){return u(e)}};return a=[].slice.call(e).map(function(e){return e(c)}),v({},o,{dispatch:u=N.apply(void 0,a)(o.dispatch)})}}}var A=j+"anon_id",_$1=j+"user_id",x=j+"user_traits",j$1="userId",T="anonymousId",z=["bootstrap","params","campaign","initializeStart","initialize","initializeEnd","ready","resetStart","reset","resetEnd","pageStart","page","pageEnd","pageAborted","trackStart","track","trackEnd","trackAborted","identifyStart","identify","identifyEnd","identifyAborted","userIdChanged","registerPlugins","enablePlugin","disablePlugin","online","offline","setItemStart","setItem","setItemEnd","setItemAborted","removeItemStart","removeItem","removeItemEnd","removeItemAborted"],M$1=["name","EVENTS","config","loaded"],q$1=z.reduce(function(e,n){return e[n]=n,e},{registerPluginType:function(e){return "registerPlugin:"+e},pluginReadyType:function(e){return "ready:"+e}}),U$1=/^utm_/,V$1=/^an_prop_/,L=/^an_trait_/;function C(e){var n=e.storage.setItem;return function(t){return function(r){return function(i){if(i.type===q$1.bootstrap){var a=i.params,o=i.user,u=i.persistedUser,c=i.initialUser,s=u.userId===o.userId;u.anonymousId!==o.anonymousId&&n(A,o.anonymousId),s||n(_$1,o.userId),c.traits&&n(x,v({},s&&u.traits?u.traits:{},c.traits));var l=Object.keys(i.params);if(l.length){var f=a.an_uid,d=a.an_event,p=l.reduce(function(e,n){if(n.match(U$1)||n.match(/^(d|g)clid/)){var t=n.replace(U$1,"");e.campaign["campaign"===t?"name":t]=a[n];}return n.match(V$1)&&(e.props[n.replace(V$1,"")]=a[n]),n.match(L)&&(e.traits[n.replace(L,"")]=a[n]),e},{campaign:{},props:{},traits:{}});t.dispatch(v({type:q$1.params,raw:a},p,f?{userId:f}:{})),f&&setTimeout(function(){return e.identify(f,p.traits)},0),d&&setTimeout(function(){return e.track(d,p.props)},0),Object.keys(p.campaign).length&&t.dispatch({type:q$1.campaign,campaign:p.campaign});}}return r(i)}}}}function R$1(e){return function(n,t){if(void 0===n&&(n={}),void 0===t&&(t={}),t.type===q$1.setItemEnd){if(t.key===A)return v({},n,{anonymousId:t.value});if(t.key===_$1)return v({},n,{userId:t.value})}switch(t.type){case q$1.identify:return Object.assign({},n,{userId:t.userId,traits:v({},n.traits,t.traits)});case q$1.reset:return [_$1,A,x].forEach(function(n){e.removeItem(n);}),Object.assign({},n,{userId:null,anonymousId:null,traits:{}});default:return n}}}function $$1(e){return {userId:e.getItem(_$1),anonymousId:e.getItem(A),traits:e.getItem(x)}}var D=function(e){return j+"TEMP"+j+e};function B(n){var t=n.storage,r=t.setItem,i=t.removeItem,a=t.getItem;return function(n){return function(t){return function(u){var c=u.userId,s=u.traits,l=u.options;if(u.type===q$1.reset&&([_$1,x,A].forEach(function(e){i(e);}),[j$1,T,"traits"].forEach(function(e){i$1(D(e));})),u.type===q$1.identify){a(A)||r(A,y());var f=a(_$1),d=a(x)||{};f&&f!==c&&n.dispatch({type:q$1.userIdChanged,old:{userId:f,traits:d},new:{userId:c,traits:s},options:l}),c&&r(_$1,c),s&&r(x,v({},d,s));}return t(u)}}}}var X$1={};function J$1(e,n){X$1[e]&&W(X$1[e])&&(X$1[e](n),delete X$1[e]);}function W$1(e,n,t){return new Promise(function(r,i){return n()?r(e):t<1?i(v({},e,{queue:!0})):new Promise(function(e){return setTimeout(e,10)}).then(function(a){return W$1(e,n,t-10).then(r,i)})})}function H$1(e,n,t){var r=n(),i=e.getState(),a=i.plugins,o=i.queue,u=i.user;if(!i.context.offline&&o&&o.actions&&o.actions.length){var c=o.actions.reduce(function(e,n,t){return a[n.plugin].loaded?(e.process.push(n),e.processIndex.push(t)):(e.requeue.push(n),e.requeueIndex.push(t)),e},{processIndex:[],process:[],requeue:[],requeueIndex:[]});if(c.processIndex&&c.processIndex.length){c.processIndex.forEach(function(n){var i=o.actions[n],c=i.plugin,s=i.payload.type,l=r[c][s];if(l&&W(l)){var f=function(e,n){return void 0===e&&(e={}),void 0===n&&(n={}),[j$1,T].reduce(function(t,r){return e.hasOwnProperty(r)&&n[r]&&n[r]!==e[r]&&(t[r]=n[r]),t},e)}(i.payload,u);l({payload:f,config:a[c].config,instance:t});var p=s+":"+c;e.dispatch(v({},f,{type:p,_:{called:p,from:"queueDrain"}}));}});var s=o.actions.filter(function(e,n){return !~c.processIndex.indexOf(n)});o.actions=s;}}}var F$1=function(e){var n=e.data,t=e.action,r=e.instance,i=e.state,a=e.allPlugins,o=e.allMatches,u=e.store,c=e.EVENTS;try{var s=i.plugins,f=i.context,p=t.type,m=p.match(G$1),g=n.exact.map(function(e){return e.pluginName});m&&(g=o.during.map(function(e){return e.pluginName}));var h=function(e,n){return function(t,r,i){var a=r.config,o=r.name,u=o+"."+t.type;i&&(u=i.event);var c=t.type.match(G$1)?function(e,n,t,r,i){return function(a,o){var u=r?r.name:e,c=o&&ie(o)?o:t;if(r&&(!(c=o&&ie(o)?o:[e]).includes(e)||1!==c.length))throw new Error("Method "+n+" can only abort "+e+" plugin. "+JSON.stringify(c)+" input valid");return v({},i,{abort:{reason:a,plugins:c,caller:n,_:u}})}}(o,u,n,i,t):function(e,n){return function(){throw new Error(e.type+" action not cancellable. Remove abort in "+n)}}(t,u);return {payload:ue(t),instance:e,config:a||{},abort:c}}}(r,g),y=n.exact.reduce(function(e,n){var t=n.pluginName,r=n.methodName,i=!1;return r.match(/^initialize/)||r.match(/^reset/)||(i=!s[t].loaded),f.offline&&r.match(/^(page|track|identify)/)&&(i=!0),e[""+t]=i,e},{});return Promise.resolve(n.exact.reduce(function(e,i,o){var u=i.pluginName;return Promise.resolve(e).then(function(e){function i(){return Promise.resolve(e)}var o=function(){if(n.namespaced&&n.namespaced[u])return Promise.resolve(n.namespaced[u].reduce(function(e,n,t){return Promise.resolve(e).then(function(e){return n.method&&W(n.method)?(function(e,n){var t=oe(e);if(t&&t.name===n){var r=oe(t.method);throw new Error([n+" plugin is calling method "+e,"Plugins cant call self","Use "+t.method+" "+(r?"or "+r.method:"")+" in "+n+" plugin insteadof "+e].join("\n"))}}(n.methodName,n.pluginName),Promise.resolve(n.method({payload:e,instance:r,abort:(t=e,i=u,o=n.pluginName,function(e,n){return v({},t,{abort:{reason:e,plugins:n||[i],caller:p,from:o||i}})}),config:Z(n.pluginName,s,a),plugins:s})).then(function(n){var t=on$1(n)?n:{};return Promise.resolve(v({},e,t))})):e;var t,i,o;})},Promise.resolve(t))).then(function(n){e[u]=n;});e[u]=t;}();return o&&o.then?o.then(i):i()})},Promise.resolve({}))).then(function(e){return Promise.resolve(n.exact.reduce(function(t,i,o){try{var c=n.exact.length===o+1,f=i.pluginName,d=a[f];return Promise.resolve(t).then(function(n){var t=e[f]?e[f]:{};if(m&&(t=n),te(t,f))return Y$1({data:t,method:p,instance:r,pluginName:f,store:u}),Promise.resolve(n);if(te(n,f))return c&&Y$1({data:n,method:p,instance:r,store:u}),Promise.resolve(n);if(y.hasOwnProperty(f)&&!0===y[f])return u.dispatch({type:"queue",plugin:f,payload:t,_:{called:"queue",from:"queueMechanism"}}),Promise.resolve(n);var i=h(e[f],a[f]);return Promise.resolve(d[p]({abort:i.abort,payload:t,instance:r,config:Z(f,s,a),plugins:s})).then(function(i){var a=on$1(i)?i:{},o=v({},n,a),c=e[f];if(te(c,f))Y$1({data:c,method:p,instance:r,pluginName:f,store:u});else {var s=p+":"+f;(s.match(/:/g)||[]).length<2&&!p.match(K)&&!p.match(Q$1)&&r.dispatch(v({},m?o:t,{type:s,_:{called:s,from:"submethod"}}));}return Promise.resolve(o)})})}catch(e){return Promise.reject(e)}},Promise.resolve(t))).then(function(e){if(!(p.match(G$1)||p.match(/^registerPlugin/)||p.match(Q$1)||p.match(K)||p.match(/^params/)||p.match(/^userIdChanged/))){if(c.plugins.includes(p),e._&&e._.originalAction===p)return e;var t=v({},e,{_:{originalAction:e.type,called:e.type,from:"engineEnd"}});re(e,n.exact.length)&&!p.match(/End$/)&&(t=v({},t,{type:e.type+"Aborted"})),u.dispatch(t);}return e})})}catch(e){return Promise.reject(e)}},G$1=/Start$/,K=/^bootstrap/,Q$1=/^ready/;function Y$1(e){var n=e.pluginName,t=e.method+"Aborted"+(n?":"+n:"");e.store.dispatch(v({},e.data,{type:t,_:{called:t,from:"abort"}}));}function Z(e,n,t){var r=n[e]||t[e];return r&&r.config?r.config:{}}function ee(e,n){return n.reduce(function(n,t){return t[e]?n.concat({methodName:e,pluginName:t.name,method:t[e]}):n},[])}function ne(e,n){var t=e.replace(G$1,""),r=n?":"+n:"";return [""+e+r,""+t+r,t+"End"+r]}function te(e,n){var t=e.abort;return !!t&&(!0===t||ae(t,n)||t&&ae(t.plugins,n))}function re(e,n){var t=e.abort;if(!t)return !1;if(!0===t||q(t))return !0;var r=t.plugins;return ie(t)&&t.length===n||ie(r)&&r.length===n}function ie(e){return Array.isArray(e)}function ae(e,n){return !(!e||!ie(e))&&e.includes(n)}function oe(e){var n=e.match(/(.*):(.*)/);return !!n&&{method:n[1],name:n[2]}}function ue(e){return Object.keys(e).reduce(function(n,t){return "type"===t||(n[t]=on$1(e[t])?Object.assign({},e[t]):e[t]),n},{})}function ce(e,n,t){var r={};return function(i){return function(a){return function(o){try{var u,c=function(e){return u?e:a(f)},s=o.type,l=o.plugins,f=o;if(o.abort)return Promise.resolve(a(o));if(s===q$1.enablePlugin&&i.dispatch({type:q$1.initializeStart,plugins:l,disabled:[],fromEnable:!0,meta:o.meta}),s===q$1.disablePlugin&&setTimeout(function(){return J$1(o.meta.rid,{payload:o})},0),s===q$1.initializeEnd){var m=n(),g=Object.keys(m),h=g.filter(function(e){return l.includes(e)}).map(function(e){return m[e]}),y=[],b=[],I=o.disabled,w=h.map(function(e){var n=e.name;return W$1(e,e.loaded,1e4).then(function(t){return r[n]||(i.dispatch({type:q$1.pluginReadyType(n),name:n,events:Object.keys(e).filter(function(e){return !M$1.includes(e)})}),r[n]=!0),y=y.concat(n),e}).catch(function(e){if(e instanceof Error)throw new Error(e);return b=b.concat(e.name),e})});Promise.all(w).then(function(e){var n={plugins:y,failed:b,disabled:I};setTimeout(function(){g.length===w.length+I.length&&i.dispatch(v({},{type:q$1.ready},n));},0);});}var E=function(){if(s!==q$1.bootstrap)return /^ready:([^:]*)$/.test(s)&&setTimeout(function(){return H$1(i,n,e)},0),Promise.resolve(function(e,n,t,r,i){try{var a=W(n)?n():n,o=e.type,u=o.replace(G$1,"");if(e._&&e._.called)return Promise.resolve(e);var c=t.getState(),s=(m=a,void 0===(g=c.plugins)&&(g={}),void 0===(h=e.options)&&(h={}),Object.keys(m).filter(function(e){var n=h.plugins||{};return Q(n[e])?n[e]:!1!==n.all&&(!g[e]||!1!==g[e].enabled)}).map(function(e){return m[e]}));o===q$1.initializeStart&&e.fromEnable&&(s=Object.keys(c.plugins).filter(function(n){var t=c.plugins[n];return e.plugins.includes(n)&&!t.initialized}).map(function(e){return a[e]}));var l=s.map(function(e){return e.name}),f=function(e,n,t){var r=ne(e).map(function(e){return ee(e,n)});return n.reduce(function(t,r){var i=r.name,a=ne(e,i).map(function(e){return ee(e,n)}),o=a[0],u=a[1],c=a[2];return o.length&&(t.beforeNS[i]=o),u.length&&(t.duringNS[i]=u),c.length&&(t.afterNS[i]=c),t},{before:r[0],beforeNS:{},during:r[1],duringNS:{},after:r[2],afterNS:{}})}(o,s);return Promise.resolve(F$1({action:e,data:{exact:f.before,namespaced:f.beforeNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){function n(){var n=function(){if(o.match(G$1))return Promise.resolve(F$1({action:v({},s,{type:u+"End"}),data:{exact:f.after,namespaced:f.afterNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){e.meta&&e.meta.hasCallback&&J$1(e.meta.rid,{payload:e});})}();return n&&n.then?n.then(function(){return e}):e}if(re(e,l.length))return e;var s,d=function(){if(o!==u)return Promise.resolve(F$1({action:v({},e,{type:u}),data:{exact:f.during,namespaced:f.duringNS},state:c,allPlugins:a,allMatches:f,instance:t,store:r,EVENTS:i})).then(function(e){s=e;});s=e;}();return d&&d.then?d.then(n):n()})}catch(e){return Promise.reject(e)}var m,g,h;}(o,n,e,i,t)).then(function(e){var n=a(e);return u=1,n})}();return Promise.resolve(E&&E.then?E.then(c):c(E))}catch(e){return Promise.reject(e)}}}}}function se(e){return function(n){return function(n){return function(t){var r=t.type,i=t.key,a=t.value,o=t.options;if(r===q$1.setItem||r===q$1.removeItem){if(t.abort)return n(t);r===q$1.setItem?e.setItem(i,a,o):e.removeItem(i,o);}return n(t)}}}}var le=function(){var e=this;this.before=[],this.after=[],this.addMiddleware=function(n,t){e[t]=e[t].concat(n);},this.removeMiddleware=function(n,t){var r=e[t].findIndex(function(e){return e===n});-1!==r&&(e[t]=[].concat(e[t].slice(0,r),e[t].slice(r+1)));},this.dynamicMiddlewares=function(n){return function(t){return function(r){return function(i){var a={getState:t.getState,dispatch:function(e){return t.dispatch(e)}},o=e[n].map(function(e){return e(a)});return N.apply(void 0,o)(r)(i)}}}};};function fe(e){return function(n,t){void 0===n&&(n={});var r={};if("initialize:aborted"===t.type)return n;if(/^registerPlugin:([^:]*)$/.test(t.type)){var i=de(t.type,"registerPlugin"),a=e()[i];if(!a||!i)return n;var o=t.enabled;return r[i]={enabled:o,initialized:!!o&&Boolean(!a.initialize),loaded:!!o&&Boolean(a.loaded()),config:a.config||{}},v({},n,r)}if(/^initialize:([^:]*)$/.test(t.type)){var u=de(t.type,q$1.initialize),c=e()[u];return c&&u?(r[u]=v({},n[u],{initialized:!0,loaded:Boolean(c.loaded())}),v({},n,r)):n}if(/^ready:([^:]*)$/.test(t.type))return r[t.name]=v({},n[t.name],{loaded:!0}),v({},n,r);switch(t.type){case q$1.disablePlugin:return v({},n,pe(t.plugins,!1,n));case q$1.enablePlugin:return v({},n,pe(t.plugins,!0,n));default:return n}}}function de(e,n){return e.substring(n.length+1,e.length)}function pe(e,n,t){return e.reduce(function(e,r){return e[r]=v({},t[r],{enabled:n}),e},t)}function me(e){try{return JSON.parse(JSON.stringify(e))}catch(e){}return e}var ge={last:{},history:[]};function he(e,n){void 0===e&&(e=ge);var t=n.options,r=n.meta;if(n.type===q$1.track){var i=me(v({event:n.event,properties:n.properties},Object.keys(t).length&&{options:t},{meta:r}));return v({},e,{last:i,history:e.history.concat(i)})}return e}var ve={actions:[]};function ye(e,n){void 0===e&&(e=ve);var t=n.payload;switch(n.type){case"queue":var r;return r=t&&t.type&&t.type===q$1.identify?[n].concat(e.actions):e.actions.concat(n),v({},e,{actions:r});case"dequeue":return [];default:return e}}var be=/#.*$/;function Ie(e){var n=/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/g.exec(e);return "/"+(n&&n[3]?n[3].split("?")[0].replace(be,""):"")}var we,Ee,Pe,Se,Ne=function(e){if(void 0===e&&(e={}),!$)return e;var n=document,t=n.title,r=n.referrer,i=window,a=i.location,o=i.innerWidth,u=i.innerHeight,c=a.hash,s=a.search,l=function(e){var n=function(){if($)for(var e,n=document.getElementsByTagName("link"),t=0;e=n[t];t++)if("canonical"===e.getAttribute("rel"))return e.getAttribute("href")}();return n?n.match(/\?/)?n:n+e:window.location.href.replace(be,"")}(s),f={title:t,url:l,path:Ie(l),hash:c,search:s,width:o,height:u};return r&&""!==r&&(f.referrer=r),v({},f,e)},Oe={last:{},history:[]};function Ae(e,n){void 0===e&&(e=Oe);var t=n.options;if(n.type===q$1.page){var r=me(v({properties:n.properties,meta:n.meta},Object.keys(t).length&&{options:t}));return v({},e,{last:r,history:e.history.concat(r)})}return e}we=function(){if(!$)return !1;var e=navigator.appVersion;return ~e.indexOf("Win")?"Windows":~e.indexOf("Mac")?"MacOS":~e.indexOf("X11")?"UNIX":~e.indexOf("Linux")?"Linux":"Unknown OS"}(),Ee=$?document.referrer:null,Pe=o$1(),Se=a();var _e={initialized:!1,sessionId:y(),app:null,version:null,debug:!1,offline:!!$&&!navigator.onLine,os:{name:we},userAgent:$?navigator.userAgent:"node",library:{name:"analytics",version:"0.11.0"},timezone:Se,locale:Pe,campaign:{},referrer:Ee};function xe(e,n){void 0===e&&(e=_e);var t=e.initialized,r=n.campaign;switch(n.type){case q$1.campaign:return v({},e,{campaign:r});case q$1.offline:return v({},e,{offline:!0});case q$1.online:return v({},e,{offline:!1});default:return t?e:v({},_e,e,{initialized:!0})}}var ke=["plugins","reducers","storage"];function je(e,n,t){if($){var r=window[(t?"add":"remove")+"EventListener"];e.split(" ").forEach(function(e){r(e,n);});}}function Te(e){var n=je.bind(null,"online offline",function(n){return Promise.resolve(!navigator.onLine).then(e)});return n(!0),function(e){return n(!1)}}function ze(){return f("analytics",[]),function(e){return function(n,t,r){var i=e(n,t,r),a=i.dispatch;return Object.assign(i,{dispatch:function(e){return n$1[o$2].analytics.push(e.action||e),a(e)}})}}}function Me(e){return function(){return N(N.apply(null,arguments),ze())}}function qe(e){return e?rn(e)?e:[e]:[]}function Ue(n,t,r){void 0===n&&(n={});var i,a,o=y();return t&&(X$1[o]=(i=t,a=function(e){for(var n,t=e||Array.prototype.slice.call(arguments),r=0;r<t.length;r++)if(W(t[r])){n=t[r];break}return n}(r),function(e){a&&a(e),i(e);})),v({},n,{rid:o,ts:(new Date).getTime()},t?{hasCallback:!0}:{})}function Ve(n){void 0===n&&(n={});var t=n.reducers||{},c=n.initialUser||{},s$1=(n.plugins||[]).reduce(function(e,n){if(W(n))return e.middlewares=e.middlewares.concat(n),e;if(n.NAMESPACE&&(n.name=n.NAMESPACE),!n.name)throw new Error("https://lytics.dev/errors/1");var t=n.EVENTS?Object.keys(n.EVENTS).map(function(e){return n.EVENTS[e]}):[];e.pluginEnabled[n.name]=!(!1===n.enabled||n.config&&!1===n.config.enabled),delete n.enabled,n.methods&&(e.methods[n.name]=Object.keys(n.methods).reduce(function(e,t){var r;return e[t]=(r=n.methods[t],function(){for(var e=Array.prototype.slice.call(arguments),n=new Array(r.length),t=0;t<e.length;t++)n[t]=e[t];return n[n.length]=K,r.apply({instance:K},n)}),e},{}),delete n.methods);var r=Object.keys(n).concat(t),i=new Set(e.events.concat(r));if(e.events=Array.from(i),e.pluginsArray=e.pluginsArray.concat(n),e.plugins[n.name])throw new Error(n.name+"AlreadyLoaded");return e.plugins[n.name]=n,e.plugins[n.name].loaded||(e.plugins[n.name].loaded=function(){return !0}),e},{plugins:{},pluginEnabled:{},methods:{},pluginsArray:[],middlewares:[],events:[]}),f$1=n.storage?n.storage:{getItem:a$1,setItem:f,removeItem:i$1},p=function(e){return function(n,t,r){return t.getState("user")[n]||(r&&on$1(r)&&r[n]?r[n]:$$1(e)[n]||a$1(D(n))||null)}}(f$1),h=s$1.plugins,w=s$1.events.filter(function(e){return !M$1.includes(e)}).sort(),E=new Set(w.concat(z).filter(function(e){return !M$1.includes(e)})),_=Array.from(E).sort(),x=function(){return h},k=new le,U=k.addMiddleware,V=k.removeMiddleware,L=k.dynamicMiddlewares,X=function(){throw new Error("Abort disabled inListener")},J=s(),W$1=$$1(f$1),F=v({},W$1,c,J.an_uid?{userId:J.an_uid}:{},J.an_aid?{anonymousId:J.an_aid}:{});F.anonymousId||(F.anonymousId=y());var G=v({enable:function(e,n){return new Promise(function(t){oe.dispatch({type:q$1.enablePlugin,plugins:qe(e),_:{originalAction:q$1.enablePlugin}},t,[n]);})},disable:function(e,n){return new Promise(function(t){oe.dispatch({type:q$1.disablePlugin,plugins:qe(e),_:{originalAction:q$1.disablePlugin}},t,[n]);})}},s$1.methods),K={identify:function(e,n,t,r){try{var i=q(e)?e:null,a=on$1(e)?e:n,o=t||{},c=K.user();f(D(j$1),i);var s=i||a.userId||p(j$1,K,a);return Promise.resolve(new Promise(function(e){oe.dispatch(v({type:q$1.identifyStart,userId:s,traits:a||{},options:o,anonymousId:c.anonymousId},c.id&&c.id!==i&&{previousId:c.id}),e,[n,t,r]);}))}catch(e){return Promise.reject(e)}},track:function(e,n,t,r){try{var i=on$1(e)?e.event:e;if(!i||!q(i))throw new Error("EventMissing");var a=on$1(e)?e:n||{},o=on$1(t)?t:{};return Promise.resolve(new Promise(function(e){oe.dispatch({type:q$1.trackStart,event:i,properties:a,options:o,userId:p(j$1,K,n),anonymousId:p(T,K,n)},e,[n,t,r]);}))}catch(e){return Promise.reject(e)}},page:function(e,n,t){try{var r=on$1(e)?e:{},i=on$1(n)?n:{};return Promise.resolve(new Promise(function(a){oe.dispatch({type:q$1.pageStart,properties:Ne(r),options:i,userId:p(j$1,K,r),anonymousId:p(T,K,r)},a,[e,n,t]);}))}catch(e){return Promise.reject(e)}},user:function(e){if(e===j$1||"id"===e)return p(j$1,K);if(e===T||"anonId"===e)return p(T,K);var n=K.getState("user");return e?i(n,e):n},reset:function(e){return new Promise(function(n){oe.dispatch({type:q$1.resetStart},n,e);})},ready:function(e){return K.on(q$1.ready,e)},on:function(e,n){if(!e||!W(n))return !1;if(e===q$1.bootstrap)throw new Error(".on disabled for "+e);var t=/Start$|Start:/;if("*"===e){var r=function(e){return function(e){return function(r){return r.type.match(t)&&n({payload:r,instance:K,plugins:h}),e(r)}}},i=function(e){return function(e){return function(r){return r.type.match(t)||n({payload:r,instance:K,plugins:h}),e(r)}}};return U(r,Le),U(i,Ce),function(){V(r,Le),V(i,Ce);}}var a=e.match(t)?Le:Ce,o=function(t){return function(t){return function(r){return r.type===e&&n({payload:r,instance:K,plugins:h,abort:X}),t(r)}}};return U(o,a),function(){return V(o,a)}},once:function(e,n){if(!e||!W(n))return !1;if(e===q$1.bootstrap)throw new Error(".once disabled for "+e);var t=K.on(e,function(e){n({payload:e.payload,instance:K,plugins:h,abort:X}),t();});return t},getState:function(e){var n=oe.getState();return e?i(n,e):Object.assign({},n)},dispatch:function(e){var n=q(e)?{type:e}:e;if(z.includes(n.type))throw new Error("reserved action "+n.type);var t=v({},n,{_:v({originalAction:n.type},e._||{})});oe.dispatch(t);},enablePlugin:G.enable,disablePlugin:G.disable,plugins:G,storage:{getItem:f$1.getItem,setItem:function(e,n,t){oe.dispatch({type:q$1.setItemStart,key:e,value:n,options:t});},removeItem:function(e,n){oe.dispatch({type:q$1.removeItemStart,key:e,options:n});}},setAnonymousId:function(e,n){K.storage.setItem(A,e,n);},events:{core:z,plugins:w}},Q=s$1.middlewares.concat([function(e){return function(e){return function(n){return n.meta||(n.meta=Ue()),e(n)}}},L(Le),ce(K,x,{all:_,plugins:w}),se(f$1),C(K),B(K),L(Ce)]),Y={context:xe,user:R$1(f$1),page:Ae,track:he,plugins:fe(x),queue:ye},Z=N,ee=N;if($&&n.debug){var ne=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;ne&&(Z=ne({trace:!0,traceLimit:25})),ee=function(){return 0===arguments.length?ze():on$1(typeof arguments[0])?Me():Me().apply(null,arguments)};}var te,re=function(e){return Object.keys(e).reduce(function(n,t){return ke.includes(t)||(n[t]=e[t]),n},{})}(n),ie=s$1.pluginsArray.reduce(function(e,n){var t=n.name,r=n.config,i=n.loaded,a=s$1.pluginEnabled[t];return e[t]={enabled:a,initialized:!!a&&Boolean(!n.initialize),loaded:Boolean(i()),config:r||{}},e},{}),ae={context:re,user:F,plugins:ie},oe=P$1(function(e){for(var n=Object.keys(e),t={},r=0;r<n.length;r++){var i=n[r];typeof e[i]===y$1&&(t[i]=e[i]);}var a,o=Object.keys(t);try{!function(e){Object.keys(e).forEach(function(n){var t=e[n];if(typeof t(void 0,{type:"@@redux/INIT"})===b$1||typeof t(void 0,{type:I$1})===b$1)throw new Error("reducer "+n+" "+b$1)});}(t);}catch(e){a=e;}return function(e,n){if(void 0===e&&(e={}),a)throw a;for(var r=!1,i={},u=0;u<o.length;u++){var c=o[u],s=e[c],l=(0, t[c])(s,n);if(typeof l===b$1){var f=S(c,n);throw new Error(f)}i[c]=l,r=r||l!==s;}return r?i:e}}(v({},Y,t)),ae,ee(Z(O.apply(void 0,Q))));oe.dispatch=(te=oe.dispatch,function(e,n,t){var r=v({},e,{meta:Ue(e.meta,n,qe(t))});return te.apply(null,[r])});var ue=Object.keys(h);oe.dispatch({type:q$1.bootstrap,plugins:ue,config:re,params:J,user:F,initialUser:c,persistedUser:W$1});var de=ue.filter(function(e){return s$1.pluginEnabled[e]}),pe=ue.filter(function(e){return !s$1.pluginEnabled[e]});return oe.dispatch({type:q$1.registerPlugins,plugins:ue,enabled:s$1.pluginEnabled}),s$1.pluginsArray.map(function(e,n){var t=e.bootstrap,r=e.config,i=e.name;t&&W(t)&&t({instance:K,config:r,payload:e}),oe.dispatch({type:q$1.registerPluginType(i),name:i,enabled:s$1.pluginEnabled[i],plugin:e}),s$1.pluginsArray.length===n+1&&oe.dispatch({type:q$1.initializeStart,plugins:de,disabled:pe});}),Te(function(e){oe.dispatch({type:e?q$1.offline:q$1.online});}),function(e,n,t){setInterval(function(){return H$1(e,n,t)},3e3);}(oe,x,K),K}var Le="before",Ce="after";

var t="cookie",i$2=a$2(),r=d,c$1=d;function u$1(o){return i$2?d(o,"",-1):i$1(o)}function a$2(){if(void 0!==i$2)return i$2;var e="cookiecookie";try{d(e,e),i$2=-1!==document.cookie.indexOf(e),u$1(e);}catch(e){i$2=!1;}return i$2}function d(e,t,r,c,u,a){if("undefined"!=typeof window){var d=arguments.length>1;return !1===i$2&&(d?f(e,t):a$1(e)),d?document.cookie=e+"="+encodeURIComponent(t)+(r?"; expires="+new Date(+new Date+1e3*r).toUTCString()+(c?"; path="+c:"")+(u?"; domain="+u:"")+(a?"; secure":""):""):decodeURIComponent((("; "+document.cookie).split("; "+e+"=")[1]||"").split(";")[0])}}

var r$1="localStorage",g$1=b.bind(null,"localStorage"),c$2=u("localStorage","getItem",a$1),m$2=u("localStorage","setItem",f),S$1=u("localStorage","removeItem",i$1);

var a$3="sessionStorage",i$3=b.bind(null,"sessionStorage"),g$2=u("sessionStorage","getItem",a$1),n$2=u("sessionStorage","setItem",f),l$1=u("sessionStorage","removeItem",i$1);

function I$2(t){var o=t;try{if("true"===(o=JSON.parse(t)))return !0;if("false"===o)return !1;if(on$1(o))return o;parseFloat(o)===o&&(o=parseFloat(o));}catch(t){}if(null!==o&&""!==o)return o}var k$1=g$1(),O$1=i$3(),x$1=a$2();function C$1(o,e){if(o){var r$1=A$1(e),a=!N$1(r$1),i=d$1(r$1)?I$2(localStorage.getItem(o)):void 0;if(a&&!I(i))return i;var n=h(r$1)?I$2(r(o)):void 0;if(a&&n)return n;var l=E$1(r$1)?I$2(sessionStorage.getItem(o)):void 0;if(a&&l)return l;var u=a$1(o);return a?u:{localStorage:i,sessionStorage:l,cookie:n,global:u}}}function L$1(r$2,a,l$1){if(r$2&&!I(a)){var u={},g=A$1(l$1),m=JSON.stringify(a),S=!N$1(g);return d$1(g)&&(u[r$1]=F$2(r$1,a,I$2(localStorage.getItem(r$2))),localStorage.setItem(r$2,m),S)?u[r$1]:h(g)&&(u[t]=F$2(t,a,I$2(r(r$2))),c$1(r$2,m),S)?u[t]:E$1(g)&&(u[a$3]=F$2(a$3,a,I$2(sessionStorage.getItem(r$2))),sessionStorage.setItem(r$2,m),S)?u[a$3]:(u[l]=F$2(l,a,a$1(r$2)),f(r$2,a),S?u[l]:u)}}function b$2(t$1,e){if(t$1){var a=A$1(e),s=C$1(t$1,m),n={};return !I(s.localStorage)&&d$1(a)&&(localStorage.removeItem(t$1),n[r$1]=s.localStorage),!I(s.cookie)&&h(a)&&(u$1(t$1),n[t]=s.cookie),!I(s.sessionStorage)&&E$1(a)&&(sessionStorage.removeItem(t$1),n[a$3]=s.sessionStorage),!I(s.global)&&G$2(a,l)&&(i$1(t$1),n[l]=s.global),n}}function A$1(t){return t?q(t)?t:t.storage:g}function d$1(t){return k$1&&G$2(t,r$1)}function h(t$1){return x$1&&G$2(t$1,t)}function E$1(t){return O$1&&G$2(t,a$3)}function N$1(t){return t===m||"all"===t}function G$2(t,o){return t===g||t===o||N$1(t)}function F$2(t,o,e){return {location:t,current:o,previous:e}}var J$2={setItem:L$1,getItem:C$1,removeItem:b$2};

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
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function analyticsLib() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultSettings = {
    storage: J$2
  };
  return Ve(_objectSpread2(_objectSpread2({}, defaultSettings), opts));
}

export default analyticsLib;

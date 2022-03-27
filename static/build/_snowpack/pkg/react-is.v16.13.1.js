function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}var AsyncMode=l;var ConcurrentMode=m;var ContextConsumer=k;var ContextProvider=h;var Element=c;var ForwardRef=n;var Fragment=e;var Lazy=t;var Memo=r;var Portal=d;
var Profiler=g;var StrictMode=f;var Suspense=p;var isAsyncMode=function(a){return A(a)||z(a)===l};var isConcurrentMode=A;var isContextConsumer=function(a){return z(a)===k};var isContextProvider=function(a){return z(a)===h};var isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};var isForwardRef=function(a){return z(a)===n};var isFragment=function(a){return z(a)===e};var isLazy=function(a){return z(a)===t};
var isMemo=function(a){return z(a)===r};var isPortal=function(a){return z(a)===d};var isProfiler=function(a){return z(a)===g};var isStrictMode=function(a){return z(a)===f};var isSuspense=function(a){return z(a)===p};
var isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};var typeOf=z;

var reactIs_production_min = {
	AsyncMode: AsyncMode,
	ConcurrentMode: ConcurrentMode,
	ContextConsumer: ContextConsumer,
	ContextProvider: ContextProvider,
	Element: Element,
	ForwardRef: ForwardRef,
	Fragment: Fragment,
	Lazy: Lazy,
	Memo: Memo,
	Portal: Portal,
	Profiler: Profiler,
	StrictMode: StrictMode,
	Suspense: Suspense,
	isAsyncMode: isAsyncMode,
	isConcurrentMode: isConcurrentMode,
	isContextConsumer: isContextConsumer,
	isContextProvider: isContextProvider,
	isElement: isElement,
	isForwardRef: isForwardRef,
	isFragment: isFragment,
	isLazy: isLazy,
	isMemo: isMemo,
	isPortal: isPortal,
	isProfiler: isProfiler,
	isStrictMode: isStrictMode,
	isSuspense: isSuspense,
	isValidElementType: isValidElementType,
	typeOf: typeOf
};

var reactIs = createCommonjsModule(function (module) {

{
  module.exports = reactIs_production_min;
}
});

var AsyncMode$1 = reactIs.AsyncMode;
var ConcurrentMode$1 = reactIs.ConcurrentMode;
var ContextConsumer$1 = reactIs.ContextConsumer;
var ContextProvider$1 = reactIs.ContextProvider;
var Element$1 = reactIs.Element;
var ForwardRef$1 = reactIs.ForwardRef;
var Fragment$1 = reactIs.Fragment;
var Lazy$1 = reactIs.Lazy;
var Memo$1 = reactIs.Memo;
var Portal$1 = reactIs.Portal;
var Profiler$1 = reactIs.Profiler;
var StrictMode$1 = reactIs.StrictMode;
var Suspense$1 = reactIs.Suspense;
export default reactIs;
var isAsyncMode$1 = reactIs.isAsyncMode;
var isConcurrentMode$1 = reactIs.isConcurrentMode;
var isContextConsumer$1 = reactIs.isContextConsumer;
var isContextProvider$1 = reactIs.isContextProvider;
var isElement$1 = reactIs.isElement;
var isForwardRef$1 = reactIs.isForwardRef;
var isFragment$1 = reactIs.isFragment;
var isLazy$1 = reactIs.isLazy;
var isMemo$1 = reactIs.isMemo;
var isPortal$1 = reactIs.isPortal;
var isProfiler$1 = reactIs.isProfiler;
var isStrictMode$1 = reactIs.isStrictMode;
var isSuspense$1 = reactIs.isSuspense;
var isValidElementType$1 = reactIs.isValidElementType;
var typeOf$1 = reactIs.typeOf;
export { AsyncMode$1 as AsyncMode, ConcurrentMode$1 as ConcurrentMode, ContextConsumer$1 as ContextConsumer, ContextProvider$1 as ContextProvider, Element$1 as Element, ForwardRef$1 as ForwardRef, Fragment$1 as Fragment, Lazy$1 as Lazy, Memo$1 as Memo, Portal$1 as Portal, Profiler$1 as Profiler, StrictMode$1 as StrictMode, Suspense$1 as Suspense, reactIs as __moduleExports, isAsyncMode$1 as isAsyncMode, isConcurrentMode$1 as isConcurrentMode, isContextConsumer$1 as isContextConsumer, isContextProvider$1 as isContextProvider, isElement$1 as isElement, isForwardRef$1 as isForwardRef, isFragment$1 as isFragment, isLazy$1 as isLazy, isMemo$1 as isMemo, isPortal$1 as isPortal, isProfiler$1 as isProfiler, isStrictMode$1 as isStrictMode, isSuspense$1 as isSuspense, isValidElementType$1 as isValidElementType, typeOf$1 as typeOf };

import { c as createCommonjsModule } from '../common/_commonjsHelpers-668e6127.js';

/** @license React v0.20.2
 * scheduler-tracing.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=0;var __interactionsRef=null;var __subscriberRef=null;var unstable_clear=function(a){return a()};var unstable_getCurrent=function(){return null};var unstable_getThreadID=function(){return ++b};var unstable_subscribe=function(){};var unstable_trace=function(a,d,c){return c()};var unstable_unsubscribe=function(){};var unstable_wrap=function(a){return a};

var schedulerTracing_production_min = {
	__interactionsRef: __interactionsRef,
	__subscriberRef: __subscriberRef,
	unstable_clear: unstable_clear,
	unstable_getCurrent: unstable_getCurrent,
	unstable_getThreadID: unstable_getThreadID,
	unstable_subscribe: unstable_subscribe,
	unstable_trace: unstable_trace,
	unstable_unsubscribe: unstable_unsubscribe,
	unstable_wrap: unstable_wrap
};

var tracing = createCommonjsModule(function (module) {

{
  module.exports = schedulerTracing_production_min;
}
});

var __interactionsRef$1 = tracing.__interactionsRef;
var __subscriberRef$1 = tracing.__subscriberRef;
export default tracing;
var unstable_clear$1 = tracing.unstable_clear;
var unstable_getCurrent$1 = tracing.unstable_getCurrent;
var unstable_getThreadID$1 = tracing.unstable_getThreadID;
var unstable_subscribe$1 = tracing.unstable_subscribe;
var unstable_trace$1 = tracing.unstable_trace;
var unstable_unsubscribe$1 = tracing.unstable_unsubscribe;
var unstable_wrap$1 = tracing.unstable_wrap;
export { __interactionsRef$1 as __interactionsRef, tracing as __moduleExports, __subscriberRef$1 as __subscriberRef, unstable_clear$1 as unstable_clear, unstable_getCurrent$1 as unstable_getCurrent, unstable_getThreadID$1 as unstable_getThreadID, unstable_subscribe$1 as unstable_subscribe, unstable_trace$1 as unstable_trace, unstable_unsubscribe$1 as unstable_unsubscribe, unstable_wrap$1 as unstable_wrap };

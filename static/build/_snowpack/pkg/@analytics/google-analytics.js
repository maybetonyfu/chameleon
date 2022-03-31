// googleAnalytics events from a node server environment.

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

/* global ga */
var defaultConfig = {
  /* See description below */
  trackingId: null,

  /* See description below */
  debug: false,

  /* See description below */
  anonymizeIp: false,

  /* See description below */
  customDimensions: {},

  /* See description below */
  resetCustomDimensionsOnPage: [],

  /* See description below */
  setCustomDimensionsToPage: true
  /* Custom metrics https://bit.ly/3c5de88 */
  // TODO customMetrics: { key: 'metric1' }

  /* Content groupings https://bit.ly/39Zt3Me */
  // TODO contentGroupings: { key: 'contentGroup1' }

};
var loadedInstances = {};
/**
 * Google analytics plugin
 * @link https://getanalytics.io/plugins/google-analytics/
 * @link https://analytics.google.com/analytics/web/
 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs
 * @param {object}  pluginConfig - Plugin settings
 * @param {string}  pluginConfig.trackingId - Google Analytics site tracking Id
 * @param {boolean} [pluginConfig.debug] - Enable Google Analytics debug mode
 * @param {boolean} [pluginConfig.anonymizeIp] - Enable [Anonymizing IP addresses](https://bit.ly/3c660Rd) sent to Google Analytics. [See details below](#anonymize-visitor-ips)
 * @param {object}  [pluginConfig.customDimensions] - Map [Custom dimensions](https://bit.ly/3c5de88) to send extra information to Google Analytics. [See details below](#using-ga-custom-dimensions)
 * @param {object}  [pluginConfig.resetCustomDimensionsOnPage] - Reset custom dimensions by key on analytics.page() calls. Useful for single page apps.
 * @param {boolean} [pluginConfig.setCustomDimensionsToPage] - Mapped dimensions will be set to the page & sent as properties of all subsequent events on that page. If false, analytics will only pass custom dimensions as part of individual events
 * @param {string}  [pluginConfig.instanceName] - Custom tracker name for google analytics. Use this if you need multiple googleAnalytics scripts loaded
 * @param {string}  [pluginConfig.customScriptSrc] - Custom URL for google analytics script, if proxying calls
 * @param {object}  [pluginConfig.cookieConfig] - Additional cookie properties for configuring the [ga cookie](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id#configuring_cookie_field_settings)
 * @param {object}  [pluginConfig.tasks] - [Set custom google analytic tasks](https://developers.google.com/analytics/devguides/collection/analyticsjs/tasks)
 * @return {*}
 * @example
 *
 * googleAnalytics({
 *   trackingId: 'UA-1234567'
 * })
 */

function googleAnalytics$1() {
  var pluginConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pageCalledOnce = false; // Allow for multiple google analytics instances

  var _getInstanceDetails = getInstanceDetails(pluginConfig),
      instanceName = _getInstanceDetails.instanceName,
      instancePrefix = _getInstanceDetails.instancePrefix;

  return {
    name: 'google-analytics',
    config: _objectSpread({}, defaultConfig, pluginConfig),
    // Load google analytics
    initialize: function initialize(pluginApi) {
      var config = pluginApi.config,
          instance = pluginApi.instance;
      if (!config.trackingId) throw new Error('No GA trackingId defined');
      var customDimensions = config.customDimensions,
          customScriptSrc = config.customScriptSrc; // var to hoist

      var scriptSrc = customScriptSrc || 'https://www.google-analytics.com/analytics.js'; // Load google analytics script to page

      if (gaNotLoaded(scriptSrc)) {
        /* eslint-disable */
        (function (i, s, o, g, r, a, m) {
          i['GoogleAnalyticsObject'] = r;
          i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
          }, i[r].l = 1 * new Date();
          a = s.createElement(o), m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m);
        })(window, document, 'script', scriptSrc, 'ga');
        /* eslint-enable */

      } // Initialize tracker instance on page


      if (!loadedInstances[instanceName]) {
        var gaConfig = _objectSpread({
          cookieDomain: config.domain || 'auto',
          siteSpeedSampleRate: config.siteSpeedSampleRate || 1,
          sampleRate: config.sampleRate || 100,
          allowLinker: true
        }, config.cookieConfig);

        if (instanceName) {
          gaConfig.name = instanceName;
        }

        ga('create', config.trackingId, gaConfig);

        if (config.debug) {
          // Disable sends to GA http://bit.ly/2Ro0vTR
          ga("".concat(instancePrefix, "set"), 'sendHitTask', null);
          window.ga_debug = {
            trace: true
          };
        }

        if (config.anonymizeIp) {
          ga("".concat(instancePrefix, "set"), 'anonymizeIp', true);
        }

        if (config.tasks) {
          var taskList = ['customTask', 'previewTask', 'checkProtocolTask', 'validationTask', 'checkStorageTask', 'historyImportTask', 'samplerTask', 'buildHitTask', 'sendHitTask', 'timingTask', 'displayFeaturesTask'];
          taskList.forEach(function (taskName) {
            if (config.tasks.hasOwnProperty(taskName)) {
              var task = config.tasks[taskName];

              if (typeof task === 'function') {
                ga(config.tasks[taskName]);
              } else if (task === null) {
                ga("".concat(instancePrefix, "set"), taskName, task);
              }
            }
          });
        }
        /* set custom dimensions from user traits */


        var user = instance.user() || {};
        var traits = user.traits || {};

        if (Object.keys(traits).length && customDimensions && Object.keys(customDimensions).length) {
          var dimensions = formatObjectIntoDimensions$1(traits, config);
          ga("".concat(instancePrefix, "set"), dimensions);
        }

        loadedInstances[instanceName] = true;
      }
    },
    // Google Analytics page view
    page: function page(_ref) {
      var payload = _ref.payload,
          config = _ref.config,
          instance = _ref.instance;
      var properties = payload.properties;
      var resetCustomDimensionsOnPage = config.resetCustomDimensionsOnPage,
          customDimensions = config.customDimensions;
      var campaign = instance.getState('context.campaign');
      if (gaNotLoaded()) return;
      /* If dimensions are specifiied to reset, clear them before page view */

      if (resetCustomDimensionsOnPage && resetCustomDimensionsOnPage.length) {
        var resetDimensions = resetCustomDimensionsOnPage.reduce(function (acc, key) {
          if (customDimensions[key]) {
            acc[customDimensions[key]] = null; // { dimension1: null } etc
          }

          return acc;
        }, {});

        if (Object.keys(resetDimensions).length) {
          // Reset custom dimensions
          ga("".concat(instancePrefix, "set"), resetDimensions);
        }
      }

      var path = properties.path || document.location.pathname;
      var pageView = {
        page: path,
        title: properties.title,
        location: properties.url
      };
      var pageData = {
        page: path,
        title: properties.title // allow referrer override if referrer was manually set

      };

      if (properties.referrer !== document.referrer) {
        pageData.referrer = properties.referrer;
      }

      var campaignData = addCampaignData(campaign);
      var dimensions = setCustomDimensions(properties, config, instancePrefix);
      /* Dimensions will only be included in the event if config.setCustomDimensionsToPage is false */

      var finalPayload = _objectSpread({}, pageView, campaignData, dimensions);

      ga("".concat(instancePrefix, "set"), pageData); // Remove location for SPA tracking after initial page view

      if (pageCalledOnce) {
        delete finalPayload.location;
      }
      /* send page view to GA */


      ga("".concat(instancePrefix, "send"), 'pageview', finalPayload); // Set after initial page view

      pageCalledOnce = true;
    },

    /**
     * Google Analytics track event
     * @example
     *
     * analytics.track('playedVideo', {
     *   category: 'Videos',
     *   label: 'Fall Campaign',
     *   value: 42
     * })
     */
    track: function track(_ref2) {
      var payload = _ref2.payload,
          config = _ref2.config,
          instance = _ref2.instance;
      var properties = payload.properties,
          event = payload.event;
      var label = properties.label,
          value = properties.value,
          category = properties.category,
          nonInteraction = properties.nonInteraction;
      var campaign = instance.getState('context.campaign'); // TODO inline this trackEvent

      trackEvent$1({
        hitType: 'event',
        event: event,
        label: label,
        category: category || 'All',
        value: value,
        nonInteraction: nonInteraction,
        campaign: campaign
      }, config, payload);
    },
    identify: function identify(_ref3) {
      var payload = _ref3.payload,
          config = _ref3.config;
      identifyVisitor$1(payload.userId, payload.traits, config);
    },
    loaded: function loaded() {
      return !!window.gaplugins;
    }
  };
}

function gaNotLoaded(scriptSrc) {
  if (scriptSrc) {
    return !scriptLoaded(scriptSrc);
  }

  return typeof ga === 'undefined';
}

function getInstanceDetails(pluginConfig) {
  var instanceName = pluginConfig.instanceName;
  return {
    instancePrefix: instanceName ? "".concat(instanceName, ".") : '',
    instanceName: instanceName
  };
}
/**
 * Send event tracking to Google Analytics
 * @param  {object} eventData - GA event payload
 * @param  {string} [eventData.hitType = 'event'] - hitType https://bit.ly/2Jab9L1 one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'
 * @param  {string} [eventData.event] - event Action https://bit.ly/2CUzeoz
 * @param  {string} [eventData.label] - event Label http://bit.ly/2oo8eb3
 * @param  {string} [eventData.category] - event Category http://bit.ly/2EAy9UP
 * @param  {string} [eventData.nonInteraction = false] - nonInteraction https://bit.ly/2CUzeoz
 * @return {object} sent data
 */


function trackEvent$1(eventData) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var payload = arguments.length > 2 ? arguments[2] : undefined;
  if (gaNotLoaded()) return;

  var _getInstanceDetails2 = getInstanceDetails(opts),
      instancePrefix = _getInstanceDetails2.instancePrefix;

  var data = {
    // hitType https://bit.ly/2Jab9L1 one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'
    hitType: eventData.hitType || 'event',
    // eventAction https://bit.ly/2CUzeoz
    eventAction: eventData.event,
    // eventLabel http://bit.ly/2oo8eb3
    eventLabel: eventData.label,
    // eventCategory http://bit.ly/2EAy9UP
    eventCategory: eventData.category || 'All',
    // nonInteraction https://bit.ly/2CUzeoz
    nonInteraction: eventData.nonInteraction !== undefined ? !!eventData.nonInteraction : false
  };

  if (eventData.value) {
    // how much is this action worth?
    data.eventValue = format(eventData.value);
  }
  /* Attach campaign data */


  var campaignData = addCampaignData(eventData);
  /* Set Dimensions or return them for payload is config.setCustomDimensionsToPage is false */

  var dimensions = setCustomDimensions(payload.properties, opts, instancePrefix);

  var finalPayload = _objectSpread({}, data, campaignData, dimensions);
  /* Send data to Google Analytics */


  ga("".concat(instancePrefix, "send"), 'event', finalPayload);
  return finalPayload;
}
/**
 * Add campaign data to GA payload https://bit.ly/34qFCPn
 * @param {Object} [campaignData={}] [description]
 * @param {String} [campaignData.campaignName] - Name of campaign
 * @param {String} [campaignData.campaignSource] - Source of campaign
 * @param {String} [campaignData.campaignMedium] - Medium of campaign
 * @param {String} [campaignData.campaignContent] - Content of campaign
 * @param {String} [campaignData.campaignKeyword] - Keyword of campaign
 */

function addCampaignData() {
  var campaignData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var campaign = {};
  var name = campaignData.name,
      source = campaignData.source,
      medium = campaignData.medium,
      content = campaignData.content,
      keyword = campaignData.keyword;
  if (name) campaign.campaignName = name;
  if (source) campaign.campaignSource = source;
  if (medium) campaign.campaignMedium = medium;
  if (content) campaign.campaignContent = content;
  if (keyword) campaign.campaignKeyword = keyword;
  return campaign;
}
/* Todo add includeSearch options ¯\_(ツ)_/¯
function getPagePath(props, opts = {}) {
  if (!props) return
  if (opts.includeSearch && props.search) {
    return `${props.path}${props.search}`
  }
  return props.path
}
*/
// properties, data=opts


function formatObjectIntoDimensions$1(properties) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var customDimensions = opts.customDimensions; // TODO map opts.customMetrics; Object.keys(customMetrics) { key: 'metric1' }
  // TODO map opts.contentGroupings; Object.keys(contentGroupings) { key: 'contentGroup1' }

  /* Map values from payload to any defined custom dimensions */

  return Object.keys(customDimensions).reduce(function (acc, key) {
    var dimensionKey = customDimensions[key];
    var value = get$1(properties, key) || properties[key];

    if (typeof value === 'boolean') {
      value = value.toString();
    }

    if (value || value === 0) {
      acc[dimensionKey] = value;
      return acc;
    }

    return acc;
  }, {});
}

function get$1(obj, key, def, p, undef) {
  key = key.split ? key.split('.') : key;

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }

  return obj === undef ? def : obj;
}

function setCustomDimensions() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opts = arguments.length > 1 ? arguments[1] : undefined;
  var instancePrefix = arguments.length > 2 ? arguments[2] : undefined;
  var customDimensions = formatObjectIntoDimensions$1(props, opts);

  if (!Object.keys(customDimensions).length) {
    return {};
  } // If setCustomDimensionsToPage false, don't save custom dimensions from event to page


  if (!opts.setCustomDimensionsToPage) {
    return customDimensions;
  } // Set custom dimensions


  ga("".concat(instancePrefix, "set"), customDimensions);
  return {};
}
/**
 * Identify a visitor by Id
 * @param  {string} id - unique visitor ID
 */


function identifyVisitor$1(id) {
  var traits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var conf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (gaNotLoaded()) return;

  var _getInstanceDetails3 = getInstanceDetails(conf),
      instancePrefix = _getInstanceDetails3.instancePrefix;

  if (id) ga("".concat(instancePrefix, "set"), 'userId', id);

  if (Object.keys(traits).length) {
    var custom = formatObjectIntoDimensions$1(traits, conf);
    ga("".concat(instancePrefix, "set"), custom);
  }
}

function scriptLoaded(scriptSrc) {
  var scripts = document.querySelectorAll('script[src]');
  return !!Object.keys(scripts).filter(function (key) {
    return (scripts[key].src || '') === scriptSrc;
  }).length;
}

function format(value) {
  if (!value || value < 0) return 0;
  return Math.round(value);
}

/* This module will shake out unused code + work in browser and node 🎉 */

var index = googleAnalytics$1;

export default index;

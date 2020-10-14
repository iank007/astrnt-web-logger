(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("astrnt-web-logger", [], factory);
	else if(typeof exports === 'object')
		exports["astrnt-web-logger"] = factory();
	else
		root["astrnt-web-logger"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: initialize, recordEvent, sendSavedEvents, clearCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recordEvent", function() { return recordEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendSavedEvents", function() { return sendSavedEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearCache", function() { return clearCache; });
/* harmony import */ var utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/astrnt-http-handler */ "./src/utils/astrnt-http-handler.js");
/* harmony import */ var utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/navigator-helper */ "./src/utils/navigator-helper.js");
/* harmony import */ var utils_date_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/date-utils */ "./src/utils/date-utils.js");



var logEnv = 'ASTRNT_LOG_ENV';
var logBaseInfo = 'ASTRNT_BASE_LOG_INFO';
var logInfos = 'ASTRNT_LOG_INFOS';
var storageKeys = [logEnv, logBaseInfo, logInfos];

var getEnv = function getEnv() {
  var env = localStorage.getItem(logEnv);
  return env;
};

var getBaseInfo = function getBaseInfo() {
  var info = localStorage.getItem(logBaseInfo);
  return JSON.parse(info);
};

var constructURL = function constructURL() {
  var env = getEnv();
  var domainPrefix;
  var baseURL = env;
  console.log(env);

  switch (env) {
    case 'beta':
    case 'dev':
      domainPrefix = 'log-beta';
      break;

    case 'production':
    case 'live':
      domainPrefix = 'app';
      break;
  }

  if (domainPrefix) {
    baseURL = "https://".concat(domainPrefix, ".astrnt.co");
  }

  return "".concat(baseURL, "/api/v2/candidate/logs");
};

var constructInterviewInfo = function constructInterviewInfo(params) {
  var device = Object(utils_navigator_helper__WEBPACK_IMPORTED_MODULE_1__["deviceInfo"])();
  var timeZone = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getTimezone"]();
  var logTime = utils_date_utils__WEBPACK_IMPORTED_MODULE_2__["getCurrentDateTime"]();
  var ua = navigator.userAgent;
  var os = "".concat(device.os, " (").concat(device.osVersion, ")");
  var version = "".concat(device.browser, ", Version ").concat(device.browserVersion, " (").concat(device.browserMajorVersion, ")");
  var recordedParam = getBaseInfo();
  recordedParam.event = params.event || '';
  recordedParam.message = params.message || '';
  recordedParam.os = os;
  recordedParam.version = version;
  recordedParam.imei = ua;
  recordedParam.log_time = logTime;
  recordedParam.time_zone = timeZone;
  return recordedParam;
};

var sendEvent = function sendEvent(params) {
  var URL = constructURL();
  var logInfo = constructInterviewInfo(params);
  var requestParams = {
    logs: [logInfo]
  };
  return Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams);
};

var storeEvent = function storeEvent(params) {
  var logItems = localStorage.getItem(logInfos);
  var storedLogs;

  if (!logItems) {
    storedLogs = [];
  } else {
    storedLogs = JSON.parse(logItems);
    localStorage.removeItem(logInfos);
  }

  var interviewInfo = constructInterviewInfo(params);
  storedLogs.push(interviewInfo);
  localStorage.setItem(logInfos, JSON.stringify(storedLogs));
  return Promise.resolve(interviewInfo);
};

function initialize(env, params) {
  var onError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var onUnhandledRejection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var baseParam = {
    'interviewCode': params.interview_code || '',
    'candidate_id': params.candidate_id || 0,
    'job_id': params.job_id || 0,
    'company_id': params.company_id || 0
  };
  localStorage.setItem(logEnv, env);
  localStorage.setItem(logBaseInfo, JSON.stringify(baseParam));
  window.addEventListener('error', function (errEvt) {
    onError(errEvt.error);
    return false;
  });
  window.addEventListener('unhandledrejection', function (errEvt) {
    onUnhandledRejection(errEvt.reason);
  });
}
function recordEvent(params) {
  switch (params.status) {
    case 'online':
      return sendEvent(params);

    case 'offline':
      return storeEvent(params);
  }

  return Promise.resolve('No event to send');
}
function sendSavedEvents() {
  var logItems = localStorage.getItem(logInfos);

  if (!logItems) {
    return Promise.resolve();
  }

  var URL = constructURL();
  var requestParams = {
    logs: JSON.parse(logItems)
  };
  return new Promise(function (resolve, reject) {
    Object(utils_astrnt_http_handler__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', URL, requestParams).then(function (result) {
      localStorage.removeItem(logInfos);
      resolve(result);
    }).catch(function (error) {
      return reject(error);
    });
  });
}
function clearCache() {
  storageKeys.forEach(function (key) {
    localStorage.removeItem(key);
  });
}

/***/ }),

/***/ "./src/utils/astrnt-http-handler.js":
/*!******************************************!*\
  !*** ./src/utils/astrnt-http-handler.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (method, url, params) {
  var mimeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'application/json';
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');

    if (mimeType && request.overrideMimeType) {
      request.overrideMimeType(mimeType);
    }

    request.addEventListener('load', function (evt) {
      var target = evt.target;
      var response = JSON.parse(target.responseText);
      var responseCode = response.status || request.status;

      if (responseCode >= 200 && responseCode < 300) {
        resolve(response.message || response);
      } else {
        reject(response.message || response);
      }
    });
    var requestParams = JSON.stringify(params);
    request.send(requestParams);
  });
});

/***/ }),

/***/ "./src/utils/date-utils.js":
/*!*********************************!*\
  !*** ./src/utils/date-utils.js ***!
  \*********************************/
/*! exports provided: getTimezone, getCurrentDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimezone", function() { return getTimezone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentDateTime", function() { return getCurrentDateTime; });
var getTimezone = function getTimezone() {
  var currentTime = new Date();
  var currentTimezone = currentTime.getTimezoneOffset();
  return currentTimezone / 60 * -1;
};
var getCurrentDateTime = function getCurrentDateTime() {
  var date = new Date();
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes(),
      second = d.getSeconds();

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  } // hour = hour % 12;
  // hour = hour ? hour : 12;


  minute = minute < 10 ? '0' + minute : minute;
  var result = "".concat([year, month, day].join('-'), " ").concat(hour, ":").concat(minute, ":").concat(second);
  return result;
};

/***/ }),

/***/ "./src/utils/navigator-helper.js":
/*!***************************************!*\
  !*** ./src/utils/navigator-helper.js ***!
  \***************************************/
/*! exports provided: deviceInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceInfo", function() { return deviceInfo; });
/**
 * source: https://stackoverflow.com/a/18706818/9938539
*/
var ua = navigator.userAgent;
var nVer = navigator.appVersion;
var cookieEnabled = navigator.cookieEnabled;

var getOSInfo = function getOSInfo() {
  var os = '-';
  var osVersion = '-';
  var clientStrings = [{
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/
  }, {
    s: 'Windows 2000',
    r: /(Windows NT 5.0|Windows 2000)/
  }, {
    s: 'Windows ME',
    r: /(Win 9x 4.90|Windows ME)/
  }, {
    s: 'Windows 98',
    r: /(Windows 98|Win98)/
  }, {
    s: 'Windows 95',
    r: /(Windows 95|Win95|Windows_95)/
  }, {
    s: 'Windows NT 4.0',
    r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
  }, {
    s: 'Windows CE',
    r: /Windows CE/
  }, {
    s: 'Windows 3.11',
    r: /Win16/
  }, {
    s: 'Android',
    r: /Android/
  }, {
    s: 'Open BSD',
    r: /OpenBSD/
  }, {
    s: 'Sun OS',
    r: /SunOS/
  }, {
    s: 'Linux',
    r: /(Linux|X11)/
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
  }, {
    s: 'QNX',
    r: /QNX/
  }, {
    s: 'UNIX',
    r: /UNIX/
  }, {
    s: 'BeOS',
    r: /BeOS/
  }, {
    s: 'OS/2',
    r: /OS\/2/
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }];

  for (var id in clientStrings) {
    var cs = clientStrings[id];

    if (cs.r.test(ua)) {
      os = cs.s;
      break;
    }
  }

  if (/Windows/.test(os)) {
    osVersion = /Windows (.*)/.exec(os)[1];
    os = 'Windows';
  }

  switch (os) {
    case 'Mac OS X':
      osVersion = /Mac OS X (10[\.\_\d]+)/.exec(ua)[1];
      break;

    case 'Android':
      osVersion = /Android ([\.\_\d]+)/.exec(ua)[1];
      break;

    case 'iOS':
      osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
      osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
      break;
  }

  return {
    name: os,
    version: osVersion
  };
};

var getBrowserInfo = function getBrowserInfo() {
  var majorVersion = parseInt(nVer, 10);
  var browser = navigator.appName;
  var version = '' + parseFloat(navigator.appVersion);
  var nameOffset, verOffset, ix;

  if ((verOffset = ua.indexOf('Opera')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 6);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('OPR')) !== -1) {
    browser = 'Opera';
    version = ua.substring(verOffset + 4);
  } else if ((verOffset = ua.indexOf('Edge')) !== -1) {
    browser = 'Microsoft Edge';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('MSIE')) !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(verOffset + 5);
  } else if ((verOffset = ua.indexOf('Chrome')) !== -1) {
    browser = 'Chrome';
    version = ua.substring(verOffset + 7);
  } else if ((verOffset = ua.indexOf('Safari')) !== -1) {
    browser = 'Safari';
    version = ua.substring(verOffset + 7);

    if ((verOffset = ua.indexOf('Version')) !== -1) {
      version = ua.substring(verOffset + 8);
    }
  } else if ((verOffset = ua.indexOf('Firefox')) !== -1) {
    browser = 'Firefox';
    version = ua.substring(verOffset + 8);
  } else if (ua.indexOf('Trident/') !== -1) {
    browser = 'Microsoft Internet Explorer';
    version = ua.substring(ua.indexOf('rv:') + 3);
  } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
    browser = ua.substring(nameOffset, verOffset);
    version = ua.substring(verOffset + 1);

    if (browser.toLowerCase() === browser.toUpperCase()) {
      browser = navigator.appName;
    }
  }

  if ((ix = version.indexOf('')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(' ')) !== -1) {
    version = version.substring(0, ix);
  }

  if ((ix = version.indexOf(')')) !== -1) {
    version = version.substring(0, ix);
  }

  majorVersion = parseInt('' + version, 10);

  if (isNaN(majorVersion)) {
    version = '' + parseFloat(nVer);
    majorVersion = parseInt(nVer, 10);
  }

  return {
    name: browser || '',
    version: version || '',
    majorVersion: majorVersion || ''
  };
};

var getScreenSize = function getScreenSize() {
  if (!screen.width) {
    return undefined;
  }

  var width = screen.width ? screen.width : '';
  var height = screen.height ? screen.height : '';
  return '' + width + ' x ' + height;
};

var isCookieEnabled = function isCookieEnabled() {
  if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
    document.cookie = 'testcookie';
    return document.cookie.indexOf('testcookie') !== -1;
  }

  return false;
};

function deviceInfo() {
  var os = getOSInfo();
  var browser = getBrowserInfo();
  var screenSize = getScreenSize();
  var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
  return {
    screen: screenSize,
    browser: browser.name,
    browserVersion: browser.version,
    browserMajorVersion: browser.majorVersion,
    mobile: mobile,
    os: os.name,
    osVersion: os.version,
    cookies: isCookieEnabled
  };
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYXN0cm50LXdlYi1sb2dnZXIvLi9zcmMvdXRpbHMvYXN0cm50LWh0dHAtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9hc3RybnQtd2ViLWxvZ2dlci8uL3NyYy91dGlscy9kYXRlLXV0aWxzLmpzIiwid2VicGFjazovL2FzdHJudC13ZWItbG9nZ2VyLy4vc3JjL3V0aWxzL25hdmlnYXRvci1oZWxwZXIuanMiXSwibmFtZXMiOlsibG9nRW52IiwibG9nQmFzZUluZm8iLCJsb2dJbmZvcyIsInN0b3JhZ2VLZXlzIiwiZ2V0RW52IiwiZW52IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldEJhc2VJbmZvIiwiaW5mbyIsIkpTT04iLCJwYXJzZSIsImNvbnN0cnVjdFVSTCIsImRvbWFpblByZWZpeCIsImJhc2VVUkwiLCJjb25zb2xlIiwibG9nIiwiY29uc3RydWN0SW50ZXJ2aWV3SW5mbyIsInBhcmFtcyIsImRldmljZSIsImRldmljZUluZm8iLCJ0aW1lWm9uZSIsIkRhdGVVdGlscyIsImxvZ1RpbWUiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm9zIiwib3NWZXJzaW9uIiwidmVyc2lvbiIsImJyb3dzZXIiLCJicm93c2VyVmVyc2lvbiIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJyZWNvcmRlZFBhcmFtIiwiZXZlbnQiLCJtZXNzYWdlIiwiaW1laSIsImxvZ190aW1lIiwidGltZV96b25lIiwic2VuZEV2ZW50IiwiVVJMIiwibG9nSW5mbyIsInJlcXVlc3RQYXJhbXMiLCJsb2dzIiwiaHR0cEhhbmRsZXIiLCJzdG9yZUV2ZW50IiwibG9nSXRlbXMiLCJzdG9yZWRMb2dzIiwicmVtb3ZlSXRlbSIsImludGVydmlld0luZm8iLCJwdXNoIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIlByb21pc2UiLCJyZXNvbHZlIiwiaW5pdGlhbGl6ZSIsIm9uRXJyb3IiLCJvblVuaGFuZGxlZFJlamVjdGlvbiIsImJhc2VQYXJhbSIsImludGVydmlld19jb2RlIiwiY2FuZGlkYXRlX2lkIiwiam9iX2lkIiwiY29tcGFueV9pZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnJFdnQiLCJlcnJvciIsInJlYXNvbiIsInJlY29yZEV2ZW50Iiwic3RhdHVzIiwic2VuZFNhdmVkRXZlbnRzIiwicmVqZWN0IiwidGhlbiIsInJlc3VsdCIsImNhdGNoIiwiY2xlYXJDYWNoZSIsImZvckVhY2giLCJrZXkiLCJtZXRob2QiLCJ1cmwiLCJtaW1lVHlwZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwib3ZlcnJpZGVNaW1lVHlwZSIsImV2dCIsInRhcmdldCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwicmVzcG9uc2VDb2RlIiwic2VuZCIsImdldFRpbWV6b25lIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiY3VycmVudFRpbWV6b25lIiwiZ2V0VGltZXpvbmVPZmZzZXQiLCJnZXRDdXJyZW50RGF0ZVRpbWUiLCJkYXRlIiwiZCIsIm1vbnRoIiwiZ2V0TW9udGgiLCJkYXkiLCJnZXREYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwiaG91ciIsImdldEhvdXJzIiwibWludXRlIiwiZ2V0TWludXRlcyIsInNlY29uZCIsImdldFNlY29uZHMiLCJsZW5ndGgiLCJqb2luIiwiblZlciIsImFwcFZlcnNpb24iLCJjb29raWVFbmFibGVkIiwiZ2V0T1NJbmZvIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiaWQiLCJjcyIsInRlc3QiLCJleGVjIiwibmFtZSIsImdldEJyb3dzZXJJbmZvIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJhcHBOYW1lIiwicGFyc2VGbG9hdCIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsImluZGV4T2YiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJpc05hTiIsImdldFNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsInVuZGVmaW5lZCIsImhlaWdodCIsImlzQ29va2llRW5hYmxlZCIsImRvY3VtZW50IiwiY29va2llIiwic2NyZWVuU2l6ZSIsIm1vYmlsZSIsImNvb2tpZXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxNQUFNLEdBQUcsZ0JB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TUFBTSxDQUFDRyxNQUF6QixHQUFrQyxFQUFqRDtBQUVBLFNBQU8sS0FBS0YsS0FBTCxHQUFhLEtBQWIsR0FBcUJFLE1BQTVCO0FBQ0QsQ0FURDs7QUFXQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLEdBQU07QUFDNUIsTUFBSSxPQUFPeEgsU0FBUyxDQUFDMkYsYUFBakIsS0FBbUMsV0FBbkMsSUFBa0QsQ0FBQ0EsYUFBdkQsRUFBc0U7QUFDcEU4QixZQUFRLENBQUNDLE1BQVQsR0FBa0IsWUFBbEI7QUFDQSxXQUFPRCxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JiLE9BQWhCLENBQXdCLFlBQXhCLE1BQTBDLENBQUMsQ0FBbEQ7QUFDRDs7QUFFRCxTQUFPLEtBQVA7QUFDRCxDQVBEOztBQVNPLFNBQVNsSCxVQUFULEdBQXNCO0FBQzNCLE1BQU1PLEVBQUUsR0FBRzBGLFNBQVMsRUFBcEI7QUFDQSxNQUFNdkYsT0FBTyxHQUFHZ0csY0FBYyxFQUE5QjtBQUNBLE1BQU1zQixVQUFVLEdBQUdSLGFBQWEsRUFBaEM7QUFDQSxNQUFNUyxNQUFNLEdBQUcsNENBQTRDMUIsSUFBNUMsQ0FBaURULElBQWpELENBQWY7QUFFQSxTQUFPO0FBQ0wyQixVQUFNLEVBQUVPLFVBREg7QUFFTHRILFdBQU8sRUFBRUEsT0FBTyxDQUFDK0YsSUFGWjtBQUdMOUYsa0JBQWMsRUFBRUQsT0FBTyxDQUFDRCxPQUhuQjtBQUlMRyx1QkFBbUIsRUFBRUYsT0FBTyxDQUFDaUcsWUFKeEI7QUFLTHNCLFVBQU0sRUFBRUEsTUFMSDtBQU1MMUgsTUFBRSxFQUFFQSxFQUFFLENBQUNrRyxJQU5GO0FBT0xqRyxhQUFTLEVBQUVELEVBQUUsQ0FBQ0UsT0FQVDtBQVFMeUgsV0FBTyxFQUFFTDtBQVJKLEdBQVA7QUFVRCxDIiwiZmlsZSI6ImFzdHJudC13ZWItbG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhc3RybnQtd2ViLWxvZ2dlclwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhc3RybnQtd2ViLWxvZ2dlclwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBodHRwSGFuZGxlciBmcm9tICd1dGlscy9hc3RybnQtaHR0cC1oYW5kbGVyJ1xuaW1wb3J0IHsgZGV2aWNlSW5mbyB9IGZyb20gJ3V0aWxzL25hdmlnYXRvci1oZWxwZXInXG5pbXBvcnQgKiBhcyBEYXRlVXRpbHMgZnJvbSAndXRpbHMvZGF0ZS11dGlscydcblxuY29uc3QgbG9nRW52ID0gJ0FTVFJOVF9MT0dfRU5WJ1xuY29uc3QgbG9nQmFzZUluZm8gPSAnQVNUUk5UX0JBU0VfTE9HX0lORk8nXG5jb25zdCBsb2dJbmZvcyA9ICdBU1RSTlRfTE9HX0lORk9TJ1xuY29uc3Qgc3RvcmFnZUtleXMgPSBbXG4gIGxvZ0VudixcbiAgbG9nQmFzZUluZm8sXG4gIGxvZ0luZm9zXG5dXG5cbmNvbnN0IGdldEVudiA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nRW52KVxuICByZXR1cm4gZW52XG59XG5cbmNvbnN0IGdldEJhc2VJbmZvID0gKCkgPT4ge1xuICBjb25zdCBpbmZvID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obG9nQmFzZUluZm8pXG4gIHJldHVybiBKU09OLnBhcnNlKGluZm8pXG59XG5cbmNvbnN0IGNvbnN0cnVjdFVSTCA9ICgpID0+IHtcbiAgY29uc3QgZW52ID0gZ2V0RW52KClcbiAgbGV0IGRvbWFpblByZWZpeFxuICB2YXIgYmFzZVVSTCA9IGVudlxuICBjb25zb2xlLmxvZyhlbnYpXG4gIHN3aXRjaCAoZW52KSB7XG4gICAgY2FzZSAnYmV0YSc6IGNhc2UgJ2Rldic6XG4gICAgICBkb21haW5QcmVmaXggPSAnbG9nLWJldGEnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3Byb2R1Y3Rpb24nOiBjYXNlICdsaXZlJzpcbiAgICAgIGRvbWFpblByZWZpeCA9ICdhcHAnXG4gICAgICBicmVha1xuICB9XG4gIGlmIChkb21haW5QcmVmaXgpIHtcbiAgICBiYXNlVVJMID0gYGh0dHBzOi8vJHtkb21haW5QcmVmaXh9LmFzdHJudC5jb2BcbiAgfVxuICByZXR1cm4gYCR7YmFzZVVSTH0vYXBpL3YyL2NhbmRpZGF0ZS9sb2dzYFxufVxuXG5jb25zdCBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBkZXZpY2UgPSBkZXZpY2VJbmZvKClcbiAgY29uc3QgdGltZVpvbmUgPSBEYXRlVXRpbHMuZ2V0VGltZXpvbmUoKVxuICBjb25zdCBsb2dUaW1lID0gRGF0ZVV0aWxzLmdldEN1cnJlbnREYXRlVGltZSgpXG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICBjb25zdCBvcyA9IGAke2RldmljZS5vc30gKCR7ZGV2aWNlLm9zVmVyc2lvbn0pYFxuICBjb25zdCB2ZXJzaW9uID0gYCR7ZGV2aWNlLmJyb3dzZXJ9LCBWZXJzaW9uICR7ZGV2aWNlLmJyb3dzZXJWZXJzaW9ufSAoJHtkZXZpY2UuYnJvd3Nlck1ham9yVmVyc2lvbn0pYFxuXG4gIGxldCByZWNvcmRlZFBhcmFtID0gZ2V0QmFzZUluZm8oKVxuICByZWNvcmRlZFBhcmFtLmV2ZW50ID0gcGFyYW1zLmV2ZW50IHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ubWVzc2FnZSA9IHBhcmFtcy5tZXNzYWdlIHx8ICcnXG4gIHJlY29yZGVkUGFyYW0ub3MgPSBvc1xuICByZWNvcmRlZFBhcmFtLnZlcnNpb24gPSB2ZXJzaW9uXG4gIHJlY29yZGVkUGFyYW0uaW1laSA9IHVhXG4gIHJlY29yZGVkUGFyYW0ubG9nX3RpbWUgPSBsb2dUaW1lXG4gIHJlY29yZGVkUGFyYW0udGltZV96b25lID0gdGltZVpvbmVcblxuICByZXR1cm4gcmVjb3JkZWRQYXJhbVxufVxuXG5jb25zdCBzZW5kRXZlbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IFVSTCA9IGNvbnN0cnVjdFVSTCgpXG4gIGNvbnN0IGxvZ0luZm8gPSBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvKHBhcmFtcylcbiAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHtcbiAgICBsb2dzOiBbIGxvZ0luZm8gXVxuICB9XG5cbiAgcmV0dXJuIGh0dHBIYW5kbGVyKCdQT1NUJywgVVJMLCByZXF1ZXN0UGFyYW1zKVxufVxuXG5jb25zdCBzdG9yZUV2ZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBsb2dJdGVtcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvZ0luZm9zKVxuXG4gIGxldCBzdG9yZWRMb2dzXG4gIGlmICghbG9nSXRlbXMpIHtcbiAgICBzdG9yZWRMb2dzID0gW11cbiAgfSBlbHNlIHtcbiAgICBzdG9yZWRMb2dzID0gSlNPTi5wYXJzZShsb2dJdGVtcylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2dJbmZvcylcbiAgfVxuXG4gIGNvbnN0IGludGVydmlld0luZm8gPSBjb25zdHJ1Y3RJbnRlcnZpZXdJbmZvKHBhcmFtcylcbiAgc3RvcmVkTG9ncy5wdXNoKGludGVydmlld0luZm8pXG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nSW5mb3MsIEpTT04uc3RyaW5naWZ5KHN0b3JlZExvZ3MpKVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW50ZXJ2aWV3SW5mbylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoZW52LCBwYXJhbXMsIG9uRXJyb3IgPSAoKSA9PiB7fSwgb25VbmhhbmRsZWRSZWplY3Rpb24gPSAoKSA9PiB7fSkge1xuICBjb25zdCBiYXNlUGFyYW0gPSB7XG4gICAgJ2ludGVydmlld0NvZGUnOiBwYXJhbXMuaW50ZXJ2aWV3X2NvZGUgfHwgJycsXG4gICAgJ2NhbmRpZGF0ZV9pZCc6IHBhcmFtcy5jYW5kaWRhdGVfaWQgfHwgMCxcbiAgICAnam9iX2lkJzogcGFyYW1zLmpvYl9pZCB8fCAwLFxuICAgICdjb21wYW55X2lkJzogcGFyYW1zLmNvbXBhbnlfaWQgfHwgMFxuICB9XG5cbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9nRW52LCBlbnYpXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvZ0Jhc2VJbmZvLCBKU09OLnN0cmluZ2lmeShiYXNlUGFyYW0pKVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlcnJFdnQpID0+IHtcbiAgICBvbkVycm9yKGVyckV2dC5lcnJvcilcbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgKGVyckV2dCkgPT4ge1xuICAgIG9uVW5oYW5kbGVkUmVqZWN0aW9uKGVyckV2dC5yZWFzb24pXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvcmRFdmVudChwYXJhbXMpIHtcbiAgc3dpdGNoIChwYXJhbXMuc3RhdHVzKSB7XG4gICAgY2FzZSAnb25saW5lJzpcbiAgICAgIHJldHVybiBzZW5kRXZlbnQocGFyYW1zKVxuXG4gICAgY2FzZSAnb2ZmbGluZSc6XG4gICAgICByZXR1cm4gc3RvcmVFdmVudChwYXJhbXMpXG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdObyBldmVudCB0byBzZW5kJylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbmRTYXZlZEV2ZW50cygpIHtcbiAgY29uc3QgbG9nSXRlbXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2dJbmZvcylcbiAgaWYgKCFsb2dJdGVtcykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgY29uc3QgVVJMID0gY29uc3RydWN0VVJMKClcbiAgY29uc3QgcmVxdWVzdFBhcmFtcyA9IHtcbiAgICBsb2dzOiBKU09OLnBhcnNlKGxvZ0l0ZW1zKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBodHRwSGFuZGxlcignUE9TVCcsIFVSTCwgcmVxdWVzdFBhcmFtcylcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvZ0luZm9zKVxuICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KGVycm9yKSlcbiAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIHN0b3JhZ2VLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpXG4gIH0pXG59XG4iLCJcbmV4cG9ydCBkZWZhdWx0IChtZXRob2QsIHVybCwgcGFyYW1zLCBtaW1lVHlwZSA9ICdhcHBsaWNhdGlvbi9qc29uJykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIHJlcXVlc3Qub3BlbihtZXRob2QsIHVybCwgdHJ1ZSlcblxuICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOCcpXG5cbiAgICBpZiAobWltZVR5cGUgJiYgcmVxdWVzdC5vdmVycmlkZU1pbWVUeXBlKSB7XG4gICAgICByZXF1ZXN0Lm92ZXJyaWRlTWltZVR5cGUobWltZVR5cGUpXG4gICAgfVxuXG4gICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpXG4gICAgICBjb25zdCByZXNwb25zZUNvZGUgPSByZXNwb25zZS5zdGF0dXMgfHwgcmVxdWVzdC5zdGF0dXNcblxuICAgICAgaWYgKHJlc3BvbnNlQ29kZSA+PSAyMDAgJiYgcmVzcG9uc2VDb2RlIDwgMzAwKSB7XG4gICAgICAgIHJlc29sdmUocmVzcG9uc2UubWVzc2FnZSB8fCByZXNwb25zZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdChyZXNwb25zZS5tZXNzYWdlIHx8IHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCByZXF1ZXN0UGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKVxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0UGFyYW1zKVxuICB9KVxufVxuIiwiXG5leHBvcnQgY29uc3QgZ2V0VGltZXpvbmUgPSAoKSA9PiB7XG4gIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKClcbiAgdmFyIGN1cnJlbnRUaW1lem9uZSA9IGN1cnJlbnRUaW1lLmdldFRpbWV6b25lT2Zmc2V0KClcblxuICByZXR1cm4gKGN1cnJlbnRUaW1lem9uZSAvIDYwKSAqIC0xXG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50RGF0ZVRpbWUgPSAoKSA9PiB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gIGxldCBkID0gbmV3IERhdGUoZGF0ZSksXG4gICAgbW9udGggPSAnJyArIChkLmdldE1vbnRoKCkgKyAxKSxcbiAgICBkYXkgPSAnJyArIGQuZ2V0RGF0ZSgpLFxuICAgIHllYXIgPSBkLmdldEZ1bGxZZWFyKCksXG4gICAgaG91ciA9IGQuZ2V0SG91cnMoKSxcbiAgICBtaW51dGUgPSBkLmdldE1pbnV0ZXMoKSxcbiAgICBzZWNvbmQgPSBkLmdldFNlY29uZHMoKVxuXG4gIGlmIChtb250aC5sZW5ndGggPCAyKSB7XG4gICAgbW9udGggPSAnMCcgKyBtb250aFxuICB9XG5cbiAgaWYgKGRheS5sZW5ndGggPCAyKSB7XG4gICAgZGF5ID0gJzAnICsgZGF5XG4gIH1cblxuICAvLyBob3VyID0gaG91ciAlIDEyO1xuICAvLyBob3VyID0gaG91ciA/IGhvdXIgOiAxMjtcbiAgbWludXRlID0gbWludXRlIDwgMTAgPyAnMCcgKyBtaW51dGUgOiBtaW51dGU7XG5cbiAgY29uc3QgcmVzdWx0ID0gYCR7W3llYXIsIG1vbnRoLCBkYXldLmpvaW4oJy0nKX0gJHtob3VyfToke21pbnV0ZX06JHtzZWNvbmR9YFxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiAqIHNvdXJjZTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NzA2ODE4Lzk5Mzg1MzlcbiovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuY29uc3QgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uXG5sZXQgY29va2llRW5hYmxlZCA9IG5hdmlnYXRvci5jb29raWVFbmFibGVkXG5cbmNvbnN0IGdldE9TSW5mbyA9ICgpID0+IHtcbiAgbGV0IG9zID0gJy0nXG4gIGxldCBvc1ZlcnNpb24gPSAnLSdcblxuICBjb25zdCBjbGllbnRTdHJpbmdzID0gW1xuICAgIHtzOiAnV2luZG93cyAxMCcsIHI6IC8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOC4xJywgcjogLyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICB7czogJ1dpbmRvd3MgOCcsIHI6IC8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgIHtzOiAnV2luZG93cyA3JywgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAge3M6ICdXaW5kb3dzIFZpc3RhJywgcjogL1dpbmRvd3MgTlQgNi4wL30sXG4gICAge3M6ICdXaW5kb3dzIFNlcnZlciAyMDAzJywgcjogL1dpbmRvd3MgTlQgNS4yL30sXG4gICAge3M6ICdXaW5kb3dzIFhQJywgcjogLyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgIHtzOiAnV2luZG93cyAyMDAwJywgcjogLyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAge3M6ICdXaW5kb3dzIE1FJywgcjogLyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgIHtzOiAnV2luZG93cyA5OCcsIHI6IC8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICB7czogJ1dpbmRvd3MgOTUnLCByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICB7czogJ1dpbmRvd3MgTlQgNC4wJywgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgIHtzOiAnV2luZG93cyBDRScsIHI6IC9XaW5kb3dzIENFL30sXG4gICAge3M6ICdXaW5kb3dzIDMuMTEnLCByOiAvV2luMTYvfSxcbiAgICB7czogJ0FuZHJvaWQnLCByOiAvQW5kcm9pZC99LFxuICAgIHtzOiAnT3BlbiBCU0QnLCByOiAvT3BlbkJTRC99LFxuICAgIHtzOiAnU3VuIE9TJywgcjogL1N1bk9TL30sXG4gICAge3M6ICdMaW51eCcsIHI6IC8oTGludXh8WDExKS99LFxuICAgIHtzOiAnaU9TJywgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgIHtzOiAnTWFjIE9TIFgnLCByOiAvTWFjIE9TIFgvfSxcbiAgICB7czogJ01hYyBPUycsIHI6IC8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICB7czogJ1FOWCcsIHI6IC9RTlgvfSxcbiAgICB7czogJ1VOSVgnLCByOiAvVU5JWC99LFxuICAgIHtzOiAnQmVPUycsIHI6IC9CZU9TL30sXG4gICAge3M6ICdPUy8yJywgcjogL09TXFwvMi99LFxuICAgIHtzOiAnU2VhcmNoIEJvdCcsIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gIF1cblxuICBmb3IgKGxldCBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgbGV0IGNzID0gY2xpZW50U3RyaW5nc1tpZF1cbiAgICBpZiAoY3Muci50ZXN0KHVhKSkge1xuICAgICAgb3MgPSBjcy5zXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXVxuICAgIG9zID0gJ1dpbmRvd3MnXG4gIH1cblxuICBzd2l0Y2ggKG9zKSB7XG4gICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWModWEpWzFdXG4gICAgICBicmVha1xuXG4gICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyh1YSlbMV1cbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdpT1MnOlxuICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcilcbiAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKVxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogb3MsXG4gICAgdmVyc2lvbjogb3NWZXJzaW9uXG4gIH1cbn1cblxuY29uc3QgZ2V0QnJvd3NlckluZm8gPSAoKSA9PiB7XG4gIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuVmVyLCAxMClcbiAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZVxuICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXhcblxuICBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09wZXJhJykpICE9PSAtMSkge1xuICAgIGJyb3dzZXIgPSAnT3BlcmEnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KVxuICAgIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignVmVyc2lvbicpKSAhPT0gLTEpIHtcbiAgICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOClcbiAgICB9XG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ09QUicpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ09wZXJhJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNClcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRWRnZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJ1xuICAgIHZlcnNpb24gPSB1YS5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSlcbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignTVNJRScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlcidcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDUpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ0Nocm9tZScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0Nocm9tZSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gIH0gZWxzZSBpZiAoKHZlck9mZnNldCA9IHVhLmluZGV4T2YoJ1NhZmFyaScpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ1NhZmFyaSdcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSB1YS5pbmRleE9mKCdWZXJzaW9uJykpICE9PSAtMSkge1xuICAgICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICAgIH1cbiAgfSBlbHNlIGlmICgodmVyT2Zmc2V0ID0gdWEuaW5kZXhPZignRmlyZWZveCcpKSAhPT0gLTEpIHtcbiAgICBicm93c2VyID0gJ0ZpcmVmb3gnXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KVxuICB9IGVsc2UgaWYgKHVhLmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgdmVyc2lvbiA9IHVhLnN1YnN0cmluZyh1YS5pbmRleE9mKCdydjonKSArIDMpXG4gIH0gZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSB1YS5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gdWEubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICBicm93c2VyID0gdWEuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldClcbiAgICB2ZXJzaW9uID0gdWEuc3Vic3RyaW5nKHZlck9mZnNldCArIDEpXG4gICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWVcbiAgICB9XG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcnKSkgIT09IC0xKSB7XG4gICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KVxuICB9XG5cbiAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPT0gLTEpIHtcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpXG4gIH1cblxuICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9PSAtMSkge1xuICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeClcbiAgfVxuXG4gIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApXG4gIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuVmVyKVxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5WZXIsIDEwKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBicm93c2VyIHx8ICcnLFxuICAgIHZlcnNpb246IHZlcnNpb24gfHwgJycsXG4gICAgbWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24gfHwgJydcbiAgfVxufVxuXG5jb25zdCBnZXRTY3JlZW5TaXplID0gKCkgPT4ge1xuICBpZiAoIXNjcmVlbi53aWR0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIGNvbnN0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJ1xuICBjb25zdCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJydcblxuICByZXR1cm4gJycgKyB3aWR0aCArICcgeCAnICsgaGVpZ2h0XG59XG5cbmNvbnN0IGlzQ29va2llRW5hYmxlZCA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSdcbiAgICByZXR1cm4gZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPT0gLTFcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV2aWNlSW5mbygpIHtcbiAgY29uc3Qgb3MgPSBnZXRPU0luZm8oKVxuICBjb25zdCBicm93c2VyID0gZ2V0QnJvd3NlckluZm8oKVxuICBjb25zdCBzY3JlZW5TaXplID0gZ2V0U2NyZWVuU2l6ZSgpXG4gIGNvbnN0IG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKVxuXG4gIHJldHVybiB7XG4gICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgIGJyb3dzZXI6IGJyb3dzZXIubmFtZSxcbiAgICBicm93c2VyVmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uLFxuICAgIGJyb3dzZXJNYWpvclZlcnNpb246IGJyb3dzZXIubWFqb3JWZXJzaW9uLFxuICAgIG1vYmlsZTogbW9iaWxlLFxuICAgIG9zOiBvcy5uYW1lLFxuICAgIG9zVmVyc2lvbjogb3MudmVyc2lvbixcbiAgICBjb29raWVzOiBpc0Nvb2tpZUVuYWJsZWRcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
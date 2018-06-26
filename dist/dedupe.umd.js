(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.classnames = factory());
}(this, (function () { 'use strict';

/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
// don't inherit from Object so we can skip hasOwnProperty check later
// http://stackoverflow.com/questions/15518328/creating-js-object-with-object-createnull#answer-21079232
function StorageObject() {}

StorageObject.prototype = Object.create(null);

function _parseArray(resultSet, array) {
  var length = array.length;

  for (var i = 0; i < length; ++i) {
    _parse(resultSet, array[i]);
  }
}

var hasOwn = {}.hasOwnProperty;

function _parseNumber(resultSet, num) {
  resultSet[num] = true;
}

function _parseObject(resultSet, object) {
  for (var k in object) {
    if (hasOwn.call(object, k)) {
      // set value to false instead of deleting it to avoid changing object structure
      // https://www.smashingmagazine.com/2012/11/writing-fast-memory-efficient-javascript/#de-referencing-misconceptions
      resultSet[k] = !!object[k];
    }
  }
}

var SPACE = /\s+/;

function _parseString(resultSet, str) {
  var array = str.split(SPACE);
  var length = array.length;

  for (var i = 0; i < length; ++i) {
    resultSet[array[i]] = true;
  }
}

function _parse(resultSet, arg) {
  if (!arg) return;
  var argType = typeof arg; // 'foo bar'

  if (argType === 'string') {
    _parseString(resultSet, arg); // ['foo', 'bar', ...]

  } else if (Array.isArray(arg)) {
    _parseArray(resultSet, arg); // { 'foo': true, ... }

  } else if (argType === 'object') {
    _parseObject(resultSet, arg); // '130'

  } else if (argType === 'number') {
    _parseNumber(resultSet, arg);
  }
}

function classNames() {
  var classSet = new StorageObject();

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  _parseArray(classSet, args);

  var list = [];

  for (var k in classSet) {
    if (classSet[k]) {
      list.push(k);
    }
  }

  return list.join(' ');
}

return classNames;

})));

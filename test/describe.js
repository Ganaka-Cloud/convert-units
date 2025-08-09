var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

tests['get kg'] = function () {
  var actual = convert().describe('kg')
    , expected = {
        abbr: 'kg'
      , measure: 'Mass'
      , system: 'metric'
      , singular: 'Kilogram'
      , plural: 'Kilograms'
      };

  assert.deepEqual(actual, expected);
};

tests['get ac'] = function () {
  var actual = convert().describe('ac')
    , expected = {
        abbr: 'ac'
      , measure: 'Area'
      , system: 'imperial'
      , singular: 'Acre'
      , plural: 'Acres'
      };

  assert.deepEqual(actual, expected);
};

module.exports = tests;

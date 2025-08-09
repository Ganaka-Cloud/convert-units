var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['J/sqm to J/sqm'] = function () {
  assert.strictEqual( convert(1).from('J/sqm').to('J/sqm') , 1);
};

tests['J/sqm to kJ/sqm'] = function () {
  assert.strictEqual( convert(1).from('J/sqm').to('kJ/sqm') , 0.001);
};

tests['kJ/sqm to J/sqm'] = function () {
  assert.strictEqual( convert(1).from('kJ/sqm').to('J/sqm') , 1000);
};

tests['ft-lbs/sqin to ft-lbs/sqin'] = function () {
  assert.strictEqual( convert(1).from('ft-lbs/sqin').to('ft-lbs/sqin') , 1);
};

// When converting between systems, expect < 0.1% error
tests['J/sqm to ft-lbs/sqin'] = function () {
  var expected = 2103
    , actual = convert(1).from('J/sqm').to('ft-lbs/sqin');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-lbs/sqin to J/sqm'] = function () {
  var expected = 1/2103
    , actual = convert(1).from('ft-lbs/sqin').to('J/sqm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

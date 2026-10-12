var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['J/m2 to J/m2'] = function () {
  assert.strictEqual( convert(1).from('J/m2').to('J/m2') , 1);
};

tests['J/m2 to kJ/m2'] = function () {
  assert.strictEqual( convert(1).from('J/m2').to('kJ/m2') , 0.001);
};

tests['kJ/m2 to J/m2'] = function () {
  assert.strictEqual( convert(1).from('kJ/m2').to('J/m2') , 1000);
};

tests['ft-lbs/sqin to ft-lbs/sqin'] = function () {
  assert.strictEqual( convert(1).from('ft-lbs/sqin').to('ft-lbs/sqin') , 1);
};

// When converting between systems, expect < 0.1% error
tests['J/m2 to ft-lbs/sqin'] = function () {
  var expected = 2103
    , actual = convert(1).from('J/m2').to('ft-lbs/sqin');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-lbs/sqin to J/m2'] = function () {
  var expected = 1/2103
    , actual = convert(1).from('ft-lbs/sqin').to('J/m2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

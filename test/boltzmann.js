var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['J/K to J/K'] = function () {
  assert.strictEqual( convert(1).from('J/K').to('J/K') , 1);
};

tests['J/K to ev/K'] = function () {
  var expected = 1.380649e-23
    , actual = convert(1).from('J/K').to('ev/K');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ev/K to J/K'] = function () {
  var expected = 1/1.380649e-23
    , actual = convert(1).from('ev/K').to('J/K');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-lb/R to ft-lb/R'] = function () {
  assert.strictEqual( convert(1).from('ft-lb/R').to('ft-lb/R') , 1);
};

// When converting between systems, expect < 0.1% error
tests['J/K to ft-lb/R'] = function () {
  var expected = 1.9463792466e-23
    , actual = convert(1).from('J/K').to('ft-lb/R');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-lb/R to J/K'] = function () {
  var expected = 7.24297051603992e+22
    , actual = convert(1).from('ft-lb/R').to('J/K');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['m/m to m/m'] = function () {
  assert.strictEqual( convert(1).from('m/m').to('m/m') , 1);
};

tests['m/m to cm/cm'] = function () {
  assert.strictEqual( convert(1).from('m/m').to('cm/cm') , 1);
};

tests['cm/cm to m/m'] = function () {
  assert.strictEqual( convert(1).from('cm/cm').to('m/m') , 1);
};

tests['m/m to mm/mm'] = function () {
  assert.strictEqual( convert(1).from('m/m').to('mm/mm') , 1);
};

tests['mm/mm to m/m'] = function () {
  assert.strictEqual( convert(1).from('mm/mm').to('m/m') , 1);
};

tests['ft/ft to ft/ft'] = function () {
  assert.strictEqual( convert(1).from('ft/ft').to('ft/ft') , 1);
};

tests['ft/ft to in/in'] = function () {
  assert.strictEqual( convert(1).from('ft/ft').to('in/in') , 1);
};

tests['in/in to ft/ft'] = function () {
  assert.strictEqual( convert(1).from('in/in').to('ft/ft') , 1);
};

tests['ft/ft to yd/yd'] = function () {
  assert.strictEqual( convert(1).from('ft/ft').to('yd/yd') , 1);
};

tests['yd/yd to ft/ft'] = function () {
  assert.strictEqual( convert(1).from('yd/yd').to('ft/ft') , 1);
};

tests['ft/ft to ft-us/ft-us'] = function () {
  var expected = 1/1.000002
    , actual = convert(1).from('ft/ft').to('ft-us/ft-us');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft-us/ft-us to ft/ft'] = function () {
  var expected = 1.000002
    , actual = convert(1).from('ft-us/ft-us').to('ft/ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// When converting between systems, expect < 0.1% error
tests['m/m to ft/ft'] = function () {
  var expected = 1
    , actual = convert(1).from('m/m').to('ft/ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft/ft to m/m'] = function () {
  var expected = 1
    , actual = convert(1).from('ft/ft').to('m/m');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

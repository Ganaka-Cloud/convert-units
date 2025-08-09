var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['m/s2 to m/s2'] = function () {
  assert.strictEqual( convert(1).from('m/s2').to('m/s2') , 1);
};

tests['m/s2 to cm/s2'] = function () {
  assert.strictEqual( convert(1).from('m/s2').to('cm/s2') , 0.01);
};

tests['cm/s2 to m/s2'] = function () {
  assert.strictEqual( convert(1).from('cm/s2').to('m/s2') , 100);
};

tests['m/s2 to mm/s2'] = function () {
  assert.strictEqual( convert(1).from('m/s2').to('mm/s2') , 0.001);
};

tests['mm/s2 to m/s2'] = function () {
  assert.strictEqual( convert(1).from('mm/s2').to('m/s2') , 1000);
};

tests['km/s2 to m/s2'] = function () {
  assert.strictEqual( convert(1).from('km/s2').to('m/s2') , 0.001);
};

tests['m/s2 to km/s2'] = function () {
  assert.strictEqual( convert(1).from('m/s2').to('km/s2') , 1000);
};

tests['dm/s2 to m/s2'] = function () {
  assert.strictEqual( convert(1).from('dm/s2').to('m/s2') , 10);
};

tests['m/s2 to dm/s2'] = function () {
  assert.strictEqual( convert(1).from('m/s2').to('dm/s2') , 0.1);
};

tests['g-force to m/s2'] = function () {
  var expected = 1/9.80665
    , actual = convert(1).from('g-force').to('m/s2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['m/s2 to g-force'] = function () {
  var expected = 9.80665
    , actual = convert(1).from('m/s2').to('g-force');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft/s2 to ft/s2'] = function () {
  assert.strictEqual( convert(1).from('ft/s2').to('ft/s2') , 1);
};

tests['ft/s2 to in/s2'] = function () {
  assert.strictEqual( convert(1).from('ft/s2').to('in/s2') , 0.08333333333333333);
};

tests['in/s2 to ft/s2'] = function () {
  assert.strictEqual( convert(1).from('in/s2').to('ft/s2') , 12);
};

tests['yd/s2 to ft/s2'] = function () {
  assert.strictEqual( convert(1).from('yd/s2').to('ft/s2') , 0.3333333333333333);
};

tests['ft/s2 to yd/s2'] = function () {
  assert.strictEqual( convert(1).from('ft/s2').to('yd/s2') , 3);
};

tests['mi/s2 to ft/s2'] = function () {
  assert.strictEqual( convert(1).from('mi/s2').to('ft/s2') , 0.0001893939393939394);
};

tests['ft/s2 to mi/s2'] = function () {
  assert.strictEqual( convert(1).from('ft/s2').to('mi/s2') , 5280);
};

// TODO: Fix g-force:US conversions
// tests['g-force US to ft/s2'] = function () {
//   var expected = 1/386.08858268
//     , actual = convert(1).from('g-force:US').to('ft/s2');
//   assert.ok( percentError(expected, actual) < ACCURACY
//     , 'Expected: ' + expected +', Actual: ' + actual);
// };

// tests['ft/s2 to g-force US'] = function () {
//   var expected = 386.08858268
//     , actual = convert(1).from('ft/s2').to('g-force:US');
//   assert.ok( percentError(expected, actual) < ACCURACY
//     , 'Expected: ' + expected +', Actual: ' + actual);
// };

// When converting between systems, expect < 0.1% error
tests['m/s2 to ft/s2'] = function () {
  var expected = 3.657599882956804
    , actual = convert(1).from('m/s2').to('ft/s2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft/s2 to m/s2'] = function () {
  var expected = 1/3.657599882956804
    , actual = convert(1).from('ft/s2').to('m/s2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

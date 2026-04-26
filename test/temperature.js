var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000000
  , percentError = require('../lib/percentError');

tests['C to K'] = function () {
  assert.strictEqual( convert(0).from('C').to('K'), 273.15);
};

tests['K to C'] = function () {
  assert.strictEqual( convert(273.15).from('K').to('C'), 0);
};

tests['F to C'] = function () {
  assert.strictEqual( convert(32).from('F').to('C'), 0);
};

tests['C to F'] = function () {
  // 0C = 32F; tiny FP error below 1ppm is acceptable
  var expected = 32
    , actual = convert(0).from('C').to('F');
  assert.ok( Math.abs(actual - expected) < 1e-10
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['F to K'] = function () {
  assert.strictEqual( convert(32).from('F').to('K'), 273.15);
};

tests['F to R'] = function () {
  assert.strictEqual( convert(100).from('F').to('R'), 559.6700000000001);
};

tests['R to F'] = function () {
  assert.strictEqual( convert(670).from('R').to('F'), 210.32999999999998);
};

tests['R to C'] = function () {
  // 612R = 66.85C; tiny FP error below 1ppm is acceptable
  var expected = 66.85
    , actual = convert(612).from('R').to('C');
  assert.ok( Math.abs(actual - expected) < 1e-10
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['R to K'] = function () {
  assert.strictEqual( convert(459.67).from('R').to('K'), 255.3722222222222);
};

// New unit: Re (Réaumur) - 0°Ré = 0°C, 80°Ré = 100°C
tests['Re to C - zero'] = function () {
  assert.strictEqual( convert(0).from('Re').to('C') , 0);
};

tests['Re to C - boiling'] = function () {
  assert.strictEqual( convert(80).from('Re').to('C') , 100);
};

tests['C to Re'] = function () {
  assert.strictEqual( convert(100).from('C').to('Re') , 80);
};

tests['Re to F'] = function () {
  // 0Re = 0C = 32F; tiny FP error below 1ppm is acceptable
  var expected = 32
    , actual = convert(0).from('Re').to('F');
  assert.ok( Math.abs(actual - expected) < 1e-10
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

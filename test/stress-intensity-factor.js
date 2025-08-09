var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['Pa-sqrt(m) to Pa-sqrt(m)'] = function () {
  assert.strictEqual( convert(1).from('Pa-sqrt(m)').to('Pa-sqrt(m)') , 1);
};

tests['Pa-sqrt(m) to kPa-sqrt(m)'] = function () {
  assert.strictEqual( convert(1).from('Pa-sqrt(m)').to('kPa-sqrt(m)') , 1/1000);
};

tests['kPa-sqrt(m) to Pa-sqrt(m)'] = function () {
  var expected = 1000
    , actual = convert(1).from('kPa-sqrt(m)').to('Pa-sqrt(m)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Pa-sqrt(m) to hPa-sqrt(m)'] = function () {
  var expected = 0.01
    , actual = convert(1).from('Pa-sqrt(m)').to('hPa-sqrt(m)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['hPa-sqrt(m) to Pa-sqrt(m)'] = function () {
  var expected = 100
    , actual = convert(1).from('hPa-sqrt(m)').to('Pa-sqrt(m)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Pa-sqrt(m) to MPa-sqrt(m)'] = function () {
  assert.strictEqual( convert(1).from('Pa-sqrt(m)').to('MPa-sqrt(m)') , 1/1000000);
};

tests['MPa-sqrt(m) to Pa-sqrt(m)'] = function () {
  assert.strictEqual( convert(1).from('MPa-sqrt(m)').to('Pa-sqrt(m)') , 1000000);
};

tests['psi-sqrt(in) to psi-sqrt(in)'] = function () {
  assert.strictEqual( convert(1).from('psi-sqrt(in)').to('psi-sqrt(in)') , 1);
};

tests['psi-sqrt(in) to ksi-sqr(in)'] = function () {
  assert.strictEqual( convert(1).from('psi-sqrt(in)').to('ksi-sqr(in)') , 1/1000);
};

tests['ksi-sqr(in) to psi-sqrt(in)'] = function () {
  assert.strictEqual( convert(1).from('ksi-sqr(in)').to('psi-sqrt(in)') , 1000);
};

// When converting between systems, expect < 0.1% error
tests['Pa-sqrt(m) to psi-sqrt(in)'] = function () {
  var expected = 0.000910885
    , actual = convert(1).from('Pa-sqrt(m)').to('psi-sqrt(in)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['psi-sqrt(in) to Pa-sqrt(m)'] = function () {
  var expected = 1097.8334257343133
    , actual = convert(1).from('psi-sqrt(in)').to('Pa-sqrt(m)');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

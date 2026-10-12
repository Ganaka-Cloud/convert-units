var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['kg*m2 to kg*m2'] = function () {
  assert.strictEqual( convert(1).from('kg*m2').to('kg*m2') , 1);
};

tests['kg*m2 to kg*cm2'] = function () {
  assert.strictEqual( convert(1).from('kg*m2').to('kg*cm2') , 10000);
};

tests['kg*cm2 to kg*m2'] = function () {
  assert.strictEqual( convert(1).from('kg*cm2').to('kg*m2') , 1/10000);
};

tests['kg*m2 to kg*mm2'] = function () {
  assert.strictEqual( convert(1).from('kg*m2').to('kg*mm2') , 1000000);
};

tests['kg*mm2 to kg*m2'] = function () {
  assert.strictEqual( convert(1).from('kg*mm2').to('kg*m2') , 1/1000000);
};

tests['kg*m2 to kgfms2'] = function () {
  var expected = 1/9.80665
    , actual = convert(1).from('kg*m2').to('kgfms2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kgfms2 to kg*m2'] = function () {
  var expected = 9.80665
    , actual = convert(1).from('kgfms2').to('kg*m2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lb-ft2 to lb-ft2'] = function () {
  assert.strictEqual( convert(1).from('lb-ft2').to('lb-ft2') , 1);
};

tests['lb-ft2 to lb-in2'] = function () {
  assert.strictEqual( convert(1).from('lb-ft2').to('lb-in2') , 144);
};

tests['lb-in2 to lb-ft2'] = function () {
  assert.strictEqual( convert(1).from('lb-in2').to('lb-ft2') , 1/144);
};

tests['lb-ft2 to lbf-fts2'] = function () {
  var expected = 0.031080949860922878
    , actual = convert(1).from('lb-ft2').to('lbf-fts2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-fts2 to lb-ft2'] = function () {
  var expected = 1/0.031080949860922878
    , actual = convert(1).from('lbf-fts2').to('lb-ft2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lb-ft2 to lbf-ins2'] = function () {
  var expected = 0.3729713983357114
    , actual = convert(1).from('lb-ft2').to('lbf-ins2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-ins2 to lb-ft2'] = function () {
  var expected = 1/0.3729713983357114
    , actual = convert(1).from('lbf-ins2').to('lb-ft2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

// When converting between systems, expect < 0.1% error
tests['kg*m2 to lb-ft2'] = function () {
  var expected = 23.73036040423193
    , actual = convert(1).from('kg*m2').to('lb-ft2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lb-ft2 to kg*m2'] = function () {
  var expected = 1/23.73036040423193
    , actual = convert(1).from('lb-ft2').to('kg*m2');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

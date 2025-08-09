var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['N to N'] = function () {
  assert.strictEqual( convert(1).from('N').to('N') , 1);
};

tests['N to dyn'] = function () {
  assert.strictEqual( convert(1).from('N').to('dyn') , 99999.99999999999);
};

tests['dyn to N'] = function () {
  assert.strictEqual( convert(1).from('dyn').to('N') , 0.00001);
};

tests['N to daN'] = function () {
  assert.strictEqual( convert(1).from('N').to('daN') , 0.1);
};

tests['daN to N'] = function () {
  assert.strictEqual( convert(1).from('daN').to('N') , 10);
};

tests['N to kN'] = function () {
  assert.strictEqual( convert(1).from('N').to('kN') , 0.001);
};

tests['kN to N'] = function () {
  assert.strictEqual( convert(1).from('kN').to('N') , 1000);
};

tests['N to kgf'] = function () {
  var expected = 9.80665
    , actual = convert(1).from('N').to('kgf');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kgf to N'] = function () {
  var expected = 1/9.80665
    , actual = convert(1).from('kgf').to('N');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['N to tfM'] = function () {
  var expected = 9806.65
    , actual = convert(1).from('N').to('tfM');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['tfM to N'] = function () {
  var expected = 1/9806.65
    , actual = convert(1).from('tfM').to('N');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf to lbf'] = function () {
  assert.strictEqual( convert(1).from('lbf').to('lbf') , 1);
};

tests['lbf to kipf'] = function () {
  assert.strictEqual( convert(1).from('lbf').to('kipf') , 1/1000);
};

tests['kipf to lbf'] = function () {
  assert.strictEqual( convert(1).from('kipf').to('lbf') , 1000);
};

tests['lbf to pdl'] = function () {
  var expected = 32.174048556
    , actual = convert(1).from('lbf').to('pdl');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['pdl to lbf'] = function () {
  var expected = 1/32.174048556
    , actual = convert(1).from('pdl').to('lbf');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf to tfs'] = function () {
  assert.strictEqual( convert(1).from('lbf').to('tfs') , 1/2000);
};

tests['tfs to lbf'] = function () {
  assert.strictEqual( convert(1).from('tfs').to('lbf') , 2000);
};

tests['lbf to tfl'] = function () {
  assert.strictEqual( convert(1).from('lbf').to('tfl') , 1/2240);
};

tests['tfl to lbf'] = function () {
  assert.strictEqual( convert(1).from('tfl').to('lbf') , 2240);
};

// When converting between systems, expect < 0.1% error
tests['N to lbf'] = function () {
  var expected = 1/4.4482216153
    , actual = convert(1).from('N').to('lbf');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf to N'] = function () {
  var expected = 4.4482216153
    , actual = convert(1).from('lbf').to('N');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

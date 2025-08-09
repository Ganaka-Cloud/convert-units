var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['Nm to Nm'] = function () {
  assert.strictEqual( convert(1).from('Nm').to('Nm') , 1);
};

tests['Nm to Nmm'] = function () {
  assert.strictEqual( convert(1).from('Nm').to('Nmm') , 1000);
};

tests['Nmm to Nm'] = function () {
  assert.strictEqual( convert(1).from('Nmm').to('Nm') , 1/1000);
};

tests['Nm to Ncm'] = function () {
  assert.strictEqual( convert(1).from('Nm').to('Ncm') , 100);
};

tests['Ncm to Nm'] = function () {
  assert.strictEqual( convert(1).from('Ncm').to('Nm') , 1/100);
};

tests['Nm to kNm'] = function () {
  assert.strictEqual( convert(1).from('Nm').to('kNm') , 1/1000);
};

tests['kNm to Nm'] = function () {
  assert.strictEqual( convert(1).from('kNm').to('Nm') , 1000);
};

tests['Nm to μNm'] = function () {
  assert.strictEqual( convert(1).from('Nm').to('μNm') , 1000000);
};

tests['μNm to Nm'] = function () {
  assert.strictEqual( convert(1).from('μNm').to('Nm') , 1/1000000);
};

tests['Nm to kgfm'] = function () {
  var expected = 1/9.80665
    , actual = convert(1).from('Nm').to('kgfm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['kgfm to Nm'] = function () {
  var expected = 9.80665
    , actual = convert(1).from('kgfm').to('Nm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Nm to tfMm'] = function () {
  var expected = 1/9806.65
    , actual = convert(1).from('Nm').to('tfMm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['tfMm to Nm'] = function () {
  var expected = 9806.65
    , actual = convert(1).from('tfMm').to('Nm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-ft to lbf-ft'] = function () {
  assert.strictEqual( convert(1).from('lbf-ft').to('lbf-ft') , 1);
};

tests['lbf-ft to lbf-in'] = function () {
  assert.strictEqual( convert(1).from('lbf-ft').to('lbf-in') , 12);
};

tests['lbf-in to lbf-ft'] = function () {
  assert.strictEqual( convert(1).from('lbf-in').to('lbf-ft') , 1/12);
};

tests['lbf-ft to pdl-ft'] = function () {
  var expected = 0.031080895694038567
    , actual = convert(1).from('lbf-ft').to('pdl-ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['pdl-ft to lbf-ft'] = function () {
  var expected = 1/0.031080895694038567
    , actual = convert(1).from('pdl-ft').to('lbf-ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-ft to pdl-in'] = function () {
  var expected = 0.0025900746411698806
    , actual = convert(1).from('lbf-ft').to('pdl-in');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['pdl-in to lbf-ft'] = function () {
  var expected = 1/0.0025900746411698806
    , actual = convert(1).from('pdl-in').to('lbf-ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-ft to tfsm'] = function () {
  assert.strictEqual( convert(1).from('lbf-ft').to('tfsm') , 0.00015240028595707946);
};

tests['tfsm to lbf-ft'] = function () {
  assert.strictEqual( convert(1).from('tfsm').to('lbf-ft') , 1/0.00015240028595707946);
};

tests['lbf-ft to tflm'] = function () {
  assert.strictEqual( convert(1).from('lbf-ft').to('tflm') , 0.00013607158556486236);
};

tests['tflm to lbf-ft'] = function () {
  assert.strictEqual( convert(1).from('tflm').to('lbf-ft') , 7349.072885781298);
};

// When converting between systems, expect < 0.1% error
tests['Nm to lbf-ft'] = function () {
  var expected = 1/1.3558179483314004
    , actual = convert(1).from('Nm').to('lbf-ft');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['lbf-ft to Nm'] = function () {
  var expected = 1.3558179483314004
    , actual = convert(1).from('lbf-ft').to('Nm');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

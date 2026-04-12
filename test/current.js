var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

tests['A to A'] = function () {
  assert.strictEqual( convert(1).from('A').to('A') , 1);
};

tests['mA to mA'] = function () {
  assert.strictEqual( convert(1).from('mA').to('mA') , 1);
};

tests['kA to kA'] = function () {
  assert.strictEqual( convert(1).from('kA').to('kA') , 1);
};

tests['A to mA'] = function () {
  assert.strictEqual( convert(1).from('A').to('mA') , 1000);
};

tests['A to kA'] = function () {
  assert.strictEqual( convert(1).from('A').to('kA') , 0.001);
};

tests['kA to mA'] = function () {
  assert.strictEqual( convert(1).from('kA').to('mA'), 1000000);
}

tests['mA to kA'] = function () {
  assert.strictEqual( convert(1).from('mA').to('kA'), 0.000001);
}

tests['mA to A'] = function () {
  assert.strictEqual( convert(1).from('mA').to('A'), 0.001);
}

tests['kA to A'] = function () {
  assert.strictEqual( convert(1).from('kA').to('A'), 1000);
}

// New CGS current units: abA, Bi, statA
tests['abA to A'] = function () {
  assert.strictEqual( convert(1).from('abA').to('A'), 10);
};

tests['Bi to A'] = function () {
  assert.strictEqual( convert(1).from('Bi').to('A'), 10);
};

tests['abA to Bi'] = function () {
  assert.strictEqual( convert(1).from('abA').to('Bi'), 1);
};

tests['statA to A'] = function () {
  var expected = 3.33564e-10
    , actual = convert(1).from('statA').to('A')
    , ACCURACY = 1/1000
    , percentError = require('../lib/percentError');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected + ', Actual: ' + actual);
};

module.exports = tests;

var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

tests['V to V'] = function () {
  assert.strictEqual( convert(1).from('V').to('V') , 1);
};

tests['mV to mV'] = function () {
  assert.strictEqual( convert(1).from('mV').to('mV') , 1);
};

tests['kV to kV'] = function () {
  assert.strictEqual( convert(1).from('kV').to('kV') , 1);
};

tests['V to mV'] = function () {
  assert.strictEqual( convert(1).from('V').to('mV') , 1000);
};

tests['V to kV'] = function () {
  assert.strictEqual( convert(1).from('V').to('kV') , 0.001);
};

tests['kV to mV'] = function () {
  assert.strictEqual( convert(1).from('kV').to('mV'), 1000000);
}

tests['mV to kV'] = function () {
  assert.strictEqual( convert(1).from('mV').to('kV'), 0.000001);
}

tests['mV to V'] = function () {
  assert.strictEqual( convert(1).from('mV').to('V'), 0.001);
}

tests['kV to V'] = function () {
  assert.strictEqual( convert(1).from('kV').to('V'), 1000);
}

// New CGS voltage units: abV, statV
tests['abV to V'] = function () {
  var ACCURACY = 1/1000, percentError = require('../lib/percentError');
  var expected = 1e-8
    , actual = convert(1).from('abV').to('V');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected + ', Actual: ' + actual);
};

tests['statV to V'] = function () {
  var ACCURACY = 1/1000, percentError = require('../lib/percentError');
  var expected = 299.792458
    , actual = convert(1).from('statV').to('V');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected + ', Actual: ' + actual);
};

module.exports = tests;

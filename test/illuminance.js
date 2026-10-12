var convert = require('../lib')
  , assert = require('assert')
  , tests = {};

tests['ft-cd to lx'] = function () {
  assert.ok(Math.abs(convert(1).from('ft-cd').to('lx') / (1 / (0.3048 * 0.3048)) - 1) < 1e-12);
};

tests['lx to ft-cd'] = function () {
  assert.ok(Math.abs(convert(1).from('lx').to('ft-cd') / (0.3048 * 0.3048) - 1) < 1e-12);
};

module.exports = tests;

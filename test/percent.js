var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['percent to percent'] = function () {
  assert.strictEqual( convert(1).from('percent').to('percent') , 1);
};

tests['percent to decimal'] = function () {
  assert.strictEqual( convert(50).from('percent').to('percent') , 50);
};

tests['decimal to percent'] = function () {
  assert.strictEqual( convert(0.5).from('percent').to('percent') , 0.5);
};

module.exports = tests;

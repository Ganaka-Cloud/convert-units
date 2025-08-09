var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['MPam/h to MPam/h'] = function () {
  assert.strictEqual( convert(1).from('MPam/h').to('MPam/h') , 1);
};

module.exports = tests;

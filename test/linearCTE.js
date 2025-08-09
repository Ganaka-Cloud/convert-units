var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['/C to /C'] = function () {
  assert.strictEqual( convert(1).from('/C').to('/C') , 1);
};

tests['/C to /K'] = function () {
  assert.strictEqual( convert(1).from('/C').to('/K') , 1.0036609921288668);
};

tests['/K to /C'] = function () {
  assert.strictEqual( convert(1).from('/K').to('/C') , 0.996339007871133);
};

tests['/F to /F'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/F') , 1);
};

tests['/F to /R'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/R') , 1.0021754737094002);
};

tests['/R to /F'] = function () {
  assert.strictEqual( convert(1).from('/R').to('/F') , 0.9978245262905998);
};

// When converting between systems, expect < 0.1% error
tests['/C to /F'] = function () {
  var expected = 0.02958579881656805
    , actual = convert(1).from('/C').to('/F');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['/F to /C'] = function () {
  var expected = -0.05806451612903226
    , actual = convert(1).from('/F').to('/C');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

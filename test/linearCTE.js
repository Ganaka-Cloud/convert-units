var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

function close(expected, actual) {
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
}

tests['/C to /C'] = function () {
  assert.strictEqual( convert(1).from('/C').to('/C') , 1);
};

tests['/C to /K'] = function () {
  assert.strictEqual( convert(1).from('/C').to('/K') , 1);
};

tests['/K to /C'] = function () {
  assert.strictEqual( convert(1e-5).from('/K').to('/C') , 1e-5);
};

tests['1/C to 1/K'] = function () {
  assert.strictEqual( convert(1).from('1/C').to('1/K') , 1);
};

tests['1/K to 1/C'] = function () {
  assert.strictEqual( convert(1).from('1/K').to('1/C') , 1);
};

tests['1/K to /K'] = function () {
  assert.strictEqual( convert(1).from('1/K').to('/K') , 1);
};

tests['1/C to /C'] = function () {
  assert.strictEqual( convert(1).from('1/C').to('/C') , 1);
};

tests['/F to /F'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/F') , 1);
};

tests['/F to /R'] = function () {
  assert.strictEqual( convert(1).from('/F').to('/R') , 1);
};

tests['/R to /F'] = function () {
  assert.strictEqual( convert(1).from('/R').to('/F') , 1);
};

// 1 /K = 5/9 /F
tests['/K to /F'] = function () {
  close(5/9, convert(1).from('/K').to('/F'));
};

tests['/C to /F'] = function () {
  close(5/9, convert(1).from('/C').to('/F'));
};

tests['1/K to /F'] = function () {
  close(5/9, convert(1).from('1/K').to('/F'));
};

// 1 /F = 1.8 /K
tests['/F to /K'] = function () {
  close(1.8, convert(1).from('/F').to('/K'));
};

tests['/F to /C'] = function () {
  close(1.8, convert(1).from('/F').to('/C'));
};

tests['/R to 1/K'] = function () {
  close(1.8, convert(1).from('/R').to('1/K'));
};

module.exports = tests;

var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['zm3 to zm3'] = function () {
  assert.strictEqual( convert(1).from('zm3').to('zm3') , 1);
};

tests['zm3 to zcm3'] = function () {
  assert.strictEqual( convert(1).from('zm3').to('zcm3') , 0.000001);
};

tests['zcm3 to zm3'] = function () {
  assert.strictEqual( convert(1).from('zcm3').to('zm3') , 1000000);
};

tests['zm3 to zmm3'] = function () {
  assert.strictEqual( convert(1).from('zm3').to('zmm3') , 0.000000001);
};

tests['zmm3 to zm3'] = function () {
  assert.strictEqual( convert(1).from('zmm3').to('zm3') , 1000000000);
};

tests['zft3 to zft3'] = function () {
  assert.strictEqual( convert(1).from('zft3').to('zft3') , 1);
};

tests['zft3 to zin3'] = function () {
  assert.strictEqual( convert(1).from('zft3').to('zin3') , 1728);
};

tests['zin3 to zft3'] = function () {
  assert.strictEqual( convert(1).from('zin3').to('zft3') , 0.0005787037037037037);
};

// When converting between systems, expect < 0.1% error
tests['zm3 to zft3'] = function () {
  var expected = 35.3146667214886
    , actual = convert(1).from('zm3').to('zft3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['zft3 to zm3'] = function () {
  var expected = 1/35.3146667214886
    , actual = convert(1).from('zft3').to('zm3');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

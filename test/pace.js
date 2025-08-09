var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['min/km to min/km'] = function () {
  assert.strictEqual( convert(1).from('min/km').to('min/km') , 1);
};

tests['min/km to s/m'] = function () {
  assert.strictEqual( convert(1).from('min/km').to('s/m') , 0.06);
};

tests['s/m to min/km'] = function () {
  assert.strictEqual( convert(1).from('s/m').to('min/km') , 1/0.06);
};

tests['min/mi to min/mi'] = function () {
  assert.strictEqual( convert(1).from('min/mi').to('min/mi') , 1);
};

tests['min/mi to s/ft'] = function () {
  assert.strictEqual( convert(1).from('min/mi').to('s/ft') , 0.0113636);
};

tests['s/ft to min/mi'] = function () {
  assert.strictEqual( convert(1).from('s/ft').to('min/mi') , 1/0.0113636);
};

// When converting between systems, expect < 0.1% error
tests['min/km to min/mi'] = function () {
  var expected = 1.609344
    , actual = convert(1).from('min/km').to('min/mi');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['min/mi to min/km'] = function () {
  var expected = 1/1.609344
    , actual = convert(1).from('min/mi').to('min/km');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

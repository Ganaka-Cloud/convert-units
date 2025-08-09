var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['m4 to m4'] = function () {
  assert.strictEqual( convert(1).from('m4').to('m4') , 1);
};

tests['m4 to cm4'] = function () {
  assert.strictEqual( convert(1).from('m4').to('cm4') , 100000000);
};

tests['cm4 to m4'] = function () {
  assert.strictEqual( convert(1).from('cm4').to('m4') , 1/100000000);
};

tests['m4 to mm4'] = function () {
  assert.strictEqual( convert(1).from('m4').to('mm4') , 1000000000000);
};

tests['mm4 to m4'] = function () {
  assert.strictEqual( convert(1).from('mm4').to('m4') , 1/1000000000000);
};

tests['ft4 to ft4'] = function () {
  assert.strictEqual( convert(1).from('ft4').to('ft4') , 1);
};

tests['ft4 to in4'] = function () {
  assert.strictEqual( convert(1).from('ft4').to('in4') , 0.000004822856481436825);
};

tests['in4 to ft4'] = function () {
  assert.strictEqual( convert(1).from('in4').to('ft4') , 207346);
};

// When converting between systems, expect < 0.1% error
tests['m4 to ft4'] = function () {
  var expected = 497630400000.00006
    , actual = convert(1).from('m4').to('ft4');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['ft4 to m4'] = function () {
  var expected = 1/497630400000.00006
    , actual = convert(1).from('ft4').to('m4');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;

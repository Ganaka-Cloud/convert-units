var convert = require('../lib')
  , assert = require('assert')
  , tests = {}
  , ACCURACY = 1/1000
  , percentError = require('../lib/percentError');

tests['W/m2/K4 to W/m2/K4'] = function () {
  assert.strictEqual( convert(1).from('W/m2/K4').to('W/m2/K4') , 1);
};

tests['Btu/hr/sq.ft/R4 to Btu/hr/sq.ft/R4'] = function () {
  assert.strictEqual( convert(1).from('Btu/hr/sq.ft/R4').to('Btu/hr/sq.ft/R4') , 1);
};

// When converting between systems, expect < 0.1% error
tests['W/m2/K4 to Btu/hr/sq.ft/R4'] = function () {
  var expected = 3.327721675477304
    , actual = convert(1).from('W/m2/K4').to('Btu/hr/sq.ft/R4');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

tests['Btu/hr/sq.ft/R4 to W/m2/K4'] = function () {
  var expected = 0.3005059008898535
    , actual = convert(1).from('Btu/hr/sq.ft/R4').to('W/m2/K4');
  assert.ok( percentError(expected, actual) < ACCURACY
    , 'Expected: ' + expected +', Actual: ' + actual);
};

module.exports = tests;
